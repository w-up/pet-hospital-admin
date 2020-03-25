<template>
  <div>
    <Row :gutter="16">
      <Col span="6">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">收款单列表</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mt15">
            <Col span="24">
              <DatePicker type="daterange" placeholder="请选择日期范围" style="width: 100%;"></DatePicker>
            </Col>
            <Col span="24" class="mt6">
              <Input prefix="ios-search" placeholder="单号/公司" />
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end">
            <Col span="24">
              <List class="hospital-list">
                <ListItem v-for="(item, index) in billListData" :key="index">
                  <div style="width: 100%;">
                    <p>
                      {{ item.code }}
                      <span style="float: right;">2020-02-19</span>
                    </p>
                    <p>付款单位：{{ item.unit }}</p>
                    <p>付款金额：{{ item.price }}</p>
                  </div>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="24" class="mtb15">
            <Col span="8" class="ivu-text-left">
              <Button type="info">+收款单</Button>
            </Col>
            <Col span="8" class="ivu-text-left">
              <Button type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">收款单</span>
            </Col>
          </Row>
          <Row class="mtb6" :gutter="16">
            <Form :label-width="90" class="myform">
              <Row>
                <Col :xs="8" :sm="8" :md="4" :lg="4">
                  <FormItem label="收款单号:">
                    <span>123123123</span>
                  </FormItem>
                </Col>
                <Col :xs="8" :sm="8" :md="7" :lg="7">
                  <FormItem label="往来单位">
                    <Select placeholder="请选择">
                      <Option value="单位一"></Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col :xs="8" :sm="8" :md="7" :lg="7">
                  <FormItem label="结算日期">
                    <DatePicker type="date" placeholder="请选择日期" style="width: 100%;"></DatePicker>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :xs="8" :sm="8" :md="4" :lg="4">
                  <FormItem label="待结算总额:">
                    <span>0.00</span>
                  </FormItem>
                </Col>
                <Col :xs="8" :sm="8" :md="7" :lg="7">
                  <FormItem label="实付总额:">
                    <Col span="12">
                      <span>0.00</span>
                    </Col>
                    <Col span="12" class="ivu-text-right">
                      <Button type="warning" @click="inputPrice=true">输入金额</Button>
                    </Col>
                  </FormItem>
                </Col>
                <Col :xs="8" :sm="8" :md="7" :lg="7">
                  <FormItem label="操作人员">
                    <Select placeholder="请选择">
                      <Option value="人员一"></Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Row>
          <Row>
            <Card class="ptb0">
              <Row type="flex" justify="end" align="top" class-name="module-title-wrapper">
                <Col span="24">
                  <span class="module-title">待收款销售列表</span>
                </Col>
              </Row>
              <Row :gutter="24" type="flex" justify="end" class="marbot16">
                <Col span="24">
                  <Table
                    class="centerSty"
                    border
                    :columns="receiptListColumns"
                    :data="receiptListData"
                  ></Table>
                </Col>
              </Row>
            </Card>
          </Row>
          <Row class="marBtn">
            <Col span="12" class="ivu-text-left">
              <Button type="warning">打印</Button>
            </Col>
            <Col span="12" class="ivu-text-right">
              <Button type="success" @click="saveModal=true">保存</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="saveModal" title="确认收款">
      <Row>
        <Row class="marBto15">
          <Col span="24">采购结算，待退金额：0</Col>
        </Row>
        <Row>
          <Col span="24">结算方式：</Col>
        </Row>
        <Row class="mtb15">
          <Col span="5" class="ivu-text-center">
            <Checkbox>现金</Checkbox>
          </Col>
          <Col span="6">
            <Input size="small" />
          </Col>
          <Col span="5" class="ivu-text-center">
            <Checkbox>银行卡</Checkbox>
          </Col>
          <Col span="6">
            <Input size="small" />
          </Col>
        </Row>
        <Row class="mtb15">
          <Col span="5" class="ivu-text-center">
            <Checkbox>微信</Checkbox>
          </Col>
          <Col span="6">
            <Input size="small" />
          </Col>
          <Col span="5" class="ivu-text-center">
            <Checkbox>支付宝</Checkbox>
          </Col>
          <Col span="6">
            <Input size="small" />
          </Col>
        </Row>
        <Row>
          <Col span="5" class="ivu-text-center">
            <Checkbox>预收款</Checkbox>
          </Col>
          <Col span="6">
            <Input size="small" />
          </Col>
          <Col span="9" class="ivu-text-center">
            <span>余额收款余额：900.00</span>
          </Col>
        </Row>
      </Row>
      <div slot="footer">
        <Row>
          <Col span="24" class="ivu-text-right">
            <span>本次结算合计：0元</span>
            <Button type="info" class="marLef25">保存</Button>
          </Col>
        </Row>
      </div>
    </Modal>
    <Modal v-model="inputPrice" title="输入金额">
      <div>
        <Row>
          <p>您可直接填写总金额,系统自动格局但觉结算</p>
          <p>(总金额数量不能大于当前待付款金额)</p>
        </Row>
        <Row class="mt30">
          <p>当前待付款总额：100.00</p>
          <Form :label-width="70" class="myform">
            <FormItem label="合计结算" style="margin-bottom:0">
              <Input />
            </FormItem>
            <FormItem label="结算顺序">
              <Checkbox>按采购时间</Checkbox>
              <Checkbox>按金额从小到大</Checkbox>
            </FormItem>
          </Form>
        </Row>
      </div>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                billListData: [
                    {
                        code: 'F20230293',
                        unit: '青岛商贸',
                        price: '0'
                    },
                    {
                        code: 'F20230293',
                        unit: '青岛商贸',
                        price: '0'
                    },
                    {
                        code: 'F20230293',
                        unit: '青岛商贸',
                        price: '0'
                    }
                ],
                receiptListColumns: [
                    {
                        title: '待销售收款单号',
                        key: 'code'
                    },
                    {
                        title: '单据日期',
                        key: 'date'
                    },
                    {
                        title: '业务员',
                        key: 'member'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '总金额',
                        key: 'price'
                    },
                    {
                        title: '历史结算',
                        key: 'historicalSettlement'
                    },
                    {
                        title: '剩余待结算',
                        key: 'remainingSettlement'
                    },
                    {
                        title: '本次结算',
                        key: 'settlement'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                receiptListData: [
                    {
                        code: '',
                        date: '',
                        member: '',
                        type: '',
                        price: '',
                        historicalSettlement: '',
                        remainingSettlement: '',
                        settlement: '',
                        remark: ''
                    }
                ],
                saveModal: false,
                inputPrice: false
            };
        },
        computed: {},
        methods: {},
        created () {},
        mounted () {}
    };
</script>
<style lang="less" scoped>
.mt6 {
  margin-top: 6px;
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
.mt30 {
  margin: 30px 0 0;
}
.mtb6 {
  margin: 6px 0;
}
.mt15 {
  margin: 15px 0 0;
}
.marBtn {
  margin: 80px 0 15px 0;
}
.marbot16 {
  margin-bottom: 16px;
}
.marLef25 {
  margin-left: 25px;
}
.marBto15 {
  margin: 0 0 15px;
}
</style>
<style lang="less">
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
</style>
