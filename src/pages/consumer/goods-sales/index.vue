<template>
  <div class="bgStyle">
    <Row class="marbot9">
      <p>商品销售</p>
    </Row>
    <Row :gutter="16" class="botSty">
      <Col :xs="7" :sm="6" :md="5" :lg="5" :xl="3" :xxl="2">
        <Checkbox>已登记顾客</Checkbox>
      </Col>
      <Col :xs="8" :sm="7" :md="6" :lg="6" :xl="4" :xxl="3">
        <Input size="small" prefix="ios-search" />
      </Col>
      <Col :xs="9" :sm="11" :md="13" :lg="13" :xl="17" :xxl="19">
        <Checkbox>散客</Checkbox>
      </Col>
    </Row>
    <Row class="changeMarginBto">
      <Col :sm="24" :md="12" :lg="12" :xl="12" :xxl="7">
        <Form :label-width="75" class="myform">
          <Col span="8">
            <FormItem label="顾客姓名:">
              <span>张</span>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="宠物姓名:">
              <span>夏天</span>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系方式:">
              <span>15543445454</span>
            </FormItem>
          </Col>
        </Form>
      </Col>
    </Row>
    <Row>
      <Col :sm="24" :md="20" :lg="18" :xl="12" :xxl="8">
        <Form :label-width="75" class="myform">
          <Col span="9">
            <FormItem label="会员卡:">
              <Select v-model="memberCardId">
                <Option value="1545334">1545334</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="余额:">
              <span>￥0.00</span>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem :label-width="0">
              <Checkbox>是否加载连锁卡</Checkbox>
            </FormItem>
          </Col>
        </Form>
      </Col>
    </Row>
    <Row class="boderBot">
      <Col span="24">
        <Card class="ptb0">
          <Row type="flex" justify="end" align="top" class-name="module-title-wrapper">
            <Col span="24" class="ivu-text-right">
              <Button type="info" @click="historicalPurchaseModal=true">历史购买</Button>
              <Button type="error" class="marLef11">删除</Button>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="marbot16">
            <Col span="24">
              <Table class="centerSty" border :columns="goodsColumns" :data="goodsData"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row class="marTop18">
      <Col :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
        <Row :gutter="16">
          <Col span="3">
            <Button type="warning" @click="addGoodsModal=true">+商品</Button>
          </Col>
          <Col span="15">
            <Input placeholder="再次搜索商品或条形码" />
          </Col>
          <Col span="5">
            <Button type="success">销售记录</Button>
          </Col>
        </Row>
      </Col>
      <Col :sm="24" :md="12" :lg="12" :xl="12" :xxl="12" class="ivu-text-right">
        <span style="padding: 6px 0;">合计：85元</span>
        <Button class="marLef11" type="warning">保存到结算单</Button>
        <Button class="marLef11" type="primary" @click="bookModal=true">挂账</Button>
        <Button class="marLef11" type="success" @click="cashierModal=true">收银</Button>
      </Col>
    </Row>
    <Modal v-model="addGoodsModal" width="80%" :closable="false">
      <div slot="header">
        <Row>
          <Col span="4">
            <div style="padding: 5px 0;">添加商品</div>
          </Col>
          <Col span="20" class="ivu-text-right">
            <span>没有想要的商品?</span>
            <Button size="small" type="success" class="marLef11">新增商品</Button>
            <Button class="marLef11" size="small" @click="addGoodsModal=false">关闭</Button>
          </Col>
        </Row>
      </div>
      <Row>
        <Tabs value="name1">
          <TabPane label="选择消费项目" name="name1"></TabPane>
          <TabPane label="检验组合" name="name2"></TabPane>
        </Tabs>
      </Row>
      <Row>
        <Col span="5">
          <Card class="ptb0">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="24">
                <span class="module-title">商品分类列表</span>
              </Col>
            </Row>
            <Row :gutter="24" type="flex" justify="end">
              <Col span="24">
                <Tree :data="goodsTypeData"></Tree>
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
                <span class="module-title">商品列表</span>
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
                <Table border :columns="goodsModalColumns" :data="goodsModalData"></Table>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="historicalPurchaseModal" title="影像检查单" width="60%">
      <Table border :columns="historicalPurchaseColumns" :data="historicalPurchaseData"></Table>
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="bookModal" title="挂账">
      <Row class="changeMarginBto">
        <Form :label-width="75" class="myform">
          <Col span="8">
            <FormItem label="顾客姓名:">
              <span>张</span>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系方式:">
              <span>15543445454</span>
            </FormItem>
          </Col>
        </Form>
      </Row>
      <Row>
        <Form :label-width="75" class="myform">
          <Col span="8">
            <FormItem label="挂账金额:">
              <span>45.00元</span>
            </FormItem>
          </Col>
        </Form>
      </Row>
      <Row>
        <Card class="ptb0">
          <Row
            type="flex"
            justify="center"
            :gutter="1"
            align="top"
            class-name="module-title-wrapper"
          >
            <Col span="24">
              <span class="module-title">挂账设置</span>
            </Col>
          </Row>
          <Row class="mtb15" :gutter="16">
            <Form :label-width="75" class="myform">
              <Col span="6">
                <FormItem :label-width="0">
                  <Checkbox>挂账提醒</Checkbox>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem :label-width="0">
                  <Input />
                </FormItem>
              </Col>
              <Col span="10">
                <FormItem :label-width="0">
                  <span>账单到期后自动提醒</span>
                </FormItem>
              </Col>
              <Col span="16">
                <FormItem label="操作人员">
                  <Select v-model="operator">
                    <Option value="王琦">王琦</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="24">
                <FormItem label="挂账说明">
                  <Input type="textarea" :rows="8" />
                </FormItem>
              </Col>
            </Form>
          </Row>
        </Card>
      </Row>
    </Modal>
    <Modal v-model="cashierModal" title="收银" width="1000px">
      <Row class="changeMarginBto">
        <Form :label-width="75" class="myform">
          <Col span="4">
            <FormItem label="顾客姓名:">
              <span>张</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="联系方式:">
              <span>15543445454</span>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="宠物名字:">
              <span>毛毛</span>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="种类:">
              <span>犬类</span>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="品种:">
              <span>金毛</span>
            </FormItem>
          </Col>
        </Form>
      </Row>
      <Row>
        <Form :label-width="75" class="myform">
          <Col span="4">
            <FormItem label="押金余额:">
              <span>0.00</span>
            </FormItem>
          </Col>
        </Form>
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <Card class="ptb0">
            <Row
              type="flex"
              justify="center"
              :gutter="1"
              align="top"
              class-name="module-title-wrapper"
            >
              <Col span="16">
                <span class="module-title">帐单信息</span>
              </Col>
              <Col span="8" class="ivu-text-right">
                <span class="module-title">账单金额：98.00</span>
              </Col>
            </Row>
            <Row class="marTop15" :gutter="16">
              <Form :label-width="90" class="myform">
                <Col span="24">
                  <FormItem label="整单折扣">
                    <Input style="width:160px" />
                  </FormItem>
                </Col>
                <Col span="11">
                  <FormItem label="会员卡列表">
                    <Select v-model="cardType">
                      <Option value="本地卡">本地卡</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="9">
                  <Input placeholder="使用其他卡片" />
                </Col>
                <Col span="4">
                  <Button type="warning" class="mr10">查询</Button>
                </Col>
              </Form>
            </Row>
            <Row>
              <Table border :columns="cardColumns" :data="cardData"></Table>
            </Row>
            <Row class="mtb15" :gutter="16">
              <Form :label-width="90" class="myform">
                <Col span="12">
                  <FormItem label="应付金额">
                    <Input />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem :label-width="0">
                    <Checkbox>抹零：0.00</Checkbox>
                  </FormItem>
                </Col>
                <Col span="23" offset="1">
                  <FormItem :label-width="0">
                    <Checkbox>已优惠：0.00</Checkbox>
                  </FormItem>
                </Col>
              </Form>
            </Row>
          </Card>
        </Col>
        <Col span="12">
          <Card class="ptb0">
            <Row
              type="flex"
              justify="center"
              :gutter="1"
              align="top"
              class-name="module-title-wrapper"
            >
              <Col span="24">
                <span class="module-title">收银信息</span>
              </Col>
            </Row>
            <Row class="marTop15 botStyModal" :gutter="16">
              <Form :label-width="90" class="myform">
                <Col span="5">
                  <FormItem :label-width="0">
                    <Checkbox>现金</Checkbox>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem :label-width="0">
                    <Input />
                  </FormItem>
                </Col>
                <Col span="13" class="checkHeight34">
                  <FormItem :label-width="0">
                    <span>找零：0.00</span>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem :label-width="0">
                    <Checkbox>银行卡</Checkbox>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem :label-width="0">
                    <Input />
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem :label-width="0">
                    <Checkbox>押金</Checkbox>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem :label-width="0">
                    <Input />
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem :label-width="0">
                    <Checkbox>支付宝</Checkbox>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem :label-width="0">
                    <Input />
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem :label-width="0">
                    <Checkbox>微信</Checkbox>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem :label-width="0">
                    <Input />
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem :label-width="0">
                    <span>余额支付</span>
                  </FormItem>
                </Col>
                <Col span="19">
                  <FormItem :label-width="0">
                    <Input style="width:100px" />
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem :label-width="0">
                    <span>赠额支付</span>
                  </FormItem>
                </Col>
                <Col span="6" style="margin-bottom: 6px;">
                  <FormItem :label-width="0">
                    <Input />
                  </FormItem>
                </Col>
              </Form>
            </Row>
            <Row class="marTop27">
              <Col span="24" class="ivu-text-right">支付合计：0.00元</Col>
            </Row>
            <Row class="mtb15">
              <Col span="24" class="ivu-text-right">获得积分：0.0分</Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row class="mtb15">
        <Col span="24">
          <Input placeholder="备注：" />
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        data () {
            return {
                memberCardId: '1545334',
                goodsColumns: [
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
                        key: 'price',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        // 将单元格的值给Input
                                        value: params.row.price
                                    },
                                    on: {
                                        'on-change' (event) {
                                            // 值改变时
                                            // 将渲染后的值重新赋值给单元格值
                                            params.row.price = event.target.value;
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '数量',
                        key: 'num',
                        render: (h, params) => {
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
                                            params.row.num = event.target.value;
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '合计',
                        key: 'total'
                    },
                    {
                        title: '条形码',
                        key: 'barCode'
                    },
                    {
                        title: '销售人员',
                        key: 'saleMan ',
                        render: (h, params) => {
                            return h(
                                'Select',
                                {
                                    props: {
                                        value: params.row.saleMan, // 获取选择的下拉框的值
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.saleMan = e; // 改变下拉框赋值
                                        }
                                    }
                                },
                                [
                                    h(
                                        'Option',
                                        {
                                            props: {
                                                value: '条目一'
                                            }
                                        },
                                        '条目一'
                                    ),
                                    h(
                                        'Option',
                                        {
                                            props: {
                                                value: '条目二'
                                            }
                                        },
                                        '条目二'
                                    )
                                ]
                            );
                        }
                    },
                    {
                        title: '服务人员',
                        key: 'serviceMan ',
                        render: (h, params) => {
                            return h(
                                'Select',
                                {
                                    props: {
                                        value: params.row.serviceMan, // 获取选择的下拉框的值
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            params.row.serviceMan = e; // 改变下拉框赋值
                                        }
                                    }
                                },
                                [
                                    h(
                                        'Option',
                                        {
                                            props: {
                                                value: '条目一'
                                            }
                                        },
                                        '条目一'
                                    ),
                                    h(
                                        'Option',
                                        {
                                            props: {
                                                value: '条目二'
                                            }
                                        },
                                        '条目二'
                                    )
                                ]
                            );
                        }
                    }
                ],
                goodsData: [
                    {
                        name: '大爱生活钙奶',
                        size: '',
                        unti: '',
                        price: '',
                        num: '',
                        total: '',
                        barCode: '',
                        saleMan: '条目一',
                        serviceMan: '条目一'
                    }
                ],
                goodsTypeData: [
                    {
                        title: '商品',
                        expand: true,
                        children: [
                            {
                                title: '用品类',
                                expand: false
                            },
                            {
                                title: '医药保健',
                                expand: false
                            }
                        ]
                    }
                ],
                goodsModalColumns: [
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
                        title: '条形码',
                        key: 'barCode'
                    },
                    {
                        title: '库存',
                        key: 'store'
                    }
                ],
                goodsModalData: [
                    {
                        name: '复合维生素B片',
                        size: '8片/盒',
                        unti: '盒',
                        price: '0',
                        barCode: '123123123',
                        store: '20'
                    },
                    {
                        name: '复合维生素B片',
                        size: '8片/盒',
                        unti: '盒',
                        price: '0',
                        barCode: '123123123',
                        store: '20'
                    }
                ],
                historicalPurchaseColumns: [
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
                        title: '售价',
                        key: 'price'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '购买日期',
                        key: 'date'
                    }
                ],
                historicalPurchaseData: [
                    {
                        code: '',
                        name: '',
                        size: '',
                        unti: '',
                        price: '',
                        num: '',
                        date: ''
                    },
                    {
                        code: '',
                        name: '',
                        size: '',
                        unti: '',
                        price: '',
                        num: '',
                        date: ''
                    }
                ],
                cardColumns: [
                    {
                        title: '编号',
                        key: 'code'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '余额',
                        key: 'price'
                    }
                ],
                cardData: [
                    {
                        code: '0506',
                        type: '普通卡',
                        price: '0.00'
                    },
                    {
                        code: '0506',
                        type: '普通卡',
                        price: '0.00'
                    }
                ],
                addGoodsModal: false,
                historicalPurchaseModal: false,
                bookModal: false,
                operator: '王琦',
                cashierModal: false,
                cardType: '本地卡'
            };
        },
        mounted () {
            let vm = this;
            vm.$nextTick(() => {});
        },
        created () {},
        computed: {},
        methods: {}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bgStyle {
  background-color: white;
  padding: 15px;
}
.marbot9 {
  margin-bottom: 9px;
}
.marbot16 {
  margin-bottom: 16px;
}
.botSty {
  border-bottom: 1px dashed #ddd;
  padding-bottom: 13px;
  margin-bottom: 9px;
}
.botStyModal {
  border-bottom: 1px dashed #ddd;
}
.myform .br {
  border-right: 1px solid #ccc;
  padding-right: 5%;
}
/*模块标题*/
.module-title-wrapper {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e9eaec;
  font-weight: 700;
  background-color: #fff;
}
.marLef11 {
  margin-left: 11px;
}
.boderBot {
  padding-bottom: 46px;
  border-bottom: 2px solid #ddd;
}
.marTop18 {
  margin-top: 18px;
}
.marTop15 {
  margin-top: 15px;
}
.marTop27 {
  margin-top: 27px;
}
.mtb15 {
  margin: 15px 0;
}
.box {
  padding-left: 15px;
}
</style>
<style lang="less">
.changeMarginBto .ivu-form-item {
  margin-bottom: 0px;
}
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
.checkHeight34 .ivu-form-item {
  height: 34px;
}
</style>
