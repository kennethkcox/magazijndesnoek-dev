import type { PageServerLoad } from './$types';
import { getEvents } from '$lib/database';
import type { Event } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
  const allEvents: Event[] = await getEvents();
  const event = allEvents.find((event) => event.slug === params.slug);
  return {
    event,
  };
};