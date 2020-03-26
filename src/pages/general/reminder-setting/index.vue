<template>
  <div>
    <Row>
      <Col span="24">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">预约提醒</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24" class="mtb10">微信自动发送通知：</Col>
            <Col span="24">
              <Col span="2">
                <Checkbox>通知在到期前</Checkbox>
              </Col>
              <Col span="3">
                <Input size="small" clearable style="width: 100px" />
              </Col>
              <Col span="19">
                <Checkbox>预约日期当天发送</Checkbox>
              </Col>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24" class="mtb10">短信自动发送通知：</Col>
            <Col span="24">
              <Col span="2">
                <Checkbox>通知在到期前</Checkbox>
              </Col>
              <Col span="3">
                <Input size="small" clearable style="width: 100px" />
              </Col>
              <Col span="19">
                <Checkbox>预约日期当天发送</Checkbox>
              </Col>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row class="mtb15">
      <Col span="24">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">系统只能提醒</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24" class="mtb10">微信自动发送通知：</Col>
            <Col span="24" class="mtb10">
              <Checkbox>负库存提醒(当库存为0时,发生热河消费行为导致库存消耗时报警提醒)</Checkbox>
            </Col>
            <Col span="24" class="mtb10">
              <Checkbox>库存下限报警</Checkbox>
            </Col>
            <Col span="24">
              <Checkbox>最低售价提醒(当实际销售价格低于最低售价时报警提醒)</Checkbox>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
    export default {
        name: 'list-table-list',
        data () {
            return {};
        },
        methods: {},
        mounted () {}
    };
</script>
<style lang="less" scoped>
/*模块标题*/
.module-title-wrapper {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e9eaec;
  font-weight: 700;
  background-color: #fff;
}
.mtb15 {
  margin: 15px 0;
}
.mtb10{
  margin-bottom: 10px;
}
</style>
<style lang="less">
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
</style>
