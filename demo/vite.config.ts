import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  root: __dirname,
  base: './',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          content: [
            resolve(__dirname, './*.html'),
            resolve(__dirname, './**/*.{js,ts,jsx,tsx}'),
            resolve(__dirname, '../src/**/*.{js,ts,jsx,tsx}'),
          ],
        }),
        autoprefixer(),
      ],
    },
  },
  resolve: {
    alias: {
      'shekel-fe-shared-lib': resolve(__dirname, '../src'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    outDir: resolve(__dirname, '../demo-dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        docs: resolve(__dirname, 'docs.html'),
        demo2: resolve(__dirname, 'demo2.html'),
        app: resolve(__dirname, 'app.html'),
      },
    },
  },
});
