<template>
  <div>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">检查检验类别</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Input prefix="ios-search" v-model="nameLike" @on-change="getCheckList" clearable />
            </Col>
          </Row>
          <Row class="mt6 noplr">
            <Col
              v-if="this.list.length==0&&loadingList==false"
              span="24"
              class="ivu-text-center"
            >暂无数据</Col>
            <Col span="24">
              <List class="check-list">
                <ListItem
                  v-for="(item, index) in list"
                  :key="index"
                  :class="item.id===currentCheckTypeData.id?'active':''"
                >
                  <p @click="switchList(item)" class="list">{{ item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success" @click="handleOpenCreateType">+添加分类</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="info" @click="handleEditType">编辑分类</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="error" @click="handleRemoveType">删除分类</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">单项</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" calss="check-set-table">
              <Table
                border
                :columns="checkItemColumns"
                :data="checkItemData"
                :loading="loadingTable"
                @on-selection-change="handleSelect"
              ></Table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="total" :current.sync="current" :show-elevator="showElevator" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="primary" @click="handleCreateCheckItem">+单项</Button>
              <Button type="warning" @click="handleEditCheckItem">修改</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal
      ref="checkTypeModal"
      v-model="showCheckTypeModal"
      :loading="true"
      :title="isAddType?'添加分类':'编辑分类'"
      @on-ok="addCheckType"
    >
      <Form ref="checkTypeForm" :label-width="180" :model="checkTypeData" :rules="checkTypeRules">
        <FormItem label="分类名称" prop="name">
          <Input style="width: 150px" v-model="checkTypeData.name" />
        </FormItem>
        <RadioGroup v-model="checkTypeData.hasReference" v-if="isAddType">
          <FormItem label="结果类型" style="margin-bottom: 0px;">
            <Radio label="true">有参考值范围结果类型</Radio>
          </FormItem>
          <FormItem label>
            <Radio label="false">其他结果类型(如阴阳或其他)</Radio>
          </FormItem>
        </RadioGroup>
      </Form>
    </Modal>

    <!-- 有参考值范围的添加Modal-start -->
    <Modal
    ref="rangeTypeModal"
      v-model="showRangeTypeModal"
      :title="isAddCheckItem?'新增检验项':'编辑检验项'"
      @on-ok="createRangeType"
      width="962px"
      class="modalCla"
      :loading="true"
    >
      <Row>
        <Form ref="rangeTypeForm"  :label-width="80" :model="batchsaveDetail" :rules="rangeTypeRules">
          <Col span="24">
            <Col span="8">
              <FormItem label="指标名称" prop="indexName">
                <Input placeholder="必填" v-model="batchsaveDetail.indexName"/>
              </FormItem>
            </Col>
            <Col span="8" offset="2">
              <FormItem label="标准名称">
                <Input v-model="batchsaveDetail.standardName"/>
              </FormItem>
            </Col>
          </Col>
          <Col span="24">
            <Col span="8">
              <FormItem label="指标单位">
                <Input v-model="batchsaveDetail.indexUnit"/>
              </FormItem>
            </Col>
            <Col span="8" offset="2">
              <FormItem label="描述">
                <Input v-model="batchsaveDetail.explain"/>
              </FormItem>
            </Col>
          </Col>
          <Col span="24" class="mt12 mtop12 fimb9">
            <Row :gutter="16">
              <Col span="8" v-for="(item1, index1) in ageGroupList" :key="'age-'+index1">
                <div class="bcandpadding">
                  <p>{{ageGroupChList[index1]}}</p>
                  <Row class="mt12">
                    <Col span="10" class="ivu-text-right">最小值</Col>
                    <Col span="10" class="ivu-text-right">最大值</Col>
                  </Row>
                  <Row class="mt12" v-for="(item2, index2) in speciesKeyList" :key="'species-'+index2">
                    <Col span="4">{{speciesNameList[index2]}}</Col>
                    <Col span="9" v-for="(item3, index3) in limitList" :key="'limit-'+index3" :offset="index3===1?1:0">
                      <FormItem :label-width="0" :prop="item1+'_'+item2+'_'+item3" :rules="[{ message: '请输入数字', trigger: 'change', pattern: /^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/ }]">
                        <Input v-model="batchsaveDetail[item1+'-'+item2+'-'+item3]"/>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row class="mt12">
                    <Col span="9" class="ivu-text-center" offset="4">
                      <Button type="warning" size="small" @click="copyMin(item1)">复制本栏</Button>
                    </Col>
                    <Col span="9" class="ivu-text-center" offset="1">
                      <Button type="info" size="small" @click="setMax(item1)">粘贴本栏</Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
        </Form>
      </Row>
    </Modal>
     <!-- 有参考值的添加Modal-end -->

    <Modal
      v-model="showOtherTypeModal"
      :title="isAddCheckItem?'新增检验项':'编辑检验项'"
      @on-ok="createOtherType"
      width="700px"
      class="modalCla"
      :loading="true"
      ref="otherTypeModal"
    >
      <Row>
        <Form
          ref="otherTypeForm"
          :label-width="80"
          class="labelLefForm"
          :rules="otherTypeRules"
          :model="otherTypeFormData"
        >
          <Col span="11">
            <FormItem label="指标名称" prop="indexName">
              <Input placeholder="必填" v-model="otherTypeFormData.indexName" />
            </FormItem>
          </Col>
          <Col span="11" offset="2">
            <FormItem label="标准名称">
              <Input v-model="otherTypeFormData.standardName" />
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="指标单位">
              <Input v-model="otherTypeFormData.indexUnit" />
            </FormItem>
          </Col>
          <Col span="11" offset="2">
            <FormItem label="描述">
              <Input v-model="otherTypeFormData.explain" />
            </FormItem>
          </Col>
          <Col span="19">
            <FormItem label="结果值">
              <Input v-model="otherTypeFormData.resultValue" clearable />
            </FormItem>
          </Col>
          <Col span="5" class="ivu-text-right">
            <FormItem :label-width="0">
              <Button type="info" @click="addToResultValueList">+可选结果</Button>
            </FormItem>
          </Col>
          <div style="width: 100%;display: inline-block;">
            <Tag
              :name="item"
              closable
              class="tag-com"
              @on-close="handleCloseTag"
              v-for="(item, index) in resultValueList"
              :key="'result-'+index"
            >{{item}}</Tag>
          </div>
        </Form>
      </Row>
    </Modal>
     <Modal title="删除" v-model="removeModal" @on-ok="handleRemove">
      <div>确认删除吗？</div>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                isAddType: true,
                removeModal: false,
                ageGroupList: ['childhood', 'adult', 'oldage'],
                ageGroupChList: ['幼年', '成年', '老年'],
                speciesKeyList: ['dog', 'cat', 'other'],
                speciesNameList: ['犬', '猫', '其他'],
                limitList: ['lowerLimit', 'upperLimit'],
                minDog: '',
                minCat: '',
                minOther: '',
                batchsaveDetail: {
                    indexName: '',
                    standardName: '',
                    indexUnit: '',
                    explain: ''
                },
                rangeTypeRules: {
                    indexName: [
                        { required: true, message: '请输入指标名称', trigger: 'blur' }
                    ]
                },
                resultValueList: [],
                selectList: [],
                isAddCheckItem: false,
                otherTypeFormData: {
                    indexName: '',
                    standardName: '',
                    indexUnit: '',
                    explain: '',
                    resultValue: ''
                },
                checkItemColumns: [],
                loadingTable: true,
                showElevator: false,
                checkTypeData: {
                    name: '',
                    hasReference: 'true'
                },
                currentCheckTypeData: {
                    id: '',
                    name: ''
                },
                checkTypeRules: {
                    name: [{ required: true, message: '请输入名称', trigger: 'change' }]
                },
                otherTypeRules: {
                    indexName: [
                        { required: true, message: '请输入指标名称', trigger: 'change' }
                    ]
                },
                nameLike: '',
                loadingList: true,
                list: [],
                checkItemOtherColumns: [
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
                    }
                ],
                checkItemRangeColumns: [
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
                                            this.checkItemData[params.row._index].pet = e
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
                                            this.checkItemData[params.row._index].age = e
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
                            var lower = params.row[params.row.age + '-' + params.row.pet + '-lowerLimit']
                            return h('div', [
                                lower || ''
                            ]);
                        }
                    },
                    {
                        title: '参考值上线',
                        minWidth: 84,
                        key: 'upperLimit',
                        render: (h, params) => {
                            var upper = params.row[params.row.age + '-' + params.row.pet + '-upperLimit']
                            return h('div', [
                                upper || ''
                            ]);
                        }
                    },
                    {
                        title: '说明',
                        minWidth: 84,
                        key: 'explain'
                    }
                ],
                checkItemData: [],
                current: 1,
                total: 0,
                showCheckTypeModal: false,
                petTypeList: [],
                ageTypeList: [
                    { code: 'childhood', name: '幼年' },
                    { code: 'adult', name: '成年' },
                    { code: 'oldage', name: '老年' }
                ],
                showRangeTypeModal: false,
                showOtherTypeModal: false
            };
        },
        methods: {
            addToResultValueList () {
                if (this.otherTypeFormData.resultValue === '') {
                    this.$Message.error('请填写结果值');
                    return false;
                }
                this.resultValueList.push(this.otherTypeFormData.resultValue);
                this.otherTypeFormData.resultValue = '';
            },
            switchList (item) {
                this.currentCheckTypeData = JSON.parse(JSON.stringify(item));
                this.getCheckItemList();
            },
            getCheckList () {
                var data = {
                    nameLike: this.nameLike
                };
                this.$get('/admin/general/checkSetting/page', data, response => {
                    this.list = response.data.data;
                    this.currentCheckTypeData =
                        response.data.data.length > 0
                            ? JSON.parse(JSON.stringify(response.data.data[0]))
                            : {};
                    this.loadingList = false;
                    this.getCheckItemList();
                });
            },
            getCheckItemList () {
                if (this.currentCheckTypeData.hasReference) {
                    this.checkItemColumns = this.checkItemRangeColumns;
                } else {
                    this.checkItemColumns = this.checkItemOtherColumns;
                }
                this.selectList = [];
                var data = {
                    settingId: this.currentCheckTypeData.id,
                    start: this.current - 1,
                    size: 10
                };
                this.$get('/admin/general/checkSetting/item/page', data, response => {
                    // this.checkItemData = response.data.data;
                    this.setBatchsaveDetail(response.data.data)
                    this.total = response.data.totalElements;
                    if (Number(this.total) / 10 > 9) {
                        this.showElevator = true;
                    }
                    this.loadingTable = false;
                });
            },
            getPetTypeList () {
                this.$get('/admin/pet/species/page', {}, response => {
                    this.petTypeList = response.data.data;
                });
            },
            handleOpenCreateType () {
                this.isAddType = true
                this.$refs.checkTypeForm.resetFields();
                this.checkTypeData = {
                    name: '',
                    hasReference: 'true'
                };
                this.showCheckTypeModal = true;
            },
            handleEditType () {
                if (this.currentCheckTypeData.id == null || this.currentCheckTypeData.id === '') {
                    this.$Message.error('请选择要修改的数据');
                    return false;
                }
                this.isAddType = false
                this.$refs.checkTypeForm.resetFields();
                this.checkTypeData = JSON.parse(JSON.stringify(this.currentCheckTypeData))
                this.showCheckTypeModal = true;
            },
            addCheckType () {
                this.$refs.checkTypeModal.buttonLoading = false;
                this.$refs.checkTypeForm.validate(valid => {
                    if (valid) {
                        this.$post(
                            '/admin/general/checkSetting/save',
                            this.checkTypeData,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getCheckList();
                                    this.showCheckTypeModal = false;
                                }
                            }
                        );
                    } else {
                    }
                });
            },
            // 移除分类
            handleRemoveType () {
                if (this.currentCheckTypeData.id == null || this.currentCheckTypeData.id === '') {
                    this.$Message.error('请选择要删除的数据');
                    return false;
                }
                this.removeModal = true;
            },
            handleRemove () {
                this.$get(
                    '/admin/general/checkSetting/remove/' + this.currentCheckTypeData.id,
                    {},
                    response => {
                        this.$Message.info('删除成功');
                        this.getCheckList();
                    }
                );
            },
            createOtherType () {
                // 保存无参考值的
                this.$refs.otherTypeModal.buttonLoading = false;
                this.$refs.otherTypeForm.validate(valid => {
                    if (valid) {
                        this.otherTypeFormData.settingId = this.currentCheckTypeData.id;
                        this.otherTypeFormData.resultValue = this.resultValueList.join(',');
                        this.$post(
                            '/admin/general/checkSetting/item/save',
                            this.otherTypeFormData,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getCheckItemList();
                                    this.showOtherTypeModal = false;
                                }
                            }
                        );
                    } else {
                    }
                });
            },
            handleSelect (selection) {
                this.selectList = JSON.parse(JSON.stringify(selection));
            },
            handleCreateCheckItem () {
                this.isAddCheckItem = true
                if (this.currentCheckTypeData.hasReference) {
                    this.$refs.rangeTypeForm.resetFields();
                    this.batchsaveDetail = {
                        indexName: '',
                        standardName: '',
                        indexUnit: '',
                        explain: ''
                    }
                    this.setObj()
                    this.showRangeTypeModal = true;
                } else {
                    this.$refs.otherTypeForm.resetFields();
                    this.resultValueList = [];
                    this.otherTypeFormData = {
                        indexName: '',
                        standardName: '',
                        indexUnit: '',
                        explain: '',
                        resultValue: ''
                    };
                    this.showOtherTypeModal = true;
                }
            },
            handleEditCheckItem () {
                if (this.selectList.length === 0) {
                    this.$Message.error('请选择表格中的数据');
                    return false;
                }
                this.isAddCheckItem = false
                if (this.currentCheckTypeData.hasReference) {
                    this.$refs.rangeTypeForm.resetFields();
                    this.batchsaveDetail = JSON.parse(JSON.stringify(this.selectList[0]));
                    this.showRangeTypeModal = true;
                } else {
                    this.$refs.otherTypeForm.resetFields();
                    this.resultValueList = [];
                    this.otherTypeFormData = JSON.parse(JSON.stringify(this.selectList[0]));
                    this.otherTypeFormData.resultValue = '';
                    this.resultValueList = this.selectList[0].resultValue
                        ? this.selectList[0].resultValue.split(',')
                        : [];
                    this.showOtherTypeModal = true;
                }
            },
            handleCloseTag (event, name) {
                var newArr = [];
                for (var i = 0; i < this.resultValueList.length; i++) {
                    if (this.resultValueList[i] !== name) {
                        newArr.push(this.resultValueList[i]);
                    }
                }
                this.resultValueList = newArr;
            },
            setObj () {
                for (var i = 0; i < this.ageGroupList.length; i++) {
                    for (var j = 0; j < this.speciesKeyList.length; j++) {
                        for (var z = 0; z < this.limitList.length; z++) {
                            this.batchsaveDetail[this.ageGroupList[i] + '-' + this.speciesKeyList[j] + '-' + this.limitList[z]] = ''
                        }
                    }
                }
            },
            setBatchsaveDetail (data) { // 处理获取的单项列表数据
                for (var i = 0; i < data.length; i++) {
                    if (data[i].details) {
                        for (var j = 0; j < data[i].details.length; j++) {
                            for (var z = 0; z < data[i].details[j].spec.length; z++) {
                                data[i][data[i].details[j].ageGroup.code + '-' + data[i].details[j].spec[z].species.key + '-lowerLimit'] = data[i].details[j].spec[z].lowerLimit// 例：data[childhood-dog-lowerLimit]=返回数据里对应的lowerLimit
                                data[i][data[i].details[j].ageGroup.code + '-' + data[i].details[j].spec[z].species.key + '-upperLimit'] = data[i].details[j].spec[z].upperLimit
                            }
                        }
                        data[i].pet = 'dog'
                        data[i].age = 'childhood'
                    }
                }
                this.checkItemData = data
            },
            createRangeType () {
                // 保存有参考值范围的
                this.$refs.rangeTypeModal.buttonLoading = false;
                this.$refs.rangeTypeForm.validate(valid => {
                    if (valid) {
                        // 处理数据
                        var detailsArr = []
                        let vm = this
                        for (var i = 0; i < vm.ageGroupList.length; i++) {
                            var detailsItemObj = {}
                            detailsItemObj.ageGroup = vm.ageGroupList[i]
                            var specArr = []
                            for (var j = 0; j < vm.speciesKeyList.length; j++) {
                                var speciesObj = {}
                                var specItemObj = {}
                                speciesObj.name = vm.speciesNameList[j]
                                speciesObj.key = vm.speciesKeyList[j]
                                specItemObj.species = speciesObj
                                for (var z = 0; z < vm.limitList.length; z++) {
                                    specItemObj[vm.limitList[z]] = vm.batchsaveDetail[vm.ageGroupList[i] + '-' + vm.speciesKeyList[j] + '-' + vm.limitList[z]]
                                    // 删除多余键值对
                                    delete vm.batchsaveDetail[vm.ageGroupList[i] + '-' + vm.speciesKeyList[j] + '-' + vm.limitList[z]]
                                }
                                specArr.push(specItemObj)
                            }
                            detailsItemObj.spec = specArr
                            detailsArr.push(detailsItemObj)
                        }
                        this.batchsaveDetail.details = detailsArr
                        this.batchsaveDetail.settingId = this.currentCheckTypeData.id
                        this.$post('/admin/general/checkSetting/item/batchsave', this.batchsaveDetail, response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                                this.getCheckItemList();
                                this.showRangeTypeModal = false
                            }
                        }, false);
                    } else {
                    }
                });
            },
            copyMin (ago) {
                this.minDog = this.batchsaveDetail[ago + '-dog-lowerLimit']
                this.minCat = this.batchsaveDetail[ago + '-cat-lowerLimit']
                this.minOther = this.batchsaveDetail[ago + '-other-lowerLimit']
            },
            setMax (ago) {
                this.batchsaveDetail[ago + '-dog-upperLimit'] = this.minDog
                this.batchsaveDetail[ago + '-cat-upperLimit'] = this.minCat
                this.batchsaveDetail[ago + '-other-upperLimit'] = this.minOther
                this.$forceUpdate()
            }
        },
        mounted () {
            this.getCheckList();
            this.getPetTypeList();
            this.setObj();
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
.mr15 {
  margin-right: 15px;
}
.mt12 {
  margin-bottom: 12px;
}
.mt23 {
  margin-bottom: 23px;
}
.mtop12 {
  margin-top: 12px;
}
.bcandpadding {
  background-color: #f2f2f2;
  padding: 19px;
}
</style>
<style lang="less">
.check-list {
  height: 265px;
  overflow: auto;
}
.check-set-table .ivu-table-body {
  position: fixed !important;
}
.modalCla .ivu-modal-body {
  padding: 19px 35px;
}
.labelLefForm .ivu-form-item-label {
  text-align: left;
}
.fimb9 .ivu-form-item{
      // margin-bottom: 12px;
}
</style>
