<template>
  <div>
    <Card>
      <Row
        class-name="module-title-wrapper"
        style="border:1px solid #ccc;margin-bottom:1px;border-bottom:0"
      >
        <Col span="8">
          <span class="module-title mr10">影像列表</span>
          <Select value="0" placeholder="请选择" v-width="300">
            <Option value="0">全部</Option>
            <Option value="1">未出结果</Option>
            <Option value="2">已出结果</Option>
          </Select>
        </Col>
        <Col span="16" class="ivu-text-right">
          <span class="mr10">开始时间</span>
          <DatePicker type="date" class="mr10" placeholder="开始日期" style="width: 120px"></DatePicker>
          <span class="mr10">结束时间</span>
          <DatePicker type="date" class="mr10" placeholder="结束日期" style="width: 120px"></DatePicker>
          <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
        </Col>
      </Row>
      <Row>
        <Table border :columns="columns1" :data="data1"></Table>
      </Row>
    </Card>

    <!-- 影像检验单 -->
    <Modal v-model="videoCheckModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">影像检验单</Col>
      </p>

      <Row :gutter="16">
        <Col span="6">
          <Row class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">宠物信息</span>
            </Col>
          </Row>
          <Row style="padding:12px;border:1px solid #ccc;">
            <div class="ivu-mb">姓名：夏天</div>
            <div class="ivu-mb">种类：犬</div>
            <div class="ivu-mb">品种：泰迪</div>
            <div class="ivu-mb">性别：母</div>
            <div class="ivu-mb">年龄：0岁11月</div>
            <div class="ivu-mb">体温：</div>
            <div class="ivu-mb">体重：</div>
            <div class="ivu-mb">呼吸：</div>
            <div>心率：</div>
          </Row>
          <Row class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">病历</span>
            </Col>
          </Row>
          <Row style="padding:12px;">
            <div class="ivu-mb">主治医师：王艳</div>
            <div>疑似病例：</div>
          </Row>
        </Col>

        <Col span="18">
          <Row class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">化验单信息</span>
            </Col>
          </Row>
          <Row style="padding:12px;border:1px solid #ccc;">
            <Col span="12" class="ivu-mb">
              <span class="mr10">化验单号：</span>
              <Input style="width:calc(100% - 100px)" />
            </Col>
            <Col span="12" class="ivu-mb">
              <span class="mr10">化验人员</span>
              <Select style="width:calc(100% - 100px)" value="0">
                <Option value="0">王艳</Option>
              </Select>
            </Col>

            <Col span="24" class="ivu-mb ivu-mt">
              <span class="mr10">诊断说明</span>
              <Input style="width:calc(100% - 66px)" type="textarea" :rows="6" />
            </Col>
            <Col span="24" class="ivu-mb" style="margin-top:100px">
              <span style="margin-right:38px">附件</span>
              <Button type="primary" class="mr10">上传本地文件</Button>
              <Button type="info">上传云端文件</Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '时间'
                    },
                    {
                        title: '主人名'
                    },
                    {
                        title: '电话'
                    },
                    {
                        title: '宠物名'
                    },
                    {
                        title: '化验名称',
                        key: 'name'
                    },
                    {
                        title: '部位'
                    },
                    {
                        title: '体位'
                    },
                    {
                        title: '备注'
                    },
                    {
                        title: '意思病症'
                    },
                    {
                        title: '结果'
                    },
                    {
                        title: '付款状态'
                    },
                    {
                        title: '检验单',
                        key: 'price',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.videoCheckModal = true;
                                            }
                                        }
                                    },
                                    '查看'
                                )
                            ]);
                        }
                    },
                    {
                        title: '仪器结果'
                    },
                    {
                        title: '联宠检测'
                    }
                ],
                data1: [
                    {
                        name: '尿液检测'
                    },
                    {}
                ],
                columns2: [
                    {
                        title: '指标名称',
                        key: 'name'
                    },
                    {
                        title: '标准名称',
                        key: 'name1'
                    },
                    {
                        title: '指标单位'
                    },
                    {
                        title: '结果',
                        slot: 'code'
                    },
                    {
                        title: '参考值(犬类/幼年)',
                        width: 160
                    },
                    {
                        title: '备注',
                        slot: 'code'
                    }
                ],
                data2: [
                    {
                        name: '尿糖',
                        name1: 'GLU'
                    },
                    {
                        name: '血细胞',
                        name1: 'BLD'
                    }
                ],
                columns3: [
                    {
                        title: '指标名称',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '标准名称',
                        key: 'name1',
                        width: 100
                    },
                    {
                        title: '指标单位',
                        width: 100
                    },
                    {
                        title: '结果',
                        width: 100
                    },
                    {
                        title: '参考值范围',
                        width: 160
                    },
                    {
                        title: '标识',
                        width: 100
                    },
                    {
                        title: '备注',
                        width: 100
                    }
                ],
                data3: [
                    {
                        name: '尿糖',
                        name1: 'GLU'
                    },
                    {
                        name: '血细胞',
                        name1: 'BLD'
                    }
                ],
                videoCheckModal: false
            };
        },
        methods: {},
        mounted () {}
    };
</script>
<style lang="less" scoped>
</style>
<style lang="less">
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
//使所有页面的表格的td和th都居中
.ivu-table-wrapper td {
  text-align: center;
}
.ivu-table-wrapper th {
  text-align: center;
}

.mymodal .ivu-modal-header {
  background: #f6f6f6;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
/*模块标题*/
.module-title-wrapper {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e9eaec;
  font-weight: 700;
  background-color: #f6f6f6;
  padding: 0 16px;
  margin: 0;
}
</style>
