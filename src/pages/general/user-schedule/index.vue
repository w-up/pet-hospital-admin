<template>
  <div>
    <Row>
        <Col span="5">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">班次列表</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end">
            <Col span="24">
              <List class="shift-list">
                <ListItem v-for="(item, index) in list" :key="index" :class="item.name===currentName?'active':''">
                    <p @click="switchList(item.name)">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="10" class="ivu-text-center">
              <Button type="success" @click="handleOpenCreate">+添加班次</Button>
            </Col>
            <Col span="7" class="ivu-text-center">
              <Button type="primary" >编辑</Button>
            </Col>
             <Col span="7" class="ivu-text-center">
              <Button type="error" >删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="19" class="box">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">排班表</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <table class="table">
            <thead>
              <tr>
                <th>职位</th>
                <th>人员</th>
                <th>周一</th>
                <th>周二</th>
                <th>周三</th>
                <th>周四</th>
                <th>周五</th>
                <th>周六</th>
                <th>周日</th>
              </tr>
            </thead>
            <tbody
            >
              <tr>
                <td rowspan="2">护士</td>
                <td>张三</td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
              </tr>
              <tr>
                <td>李四</td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
              </tr>
              <tr>
                <td rowspan="3">医生</td>
                <td>张三</td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
              </tr>
              <tr>
                <td>李四</td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
              </tr>
              <tr>
                <td>张三</td>
                  <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
              </tr>
              <tr>
                <td rowspan="3">助理</td>
                <td>张三</td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
              </tr>
              <tr>
                <td>李四</td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
                <td><Icon type="md-close-circle" size="25"/></td>
              </tr>
              <tr>
                <td>张三</td>
                  <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
                <td><Icon type="md-checkmark-circle" size="25"/></td>
              </tr>
              </tbody>
              </table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="data1.length" :current.sync="current" />
              </div>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="warning" class="mr10">保存</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
        <Modal v-model="showCreate" title="添加班次" @on-ok="handleCreate">
      <Form ref="create" :label-width="100">
        <FormItem label="班次名称：">
          <Input />
        </FormItem>
        <FormItem label="上班时间：">
          <Input />
        </FormItem>
        <FormItem label="下班时间：">
          <Input />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                list: [
                    { name: '早班（8:00~14:00）' },
                    { name: '中班（8:00~14:00）' },
                    { name: '晚班（14:00~20:00）' },
                    { name: '夜班（20:00~4:00）' }
                ],
                currentName: '早班（8:00~14:00）',
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
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '用法',
                        key: 'method'
                    },
                    {
                        title: '用量',
                        key: 'useNum'
                    },
                    {
                        title: '条形码',
                        key: 'barCode'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                data1: [
                    {
                        code: 'P00001',
                        name: '痛咖啡',
                        size: '500mg',
                        unti: '片',
                        price: '10.00',
                        num: '20.00',
                        method: '',
                        useNum: '1195.0',
                        barCode: '',
                        remark: ''
                    },
                    {
                        code: 'P00002',
                        name: '止泻药',
                        size: '500mg',
                        unti: '片',
                        price: '10.00',
                        num: '20.00',
                        method: '',
                        useNum: '1195.0',
                        barCode: '',
                        remark: ''
                    }
                ],
                current: 1,
                showCreate: false
            };
        },
        methods: {
            handleOpenCreate () {
                this.showCreate = true
            },
            handleCreate () {

            },
            switchList (name) {
                this.currentName = name
            }
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
.table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  thead tr {
    background-color: #f8f8f9;
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      from(#f2f2f2),
      to(#fafafa)
    );
    background-image: -webkit-linear-gradient(top, #f2f2f2 0, #fafafa 100%);
    background-image: -moz-linear-gradient(top, #f2f2f2 0, #fafafa 100%);
    background-image: -ms-linear-gradient(top, #f2f2f2 0, #fafafa 100%);
    background-image: -o-linear-gradient(top, #f2f2f2 0, #fafafa 100%);
    background-image: -linear-gradient(top, #f2f2f2 0, #fafafa 100%);
    font-size: 12px;
  }
  th,
  td {
    padding: 8px 6px;
    vertical-align: middle;
    border: 1px solid #ddd;
    word-break: break-word;
    word-wrap: break-word;
    line-height: 1.42857143;
    font-size: 12px;
    text-align: center;
  }
}
</style>
<style lang="less">
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
.shift-list {
  height: 265px;
  overflow: auto;
}
.shift-list .ivu-list-item{
  padding: 0;
}
.shift-list .ivu-list-item p{
  padding: 12px 0;
  width: 100%;
}
.shift-list .active {
  background: #69c5d8;
}
</style>
