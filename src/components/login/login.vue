<!--用户登录页-->
<template>
  <div class="login content-padding min-width">
    <div class="loginContent">
      <div class="content">
        <div class="right">
          <h3 class="title">新云支付运营后台</h3>
          <p class="font18 LH25 color80">登录</p>
          <input type="text"  placeholder="请输入用户名"
                v-model="userName"
                @blur="checkUserName"
                :class="{'errorClass':errorMsg0}"
                @focus="focusFn('errorMsg0')"
                class="userName ipt">
          <div class="vCode">
            <input type="password" placeholder="请输入密码" class="vCodeIpt ipt"
                  @input="checkPassword"
                  @focus="focusFn('errorMsg1')"
                  v-model="passCode"
                  :class="{'errorClass':errorMsg1}"
                  @keydown.enter="login"
            >
          </div>
          <div class="errorMsg" v-cloak>{{errorMsg}}</div>
          <div class="loginBtn active" v-if="isClickAble" @click="login" >登录</div>
          <div class="loginBtn" v-else>登录</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { goLogin } from "@/api/login";
import { commonMixin } from "@/mixins/commonMixins";

export default {
  mixins: [commonMixin], //定义公用方法和变量
  data() {
    return {
      errorMsg: "", //错误提示信息
      errorMsg0: false, //错误提示信息用户名
      errorMsg1: false, //错误提示信息验证码
      userName: "", //用户用户名
      passCode: "", //密码
      isClickAble: false, //登录按钮是否可点
      isOk: true //获取验证码防连点
    };
  },
  methods: {
    //用户名输入框失去焦点事件
    checkUserName() {
      this.errorMsg0 = false;
      if (this.userName == "") {
        this.errorMsg = "请输入用户名";
        this.isClickAble = false;
      } else {
        this.errorMsg = "";
        this.isClickAble = this.passCode !== "" ? true : false;
      }
    },
    //密码框失去焦点事件
    checkPassword() {
      this.errorMsg1 = false;
      if (this.passCode == "") {
        this.errorMsg = "请输入密码";
        this.isClickAble = false;
      } else {
        this.errorMsg = "";
        this.isClickAble = this.userName !== "" ? true : false;
      }
    },
    //获取焦点事件
    focusFn(model) {
      this[model] = true;
    },
    //登录
    login() {
      if (!this.userName && !this.passCode) {
        return;
      }
      let oData = {
        userName: this.userName,
        password: this.passCode
      };
      goLogin(oData).then(res => {
        if (this.ERROR_OK == res.code) {
          let oData = res.data;
          this.dataProcessing(oData);
        } else {
          this._toast(res.msg, "error");
        }
      });
    },
    //数据处理
    dataProcessing(data) {
      this.$myCookie.clearAllCookie();
      this.$myCookie.setCookie("userName",data.userName,this.COOKIE_TIME);
      this.$myCookie.setCookie("access_token",data.accessTokenEntity.access_token,this.COOKIE_TIME);
      let menuDomain=JSON.stringify(data.menuDomain);//主页菜单数据
      localStorage.setItem("menuDomain",menuDomain);
      this.$router.push("/home");
    }
  },
  components: {},
  created() {
    this.userName = this.$myCookie.getCookie("userName"); //防刷新
  }
};
</script>

<style scoped>
.login {
  background-color: #ecf5ff;
  height: 100vh;
  overflow: hidden;
}
.loginContent {
  margin: 35px 0;
  width: 100%;
  min-height: calc(100vh - 70px);
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginContent .content {
  width: 100%;
  /* padding: 130px 0; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.left {
  width: 343px;
  height: 295px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12.5%;
}

.right {
  height: 393px;
  width: 325px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;
}

.right .title {
  margin: 6px 0;
  font-size: 30px;
  line-height: 42px;
  font-weight: bold;
  color: #4d4d4d;
}

.ipt {
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  border: 1px solid #e2e2e2;
  border-radius: 2px;
  padding-left: 16px;
  box-sizing: border-box;
}

.userName {
  margin: 54px 0 15px;
}

input::-webkit-input-placeholder {
  color: #b3b3b3;
}

.vCode {
  position: relative;
}

.getCode {
  position: absolute;
  width: 6em;
  height: 48px;
  padding-right: 10px;
  box-sizing: border-box;
  line-height: 48px;
  right: 0;
  top: 0;
  font-size: 16px;
  cursor: pointer;
  color:#409EFF;
  text-align: right;
}
.loginBtn {
  background:#409EFF;
  border-radius: 2px;
  font-size: 18px;
  color: #ffffff;
  text-align: center;
  height: 48px;
  line-height: 48px;
  margin-bottom: 10px;
  cursor: pointer;
  opacity: 0.5;
}

.loginBtn.active {
  opacity: 1;
}

.colorFF9 {
  color:#409EFF;
}

.errorMsg {
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin: 12px 0;
  font-size: 14px;
  color:#409EFF;
}

.errorClass {
  border: 1px solid#409EFF;
}
</style>
