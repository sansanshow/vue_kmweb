<template>
  <div class="container">
    <div class="i_header">
      <div class="weui_cell" style="padding: 0px 15px">
        <div class="weui_cell_hd">当前手机：</div>
        <div class="weui_cell_bd weui_cell_primary">
          <select v-model="child_equip" class="weui_select" name="equiplist" id="equiplist">
            <template v-for="option in equipList">
              <option value="{{option.id}},{{option.childId}}" v-if="option.id == equipId" selected>
                <!--<option value="{{option.id}},{{option.childId}}" v-if="$index == 0" selected>-->
                {{option.aliasName}}
              </option>
              <option value="{{option.id}},{{option.childId}}" v-else>
                {{option.aliasName}}
              </option>
              <!--<option :value="option" v-if="option.id == equipId" selected>-->
              <!--{{ option }}-->
              <!--</option>-->
              <!--<option :value="option" v-else>-->
              <!--{{ option }}-->
              <!--</option>-->
            </template>
          </select>
        </div>
        <div class="weui_cell_bd">

        </div>
      </div>
    </div>
    <div v-if="show_tips" class="weui_cell">
      <div class="weui_cell_bd weui_cell_primary" v-link="{path: '/main/settings'}">
        <p class="summary" style="color: red">当前为演示数据，切换到“设置”添加孩子手机</p>
      </div>
      <!--  <div class="weui_cell_ft">
        </div>-->
    </div>
    <div class="weui_grids">
      <div id="history" class="weui_grid" v-link="{ path : '/history' }">
        <div class="weui_grid_icon">
          <img src="../../static/img/index/icon_nav_cell.png" alt="">
        </div>
        <p class="weui_grid_label">
          今日情况
        </p>
      </div>
      <div v-if="timeLimit" id="duration_ctrl" class="weui_grid" v-link="{ path : '/timelimit' }">
        <div class="weui_grid_icon">
          <img src="../../static/img/index/icon_timelimit.png" alt="">
        </div>
        <p class="weui_grid_label">
          时长控制
        </p>
      </div>
      <div id="data_report" class="weui_grid" v-link="{ path : '/datareport' }">
        <div class="weui_grid_icon">
          <img src="../../static/img/index/icon_data_report.png" alt="">
        </div>
        <p class="weui_grid_label">
          数据图表
        </p>
      </div>
      <div id="schedule_ctrl" class="weui_grid" v-link="{ path : '/timeset' }">
        <div class="weui_grid_icon">
          <img src="../../static/img/index/icon_nav_icons.png" alt="">
        </div>
        <p class="weui_grid_label">
          时段限制
        </p>
      </div>
      <div id="location" class="weui_grid" v-link="{ path : '/location' }">
        <div class="weui_grid_icon">
          <img src="../../static/img/index/icon_location.png" alt="">
        </div>
        <p class="weui_grid_label">
          定位查看
        </p>
      </div>
      <div class="weui_grid" @click="lockScreen">
        <div class="weui_grid_icon">
          <img src="../../static/img/index/icon_lock.png" alt="">
        </div>
        <p class="weui_grid_label">
          {{ lockInfo.text}}
        </p>
      </div>
      <div id="snap_shot" class="weui_grid" v-link="{ path : '/snapshot' }">
        <div class="weui_grid_icon">
          <img src="../../static/img/index/icon_screenshot.png" alt="">
        </div>
        <p class="weui_grid_label">
          立即截图
        </p>
      </div>
      <div id="" class="weui_grid" v-link="'/html?type=31&url=' + help">
        <div class="weui_grid_icon">
          <img src="../../static/img/index/icon_help.png" alt="">
        </div>
        <p class="weui_grid_label">
          使用帮助
        </p>
      </div>
      <div id="download_app" class="weui_grid" @click="downloadApp">
        <div class="weui_grid_icon">
          <img src="../../static/img/index/icon_download.png" alt="">
        </div>
        <p class="weui_grid_label">
          下载APP
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import mm_params from 'js/common';
  export default{
    name: 'Index',

    components: {},
    data(){
      return {
        help: mm_params.help_url,
        download_url: mm_params.download_url,
        child_equip: '',
        equipId: 0,
        childId: "",
        equipNum: 0,
        equipList: [],
        show_tips: false,
        lockState: 0,
        lockInfo: {text: '立即锁屏', img_url: '../../static/img/index/icon_lock.png'},
        timeLimit:mm_params.timeLimit
      }
    },
    ready: function () {
      this.updateEquipList()
    },
    route: {
      data ({to}) {
        return {
          // equipList: equips
//          equipList: []
//          equipId: 0
        }
      },
      activate: function (transition) {
        transition.next()
      }
    },
    methods: {
      clearCache: function () {
        localStorage.clear();
      },
      downloadApp: function () {
        window.location.href = mm_params.download_url
      },
      nosupport: function (type) {
        if (type == 1) {
          $.modal({
            title: "演示数据",
            text: "当前为演示数据，切换到“设置”添加孩子手机",
            buttons: [
              {
                text: "前往", onClick: function () {
                router.go({path: '/main/settings'});
              }
              },
              {
                text: "取消", className: "default", onClick: function () {
              }
              },
            ]
          });
        } else {
          $.modal({
            title: "提示",
            text: "该功能暂时只支持APP,请前往下载",
            buttons: [
              {
                text: "下载", onClick: function () {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kidmate.parent';
              }
              },
              {
                text: "取消", className: "default", onClick: function () {
              }
              },
            ]
          });
        }
      },
      updateEquipList: function () {
        let e_id = sessionStorage.currEquipId;
        let param = mm_params.getUserInfo(1);
        let URL = mm_params.mobile_url + '/weixin/equip/equipment.wx/get';
        let equips = [];
        let vm = this;
        vm.$http.post(URL, param).then((response) => {
          // success callback
          let ret_data = response.json();
          if (ret_data.status == 200) {
            equips = ret_data.content;
            if (equips.length > 0) {
              vm.show_tips = false
              localStorage.setItem("hasEquip", equips.length)
              localStorage.setItem("km_EQUIP_NUM", equips.length)
              vm.equipNum = equips.length
              if (typeof(e_id) == "undefined" || equips.length == 1) {
                sessionStorage.setItem("currEquipId", equips[0].id);
                sessionStorage.setItem("currChildId", equips[0].childId);
                vm.equipId = equips[0].id;
              } else {
//                console.log("-e_id-no--undefined"+e_id);
                vm.equipId = e_id;
              }
              vm.equipList = equips;
              this.initLockStatus()
            } else {
              localStorage.setItem("hasEquip", 0)
              localStorage.setItem("km_EQUIP_NUM", 0);
              //获取演示用户设备
              this.getDemoEquips()
              vm.show_tips = true
            }

          } else {
            localStorage.setItem("hasEquip", 0)
            localStorage.setItem("km_EQUIP_NUM", 0)
//            console.log("equiplist----success-<0")
          }
        }, (response) => {
          // error callback
          console.log("equiplist---http.post()--error callback-")
        });

      },
      getDemoEquips: function () {
        let e_id = sessionStorage.currEquipId;
        let param = mm_params.getUserInfo();
        let URL = mm_params.mobile_url + '/weixin/equip/equipment.wx/get';
        let equips = [];
        let vm = this;
        vm.$http.post(URL, param).then((response) => {
          // success callback
          let ret_data = response.json();
          if (ret_data.status == 200) {
            equips = ret_data.content;
            if (equips.length > 0) {
//              localStorage.setItem("km_EQUIP_NUM", equips.length)
              vm.equipNum = equips.length
              if (typeof(e_id) == "undefined" || equips.length == 1) {
                sessionStorage.setItem("currEquipId", equips[0].id);
                sessionStorage.setItem("currChildId", equips[0].childId);
                vm.equipId = equips[0].id;
              } else {
//                console.log("-e_id-no--undefined");
                vm.equipId = e_id;
              }
              vm.equipList = equips;
            } else {
              $.toast("服务器异常", "forbidden")
            }

          } else {
            console.log("equiplist---demo---success-<0")
          }
        }, (response) => {
          // error callback
          console.log("equiplist----demo-http.post()--error callback-")
        });

      },
      lockScreen: function () {
        let vm = this;
        if (vm.show_tips) {
          mm_params.nosupport(1);
        } else {
          let param = mm_params.getUserInfo();
          let isLock = 0;
          if (vm.lockState == 1) {
            isLock = 0;
//          console.log("isLock-1-" + isLock)
          } else {
            isLock = 1;
//          console.log("isLock-2-" + isLock)
          }
          let URL = mm_params.mobile_url + mm_params.lock_url.replace("CID", sessionStorage.currChildId).replace("EID", sessionStorage.currEquipId).replace("LOCK", isLock);
          vm.$http.post(URL, param).then((response) => {
            // success callback
            let data = response.json();
            if (data.status == 200) {
//            console.log("-ss-data.content:" + data.content)
              $.toast("请求成功");
//            console.log(data.content)
              if (data.content.on == true) {
//              console.log("-1-ss-lockScreen:" + data.content.on)
                vm.lockState = 1
                vm.lockInfo = {text: '解锁'}
              } else {
//              console.log("-2-ss-lockScreen:" + data.content.on)
                vm.lockState = 0
                vm.lockInfo = {text: '立即锁屏'}
              }
            } else {
              console.log("-3-ss-lockScreen")
              $.toast("请求失败", "cancel");
            }
          }, (response) => {
            console.log("lockScreen---http.post()--error callback-")
            $.toast("异常", "forbidden")
          });
        }
      },
      initLockStatus: function () {
        console.log("----initLockStatus-");
        let param = mm_params.getUserInfo();
        let URL = mm_params.mobile_url + mm_params.init_lock_url.replace("CID", sessionStorage.currChildId).replace("EID", sessionStorage.currEquipId);
        let vm = this;
        vm.$http.post(URL, param).then((response) => {
          // success callback
//          console.log("initLockStatus---http.post()--success callback-" + response.json())
          let data = response.json();
          if (data.status == 200) {
            console.log("--data.content:" + data.content)
            if (data.content.on == true) {
//              console.log("-1--lockState:" + data.content.on)
              vm.lockState = 1
              vm.lockInfo = {text: '解锁'}
            } else {
//              console.log("-2--lockState:" + data.content.on)
              vm.lockState = 0
              vm.lockInfo = {text: '立即锁屏'}
            }
          } else {
            console.log("-3--lockState")

          }
        }, (response) => {
//          console.log("initLockStatus---http.post()--error callback-" + response.json())
        });
      }
    },
    watch: {
      child_equip: {
        handler: function (newVal, oldVal) {
          let c_e = newVal.split(',');
          sessionStorage.setItem("currEquipId", c_e[0]);
          sessionStorage.setItem("currChildId", c_e[1]);
          this.$data.equipId = c_e[0];
          sessionStorage.currEquipId = c_e[0];
          this.initLockStatus()
        },
        deep: true
      }
    }
  }
</script>
 
