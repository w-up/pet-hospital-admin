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
            path: `${pre}cross-shop-duty`,
            title: '跨店值班'
        },
        {
            path: `${pre}user-schedule`,
            title: '排班管理'
        },
        {
            path: `${pre}company`,
            title: '往来单位'
        },
        {
            path: `${pre}marketing-management`,
            title: '营销管理'
        }
    ]
}
