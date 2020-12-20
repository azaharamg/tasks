import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ './views/Login'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "Register" */ './views/Register'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
export default router;
