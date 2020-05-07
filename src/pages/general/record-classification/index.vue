<template>
  <div>
    <Table class="centerSty" border :columns="subjectColumns" :data="subjectData">
      <p slot="header" style="padding:0 16px">分类列表</p>
    </Table>
    <Row :gutter="16" type="flex" class="mtb15">
      <Col span="24" class="ivu-text-left">
        <Button type="success" @click="handleAdd">+病情分类</Button>
      </Col>
    </Row>
    <Modal ref="addSubjectModal" v-model="showSubjectModal" :title="isEdit?'编辑病情分类':'添加病情分类'" @on-ok="handleSaveSubject" :loading="true">
      <Form ref="createSubjectForm" :label-width="187" :rules="rules" :model="subjectForm">
        <FormItem label="病情分类"  prop="name">
          <Input style="width: 150px" v-model="subjectForm.name"/>
        </FormItem>
        <!-- <FormItem label="病情分类代码"  prop="name">
          <Input style="width: 150px" v-model="subjectForm.key"/>
        </FormItem> -->
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                isEdit: false,
                subjectForm: {
                    name: '',
                    id: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入病情分类', trigger: 'blur' }
                    ]
                    // key: [
                    //     { required: true, message: '请输入病情分类代码', trigger: 'blur' }
                    // ]
                },
                showSubjectModal: false,
                subjectColumns: [
                    {
                        title: '类型名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    // {
                    //     title: '类型代码',
                    //     minWidth: 84,
                    //     key: 'key'
                    // },
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
                                                this.handleDelRecord(params.row.id)
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
                ]
            };
        },
        methods: {
            getSubjectList () {
                this.$get('/admin/general/medical/record/classification/page', {}, response => {
                    this.subjectData = response.data.data
                });
            },
            handleSaveSubject () {
                this.$refs.addSubjectModal.buttonLoading = false;
                this.$refs.createSubjectForm.validate(valid => {
                    if (valid) {
                        this.$post('/admin/general/medical/record/classification/save', this.subjectForm, response => {
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
                // this.subjectForm.key = rowData.key
                this.subjectForm.id = rowData.id
                this.showSubjectModal = true
            },
            handleAdd () {
                this.isEdit = false
                this.$refs.createSubjectForm.resetFields()
                this.subjectForm = {
                    name: '',
                    // key: '',
                    id: ''
                }
                this.showSubjectModal = true
            },
            // 删除病情
            handleDelRecord (id) {
                this.$get('/admin/general/medical/record/classification/remove/' + id, {}, response => {
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
