import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use a lookup object to map mode to envMode
  const envModes: Record<string, string> = {
    prod: 'prod',
    qa: 'qa',
    dev: 'dev',
    local: 'local',
  };

  // Default to 'development' if mode is not found in envModes
  const envMode = envModes[mode] || 'local-dev';

  return {
    plugins: [react()],
    server: {
      port: 5173,
    },
    define: {
      // Set NODE_ENV based on the mode
      'process.env.NODE_ENV': JSON.stringify(envMode),
    },
  };
});
