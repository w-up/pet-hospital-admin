<template>
  <div>
    <Tabs value="name1" name="add" class="mytabs" :animated="false">
      <TabPane label="添加商品" name="name1" tab="add">
        <Row :gutter="16">
          <Form ref="form" :model="record" :rules="rules" :label-width="100" class="myform">
            <Col span="12">
              <FormItem label="商品名称" prop="name">
                <Input v-model="record.name" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem class="lb0">
                <Checkbox
                  v-model="record.check"
                  style="width:100px;margin:0;padding-right:12px;text-align:right"
                >设置别名</Checkbox>
                <Input
                  v-model="record.name"
                  placeholder="显示、打印都显示别名"
                  style="width:calc(100% - 100px)"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="拼音搜索">
                <Input />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="商品条码">
                <Input />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="商品编号">
                <Input />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="商品单位">
                <Input />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="生产厂家">
                <Input />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="商品规格">
                <Input />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="库存下限">
                <Input value="0" v-width="200" />
                <span style="color:#ccc;padding-left:12px">库存量低于下限，系统自动提醒</span>
              </FormItem>
            </Col>
            <Col span="24" style="padding-left:40px">
              <Checkbox style="margin-right:32px">参与打折</Checkbox>
              <Checkbox style="margin-right:32px">计算库存</Checkbox>
              <Checkbox style="margin-right:32px">有批号商品</Checkbox>
              <Checkbox style="margin-right:32px">推荐销售（勾选后，将置顶单品并加推荐符号，提醒员工优先销售）</Checkbox>
            </Col>
          </Form>
        </Row>
        <div style="border-bottom:1px solid #ccc;margin-top:24px"></div>

        <Tabs value="pane1" class="mytabs ivu-mt" name="pane" :animated="false">
          <TabPane label="价格设置" name="pane1" tab="pane">
            <Row :gutter="16">
              <Form ref="form" :model="record" :rules="rules" :label-width="100" class="myform">
                <Col span="12">
                  <FormItem label="销售单价">
                    <Input v-model="record.name" placeholder="¥0.00" />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="最低销售">
                    <Input v-model="record.name" placeholder="¥0.00" />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="商品进价">
                    <Input v-model="record.name" placeholder="¥0.00" />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="批发价格">
                    <Input v-model="record.name" placeholder="¥0.00" />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem class="lb0">
                    <Checkbox
                      v-model="record.check"
                      style="width:100px;margin:0;padding-right:12px;text-align:right"
                    >会员价</Checkbox>
                    <Input
                      v-model="record.name"
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
              <Form ref="form" :model="record" :rules="rules" :label-width="80" class="use-setting">
                <Col span="2">
                  <FormItem class="lb0">用法设置</FormItem>
                </Col>
                <Col span="7">
                  <FormItem class="lb0">
                    <Select value="0" placeholder="请选择">
                      <Option value="0">直肠灌注</Option>
                      <Option value="1">注射</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="15">
                  <FormItem class="lb0">
                    <Button type="primary" @click="handleEditPrescriptionUsageModal">编辑处方用法</Button>
                  </FormItem>
                </Col>
                <Col span="2">
                  <FormItem class="lb0">用量设置</FormItem>
                </Col>
                <Col span="7">
                  <FormItem label="犬类---每千克消耗" class="lb140">
                    <Input v-model="record.name" />
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="用量下限">
                    <Input v-model="record.name" />
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="用量上限">
                    <Input v-model="record.name" />
                  </FormItem>
                </Col>
                <Col span="5" class="ivu-text-center">
                  <Button type="warning" class="mr10">复制</Button>
                  <Button type="success">粘贴</Button>
                </Col>
                <Col span="7" offset="2">
                  <FormItem label="猫类---每千克消耗" class="lb140">
                    <Input v-model="record.name" />
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="用量下限">
                    <Input v-model="record.name" />
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="用量上限">
                    <Input v-model="record.name" />
                  </FormItem>
                </Col>
                <Col span="5" class="ivu-text-center">
                  <Button type="warning" class="mr10">复制</Button>
                  <Button type="success">粘贴</Button>
                </Col>
                <Col span="7" offset="2">
                  <FormItem label="其他---每千克消耗" class="lb140">
                    <Input v-model="record.name" />
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="用量下限">
                    <Input v-model="record.name" />
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="用量上限">
                    <Input v-model="record.name" />
                  </FormItem>
                </Col>
                <Col span="5" class="ivu-text-center">
                  <Button type="warning" class="mr10">复制</Button>
                  <Button type="success">粘贴</Button>
                </Col>
                <Col
                  span="22"
                  offset="2"
                  class="ivu-mb"
                  style="color:#ccc"
                >用量设置后,系统会在病例中自动按照宠物品种和体重计算处方用量</Col>
                <Col span="24">
                  <FormItem class="lb0">
                    <Checkbox
                      v-model="record.check"
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
            <Form ref="form" :model="record" :rules="rules" :label-width="120" class="myform">
              <FormItem class="lb0" style="text-indent:0.3em">
                <Checkbox v-model="record.check">允许积分兑换</Checkbox>
              </FormItem>
              <FormItem label="兑换所需积分值">
                <Input v-model="record.name" v-width="200" />
              </FormItem>
            </Form>
          </TabPane>
          <TabPane label="商品说明" name="pane5" tab="pane">
            <Input type="textarea" :rows="6" />
          </TabPane>
          <TabPane label="有效期管理" name="pane6" tab="pane">
            <Row class="ivu-mb">
              <div style="height:32px;line-height:32px;width:100px;float:left">该商品有效期</div>
              <div
                style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 480px)"
              ></div>
              <div style="width:380px;float:left" class="ivu-text-right">
                <span class="mr10">
                  设置提醒：提前
                  <Input v-width="100" />天提醒
                </span>
                <Button type="success">+添加有效期</Button>
              </div>
            </Row>
            <Table border :columns="columns10" :data="data10"></Table>
          </TabPane>
        </Tabs>
      </TabPane>
      <TabPane label="添加套餐" name="name2" tab="add">
        <Row :gutter="16">
          <Form ref="form" :model="record" :rules="rules" :label-width="100" class="myform">
            <Col span="12">
              <FormItem label="套餐名称" prop="name">
                <Input v-model="record.name" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="套餐编号">
                <Input v-model="record.name" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="套餐条码">
                <Input v-model="record.name" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="套餐规格">
                <Input v-model="record.name" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="套餐单位">
                <Input v-model="record.name" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="套餐说明">
                <Input v-model="record.name" />
              </FormItem>
            </Col>
          </Form>
        </Row>
        <Row class="ivu-mb">
          <div style="height:32px;line-height:32px;width:80px;float:left">套餐商品</div>
          <div style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 200px)"></div>
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
    <!-- 按照医院设置售价 -->
    <Modal v-model="setHosPriceModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">按照医院设置售价</Col>
      </p>
      <Table border :columns="columnsHosList" :data="dataHosList"></Table>

      <div slot="footer"></div>
    </Modal>
    <!-- 编辑处方用法 -->
    <Modal v-model="editPrescriptionUsageModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">编辑处方用法</Col>
      </p>

      <Row class="ivu-mb">
        <div style="height:32px;line-height:32px;width:80px;float:left">处方用法</div>
        <div style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 200px)"></div>
        <div style="width:120px;float:left" class="ivu-text-right">
          <Button type="success">+新增用法</Button>
        </div>
      </Row>
      <Table border :columns="colummnsUse" :data="dataUse"></Table>

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
  </div>
</template>

<script>
    export default {
        name: 'addItem',
        components: {},
        data () {
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
                record: {
                    creatTime: '2020-03-19',
                    name: '',
                    check: true
                },
                editPrescriptionUsageModal: false,
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
                colummnsUse: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用法',
                        minWidth: 84,
                        key: 'med'
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
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        class: 'marLef10',
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '编辑'
                                )
                            ]);
                        }
                    }
                ],
                dataUse: [
                    {
                        med: '直肠灌注'
                    },
                    {
                        med: '腹腔注射'
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
                ]
            };
        },
        mounted () {
            let vm = this;
            vm.$nextTick(() => {});
        },
        created () {},
        computed: {},
        methods: {
            handleEditPrescriptionUsageModal () {
                this.editPrescriptionUsageModal = true;
            },
            handleAddSupplierModal () {
                this.addSupplierModal = true;
            },
            handleAddPackageModal () {
                this.addPackageModal = true;
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
.animal-list {
  height: 265px;
  overflow: auto;
}
.animal-list .ivu-list-item {
  padding: 0;
}
.animal-list .ivu-list-item p {
  padding: 12px 0;
  width: 100%;
}
.animal-list .active {
  background: #ddd;
}

.record-list {
  height: 265px;
  overflow: auto;
  border: 1px solid #ccc;
}
.record-list .ivu-list-item {
  padding: 0;
}
.record-list .record {
  width: 100%;
  padding: 12px;
}
.record-list .active {
  background: #ddd;
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
