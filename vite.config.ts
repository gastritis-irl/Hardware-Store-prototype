import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist',
  },
  root: './src',
  define: {
    'process.env.API_KEY': '"J8PUxVw1W9gRfMGV0yL8gQ==kzkXvHdjPWoKT9Sr"',
  },
});
