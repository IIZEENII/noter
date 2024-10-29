/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
    async function addFilesToCache() {
        const cache = await caches.open(CACHE);
        await cache.addAll(ASSETS);
    }

    event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
    async function deleteOldCaches() {
        for (const key of await caches.keys()) {
            if (key !== CACHE) await caches.delete(key);
        }
    }

    event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    async function respond() {
        const url = new URL(event.request.url);
        const cache = await caches.open(CACHE);

        if (ASSETS.includes(url.pathname)) {
            const response = await cache.match(url.pathname);
            if (response) return response;
        }

        try {
            const response = await fetch(event.request);
            if (!(response instanceof Response)) throw new Error('invalid response from fetch');
            if (response.status === 200) cache.put(event.request, response.clone());
            return response;
        } catch (error) {
            const response = await cache.match(event.request);
            if (response) return response;
            throw error;
        }
    }

    event.respondWith(respond());
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-notes') {
        event.waitUntil(syncNotesWithApi());
    }
});

async function syncNotesWithApi() {
    const notesToSync = getNotesFromDatabase();

    if (!Array.isArray(notesToSync)) {
        console.error('No se obtuvieron notas válidas para sincronizar.');
        return;
    }

    for (const note of notesToSync) {
        try {
            await sendToApi(note);
            deleteNoteFromDatabase(note.id);
        } catch (error) {
            console.error('Error al sincronizar nota:', error);
        }
    }
}

async function sendToApi(note) {
    const response = await fetch('http://localhost:5173/api/notes', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) throw new Error('Error al enviar los datos');
}

function getNotesFromDatabase() {
    const storedNotes = localStorage.getItem('noter_notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
}

function deleteNoteFromDatabase(id) {
    const notes = getNotesFromDatabase();
    const updatedNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem('noter_notes', JSON.stringify(updatedNotes));
}