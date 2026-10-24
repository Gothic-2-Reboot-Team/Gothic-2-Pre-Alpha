// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'static',
    compressPublicAssets: true,
    minify: true,
    routeRules: {
      '/': { prerender: true },
    },
  },

  app: {
    head: {
      title: 'Gothic 2 - Pre Alpha',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'en' },
    },
  },

  modules: ['@nuxt/eslint', '@nuxt/ui', '@comark/nuxt', '@nuxtjs/seo'],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://gothic-2-reboot-team.github.io/Gothic-2-Pre-Alpha',
    name: 'Gothic 2 - Pre Alpha',
  },

  sitemap: {
    autoLastmod: true,
  },

  icon: {
    provider: 'none',
    clientBundle: {
      scan: true,
    },
  },

  ui: {
    prose: true,
    theme: {
      defaultVariants: {
        color: 'neutral',
      },
    },
  },

  compatibilityDate: '2026-06-30',
});
