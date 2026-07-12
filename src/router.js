import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import GetStartedView from './views/GetStartedView.vue'
import AboutUsView from './views/AboutUsView.vue'
import PrivacyPolicyView from './views/PrivacyPolicyView.vue'
import SupportView from './views/SupportView.vue'
import AccountDeletionView from './views/AccountDeletionView.vue'
import UserAgreementView from './views/UserAgreementView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Drop N Launch | Baseball and Softball Launch Monitor App' },
    },
    {
      path: '/get-started',
      name: 'get-started',
      component: GetStartedView,
      meta: { title: 'Get Started | Drop N Launch' },
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUsView,
      meta: { title: 'About Us | Drop N Launch' },
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: { title: 'Privacy Policy | Drop N Launch' },
    },
    {
      path: '/support',
      name: 'support',
      component: SupportView,
      meta: { title: 'Support | Drop N Launch' },
    },
    {
      path: '/accountdeletion',
      name: 'account-deletion',
      component: AccountDeletionView,
      meta: { title: 'Account Deletion | Drop N Launch' },
    },
    {
      path: '/user-agreement',
      name: 'user-agreement',
      component: UserAgreementView,
      meta: { title: 'User Agreement | Drop N Launch' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Refresh / first load — always start at top (ignore leftover hashes)
    if (from.matched.length === 0) {
      return { top: 0 }
    }
    if (to.hash) {
      return { el: to.hash, top: 140 }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Drop N Launch'
})

export default router
