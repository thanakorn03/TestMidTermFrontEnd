import { createRouter, createWebHistory } from 'vue-router';
import ItemDetail from '@/views/ItemDetail.vue';

const routes = [
  { path: '/items/:id', name: 'ItemDetail', component: ItemDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
