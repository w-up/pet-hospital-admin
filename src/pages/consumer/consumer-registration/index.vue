<template>
  <Row style="background-color: #fff;" :gutter="16">
    <Col span="20">
      <Tabs value="name1">
        <TabPane label="夏天(张华)" name="name1"></TabPane>
        <TabPane label="咪咪(刘烨)" name="name2"></TabPane>
      </Tabs>
      <div>
        <Row>
          <Col span="2" class="ivu-text-right">宠物姓名：</Col>
          <Col span="2" class="ivu-text-left">夏天(母)</Col>
          <Col span="1" class="ivu-text-right">种类：</Col>
          <Col span="1" class="ivu-text-left">犬</Col>
          <Col span="1" class="ivu-text-right">品种：</Col>
          <Col span="1" class="ivu-text-left">泰迪</Col>
          <Col span="1" class="ivu-text-right">年龄：</Col>
          <Col span="2" class="ivu-text-left">0岁11月</Col>
          <Col span="1" class="ivu-text-right">称重：</Col>
          <Col span="1" class="ivu-text-left">0kg</Col>
        </Row>
        <Row class="mtb15 borderandpadding">
          <Col span="2" class="ivu-text-right">主人姓名：</Col>
          <Col span="2" class="ivu-text-left">张</Col>
          <Col span="1" class="ivu-text-right">电话：</Col>
          <Col span="2" class="ivu-text-left">14423232323</Col>
          <Col span="7" class="ivu-text-right">编号：</Col>
          <Col span="1" class="ivu-text-left">P00311</Col>
          <Col span="2" class="ivu-text-right">登记日期：</Col>
          <Col span="2" class="ivu-text-left">2020-04-03</Col>
          <Col span="2" class="ivu-text-right">最近到访：</Col>
          <Col span="3" class="ivu-text-left">2020-01-01 12:00</Col>
        </Row>
        <Row class="mtb15" :gutter="16">
          <Col span="2" class="ivu-text-right">申请挂号</Col>
        </Row>
        <Row :gutter="16">
          <Col span="2" class="ivu-text-right">挂号类别</Col>
          <Col span="3">
            <Select v-model="type" size="small">
              <Option value="门诊挂号">门诊挂号</Option>
            </Select>
          </Col>
          <Col span="2" class="ivu-text-right">主治医师</Col>
          <Col span="3">
            <Select v-model="doctor" size="small">
              <Option value="王艳">王艳</Option>
            </Select>
          </Col>
          <Col span="2" class="ivu-text-right">挂号金额：</Col>
          <Col span="2" class="ivu-text-left" style="padding-left:0">10.00</Col>
          <Col span="9" class="ivu-text-right">
            <Button type="primary">提交挂单号</Button>
          </Col>
        </Row>
        <Row class="mtb15" :gutter="16">
          <Col span="2" class="ivu-text-right">历史挂号</Col>
        </Row>
        <Row>
          <Col span="22" offset="1">
            <Table border :columns="columns1" :data="data1"></Table>
          </Col>
        </Row>
        <Row class="mtb15">
          <Col span="23" class="ivu-text-right">
            <Button type="info">结算</Button>
          </Col>
        </Row>
      </div>
    </Col>
    <Col span="4" style="padding:8px;border:1px solid #ddd;">
      <Row style="padding:8px;background-color: #3874C5;">
        <Col span="8" style="vertical-align:middle">
          <span style="color:white">宠物列表</span>
        </Col>
        <Col span="16" class="ivu-text-right">
          <Button size="small" @click="showRegistrationForm">挂号表</Button>
        </Col>
      </Row>
      <Row class="padding8">
        <Col span="24">
          <Select v-model="searchType" size="small">
            <Option value="默认全部搜索">默认全部搜索</Option>
          </Select>
        </Col>
      </Row>
      <Row class="padding08">
        <Col span="24">
          <Input size="small" prefix="ios-search" />
        </Col>
      </Row>
      <Row class="padding8">
        <Col span="24" class="ivu-text-center">
          <a href="javascript:;">+添加顾客</a>
        </Col>
      </Row>
      <Row class="padding8">
        <Col span="24">
          <List class="animal-list">
            <ListItem
              v-for="(item, index) in list"
              :key="index"
              :class="item.name===currentName?'active':''"
            >
              <p @click="switchList(item.name)">
                &nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{{item.phone}}
              </p>
            </ListItem>
          </List>
        </Col>
      </Row>
    </Col>
    <Modal v-model="registrationFormModal" title="挂号表" width="50%">
      <div>
        <Row>
          <Tabs value="name3">
            <TabPane label="已挂号顾客" name="name3"></TabPane>
            <TabPane label="最近登录顾客" name="name4"></TabPane>
          </Tabs>
        </Row>
        <Row :gutter="16">
          <Form :label-width="71" class="myform">
            <Col span="9">
              <FormItem label="预约日期">
                <DatePicker type="datetimerange" size="small" placeholder="选择筛选日期区间" />
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="预约对象">
                <Select v-model="people" size="small">
                  <Option value="全体员工">全体员工</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <Button type="info">确认</Button>
            </Col>
          </Form>
        </Row>
        <Row>
         <Table border :columns="registrationListColumns" :data="registratiData"></Table>
        </Row>
      </div>
      <div slot="footer">
        <Row :gutter="16" justify="end" type="flex">
          <Col span="4"><Button type="default" @click="registrationFormModal=false">取消预约</Button></Col>
          <Col span="4" class="ivu-text-left"><Button type="primary">去处理</Button></Col>
          <Col span="4"><Button type="success">确认</Button></Col>
        </Row>
      </div>
    </Modal>
  </Row>
</template>
<script>
    export default {
        data () {
            return {
                current: 1,
                columns1: [
                    {
                        title: '挂号时间',
                        key: 'time'
                    },
                    {
                        title: '挂号类别',
                        key: 'type'
                    },
                    {
                        title: '主治医生',
                        key: 'doctor',
                        render: (h, params) => {
                            return h(
                                'Select',
                                {
                                    props: {
                                        value: params.row.doctor, // 获取选择的下拉框的值
                                        size: 'small',
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.doctor = e; // 改变下拉框赋值
                                        }
                                    }
                                },
                                [
                                    h(
                                        'Option',
                                        {
                                            props: {
                                                value: '王艳'
                                            }
                                        },
                                        '王艳'
                                    ),
                                    h(
                                        'Option',
                                        {
                                            props: {
                                                value: '刘艳'
                                            }
                                        },
                                        '刘艳'
                                    )
                                ]
                            );
                        }
                    },
                    {
                        title: '金额',
                        key: 'price'
                    },
                    {
                        title: '支付状态',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        key: 'price',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '2px',
                                            marginTop: '2px'
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
                data1: [
                    {
                        time: '2020-02-02',
                        type: '门诊挂号',
                        doctor: '王艳',
                        price: '10.00',
                        status: '未付款'
                    },
                    {
                        time: '2020-02-02',
                        type: '门诊挂号',
                        doctor: '刘艳',
                        price: '10.00',
                        status: '已付款'
                    }
                ],
                registrationListColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '挂号时间',
                        key: 'time'
                    },
                    {
                        title: '顾客信息',
                        key: 'info'
                    },
                    {
                        title: '主治医师',
                        key: 'doctor'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        key: 'dosomething',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '2px',
                                            marginTop: '2px'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '接诊'
                                )
                            ]);
                        }
                    }
                ],
                registratiData: [
                    {
                        time: '2020-02-02',
                        info: '张(夏天)',
                        doctor: '昌宏瑞',
                        status: '待接诊'
                    }
                ],
                type: '门诊挂号',
                doctor: '王艳',
                searchType: '默认全部搜索',
                list: [
                    { name: '张华(贝贝)', phone: '1345678987' },
                    { name: '张华(贝贝2)', phone: '1345678987' },
                    { name: '张华(贝贝3)', phone: '1345678987' },
                    { name: '张华(贝贝4)', phone: '1345678987' }
                ],
                currentName: '张华(贝贝)',
                registrationFormModal: false,
                people: '全体员工'
            };
        },
        methods: {
            switchList (name) {
                this.currentName = name;
            },
            showRegistrationForm () {
                this.registrationFormModal = true;
            }
        },
        mounted () {}
    };
</script>
<style lang="less" scoped>
.box {
  padding-left: 15px;
}
/*模块标题*/
.module-title-wrapper {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e9eaec;
  font-weight: 700;
  background-color: #fff;
}
.mtb15 {
  margin: 15px 0;
}
.mlr15 {
  margin: 0 15px;
}
.borderandpadding {
  border-bottom: 3px solid #ddd;
  padding-bottom: 22px;
}
.padding8 {
  padding: 8px;
}
.padding08 {
  padding: 0 8px;
}
</style>
<style lang="less">
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
//使所有页面的表格的td和th都居中
.ivu-table-wrapper td {
  text-align: center;
}
.ivu-table-wrapper th {
  text-align: center;
}
.animal-list {
  height: 265px;
  overflow: auto;
}
.animal-list .ivu-list-item {
  padding: 0;
}
.animal-list .ivu-list-item p {
  padding: 12px 0;
  width: 100%;
}
.animal-list .active {
  background: #ddd;
}
</style>
