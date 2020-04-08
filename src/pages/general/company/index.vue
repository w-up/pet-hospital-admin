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
              <Input prefix="ios-search" placeholder="名称/住址/联系人/电话" v-model="nameLike" @on-change="getUnitList()" clearable/>
            </Col>
          </Row>
          <Row class="mt6 noplr">
             <Col v-if="this.list.length==0&&loadingList==false" span="24" class="ivu-text-center">暂无数据</Col>
            <Col span="24">
              <List class="company-list">
                <ListItem v-for="(item, index) in list" :key="index" :class="item.id===currentId?'active':''">
                    <p @click="switchList(item)" class="list">{{ item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="12" class="ivu-text-left">
              <Button type="error" >删除</Button>
            </Col>
            <Col span="12" class="ivu-text-right">
              <Button type="primary" @click="addUnti">+单位</Button>
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
              <Form ref="form" :model="data" :label-width="100"  :rules="rules">
                <FormItem label="">
                  <Checkbox v-model="data.ifSupplier">是供应商</Checkbox>
                  <Checkbox class="ml30" v-model="data.ifCustomer">是客户</Checkbox>
                </FormItem>
                <FormItem label="名称" prop="name">
                  <Input v-model="data.name" placeholder="必填" />
                </FormItem>
                <FormItem label="联系人" prop="contacts">
                  <Input v-model="data.contacts" placeholder="请输入" />
                </FormItem>
                <FormItem label="联系电话" prop="cellphone">
                  <Input v-model="data.cellphone" placeholder="请输入" />
                </FormItem>
                <FormItem label="地址" prop="address">
                  <Input v-model="data.address" placeholder="请输入" />
                </FormItem>
                <FormItem label="开户行" prop="bank">
                  <Input v-model="data.bank" placeholder="请输入" />
                </FormItem>
                <FormItem label="账号" prop="bankAccount">
                  <Input v-model="data.bankAccount" placeholder="请输入" />
                </FormItem>
                <FormItem label="欠款" prop="arrears">
                  <Input v-model="data.arrears" placeholder="请输入" />
                </FormItem>
                <FormItem label="欠款额度" prop="arrearsLimit">
                  <Input v-model="data.arrearsLimit" placeholder="请输入" />
                </FormItem>
                <FormItem label="备注" prop="remark">
                  <Input v-model="data.remark" type="textarea" placeholder="请输入" />
                </FormItem>
              </Form>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-right">
              <Button type="success" @click="handleSubmit">{{isAdd?'添加':'编辑'}}</Button>
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
                isAdd: false,
                loadingList: true,
                nameLike: '',
                list: [
                ],
                currentId: '',
                data: {
                },
                rules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'change' }
                    ],
                    cellphone: [
                        {
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ],
                    bankAccount: [
                        {
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ],
                    arrears: [
                        {
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ],
                    arrearsLimit: [
                        {
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ]
                }
            };
        },
        methods: {
            switchList (item) {
                this.currentId = item.id
                this.data = item
                this.isAdd = false
            },
            getUnitList (isAfterSave) {
                var data = {
                    nameLike: this.nameLike
                }
                this.$get('/admin/general/contact/unit/page', data, response => {
                    if (response.data.data.length > 0) {
                        this.list = response.data.data;
                        if (!isAfterSave) {
                            this.data = response.data.data[0]
                            this.currentId = response.data.data[0].id
                        }
                    } else {
                        this.list = [];
                        this.currentId = ''
                        this.data = {}
                    }
                    this.isAdd = false
                    this.loadingList = false
                });
            },
            addUnti () {
                this.data = {}
                this.isAdd = true
                this.currentId = ''
            },
            handleSubmit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$post('/admin/general/contact/unit/save', this.data, response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                                this.data = response.data
                                this.currentId = response.data.id
                                this.getUnitList(true);
                            }
                        });
                    } else {
                    }
                });
            }
        },
        mounted () {
            this.getUnitList()
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
.company-list {
  height: 550px;
  overflow: auto;
}
</style>
