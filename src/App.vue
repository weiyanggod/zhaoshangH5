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
            >
            </el-date-picker>
            <el-button type="success" style="margin-left: 10px" @click="handleSearch">查询</el-button>
            <el-button type="danger" style="margin-left: 10px" @click="handleReset">重置</el-button>
            <!-- <el-button type="primary" @click="handleExport">导出</el-button> -->
            <el-button type="primary" @click="handleExport">导出</el-button>
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
                      {{ this.year }}年第{{ week }}周（{{ formatDate2(startTime) }}-{{ formatDate2(endTime) }}）
                    </div>
                  </div>
                </div>
                <!-- 内容 -->
                <div class="body" style="margin-top: 60px">
                  <div
                    v-if="
                      !(
                        xiuzhouList.length == 0 &&
                        jinkongList.length == 0 &&
                        shenzhenList.length == 0 &&
                        beijingList.length == 0 &&
                        shanghaiList.length == 0 &&
                        suzhouList.length == 0
                      )
                    "
                  >
                    <!-- <div class="mintitle ">本部招商动态</div> -->
                    <div class="part" style="border-radius: 10px 10px 0px 0px">
                      <div v-if="xiuzhouList.length != 0" class="xiuzhou">
                        <!-- <div class="title-image">
                          <img src="./assets/小标题-秀洲本部@2x.png" style="width: 100%;height: 100%;" alt="">
                        </div> -->
                        <div class="content" v-for="(card, index) in xiuzhouList" :key="index">
                          <table class="itemClass">
                            <tr>
                              <td rowspan="5" class="td-pic">
                                <el-image
                                  :src="card.uurl"
                                  ref="cardImage"
                                  style="width: 150px; height: 100px; margin: 0 auto; object-fit: cover"
                                  :preview-src-list="[card.uurl]"
                                ></el-image>
                              </td>
                            </tr>
                            <tr>
                              <td>接洽时间：{{ card.field0005 }}</td>
                              <td colspan="3" rowspan="3" style="margin-top: 0px" class="lh-10">
                                接洽内容：{{ card.field0009 }}
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 200px">接洽地点：{{ card.field0006 }}</td>
                            </tr>
                            <tr>
                              <td class="lh-10">接洽对象：{{ card.field0008 }}</td>
                            </tr>
                            <tr>
                              <td><span v-if="card.field0019 != null">区领导：</span>{{ card.field0019 }}</td>
                              <td style="text-align: right; padding: 0px">
                                <img src="./assets/icon/秀.png" class="icon" alt="" v-if="card.field0010 == '1'" />
                                <img src="./assets/icon/金.png" class="icon ml-5" alt="" v-if="card.field0016 == '1'" />
                                <img src="./assets/icon/京.png" class="icon ml-5" alt="" v-if="card.field0013 == '1'" />
                                <img src="./assets/icon/深.png" class="icon ml-5" alt="" v-if="card.field0012 == '1'" />
                                <img src="./assets/icon/沪.png" class="icon ml-5" alt="" v-if="card.field0014 == '1'" />
                                <img src="./assets/icon/苏.png" class="icon ml-5" alt="" v-if="card.field0015 == '1'" />
                                <img
                                  src="./assets/icon/王店.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0031 == '1'"
                                />
                                <img
                                  src="./assets/icon/洪合.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0032 == '1'"
                                />
                                <img
                                  src="./assets/icon/新塍.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0033 == '1'"
                                />
                                <img
                                  src="./assets/icon/王江泾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0034 == '1'"
                                />
                                <img
                                  src="./assets/icon/油车港.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0035 == '1'"
                                />
                                <img
                                  src="./assets/icon/新城.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0036 == '1'"
                                />
                                <img
                                  src="./assets/icon/运河湾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0037 == '1'"
                                />
                                <img
                                  src="./assets/icon/高新.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0038 == '1'"
                                />
                              </td>
                            </tr>
                          </table>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <div v-if="jinkongList.length != 0" class="jinkong">
                        <!-- <div class="title-image" :class="{ 'mt-50': isExportPdf == true }">
                          <img src="./assets/小标题-金控公司@2x.png" style="width: 100%; height: 100%" alt="" />
                        </div> -->
                        <div class="content" v-for="(card, index) in jinkongList" :key="index">
                          <table class="itemClass">
                            <tr>
                              <td rowspan="5" class="td-pic">
                                <el-image
                                  :src="card.uurl"
                                  ref="cardImage"
                                  style="width: 150px; height: 100px; margin: 0 auto; object-fit: cover"
                                  :preview-src-list="[card.uurl]"
                                ></el-image>
                              </td>
                            </tr>
                            <tr>
                              <td>接洽时间：{{ card.field0005 }}</td>
                              <td colspan="3" rowspan="3" style="margin-top: 0px" class="lh-10">
                                接洽内容：{{ card.field0009 }}
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 200px">接洽地点：{{ card.field0006 }}</td>
                            </tr>
                            <tr>
                              <td class="lh-10">接洽对象：{{ card.field0008 }}</td>
                            </tr>
                            <tr>
                              <td><span v-if="card.field0019 != null">区领导：</span>{{ card.field0019 }}</td>
                              <td style="text-align: right; padding: 0px">
                                <img src="./assets/icon/秀.png" class="icon" alt="" v-if="card.field0010 == '1'" />
                                <img src="./assets/icon/金.png" class="icon ml-5" alt="" v-if="card.field0016 == '1'" />
                                <img src="./assets/icon/京.png" class="icon ml-5" alt="" v-if="card.field0013 == '1'" />
                                <img src="./assets/icon/深.png" class="icon ml-5" alt="" v-if="card.field0012 == '1'" />
                                <img src="./assets/icon/沪.png" class="icon ml-5" alt="" v-if="card.field0014 == '1'" />
                                <img src="./assets/icon/苏.png" class="icon ml-5" alt="" v-if="card.field0015 == '1'" />
                                <img
                                  src="./assets/icon/王店.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0031 == '1'"
                                />
                                <img
                                  src="./assets/icon/洪合.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0032 == '1'"
                                />
                                <img
                                  src="./assets/icon/新塍.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0033 == '1'"
                                />
                                <img
                                  src="./assets/icon/王江泾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0034 == '1'"
                                />
                                <img
                                  src="./assets/icon/油车港.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0035 == '1'"
                                />
                                <img
                                  src="./assets/icon/新城.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0036 == '1'"
                                />
                                <img
                                  src="./assets/icon/运河湾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0037 == '1'"
                                />
                                <img
                                  src="./assets/icon/高新.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0038 == '1'"
                                />
                              </td>
                            </tr>
                          </table>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <!-- <div class="mintitle " style="margin-top:20px;">驻外招商动态</div> -->
                      <div v-if="shenzhenList.length != 0" class="shenzhen">
                        <!-- <div class="title-image" :class="{ 'mt-50': isExportPdf == true }">
                          <img src="./assets/小标题-深圳@2x.png" style="width: 100%; height: 100%" alt="" />
                        </div> -->
                        <div class="content" v-for="(card, index) in shenzhenList" :key="index">
                          <table>
                            <tr>
                              <td rowspan="5" class="td-pic">
                                <el-image
                                  :src="card.uurl"
                                  ref="cardImage"
                                  style="width: 150px; height: 100px; margin: 0 auto; object-fit: cover"
                                  :preview-src-list="[card.uurl]"
                                ></el-image>
                              </td>
                            </tr>
                            <tr>
                              <td>接洽时间：{{ card.field0005 }}</td>
                              <td colspan="3" rowspan="3" style="margin-top: 0px" class="lh-10">
                                接洽内容：{{ card.field0009 }}
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 200px">接洽地点：{{ card.field0006 }}</td>
                            </tr>
                            <tr>
                              <td class="lh-10">接洽对象：{{ card.field0008 }}</td>
                            </tr>
                            <tr>
                              <td><span v-if="card.field0019 != null">区领导：</span>{{ card.field0019 }}</td>
                              <td style="text-align: right; padding: 0px">
                                <img src="./assets/icon/秀.png" class="icon" alt="" v-if="card.field0010 == '1'" />
                                <img src="./assets/icon/金.png" class="icon ml-5" alt="" v-if="card.field0016 == '1'" />
                                <img src="./assets/icon/京.png" class="icon ml-5" alt="" v-if="card.field0013 == '1'" />
                                <img src="./assets/icon/深.png" class="icon ml-5" alt="" v-if="card.field0012 == '1'" />
                                <img src="./assets/icon/沪.png" class="icon ml-5" alt="" v-if="card.field0014 == '1'" />
                                <img src="./assets/icon/苏.png" class="icon ml-5" alt="" v-if="card.field0015 == '1'" />
                                <img
                                  src="./assets/icon/王店.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0031 == '1'"
                                />
                                <img
                                  src="./assets/icon/洪合.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0032 == '1'"
                                />
                                <img
                                  src="./assets/icon/新塍.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0033 == '1'"
                                />
                                <img
                                  src="./assets/icon/王江泾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0034 == '1'"
                                />
                                <img
                                  src="./assets/icon/油车港.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0035 == '1'"
                                />
                                <img
                                  src="./assets/icon/新城.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0036 == '1'"
                                />
                                <img
                                  src="./assets/icon/运河湾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0037 == '1'"
                                />
                                <img
                                  src="./assets/icon/高新.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0038 == '1'"
                                />
                              </td>
                            </tr>
                          </table>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <div v-if="beijingList.length != 0" class="beijing">
                        <!-- <div class="title-image" :class="{ 'mt-50': isExportPdf == true }">
                          <img src="./assets/小标题-北京@2x.png" style="width: 100%; height: 100%" alt="" />
                        </div> -->
                        <div class="content" v-for="(card, index) in beijingList" :key="index">
                          <table class="itemClass">
                            <tr>
                              <td rowspan="5" class="td-pic">
                                <el-image
                                  :src="card.uurl"
                                  ref="cardImage"
                                  style="width: 150px; height: 100px; margin: 0 auto; object-fit: cover"
                                  :preview-src-list="[card.uurl]"
                                ></el-image>
                              </td>
                            </tr>
                            <tr>
                              <td>接洽时间：{{ card.field0005 }}</td>
                              <td colspan="3" rowspan="3" style="margin-top: 0px" class="lh-10">
                                接洽内容：{{ card.field0009 }}
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 200px">接洽地点：{{ card.field0006 }}</td>
                            </tr>
                            <tr>
                              <td class="lh-10">接洽对象：{{ card.field0008 }}</td>
                            </tr>
                            <tr>
                              <td><span v-if="card.field0019 != null">区领导：</span>{{ card.field0019 }}</td>
                              <td style="text-align: right; padding: 0px">
                                <img src="./assets/icon/秀.png" class="icon" alt="" v-if="card.field0010 == '1'" />
                                <img src="./assets/icon/金.png" class="icon ml-5" alt="" v-if="card.field0016 == '1'" />
                                <img src="./assets/icon/京.png" class="icon ml-5" alt="" v-if="card.field0013 == '1'" />
                                <img src="./assets/icon/深.png" class="icon ml-5" alt="" v-if="card.field0012 == '1'" />
                                <img src="./assets/icon/沪.png" class="icon ml-5" alt="" v-if="card.field0014 == '1'" />
                                <img src="./assets/icon/苏.png" class="icon ml-5" alt="" v-if="card.field0015 == '1'" />
                                <img
                                  src="./assets/icon/王店.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0031 == '1'"
                                />
                                <img
                                  src="./assets/icon/洪合.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0032 == '1'"
                                />
                                <img
                                  src="./assets/icon/新塍.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0033 == '1'"
                                />
                                <img
                                  src="./assets/icon/王江泾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0034 == '1'"
                                />
                                <img
                                  src="./assets/icon/油车港.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0035 == '1'"
                                />
                                <img
                                  src="./assets/icon/新城.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0036 == '1'"
                                />
                                <img
                                  src="./assets/icon/运河湾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0037 == '1'"
                                />
                                <img
                                  src="./assets/icon/高新.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0038 == '1'"
                                />
                              </td>
                            </tr>
                          </table>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <div v-if="shanghaiList.length != 0" class="shanghai">
                        <!-- <div class="title-image" :class="{ 'mt-50': isExportPdf == true }">
                          <img src="./assets/小标题-上海@2x.png" style="width: 100%; height: 100%" alt="" />
                        </div> -->
                        <div class="content" v-for="(card, index) in shanghaiList" :key="index">
                          <table class="itemClass">
                            <tr>
                              <td rowspan="5" class="td-pic">
                                <el-image
                                  :src="card.uurl"
                                  ref="cardImage"
                                  style="width: 150px; height: 100px; margin: 0 auto; object-fit: cover"
                                  :preview-src-list="[card.uurl]"
                                ></el-image>
                              </td>
                            </tr>
                            <tr>
                              <td>接洽时间：{{ card.field0005 }}</td>
                              <td colspan="3" rowspan="3" style="margin-top: 0px" class="lh-10">
                                接洽内容：{{ card.field0009 }}
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 200px">接洽地点：{{ card.field0006 }}</td>
                            </tr>
                            <tr>
                              <td class="lh-10">接洽对象：{{ card.field0008 }}</td>
                            </tr>
                            <tr>
                              <td><span v-if="card.field0019 != null">区领导：</span>{{ card.field0019 }}</td>
                              <td style="text-align: right; padding: 0px">
                                <img src="./assets/icon/秀.png" class="icon" alt="" v-if="card.field0010 == '1'" />
                                <img src="./assets/icon/金.png" class="icon ml-5" alt="" v-if="card.field0016 == '1'" />
                                <img src="./assets/icon/京.png" class="icon ml-5" alt="" v-if="card.field0013 == '1'" />
                                <img src="./assets/icon/深.png" class="icon ml-5" alt="" v-if="card.field0012 == '1'" />
                                <img src="./assets/icon/沪.png" class="icon ml-5" alt="" v-if="card.field0014 == '1'" />
                                <img src="./assets/icon/苏.png" class="icon ml-5" alt="" v-if="card.field0015 == '1'" />
                                <img
                                  src="./assets/icon/王店.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0031 == '1'"
                                />
                                <img
                                  src="./assets/icon/洪合.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0032 == '1'"
                                />
                                <img
                                  src="./assets/icon/新塍.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0033 == '1'"
                                />
                                <img
                                  src="./assets/icon/王江泾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0034 == '1'"
                                />
                                <img
                                  src="./assets/icon/油车港.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0035 == '1'"
                                />
                                <img
                                  src="./assets/icon/新城.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0036 == '1'"
                                />
                                <img
                                  src="./assets/icon/运河湾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0037 == '1'"
                                />
                                <img
                                  src="./assets/icon/高新.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0038 == '1'"
                                />
                              </td>
                            </tr>
                          </table>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <div v-if="suzhouList.length != 0" class="suzhou">
                        <!-- <div class="title-image" :class="{ 'mt-50': isExportPdf == true }">
                          <img src="./assets/小标题-苏州@2x.png" style="width: 100%; height: 100%" alt="" />
                        </div> -->
                        <div class="content" v-for="(card, index) in suzhouList" :key="index">
                          <table class="itemClass">
                            <tr>
                              <td rowspan="5" class="td-pic">
                                <el-image
                                  :src="card.uurl"
                                  ref="cardImage"
                                  style="width: 150px; height: 100px; margin: 0 auto; object-fit: cover"
                                  :preview-src-list="[card.uurl]"
                                ></el-image>
                              </td>
                            </tr>
                            <tr>
                              <td>接洽时间：{{ card.field0005 }}</td>
                              <td colspan="3" rowspan="3" style="margin-top: 0px" class="lh-10">
                                接洽内容：{{ card.field0009 }}
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 200px">接洽地点：{{ card.field0006 }}</td>
                            </tr>
                            <tr>
                              <td class="lh-10">接洽对象：{{ card.field0008 }}</td>
                            </tr>
                            <tr>
                              <td><span v-if="card.field0019 != null">区领导：</span>{{ card.field0019 }}</td>
                              <td style="text-align: right; padding: 0px">
                                <img src="./assets/icon/秀.png" class="icon" alt="" v-if="card.field0010 == '1'" />
                                <img src="./assets/icon/金.png" class="icon ml-5" alt="" v-if="card.field0016 == '1'" />
                                <img src="./assets/icon/京.png" class="icon ml-5" alt="" v-if="card.field0013 == '1'" />
                                <img src="./assets/icon/深.png" class="icon ml-5" alt="" v-if="card.field0012 == '1'" />
                                <img src="./assets/icon/沪.png" class="icon ml-5" alt="" v-if="card.field0014 == '1'" />
                                <img src="./assets/icon/苏.png" class="icon ml-5" alt="" v-if="card.field0015 == '1'" />
                                <img
                                  src="./assets/icon/王店.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0031 == '1'"
                                />
                                <img
                                  src="./assets/icon/洪合.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0032 == '1'"
                                />
                                <img
                                  src="./assets/icon/新塍.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0033 == '1'"
                                />
                                <img
                                  src="./assets/icon/王江泾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0034 == '1'"
                                />
                                <img
                                  src="./assets/icon/油车港.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0035 == '1'"
                                />
                                <img
                                  src="./assets/icon/新城.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0036 == '1'"
                                />
                                <img
                                  src="./assets/icon/运河湾.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0037 == '1'"
                                />
                                <img
                                  src="./assets/icon/高新.png"
                                  class="icon ml-5"
                                  alt=""
                                  v-if="card.field0038 == '1'"
                                />
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="page-break"></div> -->
                  <div class="itemClass">
                    <div class="mintitle mt-50">本周小结</div>
                    <div class="part" style="margin-bottom: 30px">
                      <div class="summarize">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span v-if="sum != 0"
                          >区招商中心共接洽项目<span class="s1">{{ sum }}</span
                          >个，</span
                        >
                        <span v-if="echartsShow">秀洲本部、金控公司及各驻外工作部接洽情况如下：</span>
                        <div
                          class="Bar"
                          id="bar"
                          style="height: 200px; width: 600px"
                          ref="Echarts"
                          v-if="echartsShow"
                        ></div>
                        ``
                      </div>
                    </div>
                  </div>
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
import PdfLoader from './utils/exprotPDF'
import 'print-js/dist/print.css'
import printJS from 'print-js'
import html2pdf from 'html2pdf.js'
// 图片压缩
import Compressor from 'compressorjs'
// import PdfLoader from './utils/pdf'
import { getReportList, summarize, summarize2, getTime, getPic } from './api/api'
import * as echarts from 'echarts'

export default {
  name: 'App',
  data() {
    return {
      tableCount: 0,
      //简报内容
      xiuzhouList: [],
      jinkongList: [],
      shenzhenList: [],
      beijingList: [],
      shanghaiList: [],
      suzhouList: [],
      //图片链接
      picList: [],
      urlList: [],
      //本周小结
      year: 0,
      week: 0,
      sum: 0,
      xiuzhou: 0,
      jinkong: 0,
      shenzhen: 0,
      beijing: 0,
      shanghai: 0,
      suzhou: 0,
      //柱状图显示
      echartsShow: true,
      //打印配置
      printObj: {
        id: 'pdfDom', // 必要，打元素的id
        popTitle: '昱能BOM全阶', // 打印配置页上方标题
        preview: 'true', // 是否启动预览模式
        previewTitle: '', // 打印预览的标题
        previewPrintBtnLabel: '', // 打印预览的标题的下方按钮文本
        zIndex: '', // 预览的窗口的z-index
        url: '',
        standard: '',
        extraCss: ''
      },
      chooseTime: [],
      startTime: null,
      endTime: null,
      //分页
      currentPage: 1, // 当前页数
      pageHeight: 0, // 每页的高度
      pageThreshold: 0, // 分页阈值，超过该高度触发分页,
      // 加载
      loading: false,
      // 是否在导出pef
      isExportPdf: false,
      sum1: 0,
      sum2: 0,
      sum3: 0,
      sum4: 0,
      sum5: 0,
      // 页数
      pagination: null
    }
  },
  created() {},
  mounted() {
    this.tableCount = 0
    this.initPage()
  },
  methods: {
    // exportPDF() {
    //   let dom = document.querySelector('pdfDom')
    //   let pdf = new PdfLoader(dom, '秀洲区招商中心每周招商动态' + this.time, '', 'break_page')
    //   pdf.outPutPdfFn('秀洲区招商中心每周招商动态')
    // },
    handleExport(isPrint = false) {
      this.loading = true
      this.isExportPdf = true
      const content = this.$refs.exportContent.$el
      console.log(content)
      let pdf = new PdfLoader(content, '测试', 'itemClass', 'paging', isPrint)
      pdf.outPutPdfFn('测试')
      // html2pdf(content, {
      //   margin: 0,
      //   filename: '招商动态.pdf',
      //   image: {
      //     type: 'jpeg',
      //     quality: 0.98
      //   },
      //   html2canvas: {
      //     dpi: 300,
      //     scale: 4,
      //     useCORS: true
      //   },
      //   jsPDF: {
      //     unit: 'mm',
      //     format: 'a4',
      //     orientation: 'portrait',
      //     putOnlyUsedFonts: true,
      //     compressPdf: true
      //   },
      //   pagebreak: { mode: 'avoid-all', before: '.page-break' }
      // }).then(() => {
      //   this.isExportPdf = false
      //   this.loading = false
      // })
    },
    printPDF() {
      this.handleExport(true)
      // printJS({
      //   printable: './utils/测试.pdf',
      //   type: 'pdf'
      // })
    },
    initPage() {
      this.getYear()
      if (this.chooseTime.length != 0) {
        this.startTime = this.chooseTime[0]
        this.endTime = this.chooseTime[1]
      }
      getTime().then(res => {
        this.startTime = res.data.data[0].startTime
        this.endTime = res.data.data[0].endTime
      })
      summarize(this.startTime, this.endTime).then(res => {
        this.sum = res.data.data[0].sum
        this.week = res.data.data[0].week
        this.xiuzhou = res.data.data[0].xiuzhou
        this.jinkong = res.data.data[0].jinkong
        this.shenzhen = res.data.data[0].shenzhen
        this.beijing = res.data.data[0].beijing
        this.shanghai = res.data.data[0].shanghai
        this.suzhou = res.data.data[0].suzhou
      })
      summarize2(this.startTime, this.endTime).then(res => {
        this.echartsShow = true
        const xAxis = []
        const yAxis = []

        res.data.data.forEach(item => {
          xAxis.push(item.flag)
          yAxis.push(item.num)
        })
        this.$nextTick(() => {
          this.initBar(xAxis, yAxis)
        })
      })
      getReportList(this.startTime, this.startTime).then(res => {
        const that = this
        res.data.data.forEach((item, index) => {
          this.getImageFileFromUrl(item.uurl, '图片.png', function (file) {
            new Compressor(file, {
              quality: 0,
              success(data) {
                that.blobToBase64(data, url => {
                  res.data.data[index].uurl = url
                })
              }
            })
          })

          this.picList.push(item.url)
          if (item.company === '秀洲本部') {
            this.xiuzhouList.push(item)
          } else if (item.company === '金控公司') {
            this.jinkongList.push(item)
          } else if (item.company === '驻深圳工作部') {
            this.shenzhenList.push(item)
          } else if (item.company === '驻北京工作部') {
            this.beijingList.push(item)
          } else if (item.company === '驻深圳工作部') {
            this.shanghaiList.push(item)
          } else if (item.company === '驻苏州工作部') {
            this.suzhouList.push(item)
          }
          this.sum1 = this.xiuzhouList.length + this.jinkongList.length
          this.sum2 = this.sum1 + this.shenzhenList.length
          this.sum3 = this.sum2 + this.beijingList.length
          this.sum4 = this.sum3 + this.shanghaiList.length
        })
      })
    },
    handleSearch() {
      //搜索按钮
      if (this.chooseTime.length == 0) {
        this.$message.info({ message: '请选择时间范围', duration: 1000 })
        return
      }
      this.startTime = this.chooseTime[0]
      this.endTime = this.chooseTime[1]
      this.sum = 0
      this.xiuzhou = 0
      this.jinkong = 0
      this.shenzhen = 0
      this.beijing = 0
      this.shanghai = 0
      this.suzhou = 0
      this.xiuzhouList = []
      this.jinkongList = []
      this.shenzhenList = []
      this.beijingList = []
      this.shanghaiList = []
      this.suzhouList = []
      summarize(this.chooseTime[0], this.chooseTime[1]).then(res => {
        this.sum = res.data.data[0].sum
        this.week = res.data.data[0].week
        this.xiuzhou = res.data.data[0].xiuzhou
        this.jinkong = res.data.data[0].jinkong
        this.shenzhen = res.data.data[0].shenzhen
        this.beijing = res.data.data[0].beijing
        this.shanghai = res.data.data[0].shanghai
        this.suzhou = res.data.data[0].suzhou
      })
      summarize2(this.startTime, this.endTime).then(res => {
        this.echartsShow = true
        const xAxis = []
        const yAxis = []

        res.data.data.forEach(item => {
          xAxis.push(item.flag)
          yAxis.push(item.num)
        })
        this.$nextTick(() => {
          this.initBar(xAxis, yAxis)
        })
      })
      getReportList(this.chooseTime[0], this.chooseTime[1]).then(res => {
        res.data.data.forEach(item => {
          if (item.company === '秀洲本部') {
            this.xiuzhouList.push(item)
          } else if (item.company === '金控公司') {
            // 如果有其他公司，可以继续添加到对应数组中
            this.jinkongList.push(item)
          } else if (item.company === '驻深圳工作部') {
            this.shenzhenList.push(item)
          } else if (item.company === '驻北京工作部') {
            this.beijingList.push(item)
          } else if (item.company === '驻深圳工作部') {
            this.shanghaiList.push(item)
          } else if (item.company === '驻苏州工作部') {
            this.suzhouList.push(item)
          }
        })
      })
    },
    handleReset() {
      //重置按钮
      this.startTime = null
      this.endTime = null
      this.chooseTime = []
      this.xiuzhouList = []
      this.jinkongList = []
      this.shenzhenList = []
      this.beijingList = []
      this.shanghaiList = []
      this.suzhouList = []
      this.initPage()
    },
    exportOnClick() {
      this.$nextTick(() => {
        this.handleExport() // 在页面完全加载后执行导出
      })
    },

    formatDate(dateTimeString) {
      //时间格式化方法
      const date = new Date(dateTimeString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const formattedDate = `${year}-${month}-${day}`
      return formattedDate
    },
    formatDate2(dateTimeString) {
      //时间格式化方法
      const date = new Date(dateTimeString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const formattedDate = `${month}月${day}日`
      return formattedDate
    },
    getYear() {
      const date = new Date()
      this.year = date.getFullYear()
    },
    //本周小结柱状图
    initBar(xAxis, yAxis) {
      let myChart = echarts.init(this.$refs.Echarts)
      var option
      if (xAxis.length == 0) {
        this.echartsShow = false
      }
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            show: false // 不显示 y 轴
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '50px',
            data: yAxis,
            label: {
              show: true,
              position: 'top', // 在柱子顶部显示数据
              textStyle: {
                color: '#afafaf' // 设置文字颜色为黑色
              }
            },
            itemStyle: {
              color: 'rgb(35,134,255)' // 设置柱子颜色为橙色
            }
          }
        ]
      }

      option && myChart.setOption(option)
    },
    getImageFileFromUrl(url, imageName, callback) {
      fetch(url)
        .then(res => {
          return res.blob()
        })
        .then(blob => {
          let imgFile = new File([blob], imageName, { type: 'image/jpeg' })
          callback(imgFile)
        })
    },
    blobToBase64(blob, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        callback(reader.result)
      })
      reader.readAsDataURL(blob)
    }
  }
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
}

.btn {
  position: relative;
  top: 10px;
}

.btn2 {
  position: relative;
  top: 100px;
}

//=========================================
.print-main {
  margin: 0 auto;
  background-color: rgb(35, 134, 255);
  width: 794px;
  height: auto;
  border: 1px solid #000000;

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

  .body-back {
    width: 100%;
  }

  .benbu-img {
    width: 170px;
    height: 30px;
  }
}

.part {
  width: calc(90% - 20px);
  height: auto;
  background: #fff;
  margin: 0 auto;
  border-radius: 0 0px 10px 10px;
  border: 1px transparent solid;
}

.mintitle {
  width: calc(90% - 30px);
  height: 30px;
  line-height: 30px;
  text-align: left;
  margin: 0 auto;
  background: rgb(241, 241, 254);
  padding-left: 10px;
  font-size: 18px;
  font-weight: 100;
  border: 1px transparent solid;
  border-radius: 10px 10px 0 0px;
}

.title-image {
  width: 160px;
  height: 28px;
  margin: 10px;
  margin-top: 15px;
}

.content {
  margin: 10px;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 13px;
  text-align: left;
  margin-top: 10px;
}

td {
  border: 1px solid transparent;
  height: 18px;
  padding: 2px;
  font-weight: 100;
  vertical-align: top;
}

th {
  text-align: center;
}

.td-pic {
  width: 22%;
  height: 22%;
}

.icon {
  min-width: 20px;
  height: 20px;
}

.summarize {
  display: block;
  text-align: left;
  font-size: 14px;
  font-weight: 100;
  margin: 10px;
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

.Bar {
  width: 600px;
  height: 200px;
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
  max-width: 796px;
  padding: 0px !important;
  background-color: rgb(35, 134, 255);
}

.el-divider--horizontal {
  margin: 0px 0 !important;
}

.mt-10 {
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

.lh-10 {
  line-height: 23px;
}

.icon-w {
  height: 20px;
  width: 30px;
}

.page-break {
  page-break-before: always;
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
</style>
<!-- <style @media="print">
@page {
  size: auto;
  margin: 0mm;
}

.bar{
  width: 100px;
  
}
html {
  background-color: #ffffff;
  height: auto;
  margin: 0px;
}

</style> -->
import { color } from 'html2canvas/dist/types/css/types/color';
