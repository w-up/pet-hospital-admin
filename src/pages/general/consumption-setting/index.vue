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
            <Row class-name="module-title-wrapper">
              <Col span="4">
                <span class="module-title">目录</span>
              </Col>
              <Col span="20" class="ivu-text-right">
                <Button type="warning">剪切</Button>
                <Button type="info">粘贴</Button>
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Input
                  prefix="ios-search"
                  v-model="nameLike"
                  @on-change="getGoodsCategoryList"
                  clearable
                />
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
                <span
                  class="module-title"
                >{{addGoodsCategoryForm.name&&addGoodsCategoryForm.name||currentTabName}}</span>
              </Col>
              <Col span="6">
                <Input
                  prefix="ios-search"
                  placeholder="名称/编码/条形码"
                  v-model="keywords"
                  @on-change="getGoodsList"
                  clearable
                />
              </Col>
            </Row>
            <Row :gutter="16" type="flex" justify="end" class="mtb15">
              <Col span="24">
                <Table
                  border
                  :columns="goodsColumns"
                  :data="goodsList"
                  @on-selection-change="handleSelect"
                ></Table>
                <div class="ivu-mt ivu-text-right">
                  <Page
                    :total="total"
                    :show-elevator="total/10>10"
                    page-size:10
                    @on-change="getGoodsList"
                    :current.sync="current"
                  />
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="end" class="mtb15">
              <Col span="14" class="ivu-text-left">
                <Button type="success" @click="handleAddGoodsModal">+项目</Button>
                <Button type="error" @click="handleRemoveGoods">删除</Button>
                <Button type="primary" @click="handleEditGoods">修改</Button>
                <Button type="warning">剪切</Button>
                <Button type="info">粘贴</Button>
                <Button>批量设置</Button>
                <Button v-show="type=='check'" type="primary" ghost @click="setCheck">检验项设置</Button>
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
        <FormItem label="类别名称">{{addGoodsCategoryForm.name}}</FormItem>
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
    <addItem ref="addItem" :type="type" :categoryId="treeId"></addItem>
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
    <Modal title="删除" v-model="removeGoodsModal" @on-ok="removeGoods">
      <div>确认删除商品吗？</div>
    </Modal>
    <Modal v-model="showSetCheckModal" title="检验项设置" width="1000" class="checkListModal">
      <Table ref="checkTable" border :columns="checkColumns" :data="checkData">
        <p slot="header" style="padding:0 16px">检验项列表</p>
      </Table>
      <div slot="footer">
        <Row>
          <Col span="12" class="ivu-text-left">
            <Button type="info" @click="addCheckItem">+检验项</Button>
            <Button type="error" @click="delCheckRow">删除行</Button>
          </Col>
          <Col span="12" class="ivu-text-right">
            <Button type="success" @click="showSetCheckModal=false">确定</Button>
          </Col>
        </Row>
      </div>
    </Modal>
    <!-- 添加检验项 -->
    <Modal v-model="showAddCheckItemModal" width="60%" title="添加检验项">
      <Row :gutter="16">
        <Col span="5">
          <Row class-name="module-title-wrapper">
            <Col>
              <span class="module-title">检查检验类别</span>
            </Col>
          </Row>
          <Row>
            <Col style="padding:8px 16px;border:1px solid #ccc">
              <Tree :data="checkTypeListData" @on-select-change="selectChange"></Tree>
            </Col>
          </Row>
        </Col>
        <Col span="19">
          <Row class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">单项</span>
            </Col>
          </Row>
          <Row>
            <Table border :columns="checkItemColumns" :data="checkItemData"></Table>
          </Row>
        </Col>
      </Row>

      <Row class-name="module-title-wrapper ivu-mt">
        <Col span="8">
          <span class="module-title">已选检验项</span>
        </Col>
        <Col span="16" class="ivu-text-right">
          <Button type="error" @click="removeSelect">删除</Button>
        </Col>
      </Row>
      <Row>
        <Table
          ref="checkItemTable"
          border
          :columns="selectCheckItemColumns"
          :data="selectCheckItemData"
        ></Table>
      </Row>

      <div slot="footer">
        <Row>
          <Col span="24" class="ivu-text-right">
            <Button type="success" @click="saveGoodsCheck">保存</Button>
          </Col>
        </Row>
      </div>
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
                checkItemOtherColumns: [
                    {
                        title: '指标名称',
                        minWidth: 84,
                        key: 'indexName'
                    },
                    {
                        title: '标准名称',
                        minWidth: 84,
                        key: 'standardName'
                    },
                    {
                        title: '指标单位',
                        minWidth: 84,
                        key: 'indexUnit'
                    },
                    {
                        title: '可选结果值',
                        minWidth: 84,
                        key: 'resultValue',
                        render: (h, params) => {
                            return h('div', [
                                params.row.resultValue
                                    ? params.row.resultValue.replace(/,/g, '/')
                                    : ''
                            ]);
                        }
                    },
                    {
                        title: '说明',
                        minWidth: 84,
                        key: 'explain'
                    },
                    {
                        title: '操作',
                        minWidth: 84,
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.singleAdd(params.row);
                                            }
                                        }
                                    },
                                    '添加'
                                )
                            ]);
                        }
                    }
                ],
                checkItemRangeColumns: [
                    {
                        title: '指标名称',
                        minWidth: 84,
                        key: 'indexName'
                    },
                    {
                        title: '标准名称',
                        minWidth: 84,
                        key: 'standardName'
                    },
                    {
                        title: '指标单位',
                        minWidth: 84,
                        key: 'indexUnit'
                    },
                    {
                        title: '宠物种类',
                        minWidth: 84,
                        key: 'type',
                        render: (h, params) => {
                            let vm = this;
                            return h(
                                'Select',
                                {
                                    props: {
                                        value: params.row.pet, // 获取选择的下拉框的值
                                        size: 'small',
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            this.checkItemData[params.row._index].pet = e;
                                        }
                                    }
                                },
                                vm.petTypeList.map(item => {
                                    return h('Option', {
                                        // 下拉框的值
                                        props: {
                                            value: item.key,
                                            label: item.name
                                        }
                                    });
                                })
                            );
                        }
                    },
                    {
                        title: '年龄段',
                        minWidth: 84,
                        key: 'age',
                        render: (h, params) => {
                            let vm = this;
                            return h(
                                'Select',
                                {
                                    props: {
                                        value: params.row.age, // 获取选择的下拉框的值
                                        size: 'small',
                                        transfer: true
                                    },
                                    on: {
                                        'on-change': e => {
                                            this.checkItemData[params.row._index].age = e;
                                        }
                                    }
                                },
                                vm.ageTypeList.map(item => {
                                    return h('Option', {
                                        // 下拉框的值
                                        props: {
                                            value: item.code,
                                            label: item.name
                                        }
                                    });
                                })
                            );
                        }
                    },
                    {
                        title: '参考值下线',
                        minWidth: 84,
                        key: 'lowerLimit',
                        render: (h, params) => {
                            var lower =
                                params.row[params.row.age + '-' + params.row.pet + '-lowerLimit'];
                            return h('div', [lower || '']);
                        }
                    },
                    {
                        title: '参考值上线',
                        minWidth: 84,
                        key: 'upperLimit',
                        render: (h, params) => {
                            var upper =
                                params.row[params.row.age + '-' + params.row.pet + '-upperLimit'];
                            return h('div', [upper || '']);
                        }
                    },
                    {
                        title: '说明',
                        minWidth: 84,
                        key: 'explain'
                    },
                    {
                        title: '操作',
                        minWidth: 84,
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.singleAdd(params.row);
                                            }
                                        }
                                    },
                                    '添加'
                                )
                            ]);
                        }
                    }
                ],
                checkItemColumns: [],
                checkItemData: [],
                currentCheckTypeData: {},
                showSetCheckModal: false,
                resource: this.$store.state.admin.user.resource,
                headers: this.$store.state.admin.user.headers,
                goodsColumns: [
                    {
                        type: 'selection',
                        align: 'center',
                        minWidth: 60
                    },
                    {
                        title: '编号',
                        key: 'number',
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
                        key: 'specification'
                    },
                    {
                        title: '单位',
                        minWidth: 84,
                        key: 'unit'
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
                        key: 'lowestPrice',
                        minWidth: 95
                    },
                    {
                        title: '说明',
                        key: 'description',
                        minWidth: 130,
                        ellipsis: true,
                        tooltip: true
                    },
                    {
                        title: '参与折扣',
                        key: 'takeDiscount',
                        minWidth: 95,
                        render: (h, params) => {
                            return h('div', params.row.takeDiscount ? '是' : '否');
                        }
                    },
                    {
                        title: '计算库存',
                        key: 'countInventory',
                        minWidth: 95,
                        render: (h, params) => {
                            return h('div', params.row.countInventory ? '是' : '否');
                        }
                    },
                    {
                        title: '当前库存',
                        key: 'lowestLimit',
                        minWidth: 95
                    }
                ],
                goodsList: [],
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
                checkColumns: [
                    {
                        type: 'selection',
                        align: 'center',
                        minWidth: 60
                    },
                    {
                        title: '指标名称',
                        minWidth: 84,
                        key: 'indexName',
                        render: (h, params) => {
                            return h('div', [params.row.item ? params.row.item.indexName : '']);
                        }
                    },
                    {
                        title: '标准名称',
                        minWidth: 84,
                        key: 'standardName',
                        render: (h, params) => {
                            return h('div', [
                                params.row.item.standardName ? params.row.item.standardName : ''
                            ]);
                        }
                    },
                    {
                        title: '指标单位',
                        minWidth: 84,
                        key: 'indexUnit',
                        render: (h, params) => {
                            return h('div', [
                                params.row.item.indexUnit ? params.row.item.indexUnit : ''
                            ]);
                        }
                    },
                    {
                        title: '宠物种类',
                        minWidth: 84,
                        key: 'type',
                        render: (h, params) => {
                            let vm = this;
                            var showSelect = 'none';
                            var showDiv = 'none';
                            if (params.row.item.details) {
                                showSelect = '';
                                showDiv = 'none';
                            } else {
                                showSelect = 'none';
                                showDiv = '';
                            }
                            return h('div', [
                                h(
                                    'Select',
                                    {
                                        props: {
                                            value: params.row.pet, // 获取选择的下拉框的值
                                            size: 'small',
                                            transfer: true
                                        },
                                        style: {
                                            display: showSelect
                                        },
                                        on: {
                                            'on-change': e => {
                                                this.checkData[params.row._index].pet = e;
                                            }
                                        }
                                    },
                                    vm.petTypeList.map(item => {
                                        return h('Option', {
                                            // 下拉框的值
                                            props: {
                                                value: item.key,
                                                label: item.name
                                            }
                                        });
                                    })
                                ),
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showDiv
                                        }
                                    },
                                    '/'
                                )
                            ]);
                        }
                    },
                    {
                        title: '年龄段',
                        minWidth: 84,
                        key: 'age',
                        render: (h, params) => {
                            let vm = this;
                            var showSelect = 'none';
                            var showDiv = 'none';
                            if (params.row.item.details) {
                                showSelect = '';
                                showDiv = 'none';
                            } else {
                                showSelect = 'none';
                                showDiv = '';
                            }
                            return h('div', [
                                h(
                                    'Select',
                                    {
                                        props: {
                                            value: params.row.age, // 获取选择的下拉框的值
                                            size: 'small',
                                            transfer: true
                                        },
                                        style: {
                                            display: showSelect
                                        },
                                        on: {
                                            'on-change': e => {
                                                this.checkData[params.row._index].age = e;
                                            }
                                        }
                                    },
                                    vm.ageTypeList.map(item => {
                                        return h('Option', {
                                            // 下拉框的值
                                            props: {
                                                value: item.code,
                                                label: item.name
                                            }
                                        });
                                    })
                                ),
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showDiv
                                        }
                                    },
                                    '/'
                                )
                            ]);
                        }
                    },
                    {
                        title: '参考值下线',
                        minWidth: 84,
                        key: 'lowerLimit',
                        render: (h, params) => {
                            var showSelect = 'none';
                            var showDiv = 'none';
                            if (params.row.item.details) {
                                showSelect = '';
                                showDiv = 'none';
                            } else {
                                showSelect = 'none';
                                showDiv = '';
                            }
                            var lower =
                                params.row[params.row.age + '-' + params.row.pet + '-lowerLimit'];
                            return h('div', [
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showDiv
                                        }
                                    },
                                    '/'
                                ),
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showSelect
                                        }
                                    },
                                    lower || ''
                                )
                            ]);
                        }
                    },
                    {
                        title: '参考值上线',
                        minWidth: 84,
                        key: 'upperLimit',
                        render: (h, params) => {
                            var showSelect = 'none';
                            var showDiv = 'none';
                            if (params.row.item.details) {
                                showSelect = '';
                                showDiv = 'none';
                            } else {
                                showSelect = 'none';
                                showDiv = '';
                            }
                            var upper =
                                params.row[params.row.age + '-' + params.row.pet + '-upperLimit'];
                            return h('div', [
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showDiv
                                        }
                                    },
                                    '/'
                                ),
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showSelect
                                        }
                                    },
                                    upper || ''
                                )
                            ]);
                        }
                    },
                    {
                        title: '可选结果值',
                        minWidth: 84,
                        key: 'resultValue',
                        render: (h, params) => {
                            var showSelect = 'none';
                            var showDiv = 'none';
                            if (params.row.item.details) {
                                showSelect = '';
                                showDiv = 'none';
                            } else {
                                showSelect = 'none';
                                showDiv = '';
                            }
                            return h('div', [
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showDiv
                                        }
                                    },
                                    params.row.item.resultValue
                                        ? params.row.item.resultValue.replace(/,/g, '/')
                                        : ''
                                ),
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showSelect
                                        }
                                    },
                                    '/'
                                )
                            ]);
                        }
                    },
                    {
                        title: '说明',
                        minWidth: 84,
                        key: 'explain',
                        render: (h, params) => {
                            return h('div', [
                                params.row.item.explain ? params.row.item.explain : ''
                            ]);
                        }
                    }
                ],
                selectCheckItemData: [],
                selectCheckItemColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '指标名称',
                        minWidth: 84,
                        key: 'indexName'
                    },
                    {
                        title: '标准名称',
                        minWidth: 84,
                        key: 'standardName'
                    },
                    {
                        title: '指标单位',
                        minWidth: 84,
                        key: 'indexUnit'
                    },
                    {
                        title: '宠物种类',
                        minWidth: 84,
                        key: 'type',
                        render: (h, params) => {
                            let vm = this;
                            var showSelect = 'none';
                            var showDiv = 'none';
                            if (params.row.details) {
                                showSelect = '';
                                showDiv = 'none';
                            } else {
                                showSelect = 'none';
                                showDiv = '';
                            }
                            return h('div', [
                                h(
                                    'Select',
                                    {
                                        props: {
                                            value: params.row.pet, // 获取选择的下拉框的值
                                            size: 'small',
                                            transfer: true
                                        },
                                        style: {
                                            display: showSelect
                                        },
                                        on: {
                                            'on-change': e => {
                                                this.selectCheckItemData[params.row._index].pet = e;
                                            }
                                        }
                                    },
                                    vm.petTypeList.map(item => {
                                        return h('Option', {
                                            // 下拉框的值
                                            props: {
                                                value: item.key,
                                                label: item.name
                                            }
                                        });
                                    })
                                ),
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showDiv
                                        }
                                    },
                                    '/'
                                )
                            ]);
                        }
                    },
                    {
                        title: '年龄段',
                        minWidth: 84,
                        key: 'age',
                        render: (h, params) => {
                            let vm = this;
                            var showSelect = 'none';
                            var showDiv = 'none';
                            if (params.row.details) {
                                showSelect = '';
                                showDiv = 'none';
                            } else {
                                showSelect = 'none';
                                showDiv = '';
                            }
                            return h('div', [
                                h(
                                    'Select',
                                    {
                                        props: {
                                            value: params.row.age, // 获取选择的下拉框的值
                                            size: 'small',
                                            transfer: true
                                        },
                                        style: {
                                            display: showSelect
                                        },
                                        on: {
                                            'on-change': e => {
                                                this.selectCheckItemData[params.row._index].age = e;
                                            }
                                        }
                                    },
                                    vm.ageTypeList.map(item => {
                                        return h('Option', {
                                            // 下拉框的值
                                            props: {
                                                value: item.code,
                                                label: item.name
                                            }
                                        });
                                    })
                                ),
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showDiv
                                        }
                                    },
                                    '/'
                                )
                            ]);
                        }
                    },
                    {
                        title: '参考值下线',
                        minWidth: 84,
                        key: 'lowerLimit',
                        render: (h, params) => {
                            var showSelect = 'none';
                            var showDiv = 'none';
                            if (params.row.details) {
                                showSelect = '';
                                showDiv = 'none';
                            } else {
                                showSelect = 'none';
                                showDiv = '';
                            }
                            var lower =
                                params.row[params.row.age + '-' + params.row.pet + '-lowerLimit'];
                            return h('div', [
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showDiv
                                        }
                                    },
                                    '/'
                                ),
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showSelect
                                        }
                                    },
                                    lower || ''
                                )
                            ]);
                        }
                    },
                    {
                        title: '参考值上线',
                        minWidth: 84,
                        key: 'upperLimit',
                        render: (h, params) => {
                            var showSelect = 'none';
                            var showDiv = 'none';
                            if (params.row.details) {
                                showSelect = '';
                                showDiv = 'none';
                            } else {
                                showSelect = 'none';
                                showDiv = '';
                            }
                            var upper =
                                params.row[params.row.age + '-' + params.row.pet + '-upperLimit'];
                            return h('div', [
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showDiv
                                        }
                                    },
                                    '/'
                                ),
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showSelect
                                        }
                                    },
                                    upper || ''
                                )
                            ]);
                        }
                    },
                    {
                        title: '可选结果值',
                        minWidth: 84,
                        key: 'resultValue',
                        render: (h, params) => {
                            var showSelect = 'none';
                            var showDiv = 'none';
                            if (params.row.details) {
                                showSelect = '';
                                showDiv = 'none';
                            } else {
                                showSelect = 'none';
                                showDiv = '';
                            }
                            return h('div', [
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showDiv
                                        }
                                    },
                                    params.row.resultValue
                                        ? params.row.resultValue.replace(/,/g, '/')
                                        : ''
                                ),
                                h(
                                    'div',
                                    {
                                        style: {
                                            display: showSelect
                                        }
                                    },
                                    '/'
                                )
                            ]);
                        }
                    },
                    {
                        title: '说明',
                        minWidth: 84,
                        key: 'explain'
                    }
                ],
                checkData: [],
                current: 1,
                total: 0,
                addGoodsModal: false,
                importDataModal: false,
                systemHintModal: false,

                addGoodsCategoryModal: false,
                changeGoodsCategoryModal: false,
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
                petTypeList: [],
                ageTypeList: [
                    { code: 'childhood', name: '幼年' },
                    { code: 'adult', name: '成年' },
                    { code: 'oldage', name: '老年' }
                ],
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
                removeGoodsModal: false,
                selectIds: [],
                nameLike: '', // 搜索商品类别名称
                keywords: '', // 搜索商品关键字
                currentTabName: '挂号',
                tabObj: {
                    registration: '挂号',
                    prescription: '处方',
                    check: '检验',
                    handle: '处置',
                    operation: '手术',
                    hospitalization: '住院',
                    vaccine: '疫苗驱虫',
                    beauty: '美容',
                    goods: '商品',
                    foster: '寄养',
                    imageCheck: '影像检验'
                },
                showAddCheckItemModal: false,
                checkTypeListData: []
            };
        },
        methods: {
            getPetTypeList () {
                this.$get('/admin/pet/species/page', {}, response => {
                    this.petTypeList = response.data.data;
                });
            },
            showAddGoodsCategoryModal () {
                this.$refs.addGoodsCategoryForm.resetFields();
                this.addGoodsCategoryForm.id = '';
                this.addGoodsCategoryForm.name = '';
                this.addGoodsCategoryForm.parentId = this.treeId;
                this.addGoodsCategoryModal = true;
            },
            showChangeGoodsCategoryModal () {
                this.changeGoodsCategoryModal = true;
            },
            showAddGoodsModalModal () {
                this.addGoodsModal = true;
            },
            handleCreate () {},
            importData () {
                this.importDataModal = true;
            },
            showSystemHint () {
                this.systemHintModal = true;
            },
            // 切换tab类型
            changeType (name) {
                this.currentTabName = this.tabObj[name];
                this.getGoodsCategoryList();
                this.getGoodsList();
            },
            // 点击树
            getChild (data, selectedNode) {
                this.$set(selectedNode, 'expand', !selectedNode.expand); // 点击节点文字展开收起
                if (data && data.length > 0) {
                    this.treeId = data[0].id;
                    var obj = JSON.parse(JSON.stringify(data[0]));
                    this.addGoodsCategoryForm = this._.mapValues(obj, function (o) {
                        if (typeof o === 'object') {
                            return o.code;
                        } else {
                            return o;
                        }
                    });
                    this.addGoodsCategoryForm.partakeDiscount =
                        obj.partakeDiscount && obj.partakeDiscount.toString();
                } else {
                    this.treeId = '';
                }
                this.getGoodsList();
            },
            // 获取商品分类列表
            getGoodsCategoryList () {
                var data = {
                    limit: 100,
                    nameLike: this.nameLike,
                    type: this.type
                };
                this.$get('/admin/goods/category/search', data, response => {
                    let parentId =
                        response.data &&
                        response.data.length > 0 &&
                        response.data[0].parentId;
                    var treeData = listToTree(response.data, parentId);
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
                this.addGoodsCategoryForm.type = this.type;
                this.$refs[form].validate(valid => {
                    if (valid) {
                        this.$post(
                            '/admin/goods/category/save',
                            this.addGoodsCategoryForm,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getGoodsCategoryList();
                                    this.addGoodsCategoryModal = false;
                                    this.changeGoodsCategoryModal = false;
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    }
                });
            },
            handleRemove () {
                let selectIds = this.$refs.goodsCategoryTree.getSelectedNodes();
                if (selectIds == null || selectIds.length === 0) {
                    this.$Message.error('请选择要删除的数据');
                    return false;
                }
                this.removeModal = true;
            },
            handleEdit () {
                let selectIds = this.$refs.goodsCategoryTree.getSelectedNodes();
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
                        this.getGoodsCategoryList();
                        this.removeModal = false;
                    }
                );
            },
            getGoodsList () {
                this.selectIds = [];
                var data = {
                    keywords: this.keywords,
                    type: this.type,
                    categoryId: this.treeId,
                    pageSize: 10,
                    pageNumber: this.current - 1
                };
                this.$get('/admin/goods/page', data, response => {
                    this.total = response.data.total;
                    this.goodsList = response.data.data;
                });
            },
            getCheckList () {
                var data = {
                    goodsId: this.selectIds[0]
                };
                this.$get('/admin/goods/check/setting/item/page', data, response => {
                    this.setBatchsaveDetailForItemDetail(response.data.data);
                });
            },
            handleAddGoodsModal () {
                this.$refs.addItem.handleAddGoodsModal();
            },
            handleSelect (val) {
                this.selectIds = [];
                for (var i = 0; i < val.length; i++) {
                    this.selectIds.push(val[i].id);
                }
            },
            handleRemoveGoods () {
                if (this.selectIds == null || this.selectIds.length === 0) {
                    this.$Message.error('请选择要删除的商品');
                    return false;
                }
                this.removeGoodsModal = true;
            },
            // 检验项设置
            setCheck () {
                if (this.selectIds == null || this.selectIds.length === 0) {
                    this.$Message.error('请选择商品');
                    return false;
                }
                this.getCheckList();
                this.showSetCheckModal = true;
            },
            // 删除商品
            removeGoods () {
                this.$get('/admin/goods/remove', { ids: this.selectIds }, response => {
                    this.$Message.info('删除成功');
                    this.getGoodsList();
                    this.removeGoodsModal = false;
                });
            },
            handleEditGoods () {
                if (this.selectIds == null || this.selectIds.length === 0) {
                    this.$Message.error('请选择要编辑的商品');
                    return false;
                }
                this.$refs.addItem.handleEditPackageModal(this.selectIds[0]);
            },
            addCheckItem () {
                this.getCheckTypeList();
                this.checkItemData = [];
                this.selectCheckItemData = [];
                this.showAddCheckItemModal = true;
            },
            getCheckTypeList () {
                this.$get('/admin/general/checkSetting/page', {}, response => {
                    this.checkTypeListData = response.data.data;
                    this.checkTypeListData.forEach(element => {
                        element.title = element.name;
                    });
                });
            },
            selectChange (selectedNodesList, selectedNode) {
                this.currentCheckTypeData = JSON.parse(JSON.stringify(selectedNode));
                this.getCheckItemList();
            },
            getCheckItemList () {
                if (this.currentCheckTypeData.hasReference) {
                    this.checkItemColumns = this.checkItemRangeColumns;
                } else {
                    this.checkItemColumns = this.checkItemOtherColumns;
                }
                var data = {
                    settingId: this.currentCheckTypeData.id
                };
                this.$get('/admin/general/checkSetting/item/page', data, response => {
                    this.setBatchsaveDetail(response.data.data);
                });
            },
            setBatchsaveDetail (data) {
                // 处理获取的单项列表数据
                for (var i = 0; i < data.length; i++) {
                    if (data[i].details) {
                        for (var j = 0; j < data[i].details.length; j++) {
                            for (var z = 0; z < data[i].details[j].spec.length; z++) {
                                // eslint-disable-next-line standard/computed-property-even-spacing
                                data[i][
                                    data[i].details[j].ageGroup.code +
                                    '-' +
                                    data[i].details[j].spec[z].species.key +
                                    '-lowerLimit'
                                ] = data[i].details[j].spec[z].lowerLimit; // 例：data[childhood-dog-lowerLimit]=返回数据里对应的lowerLimit
                                // eslint-disable-next-line standard/computed-property-even-spacing
                                data[i][
                                    data[i].details[j].ageGroup.code +
                                    '-' +
                                    data[i].details[j].spec[z].species.key +
                                    '-upperLimit'
                                ] = data[i].details[j].spec[z].upperLimit;
                            }
                        }
                        data[i].pet = 'dog';
                        data[i].age = 'childhood';
                    }
                }
                this.checkItemData = data;
            },
            setBatchsaveDetailForItemDetail (data) {
                // 处理获取的单项列表数据,当返回的detail存在item里面时
                for (var i = 0; i < data.length; i++) {
                    if (data[i].item.details) {
                        for (var j = 0; j < data[i].item.details.length; j++) {
                            for (var z = 0; z < data[i].item.details[j].spec.length; z++) {
                                // eslint-disable-next-line standard/computed-property-even-spacing
                                data[i][
                                    data[i].item.details[j].ageGroup.code +
                                    '-' +
                                    data[i].item.details[j].spec[z].species.key +
                                    '-lowerLimit'
                                ] = data[i].item.details[j].spec[z].lowerLimit; // 例：data[childhood-dog-lowerLimit]=返回数据里对应的lowerLimit
                                // eslint-disable-next-line standard/computed-property-even-spacing
                                data[i][
                                    data[i].item.details[j].ageGroup.code +
                                    '-' +
                                    data[i].item.details[j].spec[z].species.key +
                                    '-upperLimit'
                                ] = data[i].item.details[j].spec[z].upperLimit;
                            }
                        }
                        data[i].pet = 'dog';
                        data[i].age = 'childhood';
                    }
                }
                this.checkData = data;
                console.log(data);
            },
            singleAdd (element) {
                let arr = this.selectCheckItemData.map(item => item.id);
                if (arr.indexOf(element.id) === -1) {
                    this.selectCheckItemData.push(element);
                }
            },
            saveGoodsCheck () {
                let vm = this;
                this.selectCheckItemData.forEach(element => {
                    var data = {
                        goodsId: this.selectIds[0],
                        itemId: element.id
                    };
                    vm.$post('/admin/goods/check/setting/item/save', data, response => {});
                });
                this.showAddCheckItemModal = false;
                this.getCheckList();
                this.$Message.info('保存成功');
            },
            delCheckRow () {
                var selectIds = this.$refs.checkTable.getSelection();
                if (selectIds == null || selectIds.length === 0) {
                    this.$Message.error('请选择要删除的数据');
                    return false;
                }
                var arr = [];
                selectIds.forEach(element => {
                    arr.push(element.id);
                });
                var data = {
                    ids: arr
                };
                this.$get('/admin/goods/check/setting/item/remove', data, response => {
                    if (response.success) {
                        this.$Message.info('删除成功');
                        this.getCheckList();
                    }
                });
            },
            removeSelect () {
                var selectIds = this.$refs.checkItemTable.getSelection();
                if (selectIds.length == 0) {
                    this.$Message.error('请选择要删除的数据')
                    return false
                }
                selectIds.forEach(element => {
                    let arr = [];
                    arr = this.selectCheckItemData.map(item => item.id);
                    this.selectCheckItemData.splice(arr.indexOf(element.id), 1);
                });
            }
        },
        mounted () {
            this.getGoodsCategoryList();
            this.getGoodsList();
            this.getPetTypeList();
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
.checkListModal .ivu-modal-body {
  padding-bottom: 20px;
}
</style>
