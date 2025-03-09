// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), // Habilita componentes React
    tailwind(), // Añade soporte para Tailwind CSS
  ],
});