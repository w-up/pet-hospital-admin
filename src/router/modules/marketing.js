import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'marketing-';

export default {
    path: '/marketing',
    name: 'marketing',
    redirect: {
        name: `${pre}marketing-management`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'marketing-management',
            name: `${pre}marketing-management`,
            meta: {
                ...meta,
                title: '营销管理'
            },
            component: () => import('@/pages/marketing/marketing-management')
        }
    ]
};
