<template>
  <div>
    <Modal v-model="addGoodsModal" title="添加项目" width="60%" @on-cancel="closeAddGoodsModal">
      <Tabs v-model="addType" name="add" class="mytabs" :animated="false">
        <TabPane label="添加商品" name="goods" tab="add">
          <Row :gutter="16">
            <Form
              ref="addGoodsForm"
              :model="addGoodsForm"
              :rules="addGoodsFormRules"
              :label-width="100"
              class="myform"
            >
              <Col span="12">
                <FormItem label="商品名称" prop="name">
                  <Input v-model="addGoodsForm.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem class="lb0">
                  <Checkbox
                    v-model="addGoodsForm.enableAlias"
                    style="width:100px;margin:0;padding-right:12px;text-align:right"
                  >设置别名</Checkbox>
                  <Input
                    v-model="addGoodsForm.alias"
                    placeholder="显示、打印都显示别名"
                    style="width:calc(100% - 100px)"
                  />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="拼音搜索">
                  <Input v-model="addGoodsForm.namePy" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品条码">
                  <Input v-model="addGoodsForm.barCode" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品编号">
                  <Input v-model="addGoodsForm.number" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品单位">
                  <Input v-model="addGoodsForm.unit" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="生产厂家">
                  <Input v-model="addGoodsForm.factory" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品规格">
                  <Input v-model="addGoodsForm.specification" />
                </FormItem>
              </Col>
              <Col span="24">
                <FormItem label="库存下限" prop="lowestLimit">
                  <Input value="0" v-width="200" v-model="addGoodsForm.lowestLimit" />
                  <span style="color:#ccc;padding-left:12px">库存量低于下限，系统自动提醒</span>
                </FormItem>
              </Col>
              <Col span="24" style="padding-left:40px">
                <Checkbox class="mr24" v-model="addGoodsForm.takeDiscount">参与打折</Checkbox>
                <Checkbox class="mr24" v-model="addGoodsForm.partakeDiscount">参与保障卡打折</Checkbox>
                <Checkbox class="mr24" v-model="addGoodsForm.countInventory">计算库存</Checkbox>
                <Checkbox class="mr24" v-model="addGoodsForm.hasBatchNumber">有批号商品</Checkbox>
                <Checkbox
                  class="mr24"
                  v-model="addGoodsForm.recommend"
                >推荐销售（勾选后，将置顶单品并加推荐符号，提醒员工优先销售）</Checkbox>
              </Col>
            </Form>
          </Row>
          <div style="border-bottom:1px solid #ccc;margin-top:24px"></div>

          <Tabs v-model="goodsTabPane" class="mytabs ivu-mt" name="pane" :animated="false">
            <TabPane label="价格设置" name="pane1" tab="pane">
              <Row :gutter="16">
                <Form
                  ref="form1"
                  :model="addGoodsForm"
                  :rules="addGoodsFormRules"
                  :label-width="100"
                  class="myform"
                >
                  <Col span="12">
                    <FormItem label="销售单价" prop="price">
                      <Input v-model="addGoodsForm.price" placeholder="¥0.00" />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="最低销售" prop="lowestPrice">
                      <Input v-model="addGoodsForm.lowestPrice" placeholder="¥0.00" />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="商品进价" prop="purchasePrice">
                      <Input v-model="addGoodsForm.purchasePrice" placeholder="¥0.00" />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="批发价格" prop="wholesalePrice">
                      <Input v-model="addGoodsForm.wholesalePrice" placeholder="¥0.00" />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem class="lb0" prop="vipPrice">
                      <Checkbox
                        v-model="addGoodsForm.enableVipPrice"
                        style="width:100px;margin:0;padding-right:12px;text-align:right"
                      >会员价</Checkbox>
                      <Input
                        v-model="addGoodsForm.vipPrice"
                        placeholder="¥0.00"
                        style="width:calc(100% - 100px)"
                      />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem class="lb0">
                      <span style="color:#ccc">会员卡用户结算时,以会员价结算,不参与折扣</span>
                    </FormItem>
                  </Col>
                  <Col span="24" offset="1">
                    <Button type="warning" @click="setHosPriceModal=true">按照医院设置售价</Button>
                  </Col>
                </Form>
              </Row>
            </TabPane>
            <TabPane label="用法设置" name="pane2" tab="pane">
              <Row :gutter="16">
                <Form
                  ref="addUsageForm"
                  :model="addUsageForm"
                  :rules="addUsageFormRules"
                  :label-width="80"
                  class="use-setting"
                >
                  <Col span="2">
                    <FormItem class="lb0">用法设置</FormItem>
                  </Col>
                  <Col span="7">
                    <FormItem class="lb0">
                      <Select v-model="addUsageForm.id" placeholder="请选择">
                        <Option
                          v-for="item in usageList"
                          :value="item.id"
                          :key="`usage-${item.id}`"
                        >{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="15">
                    <FormItem class="lb0">
                      <Button type="primary" @click="handleEditUsageModal">编辑处方用法</Button>
                    </FormItem>
                  </Col>
                  <Col span="2">
                    <FormItem class="lb0">用量设置</FormItem>
                  </Col>
                  <span v-for="(item,index) in petSpeciesList" :key="`petSpecies-${item.id}`">
                    <Col span="7" :offset="index!=0?'2':''">
                      <FormItem :label="item.name+'---每千克消耗'" class="lb140">
                        <Input v-model="addUsageForm.amounts[index]" />
                      </FormItem>
                    </Col>
                    <Col span="5">
                      <FormItem label="用量下限">
                        <Input v-model="addUsageForm.upperLimits[index]" />
                      </FormItem>
                    </Col>
                    <Col span="5">
                      <FormItem label="用量上限">
                        <Input v-model="addUsageForm.lowerLimits[index]" />
                      </FormItem>
                    </Col>
                    <Col span="5" class="ivu-text-center">
                      <Button type="warning" class="mr10">复制</Button>
                      <Button type="success">粘贴</Button>
                    </Col>
                  </span>
                  <Col
                    span="22"
                    offset="2"
                    class="ivu-mb"
                    style="color:#ccc"
                  >用量设置后,系统会在病例中自动按照宠物品种和体重计算处方用量</Col>
                  <Col span="24">
                    <FormItem class="lb0">
                      <Checkbox
                        v-model="addGoodsForm.enableAlias"
                      >病例中根据用量反酸数量(注: 仅适用简单的单位换算,如单位为瓶,规格100ml/瓶,当输入用量120ml时,数量自动计算为2瓶;非此类情况不支持)</Checkbox>
                    </FormItem>
                  </Col>
                </Form>
              </Row>
            </TabPane>
            <TabPane label="商品来源" name="pane3" tab="pane">
              <Row class="ivu-mb">
                <div style="height:32px;line-height:32px;width:120px;float:left">该商品的供货商</div>
                <div
                  style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 240px)"
                ></div>
                <div style="width:120px;float:left" class="ivu-text-right">
                  <Button type="success" @click="handleAddSupplierModal">+添加供货商</Button>
                </div>
              </Row>
              <Table border :columns="columns8" :data="data8">
                <template slot-scope="{ row, index }" slot="price">
                  <Input type="text" />
                </template>
              </Table>
            </TabPane>
            <TabPane label="积分兑换" name="pane4" tab="pane">
              <Form
                ref="form4"
                :model="addGoodsForm"
                :rules="addGoodsFormRules"
                :label-width="120"
                class="myform"
              >
                <FormItem class="lb0" style="text-indent:0.3em">
                  <Checkbox v-model="addGoodsForm.integralExchange">允许积分兑换</Checkbox>
                </FormItem>
                <FormItem label="兑换所需积分值" prop="integralRequired">
                  <Input v-model="addGoodsForm.integralRequired" v-width="200" />
                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="商品说明" name="pane5" tab="pane">
              <Form ref="form5" :model="addGoodsForm" :rules="addGoodsFormRules" class="myform">
                <FormItem class="lb0" prop="description">
                  <Input type="textarea" v-model="addGoodsForm.description" :rows="6" />
                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="有效期管理" name="pane6" tab="pane">
              <Row class="ivu-mb">
                <div style="height:32px;line-height:32px;width:100px;float:left">该商品有效期</div>
                <div
                  style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 480px)"
                ></div>
                <div style="width:380px;float:left" class="ivu-text-right">
                  <Form ref="form6" :model="addGoodsForm" :rules="addGoodsFormRules" class="myform">
                    <FormItem class="lb0" prop="remindDays">
                      设置提醒：提前
                      <Input v-model="addGoodsForm.remindDays" v-width="100" />天提醒
                      <Button type="success">+添加有效期</Button>
                    </FormItem>
                  </Form>
                </div>
              </Row>
              <Table border :columns="columns10" :data="data10"></Table>
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane label="添加套餐" name="packages" tab="add">
          <Row :gutter="16">
            <Form ref="form" :model="addGoodsForm" :rules="rules" :label-width="100" class="myform">
              <Col span="12">
                <FormItem label="套餐名称" prop="name">
                  <Input v-model="addGoodsForm.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐编号">
                  <Input v-model="addGoodsForm.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐条码">
                  <Input v-model="addGoodsForm.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐规格">
                  <Input v-model="addGoodsForm.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐单位">
                  <Input v-model="addGoodsForm.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐说明">
                  <Input v-model="addGoodsForm.name" />
                </FormItem>
              </Col>
            </Form>
          </Row>
          <Row class="ivu-mb">
            <div style="height:32px;line-height:32px;width:80px;float:left">套餐商品</div>
            <div
              style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 200px)"
            ></div>
            <div style="width:120px;float:left" class="ivu-text-right">
              <Button type="success" @click="handleAddPackageModal">添加套餐</Button>
            </div>
          </Row>
          <Table border :columns="columns5" :data="data5"></Table>
          <Row style="margin-top:15px">
            <Col span="24" class="ivu-text-right">
              <span style="font-size:16px">合计：</span>0.00
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="success" v-if="addType=='goods'" @click="saveGoods(false)">保存</Button>
        <Button type="success" v-if="addType=='packages'" @click="addPackages">保存</Button>
        <Button
          type="info"
          v-if="addType=='goods'&&goodsTabPane!='pane6'"
          @click="saveGoods(true)"
        >保存并继续</Button>
      </div>
    </Modal>

    <!-- 按照医院设置售价 -->
    <Modal v-model="setHosPriceModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">按照医院设置售价</Col>
      </p>
      <Table border :columns="columnsHosList" :data="dataHosList"></Table>

      <div slot="footer"></div>
    </Modal>
    <!-- 编辑处方用法 -->
    <Modal v-model="editUsageModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">编辑处方用法</Col>
      </p>

      <Row class="ivu-mb">
        <div style="height:32px;line-height:32px;width:80px;float:left">处方用法</div>
        <div style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 200px)"></div>
        <div style="width:120px;float:left" class="ivu-text-right">
          <Button type="success" @click="handleAddUsageModal">+新增用法</Button>
        </div>
      </Row>
      <Table border :columns="usageColumns" :data="usageList"></Table>

      <div slot="footer"></div>
    </Modal>
    <!-- 添加套餐 -->
    <Modal v-model="addPackageModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">添加套餐</Col>
      </p>

      <Row :gutter="16">
        <Col span="6">
          <Row class-name="module-title-wrapper">
            <Col>
              <span class="module-title">商品分类列表</span>
            </Col>
          </Row>
          <Row>
            <Col style="padding:8px 16px;border:1px solid #ccc">
              <Tree :data="packageData"></Tree>
            </Col>
          </Row>
        </Col>
        <Col span="18">
          <Row class-name="module-title-wrapper">
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
          <Row class="ivu-mt">
            <Table border :columns="columns3" :data="data3"></Table>
          </Row>
        </Col>
      </Row>

      <Row class-name="module-title-wrapper ivu-mt">
        <Col span="8">
          <span class="module-title">已选商品列表</span>
        </Col>
        <Col span="16" class="ivu-text-right">
          <Button type="error">删除</Button>
        </Col>
      </Row>
      <Row>
        <Table border :columns="columns6" :data="data6"></Table>
      </Row>

      <div slot="footer">
        <Button type="success">保存</Button>
      </div>
    </Modal>
    <!-- 添加供货商 -->
    <Modal v-model="addSupplierModal" class="mymodal">
      <p slot="header">
        <Col span="24">选择往来单位</Col>
      </p>
      <Table border :columns="columns9" :data="data9"></Table>
      <div slot="footer">
        <Button type="success">确定</Button>
      </div>
    </Modal>

    <!-- 添加处方用法 -->
    <Modal v-model="addUsageModal" class="mymodal" width="40%" :title="addUsageForm.id&&'编辑'||'添加'">
      <Form
        ref="addUsageForm"
        :model="addUsageForm"
        :rules="addUsageFormRules"
        :label-width="100"
        class="myform"
      >
        <FormItem label="处方用法" prop="name">
          <Input v-model="addUsageForm.name" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="success" @click="addUsage">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: 'addItem',
        components: {},
        props: {
            type: String,
            categoryId: String
        },
        data () {
            const validateLimit = (rule, value, callback) => {
                if (value == null || value === '' || value === 0 || value === '0') {
                    callback();
                } else {
                    var r = /^[1-9]\d*$/;
                    if (value !== '0' && !r.test(value)) {
                        callback(new Error('请输入整数'));
                    }
                    callback();
                }
            };
            const validateNumber = (rule, value, callback) => {
                if (value == null || value === '') {
                    callback();
                } else {
                    var r = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
                    if (!r.test(value)) {
                        callback(new Error('请输入数字，最多保留两位小数'));
                    }
                    callback();
                }
            };
            return {
                setHosPriceModal: false,
                columns9: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '往来单位',
                        minWidth: 84,
                        key: 'name'
                    }
                ],
                data9: [
                    {
                        name: '上海公司'
                    },
                    {
                        name: '苏州公司'
                    }
                ],
                packageData: [
                    {
                        title: '挂号',
                        expand: true,
                        children: [
                            {
                                title: '挂号服务',
                                expand: false
                            },
                            {
                                title: '住院费用',
                                expand: false
                            }
                        ]
                    },
                    {
                        title: '处方',
                        expand: true,
                        children: [
                            {
                                title: '口服类',
                                expand: false
                            }
                        ]
                    }
                ],
                editUsageModal: false,
                rules: {
                    name: [{ required: true, message: '请输名称', trigger: 'blur' }]
                },
                columns8: [
                    {
                        title: '供货商名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '供货商价格',
                        minWidth: 84,
                        key: 'price',
                        slot: 'price'
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
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        }
                    }
                ],
                data8: [
                    {
                        name: 'xxx'
                    },
                    {
                        name: 'sss'
                    }
                ],
                usageColumns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用法',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '操作',
                        minWidth: 84,
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Poptip',
                                    {
                                        props: {
                                            confirm: true,
                                            title: '该操作不可恢复，确认要删除吗?',
                                            transfer: true
                                        },
                                        style: {
                                            marginRight: '8px'
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.deleteUsage(params.row.id);
                                            }
                                        }
                                    },
                                    [
                                        h(
                                            'Button',
                                            {
                                                props: {
                                                    type: 'error',
                                                    size: 'small'
                                                }
                                            },
                                            '删除'
                                        )
                                    ]
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.addUsageModal = true;
                                                this.addUsageForm.id = params.row.id;
                                                this.addUsageForm.name = params.row.name;
                                            }
                                        }
                                    },
                                    '编辑'
                                )
                            ]);
                        }
                    }
                ],
                columnsHosList: [
                    {
                        title: '医院',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '售价',
                        minWidth: 84,
                        key: 'price',
                        render: (h, params) => {
                            var flagInput = '';
                            var flagspan = '';
                            if (params.row.isShowInout) {
                                flagInput = '';
                                flagspan = 'none';
                            } else {
                                flagInput = 'none';
                                flagspan = '';
                            }
                            return h('div', [
                                h('Input', {
                                    props: {
                                        // 将单元格的值给Input
                                        value: params.row.price
                                    },
                                    style: {
                                        display: flagInput
                                    },
                                    on: {
                                        'on-change' (event) {
                                            // 值改变时
                                            // 将渲染后的值重新赋值给单元格值
                                            params.row.price = event.target.value;
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            display: flagspan
                                        }
                                    },
                                    params.row.price
                                )
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        minWidth: 84,
                        render: (h, params) => {
                            var flagEdit = '';
                            var flagSave = '';
                            if (params.row.isShowInout) {
                                flagSave = '';
                                flagEdit = 'none';
                            } else {
                                flagSave = 'none';
                                flagEdit = '';
                            }
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        style: {
                                            display: flagEdit
                                        },
                                        on: {
                                            click: () => {
                                                this.dataHosList[params.index].isShowInout = true;
                                            }
                                        }
                                    },
                                    '编辑'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        style: {
                                            display: flagSave
                                        },
                                        on: {
                                            click: () => {
                                                this.dataHosList[params.index].isShowInout = true;
                                            }
                                        }
                                    },
                                    '保存'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        class: 'marLef10',
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '默认'
                                )
                            ]);
                        }
                    }
                ],
                dataHosList: [
                    {
                        name: '医院1',
                        price: '10.00',
                        isShowInout: false
                    },
                    {
                        name: '医院1',
                        price: '10.00',
                        isShowInout: false
                    },
                    {
                        name: '医院1',
                        price: '',
                        isShowInout: true
                    }
                ],
                columns10: [
                    {
                        title: '单号',
                        minWidth: 84,
                        key: 'order'
                    },
                    {
                        title: '有效期',
                        minWidth: 84,
                        key: 'time'
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
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        }
                    }
                ],
                data10: [
                    {
                        time: '2020年3月22日'
                    },
                    {
                        time: '2020年3月23日'
                    }
                ],
                addSupplierModal: false,
                addPackageModal: false,
                columns3: [
                    {
                        title: '编号'
                    },
                    {
                        title: '名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        minWidth: 84,
                        key: 'unitPrice'
                    },
                    {
                        title: '条形码'
                    }
                ],
                data3: [
                    {
                        name: '腹部',
                        unitPrice: '0.00'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00'
                    }
                ],
                data6: [
                    {
                        name: '腹部',
                        unitPrice: '0.00'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00'
                    }
                ],
                columns6: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '商品名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '商品编号',
                        minWidth: 84,
                        key: 'code'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        minWidth: 84,
                        key: 'unitPrice'
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
                columns5: [
                    {
                        title: '商品名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '商品编号',
                        minWidth: 84,
                        key: 'code'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        minWidth: 84,
                        key: 'unitPrice'
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
                data5: [
                    {
                        name: '222',
                        unitPrice: '0.00',
                        num: '1'
                    },
                    {
                        name: '3333',
                        unitPrice: '0.00',
                        num: '1'
                    }
                ],

                addGoodsForm: {
                    id: '',
                    type: '',
                    categoryId: '',
                    name: '',
                    enableAlias: true,
                    alias: '',
                    namePy: '',
                    barCode: '',
                    number: '',
                    unit: '',
                    factory: '',
                    specification: '',
                    lowestLimit: '0',
                    takeDiscount: '',
                    partakeDiscount: '',
                    countInventory: '',
                    hasBatchNumber: '',
                    recommend: '',
                    price: '',
                    lowestPrice: '',
                    purchasePrice: '',
                    wholesalePrice: '',
                    enableVipPrice: true,
                    vipPrice: '',
                    integralExchange: '',
                    integralRequired: '',
                    description: '',
                    remindDays: '',
                    usageId: ''
                },
                addGoodsFormRules: {
                    name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                    lowestLimit: [{ validator: validateLimit, trigger: 'blur' }],
                    price: [{ validator: validateNumber, trigger: 'blur' }],
                    lowestPrice: [{ validator: validateNumber, trigger: 'blur' }],
                    purchasePrice: [{ validator: validateNumber, trigger: 'blur' }],
                    wholesalePrice: [{ validator: validateNumber, trigger: 'blur' }],
                    vipPrice: [{ validator: validateNumber, trigger: 'blur' }],
                    integralRequired: [{ validator: validateLimit, trigger: 'blur' }],
                    description: [
                        { required: true, message: '请输入商品说明', trigger: 'blur' }
                    ],
                    remindDays: [{ validator: validateLimit, trigger: 'blur' }]
                },
                addType: 'goods', // 添加时选中的的类型
                goodsTabPane: 'pane1', // 添加时选中的goods的明细tab
                addGoodsModal: false,
                usageList: [], // 处方用法列表,
                addUsageModal: false,
                addUsageForm: {
                    id: '',
                    name: '',
                    orderNum: '',
                    sourRegurgitation: true,
                    speciesKeys: [], // 宠物分类key
                    speciesNames: [], // 宠物分类name
                    amounts: [], // 每kg消耗
                    upperLimits: [], // 用量下限
                    lowerLimits: [] // 用量上限
                },
                addUsageFormRules: {
                    name: [{ required: true, message: '请输名称', trigger: 'blur' }]
                    // number: [{ validator: validateNumber, trigger: 'blur' }]
                    // upperLimits: [{ validator: validateNumber, trigger: 'blur' }],
                    // lowerLimits: [{ validator: validateNumber, trigger: 'blur' }]
                },
                petSpeciesList: [] // 宠物分类列表
            };
        },
        mounted () {
            let vm = this;
            vm.$nextTick(() => {});
            console.log(this.type);
            console.log(this.categoryId);
        },
        created () {
            this.getUsageList();
            this.getPetSpeciesList();
        },
        computed: {},
        methods: {
            handleEditUsageModal () {
                this.editUsageModal = true;
            },
            handleAddSupplierModal () {
                this.addSupplierModal = true;
            },
            handleAddPackageModal () {
                this.addPackageModal = true;
            },
            handleAddGoodsModal () {
                // 父组件需要调用
                this.$refs.addGoodsForm.resetFields();
                this.addGoodsForm.id = '';
                this.addGoodsModal = true;
            },
            handleEditPackageModal (id) {
                this.getGoodsDetail(id);
                this.addGoodsModal = true;
            },
            closeAddGoodsModal () {
                this.addGoodsModal = false;
                // 需要调用父组件方法
                this.$parent.getGoodsList();
            },
            // 保存商品
            saveGoods (next) {
                this.addGoodsForm.type = this.type;
                this.addGoodsForm.categoryId = this.categoryId;
                console.log(this.addGoodsForm);
                var flag = true;
                this.$refs.addGoodsForm.validate(valid => {
                    if (valid) {
                        flag = true;
                        if (this.goodsTabPane === 'pane1') {
                            this.$refs.form1.validate(valid1 => {
                                if (valid1) {
                                    flag = true;
                                } else {
                                    flag = false;
                                }
                            });
                        } else if (this.goodsTabPane === 'pane4') {
                            this.$refs.form4.validate(valid4 => {
                                if (valid4) {
                                    flag = true;
                                } else {
                                    flag = false;
                                }
                            });
                        } else if (this.goodsTabPane === 'pane5') {
                            this.$refs.form5.validate(valid5 => {
                                if (valid5) {
                                    flag = true;
                                } else {
                                    flag = false;
                                }
                            });
                        } else if (this.goodsTabPane === 'pane6') {
                            this.$refs.form6.validate(valid6 => {
                                if (valid6) {
                                    flag = true;
                                } else {
                                    flag = false;
                                }
                            });
                        }
                    } else {
                        flag = false;
                    }
                });
                if (flag) {
                    this.$post('/admin/goods/save', this.addGoodsForm, response => {
                        if (response.success) {
                            this.addGoodsForm.id = response.data.id;
                            this.$Message.info('保存成功');
                        } else {
                            this.$Message.error(response.message);
                        }
                    });
                    if (this.goodsTabPane === 'pane2') {
                        console.log(this.addUsageForm)
                        this.$post('/admin/general/prescription/usage/save', this.addUsageForm, response => {
                            if (response.success) {
                                this.getUsageList()
                            } else {
                                this.$Message.error(response.message);
                            }
                        });
                    }
                    if (next) {
                        var curpane = this.goodsTabPane;
                        this.goodsTabPane =
                            'pane' +
                            (parseInt(curpane.substring(curpane.length - 1, curpane.length)) +
                            1);
                    }
                }
            },
            // 保存套餐
            addPackages () {
                this.addGoodsForm.type = this.type;
                this.addGoodsForm.categoryId = this.categoryId;
                console.log(this.addGoodsForm);
                this.$refs.addGoodsForm.validate(valid => {
                    if (valid) {
                        // this.$post(
                        //     '/admin/goods/save',
                        //     this.addGoodsCategoryForm,
                        //     response => {
                        //         if (response.success) {
                        //             this.$Message.info('保存成功');
                        //             this.getGoodsCategoryList()
                        //             this.addGoodsCategoryModal = false
                        //             this.changeGoodsCategoryModal = false
                        //         } else {
                        //             this.$Message.error(response.message);
                        //         }
                        //     }
                        // );
                    }
                });
            },
            getGoodsDetail (id) {
                this.$get('/admin/goods/detail/' + id, {}, response => {
                    this.addGoodsForm = this._.mapValues(
                        this._.pick(response.data, this._.keysIn(this.addGoodsForm)),
                        o => {
                            if (typeof o === 'object') {
                                return o.code;
                            } else {
                                return o;
                            }
                        }
                    );
                    this.addUsageForm.id = this.addGoodsForm.usageId || ''
                    console.log(this.addGoodsForm);
                });
            },
            // 获取处方用法列表
            getUsageList () {
                this.$get('/admin/general/prescription/usage/page', {}, response => {
                    this.usageList = response.data.data;
                });
            },
            // 获取宠物分类列表
            getPetSpeciesList () {
                this.$get('/admin/pet/species/page', {}, response => {
                    this.petSpeciesList = response.data.data;
                });
            },
            // 删除处方用法
            deleteUsage (id) {
                this.$get(
                    '/admin/general/prescription/usage/remove/' + id,
                    {},
                    response => {
                        this.$Message.info('删除成功');
                        this.getUsageList();
                    }
                );
            },
            handleAddUsageModal () {
                this.addUsageModal = true;
                this.addUsageForm.id = '';
                this.addUsageForm.name = '';
            },
            // 新增处方用法
            addUsage () {
                this.$refs.addUsageForm.validate(valid => {
                    if (valid) {
                        this.$post(
                            '/admin/general/prescription/usage/save',
                            this.addUsageForm,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getUsageList();
                                    this.addUsageModal = false;
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    }
                });
            }
        },
        watch: {
            'addUsageForm.id': function (newVal) {
                this.addGoodsForm.usageId = newVal
                if (newVal != null && newVal !== '') {
                    this.usageList.forEach(element => {
                        if (element.id === newVal) {
                            this.addUsageForm.name = element.name
                            this.petSpeciesList.forEach((item, index) => {
                                this.addUsageForm.speciesKeys[index] = item.key
                                this.addUsageForm.speciesNames[index] = item.name
                                this.addUsageForm.amounts[index] = null
                                this.addUsageForm.upperLimits[index] = null
                                this.addUsageForm.lowerLimits[index] = null
                                // 当前选中的usage
                                if (element.items && element.items.length > 0) {
                                    element.items.forEach(jtem => {
                                        if (item.key === jtem.petSpecies.key) {
                                            this.addUsageForm.amounts[index] = jtem.amount
                                            this.addUsageForm.upperLimits[index] = jtem.upperLimit
                                            this.addUsageForm.lowerLimits[index] = jtem.lowerLimit
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
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
</style>
<style lang="less">
.marLef10 {
  margin-left: 10px;
}
.mymodal .ivu-modal-header {
  background: #f6f6f6;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
/*模块标题*/
.module-title-wrapper {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e9eaec;
  font-weight: 700;
  background-color: #f6f6f6;
  padding: 0 16px;
  margin: 0;
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
</style>
