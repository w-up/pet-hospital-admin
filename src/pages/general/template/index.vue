<template>
  <div>
    <Tabs v-model="currentCategoryId" @on-click="changeType">
      <TabPane  v-for="(item, index) in categoryList" :key="index" :label="item.name" :name="item.id"></TabPane>
    </Tabs>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">{{currentTabName}}模板列表</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Tree ref="tree" :data="treeData" @on-select-change="selectChange"></Tree>
            </Col>
            <Col span="24" class="ivu-text-center">
              <Button type="info">+添加新主诉</Button>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success" @click="openAddTypeModal">+分类</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary" @click="openEditTypeModal">修改</Button>
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
              <span class="module-title">{{currentTabName}}模板内容</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Input type="textarea" :autosize="{minRows: 20,maxRows: 20}" v-model="description"/>
            </Col>
            <Col span="24" class="ivu-text-right mtb15">
              <Button type="success" @click="saveDescription">保存</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal  ref="addTypeModal" v-model="showAddTypeModal" title="模板名称" @on-ok="handleAddType" :loading="true">
      <Form ref="addTypeForm" :label-width="100" :rules="typeRules" :model="typeData">
        <FormItem label="模板名称" prop="title">
          <Input v-model="typeData.title"/>
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
                tabObj: {},
                description: '',
                currentCategoryId: '5e9c6c13834b910d3be7c569',
                currentTabName: '',
                categoryList: [],
                treeData: [
                ],
                showAddTypeModal: false,
                typeRules: {
                    title: [
                        { required: true, message: '请输入模板名称', trigger: 'change' }
                    ]
                },
                typeData: {}
            };
        },
        methods: {
            // 切换tab类型
            changeType (id) {
                this.currentTabName = this.tabObj[id]
                this.currentCategoryId = id
                this.getTreeData()
            },
            selectChange (selectedNodesList, selectedNode) {
                this.description = selectedNode.content ? selectedNode.content : ''
            },
            getCategoryList () {
                this.$get('/admin/general/template/category/page', {}, response => {
                    this.categoryList = response.data.data;
                    this.currentTabName = response.data.data[0].name
                    for (var i = 0; i < this.categoryList.length; i++) {
                        this.tabObj[this.categoryList[i].id] = this.categoryList[i].name
                    }
                });
            },
            getTreeData () {
                this.$get('/admin/general/template/tree?categoryId=' + this.currentCategoryId, {}, response => {
                    this.treeData = response.data;
                });
            },
            openAddTypeModal: function () {
                this.$refs.addTypeForm.resetFields()
                this.typeData = {}
                var selectedNodesList = this.$refs.tree.getSelectedNodes()
                if (selectedNodesList.length === 0) {
                } else {
                    this.typeData.parentId = selectedNodesList[0].id
                }
                this.typeData.title = ''
                this.typeData.categoryId = this.currentCategoryId
                this.showAddTypeModal = true
            },
            openEditTypeModal: function () {
                var selectedNodesList = this.$refs.tree.getSelectedNodes()
                if (selectedNodesList.length === 0) {
                    this.$Message.error('请选择需要修改的分类');
                    return false
                }
                this.$refs.addTypeForm.resetFields()
                this.typeData = {}
                this.typeData.id = selectedNodesList[0].id
                this.typeData.parentId = selectedNodesList[0].parentId
                this.typeData.title = selectedNodesList[0].title
                this.typeData.categoryId = this.currentCategoryId
                this.showAddTypeModal = true
            },
            handleAddType () {
                this.$refs.addTypeModal.buttonLoading = false;
                this.$refs.addTypeForm.validate(valid => {
                    if (valid) {
                        this.$post('/admin/general/template/save', this.typeData, response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                                this.getTreeData();
                                this.description = ''
                                this.showAddTypeModal = false
                            }
                        });
                    } else {
                    }
                });
            },
            saveDescription: function () {
                var selectedNodesList = this.$refs.tree.getSelectedNodes()
                if (selectedNodesList.length === 0) {
                    this.$Message.error('请选择左侧树');
                    return false
                }
                this.typeData = {}
                this.typeData.id = selectedNodesList[0].id
                this.typeData.parentId = selectedNodesList[0].parentId
                this.typeData.content = this.description
                this.typeData.categoryId = this.currentCategoryId
                this.$post('/admin/general/template/save', this.typeData, response => {
                    if (response.success) {
                        this.$Message.info('保存成功')
                        this.getTreeData()
                        this.description = ''
                    }
                });
            }
        },
        mounted () {
            this.getCategoryList()
            this.getTreeData()
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
.item-list {
  height: 265px;
  overflow: auto;
}

.leftRecordCard .ivu-card-body {
  height: 570px;
}
</style>
