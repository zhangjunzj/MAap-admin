import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/login'
import Main from '@/page/Main'
import ProjectList from '@/page/projectlist'
import NewsList from '@/page/newslist'
import AddProject from '@/page/addproject'
import AddNews from '@/page/addnews'
import About from '@/page/about'
import Introduce from '@/page/introduce'
import User from '@/page/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/main/projectlist',
          name: 'ProjectList',
          component: ProjectList
        },
        {
          path: '/main/newslist',
          name: 'NewsList',
          component: NewsList
        },
        {
          path: '/main/addproject',
          name: 'AddProject',
          component: AddProject
        },
        {
          path: '/main/addnews',
          name: 'AddNews',
          component: AddNews
        },
        {
          path: '/main/about',
          name: 'About',
          component: About
        },
        {
          path: '/main/introduce',
          name: 'Introduce',
          component: Introduce
        },
        {
          path: '/main/user',
          name: 'User',
          component: User
        }
      ]
    }
  ]
})
