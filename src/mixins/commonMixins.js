//页面常用数据&方法
import { Message } from 'element-ui';
import { mapGetters, mapMutations } from 'vuex';
export const commonMixin = {
    data() {
        return {
            ERROR_OK: '0',//公用接口请求成功code
            COOKIE_TIME: 300000000000000000000000000000000,//cookie存储时间
            waitTime: 1000,//延迟执行默认时间
            clickTimer: null,//防重复点击clickTimer
            flags: true,// 是否首次调用方法
        }
    },

    mounted() {
    },
    methods: {
        //公用消息提示
        _toast(msg, type) {
            Message({
                showClose: true,
                message: msg,
                duration: 500,
                type: type || "info"
            })
        },
        //节流函数  要延迟执行的函数  延迟执行的时间 执行函数入参可以放在wait后
        throttle(fn, wait) {
            let _fn = fn;
            let args = arguments,
                waitTime = wait || this.waitTime,
                self = this;
            if (this.clickTimer) return false;
            if (this.flags) {
                _fn.apply(self, args);
                this.flags = false;
                this.clickTimer = setTimeout(() => {
                    clearTimeout(this.clickTimer);
                    this.clickTimer = null;
                    this.flags = true;
                }, waitTime);
            }
        }
    }
}