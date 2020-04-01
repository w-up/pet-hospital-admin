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
                <ListItem
                  v-for="(item, index) in list"
                  :key="index"
                  :class="item.name===currentName?'active':''"
                >
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
              <Button type="primary">编辑</Button>
            </Col>
            <Col span="7" class="ivu-text-center">
              <Button type="error">删除</Button>
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
                <tbody v-for="(item, index) in memberList" :key="index">
                  <tr>
                    <td :rowspan="item.list.length">{{item.position}}</td>
                    <td>{{item.list[0].name}}</td>
                    <td @click="item.list[0].monday=!item.list[0].monday">
                      <Icon v-if="item.list[0].monday" type="md-checkmark-circle" size="25" />
                      <Icon v-else type="md-close-circle" size="25" />
                    </td>
                    <td @click="item.list[0].tuesday=!item.list[0].tuesday">
                      <Icon v-if="item.list[0].tuesday" type="md-checkmark-circle" size="25" />
                      <Icon v-else type="md-close-circle" size="25" />
                    </td>
                    <td @click="item.list[0].wednesday=!item.list[0].wednesday">
                      <Icon v-if="item.list[0].wednesday" type="md-checkmark-circle" size="25" />
                      <Icon v-else type="md-close-circle" size="25" />
                    </td>
                    <td @click="item.list[0].thursday=!item.list[0].thursday">
                      <Icon v-if="item.list[0].thursday" type="md-checkmark-circle" size="25" />
                      <Icon v-else type="md-close-circle" size="25" />
                    </td>
                    <td @click="item.list[0].friday=!item.list[0].friday">
                      <Icon v-if="item.list[0].friday" type="md-checkmark-circle" size="25" />
                      <Icon v-else type="md-close-circle" size="25" />
                    </td>
                    <td @click="item.list[0].saturday=!item.list[0].saturday">
                      <Icon v-if="item.list[0].saturday" type="md-checkmark-circle" size="25" />
                      <Icon v-else type="md-close-circle" size="25" />
                    </td>
                    <td @click="item.list[0].sunday=!item.list[0].sunday">
                      <Icon v-if="item.list[0].sunday" type="md-checkmark-circle" size="25" />
                      <Icon v-else type="md-close-circle" size="25" />
                    </td>
                  </tr>
                  <template v-if="item.list.length>1" v-for="(item2,index2) in item.list">
                    <tr v-if="index2>0" :key="index2">
                      <td>{{item2.name}}</td>
                      <td @click="item2.monday=!item2.monday">
                        <Icon v-if="item2.monday" type="md-checkmark-circle" size="25" />
                        <Icon v-else type="md-close-circle" size="25" />
                      </td>
                      <td @click="item2.tuesday=!item2.tuesday">
                        <Icon v-if="item2.tuesday" type="md-checkmark-circle" size="25" />
                        <Icon v-else type="md-close-circle" size="25" />
                      </td>
                      <td @click="item2.wednesday=!item2.wednesday">
                        <Icon v-if="item2.wednesday" type="md-checkmark-circle" size="25" />
                        <Icon v-else type="md-close-circle" size="25" />
                      </td>
                      <td @click="item2.thursday=!item2.thursday">
                        <Icon v-if="item2.thursday" type="md-checkmark-circle" size="25" />
                        <Icon v-else type="md-close-circle" size="25" />
                      </td>
                      <td @click="item2.friday=!item2.friday">
                        <Icon v-if="item2.friday" type="md-checkmark-circle" size="25" />
                        <Icon v-else type="md-close-circle" size="25" />
                      </td>
                      <td @click="item2.saturday=!item2.saturday">
                        <Icon v-if="item2.saturday" type="md-checkmark-circle" size="25" />
                        <Icon v-else type="md-close-circle" size="25" />
                      </td>
                      <td @click="item2.sunday=!item2.sunday">
                        <Icon v-if="item2.sunday" type="md-checkmark-circle" size="25" />
                        <Icon v-else type="md-close-circle" size="25" />
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="memberList.length" :current.sync="current" />
              </div>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="warning">保存</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="showCreate" title="添加班次" @on-ok="handleCreate">
      <Form ref="create" :label-width="170">
        <FormItem label="班次名称：">
          <Input style="width:194px" />
        </FormItem>
        <FormItem label="上班时间：">
          <TimePicker :steps="[1, 5]" format="HH:mm"></TimePicker>
        </FormItem>
        <FormItem label="下班时间：">
          <TimePicker :steps="[1, 5]" format="HH:mm"></TimePicker>
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
                memberList: [
                    {
                        position: '护士',
                        list: [
                            {
                                name: '张三',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            },
                            {
                                name: '李四',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            }
                        ]
                    },
                    {
                        position: '医生',
                        list: [
                            {
                                name: '张三',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            },
                            {
                                name: '李四',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            },
                            {
                                name: '张三',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            }
                        ]
                    },
                    {
                        position: '医生',
                        list: [
                            {
                                name: '张三',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            },
                            {
                                name: '李四',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            },
                            {
                                name: '张三',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            }
                        ]
                    },
                    {
                        position: '助理',
                        list: [
                            {
                                name: '李四',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            },
                            {
                                name: '张三',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            },
                            {
                                name: '李四',
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true
                            }
                        ]
                    }
                ],
                current: 1,
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
.shift-list {
  height: 265px;
  overflow: auto;
}
.shift-list .ivu-list-item {
  padding: 0;
}
.shift-list .ivu-list-item p {
  padding: 12px 0;
  width: 100%;
}
.shift-list .active {
  background: #02ada4;
  color: #fff;
}
</style>
