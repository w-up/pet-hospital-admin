<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
    export default {
        name: 'ParentView',
        components: {},
        data () {
            return {};
        },
        methods: {},
        mounted () {}
    };
</script>
