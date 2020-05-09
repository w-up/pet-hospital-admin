const pre = '/general/';

export default {
    path: '/general',
    title: '通用设置',
    header: 'general',
    icon: 'md-settings',
    children: [
        {
            path: `${pre}consumption-setting`,
            title: '消费设置'
        },
        {
            path: `${pre}check-setting`,
            title: '检验设置'
        },
        {
            path: `${pre}goods-combination`,
            title: '商品组合'
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
            path: `${pre}pet`,
            title: '宠物设置'
        },
        {
            path: `${pre}template`,
            title: '模板设置'
        },
        {
            path: `${pre}appointment-type`,
            title: '预约类型'
        },
        {
            path: `${pre}treatment-item`,
            title: '诊疗科目'
        },
        {
            path: `${pre}record-classification`,
            title: '病情分类'
        },
        {
            path: `${pre}position`,
            title: '职位设置'
        },
        {
            path: `${pre}system-first-diagnosis`,
            title: '系统初诊管理'
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
            path: `${pre}help-center`,
            title: '帮助中心管理',
            children: [
                {
                    path: `${pre}help-center/common-problem`,
                    title: '常见问题'
                }
            ]
        },
        {
            path: `${pre}reminder-setting`,
            title: '提醒设置'
        }
        // {
        //     path: `${pre}module`,
        //     title: '模块管理'
        // }
    ]
}
