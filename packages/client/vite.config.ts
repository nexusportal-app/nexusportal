import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {visualizer} from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['fs', 'stream'],
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    // host: '0.0.0.0',
    port: 3000,
  },
})
