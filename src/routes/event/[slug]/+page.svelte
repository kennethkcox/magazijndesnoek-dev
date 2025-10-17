<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  function addToCalendar() {
    const event = data.event;
    const cal = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `URL:${document.URL}`,
      `DTSTART:${new Date(event.date).toISOString().replace(/-|:|\.\d\d\d/g, '')}`,
      `SUMMARY:${event.artist}`,
      `DESCRIPTION:${event.description}`,
      'LOCATION:magazijn de snoek',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([cal], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.slug}.ics`;
    link.click();
  }

  function shareToFacebook() {
    const url = encodeURIComponent(document.URL);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }
</script>

<div class="min-h-screen p-8">
  <a href="/agenda" class="text-accent underline mb-8 block">&larr; Back to Agenda</a>

  <div class="bg-white p-8 rounded-lg shadow-md">
    <img src={data.event.image} alt={data.event.artist} class="w-full h-64 object-cover rounded-t-lg">
    <div class="p-4">
      <h1 class="text-4xl font-bold mb-4">{data.event.artist}</h1>
      <p class="text-lg mb-4">{new Date(data.event.date).toLocaleString()}</p>
      <p class="mb-4">{data.event.description}</p>
      <a href={data.event.tickets} target="_blank" class="bg-accent text-white px-4 py-2 rounded-md">Buy Tickets</a>

      <div class="mt-8 flex space-x-4">
        <button on:click={addToCalendar} class="bg-gray-200 px-4 py-2 rounded-md">Add to Calendar</button>
        <button on:click={shareToFacebook} class="bg-blue-600 text-white px-4 py-2 rounded-md">Share to Facebook</button>
      </div>
    </div>
  </div>
</div>