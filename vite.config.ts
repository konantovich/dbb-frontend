import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  define: {

    // 'process.env': {
    //   REACT_APP_API_URL: 'http://localhost:3000',
    // },
    'process.env': {
      REACT_APP_API_URL: 'https://dbbnestjs.herokuapp.com/',
    },
  },
});
