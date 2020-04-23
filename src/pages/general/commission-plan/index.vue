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
              <Button type="info" @click="hanSavePlanDetail">保存</Button>
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
              <Table border :columns="planGoodsColumns" :data="planGoodsData"></Table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="total" :show-elevator="showElevator" :current.sync="current" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="warning" @click="handleAddGoodsModal">添加商品</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
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
 <!-- 商品组合设置 -->
    <addGoods ref="addGoods" :goodsList="planGoodsData" :goodsColumns="consumptionOrderColumns" :isFormCombi="true"></addGoods>
  </div>
</template>
<script>
    import addGoods from '@/components/add-goods';
    export default {
        components: { addGoods },
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
                planGoodsColumns: [
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
                        key: 'goodsName'
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
                planGoodsData: [
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
                total: 0,
                showElevator: false,
                consumptionOrderColumns: [
                    {
                        type: 'selection',
                        minWidth: 84,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'goodsNumber'
                    },
                    {
                        title: '条形码',
                        minWidth: 84,
                        key: 'barCode'
                    },
                    {
                        title: '名称',
                        minWidth: 84,
                        key: 'goodsName'
                    },
                    {
                        title: '规格',
                        minWidth: 84,
                        key: 'goodsSpecification'
                    },
                    {
                        title: '单位',
                        minWidth: 84,
                        key: 'goodsUnit'
                    },
                    {
                        title: '单价',
                        minWidth: 84,
                        key: 'goodsPrice'
                    },
                    {
                        title: '数量',
                        minWidth: 84,
                        key: 'num',
                        render: (h, params) => {
                            let vm = this;
                            return h('div', [
                                h('Input', {
                                    props: {
                                        // 将单元格的值给Input
                                        value: params.row.num
                                    },
                                    on: {
                                        'on-change' (event) {
                                            // 值改变时
                                            // 将渲染后的值重新赋值给单元格值
                                            vm.planGoodsData[params.row._index].num = event.target.value
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '用量',
                        minWidth: 84,
                        key: 'dosage',
                        render: (h, params) => {
                            let vm = this
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value: params.row.dosage
                                    },
                                    on: {
                                        'on-change' (event) {
                                            vm.planGoodsData[params.row._index].dosage = event.target.value
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '备注',
                        minWidth: 84,
                        key: 'remark',
                        render: (h, params) => {
                            let vm = this
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value: params.row.remark
                                    },
                                    on: {
                                        'on-change' (event) {
                                            vm.planGoodsData[params.row._index].remark = event.target.value
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ]
            };
        },
        methods: {
            handelReload () {
                this.getPlanGoodsList()
            },
            getGoodsList (list) {
                if (list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var obj = {}
                        obj.planId = this.currentPlanData.id
                        obj.goodsId = list[i].goodsId
                        obj.num = list[i].num
                        obj.dosage = list[i].dosage
                        obj.remark = list[i].remark
                        this.$post(
                            '/admin/goods/commission/plan/save',
                            obj,
                            response => {
                                if (response.success) {

                                } else {
                                }
                            }
                        );
                    }
                    setTimeout(() => {
                        // 设置延迟执行
                        this.getPlanGoodsList()
                    }, 500)
                }
            },
            handleAddGoodsModal () {
                this.planGoodsData = []
                this.$refs.addGoods.handleAddGoodsModal();
            },
            getPlanList () {
                this.$get('/admin/commission/plan/page', {}, response => {
                    this.list = response.data.data;
                    this.currentPlanData =
                        response.data.data.length > 0
                            ? JSON.parse(JSON.stringify(response.data.data[0]))
                            : {};
                    this.setDetail(response.data.data[0])
                    this.getPlanGoodsList();
                });
            },
            getPlanGoodsList () {
                this.$get('/admin/goods/commission/plan/page?planId=' + this.currentPlanData.id, {}, response => {
                    this.planGoodsData = response.data.data;
                    this.total = response.data.totalElements;
                    if (Number(this.total) / 10 > 9) {
                        this.showElevator = true;
                    }
                });
            },
            switchList (item) {
                this.currentPlanData = JSON.parse(JSON.stringify(item));
                this.setDetail(item)
                this.getPlanGoodsList();
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
                }

                if (item.serviceCommissionType) {
                    if (item.serviceCommissionType.code === 'proportion') {
                        this.currentPlanData.serviceCommissionPro = item.serviceCommission
                    } else {
                        this.currentPlanData.serviceCommissionAmo = item.serviceCommission
                    }
                } else {
                    this.currentPlanData.serviceCommissionType = {
                        code: ''
                    }
                }

                if (item.secondSalesCommissionType) {
                    if (item.secondSalesCommissionType.code === 'proportion') {
                        this.currentPlanData.secondSalesCommissionPro = item.secondSalesCommission
                    } else {
                        this.currentPlanData.secondSalesCommissionAmo = item.secondSalesCommission
                    }
                } else {
                    this.currentPlanData.secondSalesCommissionType = {
                        code: ''
                    }
                }

                if (item.secondServiceCommissionType) {
                    if (item.secondServiceCommissionType.code === 'proportion') {
                        this.currentPlanData.secondServiceCommissionPro = item.secondServiceCommission
                    } else {
                        this.currentPlanData.secondServiceCommissionAmo = item.secondServiceCommission
                    }
                } else {
                    this.currentPlanData.secondServiceCommissionType = {
                        code: ''
                    }
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
            hanSavePlanDetail () {
                this.$refs.planDetailForm.validate(valid => {
                    if (valid) {
                        // 处理传参
                        if (this.currentPlanData.salesCommissionType.code === 'proportion') {
                            this.currentPlanData.salesCommission = this.currentPlanData.salesCommissionPro
                            this.currentPlanData.salesCommissionType = 'proportion'
                        } else if (this.currentPlanData.salesCommissionType.code === 'amount') {
                            this.currentPlanData.salesCommission = this.currentPlanData.salesCommissionAmo
                            this.currentPlanData.salesCommissionType = 'amount'
                        } else {
                            this.currentPlanData.salesCommissionType = ''
                            this.currentPlanData.salesCommission = ''
                        }
                        delete this.currentPlanData.salesCommissionPro
                        delete this.currentPlanData.salesCommissionAmo

                        if (this.currentPlanData.serviceCommissionType.code === 'proportion') {
                            this.currentPlanData.serviceCommission = this.currentPlanData.serviceCommissionPro
                            this.currentPlanData.serviceCommissionType = 'proportion'
                        } else if (this.currentPlanData.serviceCommissionType.code === 'amount') {
                            this.currentPlanData.serviceCommission = this.currentPlanData.serviceCommissionAmo
                            this.currentPlanData.serviceCommissionType = 'amount'
                        } else {
                            this.currentPlanData.serviceCommissionType = ''
                            this.currentPlanData.serviceCommission = ''
                        }
                        delete this.currentPlanData.serviceCommissionPro
                        delete this.currentPlanData.serviceCommissionAmo

                        if (this.currentPlanData.secondSalesCommissionType.code === 'proportion') {
                            this.currentPlanData.secondSalesCommission = this.currentPlanData.secondSalesCommissionPro
                            this.currentPlanData.secondSalesCommissionType = 'proportion'
                        } else if (this.currentPlanData.secondSalesCommissionType.code === 'amount') {
                            this.currentPlanData.secondSalesCommission = this.currentPlanData.secondSalesCommissionAmo
                            this.currentPlanData.secondSalesCommissionType = 'amount'
                        } else {
                            this.currentPlanData.secondSalesCommissionType = ''
                            this.currentPlanData.secondSalesCommission = ''
                        }
                        delete this.currentPlanData.secondSalesCommissionPro
                        delete this.currentPlanData.secondSalesCommissionAmo

                        if (this.currentPlanData.secondServiceCommissionType.code === 'proportion') {
                            this.currentPlanData.secondServiceCommission = this.currentPlanData.secondServiceCommissionPro
                            this.currentPlanData.secondServiceCommissionType = 'proportion'
                        } else if (this.currentPlanData.secondServiceCommissionType.code === 'amount') {
                            this.currentPlanData.secondServiceCommission = this.currentPlanData.secondServiceCommissionAmo
                            this.currentPlanData.secondServiceCommissionType = 'amount'
                        } else {
                            this.currentPlanData.secondServiceCommissionType = ''
                            this.currentPlanData.secondServiceCommission = ''
                        }
                        delete this.currentPlanData.secondServiceCommissionPro
                        delete this.currentPlanData.secondServiceCommissionAmo

                        delete this.currentPlanData.thirdSalesCommissionType
                        delete this.currentPlanData.thirdSalesCommissionType
                        delete this.currentPlanData.thirdServiceCommissionType
                        delete this.currentPlanData.thirdServiceCommissionType

                        this.$post('/admin/commission/plan/save', this.currentPlanData, response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                                this.$refs.planDetailForm.resetFields();
                                this.getPlanList();
                            } else {
                                this.$Message.error(response.message);
                            }
                        });
                    } else {
                    }
                });
            }
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
