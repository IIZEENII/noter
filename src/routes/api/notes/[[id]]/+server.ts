import { json } from '@sveltejs/kit';
import type { Note } from '$lib/notes/note';

let notes: Note[] = []

export function GET() {
  return json(notes);
}

export async function POST({ request }) {
  const note = await request.json();
  notes.push(note);
  return json({ status: 201 });
}

export async function DELETE({ params }) {
  const id = params.id;
  notes = [...notes.filter((note) => note.id != id)];
  return json({ status: 200 });
}

export async function PUT({ request, params }) {
  const id = params.id;
  let note = notes.find((note) => note.id == id);
  notes = [...notes.filter((note) => note.id != id)];
  note = await request.json() as Note;
  notes.push(note);
  return json({ status: 200 });
}