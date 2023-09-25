import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://github.com/Tired-Fox',
    base: '/Totally-Not-a-Bunch-of-Cats',
	integrations: [mdx(), sitemap(), tailwind(), solid()],
    markdown: {
        remarkPlugins: [],
        remarkRehype: {}
    }
});
