<template>
  <div>
    <Tabs v-model="cardType" @on-click="clickTab" :animated="false">
      <TabPane label="会员卡种类列表" name="membershipCard">
        <Table class="centerSty" border :columns="membershipCardColumns" :data="membershipCardData"></Table>
      </TabPane>
      <TabPane label="次卡种类列表" name="secondaryCard">
        <Table class="centerSty" border :columns="secondaryCardColumns" :data="secondaryCardData"></Table>
      </TabPane>
    </Tabs>
    <Row :gutter="24" type="flex" class="mtb15">
      <Col span="2" class="ivu-text-left">
        <Button type="success" @click="handleOpenCreate">+卡片</Button>
      </Col>
      <Col span="2" class="ivu-text-left">
        <Button type="error">删除</Button>
      </Col>
      <Col span="2" class="ivu-text-left">
        <Button type="primary">修改</Button>
      </Col>
    </Row>
    <Modal v-model="membershipModal" title="新建会员卡" @on-ok="handleCreate">
      <Form ref="create" :label-width="100">
        <FormItem label="会员卡类型">
          <Input style="width: 150px" />
        </FormItem>
        <FormItem label="会员卡折扣">
          <Input style="width: 150px" />
        </FormItem>
        <FormItem label="是否积分">
          <RadioGroup>
            <Radio label="是"></Radio>
            <Radio label="否"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="积分原则">
          <Input style="width: 200px">
            <span slot="prepend">消费满</span>
            <span slot="append">元</span>
          </Input>
        </FormItem>
        <FormItem label>
          <Input style="width: 200px">
            <span slot="prepend">赠送</span>
            <span slot="append">积分</span>
          </Input>
        </FormItem>
        <FormItem label>
          <Checkbox>允许现金、银行卡、微信、支付宝、押金支付时进行积分</Checkbox>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="secondaryModal" title="新建次卡" @on-ok="handleCreate">
      <Form ref="create" :label-width="187">
        <FormItem label="次卡类型">
          <Input style="width: 150px" />
        </FormItem>
        <FormItem label="销售提成">
          <Input style="width: 150px">
            <span slot="append">%</span>
          </Input>
        </FormItem>
        <FormItem label="服务提成">
          <Input style="width: 150px">
            <span slot="append">元/次</span>
          </Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                cardType: 'membershipCard',
                membershipCardColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '会员卡类型',
                        key: 'type'
                    },
                    {
                        title: '会员卡折扣',
                        key: 'discount'
                    },
                    {
                        title: '是否积分',
                        key: 'whetherPoints'
                    },
                    {
                        title: '会员卡积分规则',
                        key: 'unruleti'
                    }
                ],
                membershipCardData: [
                    {
                        type: '普通卡',
                        discount: '10.0',
                        whetherPoints: '否',
                        rule: ''
                    },
                    {
                        type: '银卡',
                        discount: '10.0',
                        whetherPoints: '否',
                        rule: ''
                    }
                ],
                secondaryCardColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '次卡类型',
                        key: 'type'
                    },
                    {
                        title: '次卡销售提成',
                        key: 'salesCommission'
                    },
                    {
                        title: '次卡服务提成',
                        key: 'serviceCommission'
                    }
                ],
                secondaryCardData: [
                    {
                        type: '普通卡',
                        salesCommission: '10.0',
                        serviceCommission: '否'
                    },
                    {
                        type: '银卡',
                        salesCommission: '10.0',
                        serviceCommission: '否'
                    }
                ],
                membershipModal: false,
                secondaryModal: false
            };
        },
        methods: {
            clickTab (tabName) {
                this.cardType = tabName;
            },
            handleOpenCreate () {
                if (this.cardType === 'membershipCard') {
                    this.membershipModal = true;
                } else {
                    this.secondaryModal = true;
                }
            },
            handleCreate () {}
        },
        mounted () {}
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
