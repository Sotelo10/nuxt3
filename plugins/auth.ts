import { defineNuxtPlugin } from '#app'; 
import { authService } from '~/services/authService';

export default defineNuxtPlugin(nuxtApp => {
  const auth = authService();

  return {
    provide: {
      auth,
    },
  };
});