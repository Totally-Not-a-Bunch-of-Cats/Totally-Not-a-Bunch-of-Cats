import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import nodejs from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    // output: 'hybrid',
    // adapter: nodejs({ mode: 'middleware' }),
	site: 'https://example.com',
	integrations: [mdx(), sitemap(), tailwind(), solid({
        // This forces solid js components to only be in the `src/components/solid/` directory
        include: ['src/components/solid/**/*']
    })],
    markdown: {
        remarkPlugins: [],
        remarkRehype: {}
    }
});
