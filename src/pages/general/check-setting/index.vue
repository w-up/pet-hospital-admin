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
              <Input prefix="ios-search" v-model="nameLike" @on-change="getCheckList" clearable />
            </Col>
          </Row>
          <Row class="mt6 noplr">
            <Col
              v-if="this.list.length==0&&loadingList==false"
              span="24"
              class="ivu-text-center"
            >暂无数据</Col>
            <Col span="24">
              <List class="check-list">
                <ListItem
                  v-for="(item, index) in list"
                  :key="index"
                  :class="item.id===currentCheckTypeData.id?'active':''"
                >
                  <p @click="switchList(item)" class="list">{{ item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="12" class="ivu-text-center">
              <Button type="success" @click="handleOpenCreateType">+添加分类</Button>
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
              <Table border :columns="checkItemColumns" :data="checkItemData" :loading="loadingTable" @on-selection-change="handleSelect"></Table>
              <div class="ivu-mt ivu-text-right">
                <Page  :total="total"  :current.sync="current" :show-elevator="showElevator"/>
              </div>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="primary" @click="handleCreateCheckItem">+单项</Button>
              <Button type="warning" @click="handleEditCheckItem">修改</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal
      ref="checkTypeModal"
      v-model="showCheckTypeModal"
      :loading="true"
      title="添加分类"
      @on-ok="addCheckType"
    >
      <Form ref="checkTypeForm" :label-width="180" :model="checkTypeData" :rules="checkTypeRules">
        <FormItem label="分类名称" prop="name">
          <Input style="width: 150px" v-model="checkTypeData.name" />
        </FormItem>
        <RadioGroup v-model="checkTypeData.hasReference">
          <FormItem label="结果类型" style="margin-bottom: 0px;">
            <Radio :label="1">有参考值范围结果类型</Radio>
          </FormItem>
          <FormItem label>
            <Radio :label="0">其他结果类型(如阴阳或其他)</Radio>
          </FormItem>
        </RadioGroup>
      </Form>
    </Modal>
    <Modal
      v-model="rangeTypeModal"
      title="新增检验项"
      @on-ok="createRangeType"
      width="962px"
      class="modalCla"
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
              <div class="bcandpadding">
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
              <div class="bcandpadding">
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
              <div class="bcandpadding">
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
      v-model="showOtherTypeModal"
      :title="isAddOtherTypeItem?'新增检验项':'编辑检验项'"
      @on-ok="createOtherType"
      width="700px"
      class="modalCla"
      :loading="true"
      ref="otherTypeModal"
    >
      <Row>
          <Form ref="otherTypeForm" :label-width="80" class="labelLefForm" :rules="otherTypeRules" :model="otherTypeFormData">
            <Col span="11">
              <FormItem label="指标名称" prop="indexName">
                <Input placeholder="必填" v-model="otherTypeFormData.indexName"/>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="标准名称">
                <Input v-model="otherTypeFormData.standardName"/>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="指标单位">
                <Input v-model="otherTypeFormData.indexUnit"/>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="描述">
                <Input  v-model="otherTypeFormData.explain"/>
              </FormItem>
            </Col>
            <Col span="19">
              <FormItem label="结果值">
                <Input v-model="otherTypeFormData.resultValue"/>
              </FormItem>
            </Col>
            <Col span="5" class="ivu-text-right">
              <FormItem :label-width="0">
                 <Button type="info">+可选结果</Button>
              </FormItem>
            </Col>
            <div style="width: 100%;display: inline-block;">
                    <Tag closable class="tag-com" @on-close="handleClose">阴性</Tag>
                    <Tag closable class="tag-com" @on-close="handleClose">阳性</Tag>
            </div>
          </Form>
        </Row>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                selectList: [],
                isAddOtherTypeItem: false,
                otherTypeFormData: {
                    indexName: '',
                    standardName: '',
                    indexUnit: '',
                    explain: '',
                    resultValue: ''
                },
                checkItemColumns: [],
                loadingTable: true,
                showElevator: false,
                checkTypeData: {
                    name: '',
                    hasReference: true
                },
                currentCheckTypeData: {
                    id: '',
                    name: ''
                },
                checkTypeRules: {
                    name: [{ required: true, message: '请输入名称', trigger: 'change' }]
                },
                otherTypeRules: {
                    indexName: [{ required: true, message: '请输入指标名称', trigger: 'change' }]
                },
                nameLike: '',
                loadingList: true,
                list: [],
                checkItemOtherColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '指标名称',
                        minWidth: 84,
                        key: 'indexName'
                    },
                    {
                        title: '标准名称',
                        minWidth: 84,
                        key: 'standardName'
                    },
                    {
                        title: '指标单位',
                        minWidth: 84,
                        key: 'indexUnit'
                    },
                    {
                        title: '可选结果值',
                        minWidth: 84,
                        key: 'resultValue'
                    },
                    {
                        title: '说明',
                        minWidth: 84,
                        key: 'explain'
                    }
                ],
                checkItemRangeColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '指标名称',
                        minWidth: 84,
                        key: 'indexName'
                    },
                    {
                        title: '标准名称',
                        minWidth: 84,
                        key: 'standardName'
                    },
                    {
                        title: '指标单位',
                        minWidth: 84,
                        key: 'indexUnit'
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
                                        value: params.row.species.key, // 获取选择的下拉框的值
                                        size: 'small',
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.species.key = e; // 改变下拉框赋值
                                        }
                                    }
                                },
                                vm.petTypeList.map(item => {
                                    // this.productTypeList下拉框里的data
                                    return h('Option', {
                                        // 下拉框的值
                                        props: {
                                            value: item.key,
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
                                        value: params.row.ageGroup.code, // 获取选择的下拉框的值
                                        size: 'small',
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.ageGroup.code = e; // 改变下拉框赋值
                                        }
                                    }
                                },
                                vm.ageTypeList.map(item => {
                                    return h('Option', {
                                        // 下拉框的值
                                        props: {
                                            value: item.code,
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
                        key: 'lowerLimit'
                    },
                    {
                        title: '参考值上线',
                        minWidth: 84,
                        key: 'upperLimit'
                    },
                    {
                        title: '说明',
                        minWidth: 84,
                        key: 'explain'
                    }
                ],
                checkItemData: [
                ],
                current: 1,
                total: 0,
                showCheckTypeModal: false,
                petTypeList: [
                ],
                ageTypeList: [
                    { code: 'adult', name: '成年' }
                ],
                rangeTypeModal: false,
                showOtherTypeModal: false
            };
        },
        methods: {
            switchList (item) {
                this.currentCheckTypeData = JSON.parse(JSON.stringify(item))
                this.getCheckItemList()
            },
            getCheckList () {
                var data = {
                    nameLike: this.nameLike
                };
                this.$get('/admin/general/checkSetting/page', data, response => {
                    this.list = response.data.data;
                    this.currentCheckTypeData =
                        response.data.data.length > 0
                            ? JSON.parse(JSON.stringify(response.data.data[0]))
                            : {};
                    this.loadingList = false;
                    this.getCheckItemList()
                });
            },
            getCheckItemList () {
                if (this.currentCheckTypeData.hasReference) {
                    this.checkItemColumns = this.checkItemRangeColumns
                } else {
                    this.checkItemColumns = this.checkItemOtherColumns
                }
                this.selectList = []
                var data = {
                    settingId: this.currentCheckTypeData.id,
                    start: this.current - 1,
                    size: 10
                };
                this.$get('/admin/general/checkSetting/item/page', data, response => {
                    this.checkItemData = response.data.data;
                    this.total = response.data.totalElements;
                    if (Number(this.total) / 10 > 9) {
                        this.showElevator = true
                    }
                    this.loadingTable = false
                });
            },
            getPetTypeList () {
                this.$get('/admin/pet/species/page', {}, response => {
                    this.petTypeList = response.data.data;
                });
            },
            handleOpenCreateType () {
                this.$refs.checkTypeForm.resetFields();
                this.checkTypeData = {
                    name: '',
                    hasReference: 1
                };
                this.showCheckTypeModal = true;
            },
            addCheckType () {
                this.$refs.checkTypeModal.buttonLoading = false;
                this.$refs.checkTypeForm.validate(valid => {
                    if (valid) {
                        this.$post(
                            '/admin/general/checkSetting/save',
                            this.checkTypeData,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getCheckList();
                                    this.showCheckTypeModal = false;
                                }
                            }
                        );
                    } else {
                    }
                });
            },
            handleCreateCheckItem () {
                if (this.currentCheckTypeData.hasReference) {
                    this.rangeTypeModal = true
                } else {
                    this.isAddOtherTypeItem = true
                    this.$refs.otherTypeForm.resetFields()
                    this.otherTypeFormData = {
                        indexName: '',
                        standardName: '',
                        indexUnit: '',
                        explain: '',
                        resultValue: ''
                    }
                    this.showOtherTypeModal = true
                }
            },
            createOtherType () {
                this.$refs.otherTypeModal.buttonLoading = false;
                this.$refs.otherTypeForm.validate(valid => {
                    if (valid) {
                        this.otherTypeFormData.settingId = this.currentCheckTypeData.id
                        this.$post('/admin/general/checkSetting/item/save', this.otherTypeFormData, response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                                this.getCheckItemList();
                                this.showOtherTypeModal = false
                            }
                        });
                    } else {
                    }
                });
            },
            handleSelect (selection) {
                this.selectList = JSON.parse(JSON.stringify(selection))
            },
            handleEditCheckItem () {
                if (this.selectList.length === 0) {
                    this.$Message.error('请选择表格中的数据');
                    return false
                }
                if (this.currentCheckTypeData.hasReference) {
                    this.rangeTypeModal = true
                } else {
                    this.isAddOtherTypeItem = false
                    this.$refs.otherTypeForm.resetFields()
                    this.otherTypeFormData = JSON.parse(JSON.stringify(this.selectList[0]))
                    this.showOtherTypeModal = true
                }
            },
            handleClose () {},
            createRangeType () {}
        },
        mounted () {
            this.getCheckList();
            this.getPetTypeList()
        }
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
.modalCla .ivu-modal-body {
  padding: 19px 35px;
}
.labelLefForm .ivu-form-item-label{
text-align: left;
}
</style>
