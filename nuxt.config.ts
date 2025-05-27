// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {
        enabled: false
    },
    modules: ['@primevue/nuxt-module', '@nuxt/eslint', '@nuxtjs/tailwindcss'],
    ssr: false,
    app: {
        head: {
            title: 'Sakai Nuxt',
            link: [
                { rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/lato' },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },
    css: ['primeicons/primeicons.css', '~/assets/css/styles.scss'],
    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        }
    }
});
