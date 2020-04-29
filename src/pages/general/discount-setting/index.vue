<template>
  <div>
    <Tabs v-model="currentCardId" @on-click="changeType">
      <TabPane v-for="(item, index) in cardList" :key="index" :label="item.name" :name="item.id"></TabPane>
    </Tabs>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">所有商品列表</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Tree :data="treeData" @on-select-change="selectChange"></Tree>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">单项目录</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Table
                class="centerSty"
                border
                :columns="discountGoodsColumns"
                :data="discountGoodsData"
                @on-selection-change="handleSelectGoods"
              ></Table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="total" :current.sync="current" :show-elevator="showElevator" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="warning" class="mr10" @click="showChangeDiscount">修改折扣</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal
      ref="changeDiscountModal"
      v-model="showChangeDiscountModal"
      title="修改折扣"
      @on-ok="handleChangeDiscount"
      :loading="true"
    >
      <Form
        ref="changeDiscountForm"
        :label-width="100"
        :model="discountData"
        :rules="discountRules"
      >
        <FormItem label="折扣值：" prop="discount">
          <Input v-model="discountData.discount">
            <span slot="append">%</span>
          </Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        name: 'list-table-list',
        data () {
            const validateDiscount = (rule, value, callback) => {
                var r = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
                if (!value) {
                    return callback(new Error('折扣不能为空'));
                } else if (!r.test(value)) {
                    callback(new Error('请输入数字，最多保留两位小数'));
                } else if (value > 100) {
                    callback(new Error('折扣不能大于100%'));
                } else {
                    callback();// 必须加上。否则填写成功后会一直转圈，点击不成功
                }
            };
            return {
                discountData: {
                    discount: '10'
                },
                currentCardId: '',
                cardList: [],
                current: 1,
                total: 0,
                discountGoodsColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'number'
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
                        key: 'specification'
                    },
                    {
                        title: '单位',
                        minWidth: 84,
                        key: 'unit'
                    },
                    {
                        title: '单价',
                        minWidth: 84,
                        key: 'price'
                    },
                    {
                        title: '折扣',
                        minWidth: 84,
                        key: 'discount',
                        render: (h, params) => {
                            return h('div', [params.row.discount ? params.row.discount + '%' : '']);
                        }
                    }
                ],
                discountGoodsData: [
                ],
                showElevator: false,
                discountRules: {
                    discount: [
                        { validator: validateDiscount, trigger: 'blur' }
                    ]
                },
                showChangeDiscountModal: false,
                treeData: [],
                selectListGoods: [],
                currentGoodsId: ''
            };
        },
        methods: {
            selectChange (selectedNodesList, selectedNode) {
                this.$set(selectedNode, 'expand', !selectedNode.expand)// 点击节点文字展开收起
                this.currentGoodsId = selectedNode.id ? selectedNode.id : '';
            },
            // 切换tab类型
            changeType (id) {
                this.currentCardId = id;
                this.getDiscountGoodsList();
            },
            getCardList () {
                this.$get('/admin/general/card/page', {}, response => {
                    this.cardList = response.data.data;
                    this.currentCardId = response.data.data[0].id;
                    this.getDiscountGoodsList();
                });
            },
            getDiscountGoodsList () {
                var data = {
                    cardId: this.currentCardId
                };
                this.$get('/admin/goods/discount/pageFromGoods', data, response => {
                    this.discountGoodsData = response.data.data;
                    this.total = response.data.totalElements;
                    if (Number(this.total) / 10 > 9) {
                        this.showElevator = true;
                    }
                });
            },
            getTreeData () {
                this.$get('/admin/goods/category/pageWithType', {}, response => {
                    // 处理树结构数据
                    this.treeData = [];
                    var list = response.data;
                    if (list.length > 0) {
                        for (var i = 0; i < list.length; i++) {
                            var obj = {};
                            obj.id = list[i].type.code;
                            obj.title = list[i].type.name;
                            if (list[i].categoryBos.length > 0) {
                                var childList = list[i].categoryBos;
                                var childArr = [];
                                for (var j = 0; j < childList.length; j++) {
                                    var childObj = {};
                                    childObj.title = childList[j].name;
                                    childObj.id = childList[j].id;
                                    childArr.push(childObj);
                                }
                                obj.children = childArr;
                            } else {
                                obj.children = [];
                            }
                            this.treeData.push(obj);
                        }
                    }
                });
            },
            showChangeDiscount () {
                if (this.currentGoodsId === '') {
                    this.$Message.error('请选择左侧树');
                } else if (this.selectListGoods.length === 0) {
                    this.$Message.error('请选择表格中的数据');
                } else {
                    this.$refs.changeDiscountForm.resetFields();
                    // this.discountData = {};
                    this.discountData.id = this.selectListGoods[0].discountId
                        ? this.selectListGoods[0].discountId
                        : '';
                    this.discountData.goodsId = this.currentGoodsId;
                    this.discountData.cardId = this.currentCardId;
                    this.discountData.discount = this.selectListGoods[0].discount
                        ? this.selectListGoods[0].discount
                        : '10';
                    this.showChangeDiscountModal = true;
                }
            },
            handleChangeDiscount () {
                this.$refs.changeDiscountModal.buttonLoading = false;
                this.$refs.changeDiscountForm.validate(valid => {
                    if (valid) {
                        this.$post(
                            '/admin/goods/discount/save',
                            this.discountData,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getDiscountGoodsList();
                                    this.showChangeDiscountModal = false;
                                    this.selectListGoods = []
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    } else {
                    }
                });
            },
            handleSelectGoods (selection) {
                this.selectListGoods = JSON.parse(JSON.stringify(selection));
                console.log(this.selectListGoods);
            }
        },
        mounted () {
            this.getCardList();
            this.getTreeData();
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
.centerSty td {
  text-align: center;
}
.centerSty th {
  text-align: center;
}
</style>
