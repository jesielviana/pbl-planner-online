/* global  */
import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

import Logged from '@/templates/Logged.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import EditPlanning from '@/views/EditPlanning.vue'
import MyPlans from '@/views/MyPlans.vue'
import Profile from '@/views/Profile.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Logged',
      component: Logged,
      children: [
        {
          path: 'planejamentos',
          name: 'planejamentos',
          component: MyPlans,
          props: { errors: false }
        },
        {
          path: 'planejamento/:id',
          name: 'planejamento',
          component: EditPlanning
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: Profile
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(user => {
    const HOME = '/home'
    const LOGIN = '/login'
    const PLANEJAMENTOS = 'planejamentos'
    if (user) {
      router.app.$store.commit('logged', true)
      if (to.path === LOGIN) {
        next({ path: PLANEJAMENTOS })
      } else {
        next()
      }
    } else if (to.path === HOME || to.path === LOGIN) {
      console.log('aqui', to.path)
      router.app.$store.commit('logged', false)
      next()
    } else {
      router.app.$store.commit('logged', false)
      router.app.$store.commit('urlRedirect', window.location.href)
      next({ path: LOGIN })
    }
  })
})

export default router
