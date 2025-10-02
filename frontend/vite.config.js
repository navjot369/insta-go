// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path module

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    // Set the project root to the directory containing this config file
    root: '.', 
    plugins: [react()],
    build: {
      // Output directory relative to the root option
      outDir: 'dist', 
      rollupOptions: {
        input: {
          // Entry point HTML file, relative to the root option
          main: path.resolve(__dirname, 'index.html'), 
        },
      },
    },
    resolve: {
      alias: {
        // Alias to resolve '@/' to 'src/' relative to the root
        '@': path.resolve(__dirname, 'src'), 
      },
    },
  };
});
