export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'algolia-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/tailwind.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-instantsearch'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // add module for nuxt-content-algolia
  buildModules: ['@nuxtjs/tailwindcss', 'nuxt-content-algolia'],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Automatically (during npm run generate) sync content
  // stored in your project with nuxt content to an Algolia index.
  nuxtContentAlgolia: {
    appId: 'TG6KE2AI62',
    // !IMPORTANT secret key should always be an environment variable
    // this is not your search only key but the key that grants access to modify the index
    apiKey: '0d8988055ef8a562f08a9c17beadc0a1',

    // relative to content directory
    // each path get's its own index
    paths: [
      {
        name: 'articles',
        // optional (will use name if index not specified)
        index: process.env.ALGOLIA_INDEX || 'blog',
        fields: ['title', 'description', 'body', 'bodyPlainText', 'tags'],
      },
    ],
  },

  // hook to strip out the markdown characters from the body plain text
  // before sending it to the Algolia index
  hooks: {
    'content:file:beforeInsert': (document) => {
      const removeMd = require('remove-markdown');
      if (document.extension == '.md') {
        document.bodyPlainText = removeMd(document.text);
      }
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build

  /* Our InstantSearch code uses ES modules, yet it needs to be executed in Node.js.
  For that reason, we need to let Nuxt know that those files should be transpiled for a Node usage.
  For that, we add the following configuration to nuxt.config.js */
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
  }
}
