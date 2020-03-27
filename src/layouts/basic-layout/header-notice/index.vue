<template>
  <div class="i-layout-header-trigger i-layout-header-trigger-min" @click="showNewsModal=true">
    <Button type="primary" size="small">消息</Button>
    <Modal v-model="showNewsModal" title="消息通信" class="newsModal" width="700px">
      <Row>
        <Col span="5" style="border-right: 1px solid #e8eaec;">
          <List class="news-list" size="small">
            <ListItem
              v-for="(item, index) in newsTypeList"
              :key="index"
              :class="item.name===currentName?'active':''"
            >
              <p @click="switchList(item.name)">&nbsp;&nbsp;&nbsp;{{ item.name }}</p>
            </ListItem>
          </List>
        </Col>
        <Col span="19" style="padding:10px" v-if="!creatNews">
          <Row>
            <Col span="4">消息标题</Col>
            <Col span="20" class="ivu-text-right">时间</Col>
            <Col span="24" class="ivu-text-left marbot10 dashedBor">这里是消息正文内容</Col>
          </Row>
          <Row>
            <Col span="24">
              <span>发送对象</span>
              <Button size="small" class="marginLef5" v-if="myNews">优盟宠物医院</Button>
              <Button size="small" class="marginLef5" v-if="myNews">优盟宠物医院</Button>
              <Button size="small" class="marginLef5" v-if="myNews">优盟宠物医院</Button>
              <Button size="small" class="marginLef5" v-if="newsList">总部</Button>
            </Col>
          </Row>
          <Row class="marbot10">
            <Col span="6">
              <span>五一活动通知</span>
            </Col>
            <Col span="18" class="ivu-text-right">
              <span>2020-03-11 15:00</span>
            </Col>
          </Row>
          <Row class="marbot10">
            <Col span="24" class="dashedBor">
              <span>五一节就要到了,请各院做好活动准备。</span>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <span>发送对象</span>
              <Button size="small" class="marginLef5" v-if="myNews">优盟宠物医院</Button>
              <Button size="small" class="marginLef5" v-if="myNews">优盟宠物医院</Button>
              <Button size="small" class="marginLef5" v-if="myNews">优盟宠物医院</Button>
              <Button size="small" class="marginLef5" v-if="newsList">总部</Button>
            </Col>
          </Row>
        </Col>
        <Col span="19" style="padding:10px" v-if="creatNews">
          <Form :label-width="75" class="myform">
            <FormItem label="消息标题">
              <Input placeholder="必填" />
            </FormItem>
            <FormItem label="消息内容">
              <Input placeholder="必填" type="textarea" :rows="4" />
            </FormItem>
            <FormItem :label-width="6" class="labelCla">
              发送对象(可多选)
            </FormItem>
            <!-- <Row>发送对象(可多选)</Row> -->
              <FormItem :label-width="6">
              <Select v-model="sendTo" multiple>
                <Option
                  v-for="item in hospitalList"
                  :value="item.name"
                  :key="item.name"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
            <!-- <Row>
              <Select v-model="sendTo" multiple>
                <Option
                  v-for="item in hospitalList"
                  :value="item.name"
                  :key="item.name"
                >{{ item.name }}</Option>
              </Select>
            </Row> -->
          </Form>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="info" v-if="creatNews">发送</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
    import { mapState } from 'vuex';

    export default {
        name: 'iHeaderNotice',
        data () {
            return {
                badgeProps: {
                    offset: [20, 0]
                },
                showNewsModal: false,
                newsTypeList: [
                    {
                        name: '消息列表'
                    },
                    {
                        name: '我发送的消息'
                    },
                    {
                        name: '新建消息'
                    }
                ],
                currentName: '我发送的消息',
                myNews: true,
                newsList: false,
                creatNews: false,
                sendTo: '医院一',
                hospitalList: [
                    {
                        name: '医院一'
                    },
                    {
                        name: '医院二'
                    }
                ]
            };
        },
        computed: {
            ...mapState('admin/layout', ['isMobile'])
        },
        methods: {
            switchList (name) {
                this.currentName = name;
                if (name === '我发送的消息') {
                    this.myNews = true;
                    this.newsList = false;
                    this.creatNews = false;
                }
                if (name === '消息列表') {
                    this.newsList = true;
                    this.myNews = false;
                    this.creatNews = false;
                }
                if (name === '新建消息') {
                    this.creatNews = true;
                    this.myNews = false;
                    this.newsList = false;
                }
            }
        }
    };
</script>
<style lang="less" scoped>
.news-list {
  height: 265px;
  overflow: auto;
}
.news-list .ivu-list-item {
  padding: 0;
}
.news-list .ivu-list-item p {
  padding: 12px 0;
  width: 100%;
}
.news-list .active {
  background: #69c5d8;
}
.newsModal .ivu-modal-body {
  padding: 0px !important;
}
.marbot10 {
  margin: 10px 0px;
}
.dashedBor {
  border-bottom: 1px dashed #ddd;
  padding-bottom: 10px;
}
.marginLef5 {
  margin-left: 5px;
}
.marTop10{
    margin-top: 10px;
}
.labelCla{
    margin-bottom: 0px;
}
</style>
<style lang="less">
.newsModal .ivu-modal-body {
  padding: 0px;
}
</style>
