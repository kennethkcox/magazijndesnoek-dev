import { DO_JSON_DB_URL } from '$env/static/private';
import type { Event } from '$lib/types';

const DB_URL = DO_JSON_DB_URL;

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${DB_URL}/events`);
  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }
  return res.json();
}

export async function addEvent(event: Event) {
  const res = await fetch(`${DB_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    throw new Error('Failed to add event');
  }
  return res.json();
}