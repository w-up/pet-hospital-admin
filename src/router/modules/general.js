import BasicLayout from '@/layouts/basic-layout';
import ParentView from '@/components/parent-view';

const meta = {
    auth: true
};

const pre = 'general-';

export default {
    path: '/general',
    name: 'general',
    redirect: {
        name: `${pre}consumption-setting`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'consumption-setting',
            name: `${pre}consumption-setting`,
            meta: {
                ...meta,
                title: '消费设置'
            },
            component: () => import('@/pages/general/consumption-setting')
        },
        {
            path: 'check-setting',
            name: `${pre}check-setting`,
            meta: {
                ...meta,
                title: '检验设置'
            },
            component: () => import('@/pages/general/check-setting')
        },
        {
            path: 'goods-combination',
            name: `${pre}goods-combination`,
            meta: {
                ...meta,
                title: '商品组合'
            },
            component: () => import('@/pages/general/goods-combination')
        },
        {
            path: 'discount-setting',
            name: `${pre}discount-setting`,
            meta: {
                ...meta,
                title: '折扣设置'
            },
            component: () => import('@/pages/general/discount-setting')
        },
        {
            path: 'card',
            name: `${pre}card`,
            meta: {
                ...meta,
                title: '卡片管理'
            },
            component: () => import('@/pages/general/card')
        },
        {
            path: 'pet',
            name: `${pre}pet`,
            meta: {
                ...meta,
                title: '宠物设置'
            },
            component: () => import('@/pages/general/pet')
        },
        {
            path: 'template',
            name: `${pre}template`,
            meta: {
                ...meta,
                title: '模板设置'
            },
            component: () => import('@/pages/general/template')
        },
        {
            path: 'system-first-diagnosis',
            name: `${pre}system-first-diagnosis`,
            meta: {
                ...meta,
                title: '系统初诊管理'
            },
            component: () => import('@/pages/general/system-first-diagnosis')
        },
        {
            path: 'commission-plan',
            name: `${pre}commission-plan`,
            meta: {
                ...meta,
                title: '医生提成设置'
            },
            component: () => import('@/pages/general/commission-plan')
        },
        {
            path: 'company',
            name: `${pre}company`,
            meta: {
                ...meta,
                title: '往来单位'
            },
            component: () => import('@/pages/general/company')
        },
        {
            path: 'help-center',
            name: `${pre}help-center`,
            redirect: {
                name: `${pre}help-center-common-problem`
            },
            meta,
            component: ParentView,
            children: [
                {
                    path: 'common-problem',
                    name: `${pre}help-center-common-problem`,
                    meta: {
                        ...meta,
                        title: '常见问题'
                    },
                    component: () => import('@/pages/general/help-center/common-problem')
                }
            ]
        },
        {
            path: 'reminder-setting',
            name: `${pre}reminder-setting`,
            meta: {
                ...meta,
                title: '提醒设置'
            },
            component: () => import('@/pages/general/reminder-setting')
        }
    ]
};
