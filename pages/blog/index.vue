<template>
  <main>
    <section>
      <header>
        <h1>Welcome to my blog</h1>
        <p>Feel free to search through my articles</p>

        <div class="search">
            <algolia-search />
            <algolia-search-ssr />
        </div>
      </header>

      <!-- https://www.algolia.com/doc/guides/building-search-ui/going-further/server-side-rendering/vue/#with-nuxt -->
      <!-- We then create a new page (pages/search.vue) and build a Vue InstantSearch interface: -->

      <!-- Finally, we need to replace ais-instant-search with ais-instant-search-ssr -->
      <!-- <ais-instant-search-ssr
        :search-client="searchClient"
        index-name="blog"
      >
        <ais-search-box />
        <ais-stats />
        <ais-refinement-list attribute="brand" />
        <ais-hits>
          <div slot="item" slot-scope="{ item }">
              <h2> {{ item.title }} </h2>
              <p> {{ item.description }} </p>
            <p>
              <ais-highlight attribute="name" :hit="item" />
            </p>
            <p>
              <ais-highlight attribute="brand" :hit="item" />
            </p>
          </div>
        </ais-hits>
        <ais-pagination />
      </ais-instant-search-ssr> -->

      <ul>
        <li v-for="article in articles" :key="article.slug">
          <nuxt-link
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          >
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
          </nuxt-link>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {

  async asyncData({ $content, params }) {
    const articles = await $content("articles")
      .only(["title", "description", "slug"])
      .sortBy("createdAt", "desc")
      .fetch();

    return { articles };
  },

  // Then, we add:
  // createServerRootMixin to create a reusable search instance
  //   mixins: [
  //     createServerRootMixin({
  //       searchClient,
  //       indexName: "blog",
  //     }),
  //   ],

  // findResultsState in serverPrefetch to perform a search query in the back end
  //   serverPrefetch() {
  //     return this.instantsearch.findResultsState(this).then((algoliaState) => {
  //       this.$ssrContext.nuxt.algoliaState = algoliaState;
  //     });
  //   },

  // call hydrate method in beforeMount.
  //   beforeMount() {
  //     const results =
  //       (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
  //       window.__NUXT__.algoliaState;

  //     this.instantsearch.hydrate(results);

  //     // Remove the SSR state so it can't be applied again by mistake
  //     delete this.$nuxt.context.nuxtState.algoliaState;
  //     delete window.__NUXT__.algoliaState;
  //   },

  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css",
        },
      ],
    };
  },
};
</script>

<style>
</style>