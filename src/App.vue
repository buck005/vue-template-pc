<template>
  <div id="app" ref="app">
   <!-- <keep-alive> -->
     <div>
       <div class="dkwContent" v-if="$route.meta.isLogin != 'true'">
          <Header></Header>
          <div class="content">
            <div class="left contentHeight" :class="{width70:isCollapse}">
              111111
            </div>
            <div class="right contentHeight">
              <router-view></router-view>
            </div>
          </div>
       </div>
        <Login  v-if="$route.meta.isLogin == 'true'"></Login>
      </div>
    <!-- </keep-alive> -->
  </div>
</template>

<script type="text/ecmascript-6">
import Header from "base/header/header.vue";
import Login from "components/login/login.vue";
export default {
  name: "App",
  data: function() {
    return {
      isCollapse:false
    };
  },
  components: {
    Header,Login
  },
  methods:{
  //左侧导航栏展示隐藏状态改变
    onCollapseChange(state){
     this.isCollapse=state;
    }
  },
  created(){
  }
};
</script>

<style scoped>
#app{
  min-width: 1000px;
}
#app .contentHeight {
  height: calc(100vh - 50px);
}
.content {
  background: #ecf5ff;
  overflow: hidden;
  display: flex;
}
.content .left {
  width: 200px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  flex-shrink:0;
  background: #fff;
}
.content .right {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
}
#app .width70{
  width: 70px;
}

</style>
