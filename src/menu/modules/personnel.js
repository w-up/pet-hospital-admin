const pre = '/personnel/';

export default {
    path: '/personnel',
    title: '人员管理',
    header: 'personnel',
    icon: 'md-person',
    children: [
        {
            path: `${pre}index`,
            title: '首页管理'
        },
        {
            path: `${pre}member`,
            title: '登记办卡'
        },
        {
            path: `${pre}consumer-registration`,
            title: '顾客挂号'
        },
        {
            path: `${pre}outpatient`,
            title: '门诊住院',
            // icon: 'md-medkit',
            children: [
                {
                    path: `${pre}outpatient/record`,
                    title: '病历'
                },
                {
                    path: `${pre}outpatient/inpatient`,
                    title: '住院组'
                }
            ]
        },
        {
            path: `${pre}beauty-service`,
            title: '美容服务'
        },
        {
            path: `${pre}vaccine-insect-repellent`,
            title: '疫苗驱虫'
        },
        {
            path: `${pre}foster-service`,
            title: '寄养服务'
        },
        {
            path: `${pre}laboratory-examination`,
            title: '化验检查'
        },
        {
            path: `${pre}video-examination`,
            title: '影像检查'
        },
        {
            path: `${pre}goods-sales`,
            title: '商品销售'
        }
    ]
}
