<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Row>
        <Col span="17">
          <Tag
            v-for="(item,index) in count"
            checkable
            :key="item"
            :name="item"
            size="large"
            :class="['mytag',index==count.length-1?'lasttag':'',index==currentTag?'activetag':'']"
            closable
            @on-change="handleClick(item,index)"
            @on-close="handleClose"
          >{{ item }}</Tag>
          <Button type="primary" class="ml30" @click="handleAdd">新增顾客</Button>
          <!-- 顾客信息-start -->
          <Card class="ivu-mt mycard">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="16">
                <span class="module-title">顾客信息&nbsp;&nbsp;&nbsp;&nbsp;登记日期：2020-03-03</span>
              </Col>
              <Col span="8" class="ivu-text-right">
                <Button type="primary" size="small" class="mr10" @click="handleEditMemberModal">修改</Button>
                <Button type="warning" size="small" class="mr10" @click="handleAddLabelModal">贴标签</Button>
                <Button type="error" size="small" @click="handleAddBlacklistModal">加入黑名单</Button>
              </Col>
            </Row>
            <Row>
              <Col span="20">
                <Row :gutter="16" type="flex">
                  <Col span="5">顾客姓名：张三</Col>
                  <Col span="4">性别：女</Col>
                  <Col span="5">电话：14483784787</Col>
                  <Col span="5">邮箱：/</Col>
                  <Col span="5">了解途径：/</Col>
                </Row>
                <Row :gutter="16" type="flex" class="mt32">
                  <Col span="5">顾客年龄：24</Col>
                  <Col span="14">地址：上海市黄浦区九江路888号C23</Col>
                  <Col span="5">顾客扫码开启微信提醒</Col>
                </Row>
                <Row :gutter="16" type="flex" class="mt32">
                  <Col span="24">
                    顾客标签：
                    <Tag color="success" class="mr10">随和</Tag>
                    <Tag color="warning" class="mr10">大方</Tag>
                    <Tag color="magenta" class="mr10">土豪</Tag>
                  </Col>
                </Row>
              </Col>
              <Col span="4" class="ivu-text-center ivu-mt">
                <img class="code-img" src="../../../assets/images/code.png" alt />
              </Col>
            </Row>
          </Card>
          <!-- 顾客信息-end -->

          <!-- 宠物列表-start -->
          <Card class="ivu-mt mycard">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="16">
                <span class="module-title">宠物列表</span>
              </Col>
              <Col span="8" class="ivu-text-right">
                <Button type="warning" size="small" class="mr10">删除</Button>
                <Button type="success" size="small" class="mr10" @click="handleViewPetInfoModal">查看</Button>
                <Button type="primary" size="small">添加宠物</Button>
              </Col>
            </Row>
            <Row>
              <Col span="9" class="pd16">
                <div class="mypet">
                  <Row :gutter="16" type="flex">
                    <Col span="11">编号：021</Col>
                    <Col span="13">
                      <Tag color="success" class="mr10">已免疫</Tag>
                      <Tag color="warning">已驱虫</Tag>
                    </Col>
                    <Col span="11">名字：小红（母）</Col>
                    <Col span="13">种类：犬</Col>
                    <Col span="11">品种：巨贵</Col>
                    <Col span="13">年龄：1月2日</Col>
                    <Col span="11">毛色：红色</Col>
                    <Col span="13">
                      体重：25kg
                      <Button type="primary" size="small">称重</Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>
          <!-- 宠物列表-end -->

          <!-- 会员卡\次卡列表-start -->
          <Card class="ivu-mt mycard">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="8">
                <span class="module-title">会员卡\次卡列表</span>
              </Col>
              <Col span="16" class="ivu-text-right">
                <Button
                  type="warning"
                  size="small"
                  class="mr10"
                  @click="handleViewUseRecordModal"
                >使用记录</Button>
                <Button type="default" size="small" class="mr10">积分兑换</Button>
                <Button type="primary" size="small" class="mr10" @click="handleCardRechargeModal">充值</Button>
                <Button type="error" size="small" class="mr10" @click="handleRefundCardModal">退卡</Button>
                <Button type="info" size="small" class="mr10" @click="handleAddCardModal">添加会员卡</Button>
                <Button type="success" size="small">连锁卡管理</Button>
              </Col>
            </Row>
            <Row>
              <Col span="9" class="pd16">
                <div class="mypet">
                  <Row :gutter="16" type="flex">
                    <Col span="11">卡号：123123</Col>
                    <Col span="13">
                      <Tag color="success" class="mr10">已免疫</Tag>
                      <Tag color="warning">已驱虫</Tag>
                    </Col>
                    <Col span="11">类型：普通卡</Col>
                    <Col span="13">发卡时间：2020-03-03</Col>
                    <Col span="11">余额：100.00</Col>
                    <Col span="13">赠额：50.00</Col>
                    <Col span="11">积分：100</Col>
                    <Col span="13">
                      体重：25kg
                      <Button type="primary" size="small">称重</Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>
          <!-- 会员卡\次卡列表-end -->

          <Row :gutter="24" type="flex" justify="end" class="ivu-mt">
            <Col span="12" class="ivu-text-left">
              <Button type="primary" class="mr10" @click="handleAddDepositModal">押金</Button>
              <Button type="info" @click="handleCostHistoryModal">个人消费历史查询</Button>
            </Col>
            <Col span="12" class="ivu-text-right">
              <Button type="success" class="mr10" @click="handleAddQuickAppointmentModal">快速预约</Button>
              <Button type="warning">快速挂号</Button>
            </Col>
          </Row>
        </Col>
        <Col span="6" offset="1">
          <Card class="mycard">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="16">
                <span class="module-title">顾客列表</span>
              </Col>
              <Col span="8" class="ivu-text-right">
                <Button size="small" type="error">删除选中</Button>
              </Col>
            </Row>
            <Row :gutter="24" type="flex" justify="end">
              <Col span="24">
                <Select value="0" placeholder="请选择">
                  <Option value="0">默认全部搜索</Option>
                  <Option value="1">宠物编号</Option>
                  <Option value="2">电话号码</Option>
                  <Option value="3">会员卡号</Option>
                </Select>
              </Col>
              <Col span="24" class="mt5">
                <Input prefix="ios-search" placeholder="宠物编号/电话号码/会员卡号" />
              </Col>
              <Col span="24" class="ivu-mt ivu-text-center">
                <Button size="small" type="text">+添加顾客</Button>
              </Col>
            </Row>
            <Row :gutter="24" type="flex" justify="end">
              <Col span="24">
                <List class="staff-list">
                  <ListItem v-for="(item, index) in data" :key="index">
                    <div class="staff-avatar">
                      <Checkbox v-model="item.is_check" v-if="item.is_check"></Checkbox>
                    </div>
                    <div>
                      <p>{{ item.name }}</p>
                      <p>{{ item.cellphone }}</p>
                    </div>
                  </ListItem>
                </List>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>

    <!-- 新增顾客 -->
    <Modal v-model="addMemberModal" width="60%" class="mymodal">
      <p slot="header" class="ivu-text-center">
        <Col span="12">填写顾客信息</Col>
        <Col span="12">填写宠物信息</Col>
      </p>

      <Row>
        <Form ref="form" :model="member" :rules="rules" :label-width="100" class="myform">
          <Col span="12" class="br">
            <Col span="24">
              <FormItem label="创建时间">2020-02-03 15:00</FormItem>
            </Col>
            <Col span="24">
              <FormItem label="顾客姓名" prop="name">
                <Input v-model="member.name" />
              </FormItem>
            </Col>
          </Col>
          <Col span="12">
            <Col span="12">
              <FormItem label="宠物编号">
                <Input v-model="member.name" />
              </FormItem>
              <FormItem label="上次编号">009877</FormItem>
            </Col>
            <Col span="12" class="ivu-text-center">
              <Upload action="xxx">
                <img src="../../../assets/images/photo.png" alt />
              </Upload>
            </Col>
          </Col>
          <Col span="12" class="br">
            <FormItem label="联系方式" prop="cellphone">
              <Input v-model="member.cellphone" />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="宠物姓名" prop="petName">
              <Input v-model="member.petName" />
            </FormItem>
          </Col>
          <Col span="6" class="ivu-text-center lb0">
            <FormItem>
              <Button type="info" size="small" class="mr20">本地文件</Button>
              <Button type="warning" size="small">云端获取</Button>
            </FormItem>
          </Col>
          <Col span="12" class="br">
            <FormItem label="顾客性别">
              <Select v-model="member.sex" placeholder="请选择性别">
                <Option value="0">男</Option>
                <Option value="1">女</Option>
                <Option value="2">保密</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="种类">
              <Select v-model="member.petType">
                <Option value="0">条目一</Option>
                <Option value="1">条目二</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="品种">
              <Input v-model="member.age" />
            </FormItem>
          </Col>
          <Col span="12" class="br">
            <FormItem label="顾客年龄">
              <Input v-model="member.age" />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="宠物年龄">
              <Input v-model="member.pageAge" />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="性别">
              <Select v-model="member.petType">
                <Option value="0">条目一</Option>
                <Option value="1">条目二</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12" class="br">
            <FormItem label="地址">
              <Input v-model="member.address" />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="毛色">
              <Select v-model="member.petType">
                <Option value="0">条目一</Option>
                <Option value="1">条目二</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="生日">
              <Input v-model="member.petBirth" />
            </FormItem>
          </Col>
          <Col span="12" class="br">
            <FormItem label="了解途径">
              <Input v-model="member.age" />
            </FormItem>
          </Col>
          <Col span="3" class="ivu-text-center lb0">
            <FormItem>
              <Checkbox>已绝育</Checkbox>
            </FormItem>
          </Col>
          <Col span="3" class="ivu-text-center lb0">
            <FormItem>
              <Checkbox>已免疫</Checkbox>
            </FormItem>
          </Col>
          <Col span="3" class="ivu-text-center lb0">
            <FormItem>
              <Checkbox>已驱虫</Checkbox>
            </FormItem>
          </Col>
          <Col span="3" class="ivu-text-center lb0">
            <FormItem>
              <Checkbox>已死亡</Checkbox>
            </FormItem>
          </Col>
          <Col span="12" class="br">
            <FormItem label="邮箱地址">
              <Input v-model="member.age" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注信息">
              <Input v-model="member.pageAge" />
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Modal>

    <!-- 快速预约 -->
    <Modal v-model="addQuickAppointmentModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">添加预约</Col>
      </p>

      <Row :gutter="16">
        <Col span="6">
          <Card class="mycard">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="16">
                <span class="module-title">宠物列表</span>
              </Col>
              <Col span="8" class="ivu-text-right">
                <Button size="small" type="info">挂号表</Button>
              </Col>
            </Row>
            <Row :gutter="24" type="flex" justify="end">
              <Col span="24">
                <Select value="0" placeholder="请选择">
                  <Option value="0">默认全部搜索</Option>
                  <Option value="1">宠物编号</Option>
                  <Option value="2">电话号码</Option>
                  <Option value="3">会员卡号</Option>
                </Select>
              </Col>
              <Col span="24" class="mt5">
                <Input prefix="ios-search" placeholder="宠物编号/电话号码/会员卡号" />
              </Col>
            </Row>
            <Row :gutter="24" type="flex" justify="end">
              <Col span="24">
                <List class="staff-list" style="height:495px">
                  <ListItem v-for="(item, index) in data" :key="index">
                    <div style="text-indent: 1em;">
                      <p>{{ item.name }}</p>
                      <p>{{ item.cellphone }}</p>
                    </div>
                  </ListItem>
                </List>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span="18">
          <Card class="mycard">
            <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
              <Col span="24">
                <span class="module-title">添加预约内容</span>
              </Col>
            </Row>
            <Row>
              <Col span="22" class="ivu-mt">
                <Form ref="form" :model="appointment" :label-width="100">
                  <FormItem label="创建时间">2020-02-03 15:00</FormItem>
                  <FormItem label="顾客姓名">
                    <Input v-model="appointment.name" />
                  </FormItem>
                  <FormItem label="联系方式">
                    <Input v-model="appointment.name" />
                  </FormItem>
                  <FormItem label="宠物姓名">
                    <Input v-model="appointment.name" />
                  </FormItem>
                  <FormItem label="预约类型">
                    <Select v-model="member.petType" placeholder="选择预约类型">
                      <Option value="0">条目一</Option>
                      <Option value="1">条目二</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="预约医生">
                    <Select v-model="member.petType" placeholder="选择预约医生">
                      <Option value="0">条目一</Option>
                      <Option value="1">条目二</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="预约日期">
                    <DatePicker type="date" placeholder="请选择预约日期" style="width: 100%"></DatePicker>
                  </FormItem>
                  <FormItem label="备注">
                    <Input v-model="appointment.name" type="textarea" />
                  </FormItem>
                  <FormItem label>
                    <Checkbox>微信提醒</Checkbox>
                    <span style="color:#ccc">尚未设置提醒规则</span>
                  </FormItem>
                  <FormItem label>
                    <Checkbox v-model="appointment.message">短信提醒</Checkbox>
                    <span style="color:#ccc">尚未设置提醒规则</span>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Modal>

    <!-- 查看宠物信息 -->
    <Modal v-model="viewPetInfoModal" width="50%" class="mymodal">
      <p slot="header">
        <Col span="24">查看宠物信息</Col>
      </p>

      <Row>
        <Form ref="form" :model="member" :rules="rules" :label-width="100" class="myform">
          <Col span="24">
            <Col span="12">
              <FormItem label="宠物编号">
                <Input v-model="member.name" />
              </FormItem>
              <FormItem label="上次编号">009877</FormItem>
            </Col>
            <Col span="12" class="ivu-text-center">
              <Upload action="xxx">
                <img src="../../../assets/images/photo.png" alt />
              </Upload>
            </Col>
          </Col>
          <Col span="12">
            <FormItem label="宠物姓名" prop="petName">
              <Input v-model="member.petName" />
            </FormItem>
          </Col>
          <Col span="12" class="ivu-text-center lb0">
            <FormItem>
              <Button type="info" size="small" class="mr20">本地文件</Button>
              <Button type="warning" size="small">云端获取</Button>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="种类">
              <Select v-model="member.petType">
                <Option value="0">条目一</Option>
                <Option value="1">条目二</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="品种">
              <Input v-model="member.age" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="宠物年龄">
              <Input v-model="member.pageAge" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="性别">
              <Select v-model="member.petType">
                <Option value="0">条目一</Option>
                <Option value="1">条目二</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="毛色">
              <Select v-model="member.petType">
                <Option value="0">条目一</Option>
                <Option value="1">条目二</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="生日">
              <Input v-model="member.petBirth" />
            </FormItem>
          </Col>
          <Col span="6" class="ivu-text-center lb0">
            <FormItem>
              <Checkbox>已绝育</Checkbox>
            </FormItem>
          </Col>
          <Col span="6" class="ivu-text-center lb0">
            <FormItem>
              <Checkbox>已免疫</Checkbox>
            </FormItem>
          </Col>
          <Col span="6" class="ivu-text-center lb0">
            <FormItem>
              <Checkbox>已驱虫</Checkbox>
            </FormItem>
          </Col>
          <Col span="6" class="ivu-text-center lb0">
            <FormItem>
              <Checkbox>已死亡</Checkbox>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="备注信息">
              <Input v-model="member.pageAge" />
            </FormItem>
          </Col>
          <Col span="24" class="lb0">
            <FormItem>
              <div style="border-bottom:1px solid #ccc"></div>
            </FormItem>
          </Col>
          <Col span="24">
            <div class="ivu-mb" style="text-indent:1em;font-weight:500;font-size:16px">添加医保信息</div>
          </Col>
          <Col span="24">
            <FormItem label="芯片号">
              <Input v-model="member.pageAge" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="保单号">
              <Input v-model="member.pageAge" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="身份证号">
              <Input v-model="member.pageAge" />
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Modal>

    <!-- 使用记录 -->
    <Modal v-model="viewUseRecordModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">使用记录</Col>
      </p>

      <Row>
        <Form ref="form" :model="userRecord" :rules="rules" :label-width="100" class="myform">
          <Col span="12">
            <FormItem label="会员卡号：">0192309</FormItem>
          </Col>
          <Col span="12">
            <FormItem label="会员姓名：">张三</FormItem>
          </Col>
          <Col span="8">
            <FormItem label="卡片月：">332.00</FormItem>
          </Col>
          <Col span="8">
            <FormItem label="赠额：">123.00</FormItem>
          </Col>
          <Col span="8">
            <FormItem label="累计消费：">0.00</FormItem>
          </Col>
        </Form>
      </Row>

      <Card class="mycard">
        <Row type="flex" justify="center" align="top" class-name="module-title-wrapper">
          <Col span="24">
            <span class="module-title">消费历史记录</span>
          </Col>
        </Row>
        <List>
          <ListItem v-for="(item, index) in data1" :key="index">
            <Col span="4" class="ivu-text-center">{{item.time}}</Col>
            <Col span="4" class="ivu-text-center">充值{{item.time}}元</Col>
            <Col span="4" class="ivu-text-center">赠送{{item.time}}元</Col>
            <Col span="4" class="ivu-text-center">积分{{item.time}}</Col>
            <Col span="4" class="ivu-text-center">会员卡余额{{item.time}}元</Col>
            <Col span="4" class="ivu-text-center">总计{{item.time}}积分</Col>
          </ListItem>
        </List>
      </Card>
    </Modal>

    <!-- 修改顾客 -->
    <Modal v-model="editMemberModal" width="40%" class="mymodal">
      <p slot="header" class="ivu-text-center">
        <Col span="24">填写顾客信息</Col>
      </p>

      <Row>
        <Form ref="form" :model="member" :rules="rules" :label-width="100" class="myform">
          <FormItem label="创建时间">2020-02-03 15:30</FormItem>
          <FormItem label="宠物姓名" prop="petName">
            <Input v-model="member.petName" />
          </FormItem>
          <FormItem label="联系方式" prop="petName">
            <Input v-model="member.petName" />
          </FormItem>
          <FormItem label="顾客性别">
            <Select v-model="member.petType">
              <Option value="0">男</Option>
              <Option value="1">女</Option>
            </Select>
          </FormItem>
          <FormItem label="顾客年龄">
            <Input v-model="member.petName" />
          </FormItem>
          <FormItem label="地址">
            <Input v-model="member.petName" />
          </FormItem>
          <FormItem label="了解途径">
            <Input v-model="member.petName" />
          </FormItem>
          <FormItem label="邮箱地址">
            <Input v-model="member.petName" />
          </FormItem>
          <FormItem label>
            <Checkbox v-model="member.checked">同时修改顾客未到店预约电话、姓名</Checkbox>
          </FormItem>
        </Form>
      </Row>
    </Modal>

    <!-- 会员卡充值 -->
    <Modal v-model="cardRechargeModal" class="mymodal">
      <p slot="header">
        <Col span="24">会员卡充值</Col>
      </p>

      <Row>
        <Form ref="form" :model="member" :rules="rules" :label-width="100" class="myform">
          <Col span="12">
            <FormItem label="会员姓名：">张三</FormItem>
          </Col>
          <Col span="12">
            <FormItem label="会员卡号：">1293819283</FormItem>
          </Col>
          <FormItem label="充值金额">
            <Col span="12" class="ivu-mb">
              <Checkbox v-model="member.checked">现金</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12" class="ivu-mb">
              <Checkbox>银行卡</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12">
              <Checkbox>微信</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12">
              <Checkbox>支付宝</Checkbox>
              <Input v-width="100" />
            </Col>
          </FormItem>
          <FormItem label="赠送">
            <Col span="12">
              <span>赠送金额</span>
              <Input v-width="100" />
            </Col>
            <Col span="12">
              赠送积分
              <Input v-width="100" />
            </Col>
          </FormItem>
        </Form>
      </Row>

      <div slot="footer">
        <div class="ivu-text-right ivu-mb">顾客实付金额：0 元</div>
        <Button type="success">确定充值</Button>
      </div>
    </Modal>

    <!-- 退卡 -->
    <Modal v-model="refundCardModal" class="mymodal">
      <p slot="header">
        <Col span="24">会员卡退卡（123223-普通卡）</Col>
      </p>

      <Row>
        <Form ref="form" :model="member" :rules="rules" :label-width="100" class="myform">
          <Col span="12">
            <FormItem label="卡内余额：">100.00</FormItem>
          </Col>
          <Col span="12">
            <FormItem label="卡内赠额：">50.00</FormItem>
          </Col>
          <FormItem label="退款金额">
            <Col span="12" class="ivu-mb">
              <Checkbox v-model="member.checked">现金</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12" class="ivu-mb">
              <Checkbox>银行卡</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12">
              <Checkbox>微信</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12">
              <Checkbox>支付宝</Checkbox>
              <Input v-width="100" />
            </Col>
          </FormItem>
        </Form>
      </Row>

      <div slot="footer">
        <div class="ivu-mb ivu-text-left">
          温馨提示
          <p>1.请谨慎进行退卡操作，退卡后该卡将从卡列表移除</p>
          <p>2.推荐您仅退还本金，保留卡</p>
        </div>
        <div>
          <span class="mr10">退款总额：0元</span>
          <Button type="success">确定退卡</Button>
        </div>
      </div>
    </Modal>

    <!-- 新开会员卡 -->
    <Modal v-model="addCardModal" class="mymodal">
      <p slot="header">
        <Col span="24">新增会员卡</Col>
      </p>

      <Tabs value="name1" class="mytabs" @on-click="clickTab">
        <TabPane label="新开会员卡" name="name1" class="tabpane1">
          <Form ref="form" :model="member" :rules="rules" :label-width="100" class="myform">
            <FormItem label="发卡时间">2020-02-03 15:30</FormItem>
            <FormItem label="卡号" prop="petName">
              <Input v-model="member.petName" />
            </FormItem>
            <FormItem label="卡类型">
              <Select v-model="member.petType">
                <Option value="0">条目一</Option>
                <Option value="1">条目二</Option>
              </Select>
            </FormItem>
            <FormItem label class="lb0">
              <Checkbox v-model="member.checked" style="width:100px;margin:0;padding-left:10px">使用密码</Checkbox>
              <Input v-model="member.petName" style="width:calc(100% - 100px)" />
              <span style="color:red;margin-left:100px">*</span>设置卡密码后,消费时需要进行密码确认
            </FormItem>
            <FormItem class="lb0">
              <div style="border-bottom:1px dashed #ccc"></div>
            </FormItem>
            <div class="ivu-mb" style="text-indent:1em;font-weight:500;font-size:16px">补录卡余额</div>
            <FormItem label="卡余额">
              <Input v-model="member.petName" />
            </FormItem>
            <FormItem label="卡赠额">
              <Input v-model="member.petName" />
            </FormItem>
            <FormItem label="卡积分">
              <Input v-model="member.petName" />
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="新卡次卡" name="name2" class="tabpane2">
          <Form ref="form" :model="member" :rules="rules" :label-width="100" class="myform">
            <FormItem label="发卡时间">2020-02-03 15:30</FormItem>
            <FormItem label="卡号" prop="petName">
              <Input v-model="member.petName" />
            </FormItem>
            <FormItem label="卡类型">
              <Select v-model="member.petType">
                <Option value="0">条目一</Option>
                <Option value="1">条目二</Option>
              </Select>
            </FormItem>
            <FormItem label="有效期">
              <DatePicker type="date" placeholder="请选择截止时间" style="width: 100%"></DatePicker>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>

      <div slot="footer">
        <div>
          <Button type="success">确定发卡</Button>
        </div>
      </div>
    </Modal>

    <!-- 贴标签 -->
    <Modal v-model="addLabelModal" class="mymodal">
      <p slot="header">
        <Col span="24">张三的印象标签</Col>
      </p>
      <Row>
        <Col span="24">
          <Tag type="dot" closable color="primary">可爱</Tag>
          <Tag type="dot" closable color="success">同情达理</Tag>
          <Tag type="dot" closable color="error">土豪</Tag>
        </Col>
      </Row>

      <Row class="ivu-mt">
        <div class="ivu-mb">请添加对张三的印象</div>
        <Col span="16">
          <Input v-model="member.petName" />
        </Col>
        <Col span="7" offset="1">
          <Button type="success">+标签</Button>
        </Col>
      </Row>

      <div slot="footer"></div>
    </Modal>

    <!-- 加入黑名单 -->
    <Modal v-model="addBlacklistModal" class="mymodal">
      <p slot="header">
        <Col span="24">加入黑名单</Col>
      </p>
      <Row class="ivu-mt">
        <Form ref="form" :model="member" :rules="rules" :label-width="50" class="myform">
          <FormItem label="描述">
            <Input v-model="member.petName" type="textarea" placeholder="请输入拉黑理由" :rows="3" />
            <span>我们会将您对该【13988787878】号码用户的评价匿名共享给其他医院</span>
          </FormItem>
        </Form>
      </Row>
    </Modal>

    <!-- 查看押金记录 -->
    <Modal v-model="addDepositModal" width="50%" class="mymodal">
      <p slot="header">
        <Col span="24">查看押金记录</Col>
      </p>
      <Row class="ivu-mt">
        <Col span="12">押金余额：¥0.00</Col>
        <Col span="12" class="ivu-text-right">
          <Button type="error" class="mr10" @click="handleAddDepositRefundModal">退还</Button>
          <Button type="success" @click="handleAddDepositCardRechargeModal">充值</Button>
        </Col>
      </Row>
      <Row class="ivu-mt">
        <Table border :columns="columns1" :data="data1"></Table>
      </Row>
      <div slot="footer"></div>
    </Modal>

    <!-- 押金-会员卡充值 -->
    <Modal v-model="addDepositCardRechargeModal" class="mymodal">
      <p slot="header">
        <Col span="24">会员卡充值</Col>
      </p>

      <Row>
        <Form ref="form" :model="member" :rules="rules" :label-width="50" class="myform">
          <FormItem>
            <Col span="12" class="ivu-mb">
              <Checkbox v-model="member.checked">现金</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12" class="ivu-mb">
              <Checkbox>银行卡</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12">
              <Checkbox>微信</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12">
              <Checkbox>支付宝</Checkbox>
              <Input v-width="100" />
            </Col>
          </FormItem>
        </Form>
      </Row>

      <div slot="footer">
        <div class="ivu-text-right ivu-mb">充值总额：0 元</div>
        <Button type="success">确定充值</Button>
      </div>
    </Modal>

    <!-- 押金退还 -->
    <Modal v-model="addDepositRefundModal" class="mymodal">
      <p slot="header">
        <Col span="24">押金退还</Col>
      </p>

      <Row>
        <Form ref="form" :model="member" :rules="rules" :label-width="50" class="myform">
          <div class="ivu-mb">押金余额：¥100.00</div>
          <FormItem class="lb0">
            <div style="border-bottom:1px dashed #ccc"></div>
          </FormItem>
          <FormItem>
            <Col span="12" class="ivu-mb">
              <Checkbox v-model="member.checked">现金</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12" class="ivu-mb">
              <Checkbox>银行卡</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12">
              <Checkbox>微信</Checkbox>
              <Input v-width="100" />
            </Col>
            <Col span="12">
              <Checkbox>支付宝</Checkbox>
              <Input v-width="100" />
            </Col>
          </FormItem>
        </Form>
      </Row>

      <div slot="footer">
        <div class="ivu-text-right ivu-mb">退还总额：0 元</div>
        <Button type="success">确定退还</Button>
      </div>
    </Modal>

    <!-- 消费历史 -->
    <Modal v-model="costHistoryModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">消费历史</Col>
      </p>
      <Row class="ivu-mt">
        <Form ref="form" :model="member" :rules="rules" :label-width="50" class="myform">
          <Col span="8">
            <FormItem label="宠物">
              <Select value="0" placeholder="请选择">
                <Option value="0">全部</Option>
                <Option value="1">花花</Option>
                <Option value="2">贝贝</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="日期">
              <DatePicker type="daterange" placeholder="请选择开始结束日期" style="width: 100%"></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <Input v-model="member.petName" placeholder="输入单号信息" :rows="3" />
            </FormItem>
          </Col>
        </Form>
      </Row>
      <Row>
        <Table border :columns="columns2" :data="data2" class="ivu-mb"></Table>
        <div class="ivu-text-right">消费总额:337.00元</div>
      </Row>
      <div slot="footer"></div>
    </Modal>

    <!-- 消费详情 -->
    <Modal v-model="costHistoryDetailModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">消费详情</Col>
      </p>
      <Row>
        <Form ref="form" :model="member" :rules="rules" :label-width="100" class="myform">
          <Row>
            <Col span="12" style="background:#f6f6f6;padding:8px 16px;">账单明细(已结算)</Col>
            <Col span="12" style="background:#f6f6f6;padding:8px 16px;" class="ivu-text-right">收银员:王艳</Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem label="挂帐单号：">JS2012931902139</FormItem>
            </Col>
            <Col span="6">
              <FormItem label="结算时间：">2020-03-12</FormItem>
            </Col>
            <Col span="6">
              <FormItem label="顾客：">橘猫（夏）</FormItem>
            </Col>
          </Row>
          <Col span="6">
            <FormItem label="账单金额：">137.00</FormItem>
          </Col>
          <Col span="6">
            <FormItem label="折后金额：">137.00</FormItem>
          </Col>
          <Col span="6">
            <FormItem label="优惠：">0.00</FormItem>
          </Col>
          <Col span="6">
            <FormItem label="抹零：">0.00</FormItem>
          </Col>
          <Row>
            <FormItem label="实际支付：">137.00</FormItem>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="备注：">
                <Input v-model="member.petName" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="微信：">0.00</FormItem>
          </Row>
          <FormItem class="lb0">
            <div style="border-bottom:1px dashed #ccc"></div>
          </FormItem>
        </Form>
      </Row>
      <Row>
        <div class="mb5">处方</div>
        <Table border :columns="columns3" :data="data3" class="ivu-mb"></Table>
      </Row>
      <Row>
        <div class="mb5">住院</div>
        <Table border :columns="columns3" :data="data3" class="ivu-mb"></Table>
        <div class="ivu-text-right">合计:137.00元</div>
      </Row>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                data: [
                    {
                        id: '123456700',
                        name: 'Aresn（贝贝）',
                        is_check: true,
                        cellphone: '13712121212'
                    },
                    {
                        id: '123456701',
                        name: '中小鱼（猪猪）',
                        is_check: false,
                        cellphone: '13712121213'
                    },
                    {
                        id: '123456702',
                        name: 'Echo（小狗）',
                        is_check: true,
                        cellphone: '13712121214'
                    },
                    {
                        id: '123456703',
                        name: '唐不苦（阿拉）',
                        is_check: true,
                        cellphone: '13712121215'
                    },
                    {
                        id: '123456704',
                        name: '甜筒（皮皮）',
                        is_check: false,
                        cellphone: '13712121212'
                    },
                    {
                        id: '123456705',
                        name: '冷月呆呆（憨憨）',
                        is_check: true,
                        cellphone: '13712121216'
                    }
                ],
                count: ['张三', '李四', '王二麻子'],
                currentTag: 0,
                addMemberModal: false,
                member: {
                    petType: '0',
                    checked: true
                },
                rules: {
                    name: [{ required: true, message: '请输入顾客名称', trigger: 'blur' }],
                    cellphone: [
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    petName: [
                        { required: true, message: '请输入宠物名称', trigger: 'blur' }
                    ]
                },
                addQuickAppointmentModal: false,
                appointment: {
                    message: true
                },
                viewPetInfoModal: false,
                petInfo: {},
                viewUseRecordModal: false,
                userRecord: {},
                data1: [
                    {
                        time: '2020-02-02',
                        value1: '100.00',
                        value2: '50.00',
                        value3: '100.00',
                        value4: '100.00',
                        value5: '100.00',
                        type: '充值'
                    },
                    {
                        time: '2020-02-03',
                        value1: '110.00',
                        value2: '50.00',
                        value3: '104.00',
                        value4: '100.00',
                        value5: '100.00',
                        type: '退还'
                    }
                ],
                columns1: [
                    {
                        title: '日期',
                        key: 'time'
                    },
                    {
                        title: '事项',
                        key: 'type'
                    },
                    {
                        title: '金额',
                        key: 'value1'
                    },
                    {
                        title: '余额',
                        key: 'value2'
                    }
                ],
                data2: [
                    {
                        time: '2020-02-02',
                        name: '橘猫',
                        code: '012931238',
                        type: '已结算',
                        value1: '100.00',
                        value2: '150.00',
                        cashier: '王艳'
                    },
                    {
                        time: '2020-02-03',
                        name: '小花',
                        code: '012931234',
                        type: '已结算',
                        value1: '100.00',
                        value2: '150.00',
                        cashier: '王艳'
                    }
                ],
                columns2: [
                    {
                        title: '宠物',
                        key: 'name'
                    },
                    {
                        title: '时间',
                        key: 'time'
                    },
                    {
                        title: '单号',
                        key: 'code'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '账单折后金额',
                        key: 'value1'
                    },
                    {
                        title: '实收金额',
                        key: 'value2'
                    },
                    {
                        title: '收银员',
                        key: 'cashier'
                    },
                    {
                        title: '操作',
                        key: 'price',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.costHistoryDetailModal = true
                                            }
                                        }
                                    },
                                    '查看详情'
                                )
                            ]);
                        }
                    }
                ],
                data3: [
                    {
                        name: '西药费',
                        specs: '盒',
                        unit: '',
                        num: '1',
                        unitPrice: '75.00',
                        discountPrice: '75.00',
                        price: '75.00',
                        cashier: '王艳',
                        waiter: '王艳'
                    },
                    {
                        name: '无菌注射器',
                        specs: '1ml',
                        unit: '支',
                        num: '2',
                        unitPrice: '150.00',
                        discountPrice: '150.00',
                        price: '75.00',
                        cashier: '王艳',
                        waiter: '王艳'
                    }
                ],
                columns3: [
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格',
                        key: 'specs'
                    },
                    {
                        title: '单位',
                        key: 'unit'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '折后价',
                        key: 'discountPrice'
                    },
                    {
                        title: '金额',
                        key: 'price'
                    },
                    {
                        title: '销售人员',
                        key: 'cashier'
                    },
                    {
                        title: '服务人员',
                        key: 'waiter'
                    }
                ],
                editMemberModal: false,
                cardRechargeModal: false,
                refundCardModal: false,
                addCardModal: false,
                addLabelModal: false,
                addBlacklistModal: false,
                addDepositModal: false,
                addDepositCardRechargeModal: false,
                addDepositRefundModal: false,
                costHistoryModal: false,
                costHistoryDetailModal: false
            };
        },
        methods: {
            handleAdd () {
                // this.count.push('李梅');
                this.addMemberModal = true;
            },
            handleAddQuickAppointmentModal () {
                this.addQuickAppointmentModal = true;
            },
            handleViewPetInfoModal () {
                this.viewPetInfoModal = true;
            },
            handleViewUseRecordModal () {
                this.viewUseRecordModal = true;
            },
            handleEditMemberModal () {
                this.editMemberModal = true;
            },
            handleCardRechargeModal () {
                this.cardRechargeModal = true;
            },
            handleRefundCardModal () {
                this.refundCardModal = true;
            },
            handleAddCardModal () {
                this.addCardModal = true;
            },
            handleAddLabelModal () {
                this.addLabelModal = true;
            },
            handleAddBlacklistModal () {
                this.addBlacklistModal = true;
            },
            handleAddDepositModal () {
                this.addDepositModal = true;
            },
            handleAddDepositCardRechargeModal () {
                this.addDepositCardRechargeModal = true;
            },
            handleAddDepositRefundModal () {
                this.addDepositRefundModal = true;
            },
            handleCostHistoryModal () {
                this.costHistoryModal = true;
            },
            handleCostHistoryDetailModal () {
                this.costHistoryDetailModal = true;
            },
            handleClose (event, name) {
                const index = this.count.indexOf(name);
                this.count.splice(index, 1);
                if (this.currentTag === this.count.length) {
                    this.currentTag--;
                }
            },
            handleClick (item, index) {
                this.currentTag = index;
            },
            clickTab (name) {}
        },
        mounted () {}
    };
</script>
<style lang="less" scoped>
.box {
  padding-left: 15px;
}
/*模块标题*/
.mycard .module-title-wrapper {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e9eaec;
  font-weight: 700;
  background-color: #f6f6f6;
  margin: 0;
}
.code-img {
  width: 100px;
  height: 100px;
}
.mycard .mt32 {
  margin-top: 32px;
}
.pd16 {
  padding: 16px;
}
.mypet {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.mt5 {
  margin-top: 5px;
}

.mb5 {
  margin-bottom: 5px;
}

.mr20 {
  margin-right: 20px;
}

.myform .br {
  border-right: 1px solid #ccc;
  padding-right: 5%;
}
</style>
<style lang="less">
.mycard .ivu-card-body {
  padding: 0;
}
.mycard .ivu-row-flex {
  padding: 0 16px;
  margin: 16px 0;
}
.staff-list {
  height: 570px;
  overflow: auto;
}
.staff-avatar {
  min-width: 24px;
  margin: 0 32px 0 16px;
}
.staff-avatar .ivu-avatar-default {
  width: 60px;
  height: 60px;
}

.mytag {
  border: 0 !important;
  background: #fff;
  border-bottom: 1px solid #ccc !important;
  border-radius: 0;
  margin: 0;
  border-right: 1px solid #ccc !important;
}
.mytag .ivu-tag-text {
  padding: 0 24px;
}
.lasttag {
  border-right: none !important;
}
.activetag {
  border-bottom: 2px solid #69c5d8 !important;
}

.mypet .ivu-col {
  padding: 3px 8px;
}

.mymodal .ivu-modal-header {
  background: #f6f6f6;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.lb0 .ivu-form-item-content {
  margin: 1px 0;
  margin-left: 0 !important;
}
.mytabs .ivu-tabs-tab {
  width: 50%;
}
.mytabs .ivu-tabs-nav {
  width: 100%;
}
.mytabs .ivu-tabs-tab:first-child {
  border-right: 1px solid #ccc;
}
</style>
