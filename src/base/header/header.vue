<!--公用头部组件-->
<template>
  <div class="header min-width">
      <div class="left font24 colorFFF">微盟贷款王--运营后台</div>
      <div class="right cursor positionR">
        <el-col :span="120">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" v-cloak>
              {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="quiteLogin">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      userName:"",//用户名
    };
  },
  methods: {
    //退出登录 清除cookie
    quiteLogin() {
       this.$myCookie.clearAllCookie();
       this.$router.push("/login");
    },
    //检查登录状态
    checkLoginState(){
      let tooken=this.$myCookie.getCookie("access_token");
      if(tooken){
        this.userName=this.$myCookie.getCookie("userName");
      }else{
        this.$router.push("/login");
      }
    }
  },
  created() {
    this.checkLoginState();
  }
};
</script>

<style scoped>
.header {
  background-color:#409EFF;
  height: 50px;
  line-height: 50px;
  color: #666;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
}
.header .right {
  line-height: 50px;
}
.header .right .el-dropdown{
  color: #fff;
}

</style>
