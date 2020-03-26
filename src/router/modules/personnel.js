import BasicLayout from '@/layouts/basic-layout';
import ParentView from '@/components/parent-view';

const meta = {
    auth: true
};

const pre = 'personnel-';

export default {
    path: '/personnel',
    name: 'personnel',
    redirect: {
        name: `${pre}user-info`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'user-info',
            name: `${pre}user-info`,
            meta: {
                ...meta,
                title: '员工管理'
            },
            component: () => import('@/pages/personnel/user-info')
        },
        {
            path: 'user-schedule',
            name: `${pre}user-schedule`,
            meta: {
                ...meta,
                title: '员工排班'
            },
            component: () => import('@/pages/personnel/user-schedule')
        }
    ]
};
