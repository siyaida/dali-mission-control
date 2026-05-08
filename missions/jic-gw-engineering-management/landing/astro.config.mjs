// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://siyaida.github.io',
  base: '/dali-mission-control/missions/jic-gw-engineering-management/landing'
});
