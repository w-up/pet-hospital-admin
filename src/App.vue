<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
    import { on, off } from 'view-design/src/utils/dom';
    import { setMatchMedia } from 'view-design/src/utils/assist';

    import { mapMutations } from 'vuex';

    setMatchMedia();

    export default {
        name: 'app',
        methods: {
            ...mapMutations('admin/layout', [
                'setDevice'
            ]),
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
            }
        },
        mounted () {
            on(window, 'resize', this.handleWindowResize);
            this.handleMatchMedia();
        },
        beforeDestroy () {
            off(window, 'resize', this.handleWindowResize);
        }
    }
</script>
<style lang="less">
//使所有页面的表格的td和th都居中
.ivu-table-wrapper td {
  text-align: center!important;
}
.ivu-table-wrapper th {
  text-align: center!important;
}
</style>
