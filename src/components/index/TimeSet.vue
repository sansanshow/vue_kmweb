<template>
  <div class="container" style="height: 100%">
    <div class="i_header">
      <div class="i_left" @click="goback">返回</div>
      <div class="i_title">
        时段控制
      </div>
      <div class="i_right" @click="addRule">
        添加
      </div>
    </div>
    <div class="main">
      <div class="weui-pull-to-refresh-layer">
        <div class="pull-to-refresh-arrow"></div> <!-- 上下拉动的时候显示的箭头 -->
        <div class="pull-to-refresh-preloader"></div> <!-- 正在刷新的菊花 -->
        <div class="down">下拉刷新</div><!-- 下拉过程显示的文案 -->
        <div class="up">释放刷新</div><!-- 下拉超过50px显示的文案 -->
        <div class="refresh">正在刷新...</div><!-- 正在刷新时显示的文案 -->
      </div>
      <div class="weui_cells">
        <template v-for="item in ruleList">
          <!-- v-link="{ path : '/setdetail?r_id=' + item.id + '&r_index=' + $index}"> -->
          <div class="weui_cell" v-link="{ path : '/setdetail?r_id=' + item.id + '&r_index=' + $index}">
            <div class="weui_cell_hd">
              <img src="../../../static/img/i_clock.png" alt="" class="cover">
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <h3 class="title">{{item.controlname}}</h3>
              <p class="summary">
                <label>{{item.start}}~{{item.end}}</label></p>
              <p class="summary">
                <label>{{item.repeat}}</label>&nbsp;&nbsp;<label>允许{{item.exceptnum}}个应用使用</label></p>
            </div>
            <div class="weui_cell_ft">
              <input class="weui_switch" :checked="item.on" type="checkbox" v-on:click.stop="updateRule($index)">
            </div>
          </div>
        </template>
      </div>
      <div v-if="no_data" class="p_tips">
        <p align="center">点击右上角“添加”进行添加</p>
      </div>
    </div>
  </div>
</template>
<style>
.p_tips{
  padding: 10px 5px;
  font-size: 18px;
  color:grey;
}
</style>
<script>
  import mm_params from 'js/common';
  export default {
    name: 'TimeSet',

    components: {},
    data () {
      return {
        footer_show: false,
        ruleList: [],
        no_data: false
      }
    },
    init: function () {
    },
    created: function () {
      $(".weui_switch").click(function (event) {
        event.stopPropagation()
        alert(2);
      })

    },
    ready: function () {
      let vm = this
      $('.main').pullToRefresh();
      $('.main').on("pull-to-refresh", function () {
        vm.loadRules()
      });
      this.loadRules()
    },
    route: {
      data ({to}) {
        return {}
      },
      activate: function (transition) {
        transition.next()
      }
    },
    methods: {
      goback: function () {
        router.go({path: '/main'})
      },
      loadRules: function () {
        let vm = this;
        let param = mm_params.getUserInfo();
        let URL = mm_params.mobile_url + mm_params.rule_url.replace("TYPE", 0).replace('CID', sessionStorage.currChildId).replace('EID', sessionStorage.currEquipId);
        vm.$http.post(URL, param).then((response) => {
          console.log("---loadRules-----success callback-")
          let data = response.json()
          if (data.status == 200) {
            if (data.content.length > 0) {
//              sessionStorage.setItem("km_rule_timeset", data.content)
              vm.ruleList = [];
              vm.ruleList = data.content;
              var str = JSON.stringify(data.content);
              sessionStorage.setItem("km_rule_timeset",str)
            } else {
              vm.no_data = true
            }
          } else {

          }
          $('.main').pullToRefreshDone();
        }, (response) => {
          console.log("---loadRules-----ERROR callback-")
          $('.main').pullToRefreshDone();
        });
      },
      updateRule: function (index) {
        let vm = this;
        let param = mm_params.getUserInfo();
        console.log("sssss777s" + index);
        if (param.userid == 2000) {
          this.nosupport(1)
        } else {
          $.showLoading("正在请求");
          let status = vm.ruleList[index].on ? 0 : 1;
          let ruleid = vm.ruleList[index].id;
          console.log("status:" + status + ",ruleid:" + ruleid)
          console.log("rule_on_url:" + mm_params.rule_on_url)
          let URL = mm_params.mobile_url + mm_params.rule_on_url.replace("RID", ruleid).replace('STATUS', status);
          vm.$http.post(URL, param).then((response) => {
            console.log("---updateRule-----success callback-")
            let data = response.json()
            if (data.status == 200) {
              $.hideLoading();
              $.toast("修改成功");
              this.loadRules()
            } else {
              $.toast("修改失败", "cancel");
              $.hideLoading();
            }
          }, (response) => {
            console.log("---updateRule-----ERROR callback-")
            $.hideLoading();
            $.toast("加载失败", "forbidden")
          });
        }
      },
      addRule:function () {
        let vm = this;
        let param = mm_params.getUserInfo();
        if (param.userid == 2000) {
          mm_params.nosupport(1)
        } else {

          sessionStorage.removeItem("km_edit_index")
          sessionStorage.removeItem("km_edit_rule")
          sessionStorage.setItem("km_edit_ruleId",0)
          sessionStorage.setItem("km_edit_rule_except",'')
          router.go({ path : '/setdetail?r_id=-2'})
        }
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
    }
  }
</script>
