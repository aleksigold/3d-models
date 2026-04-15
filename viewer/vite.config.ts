import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '../../output/*.3mf',
          dest: 'models',
          rename: {
            stripBase: 1,
          },
        },
      ],
    }),
  ],
  root: 'src',
  base: '/3d-models/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
