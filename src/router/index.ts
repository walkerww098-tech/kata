/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import Horizontal from '@/pages/horizontal.vue'
import Virtical from '@/pages/virtical.vue'
import List from '@/pages/list.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Index, meta: { title: 'カタカムナ・うずまき' } },
        { path: '/horizontal', component: Horizontal, meta: { title: 'カタカムナ・横書き' } },
        { path: '/virtical', component: Virtical, meta: { title: 'カタカムナ・縦書き' } },
        { path: '/list', component: List, meta: { title: 'カタカムナ・文字' } },
    ],
})

router.afterEach((to) => {
    if (to.meta && typeof to.meta.title === 'string') {
        document.title = to.meta.title
    } else {
        document.title = 'デフォルトのタイトル'
    }
})

export default router
