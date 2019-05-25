import Vue from 'vue';
import Router from 'vue-router';
import ReservationList from '@/containers/ReservationList.vue';
import ReservationDetail from '@/containers/ReservationDetail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'reservations-list', component: ReservationList },
    { path: '/next24', name: 'reservations-list', component: ReservationList },
    // lazy loaded components
    {
      path: '/detail',
      name: 'reservation-detail',
      component: () => import('./containers/ReservationDetail.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./containers/CreateReservationForm.vue')
    }
  ]
})
