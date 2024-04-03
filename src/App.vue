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
                      {{ this.year }}年第{{ week }}周（{{ formatDate(startTime) }}-{{ formatDate(endTime) }}）
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
                          <div class="title itemClass" v-if="index === 0">
                            <img src="@/assets/icon/小标题.png" class="title-img" />
                            <div class="title-text">区主要领导招商动态</div>
                          </div>
                          <div class="content">
                            {{ '（' + numberConvertToUppercase()(index + 1) + '）' + item.field0003 }}
                          </div>
                          <el-divider v-if="index !== mainNewsList.length - 1"></el-divider>
                        </div>
                      </div>
                      <!-- 各主体招商动态 -->
                      <div>
                        <div class="title itemClass mt-10">
                          <img src="@/assets/icon/小标题.png" class="title-img" />
                          <div class="title-text">各主体招商动态</div>
                        </div>
                        <div v-if="xiuzhouList.length != 0" class="xiuzhou">
                          <div v-for="(card, index) in xiuzhouList" :key="index">
                            <table class="itemClass block-table">
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
                                  <img
                                    src="./assets/icon/金.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0016 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/京.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0013 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/深.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0012 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/沪.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0014 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/苏.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0015 == '1'"
                                  />
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
                          <div v-for="(card, index) in jinkongList" :key="index">
                            <table class="itemClass block-table">
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
                                  <img
                                    src="./assets/icon/金.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0016 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/京.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0013 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/深.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0012 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/沪.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0014 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/苏.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0015 == '1'"
                                  />
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
                        <div v-if="shenzhenList.length != 0" class="shenzhen">
                          <div v-for="(card, index) in shenzhenList" :key="index">
                            <table class="itemClass block-table">
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
                                  <img
                                    src="./assets/icon/金.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0016 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/京.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0013 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/深.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0012 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/沪.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0014 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/苏.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0015 == '1'"
                                  />
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
                          <div v-for="(card, index) in beijingList" :key="index">
                            <table class="itemClass block-table">
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
                                  <img
                                    src="./assets/icon/金.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0016 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/京.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0013 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/深.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0012 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/沪.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0014 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/苏.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0015 == '1'"
                                  />
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
                          <div v-for="(card, index) in shanghaiList" :key="index">
                            <table class="itemClass block-table">
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
                                  <img
                                    src="./assets/icon/金.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0016 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/京.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0013 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/深.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0012 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/沪.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0014 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/苏.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0015 == '1'"
                                  />
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
                          <div v-for="(card, index) in suzhouList" :key="index">
                            <table class="itemClass block-table">
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
                                  <img
                                    src="./assets/icon/金.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0016 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/京.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0013 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/深.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0012 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/沪.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0014 == '1'"
                                  />
                                  <img
                                    src="./assets/icon/苏.png"
                                    class="icon ml-5"
                                    alt=""
                                    v-if="card.field0015 == '1'"
                                  />
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
                      <!-- 本周签约项目 -->
                      <div v-if="ContractedProjectsList.length != 0">
                        <div class="title itemClass mt-10">
                          <img src="@/assets/icon/小标题.png" class="title-img" />
                          <div class="title-text">本周签约项目</div>
                        </div>
                        <div v-for="(item, index) in ContractedProjectsList" :key="index">
                          <table class="itemClass block-table">
                            <tr>
                              <td rowspan="5" class="td-pic">
                                <el-image
                                  :src="item.field0012"
                                  ref="cardImage"
                                  style="width: 150px; height: 100px; margin: 0 auto; object-fit: cover"
                                  :preview-src-list="[item.field0012]"
                                ></el-image>
                              </td>
                            </tr>
                            <tr>
                              <td>签约项目：{{ item.field0008 }}</td>
                              <td colspan="3" rowspan="3" style="margin-top: 0px" class="lh-10">
                                签约内容：{{ item.field0011 }}
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 200px">签约时间：{{ item.field0004 }}</td>
                            </tr>
                          </table>
                        </div>
                        <el-divider></el-divider>
                      </div>
                      <!-- 亿元以上备案项目 -->
                      <div v-if="FilingItemsList.length > 0">
                        <div class="title itemClass mt-10">
                          <img src="@/assets/icon/小标题.png" class="title-img" />
                          <div class="title-text">亿元以上备案项目</div>
                        </div>
                        <div class="Filing-items" v-for="(item, index) in FilingItemsList" :key="index">
                          <el-descriptions :column="2" style="font-size: 13px">
                            <el-descriptions-item label="备案日期">{{ item.field0004 }}</el-descriptions-item>
                            <el-descriptions-item label="新增项目用地">{{ item.field0009 }}</el-descriptions-item>
                            <el-descriptions-item label="项目名称">{{ item.field0005 }}</el-descriptions-item>
                            <el-descriptions-item label="总投资">{{ item.field0010 + '万元' }}</el-descriptions-item>
                            <el-descriptions-item label="建设性质">{{ item.field0006 }}</el-descriptions-item>
                            <el-descriptions-item label="落地主体">{{ item.field0015 }}</el-descriptions-item>
                            <el-descriptions-item label="项目单位">{{ item.field0007 }}</el-descriptions-item>
                          </el-descriptions>
                        </div>
                      </div>
                      <!-- 举办招商活动 -->
                      <div v-if="ActivityList.length != 0">
                        <div class="title itemClass mt-10">
                          <img src="@/assets/icon/小标题.png" class="title-img" />
                          <div class="title-text">举办招商活动</div>
                        </div>
                        <div v-for="(item, index) in ActivityList" :key="index">
                          <table class="itemClass block-table">
                            <tr>
                              <td rowspan="5" class="td-pic">
                                <el-image
                                  :src="item.field0009"
                                  ref="cardImage"
                                  style="width: 150px; height: 100px; margin: 0 auto; object-fit: cover"
                                  :preview-src-list="[item.field0009]"
                                ></el-image>
                              </td>
                            </tr>
                            <tr>
                              <td>活动主题：{{ item.field0004 }}</td>
                            </tr>
                            <tr>
                              <td style="width: 200px">活动时间：{{ item.field0005 }}</td>
                              <td>邀请客商：{{ item.field0007 + '人' }}</td>
                            </tr>
                            <tr>
                              <td style="width: 200px">活动地点：{{ item.field0006 }}</td>
                            </tr>
                            <tr style="height: 40px">
                              <td></td>
                            </tr>
                          </table>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <!-- 他山之石 -->
                      <div v-if="OtherList.length != 0">
                        <div v-for="(item, index) in OtherList" :key="index" class="itemClass mt-10">
                          <div class="title itemClass" v-if="index === 0">
                            <img src="@/assets/icon/小标题.png" class="title-img" />
                            <div class="title-text">他山之石</div>
                          </div>
                          <div class="content itemClass">
                            {{ '（' + numberConvertToUppercase()(index + 1) + '）' + item.field0003 }}
                          </div>
                          <el-divider v-if="index !== OtherList.length - 1"></el-divider>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 本周小结 -->
                  <!-- <div class="page-break"></div> -->
                  <div v-if="summaryBarData !== null">
                    <div class="mintitle mt-50 itemClass">本周小结</div>
                    <!-- 柱状图 -->
                    <div class="part" style="margin-bottom: 30px">
                      <div class="summarize">
                        <span v-if="sum != 0"
                          >区招商中心共接洽项目<span class="s1">{{ sum }}</span
                          >个，</span
                        >
                        <span>秀洲本部、金控公司及各驻外工作部接洽情况如下：</span>
                        <div class="Bar" id="bar" style="height: 200px; width: 600px" ref="Echarts"></div>
                      </div>
                    </div>
                  </div>
                  <div class="page-break"></div>
                  <div class="part itemClass" style="border-radius: 10px">
                    <!-- 饼图 -->
                    <div style="font-size: 16px; text-align: left; margin: 20px 0px" class="" v-if="pieList.length > 0">
                      乡镇（平台）共接洽项目5个，接洽情况如下：
                    </div>
                    <div class="pieList" v-if="pieList.length > 0">
                      <div class="item" v-for="(item, index) in pieList" :key="index">
                        <div :id="'pie' + (index + 1)"></div>
                        <div>{{ item.field0020 }}</div>
                      </div>
                    </div>
                    <!-- 柱状图(本年累计接洽情况) -->
                    <div class="mt-10" style="text-align: left" v-if="ContactBarData !== null">
                      本年累计接洽情况如下
                    </div>
                    <div class="part">
                      <div id="yearTotal" class="" v-if="ContactBarData !== null"></div>
                    </div>
                  </div>
                  <!-- 表格 -->
                  <div v-for="(item, index) in [talkingData, SignedData]" :key="index" v-if="item.length > 0">
                    <div class="page-break"></div>
                    <div style="text-align: center" class="list-title">
                      {{
                        index === 0
                          ? `${dayjs().format('YYYY')}年在谈正式协议项目汇总表`
                          : `${dayjs().format('YYYY')}年已签正式协议项目汇总表`
                      }}
                    </div>
                    <el-table
                      v-if="item.length > 0"
                      border
                      :span-method="
                        params => {
                          return objectSpanMethod(params, item)
                        }
                      "
                      :data="item"
                      style="width: calc(90%); margin: 0 auto; border-radius: 10px"
                    >
                      <el-table-column type="index" label="序号" width="60" align="center"> </el-table-column>
                      <el-table-column label="类别" width="60">
                        <template v-slot="{ row }">
                          <div>按{{ row.field0004 }}分</div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="field0005" label="项目" width="auto" align="center"> </el-table-column>
                      <el-table-column prop="field0006" label="个数" width="80" align="center"> </el-table-column>
                      <el-table-column prop="field0007" label="总投资(亿元)" width="80" align="center">
                      </el-table-column>
                      <el-table-column prop="field0008" label="总投资(万美元)" width="80" align="center">
                      </el-table-column>
                      <el-table-column prop="field0009" label="预计产值(亿元/年)" width="80" align="center">
                      </el-table-column>
                      <el-table-column prop="field0010" label="预计税收(万元/年)" width="80" align="center">
                      </el-table-column>
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
  getOther,
  getSignedData,
  getTalkingData,
  getTownshipContactPie,
  getTownshipContactBar
} from './api/api'
import * as echarts from 'echarts'

export default {
  name: 'App',
  data() {
    return {
      tableCount: 0,
      // 区主要领导招商动态
      mainNewsList: [],
      xiuzhouList: [],
      jinkongList: [],
      shenzhenList: [],
      beijingList: [],
      shanghaiList: [],
      suzhouList: [],
      // 签约项目
      ContractedProjectsList: [],
      // 亿元以上备案项目
      FilingItemsList: [],
      // 活动
      ActivityList: [],
      // 他山之石头
      OtherList: [],
      // 在谈项目列表
      talkingData: [],
      // 已签约项目列表
      SignedData: [],
      // 本周小结柱状图数据
      summaryBarData: null,
      // 接洽柱状图数据
      ContactBarData: null,
      // 饼图数据
      pieList: [],
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
      chooseTime: [],
      startTime: null,
      endTime: null,
      // 加载
      loading: false
    }
  },
  created() {},
  mounted() {
    this.tableCount = 0
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
      }
      // 周数
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
      // 本周小结柱状图
      const { data: barDate } = await summarize2(this.startTime, this.endTime)
      const xAxis = []
      const yAxis = []
      this.summaryBarData = barDate.data
      barDate.data.forEach(item => {
        xAxis.push(item.flag)
        yAxis.push(item.num)
      })
      this.$nextTick(() => {
        this.initBar(this.$refs.Echarts, xAxis, yAxis)
      })
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

      // 他山之石
      const { data: OtherList } = await getOther(this.startTime, this.endTime)
      this.OtherList = OtherList.data

      // 各主体信息
      getReportList(this.startTime, this.startTime).then(res => {
        res.data.data.forEach(item => {
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
        })
      })

      // 接洽饼图数据
      const { data: pieShipContact } = await getTownshipContactPie('2024-1-1', '2024-5-1')
      if (pieShipContact.length > 0) {
        this.pieList = pieShipContact
        this.initPie(pieShipContact)
      }
      // 接洽柱状图数据
      const { data: barShipContact } = await getTownshipContactBar(
        dayjs().format('YYYY') + '-01-01',
        dayjs().format('YYYY-MM-DD')
      )
      if (barShipContact.length > 0) {
        this.ContactBarData = barShipContact.data

        const xAxis2 = []
        const yAxis2 = []
        barShipContact.forEach(item => {
          yAxis2.push(item.count)
          xAxis2.push(item.field0020)
        })
        this.$nextTick(() => {
          this.initBar(document.getElementById('yearTotal'), xAxis2, yAxis2)
        })
      }

      // 表格数据
      const { data: SignedData } = await getSignedData(this.startTime, dayjs().format('YYYY-MM-DD'))
      const { data: talkingData } = await getTalkingData(this.startTime, dayjs().format('YYYY-MM-DD'))

      this.SignedData = SignedData.data
      this.talkingData = talkingData.data
    },
    //本周小结柱状图
    initBar(document, xAxis, yAxis) {
      let myChart = echarts.init(document)
      var option
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
    // 本周小结饼图
    initPie(data) {
      let pieData = []
      this.$nextTick(() => {
        data.forEach((item, index) => {
          item.data.forEach(i => {
            pieData.push({
              name: i.field0007,
              value: i.amount
            })
          })

          let chartDom = document.getElementById('pie' + (index + 1))
          let myChart = echarts.init(chartDom)
          const option = {
            tooltip: {
              trigger: 'item'
            },
            grid: {
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px'
            },
            title: {
              text: '数量',
              textStyle: {
                fontSize: 12
              },
              subtext: item.count,
              subtextStyle: {
                fontSize: 20,
                color: '#f68c3c'
              },
              x: 'center',
              y: 'center'
            },
            series: [
              {
                type: 'pie',
                radius: ['40%', '80%'],
                avoidLabelOverlap: false,
                label: {
                  show: true,
                  position: 'inside',
                  formatter: '{d}' + '%'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 10,
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: pieData
              }
            ]
          }
          myChart.setOption(option)
          pieData = []
        })
      })
    },
    // 导出pdf
    handleExport(isPrint = false) {
      this.loading = true
      const content = this.$refs.exportContent.$el
      let pdf = new PdfLoader(content, '招商动态简报', 'itemClass', 'page-break', isPrint)
      pdf.outPutPdfFn().then(() => {
        this.loading = false
      })
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
      this.initPage()
    },
    // 重置
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
            colspan: 1
          }
        } else if (rowIndex === rowspanIndex + 1) {
          return {
            rowspan: rowspanIndex2 - rowspanIndex,
            colspan: 1
          }
        } else if (rowIndex === rowspanIndex2 + 1) {
          return {
            rowspan: rowspanIndex3 - rowspanIndex2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
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
    color: #1d2088;
    font-weight: 600;
    margin-left: 5px;
  }
}
.content {
  text-align: left;
  margin: 10px 0 5px 5px;
  font-weight: 100;
  text-indent: 2em;
  line-height: 1.5;
  font-size: 13px;
}

.block-table {
  border-collapse: collapse;
  width: 100%;
  font-size: 13px;
  text-align: left;
  margin-top: 10px;

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
#yearTotal {
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
  margin-top: 10px;
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
  justify-content: space-between;
  .item {
    width: 30%;
  }
  #pie1,
  #pie2,
  #pie3 {
    height: 200px;
  }
}
.el-table .el-table__cell {
  padding: 1.5px !important;
}
.Filing-items {
  display: flex;
  margin-top: 10px;
  margin-left: 15px;
}
.list-title {
  margin: 15px 0;
  font-size: 20px;
}

.el-descriptions-item__cell {
  padding-bottom: 3px !important;
}
</style>
