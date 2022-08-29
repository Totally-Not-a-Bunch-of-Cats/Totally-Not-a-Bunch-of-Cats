import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://totally-not-a-bunch-of-cats.github.io',
  base: '/Totally-Not-a-Bunch-of-Cats',
  integrations: [preact()]
});