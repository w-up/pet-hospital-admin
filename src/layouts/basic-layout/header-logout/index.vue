<template>
  <div class="i-layout-header-trigger i-layout-header-trigger-min" @click="handelLogout" style="padding:0 0 0 6px">
    <Button type="primary" size="small">退出</Button>
  </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'iHeaderlogout',
        data () {
            return {
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile',
                'logoutConfirm'
            ])
        },
        methods: {
            ...mapActions('admin/account', [
                'logout'
            ]),
            handelLogout () {
                this.logout({
                    confirm: this.logoutConfirm,
                    vm: this
                });
            }
        }
    };
</script>
<style lang="less" scoped>
</style>
<style lang="less">
</style>
