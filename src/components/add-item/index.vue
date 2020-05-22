<template>
  <div>
    <Modal v-model="addGoodsModal" :title="showTab==null?'添加项目':'编辑项目'" width="60%" @on-cancel="closeAddGoodsModal">
      <Tabs v-model="addType" name="add" class="mytabs" :animated="false">
        <TabPane :label="showTab==null?'添加商品':'编辑商品'" name="goods" tab="add" v-if="showTab==null||showTab">
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
                <FormItem class="lb0" prop="alias">
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
                <FormItem label="拼音搜索" prop="namePy">
                  <Input v-model="addGoodsForm.namePy" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品条码" prop="barCode">
                  <Input v-model="addGoodsForm.barCode" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品编号" prop="number">
                  <Input v-model="addGoodsForm.number" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品单位" prop="unit">
                  <Input v-model="addGoodsForm.unit" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="生产厂家" prop="factory">
                  <Input v-model="addGoodsForm.factory" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品规格" prop="specification">
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
                    <Button type="warning" @click="handleSetHosPriceModal">按照医院设置售价</Button>
                  </Col>
                </Form>
              </Row>
            </TabPane>
            <TabPane label="用法设置" name="pane2" tab="pane">
              <Row :gutter="16">
                <Form
                  ref="addGoodsDosageForm"
                  :model="addGoodsDosageForm"
                  :rules="addGoodsDosageFormRules"
                  :label-width="80"
                  class="use-setting"
                >
                  <Col span="2">
                    <FormItem class="lb0">用法设置</FormItem>
                  </Col>
                  <Col span="7">
                    <FormItem class="lb0">
                      <Select v-model="addGoodsForm.usageId" placeholder="请选择">
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
                  <Col
                    span="22"
                    class="ivu-title"
                    v-if="addGoodsDosageForm.goodsDosageList==null||addGoodsDosageForm.goodsDosageList.length==0"
                  >请先添加宠物类型</Col>
                  <span
                    v-else
                    v-for="(item,index) in addGoodsDosageForm.goodsDosageList"
                    :key="`goodsDosage-${index}`"
                  >
                    <Col span="7" :offset="index!=0?'2':''">
                      <FormItem
                        :label="item.speciesName+'---每千克消耗'"
                        class="lb140"
                        :prop="'goodsDosageList.'+index+'.consume'"
                        :rules="addGoodsDosageFormRules.consume"
                      >
                        <Input v-model="item.consume" />
                      </FormItem>
                    </Col>
                    <Col span="5">
                      <FormItem
                        label="用量下限"
                        :prop="'goodsDosageList.'+index+'.upperLimit'"
                        :rules="addGoodsDosageFormRules.upperLimit"
                      >
                        <Input v-model="item.upperLimit" />
                      </FormItem>
                    </Col>
                    <Col span="5">
                      <FormItem
                        label="用量上限"
                        :prop="'goodsDosageList.'+index+'.lowerLimit'"
                        :rules="addGoodsDosageFormRules.lowerLimit"
                      >
                        <Input v-model="item.lowerLimit" />
                      </FormItem>
                    </Col>
                    <Col span="5" class="ivu-text-center">
                      <Button type="warning" class="mr10" @click="copyGoodsDosage(index)">复制</Button>
                      <Button type="success" @click="pasteGoodsDosage(index)">粘贴</Button>
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
                        v-model="addGoodsForm.sourRegurgitation"
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
                  <Button type="success" @click="handleAddContactUnitModal">+添加供货商</Button>
                </div>
              </Row>
              <Table border :columns="goodsSupplierColumns" :data="goodsSupplierList">
                <template slot-scope="{ row, index }" slot="price">
                  <Form
                    :ref="'addGoodsSupplierForm'+index"
                    :model="row"
                    :rules="addGoodsSupplierFormRules"
                  >
                    <FormItem prop="price" class="mt5">
                      <!-- <Input v-model="row.price" /> -->
                      <Input v-model="goodsSupplierList[index].price" />
                    </FormItem>
                  </Form>
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
                      <Button type="success" @click="handleAddGoodsExpiryDateModal">+添加有效期</Button>
                    </FormItem>
                  </Form>
                </div>
              </Row>
              <Table border :columns="goodsExpiryDateColumns" :data="goodsExpiryDateList"></Table>
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane :label="showTab==null?'添加套餐':'编辑套餐'" name="packages" tab="add" v-if="showTab==null||!showTab">
          <Row :gutter="16">
            <Form
              ref="addPackagesForm"
              :model="addPackagesForm"
              :rules="addPackagesFormRules"
              :label-width="100"
              class="myform"
            >
              <Col span="12">
                <FormItem label="套餐名称" prop="name">
                  <Input v-model="addPackagesForm.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐编号" prop="number">
                  <Input v-model="addPackagesForm.number" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐条码" prop="barCode">
                  <Input v-model="addPackagesForm.barCode" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐规格" prop="specification">
                  <Input v-model="addPackagesForm.specification" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐单位" prop="unit">
                  <Input v-model="addPackagesForm.unit" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐说明" prop="description">
                  <Input v-model="addPackagesForm.description" />
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
          <Table ref="detailsTable" border :columns="detailsColumns" :data="detailsList">
            <template slot-scope="{ row, index }" slot="num">
              <Form :ref="'detailsForm'+index" :model="row" :rules="addDetailsFormRules">
                <FormItem prop="num" class="mt5">
                  <Input v-model="detailsList[index].num" @on-change="countTotalPrice" />
                </FormItem>
              </Form>
            </template>
          </Table>
          <Row style="margin-top:15px">
            <Col span="24" class="ivu-text-right">
              <span style="font-size:16px">合计：</span>
              {{totalPrice}}
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="success" v-if="addType=='goods'" @click="saveGoods(false)">保存</Button>
        <Button type="success" v-if="addType=='packages'" @click="savePackages">保存</Button>
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
      <Table border :columns="goodsHospitalColumns" :data="goodsHospitalList">
        <template slot-scope="{ row, index }" slot="price">
          <Form
            :ref="'addGoodsHospitalForm'+index"
            :model="row"
            :rules="addGoodsHospitalFormRules"
            v-if="editIndex === index"
          >
            <FormItem prop="price" class="mt5">
              <Input v-model="goodsHospitalList[index].price" />
            </FormItem>
          </Form>
          <span v-else>{{ row.price }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSaveGoodsHospital(index)" type="info" size="small">保存</Button>
            <Button type="primary" size="small" @click="setDefaultPrice(index)">默认</Button>
          </div>
          <div v-else>
            <Button @click="editIndex = index" type="info" size="small">编辑</Button>
            <Button type="primary" size="small" @click="setDefaultPrice(index)">默认</Button>
          </div>
        </template>
      </Table>

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
              <span class="module-title">商品列表</span>
            </Col>
            <Col span="4" class="ivu-text-right">
              <Button type="warning" class="mr10">快速添加</Button>
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
            <Table border :columns="allGoodsColumns" :data="allGoodsList" @on-row-dblclick="handleAllGoodsRowClick"></Table>
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
          <span class="module-title">已选商品列表</span>
        </Col>
        <Col span="16" class="ivu-text-right">
          <Button type="error" @click="removeSelect">删除</Button>
        </Col>
      </Row>
      <Row>
        <Table ref="addDetailsTable" border :columns="addDetailsColumns" :data="detailsList">
          <template slot-scope="{ row, index }" slot="num">
            <Form :ref="'addDetailsForm'+index" :model="row" :rules="addDetailsFormRules">
              <FormItem prop="num" class="mt5">
                <Input v-model="detailsList[index].num" @on-change="countTotalPrice" />
              </FormItem>
            </Form>
          </template>
        </Table>
      </Row>

      <div slot="footer">
        <Button type="success" @click="closePackageModal">保存</Button>
      </div>
    </Modal>

    <!-- 添加供货商 -->
    <Modal v-model="contactUnitModal" class="mymodal">
      <p slot="header">
        <Col span="24">选择往来单位</Col>
      </p>
      <Table ref="contactUnitTable" border :columns="contactUnitColumns" :data="contactUnitList"></Table>
      <div slot="footer">
        <Button type="success" @click="handleAddContactUnit">确定</Button>
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

    <!-- 添加商品有效期 -->
    <Modal v-model="addGoodsExpiryDateModal" class="mymodal" width="40%" title="添加有效期">
      <Form
        ref="addGoodsExpiryDateForm"
        :model="addGoodsExpiryDateForm"
        :rules="addGoodsExpiryDateRules"
        :label-width="100"
        class="myform"
      >
        <FormItem label="单号" prop="orderNumber">
          <Input v-model="addGoodsExpiryDateForm.orderNumber" />
        </FormItem>
        <FormItem label="过期时间" prop="date">
          <DatePicker
            type="date"
            v-model="addGoodsExpiryDateForm.date"
            format="yyyy-MM-dd"
            @on-change="addGoodsExpiryDateForm.date=$event"
            placeholder="过期时间"
            style="width: 100%"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="success" @click="addGoodsExpiryDate">确定</Button>
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
                        callback(new Error('最多两位小数的数字'));
                    }
                    callback();
                }
            };
            return {
                setHosPriceModal: false,
                contactUnitColumns: [
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
                allGoodsCategoryTreeData: [],
                editUsageModal: false,
                rules: {
                    name: [{ required: true, message: '请输名称', trigger: 'blur' }]
                },
                goodsSupplierColumns: [
                    {
                        title: '供货商名称',
                        minWidth: 84,
                        key: 'supplierName'
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
                                            click: () => {
                                                if (params.row.id != null && params.row.id !== '') {
                                                    this.removeGoodsSupplier(params.row.id);
                                                } else {
                                                    this.goodsSupplierList.splice(params.index, 1);
                                                }
                                            }
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        }
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
                goodsHospitalColumns: [
                    {
                        title: '医院',
                        minWidth: 84,
                        key: 'hospitalName'
                    },
                    {
                        title: '售价',
                        minWidth: 84,
                        key: 'price',
                        slot: 'price'
                    },
                    {
                        title: '操作',
                        minWidth: 84,
                        slot: 'action'
                    }
                ],
                goodsExpiryDateColumns: [
                    {
                        title: '单号',
                        minWidth: 84,
                        key: 'orderNumber'
                    },
                    {
                        title: '有效期',
                        minWidth: 84,
                        key: 'date'
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
                                                this.removeGoodsExpiryDate(params.row.id);
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
                                )
                            ]);
                        }
                    }
                ],
                contactUnitModal: false,
                addPackageModal: false,
                allGoodsColumns: [
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'number'
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
                        title: '条形码',
                        minWidth: 84,
                        key: 'barCode'
                    }
                ],
                detailsColumns: [
                    {
                        title: '商品名称',
                        minWidth: 84,
                        key: 'goodsName'
                    },
                    {
                        title: '商品编号',
                        minWidth: 84,
                        key: 'goodsNumber'
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
                        title: '组合数量',
                        minWidth: 84,
                        key: 'num',
                        slot: 'num'
                    }
                ],
                addDetailsColumns: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '商品名称',
                        minWidth: 84,
                        key: 'goodsName'
                    },
                    {
                        title: '商品编号',
                        minWidth: 84,
                        key: 'goodsNumber'
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
                        title: '组合数量',
                        minWidth: 84,
                        key: 'num',
                        slot: 'num'
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
                    usageId: '',
                    sourRegurgitation: '',
                    combinationType: 'goods'
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
                    orderNum: ''
                },
                addUsageFormRules: {
                    name: [{ required: true, message: '请输名称', trigger: 'blur' }]
                },
                petSpeciesList: [], // 宠物分类列表
                goodsSupplierList: [],
                contactUnitList: [],
                goodsExpiryDateList: [],
                addGoodsExpiryDateModal: false,
                addGoodsExpiryDateForm: {
                    orderNumber: '',
                    date: '',
                    remindDays: ''
                },
                addGoodsExpiryDateRules: {
                    orderNumber: [
                        { required: true, message: '请输入单号', trigger: 'blur' }
                    ],
                    date: [
                        {
                            required: true,
                            message: '请选择到期时间',
                            trigger: 'blur'
                        }
                    ]
                },
                addGoodsDosageForm: {
                    goodsDosageList: [] // 商品用法列表
                },
                addGoodsDosageFormRules: {
                    consume: [{ validator: validateNumber, trigger: 'blur' }],
                    upperLimit: [{ validator: validateLimit, trigger: 'blur' }],
                    lowerLimit: [{ validator: validateLimit, trigger: 'blur' }]
                },
                addGoodsSupplierFormRules: {
                    price: [{ validator: validateNumber, trigger: 'blur' }]
                },
                addPackagesForm: {
                    id: '',
                    type: '',
                    combinationType: 'packages',
                    name: '',
                    number: '',
                    barCode: '',
                    specification: '',
                    unit: '',
                    description: ''
                },
                addPackagesFormRules: {
                    name: [{ required: true, message: '请输入套餐名称', trigger: 'blur' }]
                },
                detailsList: [], // 商品组合列表
                addDetailsFormRules: {
                    num: [{ validator: validateLimit, trigger: 'blur' }]
                },
                allGoodsList: [], // 所有商品列表
                search: {
                    keywords: '',
                    type: '',
                    categoryId: '',
                    pageSize: 5,
                    pageNumber: 0
                },
                total: 0,
                current: 1,
                totalPrice: 0.0,
                hospitalList: [],
                goodsHospitalList: [],
                editIndex: -1,
                addGoodsHospitalFormRules: {
                    price: [{ validator: validateNumber, trigger: 'blur' }]
                },
                showTab: null// 显示的tab
            };
        },
        mounted () {
            let vm = this;
            vm.$nextTick(() => {});
        },
        created () {
            this.getUsageList(); // 处方用法
            this.getPetSpeciesList(); // 宠物种类
            this.getHospitalList(); // 医院列表
        },
        computed: {},
        methods: {
            handleEditUsageModal () {
                this.editUsageModal = true;
            },
            handleAddContactUnitModal () {
                this.contactUnitModal = true;
                this.getContactUnitList();
            },
            handleAddPackageModal () {
                this.getAllGoodsCategoryList();
                this.getAllGoodsList();
                this.addPackageModal = true;
            },
            handleAddGoodsExpiryDateModal () {
                this.$refs.addGoodsExpiryDateForm.resetFields();
                this.addGoodsExpiryDateForm.id = '';
                this.addGoodsExpiryDateModal = true;
            },
            handleAddGoodsModal () {
                // 父组件需要调用
                // this.$refs.addGoodsForm.resetFields();
                this.addGoodsForm.id = '';
                this.showTab = null
                this.addType = 'goods'
                this.addGoodsModal = true;
            },
            handleEditPackageModal (id) {
                this.getGoodsDetail(id);
                this.addGoodsModal = true;
            },
            closeAddGoodsModal () {
                this.addGoodsModal = false;
                this.addGoodsForm.id = '';

                if (this.addType === 'goods') {
                    this.$refs.addGoodsForm.resetFields();
                } else {
                    this.$refs.addPackagesForm.resetFields();
                }

                this.addPackagesForm.id = '';
                this.detailsList = [];
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
                        } else if (this.goodsTabPane === 'pane2') {
                            this.$refs.addGoodsDosageForm.validate(valid2 => {
                                if (valid2) {
                                    flag = true;
                                } else {
                                    flag = false;
                                }
                            });
                        } else if (this.goodsTabPane === 'pane3') {
                            this.goodsSupplierList.forEach((element, index) => {
                                var ref = 'addGoodsSupplierForm' + index;
                                this.$refs[ref].validate(valid3 => {
                                    if (!valid3) {
                                        flag = false;
                                    }
                                });
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
                        console.log(this.addGoodsDosageForm.goodsDosageList);
                        this.addGoodsDosageForm.goodsDosageList.forEach(element => {
                            this.$post('/admin/goods/dosage/save', element, response => {
                                this.getGoodsDosageList();
                            });
                        });
                    } else if (this.goodsTabPane === 'pane3') {
                        console.log(this.goodsSupplierList);
                        this.goodsSupplierList.forEach(element => {
                            this.$post('/admin/goods/supplier/save', element, response => {
                                this.getGoodsSupplierList();
                            });
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
            savePackages () {
                this.addPackagesForm.type = this.type;
                this.addPackagesForm.categoryId = this.categoryId;
                this.addPackagesForm.totalPrice = this.totalPrice
                var flag = true;
                this.$refs.addPackagesForm.validate(valid => {
                    if (valid) {
                        this.detailsList.forEach((element, index) => {
                            var ref = 'detailsForm' + index;
                            this.$refs[ref].validate(valid => {
                                if (!valid) {
                                    flag = false;
                                }
                            });
                        });
                    } else {
                        flag = false;
                    }
                });
                if (flag) {
                    this.addPackagesForm.detailForms = this.detailsList;
                    this.$post(
                        '/admin/goods/batchsave',
                        this.addPackagesForm,
                        response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                            } else {
                                this.$Message.error(response.message);
                            }
                        },
                        false
                    );
                }
            },
            getGoodsDetail (id) {
                this.$get('/admin/goods/detail/' + id, {}, response => {
                    if (response.data.combinationType && response.data.combinationType.code === 'goods') {
                        this.addGoodsForm = this._.mapValues(response.data, function (o) {
                            if (typeof o === 'object') {
                                return o.code;
                            } else {
                                return o;
                            }
                        });
                        this.showTab = true
                        this.addType = 'goods'
                    } else {
                        this.addPackagesForm = this._.mapValues(response.data, function (o) {
                            if (typeof o === 'object') {
                                return o.code;
                            } else {
                                return o;
                            }
                        });
                        this.showTab = false
                        this.addType = 'packages'
                        this.totalPrice = response.data.totalPrice
                        this.getGoodsDetailList()
                    }
                });
            },
            // 获取套餐下商品列表
            getGoodsDetailList () {
                this.$get(
                    '/admin/goods/detail/search',
                    { limit: 100, goodId: this.addPackagesForm.id },
                    response => {
                        this.detailsList = response.data
                    }
                );
            },
            // 获取处方用法列表
            getUsageList () {
                this.$get(
                    '/admin/general/prescription/usage/search',
                    { limit: 100 },
                    response => {
                        this.usageList = response.data;
                    }
                );
            },
            // 获取宠物分类列表
            getPetSpeciesList () {
                this.$get('/admin/pet/species/search', { limit: 100 }, response => {
                    this.petSpeciesList = response.data;
                });
            },
            // 获取商品用法列表
            getGoodsDosageList () {
                this.$get(
                    '/admin/goods/dosage/search',
                    { limit: 100, goodsId: this.addGoodsForm.id },
                    response => {
                        this.addGoodsDosageForm.goodsDosageList = response.data;

                        let arr = this.addGoodsDosageForm.goodsDosageList.map(
                            item => item.speciesId
                        );
                        this.petSpeciesList.forEach(element => {
                            if (arr.indexOf(element.id) === -1) {
                                this.addGoodsDosageForm.goodsDosageList.push({
                                    id: '',
                                    goodsId: this.addGoodsForm.id,
                                    speciesId: element.id,
                                    speciesName: element.name,
                                    consume: '',
                                    upperLimit: '',
                                    lowerLimit: ''
                                });
                            }
                        });
                    }
                );
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
            },
            // 获取商品来源列表
            getGoodsSupplierList () {
                this.$get(
                    '/admin/goods/supplier/search',
                    { limit: 100, goodsId: this.addGoodsForm.id },
                    response => {
                        this.goodsSupplierList = response.data;
                    }
                );
            },
            // 获取往来单位列表
            getContactUnitList () {
                this.$get(
                    '/admin/general/contact/unit/search',
                    { limit: 100 },
                    response => {
                        this.contactUnitList = response.data;
                        let arr = this.goodsSupplierList.map(item => item.supplierId);
                        this.contactUnitList.forEach(element => {
                            if (arr.indexOf(element.id) > -1) {
                                element._checked = true; // 商品来源存在默认选中
                            }
                        });
                    }
                );
            },
            // 获取商品有效期
            getGoodsExpiryDateList () {
                this.$get(
                    '/admin/goods/expiry/date/search',
                    { limit: 100, goodsId: this.addGoodsForm.id },
                    response => {
                        this.goodsExpiryDateList = response.data;
                    }
                );
            },
            handleAddContactUnit () {
                let arr = this.goodsSupplierList.map(item => item.supplierId);
                var selectIds = this.$refs.contactUnitTable.getSelection();
                selectIds.forEach(element => {
                    if (arr.indexOf(element.id) === -1) {
                        var obj = {
                            id: '',
                            goodsId: this.addGoodsForm.id,
                            supplierId: element.id,
                            supplierName: element.name,
                            price: ''
                        };
                        this.goodsSupplierList.push(obj);
                    }
                });
                this.contactUnitModal = false;
            },
            // 删除商品来源
            removeGoodsSupplier (id) {
                this.$get('/admin/goods/supplier/remove/' + id, {}, response => {
                    this.$Message.info('删除成功');
                    this.getGoodsSupplierList();
                });
            },
            // 删除商品有效期
            removeGoodsExpiryDate (id) {
                this.$get('/admin/goods/expiry/date/remove/' + id, {}, response => {
                    this.$Message.info('删除成功');
                    this.getGoodsExpiryDateList();
                });
            },
            // 新增过期日期
            addGoodsExpiryDate () {
                this.addGoodsExpiryDateForm.remindDays = this.addGoodsForm.remindDays;
                this.addGoodsExpiryDateForm.goodsId = this.addGoodsForm.id;
                this.$refs.addGoodsExpiryDateForm.validate(valid => {
                    if (valid) {
                        this.$post(
                            '/admin/goods/expiry/date/save',
                            this.addGoodsExpiryDateForm,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getGoodsExpiryDateList();
                                    this.addGoodsExpiryDateModal = false;
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    }
                });
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
            getAllGoodsCategoryTreeChild (data, selectedNode) {
                this.$set(selectedNode, 'expand', !selectedNode.expand)// 点击节点文字展开收起
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
            handleAllGoodsRowClick (element) {
                let arr = this.detailsList.map(item => item.goodsId);
                if (arr.indexOf(element.id) === -1) {
                    this.detailsList.push({
                        id: '',
                        goodsId: element.id,
                        goodsName: element.name,
                        goodsNumber: element.number,
                        goodsSpecification: element.specification,
                        goodsUnit: element.unit,
                        goodsPrice: element.price,
                        num: ''
                    });
                }
            },
            removeSelect () {
                var selectIds = this.$refs.addDetailsTable.getSelection();
                selectIds.forEach(element => {
                    let arr = this.detailsList.map(item => item.goodsId);
                    this.detailsList.splice(arr.indexOf(element.goodsId), 1);
                    var id = this.detailsList[arr.indexOf(element.goodsId)].id
                    if (id != null && id !== '') {
                        this.removeGoodsDetail(id)
                    }
                });
                this.countTotalPrice()
            },
            removeGoodsDetail (id) {
                this.$get('/admin/goods/detail/remove/' + id, {}, response => {
                });
            },
            closePackageModal () {
                var flag = true;
                this.detailsList.forEach((element, index) => {
                    var ref = 'addDetailsForm' + index;
                    this.$refs[ref].validate(valid => {
                        if (!valid) {
                            flag = false;
                        }
                    });
                });
                if (flag) {
                    this.addPackageModal = false;
                }
                console.log(this.detailsList);
            },
            countTotalPrice () {
                var totalPrice = 0;
                this.detailsList.forEach(element => {
                    var price = element.goodsPrice || 0;
                    var num = element.num || 0;
                    totalPrice += price * num;
                });
                this.totalPrice = totalPrice;
            },
            copyGoodsDosage (index) {
                localStorage.goodsDosage = JSON.stringify(
                    this.addGoodsDosageForm.goodsDosageList[index]
                );
            },
            pasteGoodsDosage (index) {
                var goodsDosage = JSON.parse(localStorage.goodsDosage);
                if (goodsDosage != null) {
                    this.addGoodsDosageForm.goodsDosageList[index].consume =
                        goodsDosage.consume;
                    this.addGoodsDosageForm.goodsDosageList[index].upperLimit =
                        goodsDosage.upperLimit;
                    this.addGoodsDosageForm.goodsDosageList[index].lowerLimit =
                        goodsDosage.lowerLimit;
                }
            },
            getHospitalList () {
                this.$get('/admin/hospital/search', { limit: 100 }, response => {
                    this.hospitalList = response.data;
                });
            },
            getGoodsHospitalList () {
                this.$get(
                    '/admin/goods/hospital/search',
                    { goodsId: this.addGoodsForm.id, limit: 100 },
                    response => {
                        this.goodsHospitalList = response.data;
                        let arr = this.goodsHospitalList.map(item => item.hospitalId);
                        this.hospitalList.forEach(element => {
                            if (arr.indexOf(element.id) === -1) {
                                this.goodsHospitalList.push({
                                    id: '',
                                    goodsId: this.addGoodsForm.id,
                                    hospitalId: element.id,
                                    hospitalName: element.name,
                                    price: ''
                                });
                            }
                        });
                    }
                );
            },
            handleSetHosPriceModal () {
                if (this.addGoodsForm.id == null || this.addGoodsForm.id === '') {
                    this.$Message.error('请先保存商品信息');
                } else {
                    this.getGoodsHospitalList();
                    this.setHosPriceModal = true;
                }
            },
            handleSaveGoodsHospital (index) {
                this.$refs['addGoodsHospitalForm' + index].validate(valid => {
                    if (valid) {
                        this.$post(
                            '/admin/goods/hospital/save',
                            this.goodsHospitalList[index],
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getGoodsHospitalList();
                                    this.editIndex = -1
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    }
                });
            },
            setDefaultPrice (index) {
                this.goodsHospitalList[index].price = this.addGoodsForm.price;
                this.editIndex = -1
                this.$post(
                    '/admin/goods/hospital/save',
                    this.goodsHospitalList[index],
                    response => {
                        if (response.success) {
                            this.$Message.info('保存成功');
                            this.getGoodsHospitalList();
                        } else {
                            this.$Message.error(response.message);
                        }
                    }
                );
            }
        },
        watch: {
            'addGoodsForm.id': function (newVal, oldVal) {
                if (oldVal !== newVal && newVal != null && newVal !== '') {
                    // 编辑/添加完赋值时
                    this.getGoodsSupplierList(); // 商品来源
                    this.getGoodsExpiryDateList(); // 有效期
                    this.getGoodsDosageList(); // 商品用法
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
.ivu-title {
  height: 32px;
  line-height: 32px;
}
</style>
