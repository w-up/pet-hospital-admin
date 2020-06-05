<template>
  <div>
    <Table class="centerSty" border :columns="appointmentColumns" :data="appointmentData">
      <p slot="header" style="padding:0 16px">类型列表</p>
    </Table>
    <Row :gutter="16" type="flex" class="mtb15">
      <Col span="24" class="ivu-text-left">
        <Button type="success" @click="handleAdd">+预约类型</Button>
      </Col>
    </Row>
    <Modal ref="addAppointmentModal" v-model="showAppointmentModal" :title="isEdit?'编辑预约类型':'添加预约类型'" @on-ok="handleSaveAppointment" :loading="true">
      <Form ref="createAppointmentForm" :label-width="187" :rules="rules" :model="appointmentForm">
        <FormItem label="预约类型名称"  prop="name">
          <Input style="width: 150px" v-model="appointmentForm.name"/>
        </FormItem>
        <FormItem label="预约类型代码"  prop="code">
          <Input style="width: 150px" v-model="appointmentForm.code"/>
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
                appointmentForm: {
                    name: '',
                    code: '',
                    id: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入预约类型名称', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入预约类型代码', trigger: 'blur' }
                    ]
                },
                showAppointmentModal: false,
                appointmentColumns: [
                    {
                        title: '类型名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: '类型代码',
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
                                            click: () => {}
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        }
                    }
                ],
                appointmentData: [
                ]
            };
        },
        methods: {
            getAppointmentList () {
                this.$get('/admin/appointment/type/page', {}, response => {
                    this.appointmentData = response.data.data
                });
            },
            handleSaveAppointment () {
                this.$refs.addAppointmentModal.buttonLoading = false;
                this.$refs.createAppointmentForm.validate(valid => {
                    if (valid) {
                        this.$post('/admin/appointment/type/save', this.appointmentForm, response => {
                            if (response.success) {
                                this.$Message.info('保存成功')
                                this.getAppointmentList()
                                this.showAppointmentModal = false
                            }
                        });
                    } else {
                    }
                });
            },
            handleEdit (rowData) {
                this.isEdit = true
                this.$refs.createAppointmentForm.resetFields()
                this.appointmentForm.name = rowData.name
                this.appointmentForm.code = rowData.code
                this.appointmentForm.id = rowData.id
                this.showAppointmentModal = true
            },
            handleAdd () {
                this.isEdit = false
                this.$refs.createAppointmentForm.resetFields()
                this.appointmentForm = {
                    name: '',
                    code: '',
                    id: ''
                }
                this.showAppointmentModal = true
            }
        },
        mounted () {
            this.getAppointmentList()
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
