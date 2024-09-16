export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3001' 
    }
  },
  routeRules: {
    '/profile': { middleware: ['auth'] },
    '/admin/**': { middleware: ['auth'] }, 
  },
})
