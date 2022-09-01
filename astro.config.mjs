import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import preact from "@astrojs/preact";


// https://astro.build/config
export default defineConfig({
    site: 'https://totally-not-a-bunch-of-cats.github.io',
    base: '/Totally-Not-a-Bunch-of-Cats',
    integrations: [mdx(), preact()],
    markdown: {
        shikiConfig: {
            theme: 'dracula'
        },
        rehypePlugins: [
            [
                'rehype-external-links',
                {
                    target: '_blank',
                },
            ],
        ],
    }
});