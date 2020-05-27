<template>
  <div>
    <Table class="centerSty" border :columns="subjectColumns" :data="subjectData">
      <p slot="header" style="padding:0 16px">途径列表</p>
    </Table>
    <Row :gutter="16" type="flex" class="mtb15">
      <Col span="24" class="ivu-text-left">
        <Button type="success" @click="handleAdd">+了解途径</Button>
      </Col>
    </Row>
    <Modal ref="addSubjectModal" v-model="showSubjectModal" :title="isEdit?'编辑了解途径':'添加了解途径'" @on-ok="handleSaveSubject" :loading="true">
      <Form ref="createSubjectForm" :label-width="187" :rules="rules" :model="subjectForm">
        <FormItem label="了解途径"  prop="name">
          <Input style="width: 150px" v-model="subjectForm.name"/>
        </FormItem>
        <FormItem label="代码"  prop="code">
          <Input style="width: 150px" v-model="subjectForm.code"/>
        </FormItem>
      </Form>
    </Modal>
    <Modal title="删除" v-model="removeModal" @on-ok="handleDelRecord">
      <div>确认删除吗？</div>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                removeModal: false,
                isEdit: false,
                subjectForm: {
                    name: '',
                    code: '',
                    id: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入了解途径', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入代码', trigger: 'blur' }
                    ]
                },
                showSubjectModal: false,
                subjectColumns: [
                    {
                        title: '途径名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '途径代码',
                        minWidth: 84,
                        key: 'code'
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
                                                this.handleEdit(params.row)
                                            }
                                        }
                                    },
                                    '编辑'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            marginLeft: '10px'
                                        },
                                        on: {
                                            click: () => {
                                                this.removeModal = true
                                                this.needDelId = params.row.id
                                            }
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        }
                    }
                ],
                subjectData: [
                ],
                needDelId: ''
            };
        },
        methods: {
            getSubjectList () {
                this.$get('/admin/general/acquire/way/page', {}, response => {
                    this.subjectData = response.data.data
                });
            },
            handleSaveSubject () {
                this.$refs.addSubjectModal.buttonLoading = false;
                this.$refs.createSubjectForm.validate(valid => {
                    if (valid) {
                        this.$post('/admin/general/acquire/way/save', this.subjectForm, response => {
                            if (response.success) {
                                this.$Message.info('保存成功')
                                this.getSubjectList()
                                this.showSubjectModal = false
                            }
                        });
                    } else {
                    }
                });
            },
            handleEdit (rowData) {
                this.isEdit = true
                this.$refs.createSubjectForm.resetFields()
                this.subjectForm.name = rowData.name
                this.subjectForm.code = rowData.code
                this.subjectForm.id = rowData.id
                this.showSubjectModal = true
            },
            handleAdd () {
                this.isEdit = false
                this.$refs.createSubjectForm.resetFields()
                this.subjectForm = {
                    name: '',
                    code: '',
                    id: ''
                }
                this.showSubjectModal = true
            },
            // 删除
            handleDelRecord () {
                this.$get('/admin/general/acquire/way/remove/' + this.needDelId, {}, response => {
                    if (response.success) {
                        this.$Message.info('删除成功')
                        this.getSubjectList()
                    }
                });
            }
        },
        mounted () {
            this.getSubjectList()
        }
    };
</script>
<style lang="less" scoped>
.mtb15 {
  margin: 15px 0;
}
</style>
<style lang="less">
.centerSty td {
  text-align: center;
}
.centerSty th {
  text-align: center;
}
</style>
