import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vursiesvanjan.nl',

  // Het overzicht stond eerst op /vursies/; wie die link nog heeft, komt
  // nu op de voorpagina uit.
  redirects: {
    '/vursies': '/',
  },
});
