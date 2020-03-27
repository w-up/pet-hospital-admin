<template>
  <div>
    <Row>
      <Col span="6">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">宠物分类</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <List class="pet-list">
                <ListItem
                  v-for="(item, index) in list"
                  :key="index"
                  :class="item.name===currentName?'active':''"
                >
                  <p @click="switchList(item.name)">&nbsp;&nbsp;&nbsp;&nbsp;{{ (index+1)+'、'+item.name }}</p>
                </ListItem>
              </List>
            </Col>
          </Row>
           <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="8" class="ivu-text-center">
              <Button type="success" @click="showAddTypeModal=true">+宠物分类</Button>
            </Col>
            <Col span="8" class="ivu-text-center">
              <Button type="primary" >修改</Button>
            </Col>
             <Col span="8" class="ivu-text-center">
              <Button type="error" >删除</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18" class="box">
        <Card class="ptb0">
          <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
            <Col span="24">
              <span class="module-title">宠物列表</span>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24">
              <h4 class="mb10">权限设置列表</h4>
              <Table border :columns="columns1" :data="data1"></Table>
              <div class="ivu-mt ivu-text-right">
                <Page :total="data1.length" :current.sync="current" />
              </div>
            </Col>
          </Row>
          <Row :gutter="24" type="flex" justify="end" class="mtb15">
            <Col span="24" class="ivu-text-left">
              <Button type="success" class="mr10" @click="handleOpenCreate">+宠物品种</Button>
              <Button type="error" class="mr10" >删除</Button>
              <Button type="primary" >修改</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>

    <Modal v-model="showCreate" title="添加宠物品种" :loading="creating" @on-ok="handleCreate">
      <Form ref="create" :model="createData" :rules="createRules" :label-width="100">
        <FormItem label="品种编号：">
          0003
        </FormItem>
        <FormItem label="品种名称：" prop="desc">
          <Input v-model="createData.desc" placeholder="必填" />
        </FormItem>
        <FormItem label="品种拼音：">
          <Input v-model="createData.desc" />
        </FormItem>
        <FormItem label="说明：">
          <Input v-model="createData.desc" />
        </FormItem>
      </Form>
    </Modal>
       </Modal>
       <Modal v-model="showAddTypeModal" title="添加宠物分类" @on-ok="handleCreateType">
      <Form ref="create" :label-width="150">
        <FormItem label="分类名称">
          <Input style="width:70%" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    export default {
        name: 'list-table-list',
        data () {
            return {
                list: [{ name: '猫类' }, { name: '犬类' }, { name: '其它' }],
                currentName: '猫类',
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        key: 'code'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '拼音',
                        key: 'pinying'
                    }
                ],
                data1: [
                    {
                        code: '0000',
                        name: '黑猫',
                        pinying: 'HM'
                    },
                    {
                        code: '0009',
                        name: '白猫',
                        pinying: 'BM'
                    },
                    {
                        code: '0003',
                        name: '皮皮',
                        pinying: 'PP'
                    }
                ],
                current: 1,
                showCreate: false,
                createData: {
                    desc: ''
                },
                createRules: {
                    desc: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ]
                },
                creating: true,
                showAddTypeModal: false
            };
        },
        methods: {
            handleOpenCreate () {
                this.showCreate = true
            },
            handleCreate () {

            },
            handleCreateType () {

            },
            switchList (name) {
                this.currentName = name
            }
        },
        mounted () {}
    };
</script>
<style lang="less" scoped>
.box {
  padding-left: 15px;
}
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
</style>
<style lang="less">
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
.pet-list {
  height: 265px;
  overflow: auto;
}
.pet-list .ivu-list-item{
  padding: 0;
}
.pet-list .ivu-list-item p{
  padding: 12px 0;
  width: 100%;
}
.pet-list .active {
  background: #69c5d8;
}
</style>
