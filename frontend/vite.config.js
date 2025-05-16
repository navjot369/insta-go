import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    // Set the project root to the directory containing this config file (i.e., 'frontend/')
    root: '.', 
    plugins: [react()],
    build: {
      // Output directory relative to the root option (i.e., 'frontend/dist')
      outDir: 'dist', 
      rollupOptions: {
        input: {
          // Entry point HTML file, relative to the root (i.e., 'frontend/index.html')
          main: path.resolve(__dirname, 'index.html'), 
        },
      },
    },
    resolve: {
      alias: {
        // Alias to resolve '@/' to 'src/' relative to the root (i.e., 'frontend/src')
        '@': path.resolve(__dirname, 'src'), 
      },
    },
  };
});
