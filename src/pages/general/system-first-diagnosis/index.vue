<template>
  <div>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">疾病类型</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Tree ref="tree" :data="treeData" @on-select-change="selectChange" class="backColorRow"></Tree>
            </Col>
          </Row>
          <Row :gutter="16" class="mtb15">
            <Col span="7" class="ivu-text-center">
              <Button size="small" type="info" @click="showFirTypeModal">+一级分类</Button>
            </Col>
            <Col span="7" class="ivu-text-center">
              <Button size="small" type="primary" @click="showSecTypeModal">+二级分类</Button>
            </Col>
            <Col span="5" class="ivu-text-center">
              <Button size="small" type="warning" @click="editNodes">修改</Button>
            </Col>
            <Col span="5" class="ivu-text-center">
              <Button size="small" type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">病症描述</span>
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
    <Modal ref="addFirTypeModal" v-model="showAddFirTypeModal" :title="isAddFirType?'添加分类':'修改分类'" @on-ok="handleAddFirType" :loading="true">
      <Form ref="addFirTypeForm" :label-width="120" :rules="firTypeRules" :model="firTypeData">
        <FormItem label="分类名称" prop="title">
          <Input placeholder="必填" style="width:300px" v-model="firTypeData.title"/>
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
                description: '',
                isAddFirType: false,
                firTypeData: {
                    parentId: '0',
                    title: ''
                },
                firTypeRules: {
                    title: [
                        { required: true, message: '请输入分类名称', trigger: 'change' }
                    ]
                },
                treeData: [
                ],
                showAddFirTypeModal: false
            };
        },
        methods: {
            selectChange (selectedNodesList, selectedNode) {
                this.$set(selectedNode, 'expand', !selectedNode.expand)// 点击节点文字展开收起
                this.description = selectedNode.content ? selectedNode.content : ''
            },
            editNodes: function () {
                var selectedNodesList = this.$refs.tree.getSelectedNodes()
                if (selectedNodesList.length === 0) {
                    this.$Message.error('请选择需要修改的分类');
                    return false
                }
                this.isAddFirType = false
                this.$refs.addFirTypeForm.resetFields()
                this.firTypeData = {}
                this.firTypeData.id = selectedNodesList[0].id
                this.firTypeData.parentId = selectedNodesList[0].parentId
                this.firTypeData.title = selectedNodesList[0].title
                this.showAddFirTypeModal = true
            },
            saveDescription: function () {
                var selectedNodesList = this.$refs.tree.getSelectedNodes()
                if (selectedNodesList.length === 0) {
                    this.$Message.error('请选择左侧树');
                    return false
                }
                this.firTypeData = {}
                this.firTypeData.id = selectedNodesList[0].id
                this.firTypeData.content = this.description
                this.$post('/admin/general/system/first/diagnosis/save', this.firTypeData, response => {
                    if (response.success) {
                        this.$Message.info('保存成功')
                        this.getTreeData()
                        this.description = ''
                    }
                });
            },
            showSecTypeModal: function () {
                var selectedNodesList = this.$refs.tree.getSelectedNodes()
                if (selectedNodesList.length === 0) {
                    this.$Message.error('请选择一级分类');
                } else if (selectedNodesList[0].nodeLevel !== 1) {
                    this.$Message.error('请选择一级分类');
                } else {
                    this.isAddFirType = true
                    this.$refs.addFirTypeForm.resetFields()
                    this.firTypeData = {
                        parentId: selectedNodesList[0].id,
                        title: ''
                    }
                    this.showAddFirTypeModal = true
                }
            },
            getTreeData () {
                this.$get('/admin/general/system/first/diagnosis/treePage?parentId=0', {}, response => {
                    this.treeData = response.data;
                });
            },
            showFirTypeModal () {
                this.isAddFirType = true
                this.$refs.addFirTypeForm.resetFields()
                this.firTypeData = {
                    parentId: '0',
                    title: ''
                }
                this.showAddFirTypeModal = true
            },
            handleAddFirType () {
                this.$refs.addFirTypeModal.buttonLoading = false;
                this.$refs.addFirTypeForm.validate(valid => {
                    if (valid) {
                        this.$post('/admin/general/system/first/diagnosis/save', this.firTypeData, response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                                this.getTreeData();
                                this.description = ''
                                this.showAddFirTypeModal = false
                            }
                        });
                    } else {
                    }
                });
            }
        },
        mounted () {
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
.backColorRow .ivu-tree-title-selected, .ivu-tree-title-selected:hover{
  width:96%
}
.backColorRow .ivu-tree-title-selected:hover{
  width:96%
}
</style>
