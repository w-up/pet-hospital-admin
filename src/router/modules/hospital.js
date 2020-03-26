import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'hospital-';

export default {
    path: '/hospital',
    name: 'hospital',
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
                title: '医院管理'
            },
            component: () => import('@/pages/hospital/index')
        }
    ]
};
