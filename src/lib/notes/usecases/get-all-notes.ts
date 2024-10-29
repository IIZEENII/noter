import type { Note } from "../note";
import { getLocalNotes } from "./create-note";

export async function getAllNotes(): Promise<Note[]> {
  if (!navigator.onLine) {
    return getLocalNotes();
  }
  
  return await getFromApi();
}

export async function getFromApi(): Promise<Note[]> {
  const response = await fetch('http://localhost:5173/api/notes', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error al enviar los datos');
  }

  return await response.json();
}