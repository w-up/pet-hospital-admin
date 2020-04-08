<template>
  <div>
    <Tabs value="name1">
      <TabPane label="主诉记录" name="name1"></TabPane>
      <TabPane label="住院病情" name="name2"></TabPane>
      <TabPane label="检验分析" name="name3"></TabPane>
      <TabPane label="病情诊断" name="name4"></TabPane>
      <TabPane label="处理治疗" name="name5"></TabPane>
      <TabPane label="护理记录" name="name6"></TabPane>
      <TabPane label="医嘱" name="name7"></TabPane>
      <TabPane label="回访记录" name="name8"></TabPane>
      <TabPane label="临床检查" name="name9"></TabPane>
    </Tabs>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">主诉记录模板列表</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Tree :data="data1"></Tree>
            </Col>
            <Col span="24" class="ivu-text-center">
              <Button type="info">+添加新主诉</Button>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success" @click="handleOpenCreate">+分类</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary">修改</Button>
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
              <span class="module-title">主诉记录模板内容</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
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
    <Modal v-model="showCreate" title="模板名称" @on-ok="handleCreate">
      <Form ref="create" :label-width="100">
        <FormItem label="模板名称">
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
                data1: [
                    {
                        title: '胃肠道',
                        expand: false
                    },
                    {
                        title: '肢体',
                        expand: true,
                        children: [
                            {
                                title: '肢体',
                                expand: false
                            },
                            {
                                title: '肢体',
                                expand: false
                            }
                        ]
                    },
                    {
                        title: '皮肤',
                        expand: false
                    },
                    {
                        title: '病毒/细菌',
                        expand: false
                    },
                    {
                        title: '心肺',
                        expand: true,
                        children: [
                            {
                                title: '心肺',
                                expand: false
                            },
                            {
                                title: '心肺',
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
            handleCreate () {},
            switchList (name) {
                this.currentName = name;
            }
        },
        mounted () {}
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
