

require('./bootstrap');

window.Vue = require('vue');

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import 'quasar/dist/quasar.min.css'
import {Quasar,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle, QLayout, QHeader, QBtn, QSpace, QCard, QCardSection, QCardActions, QIcon, QInput, QAvatar, QAjaxBar, QBtnToggle, QCheckbox, QDialog, QForm, QImg, QToggle
} from 'quasar'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

Vue.use(Quasar, {
    config: {
        //
    },
    components: {
        QPageContainer,
        QPage,
        QToolbar,
        QToolbarTitle, QLayout, QHeader, QBtn, QSpace, QCard, QCardSection, QCardActions, QIcon, QInput, QAvatar, QAjaxBar, QBtnToggle, QCheckbox, QDialog, QForm, QImg, QToggle
    },
    plugins: {
        //
    },
    directives: {

    }
})

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('main-page', require('./pages/Home.vue').default);
Vue.component('register', require('./pages/Register.vue').default);
Vue.component('login', require('./pages/Login.vue').default);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./pages/Main')
    },
    {
        path: '/dashboard',
        name: "Dashboard",
        component: () => import('./pages/Dashboard'),
        meta: {requiresAuth: true}
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./pages/Login'),
        meta: {guestOnly: true}
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./pages/Register'),
        meta: {guestOnly: true}
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

function loggedIn() {
    return localStorage.getItem('token');
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!loggedIn()) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    }
    else if(to.matched.some(record => record.meta.guestOnly)) {
        if (loggedIn()) {
          next({
            path: '/dashboard',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
    }
    else {
      next() // make sure to always call next()!
    }
  })

const app = new Vue({
    el: '#app',
    router
});
