<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="min-h-screen p-8">
  <a href="/" class="text-accent underline mb-8 block">&larr; Back to Home</a>
  <h1 class="text-4xl font-bold mb-8">Full Agenda</h1>

  <div class="space-y-4">
    {#each data.events as event}
      <a href="/event/{event.slug}" class="block bg-white p-4 rounded-lg shadow-md hover:bg-gray-100">
        <h2 class="text-2xl font-bold">{event.artist}</h2>
        <p class="text-lg">{new Date(event.date).toLocaleString()}</p>
      </a>
    {/each}
  </div>
</div>