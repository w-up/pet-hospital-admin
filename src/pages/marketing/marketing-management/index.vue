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
            <Input prefix="ios-search" v-model="search.nameLike" @on-change="getMarketingList" placeholder="活动名称搜索" clearable />
          </Row>
          <Row class="mt6">
            <Select placeholder="活动类型" v-model="search.type" @on-change="getMarketingList" clearable>
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
              <Button type="error" @click="handleDeleted">删除</Button>
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
          <Row type="flex" class="mtb15">
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
              <Table border :columns="columns1" :data="data1"></Table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="data1.length" :current.sync="current" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="12" class="ivu-text-left">
              <Button type="warning" @click="handleOpenEditCombination">添加商品</Button>
            </Col>
            <Col span="12" class="ivu-text-right">
              <Button type="primary" @click="handleSave">保存</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="editCombination" title="商品组合设置" @on-ok="handleCreate" width="80%">
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
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
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
    </Modal>
  </div>
</template>
<script>
    import { formatDate } from '@/libs/util';
    export default {
        inject: ['reload'],
        data () {
            const validateLimit = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填项'));
                } else {
                    callback();
                }
            };
            const validateDiscount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填项'));
                } else {
                    callback();
                }
            };
            return {
                marketingList: [],
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'code'
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
                    }
                ],
                data1: [
                    {
                        code: '0000',
                        barCode: '黑猫',
                        name: 'HM',
                        size: '',
                        unti: ''
                    },
                    {
                        code: '0009',
                        barCode: '白猫',
                        name: 'BM',
                        size: '',
                        unti: ''
                    }
                ],
                current: 1,
                editCombination: false,
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
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'code'
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
                consumptionOrderColumns: [
                    {
                        type: 'selection',
                        minWidth: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        minWidth: 84,
                        key: 'code'
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
                        title: '数量',
                        minWidth: 84,
                        key: 'num'
                    },
                    {
                        title: '用量',
                        minWidth: 84,
                        key: 'useNum'
                    },
                    {
                        title: '备注',
                        minWidth: 84,
                        key: 'remark'
                    }
                ],
                consumptionOrderData: [
                    {
                        code: 'P00001',
                        barCode: '000001',
                        name: '宠物补血膏',
                        size: '20ml',
                        unti: 'ml',
                        price: '5',
                        num: '5',
                        useNum: '1.0',
                        remark: ''
                    },
                    {
                        code: 'P00001',
                        barCode: '000001',
                        name: '宠物补血膏',
                        size: '20ml',
                        unti: 'ml',
                        price: '5',
                        num: '5',
                        useNum: '1.0',
                        remark: ''
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
                    limit: '',
                    discount: '',
                    startDate: '',
                    endDate: ''
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
                }
            };
        },
        methods: {
            handleOpenEditCombination () {
                this.editCombination = true;
            },
            handleCreate () {},
            handleAdd () {
                this.$refs.marketingForm.resetFields();
            },
            getDateRange (e) {
                if (e != null && e.length > 1) {
                    this.search.startDate = e[0]
                    this.search.endDate = e[1]
                    this.getMarketingList()
                }
            },
            getChild (data) {
                var obj = JSON.parse(JSON.stringify(data[0]));
                obj.type = obj.type && obj.type.code;
                obj.status = obj.status && obj.status.code;
                this.marketingForm = obj;
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
                console.log(this.search);
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
                var data = {
                    id: this.marketingForm.id,
                    status: 'termination'
                }
                this.$post('/admin/general/marketing/save', data, response => {
                    this.$Message.info('终止成功');
                    this.reload(); // 调用局部刷新方法
                })
            },
            handleDeleted () {
                if (this.marketingForm.id == null || this.marketingForm.id === '') {
                    this.$Message.error('请选择要删除的数据');
                    return false;
                }
                this.$get('/admin/general/marketing/remove/' + this.marketingForm.id, {}, response => {
                    this.$Message.info('删除成功');
                    this.reload(); // 调用局部刷新方法
                })
            }
        },
        mounted () {
            this.getMarketingList();
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
</style>
