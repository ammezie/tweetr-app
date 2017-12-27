import Vue from 'vue'
import Router from 'vue-router'
import SignUpForm from '@/components/Auth/SignUpForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      component: SignUpForm
    }
  ]
})
