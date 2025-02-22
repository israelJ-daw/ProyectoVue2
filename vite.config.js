import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Solo agregar el plugin de Vue DevTools en desarrollo
    process.env.NODE_ENV === 'development' ? vueDevTools() : null,
  ].filter(Boolean), // Esto filtra los plugins nulos o no definidos
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
