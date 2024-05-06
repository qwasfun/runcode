import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import NewView from '../views/NewView.vue'
import SnippetsView from '../views/SnippetsView.vue'
import SnippetView from '../views/SnippetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/auth/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/snippets',
      name: 'snippets',
      component: SnippetsView
    },
    {
      path: '/snippet/:id',
      name: 'snippet',
      component: SnippetView
    },
    {
      path: '/new',
      name: 'new',
      component: NewView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
