<template>
  <div class="page-account">
    <div v-if="showI18n" class="page-account-header">
      <i-header-i18n />
    </div>
    <div class="page-account-container">
      <div class="page-account-top">
        <div class="page-account-top-logo">
          <img src="@/assets/images/logo.png" alt="logo" />
        </div>
        <div class="page-account-top-desc">佳雯宠物医院</div>
      </div>
      <Login @on-submit="handleSubmit">
        <UserName name="account" value="18918660777" />
        <Password name="password" value="123456" enter-to-submit />
        <div class="page-account-auto-login">
          <Checkbox v-model="autoLogin" size="large">{{ $t('page.login.remember') }}</Checkbox>
          <a href>{{ $t('page.login.forgot') }}</a>
        </div>
        <Submit>{{ $t('page.login.submit') }}</Submit>
      </Login>
      <!-- <div class="page-account-other">
                <span>{{ $t('page.login.other') }}</span>
                <img src="@/assets/svg/icon-social-wechat.svg" alt="wechat">
                <img src="@/assets/svg/icon-social-qq.svg" alt="qq">
                <img src="@/assets/svg/icon-social-weibo.svg" alt="weibo">
                <router-link class="page-account-register" :to="{ name: 'register' }">{{ $t('page.login.signup') }}</router-link>
      </div>-->
    </div>
    <i-copyright />
  </div>
</template>
<script>
    import iCopyright from '@/components/copyright';
    import mixins from '../mixins';
    import util from '@/libs/util';
    import request from '@/plugins/request';

    export default {
        mixins: [mixins],
        components: { iCopyright },
        data () {
            return {
                autoLogin: true
            };
        },
        methods: {
            /**
             * @description 登录
             * 表单校验已有 iView Pro 自动完成，如有需要修改，请阅读 iView Pro 文档
             */
            handleSubmit (valid, values) {
                if (valid) {
                    const { account, password } = values;
                    var data = {
                        account: account,
                        password: password
                    };
                    request({ url: '/server/sso/auth/login', method: 'post', data }).then(
                        res => {
                            util.cookies.set('token', res.token);
                            // 首次登录需要重新赋值
                            this.$store.state.admin.user.headers = {
                                'X-TENANT-ID': 'jiawen:pethos@2020',
                                authorization: 'Bearer ' + res.token
                            };
                            this.getMyhospital()
                        }
                    );
                }
            },
            getMyhospital () {
                this.$get('/admin/hospital/myhospital', {}, response => {
                    if (response.data.status.code === 'termination') {
                        this.$Message.error(response.data.name + '医院已停用，请联系管理员重新启用！');
                        return false
                    }
                    if (response.data.adminType) { // 总部端，如果adminType为true时，允许登录，如果不为true，则提示登录医院端
                        this.$Message.info('登录成功！');
                        // 重定向对象不存在则返回顶层路径
                        this.$router.replace(this.$route.query.redirect || '/');
                    } else {
                        this.$Message.error('请登录医院端');
                    }
                })
            }
        }
    };
</script>
