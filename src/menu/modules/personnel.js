const pre = '/personnel/';

export default {
    path: '/personnel',
    title: '人员管理',
    header: 'personnel',
    icon: 'md-person',
    children: [
        {
            path: `${pre}user-info`,
            title: '员工管理'
        },
        {
            path: `${pre}user-schedule`,
            title: '员工排班'
        }
    ]
}
