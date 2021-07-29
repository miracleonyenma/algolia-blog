<template>
  <ais-instant-search index-name="blog" :search-client="searchClient">
    <ais-configure
      :attributesToSnippet="['bodyPlainText']"
      :hits-per-page.camel="5"
      snippetEllipsisText="…"
    >
      <ais-autocomplete>
        <div slot-scope="{ currentRefinement, indices, refine }">
          <input
            type="search"
            :value="currentRefinement"
            placeholder="Search for an article"
            @input="refine($event.currentTarget.value)"
          />
          <!-- <ais-search-box />
          <ais-refinement-list attribute="title" /> -->
          <ais-stats />
          <div v-if="currentRefinement">
            <ul v-for="index in indices" :key="index.indexId">
              <li>
                <h3>{{ index.indexName }}</h3>
                <ul>
                  <li v-for="hit in index.hits" :key="hit.objectID">
                    <h1>
                      <ais-highlight attribute="title" :hit="hit" />
                    </h1>
                    <h2>
                      <ais-highlight attribute="description" :hit="hit" />
                    </h2>
                    <p>
                      <ais-snippet attribute="bodyPlainText" :hit="hit" />
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <ais-pagination />

          <!-- <ais-hits>
            <template slot="item" slot-scope="{ item }">
              <p>
                <ais-highlight attribute="title" :hit="item" />
              </p>
              <p>
                <ais-snippet attribute="description" :hit="item" />
              </p>
            </template>
          </ais-hits>
          <ais-pagination /> -->
        </div>
      </ais-autocomplete>
    </ais-configure>
  </ais-instant-search>
</template>

<script>
// In the script of this component, we add components declarations and the stylesheet:
import "vue-instantsearch";
// import { createServerRootMixin } from "vue-instantsearch";

import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "TG6KE2AI62",
  "6ecf77bb94ad1cfdd5410c59eb4d2934"
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

  // mixins: [
  //   createServerRootMixin({
  //     searchClient,
  //     indexName: "instant_search",
  //   }),
  // ],
  // // serverPrefetch() {
  // //   return this.instantsearch.findResultsState(this).then((algoliaState) => {
  // //     this.$ssrContext.nuxt.algoliaState = algoliaState;
  // //   });
  // // },
  // // beforeMount() {
  // //   const results =
  // //     (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
  // //     window.__NUXT__.algoliaState;

  // //   this.instantsearch.hydrate(results);

  // //   // Remove the SSR state so it can't be applied again by mistake
  // //   delete this.$nuxt.context.nuxtState.algoliaState;
  // //   delete window.__NUXT__.algoliaState;
  // },
};
</script>

<style>
</style>
