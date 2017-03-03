<template>
  <div class="container">
    <div class="i_header">
      <div class="i_left" @click="goback">返回</div>
      <div class="i_title">
        今日情况
      </div>
    </div>
    <div class="weui_tab">
      <div class="weui_navbar">
        <div class="weui_navbar_item">
          时间排序
        </div>
        <div class="weui_navbar_item">
          时长排序
        </div>
      </div>
      <div class="weui_tab_bd">
        <div class="weui_tab_bd_item">
          <div class="weui_cells">
            <template v-for="item in list_left">
              <div class="weui_cell">
                <div class="weui_cell_hd">
                  <img :src="item.url" alt="" class="cover">
                </div>
                <div class="weui_cell_bd weui_cell_primary">
                  <h3 class="title">{{item.appName}}</h3>
                  <p class="summary">
                    <label>{{item.start}}~{{item.end}}</label>&nbsp;&nbsp;&nbsp;<label>{{item.time}}</label></p>
                </div>
                <div class="weui_cell_ft">
                </div>
              </div>
            </template>
            <div class="weui_cell">
              <div v-if="footer_show_l" class="weui_cell_bd weui_cell_primary" @click="loadmore(2)">
                <p align="center">加载更多</p>
              </div>

              <div v-else class="weui_cell_bd weui_cell_primary">
                <p align="center">已全部加载</p>
              </div>
            </div>
          </div>
        </div>
        <div class="weui_tab_bd_item">
          <div class="weui_cells">
            <template v-for="item in list_right">
              <div class="weui_cell">
                <div class="weui_cell_hd">
                  <img :src="item.url" alt="" class="cover">
                </div>
                <div class="weui_cell_bd weui_cell_primary">
                  <h3 class="title">{{item.appName}}</h3>
                  <p class="summary">
                    <label>{{item.start}}~{{item.end}}</label>&nbsp;&nbsp;&nbsp;<label>{{item.time}}</label></p>
                </div>
                <div class="weui_cell_ft">
                </div>
              </div>
            </template>
            <div class="weui_cell">
              <div v-if="footer_show_r" class="weui_cell_bd weui_cell_primary" @click="loadmore(1)">
                <p align="center">加载更多</p>
              </div>

              <div v-else class="weui_cell_bd weui_cell_primary">
                <p align="center">已全部加载</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>

<script>
  import mm_params from 'js/common';
  import 'js/weui'

  export default{
    name: 'History',

    components: {},

    data(){
      return {
        list_left: [],
        list_right: [],
        footer_show_l: true,
        footer_show_r: true,
        page_left: 1,
        page_right: 1,
        someData: ''

      }
    },
    created: function () {
//      document.body.setAttribute('ontouchstart', '');
    },
    ready: function () {
      document.body.setAttribute('ontouchstart', '');
      $('.weui_tab').tab();
//      this.loadHistory(1, 2, false);
//      this.loadHistory(1, 1, false)
    },
    route: {
      data ({to}) {
        return {
          list_left: [],
          list_right: [],
          footer_show_l: true,
          footer_show_r: true,
          page_left: 1,
          page_right: 1,
          someData: ''
        }
      },
      activate: function (transition) {
        this.loadHistory(1, 2, false)
        this.loadHistory(1, 1, false)
        transition.next()
      }
    },
    methods: {
      goback: function () {
        router.go({path: '/main'})
      },
      loadmore: function (type) {
        if (type == 2) {
          this.loadHistory(++this.$data.page_left, type, true);
          console.log("page_left----" + this.$data.page_left)
        }
        if (type == 1) {
          this.loadHistory(++this.$data.page_right, type, true);

          console.log("page_right----" + this.$data.page_right)

        }
      },
      loadHistory: function (page, sort_type, foot) {
        let vm = this;
        let pageSize = 8;
        if (foot) {
          $.showLoading("加载中");
        }
        let param = mm_params.getUserInfo();
        let URL = mm_params.mobile_url + mm_params.history_url.replace("SIZE", pageSize).replace('ID', sessionStorage.currEquipId).replace('PAGE', page).replace('TYPE', sort_type);
        vm.$http.post(URL, param).then((response) => {
          console.log("--loadHistory--success-");
          // get status
          console.log(response.status);
//          let historys = [{}, {}, {}, {}]
          let historys = response.json().content
          if (response.json().status == 200) {
            //$.weui.toast('已发送...',1000);
            if (sort_type == 2) {
              console.log("sort_type====2");
              if (page == 1) {
                console.log("page====1");
                vm.list_left = [];
                for (var int = 0; int < historys.length; int++) {
                  var array_element = historys[int];
                  vm.list_left.push(array_element);
                }
              } else {
                console.log("page   --大于--1--" + page);
                for (var int = 0; int < historys.length; int++) {
                  var array_element = historys[int];
                  vm.list_left.push(array_element);
                }
              }
              if (historys.length < pageSize) {
                vm.footer_show_l = false;
              }
            } else {
              console.log("sort_type====1");
              if (page == 1) {
                console.log("page====1");
                vm.list_right = [];
                for (var int = 0; int < historys.length; int++) {
                  var array_element = historys[int];
                  vm.list_right.push(array_element);
                }
              } else {
                console.log("page   --大于--1--" + page);
                for (var int = 0; int < historys.length; int++) {
                  var array_element = historys[int];
                  vm.list_right.push(array_element);
                }
              }
              if (historys.length < pageSize) {
                vm.footer_show_r = false;
              }
            }
            if (foot) {
              console.log('加载完成----');
              $.hideLoading();
            }
          } else {
            $.weui.topTips('请求失败400！');
            if (foot) {
              $.hideLoading();
            }
          }
        }, (response) => {
          // error callback
          console.log('--loadHistory--error-response:' + response);
          if (foot) {
            console.log('加载完成---error-');
            $.hideLoading();
          }
        });

      },
      updateView: function (sort_type, page, foot, historys) {
        if (sort_type == 2) {
          if (page == 1) {
            console.log("page====1");
            this.$data.list_left = [];
            for (var int = 0; int < historys.length; int++) {
              var array_element = historys[int];
              this.$data.list_left.push(array_element);
            }
          } else {
            console.log("page   --大于--1--" + page);
            for (var int = 0; int < historys.length; int++) {
              var array_element = historys[int];
              this.$data.list_left.push(array_element);
            }
          }
          if (historys.length < 10) {
            this.$data.footer_show_l = false;
          }
          console.log("left:" + this.$data.list_left);
        } else {
          if (page == 1) {
            console.log("page====1");
            this.$data.list_right = [];
            for (var int = 0; int < historys.length; int++) {
              var array_element = historys[int];
              this.$data.list_right.push(array_element);
            }
          } else {
            console.log("page   --大于--1--" + page);
            for (var int = 0; int < historys.length; int++) {
              var array_element = historys[int];
              this.$data.list_right.push(array_element);
            }
          }
          if (historys.length < 10) {
            this.$data.footer_show_r = false;
          }
          console.log("right:" + this.$data.list_right);
        }
        if (foot) {
          console.log('加载完成----');
//          setTimeout($.weui.hideLoading, 50);
          $.hideLoading();
        }
      }
    }
  }

</script>
<style>

</style>
