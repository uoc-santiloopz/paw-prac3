import Vue from 'vue';
import Router from 'vue-router';
import Landing from './containers/Landing.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./containers/CreateReservationForm.vue')
    }
  ]
})
