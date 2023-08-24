import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PerksView from '../views/PerksView.vue'
import SurvivorsView from '../views/SurvivorsView.vue'
import SurvivorView from '../views/SurvivorView.vue'
import KillersView from '../views/KillersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/perks',
      name: 'perks',
      component: PerksView
    },
    {
      path: '/survivors',
      name: 'survivors',
      component: SurvivorsView
    },
    {
      path: '/survivors/:survivorId',
      name: 'survivor',
      component: SurvivorView
    },
    {
      path: '/killers',
      name: 'killers',
      component: KillersView
    },
  ]
})

export default router
