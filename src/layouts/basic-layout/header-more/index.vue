<template>
  <div class="i-layout-header-trigger i-layout-header-trigger-min" style="padding:0 0 0 6px">
    <Poptip width="100" placement="bottom" class="morePoptip">
      <Button type="info" size="small">更多</Button>
      <div class="api" slot="content">
        <p class="contentP martb6" @click="helpCenter">帮助中心</p>
        <p class="contentP" @click="feedBack">意见反馈</p>
      </div>
    </Poptip>
    <Modal v-model="helpCenterModal" class="newsModal" width="600px">
      <div slot="header">
        <p style="text-align:center">检查电脑之间是否通信</p>
      </div>
      <div
        class="marfull20"
      >常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问题内容展示区域常见问见问题内容展示区域常见问题内容展示区域</div>
      <div style="text-align:center" class="marfull20">
        <img :src="helpCenterImg" alt />
      </div>
    </Modal>
    <Modal v-model="feedBackModal" class="newsModal" title="意见反馈" width="600px">
      <div
        class="marfull20"
      >
      <p>反馈内容</p>
      <Input type="textarea" :rows='5'></Input>
      </div>
      <div slot="footer">
        <Row>
          <Col span="24">
          <Button @click="feedBackModal=false">取消</Button>
          <Button type="info">提交</Button>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>
<script>
    import { mapState } from 'vuex';

    export default {
        name: 'iHeaderMore',
        data () {
            return {
                helpCenterImg: require('../../../assets/images/default.png'),
                problemTree: [
                    {
                        title: 'A问题',
                        expand: true,
                        children: [
                            {
                                title: 'A1问题',
                                expand: false
                            },
                            {
                                title: 'A2问题',
                                expand: false
                            },
                            {
                                title: 'A3问题',
                                expand: false
                            }
                        ]
                    },
                    {
                        title: 'B问题',
                        expand: true,
                        children: [
                            {
                                title: 'B1问题',
                                expand: false
                            },
                            {
                                title: 'B2问题',
                                expand: false
                            },
                            {
                                title: 'B3问题',
                                expand: false
                            }
                        ]
                    }
                ],
                helpCenterModal: false,
                feedBackModal: false,

                badgeProps: {
                    offset: [20, 0]
                },
                showNewsModal: false,
                newsTypeList: [
                    {
                        name: '消息列表'
                    },
                    {
                        name: '我发送的消息'
                    },
                    {
                        name: '新建消息'
                    }
                ],
                currentName: '我发送的消息',
                myNews: true,
                newsList: false,
                creatNews: false,
                sendTo: '医院一',
                hospitalList: [
                    {
                        name: '医院一'
                    },
                    {
                        name: '医院二'
                    }
                ]
            };
        },
        computed: {
            ...mapState('admin/layout', ['isMobile'])
        },
        methods: {
            helpCenter () {
                this.$Notice.open({
                    title: '帮助中心',
                    duration: 0,
                    render: h => {
                        return h('div', [
                            h('Input', {
                                props: {
                                    prefix: 'ios-search',
                                    placeholder: '请输入问题描述'
                                },
                                style: {
                                    marginTop: '6px'
                                },
                                on: {
                                    'on-change' (event) {}
                                }
                            }),
                            h('Tree', {
                                props: {
                                    data: this.problemTree
                                },
                                style: {
                                    marginTop: '15px'
                                },
                                on: {
                                    'on-change' (event) {}
                                }
                            })
                        ]);
                    }
                })
                this.helpCenterModal = true
            },
            feedBack () {
                this.$Notice.open({
                    title: '帮助中心',
                    duration: 0,
                    render: h => {
                        return h('div', [
                            h('Input', {
                                props: {
                                    prefix: 'ios-search',
                                    placeholder: '请输入问题描述'
                                },
                                style: {
                                    marginTop: '6px'
                                },
                                on: {
                                    'on-change' (event) {}
                                }
                            }),
                            h('Tree', {
                                props: {
                                    data: this.problemTree
                                },
                                style: {
                                    marginTop: '15px'
                                },
                                on: {
                                    'on-change' (event) {}
                                }
                            })
                        ]);
                    }
                })
                this.feedBackModal = true
            }
        }
    };
</script>
<style lang="less" scoped>
.contentP:active,
.contentP:focus,
.contentP:hover {
  background: #69c5d8;
}
.martb6 {
  margin: 6px 0;
}

.news-list {
  height: 265px;
  overflow: auto;
}
.newsModal .ivu-modal-body {
  padding: 0px !important;
}
.marbot10 {
  margin: 10px 0px;
}
.dashedBor {
  border-bottom: 1px dashed #ddd;
  padding-bottom: 10px;
}
.marginLef5 {
  margin-left: 5px;
}
.marTop10 {
  margin-top: 10px;
}
.labelCla {
  margin-bottom: 0px;
}
.marfull20 {
  margin: 20px;
}
</style>
<style lang="less">
.morePoptip .ivu-poptip-body {
  padding: 0;
}

.newsModal .ivu-modal-body {
  padding: 0px;
}
</style>
