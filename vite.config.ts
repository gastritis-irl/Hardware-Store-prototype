import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const reactPlugin = react();

defineConfig({
  plugins: [reactPlugin],
  build: {
    outDir: '../dist',
  },
});
