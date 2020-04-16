const pre = '/organization/';

export default {
    path: '/organization',
    title: '组织机构',
    header: 'organization',
    icon: 'md-home',
    children: [
        {
            path: `${pre}district`,
            title: '大区管理',
            children: [
                {
                    path: `${pre}district/index`,
                    title: '大区管理'
                }
            ]
        },
        {
            path: `${pre}hospital`,
            title: '医院管理',
            children: [
                {
                    path: `${pre}hospital/index`,
                    title: '医院管理'
                }
            ]
        },
        {
            path: `${pre}personnel`,
            title: '人员管理',
            children: [
                {
                    path: `${pre}personnel/user-info`,
                    title: '员工管理'
                },
                {
                    path: `${pre}personnel/user-schedule`,
                    title: '排班管理'
                }
            ]
        }
    ]
}
