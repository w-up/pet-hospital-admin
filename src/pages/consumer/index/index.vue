<template>
  <div>
    <Card>
      <Row :gutter="24" type="flex" class="mtb15">
        <Col span="18">
          <Row style="margin:15px 0 30px 0">
            <Col span="4" class="ivu-text-center">
              <Tag color="primary" size="large" class="index-tag">
                <p>今日到店</p>
                <p>1</p>
              </Tag>
            </Col>
            <Col span="4" class="ivu-text-center">
              <Tag color="success" size="large" class="index-tag">
                <p>今日预约</p>
                <p>1</p>
              </Tag>
            </Col>
            <Col span="4" class="ivu-text-center">
              <Tag color="error" size="large" class="index-tag">
                <p>今日账单</p>
                <p>1</p>
              </Tag>
            </Col>
            <Col span="4" class="ivu-text-center">
              <Tag color="warning" size="large" class="index-tag">
                <p>今已结算</p>
                <p>13</p>
              </Tag>
            </Col>
            <Col span="4" class="ivu-text-center">
              <Tag color="magenta" size="large" class="index-tag vertical-align">
                <p>今未结算</p>
              </Tag>
            </Col>
          </Row>
          <Row>
            <Tabs :animated="false">
              <TabPane label="预约（1）" name="name1">
                <Row :gutter="16">
                  <Form ref="form" :model="search" :label-width="70" class="myform">
                    <Col span="5">
                      <FormItem label="类型：">
                        <Select value="0" placeholder="请选择">
                          <Option value="0">全部</Option>
                          <Option value="1">条目一</Option>
                          <Option value="2">条目二</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="5">
                      <FormItem label="日期：">
                        <DatePicker type="daterange" placeholder="请选择开始结束日期" style="width: 100%"></DatePicker>
                      </FormItem>
                    </Col>
                    <Col span="6" class="search-button-group">
                      <Button type="success" ghost size="small" class="mr10">今日</Button>
                      <Button type="warning" ghost size="small" class="mr10">未来三天</Button>
                      <Button type="error" ghost size="small">未来七天</Button>
                    </Col>
                    <Col span="5">
                      <FormItem label="查询条件">
                        <Input v-model="search.name" placeholder="请输入搜索条件" />
                      </FormItem>
                    </Col>
                    <Col span="2">
                      <Button type="primary" @click="handleAppointmentModal">预约</Button>
                    </Col>
                  </Form>
                </Row>
                <Table border :columns="columns1" :data="data1"></Table>
              </TabPane>
              <TabPane label="寄养住院（2）" name="name2">
                <Row :gutter="16">
                  <Form ref="form" :model="search" :label-width="70" class="myform">
                    <Col span="6">
                      <FormItem label="日期：">
                        <DatePicker type="daterange" placeholder="请选择开始结束日期" style="width: 100%"></DatePicker>
                      </FormItem>
                    </Col>
                    <Col span="6" class="search-button-group">
                      <Button type="success" ghost size="small" class="mr10">今日</Button>
                      <Button type="warning" ghost size="small" class="mr10">未来三天</Button>
                      <Button type="error" ghost size="small">未来七天</Button>
                    </Col>
                    <Col span="12">
                      <FormItem label="查询条件">
                        <Input v-model="search.name" placeholder="请输入搜索条件" />
                      </FormItem>
                    </Col>
                  </Form>
                </Row>
                <Table border :columns="columns2" :data="data1"></Table>
              </TabPane>
              <TabPane label="门诊病例（3）" name="name3">
                <Row :gutter="16">
                  <Form ref="form" :model="search" :label-width="70" class="myform">
                    <Col span="6">
                      <FormItem label="日期：">
                        <DatePicker type="daterange" placeholder="请选择开始结束日期" style="width: 100%"></DatePicker>
                      </FormItem>
                    </Col>
                    <Col span="6" class="search-button-group">
                      <Button type="success" ghost size="small" class="mr10">今日</Button>
                      <Button type="warning" ghost size="small" class="mr10">未来三天</Button>
                      <Button type="error" ghost size="small">未来七天</Button>
                    </Col>
                    <Col span="12">
                      <FormItem label="查询条件">
                        <Input v-model="search.name" placeholder="请输入搜索条件" />
                      </FormItem>
                    </Col>
                  </Form>
                </Row>
                <Table border :columns="columns3" :data="data1"></Table>
              </TabPane>
              <TabPane label="疫苗驱虫（12）" name="name4">
                <Row :gutter="16">
                  <Form ref="form" :model="search" :label-width="70" class="myform">
                    <Col span="6">
                      <FormItem label="日期：">
                        <DatePicker type="daterange" placeholder="请选择开始结束日期" style="width: 100%"></DatePicker>
                      </FormItem>
                    </Col>
                    <Col span="6" class="search-button-group">
                      <Button type="success" ghost size="small" class="mr10">今日</Button>
                      <Button type="warning" ghost size="small" class="mr10">未来三天</Button>
                      <Button type="error" ghost size="small">未来七天</Button>
                    </Col>
                    <Col span="12">
                      <FormItem label="查询条件">
                        <Input v-model="search.name" placeholder="请输入搜索条件" />
                      </FormItem>
                    </Col>
                  </Form>
                </Row>
                <Table border :columns="columns4" :data="data1"></Table>
              </TabPane>
              <TabPane label="美容服务（2）" name="name5">
                <Row :gutter="16">
                  <Form ref="form" :model="search" :label-width="70" class="myform">
                    <Col span="6">
                      <FormItem label="日期：">
                        <DatePicker type="daterange" placeholder="请选择开始结束日期" style="width: 100%"></DatePicker>
                      </FormItem>
                    </Col>
                    <Col span="6" class="search-button-group">
                      <Button type="success" ghost size="small" class="mr10">今日</Button>
                      <Button type="warning" ghost size="small" class="mr10">未来三天</Button>
                      <Button type="error" ghost size="small">未来七天</Button>
                    </Col>
                    <Col span="12">
                      <FormItem label="查询条件">
                        <Input v-model="search.name" placeholder="请输入搜索条件" />
                      </FormItem>
                    </Col>
                  </Form>
                </Row>
                <Table border :columns="columns5" :data="data1"></Table>
              </TabPane>
              <TabPane label="来电记录（0）" name="name6">
                <Table border :columns="columns1" :data="data1"></Table>
              </TabPane>
            </Tabs>
          </Row>
        </Col>
        <Col span="6">
          <Row>
            <calendar></calendar>
          </Row>
          <Row class="ivu-mt">
            <Col span="24">
              <Card class="mycard">
                <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
                  <Col span="24">
                    <span class="module-title">员工列表</span>
                  </Col>
                </Row>
                <Row :gutter="24" type="flex" justify="end">
                  <Col span="24">
                    <List class="user-list">
                      <ListItem
                        v-for="(item, index) in list"
                        :key="index"
                        :class="item.name===currentName?'active':''"
                      >
                        <p @click="switchList(item.name)">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</p>
                      </ListItem>
                    </List>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>

    <!-- 预约处理 -->
    <Modal v-model="appointmentModal" width="40%" class="mymodal">
      <p slot="header">
        <Col span="24">手术预约</Col>
      </p>

      <Row>
        <Form ref="form" :model="member" :label-width="100" class="myform">
          <FormItem label="预约状态">
            <Select value="0">
              <Option value="0">条目一</Option>
              <Option value="1">条目二</Option>
              <Option value="2">条目三</Option>
              <Option value="3">条目四</Option>
            </Select>
          </FormItem>
          <FormItem label="创建时间">2020-02-03 15:00</FormItem>
          <FormItem label="顾客姓名">张先生</FormItem>
          <FormItem label="联系方式">13032132345</FormItem>
          <FormItem label="宠物姓名">憨憨</FormItem>
          <FormItem label="预约类型">手术预约</FormItem>
          <FormItem label="预约医生">张华</FormItem>
          <FormItem label="预约日期">
            <DatePicker type="date" placeholder="请选择预约日期" style="width: 100%"></DatePicker>
          </FormItem>
          <FormItem label="备注">
            <Input type="textarea" />
          </FormItem>
          <FormItem label>
            <Checkbox>微信提醒</Checkbox>
            <span style="color:#ccc">尚未设置提醒规则</span>
          </FormItem>
          <FormItem label>
            <Checkbox>短信提醒</Checkbox>
            <span style="color:#ccc">尚未设置提醒规则</span>
          </FormItem>
        </Form>
      </Row>

      <Row>
        <Col span="12" class="ivu-text-center">
          <Button type="primary">设置自动提醒规则</Button>
        </Col>
        <Col span="12" class="ivu-text-center">
          <Button type="info" @click="handleEditAutoRemindModal">修改本次提醒规则</Button>
        </Col>
      </Row>

      <div slot="footer">
        <Row>
          <Col span="12" class="ivu-text-left">
            <Button type="error">取消预约</Button>
            <Button type="warning">去处理</Button>
          </Col>
          <Col span="12" class="ivu-text-right">
            <Button type="success" @click="handleAddAppointmentModal">确认</Button>
          </Col>
        </Row>
      </div>
    </Modal>

    <!-- 新增预约 -->
    <Modal v-model="addAppointmentModal" width="50%" class="mymodal">
      <p slot="header">
        <Col span="24">添加预约</Col>
      </p>

      <Row :gutter="16">
        <Col span="6">
          <Card class="mycard">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="16">
                <span class="module-title">宠物列表</span>
              </Col>
              <Col span="8" class="ivu-text-right">
                <Button size="small" type="info">挂号表</Button>
              </Col>
            </Row>
            <Row :gutter="24" type="flex" justify="end">
              <Col span="24">
                <Select value="0" placeholder="请选择">
                  <Option value="0">默认全部搜索</Option>
                  <Option value="1">宠物编号</Option>
                  <Option value="2">电话号码</Option>
                  <Option value="3">会员卡号</Option>
                </Select>
              </Col>
              <Col span="24" class="mt5">
                <Input prefix="ios-search" placeholder="宠物编号/电话号码/会员卡号" />
              </Col>
            </Row>
            <Row :gutter="24" type="flex" justify="end">
              <Col span="24">
                <List class="staff-list" style="height:495px">
                  <ListItem v-for="(item, index) in data" :key="index">
                    <div style="text-indent: 1em;">
                      <p>{{ item.name }}</p>
                      <p>{{ item.cellphone }}</p>
                    </div>
                  </ListItem>
                </List>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span="18">
          <Card class="mycard">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="24">
                <span class="module-title">添加预约内容</span>
              </Col>
            </Row>
            <Row>
              <Col span="22" class="ivu-mt">
                <Form ref="form" :model="appointment" :rules="rules" :label-width="100">
                  <FormItem label="创建时间">2020-02-03 15:00</FormItem>
                  <FormItem label="顾客姓名" prop="name">
                    <Input v-model="appointment.name" />
                  </FormItem>
                  <FormItem label="联系方式" prop="name">
                    <Input v-model="appointment.name" />
                  </FormItem>
                  <FormItem label="宠物姓名">
                    <Input v-model="appointment.name" />
                  </FormItem>
                  <FormItem label="预约类型">
                    <Select v-model="member.petType" placeholder="选择预约类型">
                      <Option value="0">条目一</Option>
                      <Option value="1">条目二</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="预约医生">
                    <Select v-model="member.petType" placeholder="选择预约医生">
                      <Option value="0">条目一</Option>
                      <Option value="1">条目二</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="预约日期">
                    <DatePicker type="date" placeholder="请选择预约日期" style="width: 100%"></DatePicker>
                  </FormItem>
                  <FormItem label="备注">
                    <Input v-model="appointment.name" type="textarea" />
                  </FormItem>
                  <FormItem label>
                    <Checkbox>微信提醒</Checkbox>
                    <span style="color:#ccc">尚未设置提醒规则</span>
                  </FormItem>
                  <FormItem label>
                    <Checkbox v-model="appointment.message">短信提醒</Checkbox>
                    <span style="color:#ccc">尚未设置提醒规则</span>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <div slot="footer">
        <Row>
          <Col span="12" class="ivu-text-left">
            <Button type="primary">设置自动提醒规则</Button>
            <Button type="info" @click="handleEditAutoRemindModal">修改本次提醒规则</Button>
          </Col>
          <Col span="12" class="ivu-text-right">
            <Button type="success">确认</Button>
          </Col>
        </Row>
      </div>
    </Modal>

    <!-- 修改本次预约的自动提醒规则 -->
    <Modal v-model="editAutoRemindModal" class="mymodal">
      <p slot="header">
        <Col span="24">修改本次预约的自动提醒规则</Col>
      </p>

      <Row>
        <Form ref="form" :model="appointment" :label-width="180" class="myform">
          <FormItem label="（微信）自动发送通知">
            <Checkbox v-model="appointment.message">到期前 [ 0 ] 天发送预约提醒</Checkbox>
          </FormItem>
          <FormItem>
            <Checkbox>预约日期当天发送提醒</Checkbox>
          </FormItem>
          <div style="border-bottom:1px solid #ccc"></div>
          <FormItem label="（微信）自动发送通知" class="ivu-mt">
            <Checkbox>到期前 [ 0 ] 天发送预约提醒</Checkbox>
          </FormItem>
          <FormItem>
            <Checkbox>预约日期当天发送提醒</Checkbox>
          </FormItem>
        </Form>
      </Row>
    </Modal>
  </div>
</template>
<script>
    import calendar from '../../../components/calendar/calendar.vue';
    export default {
        name: 'index',
        components: {
            calendar
        },
        data () {
            return {
                data: [
                    {
                        id: '123456700',
                        name: 'Aresn（贝贝）',
                        is_check: true,
                        cellphone: '13712121212'
                    },
                    {
                        id: '123456701',
                        name: '中小鱼（猪猪）',
                        is_check: false,
                        cellphone: '13712121213'
                    },
                    {
                        id: '123456702',
                        name: 'Echo（小狗）',
                        is_check: true,
                        cellphone: '13712121214'
                    },
                    {
                        id: '123456703',
                        name: '唐不苦（阿拉）',
                        is_check: true,
                        cellphone: '13712121215'
                    },
                    {
                        id: '123456704',
                        name: '甜筒（皮皮）',
                        is_check: false,
                        cellphone: '13712121212'
                    },
                    {
                        id: '123456705',
                        name: '冷月呆呆（憨憨）',
                        is_check: true,
                        cellphone: '13712121216'
                    }
                ],
                list: [
                    { name: '全体员工' },
                    { name: '王艳（财务）' },
                    { name: '刘涛（出纳）' },
                    { name: '张择端（院长）' }
                ],
                currentName: '全体员工',
                columns1: [
                    {
                        title: '预约时间',
                        key: 'time'
                    },
                    {
                        title: '预约信息',
                        key: 'info'
                    },
                    {
                        title: '宠物信息',
                        key: 'petInfo'
                    },
                    {
                        title: '宠物主人',
                        key: 'user'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '是否到店',
                        key: 'isComeShop'
                    },
                    {
                        title: '提醒',
                        render: (h, params) => {
                            return h('div', params.row.tips);
                        }
                    },
                    {
                        title: '处理',
                        key: 'handle'
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        }
                    }
                ],
                columns2: [
                    {
                        title: '住院时间',
                        key: 'time'
                    },
                    {
                        title: '住院信息',
                        key: 'info'
                    },
                    {
                        title: '宠物信息',
                        key: 'petInfo'
                    },
                    {
                        title: '宠物主人',
                        key: 'user'
                    },
                    {
                        title: '金额',
                        width: '80',
                        key: 'fee'
                    },
                    {
                        title: '押金预计剩余',
                        key: 'isComeShop'
                    },
                    {
                        title: '结算情况',
                        key: 'status'
                    },
                    {
                        title: '查看',
                        width: '80',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '详情'
                                )
                            ]);
                        }
                    },
                    {
                        title: '查看',
                        width: '80',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '账单'
                                )
                            ]);
                        }
                    }
                ],
                columns3: [
                    {
                        title: '创建时间',
                        key: 'time'
                    },
                    {
                        title: '主治医生',
                        key: 'info'
                    },
                    {
                        title: '病历分类',
                        key: 'xxx'
                    },
                    {
                        title: '编号',
                        key: 'xx'
                    },
                    {
                        title: '宠物信息',
                        key: 'petInfo'
                    },
                    {
                        title: '宠物主人',
                        key: 'user'
                    },
                    {
                        title: '金额',
                        width: '80',
                        key: 'fee'
                    },
                    {
                        title: '结算情况',
                        key: 'status'
                    },
                    {
                        title: '详情',
                        width: '80',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '账单'
                                )
                            ]);
                        }
                    },
                    {
                        title: '查看',
                        width: '80',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '账单'
                                )
                            ]);
                        }
                    }
                ],
                columns4: [
                    {
                        title: '创建时间',
                        key: 'time'
                    },
                    {
                        title: '疫苗信息',
                        key: 'info'
                    },
                    {
                        title: '宠物信息',
                        key: 'petInfo'
                    },
                    {
                        title: '宠物主人',
                        key: 'user'
                    },
                    {
                        title: '金额',
                        width: '80',
                        key: 'fee'
                    },
                    {
                        title: '结算情况',
                        key: 'status'
                    },
                    {
                        title: '详情',
                        width: '80',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '账单'
                                )
                            ]);
                        }
                    },
                    {
                        title: '查看',
                        width: '80',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '账单'
                                )
                            ]);
                        }
                    }
                ],
                columns5: [
                    {
                        title: '创建时间',
                        key: 'time'
                    },
                    {
                        title: '负责医师',
                        key: 'xx'
                    },
                    {
                        title: '疫苗信息',
                        key: 'info'
                    },
                    {
                        title: '宠物信息',
                        key: 'petInfo'
                    },
                    {
                        title: '宠物主人',
                        key: 'user'
                    },
                    {
                        title: '金额',
                        width: '80',
                        key: 'fee'
                    },
                    {
                        title: '结算情况',
                        key: 'status'
                    },
                    {
                        title: '详情',
                        width: '80',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '账单'
                                )
                            ]);
                        }
                    },
                    {
                        title: '查看',
                        width: '80',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '账单'
                                )
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        time: '2020.02.01 10:00',
                        info: '手术预约(王艳)',
                        petInfo: '豆豆(犬类) 金毛 1岁8月',
                        user: '张先生 18876767465',
                        remark: '',
                        isComeShop: '未到店',
                        tips: '微信提醒(1)\n短信提醒(1)',
                        handle: '处理',
                        fee: '200.00',
                        status: '未生成账单'
                    },
                    {
                        time: '2020.02.02 10:00',
                        info: '手术预约(王艳)',
                        petInfo: '憨憨(犬类) 金毛 1岁',
                        user: '李先生 18876767465',
                        remark: '3',
                        isComeShop: '到店',
                        tips: '微信提醒(1)\n短信提醒(1)',
                        handle: '未处理',
                        fee: '120',
                        status: '已支付'
                    }
                ],
                search: {},
                member: {},
                rules: {
                    name: [{ required: true, message: '请输入顾客名称', trigger: 'blur' }],
                    cellphone: [
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    petName: [
                        { required: true, message: '请输入宠物名称', trigger: 'blur' }
                    ]
                },
                appointment: {
                    message: true
                },
                appointmentModal: false,
                addAppointmentModal: false,
                editAutoRemindModal: false
            };
        },
        methods: {
            switchList (name) {
                this.currentName = name;
            },
            handleAppointmentModal () {
                this.appointmentModal = true;
            },
            handleAddAppointmentModal () {
                this.addAppointmentModal = true;
            },
            handleEditAutoRemindModal () {
                this.editAutoRemindModal = true;
            }
        },
        mounted () {}
    };
</script>
<style lang="less" scoped>
.index-tag {
  padding: 4px 36px;
  height: 60px;
  border-radius: 32px;
  font-size: 16px;
}
.index-tag p {
  height: 26px;
  line-height: 26px;
}
.vertical-align p {
  line-height: 52px;
}
.search-button-group {
  height: 34px;
  line-height: 34px;
  text-align: center;
}

.default-calendar {
  min-height: 350px;
}

@media (max-width: 1200px) {
  .default-calendar {
    margin-top: 20px;
  }
}

@media (max-width: 1200px) {
  .default-calendar {
    margin-top: 20px;
  }
}

/*模块标题*/
.mycard .module-title-wrapper {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e9eaec;
  font-weight: 700;
  background-color: #f6f6f6;
  margin: 0;
}
.mt5 {
  margin-top: 5px;
}
</style>
<style lang="less">
.mycard .ivu-card-body {
  padding: 0;
}
.mycard .ivu-row-flex {
  padding: 0 16px;
  margin: 16px 0;
}
.user-list {
  height: 265px;
  overflow: auto;
}
.user-list .ivu-list-item {
  padding: 0;
}
.user-list .ivu-list-item p {
  padding: 12px 0;
  width: 100%;
}
.user-list .active {
  background: #69c5d8;
}
.mymodal .ivu-modal-header {
  background: #f6f6f6;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
</style>
