<template>
  <div>
    <Row :gutter="16">
      <Col span="6">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">医院列表</span>
            </Col>
          </Row>
          <Row class="mt15">
            <Col span="24">
              <Input prefix="ios-search" placeholder="姓名/电话/职位" />
            </Col>
          </Row>
          <Row class="mt6 noplr">
            <Col span="24">
              <List class="hospital-list">
                <ListItem
                  v-for="(item, index) in hospitalListData"
                  :key="index"
                  :class="currentId==item.id?'active':''"
                >
                  <div @click="showHospital(item);currentId=item.id" class="list">
                    <p>
                      医院名称：{{ item.name }}
                      <span style="margin-left: 7px">
                        <Button size="small" type="success" @click="enableHispital(item.id)" v-if="item.status&&item.status.code==='termination'">启用</Button>
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
              <Button type="info" @click="addHospital">+新增医院</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="error" @click="handleRemoveHospital">删除</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="warning" @click="handleDisableHospital">停用</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">医院信息</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <Card :bordered="false" dis-hover class="ivu-mt">
                <Form
                  ref="form"
                  :model="data"
                  :rules="rules"
                  :label-width="labelWidth"
                  :label-position="labelPosition"
                >
                  <Row :gutter="16">
                    <Col span="20">
                      <Row :gutter="16" type="flex" justify="end">
                        <Col v-bind="grid">
                          <FormItem label="医院名称" prop="name">
                            <Input v-width="'100%'" v-model="data.name" placeholder="必填" />
                          </FormItem>
                        </Col>
                        <Col v-bind="grid">
                          <FormItem label="联系人" prop="contactor">
                            <Input v-width="'100%'" v-model="data.contactor" placeholder="必填" />
                          </FormItem>
                        </Col>
                        <Col v-bind="grid">
                          <FormItem label="联系电话" prop="tel">
                            <Input v-width="'100%'" v-model="data.tel" placeholder="必填" />
                          </FormItem>
                        </Col>
                        <Col v-bind="grid">
                          <FormItem label="院长" prop="manager">
                            <Input v-width="'100%'" v-model="data.manager" placeholder="必填" />
                          </FormItem>
                        </Col>
                        <Col v-bind="grid">
                          <FormItem label="院长电话" prop="managerTel">
                            <Input v-width="'100%'" v-model="data.managerTel" placeholder="必填" />
                          </FormItem>
                        </Col>
                        <Col v-bind="grid">
                          <FormItem label="登录密码" prop="password">
                            <Input v-width="'100%'" v-model="data.password" placeholder="必填" />
                          </FormItem>
                        </Col>
                        <Col span="24">
                          <Col span="2" class="ivu-text-right ivu-text-item">
                              <Checkbox v-model="data.ifShortMessage"></Checkbox>
                          </Col>
                          <Col span="12">
                            <FormItem label="短信医院名称">
                              <Input
                                v-width="'100%'"
                                v-model="data.shortMessageName"
                                placeholder="请输入"
                              />
                            </FormItem>
                          </Col>
                          <Col span="10" class="ivu-text-left ivu-text-item pl16">
                            <span>
                              <code style="color:red">*</code>用于医院短信签名,方便顾客知晓短信发送方
                            </span>
                          </Col>
                        </Col>
                        <Col span="7">
                          <FormItem label="地址" prop="country">
                            <Select v-model="data.country" placeholder="请选择">
                              <Option value="0">中国</Option>
                              <Option value="1">美国</Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col span="5">
                          <FormItem label prop="province" :label-width="0">
                            <Select v-model="data.province" placeholder="请选择">
                              <Option value="0">上海市</Option>
                              <Option value="1">美国</Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col span="6">
                          <FormItem label prop="city" :label-width="0">
                            <Select v-model="data.city" placeholder="请选择">
                              <Option value="0">上海市</Option>
                              <Option value="1">美国</Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col span="6">
                          <FormItem label prop="district" :label-width="0">
                            <Select v-model="data.district" placeholder="请选择">
                              <Option value="0">黄浦区</Option>
                              <Option value="1">美国</Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col span="24">
                          <FormItem label="详细地址" label-for="addressDetail" prop="addressDetail">
                            <Input
                              v-width="'100%'"
                              type="textarea"
                              :rows="4"
                              v-model="data.addressDetail"
                              placeholder="请输入"
                            />
                          </FormItem>
                        </Col>
                        <Col span="24" class="mb20">
                          <span>
                            <code style="color:red">*</code>以下信息用于授权认证管理,用于确保医院证实有效,请您务必上传真实营业执照等信息
                          </span>
                        </Col>
                        <Col v-bind="grid">
                          <FormItem label="*营业执照" prop="licenseUrl" class="hospital-img">
                            <Upload
                              ref="licenseUrl"
                              v-model="data.licenseUrl"
                              :action="resource"
                              :headers="headers"
                              :format="[ 'png', 'jpg', 'jpeg']"
                              :max-size="1024*10"
                              :on-success="handleLicenseUrlSuccess"
                              :on-format-error="handleFileFormatErr"
                              :on-exceeded-size="handleFileSizeErr"
                              :before-upload="handleBeforeLicenseUrlUpload"
                            >
                              <img :src="data.licenseUrl||defaultImg" alt />
                            </Upload>
                          </FormItem>
                        </Col>
                        <Col v-bind="grid">
                          <FormItem label="*身份证正面" prop="idCardFrontUrl" class="hospital-img">
                            <Upload
                              ref="idCardFrontUrl"
                              v-model="data.idCardFrontUrl"
                              :action="resource"
                              :headers="headers"
                              :format="[ 'png', 'jpg', 'jpeg']"
                              :max-size="1024*10"
                              :on-success="handleIdCardFrontUrlSuccess"
                              :on-format-error="handleFileFormatErr"
                              :on-exceeded-size="handleFileSizeErr"
                              :before-upload="handleBeforeIdCardFrontUrlUpload"
                            >
                              <img :src="data.idCardFrontUrl||defaultImg" alt />
                            </Upload>
                          </FormItem>
                        </Col>
                        <Col v-bind="grid">
                          <FormItem label="*身份证反面" prop="idCardBackUrl" class="hospital-img">
                            <Upload
                              ref="idCardBackUrl"
                              v-model="data.idCardBackUrl"
                              :action="resource"
                              :headers="headers"
                              :format="[ 'png', 'jpg', 'jpeg']"
                              :max-size="1024*10"
                              :on-success="handleIdCardBackUrlSuccess"
                              :on-format-error="handleFileFormatErr"
                              :on-exceeded-size="handleFileSizeErr"
                              :before-upload="handleBeforeIdCardBackUrlUpload"
                            >
                              <img :src="data.idCardBackUrl||defaultImg" alt />
                            </Upload>
                          </FormItem>
                        </Col>
                      </Row>
                    </Col>
                    <Col span="4" class="ivu-text-center">
                      <span>LOGO</span>
                      <Upload
                        ref="logoUrl"
                        v-model="data.logoUrl"
                        :action="resource"
                        :headers="headers"
                        :format="[ 'png', 'jpg', 'jpeg']"
                        :max-size="1024*10"
                        :on-success="handleLogoUrlSuccess"
                        :on-format-error="handleFileFormatErr"
                        :on-exceeded-size="handleFileSizeErr"
                        :before-upload="handleBeforeLogoUrlUpload"
                      >
                        <img width="100%" :src="data.logoUrl||defauLtLogo" alt />
                      </Upload>
                    </Col>
                    <Col span="12" class="ivu-text-left">
                      <Button type="default" @click="getCurrentHospitalDetail">刷新</Button>
                    </Col>
                    <Col span="10" class="ivu-text-right">
                      <Button type="info">进入医院管理</Button>
                    </Col>
                    <Col span="2" class="ivu-text-left">
                      <Button
                        type="primary"
                        :loading="loading"
                        @click="handleSubmit"
                      >{{data.id?'编辑':'保存'}}</Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
     <Modal title="删除" v-model="removeModal" @on-ok="removeHospita">
      <div>确认删除吗？</div>
    </Modal>
        <Modal title="停用大区" v-model="disableModal" @on-ok="disableHospital">
      <div>确认停用吗？</div>
    </Modal>
  </div>
</template>
<script>
    import util from '@/libs/util';
    export default {
        name: 'list-table-list',
        inject: ['reload'],
        data () {
            return {
                removeModal: false,
                disableModal: false,
                currentId: '',
                hospitalListData: [],
                resource: this.$store.state.admin.user.resource,
                headers: this.$store.state.admin.user.headers,
                defaultImg: require('../../../../assets/images/default.png'),
                defauLtLogo: require('../../../../assets/images/upload-logo.png'),
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
                collapse: false,
                data: {
                    name: '',
                    contactor: '',
                    tel: '',
                    manager: '',
                    managerTel: '',
                    password: '',
                    shortMessageName: '',
                    ifShortMessage: false,
                    country: '',
                    province: '',
                    city: '',
                    district: '',
                    addressDetail: '',
                    licenseUrl: '',
                    idCardFrontUrl: '',
                    idCardBackUrl: '',
                    logoUrl: ''
                },
                loading: false,
                rules: {
                    name: [
                        { required: true, message: '请输入医院的名称', trigger: 'blur' }
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
                    manager: [
                        { required: true, message: '请输入院长名称', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' }
                    ],
                    managerTel: [
                        { required: true, message: '请输入院长电话', trigger: 'blur' },
                        {
                            type: 'string',
                            pattern: /^\d+$/,
                            message: '请输入数字',
                            trigger: 'change'
                        }
                    ],
                    addressDetail: [
                        { max: 200, message: '详细地址不得超过200个字符', trigger: 'change' }
                    ]
                }
            };
        },
        computed: {
            labelWidth () {
                return this.isMobile ? undefined : 100;
            },
            labelPosition () {
                return this.isMobile ? 'top' : 'right';
            }
        },
        methods: {
            showHospital (item) {
                this.data = JSON.parse(JSON.stringify(item))
                this.$refs.licenseUrl.clearFiles();
                this.$refs.logoUrl.clearFiles();
                this.$refs.idCardFrontUrl.clearFiles();
                this.$refs.idCardBackUrl.clearFiles();
            },
            addHospital () {
                this.data = {};
            },
            getHispitalDetail () {
                this.$get('/admin/hospital/myhospital', {}, response => {
                    this.data = response.data;
                    this.currentId = response.data.id
                });
            },
            getHospitalList () {
                this.$get('/admin/hospital/page', {}, response => {
                    this.hospitalListData = response.data.data;
                    if (this.currentId == null || this.currentId === '') {
                        this.currentId =
                            this.hospitalListData && this.hospitalListData[0].id;
                        this.data = JSON.parse(
                            JSON.stringify(this.hospitalListData && this.hospitalListData[0])
                        );
                    }
                });
            },
            handleSubmit () {
                this.$refs.form.validate(valid => {
                    this.loading = true;
                    if (valid) {
                        delete this.data.status
                        this.$post('/admin/hospital/save', this.data, response => {
                            if (response.success) {
                                this.currentId = response.data.id
                                this.data.id = response.data.id
                                this.$Message.info('保存成功');
                                this.getHospitalList();
                            }
                            this.loading = false;
                        });
                    } else {
                        this.loading = false;
                    }
                });
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
            handleLicenseUrlSuccess (response, file, fileList) {
                this.data.licenseUrl = response.data;
                console.log(this.data.licenseUrl);
            },
            handleBeforeLicenseUrlUpload () {
                this.$refs.licenseUrl.clearFiles();
            },
            handleLogoUrlSuccess (response, file, fileList) {
                this.data.logoUrl = response.data;
                console.log(this.data.logoUrl);
            },
            handleBeforeLogoUrlUpload () {
                this.$refs.logoUrl.clearFiles();
            },
            handleIdCardFrontUrlSuccess (response, file, fileList) {
                this.data.idCardFrontUrl = response.data;
                console.log(this.data.idCardFrontUrl);
            },
            handleBeforeIdCardFrontUrlUpload () {
                this.$refs.idCardFrontUrl.clearFiles();
            },
            handleIdCardBackUrlSuccess (response, file, fileList) {
                this.data.idCardBackUrl = response.data;
                console.log(this.data.idCardBackUrl);
            },
            handleBeforeIdCardBackUrlUpload () {
                this.$refs.idCardBackUrl.clearFiles();
            },
            handleRemoveHospital () {
                if (this.currentId == null || this.currentId === '') {
                    this.$Message.error('请选择要删除的数据');
                    return false;
                }
                this.removeModal = true;
            },
            removeHospita () {
                this.$get(
                    '/admin/hospital/remove/' + this.currentId,
                    {},
                    response => {
                        this.$Message.info('删除成功');
                        this.currentId = ''
                        this.getHospitalList()
                    }
                );
            },
            handleDisableHospital () {
                if (this.currentId == null || this.currentId === '') {
                    this.$Message.error('请选择要停用的数据');
                    return false;
                }
                this.disableModal = true;
            },
            disableHospital () {
                this.$post('/admin/hospital/save', { id: this.currentId, status: 'termination' }, response => {
                    if (response.success) {
                        this.$Message.info('停用成功');
                        this.getHospitalList();
                    }
                });
            },
            enableHispital (id) {
                this.$post('/admin/hospital/save', { id: id, status: 'actived' }, response => {
                    if (response.success) {
                        this.$Message.info('启用成功');
                        this.getHospitalList();
                    }
                });
            },
            getCurrentHospitalDetail () {
                this.$get('/admin/hospital/detail/' + this.currentId, {}, response => {
                    this.data = response.data
                });
            }
        },
        created () {
            this.token = util.cookies.get('token');
            console.log(this.token);
            console.log(this.$store.state.admin.user.resource);
            console.log(this.$store.state.admin.user.headers);
        },
        mounted () {
            this.getHispitalDetail();
            this.getHospitalList();
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
.pl16 {
  padding-left: 16px;
}
.hospital-list {
  height: 570px;
  overflow: auto;
}
.ivu-text-item{
  height: 34px;
  line-height: 34px;
}
</style>
<style lang="less">
</style>
