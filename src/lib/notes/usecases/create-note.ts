import type { Note } from "../note";

const NOTES_KEY = 'noter_notes';

export function getLocalNotes(): Note[] {
  const storedNotes = localStorage.getItem(NOTES_KEY);
  return storedNotes ? JSON.parse(storedNotes) : [];
}

function saveLocalNotes(notes: Note[]): void {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export async function createNote(note: Note): Promise<void> {
  if (!navigator.onLine) {
    const notes = getLocalNotes();
    notes.push(note);
    saveLocalNotes(notes);
    requestSync();
    return;
  }

  await sendToApi(note);
}

export async function sendToApi(note: Note) {
  const response = await fetch('http://localhost:5173/api/notes', {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al enviar los datos');
  }
}

async function requestSync() {
  const registration = await navigator.serviceWorker.ready;
  await registration.sync.register('sync-notes');
}