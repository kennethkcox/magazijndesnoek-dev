import type { PageLoad } from './$types';
import { getEvents } from '$lib/database';

export const load: PageLoad = async () => {
  const events = await getEvents();
  return {
    events,
  };
};