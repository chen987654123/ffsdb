import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
import Details from '../views/Details.vue'
import Server from '../views/Server.vue'
import Help from '../views/Help.vue'
import Contact from '../views/Contact.vue'
import Download from '../views/Download.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/browse', name: 'Browse', component: Browse },
  { path: '/details/:id', name: 'Details', component: Details },
  { path: '/server', name: 'Server', component: Server },
  { path: '/help', name: 'Help', component: Help },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/download', name: 'Download', component: Download }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
