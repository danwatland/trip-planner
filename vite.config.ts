import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      GOOGLE_MAPS_API_KEY: env.GOOGLE_MAPS_API_KEY,
      TRIP_PLANNER_API: env.TRIP_PLANNER_API
    },
    plugins: [react()],
  }
});
