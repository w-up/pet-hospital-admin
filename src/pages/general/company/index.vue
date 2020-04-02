<template>
  <div>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">往来单位列表</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Input prefix="ios-search" placeholder="名称/住址/联系人/电话" />
            </Col>
          </Row>
          <Row class="mt6 noplr">
            <Col span="24">
              <List class="company-list">
                <ListItem v-for="(item, index) in list" :key="index" :class="item.name===currentName?'active':''">
                    <p @click="switchList(item.name)" class="list">{{ item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="12" class="ivu-text-left">
              <Button type="error" >删除</Button>
            </Col>
            <Col span="12" class="ivu-text-right">
              <Button type="primary" >+单位</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">单位列表</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Form ref="form" :model="data" :label-width="100">
                <FormItem label="" prop="count" label-for="count">
                  <Checkbox>是供应商</Checkbox>
                  <Checkbox class="ml30">是客户</Checkbox>
                </FormItem>
                <FormItem label="名称" prop="count" label-for="count">
                  <Input v-model="data.name" placeholder="请输入" />
                </FormItem>
                <FormItem label="联系人" prop="count" label-for="count">
                  <Input v-model="data.contactor" placeholder="请输入" />
                </FormItem>
                <FormItem label="联系电话" prop="count" label-for="count">
                  <Input v-model="data.cellphone" placeholder="请输入" />
                </FormItem>
                <FormItem label="地址" prop="count" label-for="count">
                  <Input v-model="data.address" placeholder="请输入" />
                </FormItem>
                <FormItem label="开户行" prop="count" label-for="count">
                  <Input v-model="data.openBank" placeholder="请输入" />
                </FormItem>
                <FormItem label="账号" prop="count" label-for="count">
                  <Input v-model="data.account" placeholder="请输入" />
                </FormItem>
                <FormItem label="欠款" prop="count" label-for="count">
                  <Input v-model="data.arrears" placeholder="请输入" />
                </FormItem>
                <FormItem label="欠款额度" prop="count" label-for="count">
                  <Input v-model="data.amount" placeholder="请输入" />
                </FormItem>
                <FormItem label="备注" prop="count" label-for="count">
                  <Input v-model="data.remark" type="textarea" placeholder="请输入" />
                </FormItem>
              </Form>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-right">
              <Button type="primary" >编辑</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
    export default {
        name: 'list-table-list',
        data () {
            return {
                list: [
                    { name: '青岛宠物有限公司' },
                    { name: '上海哈哈有限公司' },
                    { name: '深证腾讯公司' }
                ],
                currentName: '青岛宠物有限公司',
                data: {
                    name: '青岛宠物有限公司',
                    contactor: '张三',
                    cellphone: '18212121233',
                    arrears: 3323
                }
            };
        },
        methods: {
            switchList (name) {
                this.currentName = name
            }
        },
        mounted () {
        }
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
.company-list {
  height: 550px;
  overflow: auto;
}
</style>
