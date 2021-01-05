import Vue from 'vue';
import '@/layout/router';
import Router, { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

Vue.use(Router);

export const constantRoutes: RouteConfig[] = [
    {
        path: '/redirect',
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import(/* webpackChunkName: "redirect" */ '@/pages/redirect/index.vue')
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/pages/error-page/404.vue'),
        meta: { hidden: true },
    },
    {
        path: '/401',
        component: () => import('@/pages/error-page/401.vue'),
        meta: { hidden: true },
    },
    {
        path: '*',
        component: () => import('@/pages/error-page/404.vue'),
        meta: { hidden: true },
    },
];

const createRouter = () => {
    return new Router({
        mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
        scrollBehavior: (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        },
        base: process.env.BASE_URL,
        routes: constantRoutes,
    });
};

const router = createRouter();

export const resetRouter = () => {
    const newRouter = createRouter();
    (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router;
