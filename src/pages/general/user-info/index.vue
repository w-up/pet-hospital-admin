<template>
  <div>
    <Row>
      <Col span="6">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="16">
              <span class="module-title">员工列表</span>
            </Col>
            <Col span="8" class="ivu-text-right">
              <Button>高级权限</Button>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Input prefix="ios-search" placeholder="姓名/电话/职位" />
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <List class="ivu-mt user-info-list">
                <ListItem v-for="(item, index) in data" :key="index">
                  <div class="user-info-avatar">
                    <i-link :to="item.userLink" target="_blank" slot="avatar">
                      <Avatar :src="item.avatar" />
                    </i-link>
                  </div>
                  <div>
                    <p>姓名：{{ item.name }}</p>
                    <p>职位：{{ item.position?item.position.name:'' }}</p>
                    <p>电话：{{ item.mobile }}</p>
                  </div>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="12" class="ivu-text-left">
              <Button type="error">删除</Button>
            </Col>
            <Col span="12" class="ivu-text-right">
              <Button type="primary" @click="handleOpenCreate">+新增员工</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">员工明细</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="6" class="text-center">
              <div class="user-info-detail">
                <i-link :to="userInfo.userLink" target="_blank" slot="avatar">
                  <Avatar :src="userInfo.avatar" />
                </i-link>
              </div>
              <Button>更换图片</Button>
            </Col>
            <Col span="12">
              <Form ref="form" :model="userInfo" :label-width="100">
                <FormItem label="姓名" prop="name">
                  <Input v-model="userInfo.name" placeholder="请输入" />
                </FormItem>
                <FormItem label="职位" prop="position" label-for="position">
                  <Select v-model="userInfo.position" placeholder="请选择" element-id="position">
                    <Option value="医生">医生</Option>
                    <Option value="护士">护士</Option>
                  </Select>
                </FormItem>
                <FormItem label="电话" prop="mobile">
                  <Input v-model="userInfo.mobile" placeholder="请输入" />
                </FormItem>
                <FormItem label="执业兽医师号" prop="count" label-for="count">
                   <Input v-model="userInfo.code" placeholder="请输入" />
                </FormItem>
                <FormItem label="授业恩师" prop="master">
                   <Input v-model="userInfo.master" placeholder="请输入" />
                </FormItem>
                <FormItem label="密码" prop="password">
                 <Input v-model="userInfo.password" placeholder="请输入" />
                </FormItem>
                <FormItem label="备注" prop="count" label-for="count">
                  <Input v-model="userInfo.remark" type="textarea" placeholder="请输入" />
                </FormItem>
              </Form>
            </Col>
            <Col span="6"></Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <h4 class="mb10">权限设置列表</h4>
              <Table border :columns="columns1" :data="data1"></Table>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-right">
              <Button type="primary">编辑</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="showCreate" title="新增员工" @on-ok="handleUserinfoCreate">
      <Form ref="create" :model="newUserInfo" :label-width="100">
        <FormItem label="姓名：" prop="name">
          <Input v-model="newUserInfo.name" placeholder="请输入" />
        </FormItem>
        <FormItem label="职位：" prop="positionCode">
          <Select v-model="newUserInfo.positionCode">
        <Option v-for="(it, index) in positionList" :key="index" :value="it.code">{{it.name}}</Option>
      </Select>
        </FormItem>
        <FormItem label="电话：" prop="mobile">
          <Input v-model="newUserInfo.mobile" placeholder="请输入" />
        </FormItem>
        <FormItem label="执业兽医师号：" prop="code">
          <Input v-model="newUserInfo.code" placeholder="请输入" />
        </FormItem>
        <FormItem label="授业恩师：" prop="master">
          <Input v-model="newUserInfo.master" placeholder="请输入" />
        </FormItem>
        <FormItem label="登录密码：" prop="password">
          <Input v-model="newUserInfo.password" placeholder="请输入" />
        </FormItem>
        <FormItem label="备注：" prop="remark">
          <Input v-model="newUserInfo.remark" placeholder="请输入" />
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
                positionList: [],
                newUserInfo: {
                },
                data: [],
                userInfo: {},
                columns1: [
                    {
                        title: '模块',
                        key: 'module'
                    },
                    {
                        title: '项目名称',
                        key: 'project'
                    },
                    {
                        title: '查看权限',
                        key: 'view',
                        render: (h, params) => {
                            return h('div', [
                                h('checkbox', {
                                    props: {
                                        value: params.row.view
                                    },
                                    // style: {
                                    //     display: params.row.view ? 'none' : ''
                                    // },
                                    on: {
                                        'on-change': () => {
                                            // this.reviewFeedback(this.feedbackPageList[params.index].id)
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '操作权限',
                        key: 'edit',
                        render: (h, params) => {
                            return h('div', [
                                h('checkbox', {
                                    props: {
                                        value: params.row.edit
                                    },
                                    // style: {
                                    //     display: params.row.view ? 'none' : ''
                                    // },
                                    on: {
                                        'on-change': () => {
                                            // this.reviewFeedback(this.feedbackPageList[params.index].id)
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        module: '顾客中心',
                        project: '首页管理',
                        view: true,
                        edit: true
                    },
                    {
                        module: '顾客中心',
                        project: '登记办卡',
                        view: true,
                        edit: false
                    },
                    {
                        module: '顾客中心',
                        project: '首页管理',
                        view: false,
                        edit: true
                    },
                    {
                        module: '顾客中心',
                        project: '登记办卡',
                        view: false,
                        edit: false
                    },
                    {
                        module: '顾客中心',
                        project: '首页管理',
                        view: true,
                        edit: false
                    }
                ],
                showCreate: false
            };
        },
        methods: {
            getUserinfoList () {
                this.loading = true;
                this.$get(
                    '/admin/user/page',
                    {
                        // start: this.current - 1,
                        // size: this.size
                    },
                    response => {
                        this.loading = false;
                        this.total = response.data.totalElements;
                        this.data = response.data.data;
                    }
                );
            },
            // getData () {
            //     setTimeout(() => {
            //         this.data = listData;
            //         this.userInfo = listData[0];
            //     }, 1000);
            // },
            handleOpenCreate () {
                this.showCreate = true
            },
            handleUserinfoCreate () {
                // this.$create.form.validate(valid => {
                // console.log(valid);
                // if (valid) {
                this.newUserInfo.type = 'employee';
                console.log(this.newUserInfo)
                this.$post('/admin/user/save', this.newUserInfo, response => {
                    console.log(response);
                    if (response.success) {
                        this.$Message.info('保存成功');
                    }
                    this.loading = false;
                });
                //     } else {
                //         this.loading = false;
                //     }
                // });
            },
            getPositonList () {
                this.$get(
                    '/admin/user/position/page',
                    {},
                    response => {
                        this.positionList = response.data.data;
                    }
                )
            }
        },
        mounted () {
            this.getUserinfoList();
            this.getPositonList()
        }
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
.user-info-list {
  height: 570px;
  overflow: auto;
}
.user-info-avatar {
  margin: 0 32px 0 16px;
}
.user-info-avatar .ivu-avatar-default {
  width: 60px;
  height: 60px;
}
.text-center {
  text-align: center;
}
.user-info-detail {
  margin: 36px 16px;
}
.user-info-detail .ivu-avatar-default {
  width: 120px;
  height: 120px;
}
</style>
