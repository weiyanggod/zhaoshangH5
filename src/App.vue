<template>
  <div id="app" v-loading="loading" element-loading-text="导出中">
    <div class="container">
      <el-container>
        <el-container>
          <el-header>
            <el-date-picker
              v-model="chooseTime"
              type="daterange"
              align="right"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button type="success" style="margin-left: 10px" @click="handleSearch">查询</el-button>
            <el-button type="danger" style="margin-left: 10px" @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleExport(false)">导出</el-button>
            <el-button type="primary" @click="printPDF">打印</el-button>
          </el-header>
          <el-container>
            <el-main ref="exportContent" id="pdfDom">
              <div class="print-main" id="print">
                <!-- 头部 -->
                <div class="header">
                  <img class="header-back" src="./assets/icon/header.png" />
                  <div class="time">
                    <img class="time-back" src="./assets/标题背景.png" />
                    <div class="time-text">
                      {{ this.year }}年第{{ period }}期（{{ formatDate(startTime) }}-{{ formatDate(endTime) }}）
                    </div>
                  </div>
                </div>
                <!-- 内容 -->
                <div class="body" style="margin-top: 60px">
                  <!-- 内容 -->
                  <div>
                    <div class="part" style="border-radius: 10px 10px 10px 10px">
                      <!-- 区主要领导招商动态 -->
                      <div v-if="mainNewsList.length != 0">
                        <div v-for="(item, index) in mainNewsList" :key="index">
                          <div class="itemClass">
                            <div class="title" v-if="index === 0">
                              <img src="@/assets/icon/小标题.png" class="title-img" />
                              <div class="title-text">区主要领导招商动态</div>
                            </div>
                            <div class="content">
                              {{ '（' + numberConvertToUppercase()(index + 1) + '）' + item.field0003 }}
                            </div>
                          </div>
                          <el-divider v-if="index !== mainNewsList.length - 1"></el-divider>
                        </div>
                      </div>
                      <!-- 各主体招商动态 -->
                      <div v-if="Subject.length != 0">
                        <div v-if="Subject.length != 0" class="xiuzhou">
                          <div v-for="(item, index) in Subject" :key="index">
                            <div class="itemClass">
                              <div class="title mt-10" v-show="index === 0">
                                <img src="@/assets/icon/小标题.png" class="title-img" />
                                <div class="title-text">各主体“一把手”招商动态</div>
                              </div>
                              <div style="display: flex; margin-top: 10px">
                                <el-image
                                  fit="cover"
                                  :src="item.uurl"
                                  class="project-img"
                                  :preview-src-list="[item.uurl]"
                                >
                                  <div slot="error" class="image-slot">暂无图片</div>
                                </el-image>
                                <div style="display: flex; text-align: left; margin-left: 10px">
                                  <div style="width: 38%">
                                    <div>
                                      <div style="margin-top: 3px">接洽时间：{{ item.field0005 }}</div>
                                      <div style="margin-top: 3px">接洽地点：{{ item.field0006 }}</div>
                                      <div style="margin-top: 3px; display: flex">
                                        <div style="white-space: nowrap">接洽对象：</div>
                                        <div>{{ item.field0008 }}</div>
                                      </div>
                                      <div style="margin-top: 3px">接洽形式：{{ item.field0007 }}</div>
                                      <div v-if="item.field0019 != null">区领导：{{ item.field0019 }}</div>
                                    </div>
                                  </div>
                                  <div style="width: 62%" class="pl-10">接洽内容：{{ item.field0009 }}</div>
                                </div>
                              </div>
                              <div style="text-align: right">
                                <img src="./assets/icon/本部.png" class="icon" v-if="item.field0010 == '1'" />
                                <img src="./assets/icon/金控.png" class="icon ml-5" v-if="item.field0016 == '1'" />
                                <img src="./assets/icon/北京.png" class="icon ml-5" v-if="item.field0013 == '1'" />
                                <img src="./assets/icon/深圳.png" class="icon ml-5" v-if="item.field0012 == '1'" />
                                <img src="./assets/icon/上海.png" class="icon ml-5" v-if="item.field0014 == '1'" />
                                <img src="./assets/icon/苏州.png" class="icon ml-5" v-if="item.field0015 == '1'" />
                                <img src="./assets/icon/王店.png" class="icon ml-5" v-if="item.field0031 == '1'" />
                                <img src="./assets/icon/洪合.png" class="icon ml-5" v-if="item.field0032 == '1'" />
                                <img src="./assets/icon/新塍.png" class="icon ml-5" v-if="item.field0033 == '1'" />
                                <img src="./assets/icon/王江泾.png" class="icon ml-5" v-if="item.field0034 == '1'" />
                                <img src="./assets/icon/油车港.png" class="icon ml-5" v-if="item.field0035 == '1'" />
                                <img src="./assets/icon/新城.png" class="icon ml-5" v-if="item.field0036 == '1'" />
                                <img src="./assets/icon/运河湾.png" class="icon ml-5" v-if="item.field0037 == '1'" />
                                <img src="./assets/icon/高新.png" class="icon ml-5" v-if="item.field0038 == '1'" />
                              </div>
                            </div>
                            <el-divider></el-divider>
                          </div>
                        </div>
                      </div>
                      <!-- 本周签约项目 -->
                      <div v-if="ContractedProjectsList.length != 0">
                        <div v-for="(item, index) in ContractedProjectsList" :key="index">
                          <div class="itemClass mb-10">
                            <div class="title mt-10" v-if="index === 0">
                              <img src="@/assets/icon/小标题.png" class="title-img" />
                              <div class="title-text">本周签约项目</div>
                            </div>
                            <div class="contracted">
                              <el-image
                                class="project-img"
                                :src="item.field0012"
                                fit="cover"
                                :preview-src-list="[item.field0012]"
                              >
                                <div slot="error" class="image-slot">暂无图片</div>
                              </el-image>
                              <div class="contracted-content" style="width: 100%">
                                <div class="contracted-content-title">签约项目：{{ item.field0005 }}</div>
                                <div class="contracted-content-text">
                                  <div class="contracted-content-text-left" style="width: 53%">
                                    <div style="display: flex">
                                      <div style="white-space: nowrap">投资主体：</div>
                                      <div>{{ item.field0007 }}</div>
                                    </div>
                                    <div>
                                      签约金额：{{
                                        item.field0009 === null
                                          ? ''
                                          : item.field0009 + (item.field0015 ? item.field0015 : '万元')
                                      }}
                                    </div>
                                    <div>签约主体：{{ item.field0008 }}</div>
                                    <div>签约时间：{{ item.field0004 }}</div>
                                  </div>
                                  <div class="contracted-content-text-right pl-10">签约内容：{{ item.field0011 }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <!-- 亿元以上备案项目 -->
                      <!-- <div v-if="FilingItemsList.length > 0">
                        <div v-for="(item, index) in FilingItemsList" :key="index">
                          <div class="itemClass">
                            <div class="title mt-10" v-if="index === 0">
                              <img src="@/assets/icon/小标题.png" class="title-img" />
                              <div class="title-text">项目备案（亿元及以上）</div>
                            </div>
                            <div class="active-content">
                              <div class="active-content-title mt-10">项目名称：{{ item.field0005 }}</div>
                              <div class="active-content-text">
                                <div class="active-content-text-left" style="width: 45%">
                                  <div>备案日期：{{ item.field0004 }}</div>
                                  <div>建设性质：{{ item.field0006 }}</div>
                                  <div>项目单位：{{ item.field0007 }}</div>
                                </div>
                                <div class="active-content-text-right pl-10">
                                  <div>新增项目用地：{{ item.field0009 === null ? '' : item.field0009 + '亩' }}</div>
                                  <div>总投资：{{ item.field0010 + (item.field0016 ? item.field0016 : '万元') }}</div>
                                  <div>落地主体：{{ item.field0015 }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <el-divider></el-divider>
                        </div>
                      </div> -->
                      <!-- 举办招商活动 -->
                      <div v-if="ActivityList.length != 0">
                        <div v-for="(item, index) in ActivityList" :key="index">
                          <div class="itemClass mb-10">
                            <div class="title mt-10" v-if="index === 0">
                              <img src="@/assets/icon/小标题.png" class="title-img" />
                              <div class="title-text">举办招商活动</div>
                            </div>
                            <div class="active">
                              <el-image
                                class="active-img project-img"
                                :src="item.field0009"
                                fit="cover"
                                :preview-src-list="[item.field0009]"
                              >
                                <div slot="error" class="image-slot">暂无图片</div>
                              </el-image>
                              <div class="active-content">
                                <div class="active-content-title">活动主题：{{ item.field0004 }}</div>
                                <div class="active-content-text">
                                  <div class="active-content-text-left" style="width: 45%">
                                    <div>活动时间：{{ item.field0005 }}</div>
                                    <div>活动地点：{{ item.field0006 }}</div>
                                  </div>
                                  <div class="active-content-text-right pl-10">
                                    <div>邀请客商：{{ item.field0007 + '人' }}</div>
                                    <div>举办主体：{{ item.field0008 }}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <!-- 开工项目 -->
                      <div v-if="startedProjectsList.length != 0">
                        <div v-for="(item, index) in startedProjectsList" :key="index">
                          <div class="itemClass">
                            <div class="title mt-10" v-if="index === 0">
                              <img src="@/assets/icon/小标题.png" class="title-img" />
                              <div class="title-text">开工项目</div>
                            </div>
                            <div class="active-content mt-10 mb-10">
                              <div class="active-content-title">开工项目：{{ item.field0003 }}</div>
                              <div class="active-content-text">
                                <div class="active-content-text-left" style="width: 75%">
                                  <div>开工地点：{{ item.field0017 }}</div>
                                  <div>投资主体：{{ item.field0004 }}</div>
                                  <div>土地面积：{{ item.field0013 === null ? '' : item.field0013 + '亩' }}</div>
                                  <div>
                                    总&nbsp;&nbsp;投&nbsp;&nbsp;资：{{
                                      item.field0008 + (item.field0018 ? item.field0018 : '万元')
                                    }}
                                  </div>
                                </div>
                                <div class="active-content-text-right pl-10">
                                  <div>项目概况：{{ item.field0014 }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <!-- 十亿元以上备案项目 -->
                      <div v-if="billionProjectsList.length != 0">
                        <div v-for="(item, index) in billionProjectsList" :key="index">
                          <div class="itemClass">
                            <div class="title mt-10" v-if="index === 0">
                              <img src="@/assets/icon/小标题.png" class="title-img" />
                              <div class="title-text">项目备案（十亿元及以上）</div>
                            </div>
                            <div class="active-content mt-10 mb-10">
                              <div class="active-content-title">项目名称：{{ item.field0005 }}</div>
                              <div class="active-content-text">
                                <div class="active-content-text-left" style="width: 75%">
                                  <div>项目单位：{{ item.field0007 }}</div>
                                  <div>建设性质：{{ item.field0006 }}</div>
                                  <div>落地主体：{{ item.field0015 }}</div>
                                </div>
                                <div class="active-content-text-right pl-10">
                                  <div>新增建设用地：{{ item.field0009 === null ? '' : item.field0009 + '亩' }}</div>
                                  <div>总投资：{{ item.field0010 + (item.field0016 ? item.field0016 : '万元') }}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <!-- 他山之石 -->
                      <div v-if="OtherList.length != 0">
                        <div v-for="(item, index) in OtherList" :key="index" class="mt-10">
                          <div class="itemClass">
                            <div class="title" v-if="index === 0">
                              <img src="@/assets/icon/小标题.png" class="title-img" />
                              <div class="title-text">他山之石</div>
                            </div>
                            <div class="content">
                              {{ item.field0003 }}
                            </div>
                          </div>
                          <el-divider v-if="index !== OtherList.length - 1"></el-divider>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 本周小结 -->
                  <!-- <div class="page-break"></div> -->
                  <div v-if="summaryBarData !== null" class="itemClass">
                    <!-- <div class="mintitle mt-50">本周小结</div> -->
                    <!-- 柱状图 -->
                    <!-- <div class="part" style="margin-bottom: 30px">
                      <div class="summarize">
                        <span v-if="sum != 0"
                          >区招商中心共接洽项目<span class="s1">{{ sum }}</span
                          >个，</span
                        >
                        <span>秀洲本部、金控公司及各驻外工作部接洽情况如下：</span>
                        <div class="Bar" id="bar" style="height: 200px; width: 600px" ref="Echarts"></div>
                      </div>
                    </div> -->
                  </div>
                  <div class="break_page"></div>
                  <div class="itemClass">
                    <div style="height: 10px"></div>
                    <div
                      class="part"
                      style="border-radius: 10px"
                      v-if="
                        pieList.length > 0 ||
                        ContactBarData.length > 0 ||
                        totalProjectBar.length > 0 ||
                        activityBar.length > 0
                      "
                    >
                      <!-- 饼图 -->
                      <div class="fw-700" style="text-align: left; margin: 20px 0px" v-if="pieList.length > 0">
                        本周各主体“一把手”共接洽项目
                        <span style="color: rgb(80, 178, 255); font-size: 20px">{{ Subject.length }}</span>
                        个：
                      </div>
                      <div class="pieList" v-if="pieList.length > 0">
                        <div class="item" v-for="(item, index) in pieList" :key="index">
                          <div :id="'pie' + (index + 1)"></div>
                          <!-- <div class="text fw-700">{{ item.field0007 }}</div> -->
                          <div class="img" />
                        </div>
                      </div>
                      <!-- 柱状图(本年累计接洽情况) -->
                      <div class="mt-30 mb-20 fw-700" style="text-align: left" v-if="ContactBarData.length > 0">
                        本年各主体“一把手”累计接洽情况：
                      </div>
                      <div id="yearTotal" class="" v-if="ContactBarData.length > 0" style="width: 100%"></div>

                      <!-- 柱状图(本年累计项目个数如下：) -->
                      <div class="mt-10" style="text-align: left" v-if="totalProjectBar.length > 0">
                        本年累计在谈项目个数如下：
                      </div>
                      <div id="totalProject" class="" v-if="totalProjectBar.length > 0" style="width: 100%"></div>

                      <!-- 柱状图(签约活动项目规模) -->
                      <div class="mt-10" style="text-align: left" v-if="activityBar.length > 0">
                        本年累计签约项目个数如下：
                      </div>
                      <div id="activityBar" class="" v-if="activityBar.length > 0" style="width: 100%"></div>
                    </div>
                  </div>
                  <!-- 表格 -->
                  <div v-for="(item, index) in [SignedData, talkingData]" :key="index" v-if="item.length > 0">
                    <div v-if="loading" class="page-break"></div>
                    <div style="height: 10px"></div>
                    <div style="text-align: center" class="list-title">
                      {{
                        index === 0
                          ? `${dayjs().format('YYYY')}年已签正式协议项目汇总表（至${formatDate(endTime)}）`
                          : `${dayjs().format('YYYY')}年在谈项目汇总表（至${formatDate(endTime)}）`
                      }}
                    </div>
                    <el-table
                      v-if="item.length > 0"
                      border
                      :span-method="
                        (params) => {
                          return objectSpanMethod(params, item)
                        }
                      "
                      :data="item"
                      class="table"
                      :header-cell-style="{ border: '1px solid #000', fontWeight: 700, color: '#000' }"
                      :cell-style="{ border: '1px solid #000', fontWeight: 400, padding: '5px 0px !important' }"
                      :row-class-name="tableRowClassName"
                    >
                      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                      <el-table-column label="类别" width="60" align="center">
                        <template v-slot="{ row }">
                          <div style="text-align: center">按{{ row.field0004 }}分</div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="field0005" label="项目" width="105" align="center"></el-table-column>
                      <el-table-column prop="field0006" label="个数" width="60" align="center"></el-table-column>
                      <el-table-column
                        prop="field0007"
                        label="总投资(亿元)"
                        min-width="110"
                        align="center"
                      ></el-table-column>
                      <el-table-column
                        prop="field0008"
                        label="总投资(万美元)"
                        min-width="120"
                        align="center"
                      ></el-table-column>
                      <el-table-column
                        prop="field0009"
                        label="预计产值(亿元/年)"
                        min-width="140"
                        align="center"
                      ></el-table-column>
                      <el-table-column
                        prop="field0010"
                        label="预计税收(万元/年)"
                        min-width="140"
                        align="center"
                      ></el-table-column>
                    </el-table>
                  </div>
                  <div style="margin-bottom: 30px"></div>
                </div>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import PdfLoader from './utils/exprotPDF'
import 'print-js/dist/print.css'
import { numberConvertToUppercase } from '@/utils/methods'
// 图片压缩
import {
  getReportList,
  summarize,
  summarize2,
  getTime,
  getMainNews,
  getContractedProjects,
  getFilingItems,
  getActivity,
  getStartedProjects,
  getBillionProjects,
  getOther,
  getSignedData,
  getTalkingData,
  getTownshipContactPie,
  getTownshipContactBar,
  getTotalProject,
  getActivityBar,
} from './api/api'
import * as echarts from 'echarts'

export default {
  name: 'App',
  data() {
    return {
      // 区主要领导招商动态
      mainNewsList: [],
      // 主体动态列表
      Subject: [],
      // 签约项目
      ContractedProjectsList: [],
      // 亿元以上备案项目
      FilingItemsList: [],
      // 活动
      ActivityList: [],
      // 活动
      startedProjectsList: [],
      // 活动
      billionProjectsList: [],
      // 他山之石头
      OtherList: [],
      // 在谈项目列表
      talkingData: [],
      // 已签约项目列表
      SignedData: [],
      // 本周小结柱状图数据
      summaryBarData: null,
      // 接洽柱状图数据
      ContactBarData: [],
      // 饼图接恰总数
      contactTotalNumber: 0,
      // 饼图数据
      pieList: [],
      // 累计项目柱状图
      totalProjectBar: [],
      // 签约活动柱状图
      activityBar: [],
      //本周小结
      year: 0,
      sum: 0,
      chooseTime: [],
      startTime: null,
      endTime: null,
      // 加载
      loading: false,
      // 期数
      period: null,
    }
  },
  created() {},
  mounted() {
    this.initPage()
  },
  methods: {
    dayjs,
    // 阿拉伯数字转中文数字
    numberConvertToUppercase,
    // 获取数据
    async initPage() {
      this.getYear()
      if (this.chooseTime.length != 0) {
        this.startTime = this.chooseTime[0]
        this.endTime = this.chooseTime[1]
      } else {
        const { data: time } = await getTime()
        this.startTime = time.data[0].startTime
        this.endTime = time.data[0].endTime
        this.period = time.data[0].period
      }
      // 周数
      summarize(this.startTime, this.endTime).then((res) => {
        this.sum = res.data.data[0].sum
        this.period = res.data.data[0].period
      })
      // 本周小结柱状图
      const { data: barDate } = await summarize2(this.startTime, this.endTime)
      const xAxis = []
      const yAxis = []
      this.summaryBarData = barDate.data
      barDate.data.forEach((item) => {
        xAxis.push(item.flag)
        yAxis.push(item.num)
      })

      this.$nextTick(() => {
        // this.initBar(this.$refs.Echarts, xAxis, yAxis)
      })
      try {
        // 区主要领导招商动态库
        const { data: mainNewsList } = await getMainNews(this.startTime, this.endTime)
        this.mainNewsList = mainNewsList.data
        // 本周签约项目
        const { data: ContractedProjectsList } = await getContractedProjects(this.startTime, this.endTime)
        this.ContractedProjectsList = ContractedProjectsList.data

        // 亿元以上备案项目
        const { data: FilingItemsList } = await getFilingItems(this.startTime, this.endTime)
        this.FilingItemsList = FilingItemsList.data

        // 活动
        const { data: ActivityList } = await getActivity(this.startTime, this.endTime)
        this.ActivityList = ActivityList.data

        // 开工项目
        const { data: startedProjectsList } = await getStartedProjects(this.startTime, this.endTime)
        this.startedProjectsList = startedProjectsList.data

        // 十亿元以上备案项目
        const { data: billionProjectsList } = await getBillionProjects(this.startTime, this.endTime)
        this.billionProjectsList = billionProjectsList.data

        // 他山之石
        const { data: OtherList } = await getOther(this.startTime, this.endTime)
        this.OtherList = OtherList.data
      } catch (error) {}

      // 各主体信息
      getReportList(this.startTime, this.endTime).then((res) => {
        const arr = res.data.data.filter((item) => item.field0031 == '1')
        const arr2 = res.data.data.filter((item) => item.field0032 == '1')
        const arr3 = res.data.data.filter((item) => item.field0033 == '1')
        const arr4 = res.data.data.filter((item) => item.field0034 == '1')
        const arr5 = res.data.data.filter((item) => item.field0035 == '1')
        const arr6 = res.data.data.filter((item) => item.field0038 == '1')
        const arr7 = res.data.data.filter((item) => item.field0037 == '1')
        const arr8 = res.data.data.filter((item) => item.field0036 == '1')
        this.Subject = arr.concat(arr2).concat(arr3).concat(arr4).concat(arr5).concat(arr6).concat(arr7).concat(arr8)
      })

      try {
        // 接洽饼图数据
        const { data: pieShipContact } = await getTownshipContactPie(this.startTime, this.endTime)

        if (pieShipContact.length > 0) {
          this.pieList = pieShipContact
          this.initPie(pieShipContact)
          this.contactTotalNumber = 0
          pieShipContact.forEach((item) => {
            item.data.forEach((innerItem) => {
              this.contactTotalNumber += parseInt(innerItem.amount)
            })
          })
        }
      } catch (error) {}
      // 接洽和累计项目个数柱状图数据
      try {
        const { data: barShipContact } = await getTownshipContactBar(
          dayjs().format('YYYY') + '-01-01',
          dayjs().format('YYYY-MM-DD'),
        )
        this.ContactBarData = barShipContact.data
        const list = [
          {
            data: barShipContact,
            name: 'yearTotal',
          },
        ]
        list.forEach((item, index) => {
          if (item.data.data.length > 0) {
            const series = []
            const xAxis2 = []
            const addedKeys = []
            // 创建镇的数组
            item.data.data.forEach((item) => {
              Object.keys(item).forEach((key) => {
                if (key !== (index === 0 ? '接洽形式' : '项目规模') && !addedKeys.includes(key)) {
                  xAxis2.push(key === '高新区高照街道' ? '高新区(高照街道)' : key)
                  addedKeys.push(key)
                }
              })
            })
            // 创建每个镇所对应接恰形式的值的数组
            item.data.data.forEach((item) => {
              const seriesItem = {
                name: '数量',
                type: index === 1 ? 'line' : 'bar',
                barWidth: '20px',
                data: [],
                stack: index === 0 ? '' : 'Ad',
                label: {
                  show: true,
                  // formatter: index === 0 ? '{a}:{c}次' : '{c}次',
                  offset: index === 0 ? [0, 0] : [30, 0],
                  color: '#000',
                  formatter: (data) => {
                    let text = '次'
                    if (index !== 0) {
                      text = '个'
                    }
                    if (data.data !== 0) {
                      return data.data + text
                    } else {
                      return ''
                    }
                  },
                  position: index === 2 ? '' : 'top',
                },
              }
              for (const key in item) {
                if (key !== (index === 0 ? '接洽形式' : '项目规模')) {
                  if (item[key] == null) {
                    item[key] = 0
                  }
                  seriesItem.data.push(item[key])
                }
              }
              seriesItem.name = item[index === 0 ? '接洽形式' : '项目规模']
              series.push(seriesItem)
            })
            this.$nextTick(() => {
              this.initBar(document.getElementById(item.name), xAxis2, [], series, index === 2 ? true : false)
            })
          }
        })
      } catch (error) {}

      try {
        // 表格数据
        const { data: SignedData } = await getSignedData(this.startTime, dayjs().format('YYYY-MM-DD'))
        const { data: talkingData } = await getTalkingData(this.startTime, dayjs().format('YYYY-MM-DD'))
        this.SignedData = SignedData.data
        this.talkingData = talkingData.data
      } catch (error) {}
    },
    // 柱状图
    initBar(document, xAxis, yAxis, series, isHorizontal = false) {
      let myChart = echarts.init(document)
      var option
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        legend: {},
        xAxis: [
          {
            type: isHorizontal ? 'value' : 'category',
            data: xAxis,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              //x轴文字的配置
              show: true,
              interval: 0, //使x轴文字显示全
            },
            show: isHorizontal ? false : true,
          },
        ],
        yAxis: [
          {
            type: isHorizontal ? 'category' : 'value',
            data: isHorizontal ? xAxis : '',
            show: isHorizontal ? true : false, // 不显示 y 轴
            inverse: isHorizontal ? true : false,
          },
        ],
        series: series || [
          {
            name: '数量',
            type: 'bar',
            barWidth: '50px',
            data: yAxis,
            label: {
              show: true,
              position: 'top', // 在柱子顶部显示数据
              textStyle: {
                color: '#afafaf', // 设置文字颜色为黑色
              },
            },
          },
        ],
        // color: [
        //   {
        //     type: 'linear',
        //     x: 0,
        //     y: 0,
        //     x2: 0,
        //     y2: 1,
        //     colorStops: [
        //       {
        //         offset: 0,
        //         color: 'rgba(3, 0, 0, 0.15)' // 0% 处的颜色
        //       },
        //       {
        //         offset: 1,
        //         color: 'rgba(255, 255, 255, 0.15)'
        //       }
        //     ]
        //   }
        // ]
      }
      option && myChart.setOption(option)
    },
    // 本周小结饼图
    initPie(data) {
      let pieData = []
      this.$nextTick(() => {
        data.forEach((i, index) => {
          i.data.forEach((item) => {
            let value = 0
            for (const key in item) {
              if (key !== 'field0007' && key !== 'field0020') {
                value += parseInt(item[key])
              }
            }
            if (value !== 0) {
              pieData.push({
                name: item.field0020,
                value: value,
              })
            }
          })
          let chartDom = document.getElementById('pie' + (index + 1))
          let myChart = echarts.init(chartDom)
          const option = {
            tooltip: {
              trigger: 'item',
            },
            title: {
              text: i.field0007 + '次数',
              subtext: pieData.reduce((acc, cur) => acc + parseInt(cur.value), 0),
              textStyle: {
                fontSize: 16,
                color: '#51565B',
              },
              subtextStyle: {
                fontSize: 20,
                color: '#f68c3c',
              },

              left: 'center',
              top: 'center',
            },
            series: [
              {
                type: 'pie',
                radius: ['40%', '60%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderWidth: 5,
                  borderColor: '#fff',
                },
                label: {
                  show: true,
                  borderWidth: 5,
                  borderRadius: 4,
                  fontSize: 12,
                  formatter: '{b}' + '\n\n' + '{c}次',
                  color: 'rgba(95, 97, 99, 1)',
                  minMargin: 5,
                  edgeDistance: 10,
                  lineHeight: 15,
                },
                labelLine: {
                  normal: {
                    length: 30,
                    length2: 0,
                    maxSurfaceAngle: 50,
                    lineStyle: {
                      color: '#333',
                    },
                  },
                },
                labelLayout: function (params) {
                  const isLeft = params.labelRect.x < myChart.getWidth() / 2
                  const points = params.labelLinePoints
                  points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width
                  return {
                    labelLinePoints: points,
                  }
                },
                data: pieData,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            ],
            color: [
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#EBA3A7', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#DF6B72', // 100% 处的颜色
                  },
                ],
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#7282ea', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#1833dd', // 100% 处的颜色
                  },
                ],
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#c7d6e6', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#a4bcd7', // 100% 处的颜色
                  },
                ],
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#7282ea', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#a8caf2', // 100% 处的颜色
                  },
                ],
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#b9dded', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#8ec9e1', // 100% 处的颜色
                  },
                ],
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#f2d2ad', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#ebb579', // 100% 处的颜色
                  },
                ],
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#b2d29b', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#84b75e', // 100% 处的颜色
                  },
                ],
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#d5c3bd', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#bc9e93', // 100% 处的颜色
                  },
                ],
              },
            ],
          }
          myChart.setOption(option)
          pieData = []
        })
      })
    },
    // 导出pdf
    handleExport(isPrint = false) {
      this.loading = true
      setTimeout(() => {
        this.$nextTick(() => {
          const content = this.$refs.exportContent.$el
          let pdf = new PdfLoader(content, '招商动态简报', 'itemClass', 'page-break', isPrint)
          pdf.outPutPdfFn().then(() => {
            this.loading = false
          })
        })
      }, 3000)
    },
    printPDF() {
      this.handleExport(true)
    },
    // 搜索
    handleSearch() {
      //搜索按钮
      if (this.chooseTime.length == 0) {
        this.$message.info({ message: '请选择时间范围', duration: 1000 })
        return
      }
      this.sum = 0
      this.initPage()
    },
    // 重置
    handleReset() {
      //重置按钮
      this.startTime = null
      this.endTime = null
      this.chooseTime = []
      this.initPage()
    },
    // 格式化
    formatDate(dateTimeString) {
      //时间格式化方法
      const date = new Date(dateTimeString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const formattedDate = `${month}月${day}日`
      return formattedDate
    },
    // 获取年份
    getYear() {
      const date = new Date()
      this.year = date.getFullYear()
    },
    // 合并表格
    objectSpanMethod({ row, column, rowIndex, columnIndex }, list) {
      let rowspanIndex = 0
      let rowspanIndex2 = 0
      let rowspanIndex3 = 0
      list.forEach((item, index) => {
        if (item.field0004 === '主体' && list[index + 1]?.field0005 === '合计') {
          rowspanIndex = index + 1
        }
        if (item.field0004 === '产业' && list[index + 1]?.field0005 === '合计') {
          rowspanIndex2 = index + 1
        }
        if (item.field0004 === '规模' && list[index + 1]?.field0005 === '合计') {
          rowspanIndex3 = index + 1
        }
      })

      if (columnIndex === 1) {
        if (rowIndex === 0) {
          return {
            rowspan: rowspanIndex + 1,
            colspan: 1,
          }
        } else if (rowIndex === rowspanIndex + 1) {
          return {
            rowspan: rowspanIndex2 - rowspanIndex,
            colspan: 1,
          }
        } else if (rowIndex === rowspanIndex2 + 1) {
          return {
            rowspan: rowspanIndex3 - rowspanIndex2,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }
    },
    // 设置表格样式
    tableRowClassName({ row, rowIndex }) {
      if (row.field0005 === '合计') {
        return 'table-cell-bgc'
      }
    },
  },
}
</script>

<style lang="less">
#app {
  pointer-events: all;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: DENG;
  font-size: 13px;
  font-weight: 400;
}

.print-main {
  margin: 0 auto;
  background-color: rgb(35, 134, 255);
  width: 900px;
  height: auto;

  .header {
    width: 100%;
    height: 110px;

    .header-back {
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .time {
      margin: 0 auto;
      margin-top: -60px;
      width: 400px;
      height: 40px;
      z-index: 2 !important;
    }

    .time-back {
      width: 100%;
      height: 100%;
      z-index: 1;
      margin-top: 50px;
    }

    .time-text {
      position: absolute;
      margin: 0 auto;
      font-family: GBK;
      margin-top: -35px;
      margin-left: 38px;
      font-size: 21px;
      font-weight: 100;
      color: rgb(25, 32, 134);
      z-index: 3 !important;
    }
  }

  .body {
    width: 100%;
    height: auto;
    line-height: 18px;
    background-color: rgb(35, 134, 255);
    orphans: 10;
    overflow: visible;
  }
}

.part {
  width: calc(90% - 20px);
  height: auto;
  background: #fff;
  margin: 0 auto;
  padding: 10px;
  border-radius: 0 0px 10px 10px;
  border: 1px transparent solid;
}

.mintitle {
  width: calc(90% - 10px);
  height: 30px;
  line-height: 30px;
  text-align: left;
  margin: 0 auto;
  background: rgb(241, 241, 254);
  padding-left: 10px;
  font-size: 18px;
  // margin-left: 5px;
  font-weight: 100;
  border: 1px transparent solid;
  border-radius: 10px 10px 0 0px;
}

.title {
  display: flex;
  align-items: center;
  text-align: left;
  .title-img {
    width: 31px;
    height: 25px;
  }
  .title-text {
    font-size: 16px;
    color: #1d2088;
    font-weight: 600;
    margin-left: 5px;
  }
}
.content {
  text-align: left;
  margin: 15px 0 15px 5px;
  font-weight: 100;
  text-indent: 2em;
  line-height: 1.5;
}

.icon {
  min-width: 20px;
  height: 20px;
}

.summarize {
  display: block;
  text-align: left;
  font-size: 16px;
  font-weight: 100;
  line-height: 30px;
  position: relative;

  .s1 {
    font-size: 25px;
    color: rgb(80, 178, 255);
  }
}

.footer {
  width: 100%;
  height: 170px;
}

.tip {
  text-align: left;
  margin: 10px;
}

.Bar,
#yearTotal,
#totalProject,
#activityBar {
  width: 600px;
  height: 200px;
}
#activityBar {
  height: 300px;
}
//=========================================

.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  margin: 0 auto;
  max-width: 900px;
  padding: 0px !important;
  background-color: rgb(35, 134, 255);
}

.el-divider--horizontal {
  margin: 0px 0 !important;
}

.mt-10 {
  margin-top: 10px;
}
.mt-20 {
  margin-top: 20px;
}
.mt-30 {
  margin-top: 30px;
}
.mt-50 {
  margin-top: 50px;
}
.ml-5 {
  margin-left: 5px;
}
.mb-10 {
  margin-bottom: 10px;
}
.mb-20 {
  margin-bottom: 20px;
}
.lh-10 {
  line-height: 23px;
}
.fw-700 {
  font-weight: 700;
}
.pl-10 {
  padding-left: 10px;
}
// 设置content间距
.space-between {
  margin: 10px 0 !important;
}
.canvasImg {
  max-width: 600px;
  max-height: 200px;
}
@media print {
  @page {
    size: auto;
    margin: 0px;
  }

  body,
  html {
    margin: 0;
    /* 设置页面边距为0 */
    padding: 0;
    /* 设置页面内边距为0 */
  }

  #pdfDom {
    overflow: hidden;
  }

  .canvasImg {
    max-width: 600px;
    max-height: 200px;
    /* 如果需要限制高度，可以添加这个样式 */
  }
}
.pieList {
  display: flex;
  justify-content: center;
  .item {
    width: 50%;
    position: relative;
    .text {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .img {
      background-image: url('@/assets/椭圆.png');
      top: 32%;
      left: 38%;
      transform: translate(0%, 0%);
      position: absolute;
      width: 24%;
      height: 39%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  #pie1,
  #pie2,
  #pie3 {
    width: 100%;
    height: 250px;
  }
}
.el-table .el-table__cell {
  padding: 1.5px !important;
}

.list-title {
  margin: 15px 0;
  font-size: 30px;
  color: #fff;
}

.el-descriptions-item__cell {
  padding-bottom: 3px !important;
}
// 项目备案
.filing {
  display: flex;
  margin-top: 10px;
  &-left {
    width: 52.5%;
    text-align: left;
    div {
      margin-top: 3px;
    }
  }
  &-right {
    width: 47.5%;
    text-align: left;
    div {
      margin-top: 3px;
    }
  }
}

// 签约项目
.contracted {
  display: flex;
  margin-top: 10px;
  .img {
    min-width: 150px;
    height: 100px;
    object-fit: cover;
  }
  &-content {
    &-title {
      height: auto;
      white-space: nowrap;
      font-weight: 700;
      text-align: left;
      margin-left: 10px;
    }
    &-text {
      display: flex;
      text-align: left;
      margin-left: 10px;
      &-left {
        width: 38%;
        div {
          margin-top: 3px;
        }
      }
      &-right {
        width: 62%;
        margin-top: 3px;
      }
    }
  }
}

// 招商活动
.active {
  display: flex;
  margin-top: 10px;
  &-img {
    min-width: 150px;
    max-width: 150px;
    height: 100px;
    object-fit: cover;
  }
  &-content {
    text-align: left;
    margin-left: 10px;
    width: 100%;
    &-title {
      white-space: nowrap;
      font-weight: 700;
    }
    &-text {
      display: flex;
      &-left {
        width: 38%;
        div {
          margin-top: 3px;
        }
      }
      &-right {
        width: 72%;
        margin-top: 3px;
      }
    }
  }
}
.table {
  width: calc(90%) !important;
  margin: 0 auto !important;
  border-radius: 10px !important;
  font-weight: 700 !important;
  border: 1px solid #000 !important;
}
</style>
<style>
.el-table .table-cell-bgc {
  background-color: #dcdcdc !important;
}
.el-table .table-cell-bgc .cell {
  font-weight: 800 !important;
  color: #000;
}
.project-img {
  min-width: 150px;
  max-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
