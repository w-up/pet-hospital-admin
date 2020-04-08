<template>
  <div>
    <Row :gutter="16">
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">营销活动列表</span>
            </Col>
          </Row>
          <Row class="ivu-mt">
            <Input prefix="ios-search" placeholder="活动名称搜索" />
          </Row>
          <Row class="mt6">
            <Select placeholder="活动类型">
              <Option value="0">中国</Option>
              <Option value="1">美国</Option>
            </Select>
          </Row>
          <Row class="mt6">
            <DatePicker type="daterange" placeholder="开始结束日期" style="width: 100%"></DatePicker>
          </Row>
          <Row class="mtb15">
            <Col span="24">
              <Tree :data="activityList"></Tree>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success">+新增活动</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary">终止活动</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">活动详情</span>
            </Col>
          </Row>
          <Row type="flex" class="mtb15">
            <Col span="24">
              <Row>
                <Col span="2">活动名称</Col>
                <Col span="4">
                  <Input size="small" placeholder="必填"></Input>
                </Col>
              </Row>
              <Row class="mtb15">
                <Col span="2">促销类型</Col>
                <Col span="3">
                  <Radio>满减</Radio>
                </Col>
                <Col span="6">
                  <Input size="small" placeholder="必填">
                    <span slot="prepend">活动商品购买满</span>
                    <span slot="append">元</span>
                  </Input>
                </Col>
                <Col span="1" class="ivu-text-center">，</Col>
                <Col span="6">
                  <Input size="small" placeholder="必填">
                    <span slot="prepend">立减</span>
                    <span slot="append">元</span>
                  </Input>
                </Col>
              </Row>
              <Row class="mtb15">
                <Col span="3" offset="2">
                  <Radio>打折</Radio>
                </Col>
                <Col span="6">
                  <Input size="small">
                    <span slot="prepend">活动商品打</span>
                    <span slot="append">折</span>
                  </Input>
                </Col>
              </Row>
              <Row class="mtb15">
                <Col span="3" offset="2">
                  <Radio>多买优惠</Radio>
                </Col>
                <Col span="6">
                  <Input size="small">
                    <span slot="prepend">活动商品购买</span>
                    <span slot="append">件</span>
                  </Input>
                </Col>
                <Col span="1" class="ivu-text-center">，</Col>
                <Col span="6">
                  <Input size="small">
                    <span slot="prepend">打</span>
                    <span slot="append">折</span>
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col span="2">活动时间</Col>
                <Col span="4">
                  <DatePicker size="small" type="datetime" placeholder="选择开始时间"></DatePicker>
                </Col>
                <Col span="4" offset="1">
                  <DatePicker size="small" type="datetime" placeholder="选择结束时间"></DatePicker>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card class="ivu-mt">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">商品目录</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Table border :columns="columns1" :data="data1"></Table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="data1.length" :current.sync="current" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="warning" class="mr10" @click="handleOpenEditCombination">添加商品</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="editCombination" title="商品组合设置" @on-ok="handleCreate" width="80%">
      <Row>
        <Col span="5">
          <Card>
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="24">
                <span class="module-title">消费项目分类</span>
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end">
              <Col span="24">
                <Tree :data="consumptionTypeData"></Tree>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span="19" class="box">
          <Card>
            <Row
              type="flex"
              justify="center"
              :gutter="1"
              align="top"
              class-name="module-title-wrapper"
            >
              <Col span="15">
                <span class="module-title">消费项目列表</span>
              </Col>
              <Col span="4" class="ivu-text-right">
                <Button type="warning" class="mr10">快速添加</Button>
              </Col>
              <Col span="5" class="ivu-text-right">
                <Input prefix="ios-search" placeholder="名称，编号，条形码" />
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Table border :columns="consumptionProjectColumns" :data="consumptionProjectData"></Table>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row class="mtb15">
        <Col span="24">
          <Card>
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="20">
                <span class="module-title">消费单</span>
              </Col>
              <Col span="4" class="ivu-text-right">
                <Button type="error" class="mr10">删除</Button>
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Table border :columns="consumptionOrderColumns" :data="consumptionOrderData"></Table>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                activityList: [
                    {
                        title: '全部',
                        expand: true,
                        children: [
                            {
                                title: '未开始',
                                expand: true,
                                children: [{ title: '五一促销活动', expand: false }]
                            },
                            {
                                title: '进行中',
                                expand: true,
                                children: [{ title: '端午促销活动', expand: false }]
                            },
                            {
                                title: '已结束',
                                expand: true,
                                children: [{ title: '新年促销活动', expand: false }]
                            }
                        ]
                    }
                ],
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'code'
                    },
                    {
                        title: '条形码',
                        minWidth: 84,
                        key: 'barCode'
                    },
                    {
                        title: '名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '规格',
                        minWidth: 84,
                        key: 'size'
                    },
                    {
                        title: '单位',
                        minWidth: 84,
                        key: 'unti'
                    },
                    {
                        title: '单价',
                        minWidth: 84,
                        key: 'price'
                    }
                ],
                data1: [
                    {
                        code: '0000',
                        barCode: '黑猫',
                        name: 'HM',
                        size: '',
                        unti: ''
                    },
                    {
                        code: '0009',
                        barCode: '白猫',
                        name: 'BM',
                        size: '',
                        unti: ''
                    }
                ],
                current: 1,
                editCombination: false,
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
                    }
                ],
                consumptionProjectColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'code'
                    },
                    {
                        title: '条形码',
                        minWidth: 84,
                        key: 'barCode'
                    },
                    {
                        title: '名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '规格',
                        minWidth: 84,
                        key: 'size'
                    },
                    {
                        title: '单位',
                        minWidth: 84,
                        key: 'unti'
                    },
                    {
                        title: '单价',
                        minWidth: 84,
                        key: 'price'
                    },
                    {
                        title: '厂家',
                        minWidth: 84,
                        key: 'factory'
                    },
                    {
                        title: '备注',
                        minWidth: 84,
                        key: 'remark'
                    }
                ],
                consumptionProjectData: [
                    {
                        code: '',
                        barCode: '',
                        name: '复合维生素B片',
                        size: '',
                        unti: '片',
                        price: '',
                        factory: '',
                        remark: ''
                    }
                ],
                consumptionOrderColumns: [
                    {
                        type: 'selection',
                        minWidth: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'code'
                    },
                    {
                        title: '条形码',
                        minWidth: 84,
                        key: 'barCode'
                    },
                    {
                        title: '名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '规格',
                        minWidth: 84,
                        key: 'size'
                    },
                    {
                        title: '单位',
                        minWidth: 84,
                        key: 'unti'
                    },
                    {
                        title: '单价',
                        minWidth: 84,
                        key: 'price'
                    },
                    {
                        title: '数量',
                        minWidth: 84,
                        key: 'num'
                    },
                    {
                        title: '用量',
                        minWidth: 84,
                        key: 'useNum'
                    },
                    {
                        title: '备注',
                        minWidth: 84,
                        key: 'remark'
                    }
                ],
                consumptionOrderData: [
                    {
                        code: 'P00001',
                        barCode: '000001',
                        name: '宠物补血膏',
                        size: '20ml',
                        unti: 'ml',
                        price: '5',
                        num: '5',
                        useNum: '1.0',
                        remark: ''
                    },
                    {
                        code: 'P00001',
                        barCode: '000001',
                        name: '宠物补血膏',
                        size: '20ml',
                        unti: 'ml',
                        price: '5',
                        num: '5',
                        useNum: '1.0',
                        remark: ''
                    }
                ]
            };
        },
        methods: {
            handleOpenEditCombination () {
                this.editCombination = true;
            },
            handleCreate () {},
            switchList (name) {
                this.currentName = name;
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
  margin: 16px 0;
}
</style>
<style lang="less">
</style>
