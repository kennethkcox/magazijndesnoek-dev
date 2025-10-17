<script lang="ts">
  import { onMount } from 'svelte';

  let password = '';
  let isAuthenticated = false;
  let artist = '';
  let date = '';
  let description = '';
  let image = '';
  let tickets = '';

  function checkPassword() {
    // In a real app, this would be a call to a secure endpoint.
    // For this example, we'll use a hardcoded password.
    if (password === 'password') {
      isAuthenticated = true;
    } else {
      alert('Incorrect password');
    }
  }

  async function addEvent() {
    const slug = artist.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const newEvent = {
      slug,
      artist,
      date,
      description,
      image,
      tickets,
    };

    const response = await fetch('/admin/add-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });

    if (response.ok) {
      alert('Event added successfully');
      // Clear the form
      artist = '';
      date = '';
      description = '';
      image = '';
      tickets = '';
    } else {
      alert('Failed to add event');
    }
  }
</script>

<div class="min-h-screen p-8">
  {#if !isAuthenticated}
    <div class="max-w-md mx-auto">
      <h1 class="text-2xl font-bold mb-4">Admin Login</h1>
      <input type="password" bind:value={password} placeholder="Password" class="w-full p-2 border rounded-md mb-4">
      <button on:click={checkPassword} class="bg-accent text-white px-4 py-2 rounded-md">Login</button>
    </div>
  {:else}
    <h1 class="text-2xl font-bold mb-4">Add New Event</h1>
    <form on:submit|preventDefault={addEvent} class="space-y-4 max-w-md mx-auto">
      <input type="text" bind:value={artist} placeholder="Artist" class="w-full p-2 border rounded-md" required>
      <input type="datetime-local" bind:value={date} class="w-full p-2 border rounded-md" required>
      <textarea bind:value={description} placeholder="Description" class="w-full p-2 border rounded-md" required></textarea>
      <input type="url" bind:value={image} placeholder="Image URL" class="w-full p-2 border rounded-md" required>
      <input type="url" bind:value={tickets} placeholder="Tickets URL" class="w-full p-2 border rounded-md" required>
      <button type="submit" class="bg-accent text-white px-4 py-2 rounded-md">Add Event</button>
    </form>
  {/if}
</div>