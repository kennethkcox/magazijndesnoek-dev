import type { PageServerLoad } from './$types';
import { getEvents } from '$lib/database';

export const load: PageServerLoad = async () => {
  const events = await getEvents();
  return {
    events,
  };
};