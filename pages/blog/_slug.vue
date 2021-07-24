<template>
  <article class="m-auto max-w-3xl mt-8 text-xl">
    <header class="mb-4">
        <h1 class="text-4xl font-black"> {{article.title}} </h1>
        <p> {{article.description}} </p>
    </header>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content("articles", params.slug).fetch();

    return { article };
  },
};
</script>

<style>
</style>