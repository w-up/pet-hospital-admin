<template>
  <div>
    <Tabs value="name1">
      <TabPane label="处方组合" name="name1"></TabPane>
      <TabPane label="检验组合" name="name2"></TabPane>
      <TabPane label="处置组合" name="name3"></TabPane>
      <TabPane label="手术组合" name="name4"></TabPane>
      <TabPane label="住院组合" name="name5"></TabPane>
      <TabPane label="美容组合" name="name6"></TabPane>
      <TabPane label="疫苗组合" name="name7"></TabPane>
      <TabPane label="商品组合" name="name8"></TabPane>
    </Tabs>
    <Row>
      <Col span="6">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">商品组合列表</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Input prefix="ios-search" />
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <List class="good-list">
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
              <Button type="success" @click="handleOpenCreate">+添加</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary">修改</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">处方组合内容</span>
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
              <Button type="warning" class="mr10" @click="handleOpenEditCombination">+组合/修改</Button>
              <Button type="error" class="mr10">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="showCreate" title="新增商品组合" @on-ok="handleCreate">
      <Form ref="create" :label-width="180">
        <FormItem label="商品组合名称">
          <Input style="width:70%" />
        </FormItem>
      </Form>
    </Modal>
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
            <Row
              type="flex"
              justify="center"
              align="top"
              class-name="module-title-wrapper"
            >
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
  </div>
</template>
<script>
    export default {
        name: 'list-table-list',
        data () {
            return {
                list: [{ name: '药品' }],
                currentName: '药品',
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
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '用法',
                        key: 'method'
                    },
                    {
                        title: '用量',
                        key: 'useNum'
                    },
                    {
                        title: '条形码',
                        key: 'barCode'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                data1: [
                    {
                        code: 'P00001',
                        name: '痛咖啡',
                        size: '500mg',
                        unti: '片',
                        price: '10.00',
                        num: '20.00',
                        method: '',
                        useNum: '1195.0',
                        barCode: '',
                        remark: ''
                    },
                    {
                        code: 'P00002',
                        name: '止泻药',
                        size: '500mg',
                        unti: '片',
                        price: '10.00',
                        num: '20.00',
                        method: '',
                        useNum: '1195.0',
                        barCode: '',
                        remark: ''
                    }
                ],
                current: 1,
                showCreate: false,
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
                        title: '用法',
                        key: 'method',
                        minWidth: 90,
                        render: (h, params) => {
                            let vm = this;
                            return h(
                                'Select',
                                {
                                    props: {
                                        value: params.row.method, // 获取选择的下拉框的值
                                        size: 'small',
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.method = e; // 改变下拉框赋值
                                        }
                                    }
                                },
                                vm.methodList.map(item => {
                                    // this.productTypeList下拉框里的data
                                    return h('Option', {
                                        // 下拉框的值
                                        props: {
                                            value: item,
                                            label: item
                                        }
                                    });
                                })
                            );
                        }
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
                        method: '条目一',
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
                        method: '条目一',
                        useNum: '1.0',
                        remark: ''
                    }
                ],
                methodList: [
                    '条目一',
                    '条目二'
                ]
            };
        },
        methods: {
            handleOpenCreate () {
                this.showCreate = true;
            },
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
.good-list {
  height: 265px;
  overflow: auto;
}
.good-list .ivu-list-item {
  padding: 0;
}
.good-list .ivu-list-item p {
  padding: 12px 0;
  width: 100%;
}
.good-list .active {
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
