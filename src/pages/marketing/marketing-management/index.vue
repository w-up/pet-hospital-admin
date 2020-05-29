<template>
  <div>
    <Row :gutter="16">
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">营销活动列表</span>
            </Col>
          </Row>
          <Row class="ivu-mt">
            <Input
              prefix="ios-search"
              v-model="search.nameLike"
              @on-change="getMarketingList"
              placeholder="活动名称搜索"
              clearable
            />
          </Row>
          <Row class="mt6">
            <Select
              placeholder="活动类型"
              v-model="search.type"
              @on-change="getMarketingList"
              clearable
            >
              <Option value="fullReduction">满减</Option>
              <Option value="discount">打折</Option>
              <Option value="buyMore">多买优惠</Option>
            </Select>
          </Row>
          <Row class="mt6">
            <DatePicker
              type="daterange"
              v-model="daterange"
              placeholder="开始结束日期"
              style="width: 100%"
              @on-change="getDateRange"
            ></DatePicker>
          </Row>
          <Row class="mtb15">
            <Col span="24">
              <Tree :data="marketingList" @on-select-change="getChild"></Tree>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success" @click="handleAdd">+新增活动</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary" @click="handleTermination">终止活动</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="error" @click="handleRemove">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">活动详情</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" class="mtb15">
            <Col span="18">
              <Form
                ref="marketingForm"
                :model="marketingForm"
                :rules="rules"
                label-position="left"
                :label-width="90"
              >
                <Row :gutter="16">
                  <Col span="10">
                    <FormItem label="活动名称" prop="name">
                      <Input v-model="marketingForm.name" placeholder="必填"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row :gutter="16">
                  <Col span="7">
                    <FormItem label="促销类型" prop="type">
                      <RadioGroup v-model="marketingForm.type">
                        <Radio label="fullReduction" class="mb26">满减</Radio>
                        <br />
                        <Radio label="discount" class="mb26">打折</Radio>
                        <br />
                        <Radio label="buyMore" class="mb26">多买优惠</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  <Col span="16">
                    <Row :gutter="16">
                      <Col span="12" class="lb125">
                        <FormItem
                          label="活动商品购买满"
                          prop="limit"
                          v-if="marketingForm.type=='fullReduction'"
                          key="fullReduction1"
                        >
                          <Input v-model="marketingForm.limit" placeholder="必填"></Input>
                        </FormItem>
                        <FormItem label="活动商品购买满" v-else key="fullReduction2">
                          <Input></Input>
                        </FormItem>
                      </Col>
                      <Col span="11" class="lb80">
                        <FormItem
                          label="元，立减"
                          prop="discount"
                          v-if="marketingForm.type=='fullReduction'"
                          key="fullReduction3"
                        >
                          <Input v-model="marketingForm.discount" placeholder="必填"></Input>
                        </FormItem>
                        <FormItem label="元，立减" v-else key="fullReduction4">
                          <Input></Input>
                        </FormItem>
                      </Col>
                      <Col span="1">
                        <FormItem label="元"></FormItem>
                      </Col>
                    </Row>
                    <Row :gutter="16">
                      <Col span="12" class="lb125">
                        <FormItem
                          label="活动商品打"
                          prop="discount"
                          v-if="marketingForm.type=='discount'"
                          key="discount1"
                        >
                          <Input v-model="marketingForm.discount" placeholder="必填"></Input>
                        </FormItem>
                        <FormItem label="活动商品打" v-else key="discount2">
                          <Input></Input>
                        </FormItem>
                      </Col>
                      <Col span="1" class="lb80">
                        <FormItem label="折"></FormItem>
                      </Col>
                    </Row>
                    <Row :gutter="16">
                      <Col span="12" class="lb125">
                        <FormItem
                          label="活动商品购买"
                          prop="limit"
                          v-if="marketingForm.type=='buyMore'"
                          key="buyMore1"
                        >
                          <Input v-model="marketingForm.limit" placeholder="必填"></Input>
                        </FormItem>
                        <FormItem label="活动商品购买" v-else key="buyMore2">
                          <Input></Input>
                        </FormItem>
                      </Col>
                      <Col span="11" class="lb80">
                        <FormItem
                          label="件，打"
                          prop="discount"
                          v-if="marketingForm.type=='buyMore'"
                          key="buyMore3"
                        >
                          <Input v-model="marketingForm.discount" placeholder="必填"></Input>
                        </FormItem>
                        <FormItem label="件，打" v-else key="buyMore4">
                          <Input></Input>
                        </FormItem>
                      </Col>
                      <Col span="1">
                        <FormItem label="折"></FormItem>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row :gutter="16">
                  <Col span="10">
                    <FormItem label="活动时间" prop="startDate">
                      <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="marketingForm.startDate"
                        style="width:100%"
                        placeholder="选择开始时间"
                        @on-change="startDateChange"
                        :options="startDateOptions"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="10">
                    <FormItem class="lb0" prop="endDate">
                      <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="marketingForm.endDate"
                        style="width:calc(100% - 90px)"
                        placeholder="选择结束时间"
                        @on-change="endDateChange"
                        :options="endDateOptions"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span="6">
              <Card>
                <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
                  <Col span="12">
                    <span class="module-title">参与医院列表</span>
                  </Col>
                  <Col span="12" class="ivu-text-right">
                    <Button type="warning" size="small" @click="addHospitalModal=true">添加医院</Button>
                  </Col>
                </Row>
                <Row class="noplr">
                  <Col v-if="joinHospitals.length==0" span="24" class="ivu-mt ivu-text-center">暂无数据</Col>
                  <Col span="24">
                    <List class="check-list">
                      <ListItem
                        v-for="(item, index) in joinHospitals"
                        :key="index"
                        :class="item.id===selectHospitalId?'active':''"
                      >
                        <p @click="selectHospitalId=item.id" class="list">{{ item.name }}</p>
                      </ListItem>
                    </List>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>
        <Card class="ivu-mt">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">商品目录</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Table border :columns="goodsColumnsParent" :data="goodsList"></Table>
              <div class="ivu-mt ivu-text-right">
                <Page
                  :total="total"
                  :show-elevator="total/10>9"
                  :pageSize="30"
                  @on-change="getMarketingDetailGoodsList"
                  :current.sync="current"
                />
              </div>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="12" class="ivu-text-left">
              <Button type="warning" @click="handleAddGoodsModal">添加商品</Button>
            </Col>
            <Col span="12" class="ivu-text-right">
              <Button type="primary" @click="handleSave">保存</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>

    <!-- 添加商品 -->
    <addGoods ref="addGoods" :goodsList="goodsList" :goodsColumns="goodsColumns" title="添加商品"></addGoods>

    <Modal title="删除" v-model="removeModal" @on-ok="removeMarketing">
      <div>确认删除吗？</div>
    </Modal>
    <Modal title="终止活动" v-model="terminationModal" @on-ok="terminationMarketing">
      <div>确认终止吗？</div>
    </Modal>
    <Modal v-model="addHospitalModal" title="添加医院" width="50%">
      <Row :gutter="16">
        <Col span="8">
          <Row class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">已添加医院</span>
            </Col>
          </Row>
          <Row class="joinHospitals">
            <Col v-if="joinHospitals.length==0" span="24" class="ivu-mt ivu-text-center">暂无数据</Col>
            <Col span="24">
              <List class="check-list">
                <ListItem
                  v-for="(item, index) in joinHospitals"
                  :key="index"
                  :class="item.id===selectHospitalId?'active':''"
                >
                  <p @click="selectHospitalId=item.id" class="list">{{ item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
        </Col>
        <Col span="16">
          <Row class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">医院列表</span>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Table border :columns="hospitalListColumns" :data="hospitalList"></Table>
            </Col>
          </Row>
        </Col>
      </Row>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
    import addGoods from '@/components/add-goods';
    import { formatDate } from '@/libs/util';
    export default {
        inject: ['reload'],
        components: { addGoods },
        data () {
            const validateLimit = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填项'));
                } else {
                    var r = /^[1-9]\d*$/;
                    if (value !== '0' && !r.test(value)) {
                        callback(new Error('请输入整数'));
                    }
                    callback();
                }
            };
            const validateDiscount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填项'));
                } else {
                    var r = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
                    if (!r.test(value)) {
                        callback(new Error('请输入数字，最多保留两位小数'));
                    }
                    if (this.marketingForm.type !== 'fullReduction' && value > 10) {
                        callback(new Error('折扣不能大于10'));
                    }
                    callback();
                }
            };
            return {
                total: 0,
                current: 1,
                marketingList: [],
                goodsColumnsParent: [
                    {
                        title: '序号',
                        minWidth: 84,
                        type: 'index'
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
                    }
                ],
                goodsColumns: [
                    {
                        type: 'selection',
                        width: 60
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
                        title: '备注',
                        minWidth: 84,
                        key: 'description'
                    }
                ],
                daterange: [],
                search: {
                    nameLike: '',
                    type: '',
                    startDate: '',
                    endDate: ''
                },
                startDateOptions: {}, // 开始时间 参数，用来限制输入范围的
                endDateOptions: {}, // 结束时间 参数，用来限制输入范围的
                marketingForm: {
                    id: '',
                    hospitalId: '',
                    name: '',
                    type: 'fullReduction',
                    status: 'normal',
                    limit: '',
                    discount: '',
                    startDate: '',
                    endDate: '',
                    joinHospitalIds: []
                },
                rules: {
                    name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                    type: [
                        { required: true, message: '请选择促销类型', trigger: 'change' }
                    ],
                    limit: [{ validator: validateLimit, trigger: 'blur' }],
                    discount: [{ validator: validateDiscount, trigger: 'blur' }],
                    startDate: [
                        {
                            required: true,
                            message: '请选择开始时间',
                            trigger: 'blur'
                        }
                    ],
                    endDate: [
                        {
                            required: true,
                            message: '请选择结束时间',
                            trigger: 'blur'
                        }
                    ]
                },
                removeModal: false,
                terminationModal: false,
                selectHospitalId: '',
                hospitalList: [],
                joinHospitals: [],
                hospitalListColumns: [
                    {
                        title: '医院',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '操作',
                        minWidth: 84,
                        render: (h, params) => {
                            let flag = false;
                            let arr = this.joinHospitals.map(item => item.id);
                            if (arr.indexOf(params.row.id) > -1) {
                                flag = true;
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
                                            display: flag ? 'none' : ''
                                        },
                                        on: {
                                            click: () => {
                                                this.joinHospitals.push(params.row);
                                            }
                                        }
                                    },
                                    '添加'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            display: flag ? '' : 'none'
                                        },
                                        on: {
                                            click: () => {
                                                this.joinHospitals.splice(arr.indexOf(params.row.id), 1);
                                            }
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        }
                    }
                ],
                addHospitalModal: false,
                goodsList: []
            };
        },
        methods: {
            handleAdd () {
                this.$refs.marketingForm.resetFields();
                this.marketingForm.id = '';
                this.goodsList = [];
                this.joinHospitals = [];
            },
            getDateRange (e) {
                if (e != null && e.length > 1) {
                    this.search.startDate = e[0];
                    this.search.endDate = e[1];
                    this.getMarketingList();
                }
            },
            getChild (data, selectedNode) {
                this.$set(selectedNode, 'expand', !selectedNode.expand); // 点击节点文字展开收起
                if (data && data.length > 0) {
                    var obj = JSON.parse(JSON.stringify(data[0]));
                    obj.type = obj.type && obj.type.code;
                    obj.status = obj.status && obj.status.code;
                    this.marketingForm = obj;
                    this.joinHospitals = obj.joinHospitals || [];
                    if (this.marketingForm.id) {
                        this.getMarketingDetailGoodsList();
                    } else {
                        this.goodsList = [];
                        this.total = 0;
                    }
                } else {
                    this.marketingForm.id = '';
                }
            },
            getMarketingDetailGoodsList () {
                if (this.current === 1) {
                    this.$get(
                        '/admin/general/marketing/detail/' + this.marketingForm.id,
                        {},
                        response => {
                            this.goodsList = response.data.goodsPage.data;
                            this.total = response.data.goodsPage.totalElements;
                        }
                    );
                } else {
                    var data = {
                        id: this.marketingForm.id,
                        pageNo: this.current - 1,
                        pageSize: 30
                    };
                    this.$get('/admin/general/marketing/detail/goods', data, response => {
                        this.goodsList = response.data.data;
                        this.total = response.data.totalElements;
                    });
                }
            },
            startDateChange (e) {
                this.endDateOptions = {
                    disabledDate: date => {
                        let time = e ? new Date(e).valueOf() : '';
                        return date && date.valueOf() < time - 86400000;
                    }
                };
                this.$set(this.marketingForm, 'startDate', e);
            },
            endDateChange (e) {
                this.startDateOptions = {
                    disabledDate: date => {
                        let time = e ? new Date(e).valueOf() : '';
                        return date && date.valueOf() > time;
                    }
                };
                this.$set(this.marketingForm, 'endDate', e);
            },
            getMarketingList () {
                this.$get('/admin/general/marketing/page', this.search, response => {
                    var rtn = response.data.data;
                    // 处理左侧树数据
                    var obj = {};
                    obj.title = '全部';
                    obj.expand = true;
                    var childrenList = [];

                    var noStartList = [];
                    var processingList = [];
                    var finishedList = []; // 已结束包括时间结束和已终止的
                    for (var i = 0; i < rtn.length; i++) {
                        rtn[i].title = rtn[i].name;
                        if (rtn[i].status.code === 'termination') {
                            finishedList.push(rtn[i]);
                        } else {
                            var startTime = new Date(rtn[i].startDate).getTime();
                            var endTime = new Date(rtn[i].endDate).getTime();
                            var curTime = new Date().getTime();
                            if (endTime <= curTime) {
                                noStartList.push(rtn[i]);
                            } else if (startTime <= curTime && endTime >= curTime) {
                                processingList.push(rtn[i]);
                            } else if (startTime > curTime) {
                                finishedList.push(rtn[i]);
                            }
                        }
                    }
                    childrenList.push({
                        title: '未开始',
                        expand: true,
                        children: noStartList
                    });
                    childrenList.push({
                        title: '进行中',
                        expand: true,
                        children: processingList
                    });
                    childrenList.push({
                        title: '已结束',
                        expand: true,
                        children: finishedList
                    });
                    obj.children = childrenList;

                    this.marketingList = [obj];
                });
            },
            handleSave () {
                if (
                    this.marketingForm.startDate != null &&
                    typeof this.marketingForm.startDate !== 'string'
                ) {
                    this.marketingForm.startDate = formatDate(
                        this.marketingForm.startDate,
                        'yyyy-MM-dd'
                    );
                }
                if (
                    this.marketingForm.endDate != null &&
                    typeof this.marketingForm.endDate !== 'string'
                ) {
                    this.marketingForm.endDate = formatDate(
                        this.marketingForm.endDate,
                        'yyyy-MM-dd'
                    );
                }

                this.marketingForm.joinHospitalIds = [];
                this.joinHospitals.forEach(element => {
                    this.marketingForm.joinHospitalIds.push(element.id);
                });
                this.marketingForm.goodsIds = [];
                this.goodsList.forEach(element => {
                    this.marketingForm.goodsIds.push(element.id);
                });
                this.$refs.marketingForm.validate(valid => {
                    if (valid) {
                        this.$post(
                            '/admin/general/marketing/save',
                            this.marketingForm,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.reload(); // 调用局部刷新方法
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    }
                });
            },
            handleTermination () {
                if (this.marketingForm.id == null || this.marketingForm.id === '') {
                    this.$Message.error('请选择要终止的活动');
                    return false;
                }
                this.terminationModal = true;
            },
            terminationMarketing () {
                var data = {
                    id: this.marketingForm.id,
                    status: 'termination'
                };
                this.$post('/admin/general/marketing/save', data, response => {
                    this.$Message.info('终止成功');
                    this.reload(); // 调用局部刷新方法
                });
            },
            handleRemove () {
                if (this.marketingForm.id == null || this.marketingForm.id === '') {
                    this.$Message.error('请选择要删除的数据');
                    return false;
                }
                this.removeModal = true;
            },
            removeMarketing () {
                this.$get(
                    '/admin/general/marketing/remove/' + this.marketingForm.id,
                    {},
                    response => {
                        this.$Message.info('删除成功');
                        this.reload(); // 调用局部刷新方法
                    }
                );
            },
            getHospitalList () {
                this.$get('/admin/hospital/page', {}, response => {
                    this.hospitalList = response.data.data;
                });
            },
            handleAddGoodsModal () {
                this.$refs.addGoods.handleAddGoodsModal();
            },
            getGoodsList (list) {
                this.goodsList = list;
            },
            handelReload () {}
        },
        mounted () {
            this.getMarketingList();
            this.getHospitalList();
        }
    };
</script>
<style lang="less" scoped>
.box {
  padding-left: 15px;
}

.mtb15 {
  margin: 16px 0;
}

.mb26 {
  margin-top: 1px;
  margin-bottom: 25px;
}
</style>
<style lang="less">
.lb125 .ivu-form-item-label {
  width: 125px !important;
}
.lb125 .ivu-form-item-content {
  margin-left: 125px !important;
}
.lb80 .ivu-form-item-label {
  width: 80px !important;
}
.lb80 .ivu-form-item-content {
  margin-left: 80px !important;
}
.lb0 .ivu-form-item-content {
  margin: 1px 0;
  margin-left: 0 !important;
}
.joinHospitals {
  border: 1px solid #dcdee2;
  min-height: 232px;
  overflow: auto;
}
</style>
