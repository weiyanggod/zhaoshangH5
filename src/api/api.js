import axios from "./axios";
 
//简报信息
export const getReportList = (startTime, endTime) => {
    return axios.request({
        url: `/SearchReport`,
        method: "get",
        params: {
            startTime: startTime,
            endTime: endTime
        }
    });
}
//周数和本周小结
export const summarize = (startTime, endTime) => {
    return axios.request({
        url: `/summarize`,
        method: "get",
        params: {
            startTime: startTime,
            endTime: endTime
        }
    });
}

//周数和本周小结
export const summarize2 = (startTime, endTime) => {
    return axios.request({
        url: `/summarize2`,
        method: "get",
        params: {
            startTime: startTime,
            endTime: endTime
        }
    });
}

//获取开始时间和结束时间
export const getTime = () => {
    return axios.request({
        url: `/gettime`,
        method: "get",
    });
}

//获取图片方法
export const getPic = (url) => {
    return axios.request({
        url: `/projectFile`,
        method: "get",
        params:{
            field0104:url
        }
    });
}
