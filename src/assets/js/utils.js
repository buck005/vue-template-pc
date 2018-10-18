/**
 * Created by sign on 2018/4/28.
 */
//共用方法
import { Message, Loading } from 'element-ui';
import axios from 'axios';
//如果是?aaa=1&bbb=2的方式请求接口需要序列化时需要引入 import qs from 'qs';

//消息提示
function _toast(msg, type) {
  Message({
    showClose: true,
    message: msg,
    duration: 1000,
    type: type || "info"
  })
}

function getCookie(cookieName) {
  let name = cookieName + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

//cookie设置
function setCookie(name, value, iDay) {
  var oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie = name + '=' + value + ';expires=' + oDate;
}

//cookie删除
function removeCookie(name) {
  this.setCookie(name, 1, -1);
}
axios.defaults.timeout =  10000;
//接口函数封装
function myFetch(url, params, methods) {
  const loading = Loading.service({
    lock: true,
    text: '加载中......',
    background: 'rgba(0, 0, 0, 0.7)',
    target: '#app'
  })
  return new Promise((resolve, reject) => {
    var config = {
      method: methods || 'GET',
      url: url,
      headers: {
       "Content-Type": 'application/json',
//如果是以http://xxx.com?aaa=1&bbb=2的方式请求接口需要改成'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
        };
    if (methods && (methods == 'post' || methods == 'POST')) {
         config.data = params;
//如果是以http://xxx.com?aaa=1&bbb=2的方式请求接口需要改成config.data = qs.stringify(params); 
    } else {
      config.params = params;
    }
    axios(config).then(response => {
      loading.close()
      //登录拦截 根据后端返回的CODE判断是否过期
      if (response.data.code == '9000002'||response.data.code =='9000003'||response.data.code =='9000004') {
        vm.$router.push("/login");//tooken过期
      }else{
        resolve(response.data);
      }
    }).catch((error) => {
      reject(error);
      loading.close()
      // _toast(error, 'error')
    })
  })
}
//登录拦截其它规则添加
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 401: _toast('你已被登出，可以取消继续留在该页面，或者重新登录', 'error'); return Promise.reject(new Error('被登出'));break;
              case 403: _toast('当前用户无相关操作权限！', 'error'); return Promise.reject(new Error('无权操作'));break;
              case 500: _toast('服务端异常或网络异常！', 'error');  return Promise.reject(new Error('服务端异常'));break;
          }
      }
      _toast( error.message, 'error')
      return Promise.reject(error) 
  });
//日期格式转换
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
function format(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  fmt = fmt ? fmt : "yyyy-MM-dd hh:mm:ss";
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}



//storage封装
let storage = {
  //localstorge 设置
  setItem: function (key, value) {
    var valueStr = JSON.stringify(value);
    localStorage.setItem(key, valueStr);
  },
  //localstorge 获取
  getItem: function (key) {
    var value = localStorage.getItem(key);
    var obj = null;
    try {
      obj = JSON.parse(value);
    } catch (e) {
      obj = value;
    }
    return obj;
  },
  //localstorge 删除
  remove: function (key) {
    localStorage.removeItem(key);
  },
  //localstorge 清除
  clear: function () {
    localStorage.clear();
  }
}



//节流函数  要延迟执行的函数  延迟执行的时间
function throttle(fn, wait) {
  let _fn = fn, // 保存需要被延迟的函数引用
    timer,
    flags = true; // 是否首次调用
  return function () {
    let args = arguments,
      self = this;
  }
  if (flags) { // 如果是第一次调用不用延迟，直接执行即可
    _fn.apply(self, args);
    flags = false;
    return flags;
  }
  // 如果定时器还在，说明上一次还没执行完，不往下执行
  if (timer) return false;
  timer = setTimeout(function () { // 延迟执行
    clearTimeout(timer); // 清空上次的定时器
    timer = null; // 销毁变量
    _fn.apply(self, args);
  }, wait);
}
//支持的省份列表数据
let provinceList = [
  {
    value: '河北',
    title: '河北'
  },
  {
    value: '山西',
    title: '山西'
  },
  {
    value: '辽宁',
    title: '辽宁'
  },
  {
    value: '吉林',
    title: '吉林'
  },
  {
    value: '黑龙江',
    title: '黑龙江'
  }, {
    value: '江苏',
    title: '江苏'
  }, {
    value: '浙江',
    title: '浙江'
  }, {
    value: '安徽',
    title: '安徽'
  }, {
    value: '福建',
    title: '福建'
  }, {
    value: '江西',
    title: '江西'
  }, {
    value: '山东',
    title: '山东'
  }, {
    value: '河南',
    title: '河南'
  }, {
    value: '湖北',
    title: '湖北'
  }, {
    value: '湖南',
    title: '湖南'
  }, {
    value: '广东',
    title: '广东'
  }, {
    value: '海南',
    title: '海南'
  }, {
    value: '四川',
    title: '四川'
  }, {
    value: '贵州',
    title: '贵州'
  }, {
    value: '云南',
    title: '云南'
  }, {
    value: '陕西',
    title: '陕西'
  }, {
    value: '甘肃',
    title: '甘肃'
  }, {
    value: '北京',
    title: '北京'
  }, {
    value: '天津',
    title: '天津'
  }, {
    value: '上海',
    title: '上海'
  }, {
    value: '重庆',
    title: '重庆'
  }, {
    value: '广西',
    title: '广西'
  }, {
    value: '西藏',
    title: '西藏'
  }, {
    value: '青海',
    title: '青海'
  }, {
    value: '新疆',
    title: '新疆'
  }, {
    value: '内蒙',
    title: '内蒙'
  }, {
    value: '宁夏',
    title: '宁夏'
  }, {
    value: '香港',
    title: '香港'
  }, {
    value: '台湾',
    title: '台湾'
  }, {
    value: '澳门',
    title: '澳门'
  }
]


export {
  toast,
  myFetch,
  format,
  setCookie,
  getCookie,
  removeCookie,
  throttle,
  storage,
  provinceList
}
