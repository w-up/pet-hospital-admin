<template>
  <div>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">提成方案列表</span>
            </Col>
          </Row>
          <Row class="noplr">
            <Col span="24">
              <List class="plan-list">
                <ListItem
                  v-for="item in list"
                  :key="item.id"
                  :class="item.id===currentPlanData.id?'active':''"
                >
                  <p @click="switchList(item)" class="list">{{ item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success" @click="showCreatePlanName">+方案</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary" @click="showEditPlanName">修改</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">提成方案</span>
            </Col>
          </Row>
          <Row :gutter="32" type="flex" class="mtb15 planForm">
            <Form
              ref="planDetailForm"
              :model="currentPlanData"
              :rules="planDetailRules"
              :label-width="100"
              style="width:100%"
            >
              <Col span="12">
                <RadioGroup v-model="currentPlanData.salesCommissionType.code">
                  <Row>
                    <Col span="4">
                      <strong>一级提成</strong>
                    </Col>
                    <Col span="4">销售提成</Col>
                    <Col span="16">
                      <FormItem class="lb0" prop="salesCommissionPro">
                        <Radio
                          label="proportion"
                          style="width:100px;margin:0;padding-right:12px"
                        >按比例(%)</Radio>
                        <Input
                          v-model="currentPlanData.salesCommissionPro"
                          placeholder="0.00"
                          style="width:calc(100% - 100px)"
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="16" offset="8">
                      <FormItem class="lb0" prop="salesCommissionAmo">
                        <Radio label="amount" style="width:100px;margin:0;padding-right:12px">固定金额</Radio>
                        <Input
                          v-model="currentPlanData.salesCommissionAmo"
                          placeholder="￥0.00"
                          style="width:calc(100% - 100px)"
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </RadioGroup>
                <RadioGroup v-model="currentPlanData.serviceCommissionType.code">
                  <Row>
                    <Col span="4" offset="4">服务提成</Col>
                    <Col span="16">
                      <FormItem class="lb0" prop="serviceCommissionPro">
                        <Radio
                          label="proportion"
                          style="width:100px;margin:0;padding-right:12px"
                        >按比例(%)</Radio>
                        <Input
                          v-model="currentPlanData.serviceCommissionPro"
                          placeholder="0.00"
                          style="width:calc(100% - 100px)"
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="16" offset="8">
                      <FormItem class="lb0" prop="serviceCommissionAmo">
                        <Radio label="amount" style="width:100px;margin:0;padding-right:12px">固定金额</Radio>
                        <Input
                          v-model="currentPlanData.serviceCommissionAmo"
                          placeholder="￥0.00"
                          style="width:calc(100% - 100px)"
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </RadioGroup>
              </Col>
              <Col span="12">
                <RadioGroup v-model="currentPlanData.secondSalesCommissionType.code">
                  <Row>
                    <Col span="4">
                      <strong>二级提成</strong>
                    </Col>
                    <Col span="4">销售提成</Col>
                    <Col span="16">
                      <FormItem class="lb0" prop="secondSalesCommissionPro">
                        <Radio
                          label="proportion"
                          style="width:100px;margin:0;padding-right:12px"
                        >按比例(%)</Radio>
                        <Input
                          v-model="currentPlanData.secondSalesCommissionPro"
                          placeholder="0.00"
                          style="width:calc(100% - 100px)"
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="16" offset="8">
                      <FormItem class="lb0" prop="secondSalesCommissionAmo">
                        <Radio label="amount" style="width:100px;margin:0;padding-right:12px">固定金额</Radio>
                        <Input
                          v-model="currentPlanData.secondSalesCommissionAmo"
                          placeholder="￥0.00"
                          style="width:calc(100% - 100px)"
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </RadioGroup>
                <RadioGroup v-model="currentPlanData.secondServiceCommissionType.code">
                  <Row>
                    <Col span="4" offset="4">服务提成</Col>
                    <Col span="16">
                      <FormItem class="lb0" prop="secondServiceCommissionPro">
                        <Radio
                          label="proportion"
                          style="width:100px;margin:0;padding-right:12px"
                        >按比例(%)</Radio>
                        <Input
                          v-model="currentPlanData.secondServiceCommissionPro"
                          placeholder="0.00"
                          style="width:calc(100% - 100px)"
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="16" offset="8">
                      <FormItem class="lb0" prop="secondServiceCommissionAmo">
                        <Radio label="amount" style="width:100px;margin:0;padding-right:12px">固定金额</Radio>
                        <Input
                          v-model="currentPlanData.secondServiceCommissionAmo"
                          placeholder="￥0.00"
                          style="width:calc(100% - 100px)"
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </RadioGroup>
              </Col>
            </Form>
          </Row>
          <Row>
            <Col span="24" class="ivu-text-right">
              <Button type="info">保存</Button>
            </Col>
          </Row>
        </Card>
        <Card class="ivu-mt">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">参与商品</span>
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
              <Button type="warning" @click="handleOpenEditCombination">添加商品</Button>
              <Button type="error">删除</Button>
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
    <Modal
      ref="createPlanModal"
      v-model="showAddPlanModal"
      :title="isAddPlan?'添加方案':'编辑方案'"
      @on-ok="hanSavePlan"
      :loading="true"
    >
      <Form ref="createPlanForm" :label-width="150" :model="planData" :rules="planRules">
        <FormItem label="方案名称" prop="name">
          <Input style="width:70%" v-model="planData.name" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            const validatePlanDetail = (rule, value, callback) => {
                var r = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
                if (value) {
                    if (!r.test(value)) {
                        callback(new Error('请输入数字，最多保留两位小数'));
                    } else {
                        callback(); // 必须加上。否则填写成功后会一直转圈，点击不成功
                    }
                } else {
                    callback();
                }
            };
            return {
                currentPlanData: {},
                planDetailRules: {
                    salesCommissionPro: [
                        { validator: validatePlanDetail, trigger: 'blur' }
                    ],
                    salesCommissionAmo: [
                        { validator: validatePlanDetail, trigger: 'blur' }
                    ],
                    serviceCommissionPro: [
                        { validator: validatePlanDetail, trigger: 'blur' }
                    ],
                    serviceCommissionAmo: [
                        { validator: validatePlanDetail, trigger: 'blur' }
                    ],
                    secondSalesCommissionPro: [
                        { validator: validatePlanDetail, trigger: 'blur' }
                    ],
                    secondSalesCommissionAmo: [
                        { validator: validatePlanDetail, trigger: 'blur' }
                    ],
                    secondServiceCommissionPro: [
                        { validator: validatePlanDetail, trigger: 'blur' }
                    ],
                    secondServiceCommissionAmo: [
                        { validator: validatePlanDetail, trigger: 'blur' }
                    ]
                },
                planRules: {
                    name: [{ required: true, message: '请输入方案名称', trigger: 'change' }]
                },
                isAddPlan: false,
                planData: {},
                list: [],
                showAddPlanModal: false,
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
                        minWidth: 84,
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
            getPlanList () {
                this.$get('/admin/commission/plan/page', {}, response => {
                    this.list = response.data.data;
                    this.currentPlanData =
                        response.data.data.length > 0
                            ? JSON.parse(JSON.stringify(response.data.data[0]))
                            : {};
                    this.setDetail(response.data.data[0])
                    // this.getPetSpeciesList();
                });
            },
            switchList (item) {
                this.currentPlanData = item;
                // this.setDetail(item)
                // this.getPetSpeciesList();
            },
            setDetail (item) {
                if (item.salesCommissionType) {
                    if (item.salesCommissionType.code === 'proportion') {
                        this.currentPlanData.salesCommissionPro = item.salesCommission
                    } else {
                        this.currentPlanData.salesCommissionAmo = item.salesCommission
                    }
                } else {
                    this.currentPlanData.salesCommissionType = {
                        code: ''
                    }
                    this.currentPlanData.salesCommissionPro = ''
                    this.currentPlanData.salesCommissionAmo = ''
                }

                if (item.serviceCommissionType) {
                    if (item.serviceCommissionType.code === 'proportion') {
                        this.currentPlanData.serviceCommissionPro = item.salesCommission
                    } else {
                        this.currentPlanData.serviceCommissionAmo = item.salesCommission
                    }
                } else {
                    this.currentPlanData.serviceCommissionType = {
                        code: ''
                    }
                    this.currentPlanData.serviceCommissionPro = ''
                    this.currentPlanData.serviceCommissionAmo = ''
                }

                if (item.secondSalesCommissionType) {
                    if (item.secondSalesCommissionType.code === 'proportion') {
                        this.currentPlanData.secondSalesCommissionPro = item.salesCommission
                    } else {
                        this.currentPlanData.secondSalesCommissionAmo = item.salesCommission
                    }
                } else {
                    this.currentPlanData.secondSalesCommissionType = {
                        code: ''
                    }
                    this.currentPlanData.secondSalesCommissionPro = ''
                    this.currentPlanData.secondSalesCommissionAmo = ''
                }

                if (item.secondServiceCommissionType) {
                    if (item.secondServiceCommissionType.code === 'proportion') {
                        this.currentPlanData.secondServiceCommissionPro = item.salesCommission
                    } else {
                        this.currentPlanData.secondServiceCommissionAmo = item.salesCommission
                    }
                } else {
                    this.currentPlanData.secondServiceCommissionType = {
                        code: ''
                    }
                    this.currentPlanData.secondServiceCommissionPro = ''
                    this.currentPlanData.secondServiceCommissionAmo = ''
                }
            },
            showCreatePlanName () {
                this.isAddPlan = true;
                this.$refs.createPlanForm.resetFields();
                this.planData = {};
                this.showAddPlanModal = true;
            },
            showEditPlanName () {
                if (!this.currentPlanData.id) {
                    this.$Message.error('无可修改项');
                    return false;
                }
                this.isAddPlan = false;
                this.planData = JSON.parse(JSON.stringify(this.currentPlanData));
                this.showAddPlanModal = true;
            },
            hanSavePlan () {
                this.$refs.createPlanModal.buttonLoading = false;
                this.$refs.createPlanForm.validate(valid => {
                    if (valid) {
                        this.$post('/admin/commission/plan/save', this.planData, response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                                this.getPlanList();
                                this.showAddPlanModal = false;
                            } else {
                                this.$Message.error(response.message);
                            }
                        });
                    } else {
                    }
                });
            },

            handleOpenEditCombination () {
                this.editCombination = true;
            },
            handleCreate () {}
        },
        mounted () {
            this.getPlanList();
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
</style>
<style lang="less">
.plan-list {
  height: 265px;
  overflow: auto;
}
.ivu-table-wrapper td {
  text-align: center;
}
.ivu-table-wrapper th {
  text-align: center;
}
.lb0 .ivu-form-item-content {
  margin: 1px 0;
  margin-left: 0 !important;
}
.planForm .ivu-radio-group {
  display: block;
}
</style>
