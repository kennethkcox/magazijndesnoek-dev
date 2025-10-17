import type { PageLoad } from './$types';
import events from '$lib/events.json';

export const load: PageLoad = async ({ params }) => {
  const event = events.find((event) => event.slug === params.slug);
  return {
    event,
  };
};