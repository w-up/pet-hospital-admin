<template>
  <div>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">宠物分类</span>
            </Col>
          </Row>
          <Row class="noplr">
            <Col span="24">
              <List class="pet-list">
                <ListItem
                  v-for="(item, index) in list"
                  :key="index"
                  :class="item.id===currentPetTypeData.id?'active':''"
                >
                  <p @click="switchList(item)" class="list">{{ (index+1)+'、'+item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success" @click="handleOpenCreateType">+宠物分类</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary" @click="handleOpenEditType">修改</Button>
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
              <span class="module-title">品种列表</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Table border :columns="speciesColumns" :data="speciesData" @on-selection-change="handleSelect"></Table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="total" :current.sync="current" :show-elevator="showElevator"  @on-change="getPetSpeciesList"/>
              </div>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="success" @click="handleOpenCreateSpecies">+宠物品种</Button>
              <Button type="error">删除</Button>
              <Button type="primary" @click="handleOpenEditSpecies">修改</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal
      ref="createSpeciesModal"
      v-model="showCreateSpeciesModal"
      :title="isAddSpecies?'添加宠物品种':'编辑宠物品种'"
      :loading="true"
      @on-ok="handleCreatSpecies"
    >
      <Form
        ref="createSpeciesForm"
        :model="speciesFormData"
        :rules="rulesSpecies"
        :label-width="100"
      >
        <FormItem label="品种编号：" prop="code">
          <Input v-model="speciesFormData.code" placeholder="必填" />
        </FormItem>
        <FormItem label="品种名称：" prop="name">
          <Input v-model="speciesFormData.name" placeholder="必填" />
        </FormItem>
        <FormItem label="品种拼音：">
          <Input v-model="speciesFormData.namePy" />
        </FormItem>
        <FormItem label="说明：">
          <Input v-model="speciesFormData.remark" />
        </FormItem>
      </Form>
    </Modal>
    <Modal
      ref="createTypeModal"
      v-model="showAddTypeModal"
      :title="isAddType?'添加宠物分类':'编辑宠物分类'"
      @on-ok="handleCreateType"
      :loading="true"
    >
      <Form ref="createTypeForm" :label-width="150" :model="petTypeData" :rules="rulesType">
        <FormItem label="分类名称" prop="name">
          <Input style="width:70%" v-model="petTypeData.name" />
        </FormItem>
        <FormItem label="分类代号" prop="key">
          <Input style="width:70%" v-model="petTypeData.key" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        name: 'list-table-list',
        data () {
            return {
                selectList: [],
                isAddSpecies: false,
                list: [],
                petTypeData: {
                    id: '',
                    key: '',
                    name: ''
                },
                currentPetTypeData: {
                    id: '',
                    key: '',
                    name: ''
                },
                isAddType: false,
                showAddTypeModal: false,
                rulesType: {
                    key: [{ required: true, message: '请输入分类代号', trigger: 'change' }],
                    name: [{ required: true, message: '请输入分类名称', trigger: 'change' }]
                },
                speciesColumns: [
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
                        title: '名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '拼音',
                        minWidth: 84,
                        key: 'namePy'
                    }
                ],
                speciesData: [
                ],
                current: 1,
                total: 0,
                showCreateSpeciesModal: false,
                speciesFormData: {
                    id: '',
                    speciesId: '',
                    name: '',
                    namePy: '',
                    code: '',
                    remark: ''
                },
                rulesSpecies: {
                    code: [
                        { required: true, message: '请输入品种编号', trigger: 'change' }
                    ],
                    name: [{ required: true, message: '请输入品种名称', trigger: 'change' }]
                },
                showElevator: false
            };
        },
        methods: {
            switchList (item) {
                this.currentPetTypeData = JSON.parse(JSON.stringify(item));
                this.getPetSpeciesList();
            },
            getPetTypeList () {
                this.$get('/admin/pet/species/page', {}, response => {
                    this.list = response.data.data;
                    this.currentPetTypeData =
                        response.data.data.length > 0
                            ? JSON.parse(JSON.stringify(response.data.data[0]))
                            : {};
                    this.getPetSpeciesList();
                });
            },
            getPetSpeciesList () {
                var data = {
                    speciesId: this.currentPetTypeData.id,
                    start: this.current - 1,
                    size: 10
                };
                this.$get('/admin/pet/species/breed/page', data, response => {
                    this.speciesData = response.data.data;
                    this.total = response.data.totalElements;
                    if (Number(this.total) / 10 > 9) {
                        this.showElevator = true
                    }
                });
            },
            handleOpenCreateType () {
                this.isAddType = true;
                this.$refs.createTypeForm.resetFields();
                this.petTypeData = {};
                this.showAddTypeModal = true;
            },
            handleOpenCreateSpecies () {
                this.isAddSpecies = true;
                this.$refs.createSpeciesForm.resetFields();
                this.speciesFormData = {};
                this.showCreateSpeciesModal = true;
            },
            handleOpenEditType () {
                this.isAddType = false;
                this.petTypeData = JSON.parse(JSON.stringify(this.currentPetTypeData));
                this.showAddTypeModal = true;
            },
            handleOpenEditSpecies () {
                if (this.selectList.length === 0) {
                    this.$Message.error('请选择表格中的数据');
                } else {
                    this.isAddSpecies = false;
                    this.speciesFormData = this.selectList[this.selectList.length - 1]
                    this.showCreateSpeciesModal = true;
                }
            },
            handleCreateType () {
                this.$refs.createTypeModal.buttonLoading = false;
                this.$refs.createTypeForm.validate(valid => {
                    if (valid) {
                        this.$post('/admin/pet/species/save', this.petTypeData, response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                                this.getPetTypeList();
                                this.showAddTypeModal = false;
                            } else {
                                this.$Message.error(response.message);
                            }
                        });
                    } else {
                    }
                });
            },
            handleCreatSpecies () {
                this.$refs.createSpeciesModal.buttonLoading = false;
                this.$refs.createSpeciesForm.validate(valid => {
                    if (valid) {
                        this.speciesFormData.speciesId = this.currentPetTypeData.id;
                        this.$post(
                            '/admin/pet/species/breed/save',
                            this.speciesFormData,
                            response => {
                                if (response.success) {
                                    this.$Message.info('保存成功');
                                    this.getPetSpeciesList();
                                    this.showCreateSpeciesModal = false;
                                } else {
                                    this.$Message.error(response.message);
                                }
                            }
                        );
                    } else {
                    }
                });
            },
            handleSelect (selection) {
                this.selectList = JSON.parse(JSON.stringify(selection))
                console.log(this.selectList)
            }
        },
        mounted () {
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
</style>
<style lang="less">
.pet-list {
  height: 265px;
  overflow: auto;
}
</style>
