import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';

// 系统管理
import A from '@/views/mock/A.vue';
import B from '@/views/mock/B.vue';
import C from '@/views/mock/C.vue';
import D from '@/views/mock/D.vue';
import E from '@/views/mock/E.vue';
import F from '@/views/mock/F.vue';

// 定义路由信息
// 注意：name是vue-router中的命名路由的名字，不需要考虑国际化
let routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                name: 'profile',
                path: '/',
                component: Profile,
                meta: {
                    title: '首页'
                }
            },
            {
                name: 'A',
                path: '/a',
                component: A,
                meta: {
                    title: 'A'
                }
            },
            {
                name: 'B',
                path: '/b',
                component: B,
                meta: {
                    title: 'B'
                }
            },
            {
                name: 'C',
                path: '/c',
                component: C,
                meta: {
                    title: 'C'
                }
            },
            {
                name: 'D',
                path: '/d',
                component: D,
                meta: {
                    title: 'D'
                }
            },
            {
                name: 'E',
                path: '/e',
                component: E,
                meta: {
                    title: 'E'
                }
            },
            {
                name: 'F',
                path: '/f',
                component: F,
                meta: {
                    title: 'F'
                }
            }
        ]
    }
];

export default routes;
