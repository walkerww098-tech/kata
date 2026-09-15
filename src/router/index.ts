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

const router = createRouter({
    //history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL), 
    routes: [
        { path: '/', component: index, meta: { title: 'カタカムナ・うずまき' } },
        { path: '/horizontal', component: horizontal, meta: { title: 'カタカムナ・横書き' } },
        { path: '/virtical', component: virtical, meta: { title: 'カタカムナ・縦書き' } },
        { path: '/list', component: list, meta: { title: 'カタカムナ・文字' } },
    ],
})
router.beforeEach((to) => {
    document.title = (to.meta.title as string) || 'NO TITLE';
});

export default router
