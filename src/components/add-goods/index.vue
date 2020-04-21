<template>
  <div>
    <!-- 添加商品 -->
    <Modal v-model="addGoodsModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">商品组合设置</Col>
      </p>

      <Row :gutter="16">
        <Col span="6">
          <Row class-name="module-title-wrapper">
            <Col>
              <span class="module-title">消费项目分类</span>
            </Col>
          </Row>
          <Row>
            <Col class="all-category-tree-box">
              <Tree
                ref="allGoodsCategoryTree"
                :data="allGoodsCategoryTreeData"
                @on-select-change="getAllGoodsCategoryTreeChild"
              ></Tree>
            </Col>
          </Row>
        </Col>
        <Col span="18">
          <Row class-name="module-title-wrapper">
            <Col span="14">
              <span class="module-title">消费项目列表</span>
            </Col>
            <Col span="4" class="ivu-text-right">
              <Button type="warning" class="mr10" @click="quickAdd">快速添加</Button>
            </Col>
            <Col span="6" class="ivu-text-right">
              <Input
                prefix="ios-search"
                placeholder="名称，编号，条形码"
                v-model="search.keywords"
                @on-change="getAllGoodsList"
                clearable
              />
            </Col>
          </Row>
          <Row>
            <Table border :columns="allGoodsColumns" :data="allGoodsList"></Table>
            <div class="ivu-mt ivu-text-right">
              <Page
                :total="total"
                :show-elevator="total/10>10"
                page-size:10
                @on-change="getAllGoodsList"
                :current.sync="current"
              />
            </div>
          </Row>
        </Col>
      </Row>

      <Row class-name="module-title-wrapper ivu-mt">
        <Col span="8">
          <span class="module-title">消费单</span>
        </Col>
        <Col span="16" class="ivu-text-right">
          <Button type="error" @click="removeSelect">删除</Button>
        </Col>
      </Row>
      <Row>
        <Table ref="addGoodsTable" border :columns="goodsColumns" :data="goodsList"></Table>
      </Row>

      <div slot="footer">
        <Button type="success" @click="addGoods">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: 'addGoods',
        components: {},
        props: {
            goodsList: Array,
            goodsColumns: Array,
            isFormCombi: Boolean
        },
        data () {
            return {
                addGoodsModal: false,
                allGoodsColumns: [
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
                        title: '厂家',
                        minWidth: 84,
                        key: 'factory'
                    },
                    {
                        title: '备注',
                        minWidth: 84,
                        key: 'description'
                    }
                ],
                allGoodsCategoryTreeData: [],
                allGoodsList: [], // 所有商品列表
                search: {
                    keywords: '',
                    type: '',
                    categoryId: '',
                    pageSize: 5,
                    pageNumber: 0
                },
                total: 0,
                current: 1
            };
        },
        mounted () {
            let vm = this;
            vm.$nextTick(() => {});
        },
        created () {},
        computed: {},
        watch: {
            combiDetailData: {
                handler (newValue, oldValue) {
                    console.log(newValue)
                },
                deep: true
            }

        },
        methods: {
            handleAddGoodsModal () {
                // 父组件需要调用
                this.getAllGoodsCategoryList();
                this.getAllGoodsList();
                this.search.keywords = ''
                this.search.type = ''
                this.search.categoryId = ''
                this.addGoodsModal = true
            },
            // 获取商品分类列表(根据类名分组生成树)
            getAllGoodsCategoryList () {
                var data = {
                    limit: 100
                };
                this.$get('/admin/goods/category/search', data, response => {
                    var data = this._.groupBy(response.data, 'type.name');
                    this.allGoodsCategoryTreeData = [];
                    for (let key in data) {
                        var obj = {};
                        obj.title = key;
                        obj.expand = true;
                        obj.children = data[key];
                        obj.children.forEach(element => {
                            element.title = element.name;
                            obj.type = element.type;
                        });
                        this.allGoodsCategoryTreeData.push(obj);
                    }
                });
            },
            // 点击树
            getAllGoodsCategoryTreeChild (data) {
                if (data && data.length > 0) {
                    this.search.type = data[0].type && data[0].type.code;
                    this.search.categoryId = data[0].id;
                } else {
                    this.search.type = '';
                    this.search.categoryId = '';
                }
                this.getAllGoodsList();
            },
            getAllGoodsList () {
                this.search.pageNumber = this.current - 1;
                this.$get('/admin/goods/page', this.search, response => {
                    this.total = response.data.total;
                    this.allGoodsList = response.data.data;
                });
            },
            quickAdd () {
                let arr = this.goodsList.map(item => item.id);
                this.allGoodsList.forEach(element => {
                    if (arr.indexOf(element.id) === -1) {
                        if (this.isFormCombi) { // 商品组合页面专用的
                            this.goodsList.push({
                                goodsId: element.id,
                                goodsNumber: element.number,
                                goodsName: element.name,
                                goodsSpecification: element.specification,
                                goodsUnit: element.unit,
                                goodsPrice: element.price,
                                num: '',
                                usageId: '',
                                dosage: '',
                                barCode: element.barCode,
                                remark: element.remark
                            });
                        } else {
                            this.goodsList.push(element);
                        }
                    }
                });
            },
            removeSelect () {
                var selectIds = this.$refs.addGoodsTable.getSelection();
                selectIds.forEach(element => {
                    let arr = []
                    if (this.isFormCombi) {
                        arr = this.goodsList.map(item => item.goodsId);
                        this.goodsList.splice(arr.indexOf(element.goodsId), 1);
                    } else {
                        arr = this.goodsList.map(item => item.id);
                        this.goodsList.splice(arr.indexOf(element.id), 1);
                    }
                });
            },
            addGoods () {
                this.addGoodsModal = false;
                this.$parent.getGoodsList(this.goodsList);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.box {
  padding-left: 15px;
}
.mtb15 {
  margin: 15px 0;
}
.mlr15 {
  margin: 0 15px;
}
.borderandpadding {
  border-bottom: 1px solid #ddd;
  padding-bottom: 22px;
}
.padding8 {
  padding: 8px;
}
.padding08 {
  padding: 0 8px;
}
.br1 {
  height: 1620px;
  border-right: 1px solid #ccc;
}

.mt10 {
  margin-top: 10px;
}

.mh-list {
  height: 400px;
  overflow: auto;
}

.mr24 {
  margin-right: 24px;
}

.mt5 {
  margin-top: 5px;
}

.all-category-tree-box {
  padding: 8px 16px;
  border: 1px solid #ccc;
  height: 330px;
  overflow: auto;
}
</style>
<style lang="less">
.marLef10 {
  margin-left: 10px;
}
//使所有页面的表格的td和th都居中
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
.lb140 .ivu-form-item-label {
  width: 140px !important;
}
.lb140 .ivu-form-item-content {
  margin-left: 140px !important;
}
.use-setting .ivu-form-item-label {
  text-align: left;
}
.ivu-title {
  height: 32px;
  line-height: 32px;
}
</style>
