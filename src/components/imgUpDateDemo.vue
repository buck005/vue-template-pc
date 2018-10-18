<!--编辑参数-->
<template>
  <div class="basicEdit color666 font14">
      <div class="MB10 upLoadImgList">
        <span class="MR20 color666 left">产品角标（1.1）：</span>
         <upLoadImg class="upLoad" 
         :imgPath="imgPath"
          @handleRemove="onImgRemove('1')"
          @successUrl="upLoadSuccess($event,'1')" ></upLoadImg>
          <span class="tips" v-if="imgPath[0].url===''">请上传角标</span>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import upLoadImg from "base/upLoadImg/ulLoadImg";
import { commonMixin } from "@/mixins/commonMixins";
export default {
  props: ["basicData"],
  mixins: [commonMixin],
  data() {
    return {
      imgPath: [], //产品角标
    };
  },
  methods: {
    //图片上传成功 val上传成功返回的图片地址  type:1产品角标（1.1） 2产品角标
    upLoadSuccess(val, type) {
      if (type == "1") {
        this.imgPath[0].url = val;
      } else {
        this.imgPath1[0].url = val;
      }
    },
    //删除图片 type:1产品角标（1.1） 2产品角标
    onImgRemove(type) {
      if (type == "1") {
        this.imgPath[0].url = "";
      } else {
        this.imgPath1[0].url = "";
      }
    }
  },
  created() {
    if (this.basicData.imgPath.length >= 1) {
      this.imgPath.push({
        urls: this.basicData.imgPath[0].urls,
        url: this.basicData.imgPath[0].cosUrl
      });
    }
    if (this.basicData.imgPath1.length >= 1) {
      this.imgPath1.push({
        urls: this.basicData.imgPath1[0].urls,
        url: this.basicData.imgPath1[0].cosUrl
      });
    }
  },
  components: { upLoadImg }
};
</script>

<style scoped>
.basicEdit {
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 20px;
}
.formList {
  display: flex;
  height: 40px;
  line-height: 40px;
  padding-left: 100px;
}
.formList .basicIpt {
  width: 300px;
}
.left {
  width: 120px;
  text-align: right;
}
.MB10 {
  margin-bottom: 10px;
}
.inputFlex {
  display: flex;
  width: 100%;
  padding-left: 100px;
}
.inputFlex .checkBoxLeft {
  width: 120px;
  margin-right: 50px;
}
.inputFlex .checkBoxRight {
  display: flex;
}
.width5em {
  width: 5em;
}
.checkBoxIpt {
  width: 7em;
}
.tips {
  margin-left: 10px;
  color: red;
}
.upLoadImgList {
  padding-left: 140px;
  display: flex;
}
.upLoadImgList .upLoadImg {
  width: 100px;
  height: 100px;
  overflow: hidden;
}
.basicFooter {
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
