<template>
  <Row style="background-color: #fff;" :gutter="16">
    <Col span="20">
      <Tabs value="name1">
        <TabPane label="夏天(张华)" name="name1"></TabPane>
        <TabPane label="咪咪(刘烨)" name="name2"></TabPane>
      </Tabs>
      <div>
        <Row>
          <Col span="2" class="ivu-text-right">宠物姓名：</Col>
          <Col span="2" class="ivu-text-left">夏天(母)</Col>
          <Col span="1" class="ivu-text-right">种类：</Col>
          <Col span="1" class="ivu-text-left">犬</Col>
          <Col span="1" class="ivu-text-right">品种：</Col>
          <Col span="1" class="ivu-text-left">泰迪</Col>
          <Col span="1" class="ivu-text-right">年龄：</Col>
          <Col span="2" class="ivu-text-left">0岁11月</Col>
          <Col span="1" class="ivu-text-right">称重：</Col>
          <Col span="1" class="ivu-text-left">0kg</Col>
        </Row>
        <Row class="ivu-mt borderandpadding">
          <Col span="2" class="ivu-text-right">主人姓名：</Col>
          <Col span="2" class="ivu-text-left">张</Col>
          <Col span="1" class="ivu-text-right">电话：</Col>
          <Col span="2" class="ivu-text-left">14423232323</Col>
          <Col span="7" class="ivu-text-right">编号：</Col>
          <Col span="1" class="ivu-text-left">P00311</Col>
          <Col span="2" class="ivu-text-right">登记日期：</Col>
          <Col span="2" class="ivu-text-left">2020-04-03</Col>
          <Col span="2" class="ivu-text-right">最近到访：</Col>
          <Col span="3" class="ivu-text-left">2020-01-01 12:00</Col>
        </Row>
        <Row :gutter="16">
          <Col span="6" class="br1">
            <Row class="mt10">
              <Form ref="form" :label-width="70">
                <FormItem label="病历列表" style="margin-bottom:10px">
                  <Select value="0" size="small">
                    <Option value="0">全部</Option>
                    <Option value="1">门诊</Option>
                  </Select>
                </FormItem>
              </Form>
            </Row>
            <Row class="mh-list">
              <Col span="24">
                <List class="record-list">
                  <ListItem
                    v-for="(item, index) in recordList"
                    :key="index"
                    :class="item.id===currentRecordId?'active':''"
                  >
                    <div @click="switchRecordList(item.id)" class="record">
                      <Col span="12" class="ivu-text-left">{{item.name}}</Col>
                      <Col span="12" class="ivu-text-right">{{item.time}}</Col>
                    </div>
                  </ListItem>
                </List>
              </Col>
            </Row>
            <Row class="mtb15">
              <Col span="8">
                <Button type="error" class="mr10">删除</Button>
              </Col>
              <Col span="8" class="ivu-text-center">
                <Button type="info" class="mr10">+住院组</Button>
              </Col>
              <Col span="8" class="ivu-text-right">
                <Button type="primary">+病历</Button>
              </Col>
            </Row>
          </Col>
          <Col span="18">
            <Row class="mt10">
              <Col
                span="12"
                style="height:32px;line-height:32px;text-indent:0.9em;"
              >病历（NO.201902020129）</Col>
              <Col span="12" class="ivu-text-right">
                <Button type="success" class="mr10" @click="handleAddCheckModal">+检验</Button>
                <Button type="primary" class="mr10" @click="handleAddPrescriptionModal">+处方</Button>
                <Button type="warning" class="mr10" @click="handleAddHandleModal">+处置</Button>
                <Button type="info" @click="handleAddOperationModal">+手术</Button>
              </Col>
            </Row>
            <Row class="mt10">
              <Form ref="form" :model="record" :label-width="80">
                <Col span="12">
                  <FormItem label="创建时间">
                    <DatePicker
                      type="date"
                      v-model="record.creatTime"
                      placeholder="请选择预约日期"
                      style="width: 100%"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="诊疗科目">
                    <Select value="0">
                      <Option value="0">外科</Option>
                      <Option value="1">内科</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="病理分类">
                    <Select value="0">
                      <Option value="0">门诊</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="主治医生">
                    <Select value="0">
                      <Option value="0">王艳</Option>
                      <Option value="1">丽江</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="体温">
                    <Input>
                      <span slot="append">℃</span>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="体重">
                    <Input>
                      <span slot="append">kg</span>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="呼吸">
                    <Input>
                      <span slot="append">次/分</span>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="心率">
                    <Input>
                      <span slot="append">次/分</span>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="20">
                  <FormItem label="附件">
                    <Input type="textarea" />
                  </FormItem>
                </Col>
                <Col
                  span="4"
                  class="ivu-text-center"
                  style="height:52px;line-height:52px;margin-bottom:24px"
                >
                  <Button type="success" class="mr10">+添加附件</Button>
                </Col>
                <Col span="24">
                  <FormItem label="主诉记录">
                    <Input type="textarea" />
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="临床检查">
                    <Input type="textarea" />
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="初步诊断">
                    <Input type="textarea" />
                    <div style="height:52px;background:#f6f6f6;padding:0 8px">系统初诊</div>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="检验分析">
                    <Input type="textarea" />
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="病情诊断">
                    <Input type="textarea" />
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="处理治疗">
                    <Input type="textarea" />
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="医嘱">
                    <Input type="textarea" />
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="回访记录">
                    <Input type="textarea" />
                  </FormItem>
                </Col>
              </Form>
            </Row>
            <Row class="ivu-mb">
              <div style="height:32px;line-height:32px;text-indent:0.9em;width:80px;float:left">校验</div>
              <div
                style="border-bottom:1px dashed #ccc;height:16px;float:left;width:calc(100% - 280px)"
              ></div>
              <div style="width:200px;float:left" class="ivu-text-right">
                <Button type="error" class="mr10">删除选择</Button>
                <Button type="success">添加校验</Button>
              </div>
            </Row>
            <Table border :columns="columns1" :data="data1"></Table>
            <Row class="ivu-mb ivu-mt">
              <div style="height:32px;line-height:32px;text-indent:0.9em;width:80px;float:left">处方治疗</div>
              <div
                style="border-bottom:1px dashed #ccc;height:16px;float:left;width:calc(100% - 280px)"
              ></div>
              <div style="width:200px;float:left" class="ivu-text-right">
                <Button type="error" class="mr10">删除选择</Button>
                <Button type="success">添加校验</Button>
              </div>
            </Row>
            <Table border :columns="columns2" :data="data1"></Table>
            <Row class="ivu-mb ivu-mt">
              <div style="height:32px;line-height:32px;text-indent:0.9em;width:80px;float:left">处置治疗</div>
              <div
                style="border-bottom:1px dashed #ccc;height:16px;float:left;width:calc(100% - 280px)"
              ></div>
              <div style="width:200px;float:left" class="ivu-text-right">
                <Button type="error" class="mr10">删除选择</Button>
                <Button type="success">添加校验</Button>
              </div>
            </Row>
            <Table border :columns="columns2" :data="data1"></Table>
            <Row class="ivu-mb ivu-mt">
              <div style="height:32px;line-height:32px;text-indent:0.9em;width:80px;float:left">手术治疗</div>
              <div
                style="border-bottom:1px dashed #ccc;height:16px;float:left;width:calc(100% - 280px)"
              ></div>
              <div style="width:200px;float:left" class="ivu-text-right">
                <Button type="error" class="mr10">删除选择</Button>
                <Button type="success">添加校验</Button>
              </div>
            </Row>
            <Table border :columns="columns2" :data="data1"></Table>
            <Row class="ivu-mt ivu-mb">
              <Col span="20">
                <Button type="success" class="mr10">复制消费</Button>
                <Button type="primary" class="mr10">粘贴消费</Button>
                <Button type="warning" class="mr10">打印病历</Button>
                <Button type="info" class="mr10">打印处方</Button>
                <Button type="error" @click="handleAddReturnVisitModal">+添加回访</Button>
              </Col>
              <Col span="4" class="ivu-text-right">
                <Button type="success">保存</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
    <Col span="4" style="padding:8px;border:1px solid #ddd;">
      <Row style="padding:8px;background-color: #3874C5;">
        <Col span="8" style="vertical-align:middle">
          <span style="color:white">宠物列表</span>
        </Col>
        <Col span="16" class="ivu-text-right">
          <Button size="small" @click="showRegistrationForm">挂号表</Button>
        </Col>
      </Row>
      <Row class="padding8">
        <Col span="24">
          <Select v-model="searchType" size="small">
            <Option value="默认全部搜索">默认全部搜索</Option>
          </Select>
        </Col>
      </Row>
      <Row class="padding08">
        <Col span="24">
          <Input size="small" prefix="ios-search" />
        </Col>
      </Row>
      <Row class="padding8">
        <Col span="24" class="ivu-text-center">
          <a href="javascript:;">+添加顾客</a>
        </Col>
      </Row>
      <Row class="padding8">
        <Col span="24">
          <List class="animal-list">
            <ListItem
              v-for="(item, index) in list"
              :key="index"
              :class="item.name===currentName?'active':''"
            >
              <p @click="switchList(item.name)">
                &nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{{item.phone}}
              </p>
            </ListItem>
          </List>
        </Col>
      </Row>
    </Col>

    <!-- 挂号表 -->
    <Modal v-model="registrationFormModal" title="挂号表" width="50%">
      <div>
        <Row>
          <Tabs value="name3">
            <TabPane label="已挂号顾客" name="name3"></TabPane>
            <TabPane label="最近登录顾客" name="name4"></TabPane>
          </Tabs>
        </Row>
        <Row :gutter="16">
          <Form :label-width="71" class="myform">
            <Col span="9">
              <FormItem label="预约日期">
                <DatePicker type="datetimerange" size="small" placeholder="选择筛选日期区间" />
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="预约对象">
                <Select v-model="people" size="small">
                  <Option value="全体员工">全体员工</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <Button type="info">确认</Button>
            </Col>
          </Form>
        </Row>
        <Row>
          <Table border :columns="registrationListColumns" :data="registratiData"></Table>
        </Row>
      </div>
      <div slot="footer">
        <Row :gutter="16" justify="end" type="flex">
          <Col span="4">
            <Button type="default" @click="registrationFormModal=false">取消预约</Button>
          </Col>
          <Col span="4" class="ivu-text-left">
            <Button type="primary">去处理</Button>
          </Col>
          <Col span="4">
            <Button type="success">确认</Button>
          </Col>
        </Row>
      </div>
    </Modal>

    <!-- 添加检验 -->
    <Modal v-model="addCheckModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">检验</Col>
      </p>

      <Tabs value="name1" class="mytabs">
        <TabPane label="选择消费项目" name="name1">
          <Row :gutter="16">
            <Col span="6">
              <Row class-name="module-title-wrapper">
                <Col>
                  <span class="module-title">商品分类列表</span>
                </Col>
              </Row>
              <Row>
                <Col style="padding:8px 16px;border:1px solid #ccc">
                  <Tree :data="consumptionTypeData"></Tree>
                </Col>
              </Row>
            </Col>
            <Col span="18">
              <Row class-name="module-title-wrapper">
                <Col span="8">
                  <span class="module-title">商品列表</span>
                </Col>
                <Col span="16" class="ivu-text-right">
                  <Button type="success" class="mr10" @click="handleAddGoodsModal">快速添加</Button>
                  <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
                </Col>
              </Row>
              <Row class="ivu-mt">
                <Table border :columns="columns3" :data="data3"></Table>
              </Row>
            </Col>
          </Row>

          <Row class-name="module-title-wrapper ivu-mt">
            <Col span="8">
              <span class="module-title">已选商品列表</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Button type="success" class="mr10">+保存为组合</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
          <Row>
            <Table border :columns="columns4" :data="data4">
              <template slot-scope="{ row, index }" slot="code">
                <Input type="text" />
              </template>
              <template slot-scope="{ row, index }" slot="equipment">
                <Select value="0">
                  <Option value="0">条目一</Option>
                  <Option value="1">条目二</Option>
                  <Option value="2">条目三</Option>
                  <Option value="3">条目四</Option>
                </Select>
              </template>
            </Table>
          </Row>
        </TabPane>
        <TabPane label="校验组合" name="name2">
          <Row :gutter="16">
            <Col span="6">
              <Row class-name="module-title-wrapper">
                <Col>
                  <span class="module-title">商品组合列表</span>
                </Col>
              </Row>
              <Row>
                <Col style="padding:8px 16px;border:1px solid #ccc">
                  <Tree :data="consumptionTypeData"></Tree>
                </Col>
              </Row>
            </Col>
            <Col span="18">
              <Row class-name="module-title-wrapper">
                <Col span="8">
                  <span class="module-title">商品组合详情</span>
                </Col>
                <Col span="16" class="ivu-text-right">
                  <Button type="success" class="mr10">快速添加</Button>
                  <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
                </Col>
              </Row>
              <Row class="ivu-mt">
                <Table border :columns="columns3s" :data="data3s"></Table>
              </Row>
            </Col>
          </Row>

          <Row class-name="module-title-wrapper ivu-mt">
            <Col span="8">
              <span class="module-title">已选商品列表</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Button type="success" class="mr10">+保存为组合</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
          <Row>
            <Table border :columns="columns4s" :data="data4s">
              <template slot-scope="{ row, index }" slot="equipment">
                <Select value="0">
                  <Option value="0">条目一</Option>
                  <Option value="1">条目二</Option>
                  <Option value="2">条目三</Option>
                  <Option value="3">条目四</Option>
                </Select>
              </template>
            </Table>
          </Row>
        </TabPane>
      </Tabs>

      <div slot="footer">
        <Row>
          <Col span="12" class="ivu-text-left">
            <Button type="info">上移</Button>
            <Button type="warning">下移</Button>
          </Col>
          <Col span="12" class="ivu-text-right">
            <span class="mr10">合计：0.00元</span>
            <Button type="success">保存</Button>
          </Col>
        </Row>
      </div>
    </Modal>

    <!-- 添加商品 -->
    <Modal v-model="addGoodsModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">添加项目</Col>
      </p>

      <Tabs value="name1" name="add" class="mytabs">
        <TabPane label="添加商品" name="name1" tab="add">
          <Row :gutter="16">
            <Form ref="form" :model="record" :rules="rules" :label-width="100" class="myform">
              <Col span="12">
                <FormItem label="商品名称" prop="name">
                  <Input v-model="record.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem class="lb0">
                  <Checkbox
                    v-model="record.check"
                    style="width:100px;margin:0;padding-right:12px;text-align:right"
                  >设置别名</Checkbox>
                  <Input
                    v-model="record.name"
                    placeholder="显示、打印都显示别名"
                    style="width:calc(100% - 100px)"
                  />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="拼音搜索">
                  <Input />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品条码">
                  <Input />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品编号">
                  <Input />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品单位">
                  <Input />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="生产厂家">
                  <Input />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品规格">
                  <Input />
                </FormItem>
              </Col>
              <Col span="24">
                <FormItem label="库存下限">
                  <Input value="0" v-width="200" />
                  <span style="color:#ccc;padding-left:12px">库存量低于下限，系统自动提醒</span>
                </FormItem>
              </Col>
              <Col span="24" style="padding-left:40px">
                <Checkbox style="margin-right:32px">参与打折</Checkbox>
                <Checkbox style="margin-right:32px">计算库存</Checkbox>
                <Checkbox style="margin-right:32px">有批号商品</Checkbox>
                <Checkbox style="margin-right:32px">推荐销售（勾选后，将置顶单品并加推荐符号，提醒员工优先销售）</Checkbox>
              </Col>
            </Form>
          </Row>
          <div style="border-bottom:1px solid #ccc;margin-top:24px"></div>

          <Tabs value="pane1" class="mytabs ivu-mt" name="pane" :animated="false">
            <TabPane label="价格设置" name="pane1" tab="pane">
              <Row :gutter="16">
                <Form ref="form" :model="record" :rules="rules" :label-width="100" class="myform">
                  <Col span="12">
                    <FormItem label="销售单价">
                      <Input v-model="record.name" placeholder="¥0.00" />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="最低销售">
                      <Input v-model="record.name" placeholder="¥0.00" />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="商品进价">
                      <Input v-model="record.name" placeholder="¥0.00" />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="批发价格">
                      <Input v-model="record.name" placeholder="¥0.00" />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem class="lb0">
                      <Checkbox
                        v-model="record.check"
                        style="width:100px;margin:0;padding-right:12px;text-align:right"
                      >会员价</Checkbox>
                      <Input
                        v-model="record.name"
                        placeholder="¥0.00"
                        style="width:calc(100% - 100px)"
                      />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem class="lb0">
                      <span style="color:#ccc">会员卡用户结算时,以会员价结算,不参与折扣</span>
                    </FormItem>
                  </Col>
                </Form>
              </Row>
            </TabPane>
            <TabPane label="用法设置" name="pane2" tab="pane">
              <Row :gutter="16">
                <Form
                  ref="form"
                  :model="record"
                  :rules="rules"
                  :label-width="80"
                  class="use-setting"
                >
                  <Col span="2">
                    <FormItem class="lb0">用法设置</FormItem>
                  </Col>
                  <Col span="7">
                    <FormItem class="lb0">
                      <Select value="0" placeholder="请选择">
                        <Option value="0">直肠灌注</Option>
                        <Option value="1">注射</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="15">
                    <FormItem class="lb0">
                      <Button type="primary" @click="handleEditPrescriptionUsageModal">编辑处方用法</Button>
                    </FormItem>
                  </Col>
                  <Col span="2">
                    <FormItem class="lb0">用量设置</FormItem>
                  </Col>
                  <Col span="7">
                    <FormItem label="犬类---每千克消耗" class="lb140">
                      <Input v-model="record.name" />
                    </FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="用量下限">
                      <Input v-model="record.name" />
                    </FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="用量上限">
                      <Input v-model="record.name" />
                    </FormItem>
                  </Col>
                  <Col span="5" class="ivu-text-center">
                    <Button type="warning" class="mr10">复制</Button>
                    <Button type="success">粘贴</Button>
                  </Col>
                  <Col span="7" offset="2">
                    <FormItem label="猫类---每千克消耗" class="lb140">
                      <Input v-model="record.name" />
                    </FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="用量下限">
                      <Input v-model="record.name" />
                    </FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="用量上限">
                      <Input v-model="record.name" />
                    </FormItem>
                  </Col>
                  <Col span="5" class="ivu-text-center">
                    <Button type="warning" class="mr10">复制</Button>
                    <Button type="success">粘贴</Button>
                  </Col>
                  <Col span="7" offset="2">
                    <FormItem label="其他---每千克消耗" class="lb140">
                      <Input v-model="record.name" />
                    </FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="用量下限">
                      <Input v-model="record.name" />
                    </FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="用量上限">
                      <Input v-model="record.name" />
                    </FormItem>
                  </Col>
                  <Col span="5" class="ivu-text-center">
                    <Button type="warning" class="mr10">复制</Button>
                    <Button type="success">粘贴</Button>
                  </Col>
                  <Col
                    span="22"
                    offset="2"
                    class="ivu-mb"
                    style="color:#ccc"
                  >用量设置后,系统会在病例中自动按照宠物品种和体重计算处方用量</Col>
                  <Col span="24">
                    <FormItem class="lb0">
                      <Checkbox
                        v-model="record.check"
                      >病例中根据用量反酸数量(注: 仅适用简单的单位换算,如单位为瓶,规格100ml/瓶,当输入用量120ml时,数量自动计算为2瓶;非此类情况不支持)</Checkbox>
                    </FormItem>
                  </Col>
                </Form>
              </Row>
            </TabPane>
            <TabPane label="商品来源" name="pane3" tab="pane">
              <Row class="ivu-mb">
                <div style="height:32px;line-height:32px;width:120px;float:left">该商品的供货商</div>
                <div
                  style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 240px)"
                ></div>
                <div style="width:120px;float:left" class="ivu-text-right">
                  <Button type="success" @click="handleAddSupplierModal">+添加供货商</Button>
                </div>
              </Row>
              <Table border :columns="columns8" :data="data8">
                <template slot-scope="{ row, index }" slot="price">
                  <Input type="text" />
                </template>
              </Table>
            </TabPane>
            <TabPane label="积分兑换" name="pane4" tab="pane">
              <Form ref="form" :model="record" :rules="rules" :label-width="120" class="myform">
                <FormItem class="lb0" style="text-indent:0.3em">
                  <Checkbox v-model="record.check">允许积分兑换</Checkbox>
                </FormItem>
                <FormItem label="兑换所需积分值">
                  <Input v-model="record.name" v-width="200" />
                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="商品说明" name="pane5" tab="pane">
              <Input type="textarea" :rows="6" />
            </TabPane>
            <TabPane label="有效期管理" name="pane6" tab="pane">
              <Row class="ivu-mb">
                <div style="height:32px;line-height:32px;width:100px;float:left">该商品有效期</div>
                <div
                  style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 480px)"
                ></div>
                <div style="width:380px;float:left" class="ivu-text-right">
                  <span class="mr10">
                    设置提醒：提前
                    <Input v-width="100" />天提醒
                  </span>
                  <Button type="success">+添加有效期</Button>
                </div>
              </Row>
              <Table border :columns="columns10" :data="data10"></Table>
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane label="添加套餐" name="name2" tab="add">
          <Row :gutter="16">
            <Form ref="form" :model="record" :rules="rules" :label-width="100" class="myform">
              <Col span="12">
                <FormItem label="套餐名称" prop="name">
                  <Input v-model="record.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐编号">
                  <Input v-model="record.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐条码">
                  <Input v-model="record.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐规格">
                  <Input v-model="record.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐单位">
                  <Input v-model="record.name" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="套餐说明">
                  <Input v-model="record.name" />
                </FormItem>
              </Col>
            </Form>
          </Row>
          <Row class="ivu-mb">
            <div style="height:32px;line-height:32px;width:80px;float:left">套餐商品</div>
            <div
              style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 200px)"
            ></div>
            <div style="width:120px;float:left" class="ivu-text-right">
              <Button type="success" @click="handleAddPackageModal">添加套餐</Button>
            </div>
          </Row>
          <Table border :columns="columns5" :data="data5"></Table>
        </TabPane>
      </Tabs>

      <div slot="footer">
        <Button type="success">保存</Button>
        <Button type="primary">保存并继续</Button>
      </div>
    </Modal>

    <!-- 添加套餐 -->
    <Modal v-model="addPackageModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">添加套餐</Col>
      </p>

      <Row :gutter="16">
        <Col span="6">
          <Row class-name="module-title-wrapper">
            <Col>
              <span class="module-title">商品分类列表</span>
            </Col>
          </Row>
          <Row>
            <Col style="padding:8px 16px;border:1px solid #ccc">
              <Tree :data="packageData"></Tree>
            </Col>
          </Row>
        </Col>
        <Col span="18">
          <Row class-name="module-title-wrapper">
            <Col span="8">
              <span class="module-title">商品列表</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
            </Col>
          </Row>
          <Row class="ivu-mt">
            <Table border :columns="columns3" :data="data3"></Table>
          </Row>
        </Col>
      </Row>

      <Row class-name="module-title-wrapper ivu-mt">
        <Col span="8">
          <span class="module-title">已选商品列表</span>
        </Col>
        <Col span="16" class="ivu-text-right">
          <Button type="error">删除</Button>
        </Col>
      </Row>
      <Row>
        <Table border :columns="columns6" :data="data6"></Table>
      </Row>

      <div slot="footer">
        <Button type="success">保存</Button>
      </div>
    </Modal>

    <!-- 编辑处方用法 -->
    <Modal v-model="editPrescriptionUsageModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">编辑处方用法</Col>
      </p>

      <Row class="ivu-mb">
        <div style="height:32px;line-height:32px;width:80px;float:left">处方用法</div>
        <div style="border-bottom:1px solid #ccc;height:16px;float:left;width:calc(100% - 200px)"></div>
        <div style="width:120px;float:left" class="ivu-text-right">
          <Button type="success">+新增用法</Button>
        </div>
      </Row>
      <Table border :columns="columns8" :data="data8"></Table>

      <div slot="footer"></div>
    </Modal>

    <!-- 添加供货商 -->
    <Modal v-model="addSupplierModal" class="mymodal">
      <p slot="header">
        <Col span="24">选择往来单位</Col>
      </p>
      <Table border :columns="columns9" :data="data9"></Table>
      <div slot="footer">
        <Button type="success">确定</Button>
      </div>
    </Modal>

    <!-- 添加处方 -->
    <Modal v-model="addPrescriptionModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">处方</Col>
      </p>

      <Tabs value="name1" class="mytabs">
        <TabPane label="选择消费项目" name="name1">
          <Row :gutter="16">
            <Col span="6">
              <Row class-name="module-title-wrapper">
                <Col>
                  <span class="module-title">商品分类列表</span>
                </Col>
              </Row>
              <Row>
                <Col style="padding:8px 16px;border:1px solid #ccc">
                  <Tree :data="prescriptionData"></Tree>
                </Col>
              </Row>
            </Col>
            <Col span="18">
              <Row class-name="module-title-wrapper">
                <Col span="8">
                  <span class="module-title">商品列表</span>
                </Col>
                <Col span="16" class="ivu-text-right">
                  <Button type="success" class="mr10" @click="handleAddGoodsModal">快速添加</Button>
                  <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
                </Col>
              </Row>
              <Row class="ivu-mt">
                <Table border :columns="columns3" :data="data3"></Table>
              </Row>
            </Col>
          </Row>

          <Row class-name="module-title-wrapper ivu-mt">
            <Col span="8">
              <span class="module-title">已选商品列表</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Checkbox v-model="record.check">根据用量反算数量</Checkbox>
              <Button type="success" class="mr10">+保存为组合</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
          <Row>
            <Table border :columns="columns11" :data="data11">
              <template slot-scope="{ row, index }" slot="code">
                <Input type="text" />
              </template>
            </Table>
          </Row>
        </TabPane>
        <TabPane label="处方组合" name="name2">
          <Row :gutter="16">
            <Col span="6">
              <Row class-name="module-title-wrapper">
                <Col>
                  <span class="module-title">商品组合列表</span>
                </Col>
              </Row>
              <Row>
                <Col style="padding:8px 16px;border:1px solid #ccc">
                  <Tree :data="consumptionTypeData"></Tree>
                </Col>
              </Row>
            </Col>
            <Col span="18">
              <Row class-name="module-title-wrapper">
                <Col span="8">
                  <span class="module-title">商品组合详情</span>
                </Col>
                <Col span="16" class="ivu-text-right">
                  <Button type="success" class="mr10">快速添加</Button>
                  <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
                </Col>
              </Row>
              <Row class="ivu-mt">
                <Table border :columns="columns3s" :data="data3s"></Table>
              </Row>
            </Col>
          </Row>

          <Row class-name="module-title-wrapper ivu-mt">
            <Col span="8">
              <span class="module-title">已选商品列表</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Checkbox v-model="record.check">根据用量反算数量</Checkbox>
              <Button type="success" class="mr10">+保存为组合</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
          <Row>
            <Table border :columns="columns12" :data="data12"></Table>
          </Row>
        </TabPane>
      </Tabs>

      <div slot="footer">
        <Row>
          <Col span="12" class="ivu-text-left">
            <Button type="info">上移</Button>
            <Button type="warning">下移</Button>
          </Col>
          <Col span="12" class="ivu-text-right">
            <span class="mr10">合计：0.00元</span>
            <Button type="success">保存</Button>
          </Col>
        </Row>
      </div>
    </Modal>

    <!-- 添加处置 -->
    <Modal v-model="addHandleModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">处置</Col>
      </p>

      <Tabs value="name1" class="mytabs">
        <TabPane label="选择消费项目" name="name1">
          <Row :gutter="16">
            <Col span="6">
              <Row class-name="module-title-wrapper">
                <Col>
                  <span class="module-title">商品分类列表</span>
                </Col>
              </Row>
              <Row>
                <Col style="padding:8px 16px;border:1px solid #ccc">
                  <Tree :data="handleData"></Tree>
                </Col>
              </Row>
            </Col>
            <Col span="18">
              <Row class-name="module-title-wrapper">
                <Col span="8">
                  <span class="module-title">商品列表</span>
                </Col>
                <Col span="16" class="ivu-text-right">
                  <Button type="success" class="mr10" @click="handleAddGoodsModal">快速添加</Button>
                  <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
                </Col>
              </Row>
              <Row class="ivu-mt">
                <Table border :columns="columns3" :data="data3"></Table>
              </Row>
            </Col>
          </Row>

          <Row class-name="module-title-wrapper ivu-mt">
            <Col span="8">
              <span class="module-title">已选商品列表</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Checkbox v-model="record.check">根据用量反算数量</Checkbox>
              <Button type="success" class="mr10">+保存为组合</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
          <Row>
            <Table border :columns="columns13" :data="data13">
              <template slot-scope="{ row, index }" slot="code">
                <Input type="text" />
              </template>
              <template slot-scope="{ row, index }" slot="equipment">
                <Select value="0">
                  <Option value="0">条目一</Option>
                  <Option value="1">条目二</Option>
                  <Option value="2">条目三</Option>
                  <Option value="3">条目四</Option>
                </Select>
              </template>
            </Table>
          </Row>
        </TabPane>
        <TabPane label="处置组合" name="name2">
          <Row :gutter="16">
            <Col span="6">
              <Row class-name="module-title-wrapper">
                <Col>
                  <span class="module-title">商品组合列表</span>
                </Col>
              </Row>
              <Row>
                <Col style="padding:8px 16px;border:1px solid #ccc">
                  <Tree :data="consumptionTypeData"></Tree>
                </Col>
              </Row>
            </Col>
            <Col span="18">
              <Row class-name="module-title-wrapper">
                <Col span="8">
                  <span class="module-title">商品组合详情</span>
                </Col>
                <Col span="16" class="ivu-text-right">
                  <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
                </Col>
              </Row>
              <Row class="ivu-mt">
                <Table border :columns="columns3s" :data="data3s"></Table>
              </Row>
            </Col>
          </Row>

          <Row class-name="module-title-wrapper ivu-mt">
            <Col span="8">
              <span class="module-title">已选商品列表</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Button type="success" class="mr10">+保存为组合</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
          <Row>
            <Table border :columns="columns13" :data="data13">
              <template slot-scope="{ row, index }" slot="code">
                <Input type="text" />
              </template>
              <template slot-scope="{ row, index }" slot="equipment">
                <Select value="0">
                  <Option value="0">条目一</Option>
                  <Option value="1">条目二</Option>
                  <Option value="2">条目三</Option>
                  <Option value="3">条目四</Option>
                </Select>
              </template>
            </Table>
          </Row>
        </TabPane>
      </Tabs>

      <div slot="footer">
        <Row>
          <Col span="12" class="ivu-text-left">
            <Button type="info">上移</Button>
            <Button type="warning">下移</Button>
          </Col>
          <Col span="12" class="ivu-text-right">
            <span class="mr10">合计：0.00元</span>
            <Button type="success">保存</Button>
          </Col>
        </Row>
      </div>
    </Modal>

    <!-- 添加手术 -->
    <Modal v-model="addOperationModal" width="60%" class="mymodal">
      <p slot="header">
        <Col span="24">手术</Col>
      </p>

      <Tabs value="name1" class="mytabs">
        <TabPane label="选择消费项目" name="name1">
          <Row :gutter="16">
            <Col span="6">
              <Row class-name="module-title-wrapper">
                <Col>
                  <span class="module-title">商品分类列表</span>
                </Col>
              </Row>
              <Row>
                <Col style="padding:8px 16px;border:1px solid #ccc">
                  <Tree :data="operationData"></Tree>
                </Col>
              </Row>
            </Col>
            <Col span="18">
              <Row class-name="module-title-wrapper">
                <Col span="8">
                  <span class="module-title">商品列表</span>
                </Col>
                <Col span="16" class="ivu-text-right">
                  <Button type="success" class="mr10" @click="handleAddGoodsModal">快速添加</Button>
                  <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
                </Col>
              </Row>
              <Row class="ivu-mt">
                <Table border :columns="columns3" :data="data3"></Table>
              </Row>
            </Col>
          </Row>

          <Row class-name="module-title-wrapper ivu-mt">
            <Col span="8">
              <span class="module-title">已选商品列表</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Button type="success" class="mr10">+保存为组合</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
          <Row>
            <Table border :columns="columns13" :data="data13">
              <template slot-scope="{ row, index }" slot="code">
                <Input type="text" />
              </template>
              <template slot-scope="{ row, index }" slot="equipment">
                <Select value="0">
                  <Option value="0">条目一</Option>
                  <Option value="1">条目二</Option>
                  <Option value="2">条目三</Option>
                  <Option value="3">条目四</Option>
                </Select>
              </template>
            </Table>
          </Row>
        </TabPane>
        <TabPane label="手术组合" name="name2">
          <Row :gutter="16">
            <Col span="6">
              <Row class-name="module-title-wrapper">
                <Col>
                  <span class="module-title">商品组合列表</span>
                </Col>
              </Row>
              <Row>
                <Col style="padding:8px 16px;border:1px solid #ccc">
                  <Tree :data="operationTypeData"></Tree>
                </Col>
              </Row>
            </Col>
            <Col span="18">
              <Row class-name="module-title-wrapper">
                <Col span="8">
                  <span class="module-title">商品组合详情</span>
                </Col>
                <Col span="16" class="ivu-text-right">
                  <Input prefix="ios-search" v-width="300" placeholder="名称/编号/条形码" />
                </Col>
              </Row>
              <Row class="ivu-mt">
                <Table border :columns="columns3s" :data="data3s"></Table>
              </Row>
            </Col>
          </Row>

          <Row class-name="module-title-wrapper ivu-mt">
            <Col span="8">
              <span class="module-title">已选商品列表</span>
            </Col>
            <Col span="16" class="ivu-text-right">
              <Button type="success" class="mr10">+保存为组合</Button>
              <Button type="error">删除</Button>
            </Col>
          </Row>
          <Row>
            <Table border :columns="columns12" :data="data12"></Table>
          </Row>
        </TabPane>
      </Tabs>

      <div slot="footer">
        <Row>
          <Col span="12" class="ivu-text-left">
            <Button type="info">上移</Button>
            <Button type="warning">下移</Button>
          </Col>
          <Col span="12" class="ivu-text-right">
            <span class="mr10">合计：0.00元</span>
            <Button type="success">保存</Button>
          </Col>
        </Row>
      </div>
    </Modal>

    <!-- 添加回访 -->
    <Modal v-model="addReturnVisitModal" class="mymodal">
      <p slot="header">
        <Col span="24">回访</Col>
      </p>

      <Row :gutter="16">
        <Form ref="form" :model="record" :rules="rules" :label-width="100" class="myform">
          <FormItem label="预约状态">
            <Select value="0">
              <Option value="0">未回访</Option>
            </Select>
          </FormItem>
          <FormItem label="创建时间">2020年2月13日16:17:19</FormItem>
          <FormItem label="顾客姓名">宋涛</FormItem>
          <FormItem label="联系方式">15544554455</FormItem>
          <FormItem label="宠物姓名">cici</FormItem>
          <FormItem label="预约类型">回访</FormItem>
          <FormItem label="预约日期">
            <DatePicker type="datetime" placeholder="请选择预约日期及时间" style="width: 100%"></DatePicker>
          </FormItem>
          <FormItem label="备注">
            <Input type="textarea" :rows="4" />
          </FormItem>
          <FormItem class="lb0">
            <Checkbox style="width:100px;text-align:right;padding-right:12px;margin-right:0">微信提醒</Checkbox>
            <span style="color:#ccc">尚未设置提醒规则</span>
          </FormItem>
          <FormItem class="lb0">
            <Checkbox
              style="width:100px;text-align:right;padding-right:12px;margin-right:0"
              v-model="record.check"
            >短信提醒</Checkbox>
            <span style="color:#ccc">尚未设置提醒规则</span>
          </FormItem>
        </Form>
      </Row>

      <Row>
        <Col span="12" class="ivu-text-center">
          <Button type="primary">设置自动提醒规则</Button>
        </Col>
        <Col span="12" class="ivu-text-center">
          <Button type="info">修改本次提醒规则</Button>
        </Col>
      </Row>

      <div slot="footer">
        <Button type="success">确定</Button>
      </div>
    </Modal>
  </Row>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        type: 'selection'
                    },
                    {
                        title: '编组',
                        width: 80
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '规格',
                        width: 80
                    },
                    {
                        title: '单位',
                        width: 80
                    },
                    {
                        title: '数量',
                        key: 'num',
                        width: 80
                    },
                    {
                        title: '总计',
                        key: 'total',
                        width: 80
                    },
                    {
                        title: '备注',
                        width: 80
                    },
                    {
                        title: '处理状态',
                        key: 'status',
                        width: 100
                    },
                    {
                        title: '查看',
                        width: 80,
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
                                            click: () => {}
                                        }
                                    },
                                    '查看'
                                )
                            ]);
                        }
                    },
                    {
                        title: '仪器结果',
                        width: 100,
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
                                            click: () => {}
                                        }
                                    },
                                    '查看'
                                )
                            ]);
                        }
                    },
                    {
                        title: '结算状态',
                        key: 'auditStatus',
                        width: 100
                    },
                    {
                        title: '添加人',
                        key: 'creator',
                        width: 100
                    }
                ],
                columns2: [
                    {
                        type: 'selection'
                    },
                    {
                        title: '编组',
                        width: 80
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '规格',
                        width: 80
                    },
                    {
                        title: '用法',
                        width: 80
                    },
                    {
                        title: '用量',
                        width: 80
                    },
                    {
                        title: '单位',
                        width: 80
                    },
                    {
                        title: '单价',
                        width: 80
                    },
                    {
                        title: '数量',
                        key: 'num',
                        width: 80
                    },
                    {
                        title: '总计',
                        key: 'total',
                        width: 80
                    },
                    {
                        title: '备注',
                        width: 80
                    },
                    {
                        title: '处理状态',
                        key: 'status',
                        width: 100
                    },
                    {
                        title: '结算状态',
                        key: 'auditStatus',
                        width: 100
                    },
                    {
                        title: '添加人',
                        key: 'creator',
                        width: 100
                    }
                ],
                data1: [
                    {
                        name: '尿液检查8项',
                        num: '1.0',
                        total: '0.00',
                        status: '待处理',
                        auditStatus: '未付款',
                        creator: '管理员',
                        unit: '小时',
                        unitPrice: '0.00'
                    }
                ],
                registrationListColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '挂号时间',
                        key: 'time'
                    },
                    {
                        title: '顾客信息',
                        key: 'info'
                    },
                    {
                        title: '主治医师',
                        key: 'doctor'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        key: 'dosomething',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '2px',
                                            marginTop: '2px'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '接诊'
                                )
                            ]);
                        }
                    }
                ],
                registratiData: [
                    {
                        time: '2020-02-02',
                        info: '张(夏天)',
                        doctor: '昌宏瑞',
                        status: '待接诊'
                    }
                ],
                type: '门诊挂号',
                doctor: '王艳',
                searchType: '默认全部搜索',
                list: [
                    { name: '张华(贝贝)', phone: '1345678987' },
                    { name: '张华(贝贝2)', phone: '1345678987' },
                    { name: '张华(贝贝3)', phone: '1345678987' },
                    { name: '张华(贝贝4)', phone: '1345678987' }
                ],
                currentName: '张华(贝贝)',
                recordList: [
                    { id: '1', name: '病历', time: '今天' },
                    { id: '2', name: '病历', time: '2020-03-19' },
                    { id: '3', name: '病历', time: '2020-02-23' },
                    { id: '4', name: '病历', time: '2020-03-20' }
                ],
                currentRecordId: '1',
                registrationFormModal: false,
                people: '全体员工',
                record: {
                    creatTime: '2020-03-19',
                    name: '',
                    check: true
                },
                rules: {
                    name: [{ required: true, message: '请输名称', trigger: 'blur' }]
                },
                consumptionTypeData: [
                    {
                        title: '检验',
                        expand: true,
                        children: [
                            {
                                title: '尿常规(犬类)',
                                expand: false
                            },
                            {
                                title: '尿常规(猫类)',
                                expand: false
                            }
                        ]
                    },
                    {
                        title: '影像校验',
                        expand: true,
                        children: [
                            {
                                title: 'B超检查',
                                expand: false
                            }
                        ]
                    }
                ],
                prescriptionData: [
                    {
                        title: '处方',
                        expand: true,
                        children: [
                            {
                                title: '口服类',
                                expand: false
                            },
                            {
                                title: '疫苗服务',
                                expand: false
                            }
                        ]
                    }
                ],
                handleData: [
                    {
                        title: '处置',
                        expand: true,
                        children: [
                            {
                                title: '处置类',
                                expand: false
                            }
                        ]
                    }
                ],
                operationData: [
                    {
                        title: '手术',
                        expand: true,
                        children: [
                            {
                                title: '肛门与直肠',
                                expand: false
                            },
                            {
                                title: '骨科',
                                expand: false
                            }
                        ]
                    }
                ],
                operationTypeData: [
                    {
                        title: '展开文件夹一',
                        expand: true,
                        children: [
                            {
                                title: '文件夹一',
                                expand: true,
                                children: [
                                    {
                                        title: '文件一',
                                        expand: false
                                    }
                                ]
                            }
                        ]
                    }
                ],
                packageData: [
                    {
                        title: '挂号',
                        expand: true,
                        children: [
                            {
                                title: '挂号服务',
                                expand: false
                            },
                            {
                                title: '住院费用',
                                expand: false
                            }
                        ]
                    },
                    {
                        title: '处方',
                        expand: true,
                        children: [
                            {
                                title: '口服类',
                                expand: false
                            }
                        ]
                    }
                ],
                columns3: [
                    {
                        title: '编号'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '条形码'
                    }
                ],
                data3: [
                    {
                        name: '腹部',
                        unitPrice: '0.00'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00'
                    }
                ],
                columns3s: [
                    {
                        title: '编号'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '数量'
                    },
                    {
                        title: '用法'
                    },
                    {
                        title: '用量'
                    },
                    {
                        title: '条形码'
                    }
                ],
                data3s: [
                    {
                        name: '腹部',
                        unitPrice: '0.00'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00'
                    }
                ],
                columns4: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '编组',
                        key: 'code',
                        slot: 'code'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '检验设备',
                        key: 'equipment',
                        slot: 'equipment',
                        width: 120
                    },
                    {
                        title: '部位',
                        slot: 'equipment',
                        width: 120
                    },
                    {
                        title: '体位',
                        slot: 'equipment',
                        width: 120
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice',
                        slot: 'code'
                    },
                    {
                        title: '数量',
                        key: 'num',
                        slot: 'code'
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        slot: 'code'
                    }
                ],
                data4: [
                    {
                        name: '腹部',
                        unitPrice: '0.00'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00'
                    }
                ],
                columns4s: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '编组',
                        key: 'code'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '检验设备',
                        key: 'equipment',
                        slot: 'equipment',
                        width: 120
                    },
                    {
                        title: '部位',
                        slot: 'equipment',
                        width: 120
                    },
                    {
                        title: '体位',
                        slot: 'equipment',
                        width: 120
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                data4s: [
                    {
                        name: '腹部',
                        unitPrice: '0.00',
                        num: '1.0'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00',
                        num: '1.0'
                    }
                ],
                columns5: [
                    {
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '商品编号',
                        key: 'code'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '组合数量',
                        key: 'num'
                    }
                ],
                columns6: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '商品编号',
                        key: 'code'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '组合数量',
                        key: 'num'
                    }
                ],
                data5: [
                    {
                        name: '222',
                        unitPrice: '0.00'
                    },
                    {
                        name: '3333',
                        unitPrice: '0.00'
                    }
                ],
                data6: [
                    {
                        name: '腹部',
                        unitPrice: '0.00'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00'
                    }
                ],
                columns7: [
                    {
                        title: '序号',
                        key: 'serialNum'
                    },
                    {
                        title: '用法',
                        key: 'usage'
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '10px'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '删除'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '编辑'
                                )
                            ]);
                        }
                    }
                ],
                data7: [
                    {
                        serialNum: '1',
                        usage: '直肠灌注'
                    },
                    {
                        serialNum: '2',
                        usage: '腹腔注射'
                    }
                ],
                columns8: [
                    {
                        title: '供货商名称',
                        key: 'name'
                    },
                    {
                        title: '供货商价格',
                        key: 'price',
                        slot: 'price'
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        }
                    }
                ],
                data8: [
                    {
                        name: 'xxx'
                    },
                    {
                        name: 'sss'
                    }
                ],
                columns9: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '往来单位',
                        key: 'name'
                    }
                ],
                data9: [
                    {
                        name: '上海公司'
                    },
                    {
                        name: '苏州公司'
                    }
                ],
                columns10: [
                    {
                        title: '单号',
                        key: 'order'
                    },
                    {
                        title: '有效期',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    },
                                    '删除'
                                )
                            ]);
                        }
                    }
                ],
                data10: [
                    {
                        time: '2020年3月22日'
                    },
                    {
                        time: '2020年3月23日'
                    }
                ],
                columns11: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '编组',
                        key: 'code'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '用法'
                    },
                    {
                        title: '用量',
                        key: 'num',
                        slot: 'code'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice',
                        slot: 'code'
                    },
                    {
                        title: '数量',
                        key: 'num',
                        slot: 'code'
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        slot: 'code'
                    }
                ],
                data11: [
                    {
                        name: '腹部',
                        unitPrice: '0.00'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00'
                    }
                ],
                columns12: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '编组',
                        key: 'code'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '用法'
                    },
                    {
                        title: '用量'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                data12: [
                    {
                        name: '腹部',
                        unitPrice: '0.00',
                        num: '1.0'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00',
                        num: '1.0'
                    }
                ],
                columns13: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '编组',
                        key: 'code',
                        slot: 'code'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '用法',
                        width: '120',
                        slot: 'equipment'
                    },
                    {
                        title: '用量',
                        slot: 'code'
                    },
                    {
                        title: '规格'
                    },
                    {
                        title: '单位'
                    },
                    {
                        title: '单价',
                        key: 'unitPrice',
                        slot: 'code'
                    },
                    {
                        title: '数量',
                        key: 'num',
                        slot: 'code'
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        slot: 'code'
                    }
                ],
                data13: [
                    {
                        name: '腹部',
                        unitPrice: '0.00',
                        num: '1.0'
                    },
                    {
                        name: '眼部',
                        unitPrice: '0.00',
                        num: '1.0'
                    }
                ],
                addCheckModal: false,
                addGoodsModal: false,
                addPackageModal: false,
                editPrescriptionUsageModal: false,
                addSupplierModal: false,
                addPrescriptionModal: false,
                addHandleModal: false,
                addOperationModal: false,
                addReturnVisitModal: false
            };
        },
        methods: {
            switchList (name) {
                this.currentName = name;
            },
            switchRecordList (id) {
                this.currentRecordId = id;
            },
            showRegistrationForm () {
                this.registrationFormModal = true;
            },
            handleAddCheckModal () {
                this.addCheckModal = true;
            },
            handleAddGoodsModal () {
                this.addGoodsModal = true;
            },
            handleAddPackageModal () {
                this.addPackageModal = true;
            },
            handleEditPrescriptionUsageModal () {
                this.editPrescriptionUsageModal = true;
            },
            handleAddSupplierModal () {
                this.addSupplierModal = true;
            },
            handleAddPrescriptionModal () {
                this.addPrescriptionModal = true;
            },
            handleAddHandleModal () {
                this.addHandleModal = true;
            },
            handleAddOperationModal () {
                this.addOperationModal = true;
            },
            handleAddReturnVisitModal () {
                this.addReturnVisitModal = true;
            }
        },
        mounted () {}
    };
</script>
<style lang="less" scoped>
.box {
  padding-left: 15px;
}
.mtb15 {
  margin: 15px 0;
}
.mlr15 {
  margin: 0 15px;
}
.borderandpadding {
  border-bottom: 1px solid #ddd;
  padding-bottom: 22px;
}
.padding8 {
  padding: 8px;
}
.padding08 {
  padding: 0 8px;
}
.br1 {
  height: 1620px;
  border-right: 1px solid #ccc;
}

.mt10 {
  margin-top: 10px;
}

.mh-list {
  height: 400px;
  overflow: auto;
}
</style>
<style lang="less">
.mymodal .ivu-modal-header {
  background: #f6f6f6;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
/*模块标题*/
.module-title-wrapper {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e9eaec;
  font-weight: 700;
  background-color: #f6f6f6;
  padding: 0 16px;
  margin: 0;
}
.ptb0 .ivu-card-body {
  padding: 0 16px;
}
//使所有页面的表格的td和th都居中
.ivu-table-wrapper td {
  text-align: center;
}
.ivu-table-wrapper th {
  text-align: center;
}
.animal-list {
  height: 265px;
  overflow: auto;
}
.animal-list .ivu-list-item {
  padding: 0;
}
.animal-list .ivu-list-item p {
  padding: 12px 0;
  width: 100%;
}
.animal-list .active {
  background: #ddd;
}

.record-list {
  height: 265px;
  overflow: auto;
  border: 1px solid #ccc;
}
.record-list .ivu-list-item {
  padding: 0;
}
.record-list .record {
  width: 100%;
  padding: 12px;
}
.record-list .active {
  background: #ddd;
}

.lb0 .ivu-form-item-content {
  margin: 1px 0;
  margin-left: 0 !important;
}
.lb140 .ivu-form-item-label {
  width: 140px !important;
}
.lb140 .ivu-form-item-content {
  margin-left: 140px !important;
}
.use-setting .ivu-form-item-label {
  text-align: left;
}
</style>
