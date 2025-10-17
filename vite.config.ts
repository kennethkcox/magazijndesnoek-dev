import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'process.env.DO_JSON_DB_URL': JSON.stringify(process.env.DO_JSON_DB_URL)
	}
});