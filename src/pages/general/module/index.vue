<template>
  <div>
    <Table class="centerSty" border :columns="moduleColumns" :data="moduleData"></Table>
    <Row class="ivu-mt">
      <Col span="24"><Button type="info" @click="showModuleModal">添加</Button></Col>
    </Row>
    <Modal
      ref="creatModuleModal"
      v-model="showCreatModuleModal"
      title="添加模块"
      @on-ok="handleAddModule"
      :loading="true"
    >
      <Form ref="createModuleForm" :model="moduleInfo" :rules="rules" :label-width="80">
        <FormItem label="父节点：" prop="parentId">
          <Select v-model="moduleInfo.parentId" placeholder="请选择">
            <Option v-for="(it, index) in moduleData" :key="index" :value="it.id">{{ it.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="名称：" prop="name">
          <Input v-model="moduleInfo.name" placeholder="必填" />
        </FormItem>
        <FormItem label="路径：">
          <Input v-model="moduleInfo.modulePath"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                showCreatModuleModal: false,
                moduleInfo: {
                    parentId: '',
                    name: '',
                    modulePath: ''
                },
                rules: {
                    parentId: [
                        { required: true, message: '请选择父节点', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入模块名称', trigger: 'change' }
                    ]
                },
                moduleColumns: [
                    {
                        title: '类型',
                        minWidth: 84,
                        key: 'type',
                        render: (h, params) => {
                            return h('div', [params.row.type ? params.row.type.name : '']);
                        }
                    },
                    {
                        title: '名称',
                        minWidth: 84,
                        key: 'name'
                    },
                    {
                        title: 'parentId',
                        minWidth: 84,
                        key: 'parentId'
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
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.moduleInfo = JSON.parse(JSON.stringify(params.row))
                                                this.showCreatModuleModal = true
                                            }
                                        }
                                    },
                                    '编辑'
                                )
                            ]);
                        }
                    }
                ],
                moduleData: []
            };
        },
        methods: {
            showModuleModal () {
                this.$refs.createModuleForm.resetFields()
                this.moduleInfo = {}
                this.showCreatModuleModal = true
            },
            getModuleList () {
                this.$get('/admin/module/info/page', {}, response => {
                    this.moduleData = response.data.data;
                });
            },
            handleAddModule () {
                this.$refs.creatModuleModal.buttonLoading = false;
                this.$refs.createModuleForm.validate(valid => {
                    if (valid) {
                        this.moduleInfo.type = 'admin';
                        this.$post('/admin/module/info/save', this.moduleInfo, response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                                this.getModuleList();
                                this.showCreatModuleModal = false
                            }
                        });
                    } else {
                    }
                });
            }
        },
        mounted () {
            this.getModuleList();
        }
    };
</script>
<style lang="less" scoped>
</style>
<style lang="less">
.centerSty td {
  text-align: center;
}
.centerSty th {
  text-align: center;
}
</style>
