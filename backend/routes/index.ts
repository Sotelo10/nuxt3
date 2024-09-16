// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/pages/index.vue') },
  { path: '/profile', component: () => import('@/pages/profile.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;