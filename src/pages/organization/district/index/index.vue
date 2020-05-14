<template>
  <div>
    <Row :gutter="16">
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">大区列表</span>
            </Col>
          </Row>
          <Row class="mt15">
            <Col span="24">
              <Input
                prefix="ios-search"
                placeholder="大区名称/负责人姓名"
                v-model="keywords"
                clearable
                @on-change="getDistrictList"
              />
            </Col>
          </Row>
          <Row class="mt6 noplr">
            <Col span="24">
              <List class="hospital-list">
                <p
                  class="ivu-text-center mt10"
                  v-if="districtListData==null||districtListData.length==0"
                >暂无数据</p>
                <ListItem
                  v-else
                  v-for="(item, index) in districtListData"
                  :key="index"
                  :class="currentId==item.id?'active':''"
                >
                  <div @click="showDistrict(item)" class="list">
                    <p>
                      大区名称：{{ item.name }}
                      <span style="margin-left: 7px">
                        <Button size="small" type="success" @click="enableDistrict(item.id)" v-if="item.status&&item.status.code==='termination'">启用</Button>
                      </span>
                    </p>
                    <p>院长：{{ item.contactor }}</p>
                    <p>电话：{{ item.tel }}</p>
                  </div>
                </ListItem>
              </List>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="info" @click="addDistrict">+新增大区</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="error" @click="handleRemoveDistrict">删除</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="warning" @click="handleDisableDistrict">停用</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">大区信息</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Card :bordered="false" dis-hover class="ivu-mt">
                <Form ref="form" :model="data" :rules="rules" :label-width="100">
                  <FormItem label="大区名称" prop="name">
                    <Input v-width="300" v-model="data.name" placeholder="必填" />
                  </FormItem>
                  <FormItem label="联系人" prop="contactor">
                    <Input v-width="300" v-model="data.contactor" placeholder="必填" />
                  </FormItem>
                  <FormItem label="联系电话" prop="tel">
                    <Input v-width="300" v-model="data.tel" placeholder="必填" />
                  </FormItem>
                  <FormItem label="登录密码" prop="password">
                    <Input
                      v-width="300"
                      v-model="data.password"
                      type="password"
                      password
                      placeholder="必填"
                    />
                  </FormItem>
                </Form>
                <Row style="margin-top:270px">
                  <Col span="24" class="ivu-text-right">
                    <Button type="primary" @click="handleSubmit">{{data.id?'编辑':'保存'}}</Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal title="删除" v-model="removeModal" @on-ok="removeDistrict">
      <div>确认删除吗？</div>
    </Modal>
    <Modal title="停用大区" v-model="disableModal" @on-ok="disableDistrict">
      <div>确认停用吗？</div>
    </Modal>
  </div>
</template>
<script>
    export default {
        name: 'district-list',
        inject: ['reload'],
        data () {
            return {
                grid: {
                    xl: 8,
                    lg: 8,
                    md: 12,
                    sm: 24,
                    xs: 24
                },
                gridForTip: {
                    xl: 16,
                    lg: 16,
                    md: 12,
                    sm: 24,
                    xs: 24
                },
                currentId: '',
                districtListData: [],
                data: {
                    id: '',
                    name: '',
                    contactor: '',
                    tel: '',
                    password: '',
                    status: 'normal'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入大区的名称', trigger: 'blur' }
                    ],
                    contactor: [
                        { required: true, message: '请输入联系人', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        {
                            type: 'string',
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' }
                    ]
                },
                keywords: '',
                disableModal: false,
                removeModal: false
            };
        },
        computed: {},
        methods: {
            showDistrict (item) {
                this.currentId = item.id;
                this.$refs.form.resetFields();
                this.data = JSON.parse(JSON.stringify(item));
                this.data.status = this.data.status && this.data.status.code;
            },
            addDistrict () {
                this.$refs.form.resetFields();
                this.data.id = '';
            },
            getDistrictList () {
                this.$get(
                    '/admin/district/search',
                    { limit: 100, keywords: this.keywords },
                    response => {
                        this.districtListData = response.data;
                        if (this.currentId == null || this.currentId === '') {
                            this.currentId =
                                this.districtListData && this.districtListData[0].id;
                            this.data = JSON.parse(
                                JSON.stringify(this.districtListData && this.districtListData[0])
                            );
                            this.data.status = this.data.status && this.data.status.code;
                        }
                    }
                );
            },
            handleSubmit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$post('/admin/district/save', this.data, response => {
                            if (response.success) {
                                this.currentId = response.data.id
                                this.data.id = response.data.id
                                this.$Message.info('保存成功');
                                this.getDistrictList();
                            }
                        });
                    }
                });
            },
            handleRemoveDistrict () {
                if (this.currentId == null || this.currentId === '') {
                    this.$Message.error('请选择要删除的数据');
                    return false;
                }
                this.removeModal = true;
            },
            removeDistrict () {
                this.$get(
                    '/admin/district/remove/' + this.currentId,
                    {},
                    response => {
                        this.$Message.info('删除成功');
                        this.reload()
                    }
                );
            },
            handleDisableDistrict () {
                if (this.currentId == null || this.currentId === '') {
                    this.$Message.error('请选择要停用的数据');
                    return false;
                }
                this.disableModal = true;
            },
            disableDistrict () {
                this.$post('/admin/district/save', { id: this.currentId, status: 'termination' }, response => {
                    if (response.success) {
                        this.$Message.info('停用成功');
                        this.getDistrictList();
                    }
                });
            },
            enableDistrict () {
                this.$post('/admin/district/save', { id: this.currentId, status: 'normal' }, response => {
                    if (response.success) {
                        this.$Message.info('启用成功');
                        this.getDistrictList();
                    }
                });
            }
        },
        created () {},
        mounted () {
            this.getDistrictList();
        }
    };
</script>
<style lang="less" scoped>
.mb20 {
  margin-bottom: 20px;
}
.hospital-img img {
  width: 100%;
}

.mtb15 {
  margin: 15px 0;
}
.mt15 {
  margin: 15px 0 0;
}
.hospital-list {
  height: 470px;
  overflow: auto;
}
</style>
<style lang="less">
</style>
