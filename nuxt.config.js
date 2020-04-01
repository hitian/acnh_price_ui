export default {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_description || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/axios'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        '@nuxtjs/auth'
    ],

    auth: {
        redirect: {
            login: '/login/',
            logout: '/',
            callback: '/login/',
            home: '/'
        },
        strategies: {
            google: {
                client_id: '230736846992-7eu125tti33131fqfq42986gqkorghb3.apps.googleusercontent.com'
            }
        },
        plugins: ['~/plugins/auth.js']
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}