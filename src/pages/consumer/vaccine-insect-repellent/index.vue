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
            <Row class="ivu-mt ivu-mb">疫苗驱虫列表</Row>
            <Row class="mh-list">
              <Col span="24">
                <List class="record-list">
                  <ListItem
                    v-for="(item, index) in vaccineInsectRepellentList"
                    :key="index"
                    :class="item.id===currentVaccineId?'active':''"
                  >
                    <div @click="switchVaccineInsectRepellentList(item.id)" class="record">
                      <Col span="12" class="ivu-text-left">{{item.name}}</Col>
                      <Col span="12" class="ivu-text-right">{{item.time}}</Col>
                    </div>
                  </ListItem>
                </List>
              </Col>
            </Row>
            <Row class="mtb15">
              <Col span="12">
                <Button type="error" class="mr10">删除</Button>
              </Col>
              <Col span="12" class="ivu-text-right">
                <Button type="primary" @click="handleDailyConsumptionModal">+服务单</Button>
              </Col>
            </Row>
          </Col>
          <Col span="18">
            <Row class="mt10">
              <Col span="12" style="height:32px;line-height:32px;text-indent:0.9em;">疫苗驱虫信息</Col>
              <Col span="12" class="ivu-text-right">创建日期：2020-02-02 11:34</Col>
            </Row>
            <Row class="mt10">
              <Form ref="form" :model="record" :label-width="80">
                <Col span="24">
                  <FormItem label="主治医师">
                    <Select value="0">
                      <Option value="0">张三</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="体温">
                    <Input>
                      <span slot="append">℃</span>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="体重">
                    <Input>
                      <span slot="append">kg</span>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="备注说明">
                    <Input />
                  </FormItem>
                </Col>
              </Form>
            </Row>
            <Row class="ivu-mb">
              <div style="height:32px;line-height:32px;width:100px;float:left">疫苗清单</div>
              <div
                style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 340px)"
              ></div>
              <div style="width:240px;float:left" class="ivu-text-right">
                <Button type="error" class="mr10">删除选择</Button>
                <Button type="success">+消费清单</Button>
              </div>
            </Row>
            <Table border :columns="columns1" :data="data1">
              <template slot-scope="{ row, index }" slot="equipment">
                <Select value="0">
                  <Option value="0">未完成</Option>
                  <Option value="1">已完成</Option>
                </Select>
              </template>
            </Table>
            <Row class="ivu-mt ivu-mb">
              <Col span="12">
                <Button type="warning" class="mr10" @click="handleViewBookModal">查看预约</Button>
                <Button type="info" class="mr10">打印</Button>
              </Col>
              <Col span="12" class="ivu-text-right">
                <span class="mr10">合计金额：¥0.00</span>
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

    <!-- 查看预约 -->
    <Modal v-model="viewBookModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">疫苗驱虫</Col>
      </p>

      <Table border :columns="columns2" :data="data2"></Table>

      <div slot="footer">
        <Row>
          <Col span="24" class="ivu-text-left">
            <Button type="success" class="mr10" @click="handleAddBookModal">+预约</Button>
            <Button type="error" class="mr10">删除</Button>
            <Button type="primary">修改</Button>
          </Col>
        </Row>
      </div>
    </Modal>

    <!-- 添加预约 -->
    <Modal v-model="addBookModal" class="mymodal">
      <p slot="header">
        <Col span="24">疫苗驱虫</Col>
      </p>

      <Row :gutter="16">
        <Form ref="form" :model="record" :label-width="100" class="myform">
          <FormItem label="创建时间">2020年2月13日16:17:19</FormItem>
          <FormItem label="顾客姓名">宋涛</FormItem>
          <FormItem label="联系方式">15544554455</FormItem>
          <FormItem label="宠物姓名">cici</FormItem>
          <FormItem label="预约类型">
            <Select value="0">
              <Option value="0">疫苗驱虫</Option>
            </Select>
          </FormItem>
          <FormItem label="备注">
            <Input type="textarea" :rows="4" />
          </FormItem>
          <FormItem class="lb0">
            <Checkbox style="width:100px;text-align:right;padding-right:12px;margin-right:0">微信提醒</Checkbox>
            <span style="color:#ccc">尚未设置提醒规则</span>
          </FormItem>
          <FormItem class="lb0">
            <Checkbox
              style="width:100px;text-align:right;padding-right:12px;margin-right:0"
              v-model="record.check"
            >短信提醒</Checkbox>
            <span style="color:#ccc">尚未设置提醒规则</span>
          </FormItem>
        </Form>
      </Row>

      <Row>
        <Col span="12" class="ivu-text-center">
          <Button type="primary">设置自动提醒规则</Button>
        </Col>
        <Col span="12" class="ivu-text-center">
          <Button type="info">修改本次提醒规则</Button>
        </Col>
      </Row>

      <div slot="footer">
        <Button type="success">确定</Button>
      </div>
    </Modal>

    <!-- 添加消费服务单 -->
    <Modal v-model="dailyConsumptionModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">疫苗驱虫</Col>
      </p>

      <Row :gutter="16" style="height:36px;line-height:36px">
        <Col span="4">顾客姓名：宋</Col>
        <Col span="5">联系方式:14434343434</Col>
        <Col span="4">宠物名字:cici</Col>
        <Col span="4">种类:犬类</Col>
        <Col span="7">品种:金毛</Col>
      </Row>
      <Row :gutter="16" class="ivu-mt">
        <Col span="5">
          <div style="height:36px;line-height:36px">服务类型&nbsp;&nbsp;
            <Select value="0" style="width:120px">
              <Option value="0">疫苗</Option>
            </Select>
          </div>
          <div style="height:36px;line-height:36px" class="ivu-mt">
            项目类型&nbsp;&nbsp;
            <Select value="0" style="width:120px">
              <Option value="0">基础疫苗</Option>
            </Select>
          </div>
          <div style="height:36px;line-height:36px" class="ivu-mt">
            服务时间&nbsp;&nbsp;
          </div>
          <div style="height:36px;line-height:36px" class="ivu-mt">
            <Checkbox style="margin-right:18px">首免</Checkbox>
            <DatePicker type="date" placeholder="选择时间" style="width:120px"></DatePicker>
          </div>
          <div style="height:36px;line-height:36px" class="ivu-mt">
            <Checkbox style="margin-right:18px">二免</Checkbox>
            <DatePicker type="date" placeholder="选择时间" style="width:120px"></DatePicker>
          </div>
          <div style="height:36px;line-height:36px" class="ivu-mt">
            <Checkbox style="margin-right:18px">三免</Checkbox>
            <DatePicker type="date" placeholder="选择时间" style="width:120px"></DatePicker>
          </div>
          <div style="height:36px;line-height:36px" class="ivu-mt">
            <Checkbox style="margin-right:18px">狂犬</Checkbox>
            <DatePicker type="date" placeholder="选择时间" style="width:120px"></DatePicker>
          </div>
          <div style="height:36px;line-height:36px;text-indent:2em" class="ivu-mt">
            如果服务时间不为今日,系统将为您自动添加预约提醒
          </div>
        </Col>
        <Col span="19">
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
                      <Input prefix="ios-search" v-width="200" placeholder="名称/编号/条形码" />
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
                <Table border :columns="columns5" :data="data5"></Table>
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
                      <Input prefix="ios-search" v-width="200" placeholder="名称/编号/条形码" />
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
                <Table border :columns="columns5" :data="data5"></Table>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>

      <div slot="footer">
        <span class="mr10">合计：0.00元</span>
        <Button type="success">确认</Button>
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
                        width: 140
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位',
                        key: 'unit'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '合计',
                        key: 'total'
                    },
                    {
                        title: '付款状态',
                        key: 'status',
                        width: 120
                    },
                    {
                        title: '注射状态',
                        key: 'injectionStatus',
                        slot: 'equipment',
                        width: 120
                    }
                ],
                data1: [
                    {
                        name: '胸腔积液放出',
                        num: '1.0',
                        unit: '次',
                        unitPrice: '0.0',
                        total: '0.0',
                        status: '未付款'
                    },
                    {}
                ],
                columns2: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '预约日期',
                        key: 'time'
                    },
                    {
                        title: '预约类型',
                        key: 'type'
                    },
                    {
                        title: '备注'
                    },
                    {
                        title: '到店状态',
                        key: 'status'
                    }
                ],
                data2: [
                    {
                        time: '2020-03-03 15:00',
                        type: '美容服务',
                        status: '未到店'
                    },
                    {}
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
                vaccineInsectRepellentList: [
                    { id: '1', name: '基础免疫狂犬', time: '今天' },
                    { id: '2', name: '基础免疫三免', time: '2020-03-19' },
                    { id: '3', name: '基础免疫二免', time: '2020-02-23' },
                    { id: '4', name: '基础免疫首免', time: '' }
                ],
                currentVaccineId: '1',
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
                    },
                    {
                        title: '库存数'
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
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '数量'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '所属服务',
                        key: 'num'
                    }
                ],
                data5: [
                    {
                        name: '眼部',
                        unitPrice: '0.0',
                        num: '1.0'
                    },
                    {
                        name: '腹部',
                        unitPrice: '0.0',
                        num: '1.0'
                    }
                ],
                dailyConsumptionModal: false,
                viewBookModal: false,
                addBookModal: false
            };
        },
        methods: {
            switchList (name) {
                this.currentName = name;
            },
            switchVaccineInsectRepellentList (id) {
                this.currentVaccineId = id;
            },
            showRegistrationForm () {
                this.registrationFormModal = true;
            },
            handleDailyConsumptionModal () {
                this.dailyConsumptionModal = true;
            },
            handleViewBookModal () {
                this.viewBookModal = true;
            },
            handleAddBookModal () {
                this.addBookModal = true;
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
.lb0 .ivu-form-item-content {
  margin: 1px 0;
  margin-left: 0 !important;
}
</style>
