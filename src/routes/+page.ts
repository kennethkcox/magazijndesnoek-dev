import type { PageLoad } from './$types';
import events from '$lib/events.json';

export const load: PageLoad = async () => {
  return {
    events,
  };
};