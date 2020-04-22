<template>
  <div>
    <Tabs v-model="cardType" @on-click="clickTab" :animated="false">
      <TabPane label="会员卡种类列表" name="membershipCard">
        <Table
          class="centerSty"
          border
          :columns="membershipCardColumns"
          :data="membershipCardData"
          @on-selection-change="handleSelectMem"
        ></Table>
      </TabPane>
      <TabPane label="次卡种类列表" name="secondaryCard">
        <Table
          class="centerSty"
          border
          :columns="secondaryCardColumns"
          :data="secondaryCardData"
          @on-selection-change="handleSelectSec"
        ></Table>
      </TabPane>
      <TabPane label="保障卡种类列表" name="ensuringCard">
        <Table
          class="centerSty"
          border
          :columns="ensuringCardColumns"
          :data="ensuringCardData"
          @on-selection-change="handleSelectEns"
        ></Table>
      </TabPane>
    </Tabs>
    <Row :gutter="16" type="flex" class="mtb15">
      <Col>
        <Button type="success" @click="handleOpenCreate">+卡片</Button>
        <Button type="error">删除</Button>
        <Button type="primary" @click="handleOpenEdit">修改</Button>
      </Col>
    </Row>
    <Modal
      ref="membershipModal"
      v-model="showMembershipModal"
      :title="isAddMem?'新建会员卡':'修改会员卡'"
      @on-ok="createMembership"
      :loading="true"
    >
      <Form
        ref="membershipForm"
        :model="membershipFormData"
        :label-width="100"
        :rules="membershipRules"
      >
        <FormItem label="会员卡类型" prop="name" placeholder="必填">
          <Input style="width: 150px" v-model="membershipFormData.name" />
        </FormItem>
        <FormItem label="会员卡折扣" prop="discount">
          <Input style="width: 150px" v-model="membershipFormData.discount">
            <span slot="append">%</span>
          </Input>
        </FormItem>
        <FormItem label="是否积分">
          <RadioGroup v-model="membershipFormData.hasIntegral">
            <Radio :label="true">是</Radio>
            <Radio :label="false">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="积分原则" prop="consumptionAmount">
          <Input style="width: 200px" v-model="membershipFormData.consumptionAmount">
            <span slot="prepend">消费满</span>
            <span slot="append">元</span>
          </Input>
        </FormItem>
        <FormItem prop="integral">
          <Input style="width: 200px" v-model="membershipFormData.integral">
            <span slot="prepend">赠送</span>
            <span slot="append">积分</span>
          </Input>
        </FormItem>
        <FormItem>
          <Checkbox v-model="membershipFormData.allowIntegral">允许现金、银行卡、微信、支付宝、押金支付时进行积分</Checkbox>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      ref="secondaryModal"
      v-model="showSecondaryModal"
      :title="isAddSec?'新建次卡':'编辑次卡'"
      @on-ok="createSecondary"
      :loading="true"
    >
      <Form
        ref="secondaryForm"
        :model="secondaryFormData"
        :label-width="187"
        :rules="secondaryRules"
      >
        <FormItem label="次卡类型" prop="name">
          <Input style="width: 150px" v-model="secondaryFormData.name" placeholder="必填" />
        </FormItem>
        <FormItem label="销售提成" prop="salesCommission">
          <Input style="width: 150px" v-model="secondaryFormData.salesCommission">
            <span slot="append">%</span>
          </Input>
        </FormItem>
        <FormItem label="服务提成" prop="serviceCommission">
          <Input style="width: 150px" v-model="secondaryFormData.serviceCommission">
            <span slot="append">元/次</span>
          </Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      ref="ensuringModal"
      v-model="showEnsuringModal"
      :title="isAddEns?'新建保障卡':'编辑保障卡'"
      @on-ok="createEnsuring"
      :loading="true"
    >
      <Form ref="ensuringForm" :model="ensuringFormData" :label-width="187" :rules="ensuringRules">
        <FormItem label="保障卡类型" prop="name">
          <Input style="width: 150px" v-model="ensuringFormData.name" placeholder="必填" />
        </FormItem>
        <FormItem label="保障卡折扣" prop="discount">
          <Input style="width: 150px" v-model="ensuringFormData.discount">
            <span slot="append">%</span>
          </Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            const validateDiscount = (rule, value, callback) => {
                if (value) {
                    var r = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
                    if (!r.test(value)) {
                        callback(new Error('请输入数字，最多保留两位小数'));
                    }
                    if (value > 100) {
                        callback(new Error('折扣不能大于100%'));
                    }
                }
                callback();
            };
            return {
                membershipRules: {
                    name: [
                        { required: true, message: '请输入会员卡类型', trigger: 'change' }
                    ],
                    consumptionAmount: [
                        {
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ],
                    integral: [
                        {
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ],
                    discount: [{ validator: validateDiscount, trigger: 'blur' }]
                },
                secondaryRules: {
                    name: [
                        { required: true, message: '请输入会员卡类型', trigger: 'change' }
                    ],
                    salesCommission: [
                        {
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ],
                    serviceCommission: [
                        {
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ]
                },
                ensuringRules: {
                    name: [
                        { required: true, message: '请输入保障卡类型', trigger: 'change' }
                    ],
                    discount: [{ validator: validateDiscount, trigger: 'blur' }]
                },
                membershipFormData: {
                    id: '',
                    name: '',
                    discount: '10',
                    hasIntegral: '',
                    consumptionAmount: '',
                    integral: '',
                    allowIntegral: ''
                },
                secondaryFormData: {
                    id: '',
                    salesCommission: '',
                    serviceCommission: ''
                },
                ensuringFormData: {
                    id: '',
                    name: '',
                    discount: ''
                },
                cardType: 'membershipCard',
                membershipCardColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '会员卡类型',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '会员卡折扣',
                        minWidth: 84,
                        key: 'discount',
                        render: (h, params) => {
                            return h('div', [params.row.discount ? params.row.discount + '%' : '']);
                        }
                    },
                    {
                        title: '是否积分',
                        minWidth: 84,
                        key: 'whetherPoints',
                        render: (h, params) => {
                            return h('div', [params.row.hasIntegral ? '是' : '否']);
                        }
                    },
                    {
                        title: '会员卡积分规则',
                        minWidth: 84,
                        key: 'remark',
                        render: (h, params) => {
                            return h('div', [
                                params.row.consumptionAmount
                                    ? '消费满' +
                                        params.row.consumptionAmount +
                                        '元，赠送' +
                                        params.row.integral +
                                        '积分'
                                    : ''
                            ]);
                        }
                    }
                ],
                membershipCardData: [],
                secondaryCardColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '次卡类型',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '次卡销售提成',
                        minWidth: 84,
                        key: 'salesCommission',
                        render: (h, params) => {
                            return h('div', [
                                params.row.salesCommission ? params.row.salesCommission + '%' : ''
                            ]);
                        }
                    },
                    {
                        title: '次卡服务提成',
                        minWidth: 84,
                        key: 'serviceCommission',
                        render: (h, params) => {
                            return h('div', [
                                params.row.serviceCommission
                                    ? params.row.serviceCommission + '元/次'
                                    : ''
                            ]);
                        }
                    }
                ],
                secondaryCardData: [],
                ensuringCardColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '保障卡类型',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '保障卡折扣',
                        minWidth: 84,
                        key: 'discount',
                        render: (h, params) => {
                            return h('div', [params.row.discount ? params.row.discount + '%' : '']);
                        }
                    }
                ],
                ensuringCardData: [],
                showMembershipModal: false,
                showSecondaryModal: false,
                showEnsuringModal: false,
                isAddMem: false,
                isAddSec: false,
                isAddEns: false,
                selectListMem: [],
                selectListSec: [],
                selectListEns: []
            };
        },
        methods: {
            clickTab (tabName) {
                this.cardType = tabName;
            },
            getMembershipCardList () {
                var data = {
                    type: 'membership'
                };
                this.$get('/admin/general/card/page', data, response => {
                    this.membershipCardData = response.data.data;
                    this.selectListMem = [];
                });
            },
            getSecondaryCardList () {
                var data = {
                    type: 'times'
                };
                this.$get('/admin/general/card/page', data, response => {
                    this.secondaryCardData = response.data.data;
                    this.selectListSec = [];
                });
            },
            getEnsuringCardList () {
                var data = {
                    type: 'ensuring'
                };
                this.$get('/admin/general/card/page', data, response => {
                    this.ensuringCardData = response.data.data;
                    this.selectListEns = [];
                });
            },
            createMembership () {
                this.$refs.membershipModal.buttonLoading = false;
                this.$refs.membershipForm.validate(valid => {
                    if (valid) {
                        this.membershipFormData.type = 'membership';
                        this.$post(
                            '/admin/general/card/save',
                            this.membershipFormData,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getMembershipCardList();
                                    this.showMembershipModal = false;
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    } else {
                    }
                });
            },
            createSecondary () {
                this.$refs.secondaryModal.buttonLoading = false;
                this.$refs.secondaryForm.validate(valid => {
                    if (valid) {
                        this.secondaryFormData.type = 'times';
                        this.$post(
                            '/admin/general/card/save',
                            this.secondaryFormData,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getSecondaryCardList();
                                    this.showSecondaryModal = false;
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    } else {
                    }
                });
            },
            createEnsuring () {
                this.$refs.ensuringModal.buttonLoading = false;
                this.$refs.ensuringForm.validate(valid => {
                    if (valid) {
                        this.ensuringFormData.type = 'ensuring';
                        this.$post(
                            '/admin/general/card/save',
                            this.ensuringFormData,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getEnsuringCardList();
                                    this.showEnsuringModal = false;
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    } else {
                    }
                });
            },
            handleOpenCreate () {
                if (this.cardType === 'membershipCard') {
                    this.isAddMem = true;
                    this.$refs.membershipForm.resetFields();
                    this.membershipFormData = {};
                    this.membershipFormData.discount = '10';
                    this.showMembershipModal = true;
                } else if (this.cardType === 'secondaryCard') {
                    this.isAddSec = true;
                    this.$refs.secondaryForm.resetFields();
                    this.secondaryFormData = {};
                    this.showSecondaryModal = true;
                } else {
                    this.isAddEns = true;
                    this.$refs.ensuringForm.resetFields();
                    this.ensuringFormData = {};
                    this.ensuringFormData.discount = '10';
                    this.showEnsuringModal = true;
                }
            },
            handleOpenEdit () {
                if (this.cardType === 'membershipCard') {
                    if (this.selectListMem.length === 0) {
                        this.$Message.error('请选择表格中的数据');
                    } else {
                        this.isAddMem = false;
                        this.$refs.membershipForm.resetFields();
                        this.membershipFormData = JSON.parse(
                            JSON.stringify(this.selectListMem[0])
                        );
                        this.showMembershipModal = true;
                    }
                } else if (this.cardType === 'secondaryCard') {
                    if (this.selectListSec.length === 0) {
                        this.$Message.error('请选择表格中的数据');
                    } else {
                        this.isAddSec = false;
                        this.$refs.secondaryForm.resetFields();
                        this.secondaryFormData = JSON.parse(
                            JSON.stringify(this.selectListSec[0])
                        );
                        this.showSecondaryModal = true;
                    }
                } else {
                    if (this.selectListEns.length === 0) {
                        this.$Message.error('请选择表格中的数据');
                    } else {
                        this.isAddEns = false;
                        this.$refs.ensuringForm.resetFields();
                        this.ensuringFormData = JSON.parse(
                            JSON.stringify(this.selectListEns[0])
                        );
                        this.showEnsuringModal = true;
                    }
                }
            },
            handleSelectMem (selection) {
                this.selectListMem = JSON.parse(JSON.stringify(selection));
            },
            handleSelectSec (selection) {
                this.selectListSec = JSON.parse(JSON.stringify(selection));
                console.log(this.selectListSec);
            },
            handleSelectEns (selection) {
                this.selectListEns = JSON.parse(JSON.stringify(selection));
                console.log(this.selectListEns);
            }
        },
        mounted () {
            this.getMembershipCardList();
            this.getSecondaryCardList();
            this.getEnsuringCardList();
        }
    };
</script>
<style lang="less" scoped>
.mtb15 {
  margin: 15px 0;
}
</style>
<style lang="less">
.centerSty td {
  text-align: center;
}
.centerSty th {
  text-align: center;
}
</style>
