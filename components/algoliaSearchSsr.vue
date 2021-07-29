<template>
  <!-- <ais-instant-search index-name="blog" :search-client="searchClient">
    <ais-index index-name="blog" />
    <ais-autocomplete>
      <div slot-scope="{ currentRefinement, indices, refine }">
        <input
          type="search"
          :value="currentRefinement"
          placeholder="Search for a product"
          @input="refine($event.currentTarget.value)"
        />
        <div class="wrapper" v-if="currentRefinement">
          <ul v-for="index in indices" :key="index.indexId">
            <li>
              <h3>{{ index.indexName }}</h3>
              <ul>
                <li v-for="hit in index.hits" :key="hit.objectID">
                  <ais-highlight attribute="name" :hit="hit" />
                  <button
                    type="button"
                    @click="index.sendEvent('click', hit, 'Item Added')"
                  >
                    Add to cart
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </ais-autocomplete>
  </ais-instant-search> -->
  <!-- <ais-instant-search :search-client="searchClient" index-name="blog">
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
  </ais-instant-search> -->
  <ais-instant-search-ssr
    index-name="instant_search"
    :search-client="searchClient"
  >
    <ais-configure :hits-per-page.camel="5">
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
    </ais-configure>
  </ais-instant-search-ssr>
</template>

<script>
// In the script of this component, we add components declarations and the stylesheet:
import "vue-instantsearch";
import { createServerRootMixin } from "vue-instantsearch";

import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default {
  data() {
    return {
      searchClient,
      //   searchClient: algoliasearch(
      //     "latency",
      //     "6be0576ff61c053d5f9a3225e2a90f76"
      //   ),
      //   searchClient: algoliasearch(
      //     "TG6KE2AI62",
      //     "6ecf77bb94ad1cfdd5410c59eb4d2934"
      //   ),
    };
  },

  mixins: [
    createServerRootMixin({
      searchClient,
      indexName: "instant_search",
    }),
  ],
  serverPrefetch() {
    return this.instantsearch.findResultsState(this).then((algoliaState) => {
      this.$ssrContext.nuxt.algoliaState = algoliaState;
    });
  },
  beforeMount() {
    const results =
      (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
      window.__NUXT__.algoliaState;

    this.instantsearch.hydrate(results);

    // Remove the SSR state so it can't be applied again by mistake
    delete this.$nuxt.context.nuxtState.algoliaState;
    delete window.__NUXT__.algoliaState;
  },
};
</script>

<style>
</style>
