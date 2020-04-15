import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'district-';

export default {
    path: '/district',
    name: 'district',
    redirect: {
        name: `${pre}index`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'index',
            name: `${pre}index`,
            meta: {
                ...meta,
                title: '大区管理'
            },
            component: () => import('@/pages/district/index')
        }
    ]
};
