import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'feedback-';

export default {
    path: '/feedback',
    name: 'feedback',
    redirect: {
        name: `${pre}purchase-settlement`
    },
    meta,
    component: BasicLayout,
    children: [
    ]
};
