export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@prisma/nuxt', '@pinia/nuxt'],

  css: ['~/assets/css/tailwind.css'],

  tailwindcss: {
    viewer: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  pages: true ,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
