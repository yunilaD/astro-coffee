// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  redirects: {
    '/home': {
      status: 301,
      destination: '/'
    },
    '/drinks': {
      status: 301,
      destination: '/menu'
    },
    '/message': {
      status: 301,
      destination: '/contact'
    }
  }
});