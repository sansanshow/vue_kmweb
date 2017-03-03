<template>
  <div class="container">
    <div class="i_header">
      <div class="i_left" @click="goback({path:'/main/settings'})">返回</div>
      <div class="i_title">
        扫码绑定
      </div>
    </div>
    <!--<div class="weui_cells_title">扫描下方二维码进行绑定</div>-->
    <div class="weui_cells">

      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary" align="center">
          <label class="weui_cells_title"><font style="font-size: 18px;color: #333333;">绑定家长端和儿童端</font></label>
        </div>
      </div>
      <!--<qrcode-img v-bind:codestr="bindcode"></qrcode-img>-->
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary" align="center" id="code">

        </div>
      </div>
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary" align="center">
          <p><label class="weui_cells_title"><font style="font-size: 18px;color: #333333;">打开孩子手机的苗苗APP</font></label></p>
          <p><label class="weui_cells_title"><font style="font-size: 18px;color: #333333;">扫描此二维码</font></label></p>
        </div>
      </div>
    </div>
    <div class="weui_btn_area">
      <a class="weui_btn weui_btn_plain_primary" id="refresh"
         @click="refreshCode">刷新二维码</a>
    </div>
  </div>
</template>
<script>
  //import qrcodeImg from './qrcodeImg.vue'
  import mm_params from 'js/common';
  var timer;
  var count = 0;
  export default{
    name: 'BindChild',

    components: {
//      qrcodeImg
    },
    data(){
      return {
        bindcode: '',
        equipNum: localStorage.km_EQUIP_NUM,
        timer: null,
        count: 0
      }
    },
    created: function () {

    },
    ready: function () {
//      this.addTimer();
      this.refreshCode();
    },
    route: {
      data ({to}){
//        let code_str = this.refreshCode();

//        this.$data.bindcode = code_str
//        console.log("bind_code" + code_str);
        return
        {
          count: 0
        }
      }
    },
    methods: {
      goback: function (path) {
        window.clearInterval(mm_params.timer)
        router.go(path)
      },
      refreshCode: function () {
        window.clearInterval(mm_params.timer);
        let vm = this;
        $.showLoading("加载中");
        let code_str = '';
        let p_id = localStorage.km_UID;
        let c_id = sessionStorage.curr_child_id;
        let URL = mm_params.mobile_url + mm_params.qrcode_url.replace("PID", p_id).replace("CID", c_id);
        let param = mm_params.getUserInfo(1);
        vm.$http.post(URL, param).then((response) => {
          // success callback
          console.log("refreshCode---http.post()--success callback-")
          if (response.json().status == 200) {
            code_str = response.json().content;
            vm.$data.bindcode = code_str;
            $("#code").empty();
            $('#code').qrcode({
              render: "table",
              width: 200,
              height: 200,
              text: code_str
            });
            console.log("refresh_code:" + vm.$data.bindcode);
            mm_params.timer = window.setInterval(function () {
              if (vm.$data.count == 30) {
                //如果count值达到10，清空定时器
                window.clearInterval(timer);
                if (localStorage.km_EQUIP_NUM > 0) {
                  //router.go({path: '/main'});
                }

              }
              vm.count += 1;
              let URL = mm_params.mobile_url + "/weixin/equip/equipment.wx/equipnum";
              let param = mm_params.getUserInfo(1);
              vm.$http.post(URL, param).then((response) => {
                // success callback
                console.log("isBind---http.post()--success callback-")

                let data = response.json();
                var newnum = parseInt(data.content);
                var oldnum = localStorage.hasEquip;
                console.log("old_" + oldnum);
                console.log("newnum_" + newnum);
                //alert("new:"+newnum+",old:"+oldnum+",count:"+count);
                if (newnum > oldnum) {
                  window.clearInterval(mm_params.timer);
                  router.go({path: '/main'});
                }

              }, (response) => {
                // error callback
                console.log("isBind---http.post()--error callback-")
              });
            }, 6 * 1000);
            $.hideLoading();
          } else {
            $.hideLoading();
            $.toast("刷新失败", "forbidden")
          }

        }, (response) => {
          // error callback
          console.log("refreshCode---http.post()--error callback-")
          $.hideLoading();
          $.toast("请求失败", "forbidden");
        });
        return code_str
      },
      isBind: function () {
        this.$data.count += 1;
        let URL = mm_params.mobile_url + "/weixin/equip/equipment.wx/equipnum";
        let param = mm_params.getUserInfo();
        this.$http.post(URL, param).then((response) => {
          // success callback
          console.log("isBind---http.post()--success callback-")

          response.json().content;

        }, (response) => {
          // error callback
          console.log("isBind---http.post()--error callback-")
        });
      }
    },
    watch: {
      bindcode: {
        handler: function (newVal, oldVal) {
          console.log("changed-bindcode_newVal:" + newVal);
          console.log("changed-bindcode_oldVal:" + oldVal);
        },
        deep: true
      },
      equipNum: {
        handler: function (newVal, oldVal) {
          console.log("changed-equipNum_newVal:" + newVal);
          console.log("changed-equipNum_oldVal:" + oldVal);
        },
        deep: true
      }
    }
  }
//
//  function addTimer() {
//    console.log("---addTimer");
//    //每隔500毫秒执行一次add()方法
//    timer = window.setInterval("isBindSuccess()", 6 * 1000);
//  }
  function isBindSuccess() {
    ++count;
    console.log("---isBind--count:" + count);
    if (count == 10) {
      //如果count值达到10，清空定时器
      window.clearInterval(timer);
      if (localStorage.km_EQUIP_NUM > 0) {
        //router.go({path: '/main'});
      }

    }
    var param = mm_params.getUserInfo();
    $.ajax({
      url: mm_params.mobile_url + "/weixin/equip/equipment.wx/equipnum",
      data: param,
      type: "POST",
      dataType: "json",
      jsonp: "callback",
      error: function () {
        alert("扫码请求失败");

      },
      success: function (data) {
        var newnum = parseInt(data.content);
        var oldnum = localStorage.hasEquip;
        console.log("old_" + oldnum);
        console.log("newnum_" + newnum);
        //alert("new:"+newnum+",old:"+oldnum+",count:"+count);
        if (newnum > oldnum) {
          window.clearInterval(timer);
          //router.go({path: '/main'});
        }
      }
    })
  }
</script>
<style>

</style>
