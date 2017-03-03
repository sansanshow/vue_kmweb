<template>
  <div class="container">
    <div class="i_header" style="background-color: #ee000000">
      <div class="i_left" @click="goback">返回</div>
      <div class="i_title">
        时长控制
      </div>
    </div>
    <div class="weui_tab">
      <div class="weui_navbar" style="position: fixed;top:52px">
        <a class="weui_navbar_item weui_bar_item_on">
          允许使用的应用（{{num_left}}）
        </a>
        <a class="weui_navbar_item">
          限制使用的应用（{{num_right}}）
        </a>
      </div>
      <div class="weui_tab_bd">
        <div class="weui_tab_bd_item">
          <div class="weui_grids">
            <!--item.appId-->
            <div class="weui_grid" v-for="item in list_left" @click="setLimit(item.appId,item.appInfo.name)">
              <div class="weui_grid_icon">
                <img :src="item.appInfo.url" alt="">
              </div>
              <p class="weui_grid_label">
                <span>{{item.appInfo.name}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="weui_tab_bd_item">
          <div class="weui_grids">
            <div class="weui_grid" v-for="item in list_right"
                 @click="doEditRule(item.id,item.appId,item.dur,item.appInfo.name)">
              <div class="weui_grid_icon">
                <img :src="item.appInfo.url" alt="">
              </div>
              <p class="weui_grid_label">
                <span>{{item.appInfo.name}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  p.weui_grid_label span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  * {
    tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -ms-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .timePlug {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    line-height: 1;
    z-index: 9999;
  }

  .timePlug > div {
    width: 90%;
    background: #fff;
    border-radius: 12px;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .timePlug > div h2 {
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
  }

  .timePlug > div p {
    font-size: 16px;
    color: #666;
    margin-top: 10px;
    padding: 0 10px;
  }

  .timePlug > div .but {
    display: -webkit-box;
    font-size: 16px;
    margin-top: 10px;
    border-top: solid 1px #d1d1d1;
  }

  .timePlug > div .but div {
    -webkit-box-flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .timePlug > div .time {
    height: 160px;
    width: 100%;
    overflow: hidden;
    margin-top: 10px;
    position: relative;
  }

  .timePlug > div .time-border {
    width: 100%;
    height: 40px;
    border-top: solid 1px #d1d1d1;
    border-bottom: solid 1px #d1d1d1;
    position: absolute;
    top: 60px;
    left: 0;
    box-sizing: border-box;
  }

  .swiper-container {
    width: 50%;
    float: left;
  }

  .swiper-slide {
    background: none;
    color: #a6a6a6;
  }

  .swiper-slide-active {
    color: #232323;
    font-size: 26px;
  }
</style>
<script>
  import mm_params from 'js/common';
  import timePlug from 'js/timePlugin';

  export default{
    data(){
      return {
        list_left: [],
        list_right: [],
        num_left: 0,
        num_right: 0
      }
    },
    components: {},
    ready: function () {
      document.body.setAttribute('ontouchstart', '');
      $('.weui_tab').tab();
      this.loadLimitData(1000);
      this.loadLimitData(2000);
    },
    methods: {
      goback: function () {
        router.go({path: '/main'})
      },
      loadLimitData: function (type) {
        let vm = this;
        let param = mm_params.getUserInfo();
        let URL = mm_params.mobile_url + mm_params.rule_url.replace("TYPE", type).replace('CID', sessionStorage.currChildId).replace('EID', sessionStorage.currEquipId);
        vm.$http.post(URL, param).then((response) => {
          console.log("---loadLimitData-----success callback-")
          let data = response.json()
          if (data.status == 200) {
            if (data.content.length > 0) {
              if (type == 1000) {
                vm.list_left = [];
                vm.list_left = data.content;
                vm.num_left = vm.list_left.length
              } else {
                vm.list_right = [];
                vm.list_right = data.content;
                vm.num_right = vm.list_right.length
              }
            } else {

            }
          } else {

          }
        }, (response) => {
          console.log("---loadLimitData-----ERROR callback-")
        });
      },
      setLimit: function (appid, appname) {
        let vm = this
        timePlug.init(appname, "每天限制使用多久？", 1, 0, "生效", function (hh, mm) {
          let dur = (hh * 3600 + mm * 60) * 1000
          vm.doUpdateData(appid, dur)
        }, '', null);
      },
      doEditRule: function (ruleid, appid, dur, appname) {
        let hhmm = mm_params.computeHHMM(dur);
        let hour = hhmm[0];
        let minute = hhmm[1];
        let vm = this;
        timePlug.init(appname, "每天限制使用多久？", hour, minute, "生效",
          function (hh, mm) {
            let duration = (hh * 3600 + mm * 60) * 1000
//          alert("生效"+dur)
            vm.doUpdateData(appid, duration)
          }, "解除", function () {
            vm.removeRule(ruleid, appid)
          });
      },
      doUpdateData: function (appid, time) {
        let vm = this;
        let param = mm_params.getUserInfo();
        if (param.userid == 2000) {
          timePlug.display();
          mm_params.nosupport(1);
        } else {
          param.duration = time;
          param.appId = appid;
          $.showLoading("正在保存");
          let URL = mm_params.mobile_url + mm_params.rule_save_url.replace("TYPE", 1000).replace('CID', sessionStorage.currChildId).replace('EID', sessionStorage.currEquipId);
          vm.$http.post(URL, param).then((response) => {
            $.hideLoading();
            console.log("---doUpdateData-----success callback-")
            let data = response.json()
            console.log(JSON.stringify(data))
            if (data.status == 200) {
              console.log("---doUpdateData-----200-")
              vm.loadLimitData(1000)
              vm.loadLimitData(2000)
              timePlug.display()
              console.log("---doUpdateData-----400-")
              $.toast("修改成功");
              timePlug.display()
            } else {
              $.toast("修改失败", "cancel");
            }
          }, (response) => {
            $.hideLoading();
            console.log("---doUpdateData-----ERROR callback-")
            $.toast("操作失败", "forbidden");
            timePlug.display()
          });
        }
      },
      removeRule: function (ruleid, appid) {
        let vm = this;
        let param = mm_params.getUserInfo();
        if (param.userid == 2000) {
          timePlug.display()
          mm_params.nosupport(1)
        } else {
          param.appId = appid
          $.showLoading("正在保存");
          let URL = mm_params.mobile_url + mm_params.rule_on_url.replace("RID", ruleid).replace('STATUS', 0);
          vm.$http.post(URL, param).then((response) => {
            $.hideLoading();
            console.log("---removeRule-----success callback-")
            let data = response.json()
            console.log(JSON.stringify(data))
            if (data.status == 200) {
              console.log("---removeRule-----200-")
              timePlug.display()
              vm.loadLimitData(1000)
              vm.loadLimitData(2000)
              $.toast("修改成功");
            } else {
              console.log("---removeRule-----400-")
              $.toast("修改失败", "cancel");
            }
            timePlug.display()
          }, (response) => {
            $.hideLoading();
            console.log("---removeRule-----ERROR callback-")
            $.toast("操作失败", "forbidden");
            timePlug.display()
          });
        }
      }
    }
  }
</script>
