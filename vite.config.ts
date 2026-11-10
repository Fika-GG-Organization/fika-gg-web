import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	resolve: { tsconfigPaths: true },
  server: {
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://localhost:7203',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
