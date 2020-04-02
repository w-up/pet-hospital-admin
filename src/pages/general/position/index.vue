<template>
  <div>
    <Table class="centerSty" border :columns="positionColumns" :data="positionData">
      <p slot="header" style="padding:0 16px">职位列表</p>
    </Table>
    <Row :gutter="16" type="flex" class="mtb15">
      <Col span="24" class="ivu-text-left">
        <Button type="success" @click="addPositionModal=true">+职位</Button>
      </Col>
    </Row>
    <Modal v-model="addPositionModal" title="添加职位" @on-ok="handleCreate">
      <Form ref="create" :label-width="187">
        <FormItem label="职位名称">
          <Input style="width: 150px" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                addPositionModal: false,
                positionColumns: [
                    {
                        title: '职位名称',
                        minWidth: 84,
                        key: 'name'
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
                                            click: () => {}
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
                positionData: [
                    {
                        name: '护士'
                    },
                    {
                        name: '护士'
                    }
                ]
            };
        },
        methods: {
            handleCreate () {

            }
        },
        mounted () {}
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
