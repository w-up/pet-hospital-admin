<template>
  <div>
    <Card>
      <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
        <Col span="24">
          <span class="module-title">意见反馈</span>
        </Col>
      </Row>
      <Row class="marBotBig">
        <Col span="24" class="martop15 marbot6">仁华医院 2020年3月17日</Col>
        <Col span="24" class="dashedBor">短信名称可不可以自己编辑呢,方便我们医院使用。谢谢</Col>
        <Col span="24" class="martop15 marbot6">仁华医院 2020年3月17日</Col>
        <Col span="24" class="dashedBor">短信名称可不可以自己编辑呢,方便我们医院使用。谢谢</Col>
        <Col span="24" class="martop15 marbot6">仁华医院 2020年3月17日</Col>
        <Col span="24" class="dashedBor">短信名称可不可以自己编辑呢,方便我们医院使用。谢谢</Col>
        <Col span="24" class="martop15 marbot6">仁华医院 2020年3月17日</Col>
        <Col span="24" class="dashedBor">短信名称可不可以自己编辑呢,方便我们医院使用。谢谢</Col>
        <Col span="24" class="martop15 marbot6">仁华医院 2020年3月17日</Col>
        <Col span="24" class="dashedBor">短信名称可不可以自己编辑呢,方便我们医院使用。谢谢</Col>
      </Row>
    </Card>
  </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        data () {
            return {};
        },
        mounted () {
            let vm = this;
            vm.$nextTick(() => {});
        },
        created () {},
        computed: {},
        methods: {}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.mtb15 {
  margin: 15px 0;
}
.martop15 {
  margin-top: 15px;
}
.marbot6{
  margin-bottom: 6px;
}
.dashedBor{
  border-bottom: 1px dashed #ddd;
    padding-bottom: 11px;
}
.marBotBig{
  margin-bottom: 130px;
}
</style>
<style lang="less">
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
</style>
