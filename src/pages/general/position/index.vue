<template>
  <div>
    <Table class="centerSty" border :columns="positionColumns" :data="positionData">
      <p slot="header" style="padding:0 16px">职位列表</p>
    </Table>
    <Row :gutter="16" type="flex" class="mtb15">
      <Col span="24" class="ivu-text-left">
        <Button type="success" @click="handleAdd">+职位</Button>
      </Col>
    </Row>
    <Modal ref="createPositionModal" v-model="addPositionModal" :title="isEdit?'编辑职位':'添加职位'" @on-ok="handleSavePosition" :loading="true">
      <Form ref="createPosition" :label-width="187" :rules="rules" :model="pisitionForm">
        <FormItem label="职位名称"  prop="name">
          <Input style="width: 150px" v-model="pisitionForm.name"/>
        </FormItem>
        <FormItem label="职位代码" prop="code">
          <Input style="width: 150px" v-model="pisitionForm.code"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                isEdit: false,
                pisitionForm: {
                    name: '',
                    code: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入职位名称', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入职位代码', trigger: 'blur' }
                    ]
                },
                addPositionModal: false,
                positionColumns: [
                    {
                        title: '职位名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '职位代码',
                        minWidth: 84,
                        key: 'code'
                    },
                    {
                        title: '操作',
                        minWidth: 84,
                        render: (h, params) => {
                            var isDisabled = false
                            isDisabled = params.row.num > 0
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'info',
                                            size: 'small',
                                            disabled: isDisabled
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
                                            size: 'small',
                                            disabled: isDisabled
                                        },
                                        style: {
                                            marginLeft: '10px'
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
                positionData: [
                ]
            };
        },
        methods: {
            getPositionList () {
                this.$get('/admin/user/position/page', {}, response => {
                    this.positionData = response.data.data
                });
            },
            handleSavePosition () {
                this.$refs.createPositionModal.buttonLoading = false;
                this.$refs.createPosition.validate(valid => {
                    if (valid) {
                        this.$post('/admin/user/position/save', this.pisitionForm, response => {
                            if (response.success) {
                                this.$Message.info('保存成功')
                                this.getPositionList()
                                this.addPositionModal = false
                            }
                        });
                    } else {
                    }
                });
            },
            handleEdit (rowData) {
                this.isEdit = true
                this.$refs.createPosition.resetFields()
                this.pisitionForm.name = rowData.name
                this.pisitionForm.code = rowData.code
                this.addPositionModal = true
            },
            handleAdd () {
                this.isEdit = false
                this.$refs.createPosition.resetFields()
                this.addPositionModal = true
            }
        },
        mounted () {
            this.getPositionList()
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
