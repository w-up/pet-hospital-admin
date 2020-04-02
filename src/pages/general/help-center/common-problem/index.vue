<template>
  <div>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">问题类型</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Tree :data="problemData"></Tree>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success" @click="handleOpenCreate">+问题类型</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary">+问题</Button>
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
              <span class="module-title">常见问题</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
               <Card :bordered="false" dis-hover class="ivu-mt">
            <i-quill v-model="valueQuill" :min-height="324" />
            <Divider />
        </Card>
            </Col>
            <Col span="24" class="ivu-text-right mtb15">
              <Button type="info">保存</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="showCreate" title="添加问题类型" @on-ok="handleCreate">
      <Form ref="create" :label-width="120">
        <FormItem label="类型名称">
          <Input placeholder="必填" style="width:300px"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    import iQuill from '@/components/quill';
    export default {
        name: 'list-table-list',
        components: { iQuill },
        data () {
            return {
                problemData: [
                    {
                        title: '问题类型1',
                        expand: true,
                        children: [
                            {
                                title: '问题1-1',
                                expand: false
                            },
                            {
                                title: '问题1-2',
                                expand: false
                            }
                        ]
                    },
                    {
                        title: '问题类型2',
                        expand: true,
                        children: [
                            {
                                title: '问题2-1',
                                expand: false
                            },
                            {
                                title: '问题2-2',
                                expand: false
                            }
                        ]
                    }
                ],
                showCreate: false,
                valueQuill: ''
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

.mtb15 {
  margin: 15px 0;
}
</style>
<style lang="less">
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
.leftRecordCard .ivu-card-body {
  height: 570px;
}
</style>
