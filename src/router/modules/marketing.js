import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'marketing-';

export default {
    path: '/marketing',
    name: 'marketing',
    redirect: {
        name: `${pre}purchase-settlement`
    },
    meta,
    component: BasicLayout,
    children: [
    ]
};
