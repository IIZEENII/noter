import { openDB } from 'idb';
import type { Note } from "../note";

const NOTES_DB_NAME = 'NoterDB';
const NOTES_STORE_NAME = 'notes';

async function initDB() {
  return openDB(NOTES_DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(NOTES_STORE_NAME, { keyPath: 'id' });
    },
  });
}

export async function getLocalNotes(): Promise<Note[]> {
  const db = await initDB();
  const notes = await db.getAll(NOTES_STORE_NAME);
  return notes;
}

async function saveLocalNotes(notes: Note[]): Promise<void> {
  const db = await initDB();
  const transaction = db.transaction(NOTES_STORE_NAME, 'readwrite');
  const objectStore = transaction.objectStore(NOTES_STORE_NAME);
  notes.forEach(note => objectStore.add(note));
  await transaction.done; 
}

export async function createNote(note: Note): Promise<void> {
  if (!navigator.onLine) {
    const notes = await getLocalNotes();
    notes.push(note);
    await saveLocalNotes(notes);
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