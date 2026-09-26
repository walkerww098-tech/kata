/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import index from '@/pages/index.vue'
import horizontal from '@/pages/horizontal.vue';
import virtical from '@/pages/virtical.vue';
import list from '@/pages/list.vue';
import Kata80 from '@/pages/kata80.vue';

const router = createRouter({
    //history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL), 
    routes: [
        { path: '/:id?', alias:['/index/:id?'], name: 'index', component: index, meta: { title: 'カタカムナ・うずまき' } },
        { path: '/horizontal', name: 'horizontal', component: horizontal, meta: { title: 'カタカムナ・横書き' } },
        { path: '/virtical', name: 'virtical', component: virtical, meta: { title: 'カタカムナ・縦書き' } },
        { path: '/list', name: 'list', component: list, meta: { title: 'カタカムナ・文字' } },
        { path: '/kata80', name: 'kata80', component: Kata80, meta: { title: 'カタカムナ・80首' } },
    ],
})
router.beforeEach((to) => {
    document.title = (to.meta.title as string) || 'NO TITLE';
});

export default router
