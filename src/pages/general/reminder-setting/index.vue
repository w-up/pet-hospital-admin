<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">预约提醒</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="mtb10">微信自动发送通知：</Col>
            <Col span="24">
              <Col span="2">
                <Checkbox v-model="settingForm.isRemindWechatAdvance">通知在到期前</Checkbox>
              </Col>
              <Col span="3">
                <InputNumber :max="100" :min="1" v-model="settingForm.remindWechatDays" style="width:100px"></InputNumber>
              </Col>
              <Col span="19">
                <Checkbox v-model="settingForm.isRemindWechatOnSameDay">预约日期当天发送</Checkbox>
              </Col>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="mtb10">短信自动发送通知：</Col>
            <Col span="24">
              <Col span="2">
                <Checkbox v-model="settingForm.isRemindMessageAdvance" >通知在到期前</Checkbox>
              </Col>
              <Col span="3">
                  <InputNumber :max="100" :min="1" v-model="settingForm.remindMessageDays" style="width:100px"></InputNumber>
              </Col>
              <Col span="19">
                <Checkbox v-model="settingForm.isRemindMessageOnSameDay">预约日期当天发送</Checkbox>
              </Col>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row class="mtb15">
      <Col span="24">
        <Card>
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">系统只能提醒</span>
            </Col>
          </Row>
          <Row :gutter="16" type="flex" justify="end" class="mtb15">
            <Col span="24" class="mtb10">微信自动发送通知：</Col>
            <Col span="24" class="mtb10">
              <Checkbox v-model="settingForm.isNegativeStockRemind">负库存提醒(当库存为0时,发生热河消费行为导致库存消耗时报警提醒)</Checkbox>
            </Col>
            <Col span="24" class="mtb10">
              <Checkbox v-model="settingForm.isLowerLimitStockRemind">库存下限报警</Checkbox>
            </Col>
            <Col span="24">
              <Checkbox v-model="settingForm.isLowestPriceRemind">最低售价提醒(当实际销售价格低于最低售价时报警提醒)</Checkbox>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row class="mtb15">
      <Col span="24" class="ivu-text-center">
       <Button type="info" @click="handleSaveSetting">保存</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
    export default {
        name: 'list-table-list',
        data () {
            return {
                settingForm: {
                }
            };
        },
        methods: {
            handleSaveSetting () {
                this.$post('/admin/general/remind/setting/save', this.settingForm, response => {
                    if (response.success) {
                        this.$Message.info('保存成功')
                        this.getSetting()
                    }
                });
            },
            getSetting () {
                this.$get('/admin/general/remind/setting/page', {}, response => {
                    this.settingForm = response.data.data[response.data.data.length - 1]
                });
            }
        },
        mounted () {
            this.getSetting()
        }
    };
</script>
<style lang="less" scoped>

.mtb15 {
  margin: 15px 0;
}
.mtb10{
  margin-bottom: 10px;
}
</style>
<style lang="less">
</style>
