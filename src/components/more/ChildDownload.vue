<template>
  <div class="container" style="padding-bottom: 50px">
    <div class="i_header">
      <div class="i_left" @click="goback">返回</div>
      <div class="i_title">
        儿童端下载
      </div>
    </div>
    <div class="weui_cells">
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary" align="center">
          <label class="weui_cells_title">为了实现监管</label><br/>
          <label class="weui_cells_title">您需要在<b><font color="#00c69e">孩子手机</font></b>上下载“苗苗儿童端”</label>
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary" align="center">
          <img src="../../../static/img/child_site_barcode.png" id="child_dowmload"/>
        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary" align="center">
          <label class="weui_cells_title">您也可以在孩子手机上</label><br/>
          <label class="weui_cells_title">通过应用市场</label><br/>
          <label class="weui_cells_title">搜索<b>“<font color="#00c69e">苗苗儿童端</font>”</b>进行下载安装</label>
        </div>
      </div>
    </div>
    <div class="weui_btn_area">
      <a class="weui_btn weui_btn_plain_primary" @click="scan_qrcode()"
         href="javascript:void(0);">已安装，下一步</a>
    </div>
  </div>
</template>
<script>
  import BindChild from './BindChild.vue'
  import mm_params from 'js/common';
  export default {
    name: 'ChildDownload',

    components: {},
    data() {
      return {}
    },
    created: function () {
      router.on('/bindchild', {
        component: BindChild
      })
    },
    methods: {
      scan_qrcode: function () {
//        if (mm_params.devlop) {
          router.go({path: '/bindchild'});
//        }
      },
      goback: function () {
        router.go({path: '/main/settings'})
        //router.go({ path : '/addchild' })
      }
    }
  }
</script>

<style>
  #child_dowmload {
    width: 80%;
    height: 80%;

  }
</style>
