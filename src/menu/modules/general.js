const pre = '/general/';

export default {
    path: '/general',
    title: '通用设置',
    header: 'general',
    icon: 'md-settings',
    children: [
        {
            path: `${pre}hospital`,
            title: '医院信息'
        },
        {
            path: `${pre}user-info`,
            title: '员工管理'
        },
        {
            path: `${pre}user-schedule`,
            title: '排班管理'
        },
        {
            path: `${pre}commission-plan`,
            title: '医生提成设置'
        },
        {
            path: `${pre}company`,
            title: '往来单位'
        },
        {
            path: `${pre}pet`,
            title: '宠物设置'
        },
        {
            path: `${pre}consumption-setting`,
            title: '消费设置'
        },
        {
            path: `${pre}card`,
            title: '卡片管理'
        },
        {
            path: `${pre}discount-setting`,
            title: '折扣设置'
        },
        {
            path: `${pre}marketing-management`,
            title: '营销管理'
        },
        {
            path: `${pre}template`,
            title: '模板设置'
        },
        {
            path: `${pre}goods-combination`,
            title: '商品组合'
        },
        {
            path: `${pre}check-setting`,
            title: '检验设置'
        },
        {
            path: `${pre}reminder-setting`,
            title: '提醒设置'
        }
    ]
}
