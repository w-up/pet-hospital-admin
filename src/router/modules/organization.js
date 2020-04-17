import BasicLayout from '@/layouts/basic-layout';
import ParentView from '@/components/parent-view';

const meta = {
    auth: true
};

const pre = 'organization-';

export default {
    path: '/organization',
    name: 'organization',
    redirect: {
        name: `${pre}district`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'district',
            name: `${pre}district`,
            redirect: {
                name: `${pre}district-index`
            },
            meta,
            component: ParentView,
            children: [
                {
                    path: 'index',
                    name: `${pre}district-index`,
                    meta: {
                        ...meta,
                        title: '大区管理'
                    },
                    component: () => import('@/pages/organization/district/index')
                }
            ]
        },
        {
            path: 'hospital',
            name: `${pre}hospital`,
            redirect: {
                name: `${pre}hospital-index`
            },
            meta,
            component: ParentView,
            children: [
                {
                    path: 'index',
                    name: `${pre}hospital-index`,
                    meta: {
                        ...meta,
                        title: '医院管理'
                    },
                    component: () => import('@/pages/organization/hospital/index')
                }
            ]
        },
        {
            path: 'personnel',
            name: `${pre}personnel`,
            redirect: {
                name: `${pre}user-info`
            },
            meta,
            component: ParentView,
            children: [
                {
                    path: 'user-info',
                    name: `${pre}user-info`,
                    meta: {
                        ...meta,
                        title: '员工管理'
                    },
                    component: () => import('@/pages/organization/personnel/user-info')
                },
                {
                    path: 'user-schedule',
                    name: `${pre}user-schedule`,
                    meta: {
                        ...meta,
                        title: '员工排班'
                    },
                    component: () => import('@/pages/organization/personnel/user-schedule')
                }
            ]
        }
    ]
};
