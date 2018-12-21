import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () =>
      import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
      import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () =>
        import('@/views/dashboard/index')
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/admin',
    name: 'Admin',
    hidden: true,
    children: [{
      path: 'admin',
      component: () =>
        import('@/views/admin/index')
    }]
  }
]

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/',
  component: Layout,
  name: 'Operation',
  meta: {
    title: '运维工具',
    icon: 'nested'
  },
  children: [
    // {
    //   // path: '/user',
    //   // component: () => import('@/views/operation/user/index'),
    //   // name: 'User',
    //   // resource: 'User',
    //   // meta: {
    //   //   title: '用户检测'
    //   // }
    // },
    {
      path: '/servers',
      component: () => import('@/views/operation/servers/index'),
      name: 'Servers',
      resource: 'Servers',
      meta: {
        title: '服务器信息'
      }
    },
    {
      path: '/monitor',
      component: () => import('@/views/operation/monitor/index'),
      name: 'Monitor',
      resource: 'Monitor',
      meta: {
        title: '监测工具'
      }
    },
    {
      path: '/email',
      component: () => import('@/views/operation/email/index'),
      name: 'Email',
      resource: 'Email',
      meta: {
        title: '邮件管理'
      }
    },
    {
      path: '/notice',
      component: () => import('@/views/operation/notice/index'),
      name: 'Notice',
      resource: 'Notice',
      meta: {
        title: '公告管理'
      }
    }
  ]
}, {
  path: '/advanced',
  component: Layout,
  name: 'Advanced',
  meta: {
    title: '高级',
    icon: 'nested'
  },
  children: [
    {
      path: '/announcement',
      component: () => import('@/views/operation/noticeLog/index'),
      name: 'Announcement',
      resource: 'Announcement',
      meta: {
        title: '公告发布日志'
      }
    },
    {
      path: '/mailOut',
      component: () => import('@/views/operation/announcement/index'),
      name: 'MailOut',
      resource: 'MailOut',
      meta: {
        title: '邮件发布日志'
      }
    },
    {
      path: '/complaintMailbox ',
      component: () => import('@/views/operation/announcement/index'),
      name: 'ComplaintMailbox',
      resource: 'ComplaintMailbox',
      meta: {
        title: '举报处理日志'
      }
    },
    {
      path: '/petition',
      component: () => import('@/views/operation/announcement/index'),
      name: 'Petition',
      resource: 'Petition',
      meta: {
        title: '申诉处理日志'
      }
    },
    {
      path: '/forbidAccount',
      component: () => import('@/views/operation/announcement/index'),
      name: 'ForbidAccount',
      resource: 'ForbidAccount',
      meta: {
        title: '封号日志'
      }
    },
    {
      path: '/resourceAudit',
      component: () => import('@/views/operation/announcement/index'),
      name: 'ResourceAudit',
      resource: 'ResourceAudit',
      meta: {
        title: '资源审核日志'
      }
    },
    {
      path: '/gameReview',
      component: () => import('@/views/operation/announcement/index'),
      name: 'GameReview',
      resource: 'GameReview',
      meta: {
        title: '游戏审核日志'
      }
    },
    {
      path: '/filmReview',
      component: () => import('@/views/operation/announcement/index'),
      name: 'FilmReview',
      resource: 'FilmReview',
      meta: {
        title: '电影审核日志'
      }
    },
    {
      path: '/whiteList',
      component: () => import('@/views/operation/announcement/index'),
      name: 'WhiteList',
      resource: 'WhiteList',
      meta: {
        title: '添加白名单'
      }
    }
  ]
}
]
