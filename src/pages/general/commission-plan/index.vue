<template>
  <div>
    <Row>
      <Col span="6">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">提成方案列表</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <List class="plan-list">
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
           <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success" @click="showAddPlanModal=true">+方案</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary" >修改</Button>
            </Col>
             <Col span="8" class="ivu-text-center">
              <Button type="error" >删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">提成方案</span>
            </Col>
          </Row>
          <Row :gutter="32" type="flex" class="mtb15">
            <Col span="12">
              <Row>
                <Col span="4">
                  <strong>一级提成</strong>
                </Col>
                <Col span="4">销售提成</Col>
                <Col span="6">
                  <Checkbox>按比例(%)</Checkbox>
                </Col>
                <Col span="10">
                  <Input size="small" placeholder="0.00"></Input>
                </Col>
              </Row>
              <Row class="mtb15">
                <Col span="6" offset="8">
                  <Checkbox>固定金额</Checkbox>
                </Col>
                <Col span="10">
                  <Input size="small" placeholder="￥0.00"></Input>
                </Col>
              </Row>
              <Row>
                <Col span="4" offset="4">服务提成</Col>
                <Col span="6">
                  <Checkbox>按比例(%)</Checkbox>
                </Col>
                <Col span="10">
                  <Input size="small" placeholder="0.00"></Input>
                </Col>
              </Row>
              <Row class="mtb15">
                <Col span="6" offset="8">
                  <Checkbox>固定金额</Checkbox>
                </Col>
                <Col span="10">
                  <Input size="small" placeholder="￥0.00"></Input>
                </Col>
              </Row>
            </Col>
            <Col span="12">
              <Row>
                <Col span="4">
                  <strong>二级提成</strong>
                </Col>
                <Col span="4">销售提成</Col>
                <Col span="6">
                  <Checkbox>按比例(%)</Checkbox>
                </Col>
                <Col span="10">
                  <Input size="small" placeholder="0.00"></Input>
                </Col>
              </Row>
              <Row class="mtb15">
                <Col span="6" offset="8">
                  <Checkbox>固定金额</Checkbox>
                </Col>
                <Col span="10">
                  <Input size="small" placeholder="￥0.00"></Input>
                </Col>
              </Row>
              <Row>
                <Col span="4" offset="4">服务提成</Col>
                <Col span="6">
                  <Checkbox>按比例(%)</Checkbox>
                </Col>
                <Col span="10">
                  <Input size="small" placeholder="0.00"></Input>
                </Col>
              </Row>
              <Row class="mtb15">
                <Col span="6" offset="8">
                  <Checkbox>固定金额</Checkbox>
                </Col>
                <Col span="10">
                  <Input size="small" placeholder="￥0.00"></Input>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card class="ptb0 mtb15">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">参与商品</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Table border :columns="columns1" :data="data1"></Table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="data1.length" :current.sync="current" />
              </div>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="warning" class="mr10" @click="handleOpenEditCombination">添加商品</Button>
              <Button type="error" class="mr10">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="editCombination" title="商品组合设置" @on-ok="handleCreate" width="80%">
      <Row>
        <Col span="5">
          <Card class="ptb0">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="24">
                <span class="module-title">消费项目分类</span>
              </Col>
            </Row>
            <Row :gutter="24" type="flex" justify="end">
              <Col span="24">
                <Tree :data="consumptionTypeData"></Tree>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span="19" class="box">
          <Card class="ptb0">
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
            <Row :gutter="24" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Table border :columns="consumptionProjectColumns" :data="consumptionProjectData"></Table>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row class="mtb15">
        <Col span="24">
          <Card class="ptb0">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="20">
                <span class="module-title">消费单</span>
              </Col>
              <Col span="4" class="ivu-text-right">
                <Button type="error" class="mr10">删除</Button>
              </Col>
            </Row>
            <Row :gutter="24" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Table border :columns="consumptionOrderColumns" :data="consumptionOrderData"></Table>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Modal>
       <Modal v-model="showAddPlanModal" title="添加方案" @on-ok="handleCreatePlan">
      <Form ref="create" :label-width="150">
        <FormItem label="方案名称">
          <Input style="width:70%" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                showAddPlanModal: false,
                list: [
                    { name: '方案一' },
                    { name: '方案二' },
                    { name: '方案三' },
                    { name: '方案四' },
                    { name: '方案五' }
                ],
                currentName: '方案一',
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        key: 'code'
                    },
                    {
                        title: '条形码',
                        key: 'barCode'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格',
                        key: 'size'
                    },
                    {
                        title: '单位',
                        key: 'unti'
                    },
                    {
                        title: '单价',
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
                        key: 'code'
                    },
                    {
                        title: '条形码',
                        key: 'barCode'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格',
                        key: 'size'
                    },
                    {
                        title: '单位',
                        key: 'unti'
                    },
                    {
                        title: '单价',
                        key: 'price'
                    },
                    {
                        title: '厂家',
                        key: 'factory'
                    },
                    {
                        title: '备注',
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
                        minWidth: 30,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        minWidth: 70,
                        key: 'code'
                    },
                    {
                        title: '条形码',
                        minWidth: 70,
                        key: 'barCode'
                    },
                    {
                        title: '名称',
                        minWidth: 80,
                        key: 'name'
                    },
                    {
                        title: '规格',
                        minWidth: 60,
                        key: 'size'
                    },
                    {
                        title: '单位',
                        minWidth: 50,
                        key: 'unti'
                    },
                    {
                        title: '单价',
                        minWidth: 50,
                        key: 'price'
                    },
                    {
                        title: '数量',
                        minWidth: 50,
                        key: 'num'
                    },
                    {
                        title: '用量',
                        minWidth: 50,
                        key: 'useNum'
                    },
                    {
                        title: '备注',
                        minWidth: 50,
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
            handleCreatePlan () {},
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
</style>
<style lang="less">
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
.plan-list {
  height: 265px;
  overflow: auto;
}
.plan-list .ivu-list-item {
  padding: 0;
}
.plan-list .ivu-list-item p {
  padding: 12px 0;
  width: 100%;
}
.plan-list .active {
  background: #69c5d8;
}
//使所有页面的表格的td和th都居中
.ivu-table-wrapper td {
  text-align: center;
}
.ivu-table-wrapper th {
  text-align: center;
}
</style>
