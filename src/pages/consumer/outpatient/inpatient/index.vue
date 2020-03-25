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
        <Row class="ivu-mt borderandpadding">
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
        <Row :gutter="16">
          <Col span="6" class="br1">
            <Row class="mt10">
              <Form ref="form" :label-width="70">
                <FormItem label="病历列表" style="margin-bottom:0px">
                  <Select value="0" size="small">
                    <Option value="0">全部</Option>
                    <Option value="1">门诊</Option>
                  </Select>
                </FormItem>
              </Form>
            </Row>
            <Row class="padding8">
              <Col span="24" class="ivu-text-center">
                <Button type="primary">+住院病历</Button>
              </Col>
            </Row>
            <Row class="mh-list">
              <Col span="24">
                <List class="record-list">
                  <ListItem
                    v-for="(item, index) in recordList"
                    :key="index"
                    :class="item.id===currentRecordId?'active':''"
                  >
                    <div @click="switchRecordList(item.id)" class="record">
                      <Col span="12" class="ivu-text-left">{{item.name}}</Col>
                      <Col span="12" class="ivu-text-right">{{item.time}}</Col>
                    </div>
                  </ListItem>
                </List>
              </Col>
            </Row>
            <Row class="mtb15">
              <Col span="8">
                <Button type="error" class="mr10">删除</Button>
              </Col>
              <Col span="8" class="ivu-text-center">
                <Button type="info" class="mr10">+住院组</Button>
              </Col>
              <Col span="8" class="ivu-text-right">
                <Button type="primary">+病历</Button>
              </Col>
            </Row>
          </Col>
          <Col span="18">
            <Row class="mt10">
              <Col span="12" style="height:32px;line-height:32px;text-indent:0.9em;">住院组信息</Col>
              <Col span="12" class="ivu-text-right">创建日期：2020-02-02 11:34</Col>
            </Row>
            <Row class="mt10">
              <Form ref="form" :model="record" :label-width="80">
                <Col span="12">
                  <FormItem label="医护人员">
                    <Select value="0">
                      <Option value="0">王琦</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="病情分类">
                    <Select placeholder="请选择">
                      <Option value="0">自动递增，手动离院</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="入院日期">
                    <DatePicker type="date" style="width: 100%"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="出院方式">
                    <Select value="0" placeholder="请选择">
                      <Option value="0">自动递增，手动离院</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="笼位">
                    <Input style="width:calc(100% - 98px)" class="mr10" />
                    <Button type="primary">选择笼位</Button>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="离院日期">
                    <span class="mr10">已入住: 1天</span>
                    <Button type="info">出院</Button>
                  </FormItem>
                </Col>
              </Form>
            </Row>
            <Row class="ivu-mb">
              <div style="height:32px;line-height:32px;width:100px;float:left">每日消费列表</div>
              <div
                style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 300px)"
              ></div>
              <div style="width:200px;float:left" class="ivu-text-right">
                <Button type="error" class="mr10">删除选择</Button>
                <Button type="success" @click="handleDailyConsumptionModal">+每日消费</Button>
              </div>
            </Row>
            <Table border :columns="columns1" :data="data1"></Table>
            <Row class="ivu-mb ivu-mt">
              <div style="height:32px;line-height:32px;width:120px;float:left">住院期间总消费单</div>
              <div
                style="border-bottom:1px dashed #ccc;height:16px;float:left;width:calc(100% - 220px)"
              ></div>
              <div style="width:100px;float:left" class="ivu-text-right">
                <Button type="success">生成汇总</Button>
              </div>
            </Row>
            <Table border :columns="columns2" :data="data2"></Table>
            <Row class="ivu-mb ivu-mt">
              <div style="height:32px;line-height:32px;width:100px;float:left">住院护理记录</div>
              <div
                style="border-bottom:1px dashed #ccc;height:16px;float:left;width:calc(100% - 240px)"
              ></div>
              <div style="width:140px;float:left" class="ivu-text-right">
                <Button type="success">+添加护理日志</Button>
              </div>
            </Row>
            <Table border :columns="columns3" :data="data3"></Table>
            <Row class="ivu-mt ivu-mb">
              <Col span="20">
                <Button type="warning" class="mr10">押金</Button>
                <Button type="info" class="mr10">打印</Button>
              </Col>
              <Col span="4" class="ivu-text-right">
                <Button type="success">保存</Button>
              </Col>
            </Row>
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
          <Col span="4">
            <Button type="default" @click="registrationFormModal=false">取消预约</Button>
          </Col>
          <Col span="4" class="ivu-text-left">
            <Button type="primary">去处理</Button>
          </Col>
          <Col span="4">
            <Button type="success">确认</Button>
          </Col>
        </Row>
      </div>
    </Modal>

    <!-- 添加每日消费 -->
    <Modal v-model="dailyConsumptionModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">添加每日消费</Col>
      </p>

      <Tabs value="name1" class="mytabs">
        <TabPane label="选择消费项目" name="name1">
          <Row :gutter="16">
            <Col span="6">
              <Row class-name="module-title-wrapper">
                <Col>
                  <span class="module-title">商品分类列表</span>
                </Col>
              </Row>
              <Row>
                <Col style="padding:8px 16px;border:1px solid #ccc">
                  <Tree :data="consumptionTypeData"></Tree>
                </Col>
              </Row>
            </Col>
            <Col span="18">
              <Row class-name="module-title-wrapper">
                <Col span="8">
                  <span class="module-title">商品列表</span>
                </Col>
                <Col span="16" class="ivu-text-right">
                  <Button type="success" class="mr10">快速添加</Button>
                  <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
                </Col>
              </Row>
              <Row class="ivu-mt">
                <Table border :columns="columns4" :data="data4"></Table>
              </Row>
            </Col>
          </Row>

          <Row class-name="module-title-wrapper ivu-mt">
            <Col span="8">
              <span class="module-title">消费单</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Button type="success" class="mr10">+保存为组合</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
          <Row>
            <Table border :columns="columns5" :data="data5">
              <template slot-scope="{ row, index }" slot="code">
                <Input type="text" />
              </template>
              <template slot-scope="{ row, index }" slot="equipment">
                <Select value="0">
                  <Option value="0">条目一</Option>
                  <Option value="1">条目二</Option>
                  <Option value="2">条目三</Option>
                  <Option value="3">条目四</Option>
                </Select>
              </template>
            </Table>
          </Row>
        </TabPane>
        <TabPane label="校验组合" name="name2">
          <Row :gutter="16">
            <Col span="6">
              <Row class-name="module-title-wrapper">
                <Col>
                  <span class="module-title">商品组合列表</span>
                </Col>
              </Row>
              <Row>
                <Col style="padding:8px 16px;border:1px solid #ccc">
                  <Tree :data="consumptionTypeData"></Tree>
                </Col>
              </Row>
            </Col>
            <Col span="18">
              <Row class-name="module-title-wrapper">
                <Col span="8">
                  <span class="module-title">商品组合详情</span>
                </Col>
                <Col span="16" class="ivu-text-right">
                  <Button type="success" class="mr10">快速添加</Button>
                  <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
                </Col>
              </Row>
              <Row class="ivu-mt">
                <Table border :columns="columns4" :data="data4"></Table>
              </Row>
            </Col>
          </Row>

          <Row class-name="module-title-wrapper ivu-mt">
            <Col span="8">
              <span class="module-title">已选商品列表</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Button type="success" class="mr10">+保存为组合</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
          <Row>
            <Table border :columns="columns5" :data="data5">
              <template slot-scope="{ row, index }" slot="code">
                <Input type="text" />
              </template>
              <template slot-scope="{ row, index }" slot="equipment">
                <Select value="0">
                  <Option value="0">条目一</Option>
                  <Option value="1">条目二</Option>
                  <Option value="2">条目三</Option>
                  <Option value="3">条目四</Option>
                </Select>
              </template>
            </Table>
          </Row>
        </TabPane>
      </Tabs>

      <div slot="footer">
        <Row>
          <Col span="12" class="ivu-text-left">
            <Button type="info">上移</Button>
            <Button type="warning">下移</Button>
          </Col>
          <Col span="12" class="ivu-text-right">
            <span class="mr10">合计：0.00元</span>
            <Button type="success">保存</Button>
          </Col>
        </Row>
      </div>
    </Modal>
  </Row>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '用法'
                    },
                    {
                        title: '用量'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位',
                        key: 'unit'
                    },
                    {
                        title: '每日数量',
                        key: 'num',
                        width: 100
                    },
                    {
                        title: '单价',
                        key: 'unitPrice',
                        width: 80
                    },
                    {
                        title: '含首日',
                        width: 80,
                        render: (h, params) => {
                            return h('div', [
                                h('checkbox', {
                                    props: {
                                        value: params.row.check
                                    },
                                    // style: {
                                    //     display: params.row.view ? 'none' : ''
                                    // },
                                    on: {
                                        'on-change': () => {
                                            // this.reviewFeedback(this.feedbackPageList[params.index].id)
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: '输氧',
                        num: '1.0',
                        unit: '小时',
                        check: true
                    }
                ],
                columns2: [
                    {
                        title: '',
                        width: 60
                    },
                    {
                        title: '生成日期',
                        key: 'time'
                    },
                    {
                        title: '负责医生'
                    },
                    {
                        title: '消费合计'
                    },
                    {
                        title: '备注'
                    },
                    {
                        title: '查看',
                        key: 'dosomething',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '查看'
                                )
                            ]);
                        }
                    }
                ],
                data2: [
                    {
                        time: '2020年2月13日'
                    }
                ],
                columns3: [
                    {
                        title: '住院日期',
                        key: 'time',
                        width: 140
                    },
                    {
                        title: '清洁'
                    },
                    {
                        title: '装水'
                    },
                    {
                        title: '灌食'
                    },
                    {
                        title: '大便'
                    },
                    {
                        title: '小便'
                    },
                    {
                        title: '异常情况',
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'dosomething',
                        width: 160,
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '10px'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '编辑'
                                ),
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
                    },
                    {
                        title: '打印'
                    }
                ],
                data3: [
                    {
                        time: '2020年2月13日'
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
                recordList: [
                    { id: '1', name: '病历', time: '今天' },
                    { id: '2', name: '病历', time: '2020-03-19' },
                    { id: '3', name: '病历', time: '2020-02-23' },
                    { id: '4', name: '病历', time: '2020-03-20' }
                ],
                currentRecordId: '1',
                registrationFormModal: false,
                people: '全体员工',
                record: {
                    creatTime: '2020-03-19'
                },
                consumptionTypeData: [
                    {
                        title: '检验',
                        expand: true,
                        children: [
                            {
                                title: '尿常规(犬类)',
                                expand: false
                            },
                            {
                                title: '尿常规(猫类)',
                                expand: false
                            }
                        ]
                    },
                    {
                        title: '影像校验',
                        expand: true,
                        children: [
                            {
                                title: 'B超检查',
                                expand: false
                            }
                        ]
                    }
                ],
                columns4: [
                    {
                        title: '编号'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '条形码'
                    }
                ],
                data4: [
                    {
                        name: '腹部',
                        unitPrice: '0.00'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00'
                    }
                ],
                columns5: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '用法',
                        key: 'equipment',
                        slot: 'equipment',
                        width: 120
                    },
                    {
                        title: '用量',
                        slot: 'code'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice',
                        slot: 'code'
                    },
                    {
                        title: '数量',
                        key: 'num',
                        slot: 'code'
                    },
                    {
                        title: '含首日',
                        width: 80,
                        render: (h, params) => {
                            return h('div', [
                                h('checkbox', {
                                    props: {
                                        value: params.row.check
                                    },
                                    // style: {
                                    //     display: params.row.view ? 'none' : ''
                                    // },
                                    on: {
                                        'on-change': () => {
                                            // this.reviewFeedback(this.feedbackPageList[params.index].id)
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        slot: 'code'
                    }
                ],
                data5: [
                    {
                        check: true
                    },
                    {
                        check: true
                    }
                ],
                dailyConsumptionModal: false
            };
        },
        methods: {
            switchList (name) {
                this.currentName = name;
            },
            switchRecordList (id) {
                this.currentRecordId = id;
            },
            showRegistrationForm () {
                this.registrationFormModal = true;
            },
            handleDailyConsumptionModal () {
                this.dailyConsumptionModal = true;
            }
        },
        mounted () {}
    };
</script>
<style lang="less" scoped>
.box {
  padding-left: 15px;
}
.mtb15 {
  margin: 15px 0;
}
.mlr15 {
  margin: 0 15px;
}
.borderandpadding {
  border-bottom: 1px solid #ddd;
  padding-bottom: 22px;
}
.padding8 {
  padding: 8px;
}
.padding08 {
  padding: 0 8px;
}
.br1 {
  height: 1620px;
  border-right: 1px solid #ccc;
}

.mt10 {
  margin-top: 10px;
}

.mh-list {
  height: 400px;
  overflow: auto;
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

.record-list {
  height: 265px;
  overflow: auto;
  border: 1px solid #ccc;
}
.record-list .ivu-list-item {
  padding: 0;
}
.record-list .record {
  width: 100%;
  padding: 12px;
}
.record-list .active {
  background: #ddd;
}
</style>
<style lang="less">
.mymodal .ivu-modal-header {
  background: #f6f6f6;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
/*模块标题*/
.module-title-wrapper {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e9eaec;
  font-weight: 700;
  background-color: #f6f6f6;
  padding: 0 16px;
  margin: 0;
}
</style>
