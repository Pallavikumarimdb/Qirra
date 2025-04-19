// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@prisma/nuxt'],
  css: ['~/assets/css/tailwind.css'], // 👈 ensure this line is there
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  tailwindcss: {
    viewer: true, // Optional: shows Tailwind viewer on localhost:3000/_tailwind
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})