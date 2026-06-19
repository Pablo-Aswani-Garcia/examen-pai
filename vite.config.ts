import {resolve} from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig({
  base: './',
  publicDir: './public',
  server: {
    open: 'index.html',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
        trapezoidal: resolve(__dirname, './src/exercises/home-work/public/trapezoidal.html'),
        uml: resolve(__dirname, './src/exercises/home-work/uml/uml.html'),
        gameeight: resolve(__dirname, './src/exercises/game-eight/public/game-eight.html'),

      },
    },
  },
});
