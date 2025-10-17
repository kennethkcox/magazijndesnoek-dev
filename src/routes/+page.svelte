<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  let nextEvent: any;

  onMount(() => {
    const today = new Date();
    const upcomingEvents = data.events.filter((event: any) => new Date(event.date) > today);
    if (upcomingEvents.length > 0) {
      nextEvent = upcomingEvents[0];
    }
  });
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-8">
  <h1 class="text-6xl font-bold mb-8">magazijn de snoek</h1>

  {#if nextEvent}
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-2">{nextEvent.artist}</h2>
      <p class="text-lg mb-4">{new Date(nextEvent.date).toLocaleString()}</p>
      <a href="/event/{nextEvent.slug}" class="bg-accent text-white px-4 py-2 rounded-md">Details & Tickets</a>
    </div>
  {:else}
    <p>No upcoming events.</p>
  {/if}

  <a href="/agenda" class="mt-8 text-accent underline">Full Agenda</a>
</div>