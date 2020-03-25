<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader :title="'医院信息（'+status+'）'" hidden-breadcrumb />
    </div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form
        ref="form"
        :model="data"
        :rules="rules"
        :label-width="labelWidth"
        :label-position="labelPosition"
      >
      <Row :gutter="24">
      <Col span="20">
        <Row :gutter="24" type="flex" justify="end">
          <Col v-bind="grid">
            <FormItem label="医院注册码：" label-for="name">
              <span>{{data.registerCode}}</span>
            </FormItem>
          </Col>
          <Col v-bind="grid">
            <FormItem label="医院名称" prop="name">
              <Input v-width="'100%'" v-model="data.name" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col v-bind="grid">
            <FormItem label="联系人" prop="contactor">
              <Input v-width="'100%'" v-model="data.contactor" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col v-bind="grid">
            <FormItem label="联系电话" prop="tel">
              <Input v-width="'100%'" v-model="data.tel" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col v-bind="grid">
            <FormItem label="院长" prop="manager">
              <Input v-width="'100%'" v-model="data.manager" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col v-bind="grid">
            <FormItem label="院长电话">
              <Input v-width="'100%'" v-model="data.managerTel" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col v-bind="grid">
            <FormItem label="安装人">
              <Input v-width="'100%'" v-model="data.installer" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col v-bind="grid">
            <FormItem label="短信医院名称">
              <Input v-width="'100%'" v-model="data.shortMessageName" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col v-bind="grid" class="ivu-text-right">
            <Checkbox v-model="data.ifShortMessage">签名</Checkbox>
            <span>
              <code style="color:red">*</code>用于医院短信签名,方便顾客知晓短信发送方
            </span>
          </Col>
          <Col span="6">
            <FormItem label="地址" prop="country">
              <Select v-model="data.country" placeholder="请选择">
                <Option value="0">中国</Option>
                <Option value="1">美国</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
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
            <FormItem label="详细地址" label-for="addressDetail">
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
            <Button type="default" @click="handleReset">刷新</Button>
          </Col>
          <Col span="12" class="ivu-text-right">
            <Button type="primary" :loading="loading" @click="handleSubmit">编辑</Button>
          </Col>
      </Row>
      </Form>
    </Card>
  </div>
</template>
<script>
    import util from '@/libs/util';
    export default {
        name: 'list-table-list',
        data () {
            return {
                resource: this.$store.state.admin.user.resource,
                headers: this.$store.state.admin.user.headers,
                defaultImg: require('../../../assets/images/default.png'),
                defauLtLogo: require('../../../assets/images/upload-logo.png'),
                status: '已授权',
                grid: {
                    xl: 8,
                    lg: 8,
                    md: 12,
                    sm: 24,
                    xs: 24
                },
                collapse: false,
                data: {
                    name: '',
                    registerCode: '',
                    contactor: '',
                    tel: '',
                    manager: '',
                    managerTel: '',
                    installer: '',
                    addressDetail: '',
                    country: '',
                    province: '',
                    city: '',
                    district: '',
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
                    tel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
                    manager: [
                        { required: true, message: '请输入院长名称', trigger: 'blur' }
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
            getHispitalDetail () {
                this.$get('/admin/hospital/myhospital', {}, response => {
                    console.log(response);
                    this.data = response.data;
                });
            },
            handleSubmit () {
                this.$refs.form.validate(valid => {
                    this.loading = true;
                    if (valid) {
                        this.$post('/admin/hospital/save', this.data, response => {
                            console.log(response);
                            if (response.success) {
                                this.$Message.info('保存成功');
                            }
                            this.loading = false;
                        });
                    } else {
                        this.loading = false;
                    }
                });
            },
            handleReset () {
                this.$refs.form.resetFields();
                this.getHispitalDetail();
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
</style>
