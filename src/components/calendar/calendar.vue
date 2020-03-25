<template>
  <div>
    <div id="calendar"></div>
    <Modal v-model="eventModal" :mask-closable="false" width="800">
      <p slot="header">
        <span v-show="!isEdit">添加事件</span>
        <span v-show="isEdit">编辑事件</span>
      </p>
      <Form ref="eventAddForm" :model="eventAddForm" :rules="eventAddValidate" :label-width="120">
        <Row>
          <Col span="20">
            <FormItem prop="event" :label="'日程内容:'">
              <Input v-model="eventAddForm.event" type="text" :rows="4" placeholder="记录你将要做的一件事..."></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="开始时间:">
              <DatePicker
                type="date"
                format="yyyy-MM-dd"
                :value="eventAddForm.startdate"
                :options="startDateOption"
                @on-change="startDateChange"
                style="width:60%;"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem :label="'结束时间：'">
              <DatePicker
                type="date"
                format="yyyy-MM-dd"
                :value="eventAddForm.enddate"
                :options="endDateOption"
                @on-change="endDateChange"
                style="width:60%;"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button
          v-show="isEdit"
          style="margin-left:5px;float: left;"
          type="error"
          @click="eventDel"
        >删除</Button>
        <Button style="margin-left:5px;" type="primary" @click="eventAdd">保存</Button>
        <Button style="margin-left:5px;" type="default" @click="eventModal=false">关闭</Button>
      </div>
    </Modal>
    <!--course-->
    <Modal v-model="showCourseEventDetail">
      <p slot="header" style="color:#57a3f3;text-align:left">
        <span>课程表</span>
      </p>
      <div class="event-detail-wrapper">
        <div class="event-detail-item">
          <span class="event-detail-item-title">课程名称:</span>
          {{courseEventDetail.title}}
        </div>
        <div class="event-detail-item">
          <span class="event-detail-item-title">课程开始时间:</span>
          {{courseEventDetail.startTime}}
        </div>
        <div class="event-detail-item">
          <span class="event-detail-item-title">课程结束时间:</span>
          {{courseEventDetail.endTime}}
        </div>
        <div class="event-detail-item">
          <span class="event-detail-item-title">课程上课地点:</span>
          {{courseEventDetail.classroomName}}
        </div>
      </div>
      <div slot="footer">
        <!-- <router-link :to="{name:'student-virtualclass'}"> -->
          <Button type="info" size="large">进入直播间</Button>
        <!-- </router-link> -->
        <Button type="primary" size="large" @click="showCourseEventDetail = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
    import $ from 'jquery';
    import 'fullcalendar';
    import 'fullcalendar/dist/locale/zh-cn';
    import 'fullcalendar/dist/fullcalendar.css';
    import { formatDate } from '@/libs/util';
    export default {
        name: 'calendar',
        props: {},
        data () {
            return {
                isEdit: false,
                eventModal: false,
                eventAddForm: {
                    event: '',
                    startdate: '',
                    enddate: ''
                },
                eventAddValidate: {
                    event: [{ required: true, message: '请输入日程内容!', trigger: 'blur' }]
                },
                startDateOption: {},
                endDateOption: {},
                eventId: '',
                showCourseEventDetail: false,
                courseEventDetail: {}
            };
        },
        mounted () {
            this.$nextTick(() => {
                setTimeout(() => {
                    // 此处不设置延时调用的话，页面跳转时日历加载不出来
                    this.calendarInit();
                }, 100);
            });
        },
        methods: {
            calendarInit () {
                // let vm = this
                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev today',
                        center: 'title',
                        right: 'next'
                    },
                    dragOpacity: {
                        agenda: 0.5,
                        '': 0.5
                    },
                    defaultView: 'month',
                    locale: 'zh-cn',
                    height: 420,
                    eventLimit: 3,
                    selectable: true,
                    editable: true,
                    themeSystem: 'standard',
                    events: (start, end, timezone, callback) => {
                        // this.$post(
                        //     '/portal/student/calendar/list.json',
                        //     {
                        //         calendarStart: start.unix(),
                        //         calendarEnd: end.unix()
                        //     },
                        //     response => {
                        //         let newEvents = [];
                        //         response.data.forEach((item, index, array) => {
                        //             if (item.id === null) {
                        //                 delete item.id;
                        //             }

                        //             if (item.eventType === 0) {
                        //                 item.editable = false;
                        //                 item.color = '#ff8a7c';
                        //             } else {
                        //                 item.color = '#077fd2';
                        //             }
                        //             item.end = this.cc(item.end, -1);
                        //             newEvents.push(item);
                        //         });
                        //         callback(newEvents);
                        //     }
                        // );
                    },
                    eventDrop: (event, dayDelta, revertFunc) => {
                        // console.log('事件 event...', event, dayDelta, revertFunc)
                        if (event.eventType === 1) {
                            this.$get(
                                '/portal/student/calendar/draw.json',
                                {
                                    id: event.id,
                                    daydiff: dayDelta.days()
                                },
                                response => {
                                    if (response.data.code === '200') {
                                        this.$Message.success('操作成功');
                                    } else {
                                        revertFunc();
                                        this.$Message.warning(response.data.message);
                                    }
                                }
                            );
                        } else {
                            this.$Message.warning('该事件不能操作');
                        }
                    },
                    eventResize: (event, dayDelta, revertFunc) => {
                        // console.log('事件 resize...', event, dayDelta, revertFunc)
                        if (event.eventType === 1) {
                            this.$get(
                                '/portal/student/calendar/resize.json',
                                {
                                    id: event.id,
                                    daydiff: dayDelta.days()
                                },
                                response => {
                                    if (response.data.code === '200') {
                                        this.$Message.success('操作成功');
                                    } else {
                                        revertFunc();
                                        this.$Message.warning(response.data.message);
                                    }
                                }
                            );
                        } else {
                            this.$Message.warning('该事件不能操作');
                        }
                    },
                    select: (startDate, endDate, jsEvent, view) => {
                        // console.log('事件 select...', startDate, endDate, jsEvent)
                        let start = startDate.format();
                        let end = this.cc(endDate.format(), 1);

                        this.$refs.eventAddForm.resetFields();

                        this.eventAddForm.startdate = start;
                        this.eventAddForm.enddate = end;
                        this.startDateOption = {
                            disabledDate: date => {
                                let time = end ? new Date(end).valueOf() : '';
                                return date && date.valueOf() > time;
                            }
                        };
                        this.endDateOption = {
                            disabledDate: date => {
                                let time = start ? new Date(start).valueOf() : '';
                                return date && date.valueOf() < time - 86400000;
                            }
                        };
                        this.isEdit = false;
                        this.eventId = '';
                        this.eventModal = true;
                    },
                    dayClick: (date, jsEvent, view) => {
                        // console.log('事件 dayclick...', date, jsEvent, view)
                    },
                    eventClick: (calEvent, jsEvent, view) => {
                        // console.log("事件 eventclick...", calEvent, jsEvent, view);
                        console.log(calEvent);
                        if (calEvent.eventType === 1) {
                            this.$refs.eventAddForm.resetFields();
                            this.$get(
                                '/portal/student/calendar/detail.json',
                                {
                                    id: calEvent.id
                                },
                                response => {
                                    this.isEdit = true;
                                    let data = response.data;
                                    this.eventId = data.id;
                                    this.eventAddForm.event = data.title;
                                    this.eventAddForm.startdate = data.start;
                                    this.eventAddForm.enddate = data.end;
                                    this.startDateOption = {
                                        disabledDate: date => {
                                            let time = data.end ? new Date(data.end).valueOf() : '';
                                            return date && date.valueOf() > time;
                                        }
                                    };
                                    this.endDateOption = {
                                        disabledDate: date => {
                                            let time = data.start ? new Date(data.start).valueOf() : '';
                                            return date && date.valueOf() < time - 86400000;
                                        }
                                    };

                                    this.eventModal = true;
                                }
                            );
                        } else {
                            // 点击事件弹出modal
                            this.courseEventDetail = calEvent;
                            this.showCourseEventDetail = true;
                            // this.$Message.warning("该事件不能操作");
                        }
                    }
                });
            },
            cc (dd, dadd) {
                var a = new Date(dd);
                a = a.valueOf();
                a = a - dadd * 24 * 60 * 60 * 1000;
                a = new Date(a);
                return formatDate(a, 'yyyy-MM-dd');
            },
            startDateChange (e) {
                this.endDateOption = {
                    disabledDate: date => {
                        let time = e ? new Date(e).valueOf() : '';
                        return date && date.valueOf() < time - 86400000;
                    }
                };
                this.$set(this.eventAddForm, 'startdate', e);
            },
            endDateChange (e) {
                this.startDateOption = {
                    disabledDate: date => {
                        let time = e ? new Date(e).valueOf() : '';
                        return date && date.valueOf() > time;
                    }
                };
                this.$set(this.eventAddForm, 'enddate', e);
            },
            eventAdd () {
                this.$refs.eventAddForm.validate(valid => {
                    if (valid) {
                        this.$post(
                            '/portal/student/calendar/edit.json',
                            {
                                id: this.eventId,
                                event: this.eventAddForm.event,
                                startdate: this.eventAddForm.startdate,
                                enddate: this.eventAddForm.enddate
                            },
                            response => {
                                if (response.data.code === '200') {
                                    this.eventModal = false;
                                    $('#calendar').fullCalendar('refetchEvents'); // 重新获取所有事件数据
                                    this.$Message.success('保存成功');
                                } else {
                                    this.$Message.warning(response.data.message);
                                }
                            }
                        );
                    }
                });
            },
            eventDel () {
                this.$Modal.warning({
                    title: '提示',
                    content: '您确定要删除吗？',
                    onOk: () => {
                        this.$post(
                            '/portal/student/calendar/delete.json',
                            {
                                id: this.eventId
                            },
                            response => {
                                if (response.data.code === '200') {
                                    this.eventModal = false;
                                    $('#calendar').fullCalendar('refetchEvents'); // 重新获取所有事件数据
                                    this.$Message.success('删除成功');
                                } else {
                                    this.$Message.warning(response.data.message);
                                }
                            }
                        );
                    }
                });
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.default-calendar {
  min-height: 350px;
}
.event-detail-wrapper {
  font-size: 14px;
  .event-detail-item {
    margin-top: 6px;
    .event-detail-item-title {
      display: inline-block;
      padding-right: 6px;
      text-align: right;
      width: 8em;
      font-weight: 600;
    }
  }
}
@media (max-width: 1200px) {
  .default-calendar {
    margin-top: 20px;
  }
}
</style>
