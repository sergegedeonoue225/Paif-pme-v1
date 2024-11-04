import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://paif-pme-repertoire-numerique.ikasolution.bf',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
