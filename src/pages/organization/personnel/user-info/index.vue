<template>
  <div>
    <Row>
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="16">
              <span class="module-title">员工列表</span>
            </Col>
            <Col span="8" class="ivu-text-right">
              <Button>高级权限</Button>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="ivu-mt">
            <Col span="24">
              <Input
                prefix="ios-search"
                placeholder="姓名/电话/职位"
                v-model="searchKey"
                @on-change="getUserinfoList"
                clearable
              />
            </Col>
          </Row>
          <Row class="mt6 noplr">
            <Col span="23" offset="1">
              <Tree :data="treeOfUserData" @on-select-change="getChild"></Tree>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">员工明细</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="6" class="text-center">
              <div class="user-info-detail">
                <i-link target="_blank" slot="avatar">
                  <Avatar :src="userInfo.portrait" />
                </i-link>
              </div>
              <Upload
                ref="portrait"
                v-model="userInfo.portrait"
                :action="resource"
                :headers="headers"
                :format="[ 'png', 'jpg', 'jpeg']"
                :max-size="1024*10"
                :on-success="handleHeaderUrlSuccess"
                :on-format-error="handleFileFormatErr"
                :on-exceeded-size="handleFileSizeErr"
                :before-upload="handleBeforeLicenseUrlUpload"
                :show-upload-list="false"
              >
                <Button>更换图片</Button>
              </Upload>
            </Col>
            <Col span="12">
              <Form ref="editForm" :model="userInfo" :rules="rules" :label-width="100">
                <FormItem label="姓名" prop="name">
                  <Input v-model="userInfo.name" placeholder="必填" />
                </FormItem>
                <FormItem label="职位" prop="position" label-for="position">
                  <Select v-model="userInfo.position.code" placeholder="请选择" element-id="position">
                    <Option
                      v-for="(it, index) in positionList"
                      :key="index"
                      :value="it.code"
                    >{{ it.name }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="电话" prop="mobile">
                  <Input v-model="userInfo.mobile" placeholder="请输入" />
                </FormItem>
                <FormItem label="执业兽医师号" prop="count" label-for="count">
                  <Input v-model="userInfo.code" placeholder="请输入" />
                </FormItem>
                <FormItem label="授业恩师" prop="master">
                  <Select v-model="userInfo.master" placeholder="请选择" element-id="master">
                    <Option value="张三">张三</Option>
                    <Option value="李四">李四</Option>
                  </Select>
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
              <Button type="primary" @click="handleUserinfoEdit">编辑</Button>
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
        inject: ['reload'], // 注入App里的reload方法
        data () {
            return {
                treeOfUserData: [],
                resource: this.$store.state.admin.user.resource,
                headers: this.$store.state.admin.user.headers,
                searchKey: '',
                rules: {
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    mobile: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        {
                            type: 'string',
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ],
                    code: [{ required: true, message: '执业兽医师号', trigger: 'blur' }],
                    remark: [
                        { max: 200, message: '备注不得超过200个字符', trigger: 'change' }
                    ]
                },
                positionList: [],
                currentId: '',
                userInfo: {
                    portrait: '',
                    position: {
                        code: ''
                    },
                    master: '张三'
                },
                columns1: [
                    {
                        title: '模块',
                        minWidth: 84,
                        key: 'module'
                    },
                    {
                        title: '项目名称',
                        minWidth: 84,
                        key: 'project'
                    },
                    {
                        title: '查看权限',
                        minWidth: 84,
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
                        minWidth: 84,
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
                ]
            };
        },
        methods: {
            getChild (data, selectedNode) {
                this.$set(selectedNode, 'expand', !selectedNode.expand)// 点击节点文字展开收起
                this.userInfo = data[0]
                if (!this.userInfo.position) {
                    this.userInfo.position = {
                        code: ''
                    }
                }
            },
            handleHeaderUrlSuccess (response, file, fileList) {
                this.$set(this.userInfo, 'portrait', response.data);
            },
            handleFileFormatErr (file) {
                this.$Notice.warning({
                    title: '文件类型错误',
                    desc:
                        '文件  ' + file.name + ' 文件类型错误,请上传png, jpg, jpeg等格式图片.'
                });
            },
            handleFileSizeErr (file) {
                this.$Notice.warning({
                    title: '文件过大',
                    desc: '文件  ' + file.name + ' 过大,不得超过10M.'
                });
            },
            handleBeforeLicenseUrlUpload () {
                this.$refs.portrait.clearFiles();
            },
            getUserinfoList () {
                var data = {
                    searchKey: this.searchKey
                };
                this.$get('/admin/user/hospital/page', data, response => {
                    this.treeOfUserData = []
                    var rtn = response.data.data;
                    // 处理左侧树数据
                    for (var i = 0; i < rtn.length; i++) {
                        var obj = {};
                        obj.title = rtn[i].name;
                        obj.expand = true;
                        obj.minWidth = 84;
                        var childrenList = [];
                        for (var j = 0; j < rtn[i].userBo.data.length; j++) {
                            var child = {};
                            child = rtn[i].userBo.data[j]
                            child.title = rtn[i].userBo.data[j].name +
                                '(' +
                                (rtn[i].userBo.data[j].position ? rtn[i].userBo.data[j].position.name : '') +
                                ')';
                            childrenList.push(child);
                        }
                        obj.children = childrenList;
                        this.treeOfUserData.push(obj);
                    }
                });
            },
            handleUserinfoEdit () {
                if (!this.userInfo.id) {
                    this.$Message.error('请选择左侧树');
                    return false
                }
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.userInfo.type = 'employee';
                        this.userInfo.positionCode = this.userInfo.position.code;
                        delete this.userInfo.position;
                        this.$post('/admin/user/save', this.userInfo, response => {
                            if (response.success) {
                                this.$Message.info('保存成功');
                                this.reload()// 调用局部刷新方法
                            } else {
                                this.$Message.error(response.message);
                            }
                        });
                    } else {
                    }
                });
            },
            getPositonList () {
                this.$get('/admin/user/position/page', {}, response => {
                    this.positionList = response.data.data;
                });
            }
        },
        mounted () {
            this.getUserinfoList();
            this.getPositonList();
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
