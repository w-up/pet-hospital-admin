<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
    import { on, off } from 'view-design/src/utils/dom';
    import { setMatchMedia } from 'view-design/src/utils/assist';

    import { mapMutations } from 'vuex';

    setMatchMedia();

    export default {
        name: 'app',
        provide () { // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
            return {
                reload: this.reload
            }
        },
        data () {
            return {
                isRouterAlive: true // 控制视图是否显示的变量
            }
        },
        methods: {
            ...mapMutations('admin/layout', ['setDevice']),
            handleWindowResize () {
                this.handleMatchMedia();
            },
            handleMatchMedia () {
                const matchMedia = window.matchMedia;

                if (matchMedia('(max-width: 600px)').matches) {
                    this.setDevice('Mobile');
                } else if (matchMedia('(max-width: 992px)').matches) {
                    this.setDevice('Tablet');
                } else {
                    this.setDevice('Desktop');
                }
            },
            reload () {
                this.isRouterAlive = false; // 先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true; // 再打开
                })
            }
        },
        mounted () {
            on(window, 'resize', this.handleWindowResize);
            this.handleMatchMedia();
        },
        beforeDestroy () {
            off(window, 'resize', this.handleWindowResize);
        }
    };
</script>
<style lang="less">
//使所有页面的表格的td和th都居中
.ivu-table-wrapper td {
  text-align: center !important;
}
.ivu-table-wrapper th {
  text-align: center !important;
}
</style>
