import type { RequestHandler } from '@sveltejs/kit';
import { addEvent } from '$lib/database';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const newEvent = await request.json();
    await addEvent(newEvent);
    return new Response('Event added successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to add event', { status: 500 });
  }
};