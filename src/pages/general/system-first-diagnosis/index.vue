<template>
  <div>
    <Row>
      <Col span="6">
        <Card class="ptb0 leftRecordCard">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">疾病类型</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Tree :data="data1"></Tree>
            </Col>
          </Row>
          <Row :gutter="24" class="mtb15">
            <Col span="7" class="ivu-text-center">
              <Button size="small" type="info" @click="handleOpenCreate">+一级分类</Button>
            </Col>
            <Col span="7" class="ivu-text-center">
              <Button size="small" type="primary">+二级分类</Button>
            </Col>
            <Col span="5" class="ivu-text-center">
              <Button size="small" type="warning">修改</Button>
            </Col>
            <Col span="5" class="ivu-text-center">
              <Button size="small" type="error">删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">病症描述</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Input type="textarea" :autosize="{minRows: 20,maxRows: 20}" />
            </Col>
            <Col span="24" class="ivu-text-right mtb15">
              <Button type="success">保存</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="showCreate" title="添加分类" @on-ok="handleCreate">
      <Form ref="create" :label-width="120">
        <FormItem label="分类名称">
          <Input placeholder="必填" style="width:300px"/>
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
                data1: [
                    {
                        title: '外科',
                        expand: true,
                        children: [
                            {
                                title: '血管瘤',
                                expand: false
                            },
                            {
                                title: '肝癌',
                                expand: false
                            }
                        ]
                    },
                    {
                        title: '内科',
                        expand: true,
                        children: [
                            {
                                title: '糖尿病',
                                expand: false
                            },
                            {
                                title: '血管瘤',
                                expand: false
                            }
                        ]
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
.item-list {
  height: 265px;
  overflow: auto;
}
.item-list .ivu-list-item {
  padding: 0;
}
.item-list .ivu-list-item p {
  padding: 12px 0;
  width: 100%;
}
.item-list .active {
  background: #69c5d8;
}

.leftRecordCard .ivu-card-body {
  height: 570px;
}
</style>
