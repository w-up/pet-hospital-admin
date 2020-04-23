<template>
  <div>
    <Tabs v-model="currentTypeCode" @on-click="changeType">
      <TabPane  v-for="(item, index) in typeList" :key="index" :label="item.otherName" :name="item.code"></TabPane>
    </Tabs>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">商品组合列表</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="ivu-mt">
            <Col span="24">
              <Input prefix="ios-search" clearable @on-change="getLeftGoodsList" v-model="nameLike"/>
            </Col>
          </Row>
          <Row class="mt6 noplr">
            <Col span="24">
              <List class="good-list">
                <p v-show="goodsList.length==0&&!isloadinglist" style="text-align: center;">暂无数据</p>
                <ListItem
                  v-for="(item, index) in goodsList"
                  :key="index"
                  :class="item.id===currentGoodsData.id?'active':''"
                >
                  <p @click="switchList(item)" class="list">{{ item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success" @click="openAddCombi">+添加</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary" @click="openEditCombi">修改</Button>
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
              <span class="module-title">{{currentTabName}}内容</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Table border :columns="combiDetailColumns" :data="combiDetailData"></Table>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="warning" @click="handleAddGoodsModal">+组合/修改</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
      <!-- 商品组合设置 -->
    <addGoods ref="addGoods" :goodsList="combiDetailData" :goodsColumns="consumptionOrderColumns" :isFormCombi="true" title="商品组合设置"></addGoods>
    <Modal ref="addCombiModal" v-model="showAddCombiModal" :title="isAddCombi?'新增商品组合':'编辑商品组合'" @on-ok="handleCreateCombi"  :loading="true">
      <Form ref="addCombiForm" :label-width="180" :rules="combiRules" :model="combiData">
        <FormItem label="商品组合名称" prop="name">
          <Input style="width:70%" v-model="combiData.name"/>
        </FormItem>
      </Form>
    </Modal>
    <!-- <Modal v-model="editCombination" title="商品组合设置" width="80%">
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
            <Row :gutter="16" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Table border :columns="consumptionOrderColumns" :data="consumptionOrderData"></Table>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Modal> -->
  </div>
</template>
<script>
    import addGoods from '@/components/add-goods';
    export default {
        components: { addGoods },
        data () {
            return {
                isloadinglist: true,
                tabObj: {},
                currentTabName: '',
                currentTypeCode: '',
                typeList: [],
                goodsList: [],
                nameLike: '',
                isAddCombi: '',
                combiRules: {
                    name: [
                        { required: true, message: '请输入商品组合名称', trigger: 'change' }
                    ]
                },
                combiData: {},
                currentGoodsData: {},
                combiDetailColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'goodsNumber'
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
                        key: 'num'
                    },
                    {
                        title: '用法',
                        minWidth: 84,
                        key: 'usageName'
                    },
                    {
                        title: '用量',
                        minWidth: 84,
                        key: 'dosage'
                    },
                    {
                        title: '条形码',
                        minWidth: 84,
                        key: 'goodsBarCode'
                    },
                    {
                        title: '备注',
                        minWidth: 84,
                        key: 'remark'
                    }
                ],
                combiDetailData: [
                ],
                showAddCombiModal: false,

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
                        title: '编号',
                        minWidth: 84,
                        key: 'code'
                    },
                    {
                        title: '条形码',
                        minWidth: 84,
                        key: 'goodsBarCode'
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
                consumptionOrderColumns: [ // 传给组件用到
                    {
                        type: 'selection',
                        minWidth: 60,
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
                        key: 'goodsBarCode'
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
                                            vm.combiDetailData[params.row._index].num = event.target.value
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '用法',
                        key: 'usageId',
                        minWidth: 90,
                        render: (h, params) => {
                            let vm = this;
                            return h(
                                'Select',
                                {
                                    props: {
                                        value: params.row.usageId, // 获取选择的下拉框的值
                                        size: 'small',
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            vm.combiDetailData[params.row._index].usageId = e // 改变下拉框赋值
                                        }
                                    }
                                },
                                vm.usageList.map(item => {
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
                                            vm.combiDetailData[params.row._index].dosage = event.target.value
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
                                            vm.combiDetailData[params.row._index].remark = event.target.value
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ],
                consumptionOrderData: [
                    {
                        code: 'P00001',
                        goodsBarCode: '000001',
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
                        goodsBarCode: '000001',
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
                usageList: [
                    '条目一',
                    '条目二'
                ]
            };
        },
        methods: {
            switchList (item) {
                this.currentGoodsData = JSON.parse(JSON.stringify(item))
                this.getCombiDetailList()
            },
            getCombiDetailList () {
                this.$get('/admin/goods/combination/detail/page?combinationId=' + this.currentGoodsData.id, {}, response => {
                    this.combiDetailData = response.data.data
                });
            },
            getUsageList () {
                this.$get('/admin/general/prescription/usage/page', {}, response => {
                    this.usageList = response.data.data
                });
            },
            getLeftGoodsList () {
                this.$get('/admin/goods/combination/page?combinationType=combination&type=' + this.currentTypeCode + '&nameLike=' + this.nameLike, {}, response => {
                    this.goodsList = response.data.data
                    this.isloadinglist = false
                    this.currentGoodsData =
                        response.data.data.length > 0
                            ? JSON.parse(JSON.stringify(response.data.data[0]))
                            : {};
                    this.getCombiDetailList()
                });
            },
            // 切换tab类型
            changeType (code) {
                this.currentTabName = this.tabObj[code]
                this.currentTypeCode = code
                this.getLeftGoodsList()
            },
            getTypeList () {
                this.$get('/admin/common/enum/goodsType/list', {}, response => {
                    this.typeList = response.data;
                    this.currentTabName = response.data[0].otherName
                    this.currentTypeCode = response.data[0].code
                    for (var i = 0; i < this.typeList.length; i++) {
                        this.tabObj[this.typeList[i].code] = this.typeList[i].otherName
                    }
                    this.getLeftGoodsList()
                });
            },
            openAddCombi () {
                this.isAddCombi = true
                this.$refs.addCombiForm.resetFields()
                this.combiData = {
                    type: this.currentTypeCode,
                    combinationType: 'combination',
                    name: ''
                }
                this.showAddCombiModal = true;
            },
            openEditCombi () {
                if (!this.currentGoodsData.id) {
                    this.$Message.error('无可修改项');
                    return false
                }
                this.isAddCombi = false
                this.$refs.addCombiForm.resetFields()
                this.combiData = JSON.parse(JSON.stringify(this.currentGoodsData));
                this.combiData = {
                    type: this.currentGoodsData.type.code,
                    combinationType: 'combination',
                    name: this.currentGoodsData.name,
                    id: this.currentGoodsData.id
                }
                this.showAddCombiModal = true;
            },
            handleCreateCombi () {
                this.$refs.addCombiModal.buttonLoading = false;
                this.$refs.addCombiForm.validate(valid => {
                    if (valid) {
                        this.$post(
                            '/admin/goods/combination/save',
                            this.combiData,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getLeftGoodsList();
                                    this.showAddCombiModal = false;
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    } else {
                    }
                })
            },
            getGoodsList (list) {
                if (list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var obj = {}
                        obj.combinationId = this.currentGoodsData.id
                        obj.goodsId = list[i].goodsId
                        obj.num = list[i].num
                        obj.usageId = list[i].usageId
                        obj.dosage = list[i].dosage
                        obj.remark = list[i].remark
                        this.$post(
                            '/admin/goods/combination/detail/save',
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
                        this.getCombiDetailList()
                    }, 500)
                }
            },
            handleAddGoodsModal () {
                if (!this.currentGoodsData.id) {
                    this.$Message.error('左侧商品组合列表无数据');
                    return false
                }
                this.combiDetailData = []
                this.$refs.addGoods.handleAddGoodsModal();
            },
            handelReload () {
                this.getCombiDetailList()
            }
        },
        mounted () {
            this.getTypeList()
            this.getUsageList()
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
.good-list {
  height: 265px;
  overflow: auto;
}
//使所有页面的表格的td和th都居中
.ivu-table-wrapper td {
  text-align: center;
}
.ivu-table-wrapper th {
  text-align: center;
}
</style>
