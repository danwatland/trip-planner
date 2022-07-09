import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      TRIP_PLANNER_API: env.TRIP_PLANNER_API
    },
    plugins: [react()],
  }
});
