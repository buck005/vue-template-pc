<!--图片上传公用组件-->
<template>
	<div class="upLoadImg">
        <el-upload
                :action="action"
                name = "imgFile"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :file-list="fileList" 
                :headers="headers"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
 
<script>
import { contextPath, getCookie } from "assets/js/utils";
import { commonMixin } from "@/mixins/commonMixins";
export default {
  mixins: [commonMixin],
  props: ["imgPath"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      action: `/api/finance/mxd/img_upload?path=logo`,
      headers: { Authorization: "weimob " + getCookie("access_token") },
      imageUrl: this.imgPath.cosUrl ? this.imgPath.cosUrl : "",
      fileList: this.imgPath
    };
  },
  created() {
    this.fileList=this.imgPath.url?this.imgPath:[];
  },
  watch: {
      imgPath:{
        　handler(newValue, oldValue) {
            this.imgPath = newValue;
            if(newValue[0].url==""){
               this.fileList=[]
            }else{
               this.fileList=newValue
            }
        },
        deep: true
      }
  },
  methods: {
    //删除一张图片
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.$emit("handleRemove");
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传之前
    beforeAvatarUpload(file) {
      this.fileList[0]={};
      this.fileList[0]["url"] = "";//默认上传一张图片
      const isJPG = file.type === "image/jpeg" || file.type === "image/png"; //限制图片格式jpg,png
      const isLt2M = file.size / 1024 / 1024 < 2; //限制2M
      if (!isJPG) {
        this._toast("上传头像图片只能是 JPG/PNG 格式!", "error");
      }
      if (!isLt2M) {
        this._toast("上传头像图片大小不能超过 2MB!", "error");
      }
      return isJPG && isLt2M;
    },
    //上传成功
    handleAvatarSuccess(res, file, fileList) {
      if (res.error == this.ERROR_OK) {
        this.$emit("successUrl", res.url, file, fileList);
      } else {
        this._toast(res.msg, "error");
      }
      this.imageUrl = URL.createObjectURL(file.raw);
    }
  }
};
</script>

<style>
.upLoadImg .el-upload-list--picture-card .el-upload-list__item,
.upLoadImg .el-upload--picture-card {
  height: 100px;
  width: 100px;
  line-height: 100px;
}
</style>