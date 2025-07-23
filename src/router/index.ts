import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StepOne from '../views/StepOne.vue'
import StepTwo from '../views/StepTwo.vue'
import StepThree from '../views/StepThree.vue'
import StepFour from '../views/StepFour.vue'
import StepFive from '../views/StepFive.vue'
import StepSix from '../views/StepSix.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/step-one',
      name: 'step-one',
      component: StepOne,
    },
    {
      path: '/step-two',
      name: 'step-twp',
      component: StepTwo,
    },
    {
      path: '/step-three',
      name: 'step-three',
      component: StepThree,
    },
    {
      path: '/step-four',
      name: 'step-four',
      component: StepFour,
    },
    {
      path: '/step-five',
      name: 'step-five',
      component: StepFive,
    },
    {
      path: '/step-six',
      name: 'step-six',
      component: StepSix,
    },
  ],
})

export default router
