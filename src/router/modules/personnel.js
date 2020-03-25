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
                title: '首页管理',
                closable: false
            },
            component: () => import('@/pages/consumer/index')
        },
        {
            path: 'consumer-registration',
            name: `${pre}consumer-registration`,
            meta: {
                ...meta,
                title: '顾客挂号'
            },
            component: () => import('@/pages/consumer/consumer-registration')
        },
        {
            path: 'member',
            name: `${pre}member`,
            meta: {
                ...meta,
                title: '登记办卡'
            },
            component: () => import('@/pages/consumer/member')
        },
        {
            path: 'outpatient',
            name: `${pre}outpatient`,
            redirect: {
                name: `${pre}outpatient-record`
            },
            meta,
            component: ParentView,
            children: [
                {
                    path: 'record',
                    name: `${pre}outpatient-record`,
                    meta: {
                        ...meta,
                        title: '病历'
                    },
                    component: () => import('@/pages/consumer/outpatient/record')
                },
                {
                    path: 'inpatient',
                    name: `${pre}outpatient-inpatient`,
                    meta: {
                        ...meta,
                        title: '住院组'
                    },
                    component: () => import('@/pages/consumer/outpatient/inpatient')
                }
            ]
        },
        {
            path: 'beauty-service',
            name: `${pre}beauty-service`,
            meta: {
                ...meta,
                title: '美容服务'
            },
            component: () => import('@/pages/consumer/beauty-service')
        },
        {
            path: 'vaccine-insect-repellent',
            name: `${pre}vaccine-insect-repellent`,
            meta: {
                ...meta,
                title: '疫苗驱虫'
            },
            component: () => import('@/pages/consumer/vaccine-insect-repellent')
        },
        {
            path: 'foster-service',
            name: `${pre}foster-service`,
            meta: {
                ...meta,
                title: '寄养服务'
            },
            component: () => import('@/pages/consumer/foster-service')
        },
        {
            path: 'laboratory-examination',
            name: `${pre}laboratory-examination`,
            meta: {
                ...meta,
                title: '化验检查'
            },
            component: () => import('@/pages/consumer/laboratory-examination')
        },
        {
            path: 'video-examination',
            name: `${pre}video-examination`,
            meta: {
                ...meta,
                title: '影像检查'
            },
            component: () => import('@/pages/consumer/video-examination')
        },
        {
            path: 'goods-sales',
            name: `${pre}goods-sales`,
            meta: {
                ...meta,
                title: '商品销售'
            },
            component: () => import('@/pages/consumer/goods-sales')
        }
    ]
};
