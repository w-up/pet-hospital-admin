import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'feedback-';

export default {
    path: '/feedback',
    name: 'feedback',
    redirect: {
        name: `${pre}feedback`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'feedback',
            name: `${pre}feedback`,
            meta: {
                ...meta,
                title: '意见反馈'
            },
            component: () => import('@/pages/feedback/feedback')
        }
    ]
};
