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
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">检查检验类别</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Input prefix="ios-search" />
            </Col>
          </Row>
          <Row class="mt6 noplr">
            <Col span="24">
              <List class="check-list">
                <ListItem
                  v-for="(item, index) in list"
                  :key="index"
                  :class="item.name===currentName?'active':''"
                >
                  <p @click="switchList(item.name)" class="list">{{ item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="12" class="ivu-text-center">
              <Button type="success" @click="handleOpenCreate">+添加分类</Button>
            </Col>
            <Col span="12" class="ivu-text-center">
              <Button type="error">删除分类</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">单项</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" calss="check-set-table">
              <Table border :columns="columns1" :data="data1"></Table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="data1.length" :current.sync="current" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="primary" @click="handleOpenCreateSingle">+单项</Button>
              <Button type="warning">修改</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="showCreate" title="添加分类" @on-ok="handleCreate">
      <Form ref="create" :label-width="180">
        <FormItem label="分类名称">
          <Input style="width: 150px" />
        </FormItem>
        <FormItem label="结果类型" style="margin-bottom: 0px;">
          <Checkbox>有参考值范围结果类型</Checkbox>
        </FormItem>
        <FormItem label>
          <Checkbox>其他结果类型(如阴阳或其他)</Checkbox>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="showCreateSingle" title="新增检验项">
      <div style="text-align:center">
        <RadioGroup v-model="checkTypeSingle" style="width:100%">
          <Row>
          <Col span="12">
          <Radio label="有参考值范围结果类型"></Radio>
          </Col>
          <Col span="12">
          <Radio label="其他结果类型"></Radio>
           </Col>
            </Row>
        </RadioGroup>
      </div>
      <div slot="footer">
        <Button type="default" @click="showCreateSingle=false">取消</Button>
        <Button type="success" @click="addSingleNext">下一步</Button>
      </div>
    </Modal>
    <Modal
      v-model="rangeTypeModal"
      title="新增检验项"
      @on-ok="handleCreate"
      width="50%"
      class="rangeTypeModal"
    >
      <Row>
        <Col span="24" class="mt23">
          <Col span="12">
            <Col span="5">
              <span>指标名称</span>
            </Col>
            <Col span="10">
              <Input size="small" />
            </Col>
          </Col>
          <Col span="12">
            <Col span="5">
              <span>标准名称</span>
            </Col>
            <Col span="10">
              <Input size="small" />
            </Col>
          </Col>
        </Col>
        <Col span="24" class="mt23">
          <Col span="12">
            <Col span="5">
              <span>指标单位</span>
            </Col>
            <Col span="10">
              <Input size="small" />
            </Col>
          </Col>
          <Col span="12">
            <Col span="5">
              <span>描述</span>
            </Col>
            <Col span="10">
              <Input size="small" />
            </Col>
          </Col>
        </Col>
        <Col span="24" class="mt12 mtop12">
        <Row :gutter="16">
          <Col span="8">
          <div  class="bcandpadding">
            <p>幼年</p>
            <Row class="mt12">
              <Col span="10" class="ivu-text-right">最小值</Col>
              <Col span="10" class="ivu-text-right">最大值</Col>
            </Row>
            <Row class="mt12">
              <Col span="4">犬</Col>
              <Col span="9">
                <Input size="small" />
              </Col>
              <Col span="9" offset="1">
                <Input size="small" />
              </Col>
            </Row>
            <Row class="mt12">
              <Col span="4">猫</Col>
              <Col span="9">
                <Input size="small" />
              </Col>
              <Col span="9" offset="1">
                <Input size="small" />
              </Col>
            </Row>
            <Row class="mt12">
              <Col span="4">其他</Col>
              <Col span="9">
                <Input size="small" />
              </Col>
              <Col span="9" offset="1">
                <Input size="small" />
              </Col>
            </Row>
            <Row class="mt12">
              <Col span="4" style="color:#F2F2F2">nothing</Col>
              <Col span="9" class="ivu-text-center">
                <Button type="warning" size="small">复制本栏</Button>
              </Col>
              <Col span="9" class="ivu-text-center" offset="1">
                <Button type="info" size="small">粘贴本栏</Button>
              </Col>
            </Row>
            </div>
          </Col>
          <Col span="8">
              <div  class="bcandpadding">
            <p>成年</p>
            <Row class="mt12">
              <Col span="10" class="ivu-text-right">最小值</Col>
              <Col span="10" class="ivu-text-right">最大值</Col>
            </Row>
            <Row class="mt12">
              <Col span="4">犬</Col>
              <Col span="9">
                <Input size="small" />
              </Col>
              <Col span="9" offset="1">
                <Input size="small" />
              </Col>
            </Row>
            <Row class="mt12">
              <Col span="4">猫</Col>
              <Col span="9">
                <Input size="small" />
              </Col>
              <Col span="9" offset="1">
                <Input size="small" />
              </Col>
            </Row>
            <Row class="mt12">
              <Col span="4">其他</Col>
              <Col span="9">
                <Input size="small" />
              </Col>
              <Col span="9" offset="1">
                <Input size="small" />
              </Col>
            </Row>
            <Row class="mt12">
              <Col span="4" style="color:#F2F2F2">nothing</Col>
              <Col span="9" class="ivu-text-center">
                <Button type="warning" size="small">复制本栏</Button>
              </Col>
              <Col span="9" class="ivu-text-center" offset="1">
                <Button type="info" size="small">粘贴本栏</Button>
              </Col>
            </Row>
             </div>
          </Col>
          <Col span="8">
              <div  class="bcandpadding">
            <p>老年</p>
            <Row class="mt12">
              <Col span="10" class="ivu-text-right">最小值</Col>
              <Col span="10" class="ivu-text-right">最大值</Col>
            </Row>
            <Row class="mt12">
              <Col span="4">犬</Col>
              <Col span="9">
                <Input size="small" />
              </Col>
              <Col span="9" offset="1">
                <Input size="small" />
              </Col>
            </Row>
            <Row class="mt12">
              <Col span="4">猫</Col>
              <Col span="9">
                <Input size="small" />
              </Col>
              <Col span="9" offset="1">
                <Input size="small" />
              </Col>
            </Row>
            <Row class="mt12">
              <Col span="4">其他</Col>
              <Col span="9">
                <Input size="small" />
              </Col>
              <Col span="9" offset="1">
                <Input size="small" />
              </Col>
            </Row>
            <Row class="mt12">
              <Col span="4" style="color:#F2F2F2">nothing</Col>
              <Col span="9" class="ivu-text-center">
                <Button type="warning" size="small">复制本栏</Button>
              </Col>
              <Col span="9" class="ivu-text-center" offset="1">
                <Button type="info" size="small">粘贴本栏</Button>
              </Col>
            </Row>
             </div>
          </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
    <Modal
      v-model="otherTypeModal"
      title="新增检验项"
      @on-ok="handleCreate"
      width="45%"
      class="rangeTypeModal"
    >
      <Row>
        <Col span="24" class="mt23">
          <Col span="12">
            <Col span="5">
              <span>指标名称</span>
            </Col>
            <Col span="10">
              <Input size="small" />
            </Col>
          </Col>
          <Col span="12">
            <Col span="5">
              <span>标准名称</span>
            </Col>
            <Col span="10">
              <Input size="small" />
            </Col>
          </Col>
        </Col>
        <Col span="24" class="mt23">
          <Col span="12">
            <Col span="5">
              <span>指标单位</span>
            </Col>
            <Col span="10">
              <Input size="small" />
            </Col>
          </Col>
          <Col span="12">
            <Col span="5">
              <span>描述</span>
            </Col>
            <Col span="10">
              <Input size="small" />
            </Col>
          </Col>
        </Col>
        <Col span="24" class="mt23">
          <Col span="15">
            <Col span="3">
              <span>结果值</span>
            </Col>
            <Col span="21">
              <Input size="small" />
            </Col>
          </Col>
          <Col span="5" offset="1">
            <Button type="info" size="small">+可选结果</Button>
          </Col>
        </Col>
        <Col span="24" class="mt23">
          <Col :xs="6" :sm="6" :md="6" :lg="3">
            <Tag closable @on-close="handleClose">阴性</Tag>
          </Col>
          <Col :xs="6" :sm="6" :md="6" :lg="3">
            <Tag closable @on-close="handleClose">阳性</Tag>
          </Col>
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
                tabActiveKey: 'goods-combination',
                list: [
                    { name: '血常规' },
                    { name: '尿常规' },
                    { name: '生化检验' },
                    { name: '内分泌及快速检测' },
                    { name: '电解质及血液气体分析' }
                ],
                currentName: '电解质及血液气体分析',
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '指标名称',
                        minWidth: 84,
                        key: 'zhibiaoName'
                    },
                    {
                        title: '标准名称',
                        minWidth: 84,
                        key: 'biaozhunName'
                    },
                    {
                        title: '指标单位',
                        minWidth: 84,
                        key: 'zhibiaoUnit'
                    },
                    {
                        title: '宠物种类',
                        minWidth: 84,
                        key: 'type',
                        render: (h, params) => {
                            let vm = this;
                            return h(
                                'Select',
                                {
                                    props: {
                                        value: params.row.type, // 获取选择的下拉框的值
                                        size: 'small',
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.type = e; // 改变下拉框赋值
                                        }
                                    }
                                },
                                vm.petTypeList.map(item => {
                                    // this.productTypeList下拉框里的data
                                    return h('Option', {
                                        // 下拉框的值
                                        props: {
                                            value: item.id,
                                            label: item.name
                                        }
                                    });
                                })
                            );
                        }
                    },
                    {
                        title: '年龄段',
                        minWidth: 84,
                        key: 'age',
                        render: (h, params) => {
                            let vm = this;
                            return h(
                                'Select',
                                {
                                    props: {
                                        value: params.row.age, // 获取选择的下拉框的值
                                        size: 'small',
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.age = e; // 改变下拉框赋值
                                        }
                                    }
                                },
                                vm.ageTypeList.map(item => {
                                    // this.productTypeList下拉框里的data
                                    return h('Option', {
                                        // 下拉框的值
                                        props: {
                                            value: item.id,
                                            label: item.name
                                        }
                                    });
                                })
                            );
                        }
                    },
                    {
                        title: '参考值下线',
                        minWidth: 84,
                        key: 'min'
                    },
                    {
                        title: '参考值上线',
                        minWidth: 84,
                        key: 'max'
                    },
                    {
                        title: '说明',
                        minWidth: 84,
                        key: 'remark'
                    }
                ],
                data1: [
                    {
                        zhibiaoName: '健康',
                        biaozhunName: '健康',
                        zhibiaoUnit: '健康',
                        type: 'dog',
                        age: 'big',
                        min: '1',
                        max: '1',
                        remark: '健康'
                    }
                ],
                current: 1,
                showCreate: false,
                showCreateSingle: false,
                petTypeList: [
                    { id: 'dog', name: '犬类' },
                    { id: 'cat', name: '猫类' }
                ],
                ageTypeList: [
                    { id: 'big', name: '成年' },
                    { id: 'small', name: '幼年' }
                ],
                checkTypeSingle: '',
                rangeTypeModal: false,
                otherTypeModal: false
            };
        },
        methods: {
            handleOpenCreate () {
                this.showCreate = true;
            },
            handleOpenCreateSingle () {
                this.showCreateSingle = true;
            },
            handleCreate () {},
            switchList (name) {
                this.currentName = name;
            },
            addSingleNext () {
                if (this.checkTypeSingle === '有参考值范围结果类型') {
                    this.rangeTypeModal = true;
                } else {
                    this.otherTypeModal = true;
                }
            },
            handleClose () {}
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
.mr15 {
  margin-right: 15px;
}
.mt12 {
  margin-bottom: 12px;
}
.mt23 {
  margin-bottom: 23px;
}
.mtop12 {
  margin-top: 12px;
}
.bcandpadding {
  background-color: #f2f2f2;
  padding: 19px;
}
</style>
<style lang="less">
.check-list {
  height: 265px;
  overflow: auto;
}
.check-set-table .ivu-table-body {
  position: fixed !important;
}
.rangeTypeModal .ivu-modal-body {
  padding: 19px 35px;
}
</style>
