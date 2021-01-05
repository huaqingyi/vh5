import Layout from '@/layout/index.vue';

export default [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        component: Layout,
        children: [
            { path: '', redirect: 'index' },
            {
                path: 'index',
                component: () => import('@/pages/dashboard/index.vue'),
                name: 'Dashboard',
                meta: {
                    title: 'dashboard',
                    icon: 'dashboard',
                    affix: true
                }
            }
        ]
    },
];
