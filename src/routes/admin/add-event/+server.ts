import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

const eventsFilePath = path.resolve('src/lib/events.json');

export const POST: RequestHandler = async ({ request }) => {
  try {
    const newEvent = await request.json();
    const eventsFile = await fs.readFile(eventsFilePath, 'utf-8');
    const events = JSON.parse(eventsFile);
    events.push(newEvent);
    await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2));
    return new Response('Event added successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to add event', { status: 500 });
  }
};