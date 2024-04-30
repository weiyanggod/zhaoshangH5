import axios from './axios'

//各主体动态信息
export const getReportList = (startTime, endTime, szbm) => {
  return axios.request({
    url: `/SearchReport`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime,
      szbm
    }
  })
}
// 周数
export const summarize = (startTime, endTime) => {
  return axios.request({
    url: `/summarize`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}
// 本周小结
export const summarize2 = (startTime, endTime) => {
  return axios.request({
    url: `/summarize2`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}

//获取开始时间和结束时间
export const getTime = () => {
  return axios.request({
    url: `/gettime`,
    method: 'get'
  })
}

//获取区主要领导招商动态
export const getMainNews = (startTime, endTime) => {
  return axios.request({
    url: `/DynamicLibrary`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}

//获取签约项目
export const getContractedProjects = (startTime, endTime) => {
  return axios.request({
    url: `/ProjectLibrary`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}

//获取亿元以上备案项目
export const getFilingItems = (startTime, endTime) => {
  return axios.request({
    url: `/OverMillion`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}

//获取活动
export const getActivity = (startTime, endTime) => {
  return axios.request({
    url: `/Activity`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}

//获取开工项目
export const getStartedProjects = (startTime, endTime) => {
  return axios.request({
    url: `/ProjectCommencement`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}

//获取十亿元以上备案项目
export const getBillionProjects = (startTime, endTime) => {
  return axios.request({
    url: `/OverBillion`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}

// 他山之石
export const getOther = (startTime, endTime) => {
  return axios.request({
    url: `/TSZS`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}

// 已签项目
export const getSignedData = (startTime, endTime) => {
  return axios.request({
    url: `/Signed`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}

// 在谈项目
export const getTalkingData = (startTime, endTime) => {
  return axios.request({
    url: `/Talking`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}

// 乡镇接洽饼图
export const getTownshipContactPie = (startTime, endTime) => {
  return axios.request({
    url: `/Engage`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}
// 乡镇接洽柱状图
export const getTownshipContactBar = (startTime, endTime) => {
  return axios.request({
    url: `/Engage2`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}
// 累计项目柱状图
export const getTotalProject = (startTime, endTime) => {
  return axios.request({
    url: `/Engage3`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}
// 签约活动项目规模柱状图
export const getActivityBar = (startTime, endTime) => {
  return axios.request({
    url: `/Engage4`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime
    }
  })
}
//各主体动态信息图表
export const getReportListLine = (startTime, endTime) => {
  return axios.request({
    url: `/Engage5`,
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime,
    }
  })
}