import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
import welcome from '@/views/welcome/welcome.vue'
import notFound from '@/views/notFound/notFound.vue'
import article from '@/views/article/article.vue'
import image from '@/views/image/image.vue'
import publish from '@/views/publish/publish.vue'
import comment from '@/views/comment/comment.vue'
import fans from '@/views/fans/fans.vue'
import setting from '@/views/setting/setting.vue'
import store from '@/store/store.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login', component: login
    }, {
      path: '/',
      component: home,
      children: [
        { path: '', name: 'welcome', component: welcome },
        { path: '/article', name: 'article', component: article },
        { path: '/image', name: 'image', component: image },
        { path: '/publish', name: 'publish', component: publish },
        { path: '/comment', name: 'comment', component: comment },
        { path: '/fans', name: 'fans', component: fans },
        { path: '/setting', name: 'setting', component: setting }
      ]
    }, {
      path: '*', component: notFound
    }]
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
