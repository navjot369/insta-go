import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(() => {
  return {
    // define: {
    //   API_BASE_URL: process.env.VITE_API_BASE_URL,
    // },
    plugins: [react()]
  };
});