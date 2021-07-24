<template>
  <main>
    <section>
      <header>
        <h1>Welcome to my blog</h1>
        <p>Feel free to search through my articles</p>
      </header>

      <!-- https://www.algolia.com/doc/guides/building-search-ui/going-further/server-side-rendering/vue/#with-nuxt -->
      <!-- We then create a new page (pages/search.vue) and build a Vue InstantSearch interface: -->

        <!-- Finally, we need to replace ais-instant-search with ais-instant-search-ssr -->
      <ais-instant-search-ssr
        :search-client="searchClient"
        index-name="instant_search"
      >
        <ais-search-box />
        <ais-stats />
        <ais-refinement-list attribute="brand" />
        <ais-hits>
          <template slot="item" slot-scope="{ item }">
            <p>
              <ais-highlight attribute="name" :hit="item" />
            </p>
            <p>
              <ais-highlight attribute="brand" :hit="item" />
            </p>
          </template>
        </ais-hits>
        <ais-pagination />
      </ais-instant-search-ssr>

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
// In the script of this component, we add components declarations and the stylesheet:
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
  createServerRootMixin,
} from "vue-instantsearch";

import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default {
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
  },

  async asyncData({ $content, params }) {
    const articles = await $content("articles")
      .only(["title", "description", "slug"])
      .sortBy("createdAt", "desc")
      .fetch();

    return { articles };
  },

  // Then, we add:
  // createServerRootMixin to create a reusable search instance
  mixins: [
    createServerRootMixin({
      searchClient,
      indexName: "instant_search",
    }),
  ],

  // findResultsState in serverPrefetch to perform a search query in the back end
  serverPrefetch() {
    return this.instantsearch.findResultsState(this).then((algoliaState) => {
      this.$ssrContext.nuxt.algoliaState = algoliaState;
    });
  },

  // call hydrate method in beforeMount.
  beforeMount() {
    const results =
      (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
      window.__NUXT__.algoliaState;

    this.instantsearch.hydrate(results);

    // Remove the SSR state so it can't be applied again by mistake
    delete this.$nuxt.context.nuxtState.algoliaState;
    delete window.__NUXT__.algoliaState;
  },

  data() {
    return {
      searchClient,
    };
  },
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