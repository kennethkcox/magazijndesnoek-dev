import type { PageLoad } from './$types';
import events from '$lib/events.json';

export const load: PageLoad = async () => {
  const today = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.date) > today);
  return {
    events: upcomingEvents,
  };
};