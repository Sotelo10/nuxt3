import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  const api = $fetch.create({
    baseURL: 'https://fakestoreapi.com/', 
  });

  return {
    provide: {
      api,
    },
  };
});
