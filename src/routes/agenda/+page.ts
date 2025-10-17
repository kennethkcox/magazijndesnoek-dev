import type { PageLoad } from './$types';
import { getEvents } from '$lib/database';
import type { Event } from '$lib/types';

export const load: PageLoad = async () => {
  const today = new Date();
  const allEvents: Event[] = await getEvents();
  const upcomingEvents = allEvents.filter((event) => new Date(event.date) > today);
  return {
    events: upcomingEvents,
  };
};