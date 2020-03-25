<template>
  <div>
    <Tabs value="name1">
      <TabPane label="普通卡" name="name1"></TabPane>
      <TabPane label="银卡" name="name2"></TabPane>
      <TabPane label="金卡" name="name3"></TabPane>
    </Tabs>
    <Row>
      <Col span="6">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">所有商品列表</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Tree :data="dataGoods"></Tree>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">单项目录</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Table class="centerSty" border :columns="columns1" :data="data1"></Table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="data1.length" :current.sync="current" />
              </div>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="warning" class="mr10" @click="handleOpenCreate">修改折扣</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="showCreate" title="修改折扣" @on-ok="handleCreate">
      <Form ref="create" :label-width="100">
        <FormItem label="折扣值：">
          <Input />
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
                dataGoods: [
                    {
                        title: '所有',
                        expand: false
                    },
                    {
                        title: '挂号',
                        expand: true,
                        children: [
                            {
                                title: '挂号服务',
                                expand: false
                            },
                            {
                                title: '住院费用',
                                expand: false
                            }
                        ]
                    },
                    {
                        title: '处方',
                        expand: true,
                        children: [
                            {
                                title: '口服类',
                                expand: false
                            },
                            {
                                title: '疫苗服务',
                                expand: false
                            }
                        ]
                    }
                ],
                current: 1,
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        key: 'code'
                    },
                    {
                        title: '条形码',
                        key: 'barCode'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格',
                        key: 'size'
                    },
                    {
                        title: '单位',
                        key: 'unti'
                    },
                    {
                        title: '单价',
                        key: 'price'
                    },
                    {
                        title: '折扣',
                        key: 'discount '
                    }
                ],
                data1: [
                    {
                        code: 'P00001',
                        barCode: '黑猫',
                        name: 'HM',
                        size: '',
                        unti: '',
                        price: '',
                        discount: ''
                    },
                    {
                        code: 'P00001',
                        barCode: '白猫',
                        name: 'BM',
                        size: '',
                        unti: '',
                        price: '',
                        discount: ''
                    }
                ],
                showCreate: false
            };
        },
        methods: {
            handleOpenCreate () {
                this.showCreate = true;
            },
            handleCreate () {}
        },
        mounted () {}
    };
</script>
<style lang="less" scoped>
.box {
  padding-left: 15px;
}
/*模块标题*/
.module-title-wrapper {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e9eaec;
  font-weight: 700;
  background-color: #fff;
}
.mtb15 {
  margin: 15px 0;
}
</style>
<style lang="less">
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
.centerSty td {
  text-align: center;
}
.centerSty th {
  text-align: center;
}
</style>
