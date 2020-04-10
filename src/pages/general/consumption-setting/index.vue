<template>
  <div>
    <Card>
      <Tabs v-model="type" @on-click="changeType">
        <TabPane label="挂号" name="registration"></TabPane>
        <TabPane label="处方" name="prescription"></TabPane>
        <TabPane label="检验" name="check"></TabPane>
        <TabPane label="处置" name="handle"></TabPane>
        <TabPane label="手术" name="operation"></TabPane>
        <TabPane label="住院" name="hospitalization"></TabPane>
        <TabPane label="疫苗驱虫" name="vaccine"></TabPane>
        <TabPane label="美容" name="beauty"></TabPane>
        <TabPane label="商品" name="goods"></TabPane>
        <TabPane label="寄养" name="foster"></TabPane>
        <TabPane label="影像检验" name="imageCheck"></TabPane>
      </Tabs>
      <Row>
        <Col span="6">
          <Card>
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="12">
                <span class="module-title">目录</span>
              </Col>
              <Col span="12" class="ivu-text-right">
                <Button type="warning">剪切</Button>
                <Button type="info">粘贴</Button>
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Input prefix="ios-search" v-model="nameLike" @on-change="getGoodsCategoryList" clearable />
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Tree
                  ref="goodsCategoryTree"
                  :data="goodsCategoryTreeData"
                  class="set-width mytree"
                  @on-select-change="getChild"
                ></Tree>
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end" class="mtb15">
              <Col span="8" class="ivu-text-center">
                <Button type="success" @click="showAddGoodsCategoryModal">+类别</Button>
              </Col>
              <Col span="8" class="ivu-text-center">
                <Button type="error" @click="handleRemove">删除</Button>
              </Col>
              <Col span="8" class="ivu-text-center">
                <Button type="primary" @click="handleEdit">修改</Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span="18" class="box">
          <Card>
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="18">
                <span class="module-title">{{addGoodsCategoryForm.name&&addGoodsCategoryForm.name||"挂号"}}</span>
              </Col>
              <Col span="6">
                <Input prefix="ios-search" placeholder="名称/编码/条形码" />
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Table border :columns="registeredListColumns" :data="registeredListData"></Table>
                <div class="ivu-mt ivu-text-right">
                  <Page :total="registeredListData.length" :current.sync="current" />
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="end" class="mtb15">
              <Col span="14" class="ivu-text-left">
                <Button type="success" @click="showAddProjectModal">+项目</Button>
                <Button type="error">删除</Button>
                <Button type="primary">修改</Button>
                <Button type="warning">剪切</Button>
                <Button type="info">粘贴</Button>
                <Button>批量设置</Button>
              </Col>
              <Col span="10" class="ivu-text-right">
                <Button type="success" @click="importData">导入明细</Button>
                <Button type="info">导出明细</Button>
                <Button type="primary" @click="showSystemHint">初始化成本</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
    <Modal v-model="addGoodsCategoryModal" title="添加分类">
      <Form
        ref="addGoodsCategoryForm"
        :model="addGoodsCategoryForm"
        :rules="addGoodsCategoryRules"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="类别名称" prop="name">
          <Input placeholder="必填" v-model="addGoodsCategoryForm.name" />
        </FormItem>
        <FormItem label="保障卡打折" prop="partakeDiscount">
          <Select v-model="addGoodsCategoryForm.partakeDiscount">
            <Option value="true">参与</Option>
            <Option value="false">不参与</Option>
          </Select>
        </FormItem>
        <FormItem label="夜间调价" prop="adjustPriceType">
          <RadioGroup v-model="addGoodsCategoryForm.adjustPriceType">
            <Radio label="proportion" style="margin-right:50px">按比例</Radio>
            <Radio label="amount">按金额</Radio>
          </RadioGroup>
        </FormItem>
        <Row>
          <Col span="9" class="my-form-item-label">上调</Col>
          <Col span="15" class="lb0">
            <FormItem label prop="up">
              <Input v-model="addGoodsCategoryForm.up" style="width:100%">
                <span slot="append">{{addGoodsCategoryForm.adjustPriceType=="amount"?"元":"%"}}</span>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9" class="my-form-item-label">下调</Col>
          <Col span="15" class="lb0">
            <FormItem label prop="down">
              <Input v-model="addGoodsCategoryForm.down" style="width:100%">
                <span slot="append">{{addGoodsCategoryForm.adjustPriceType=="amount"?"元":"%"}}</span>
              </Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="default" @click="addGoodsCategoryModal=false">取消</Button>
        <Button type="primary" @click="handleAddGoodsCategory('addGoodsCategoryForm')">保存</Button>
      </div>
    </Modal>
    <Modal v-model="changeGoodsCategoryModal" title="夜间经营-调整">
      <Form
        ref="changeGoodsCategoryForm"
        :model="addGoodsCategoryForm"
        :rules="addGoodsCategoryRules"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="类别名称">
          {{addGoodsCategoryForm.name}}
        </FormItem>
        <FormItem label="夜间调价" prop="adjustPriceType">
          <RadioGroup v-model="addGoodsCategoryForm.adjustPriceType">
            <Radio label="proportion" style="margin-right:50px">按比例</Radio>
            <Radio label="amount">按金额</Radio>
          </RadioGroup>
        </FormItem>
        <Row>
          <Col span="9" class="my-form-item-label">上调</Col>
          <Col span="15" class="lb0">
            <FormItem label prop="up">
              <Input v-model="addGoodsCategoryForm.up" style="width:100%">
                <span slot="append">{{addGoodsCategoryForm.adjustPriceType=="amount"?"元":"%"}}</span>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9" class="my-form-item-label">下调</Col>
          <Col span="15" class="lb0">
            <FormItem label prop="down">
              <Input v-model="addGoodsCategoryForm.down" style="width:100%">
                <span slot="append">{{addGoodsCategoryForm.adjustPriceType=="amount"?"元":"%"}}</span>
              </Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="default" @click="changeGoodsCategoryModal=false">取消</Button>
        <Button type="primary" @click="handleAddGoodsCategory('changeGoodsCategoryForm')">保存</Button>
      </div>
    </Modal>
    <Modal v-model="addProject" title="添加项目" width="60%">
      <addItem></addItem>
      <div slot="footer">
        <Button type="success" @click="addProject=false">保存</Button>
        <Button type="info">保存并继续</Button>
      </div>
    </Modal>
    <Modal v-model="addPackageModal" title="添加套餐" @on-ok="handleCreate" width="80%">
      <Row>
        <Col span="5">
          <Card>
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="24">
                <span class="module-title">商品分类列表</span>
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end">
              <Col span="24">
                <Tree :data="goodsTypeModalData"></Tree>
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
                <span class="module-title">商品列表</span>
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
                <Table border :columns="goodsListModalColumns" :data="goodsListModalData"></Table>
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
                <span class="module-title">已选商品列表</span>
              </Col>
              <Col span="4" class="ivu-text-right">
                <Button type="error" class="mr10">删除</Button>
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Table border :columns="hasGoodsListColumns" :data="hasGoodsListData"></Table>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Modal>
    <Modal v-model="importDataModal" title="导入数据">
      <Form :label-width="100">
        <FormItem label="导入类型" class="importDataFormItem">
          <Col span="6">
            <Checkbox>新增消费</Checkbox>
          </Col>
          <Col span="6">
            <a href="javascript:;" style="text-decoration:underline;">下载空模版</a>
          </Col>
        </FormItem>
        <FormItem label class="importDataFormItem">
          <span>在空模板中维护好商品信息,课直接导入对应分类</span>
        </FormItem>
        <FormItem label class="importDataFormItem">
          <Checkbox>修改消费</Checkbox>
        </FormItem>
        <FormItem label>
          <span>在空模板中维护好商品信息,课直接导入对应分类</span>
        </FormItem>
        <FormItem label="文件路径">
          <Upload :action="resource" :headers="headers">
            <Button icon="ios-cloud-upload-outline">点此选择文件</Button>
          </Upload>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="systemHintModal" title="系统提示">
      <Row>
        <Col
          span="22"
          offset="1"
          class="ivu-text-left"
        >初始化成本会将所有商品的进价保存为商品的成本(已有成本的商品不再处理).是否现在开始初始化流程</Col>
      </Row>
      <div slot="footer">
        <Button type="default" @click="systemHintModal=false">否</Button>
        <Button type="success">是</Button>
      </div>
    </Modal>
    <Modal title="删除" v-model="removeModal" @on-ok="removeGoodsCategory">
      <div>确认删除吗？</div>
    </Modal>
  </div>
</template>
<script>
    import addItem from '@/components/add-item';
    import { listToTree } from '@/libs/util';
    export default {
        components: { addItem },
        data () {
            const validateNumber = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填项'));
                } else {
                    var r = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
                    if (!r.test(value)) {
                        callback(new Error('请输入数字，最多保留两位小数'));
                    }
                    callback();
                }
            };
            return {
                resource: this.$store.state.admin.user.resource,
                headers: this.$store.state.admin.user.headers,
                registeredListColumns: [
                    {
                        type: 'selection',
                        align: 'center',
                        minWidth: 60
                    },
                    {
                        title: '编号',
                        key: 'code',
                        minWidth: 95
                    },
                    {
                        title: '条形码',
                        minWidth: 84,
                        key: 'barCode'
                    },
                    {
                        title: '名称',
                        key: 'name',
                        minWidth: 125
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
                        title: '有效期',
                        minWidth: 84,
                        key: 'expirationDate'
                    },
                    {
                        title: '单价',
                        minWidth: 84,
                        key: 'price'
                    },
                    {
                        title: '最低售价',
                        key: 'lowPrice',
                        minWidth: 95
                    },
                    {
                        title: '说明',
                        minWidth: 84,
                        key: 'remark'
                    },
                    {
                        title: '参与折扣',
                        key: 'isDiscount',
                        minWidth: 95
                    },
                    {
                        title: '计算库存',
                        key: 'calculateInventory',
                        minWidth: 95
                    },
                    {
                        title: '当前库存',
                        key: 'currentInventory',
                        minWidth: 95
                    }
                ],
                registeredListData: [
                    {
                        code: 'P000001',
                        barCode: '',
                        name: '住院一级护理',
                        size: '',
                        unti: '',
                        expirationDate: '',
                        price: '50.00',
                        lowPrice: '0.00',
                        remark: '',
                        isDiscount: '否',
                        calculateInventory: '否',
                        currentInventory: '0'
                    },
                    {
                        code: 'P000001',
                        barCode: '',
                        name: '住院一级护理',
                        size: '',
                        unti: '',
                        expirationDate: '',
                        price: '50.00',
                        lowPrice: '0.00',
                        remark: '',
                        isDiscount: '否',
                        calculateInventory: '否',
                        currentInventory: '0'
                    }
                ],
                goodsColumns: [
                    {
                        title: '商品名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'code'
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
                        title: '组合数量',
                        key: 'num',
                        minWidth: 95,
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
                    }
                ],
                goodsListData: [
                    {
                        name: '',
                        code: '',
                        size: '',
                        unti: '',
                        price: '',
                        num: '1'
                    },
                    {
                        name: '',
                        code: '',
                        size: '',
                        unti: '',
                        price: '',
                        num: '1'
                    }
                ],
                goodsCategoryTreeData: [],
                goodsTypeModalData: [
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
                goodsListModalColumns: [
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'code'
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
                        title: '条形码',
                        minWidth: 84,
                        key: 'barCode'
                    }
                ],
                goodsListModalData: [
                    {
                        code: '',
                        name: '复合维生素B片',
                        size: '',
                        unti: '片',
                        price: '',
                        barCode: ''
                    }
                ],
                hasGoodsListColumns: [
                    {
                        type: 'selection',
                        minWidth: 84,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'code'
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
                        title: '组合数量',
                        minWidth: 84,
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
                    }
                ],
                hasGoodsListData: [
                    {
                        name: '宠物补血膏',
                        code: '',
                        size: '20ml',
                        unti: 'ml',
                        price: '5',
                        num: ''
                    },
                    {
                        name: '宠物补血膏',
                        code: '',
                        size: '20ml',
                        unti: 'ml',
                        price: '5',
                        num: ''
                    }
                ],
                current: 1,
                addGoodsCategoryModal: false,
                changeGoodsCategoryModal: false,
                addProject: false,
                addPackageModal: false,
                importDataModal: false,
                systemHintModal: false,
                type: 'registration', // 商品类型
                addGoodsCategoryForm: {
                    id: '',
                    hospitalId: '',
                    parentId: '',
                    name: '',
                    partakeDiscount: 'true',
                    type: 'registration',
                    adjustPriceType: 'amount',
                    up: '',
                    down: ''
                },
                addGoodsCategoryRules: {
                    name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
                    partakeDiscount: [
                        { required: true, message: '请选择是否参与打折', trigger: 'change' }
                    ],
                    adjustPriceType: [
                        { required: true, message: '请选择调价方式', trigger: 'change' }
                    ],
                    up: [{ validator: validateNumber, trigger: 'blur' }],
                    down: [{ validator: validateNumber, trigger: 'blur' }]
                },
                treeId: '',
                removeModal: false,
                nameLike: ''
            };
        },
        methods: {
            showAddGoodsCategoryModal () {
                this.$refs.addGoodsCategoryForm.resetFields();
                this.addGoodsCategoryForm.id = ''
                this.addGoodsCategoryForm.name = ''
                this.addGoodsCategoryForm.parentId = this.treeId
                this.addGoodsCategoryModal = true;
            },
            showChangeGoodsCategoryModal () {
                this.changeGoodsCategoryModal = true;
            },
            showAddProjectModal () {
                this.addProject = true;
            },
            addPackage () {
                this.addPackageModal = true;
            },
            handleCreate () {},
            importData () {
                this.importDataModal = true;
            },
            showSystemHint () {
                this.systemHintModal = true;
            },
            // 切换tab类型
            changeType () {
                this.getGoodsCategoryList()
            },
            // 点击树
            getChild (data) {
                if (data && data.length > 0) {
                    this.treeId = data[0].id
                    var obj = JSON.parse(JSON.stringify(data[0]));
                    this.addGoodsCategoryForm = this._.mapValues(this._.pick(obj, this._.keysIn(this.addGoodsCategoryForm)), (o) => {
                        if (typeof o === 'object') {
                            return o.code;
                        } else {
                            return o;
                        }
                    });
                    this.addGoodsCategoryForm.partakeDiscount = obj.partakeDiscount && obj.partakeDiscount.toString()
                } else {
                    this.treeId = '';
                    this.$refs.addGoodsCategoryForm.resetFields();
                }
            },
            // 获取商品分类列表
            getGoodsCategoryList () {
                var data = {
                    nameLike: this.nameLike,
                    type: this.type
                }
                this.$get('/admin/goods/category/page', data, response => {
                    let parentId = response.data && response.data.data && response.data.data.length > 0 && response.data.data[0].parentId
                    var treeData = listToTree(response.data.data, parentId);
                    // 转成树后需要重新处理渲染按钮
                    treeData.forEach(element => {
                        this.renderTreeButton(element);
                    });
                    this.goodsCategoryTreeData = treeData;
                });
            },
            renderTreeButton (element) {
                element.render = (h, { root, node, data }) => {
                    return h(
                        'span',
                        {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        },
                        [
                            h('span', data.title),
                            h(
                                'span',
                                {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right'
                                    }
                                },
                                [
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            class: 'btn-tree',
                                            style: {
                                                display: 'none',
                                                float: 'right'
                                            },
                                            on: {
                                                click: e => {
                                                    e.stopPropagation();
                                                    this.getChild([element]);
                                                    this.showChangeGoodsCategoryModal();
                                                }
                                            }
                                        },
                                        '调价'
                                    )
                                ]
                            )
                        ]
                    );
                };
                if (element.children && element.children.length > 0) {
                    element.children.forEach(item => {
                        this.renderTreeButton(item);
                    });
                }
            },
            // 保存商品分类
            handleAddGoodsCategory (form) {
                console.log(this.addGoodsCategoryForm);
                this.addGoodsCategoryForm.type = this.type;
                this.$refs[form].validate(valid => {
                    if (valid) {
                        this.$post(
                            '/admin/goods/category/save',
                            this.addGoodsCategoryForm,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getGoodsCategoryList()
                                    this.addGoodsCategoryModal = false
                                    this.changeGoodsCategoryModal = false
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    }
                });
            },
            handleRemove () {
                let selectIds = this.$refs.goodsCategoryTree.getSelectedNodes()
                if (selectIds == null || selectIds.length === 0) {
                    this.$Message.error('请选择要删除的数据');
                    return false;
                }
                this.removeModal = true;
            },
            handleEdit () {
                let selectIds = this.$refs.goodsCategoryTree.getSelectedNodes()
                if (selectIds == null || selectIds.length === 0) {
                    this.$Message.error('请选择要修改的数据');
                    return false;
                }
                this.addGoodsCategoryModal = true;
            },
            removeGoodsCategory () {
                this.$get(
                    '/admin/goods/category/remove/' + this.addGoodsCategoryForm.id,
                    {},
                    response => {
                        this.$Message.info('删除成功');
                        this.getGoodsCategoryList()
                        this.removeModal = false
                    }
                );
            }
        },
        mounted () {
            this.getGoodsCategoryList();
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
.topBorder {
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 12px;
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
.set-width .ivu-tree-title {
  width: calc(100% - 11px);
  width: -webkit-calc(100% - 11px);
  width: -moz-calc(100% - 11px);
  padding: 0;
}
.importDataFormItem {
  margin-bottom: 0;
}
.lb0 .ivu-form-item-content {
  margin: 1px 0;
  margin-left: 0 !important;
}
.my-form-item-label {
  padding-left: 100px;
  height: 34px;
  line-height: 34px;
}
.mytree .ivu-tree-title:hover .btn-tree {
  display: inline-block !important;
}
.mytree .ivu-tree-title-selected .btn-tree {
  display: inline-block !important;
}
</style>
