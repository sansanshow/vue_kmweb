<template>
  <div class="container">
    <div class="i_header">
      <div class="i_left" @click="goback">返回</div>
      <div class="i_title">
        数据图表
      </div>
      <!--<div class="i_right" v-link="{ path : '/history' }">
        今日情况
      </div>-->
    </div>
    <div class="weui_cells_title">
      每日手机使用时长（最近5日）
    </div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div class="weui_cells">
      <my-chart :options="bar" v-ref:bar theme="dark"></my-chart>
    </div>
    <div class="weui_cells_title">
      使用最多应用程序（前5名）
    </div>
    <div class="weui_cells">
      <div class="weui_cell" v-for="item in appusages">
        <div class="weui_cell_hd">
          <img :src="item.url" alt="" class="cover">
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <h3 class="title">{{item.appName}}</h3>
          <p class="summary"><label>{{item.time}}</label></p>
        </div>
        <div class="weui_cell_ft">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import mm_params from 'js/common';
  import myChart from '../Chart.vue'
  import theme from 'js/theme'

  export default {
    components: {
      myChart: myChart
    },
    data() {
      return {
        appusages:[]
      }
    },
    ready:function () {

    },
    route: {
      data ({to}){
//        this.initChartData();
        return {

        }
      }
      ,
      activate: function (transition) {
        this.getAppUsages()
        transition.next()
      },
//      deactivate: function (transition) {
//        console.log('hook-example deactivated!')
//        transition.next()
//      },
//      canActivate: function (transition) {
//        console.log('hook-example canActivate!')
//        transition.next()
//      },
//      canDeactivate: function (transition) {
//        console.log('hook-example canDeactivate!')
//        transition.next()
//      }

    },
    methods: {
      goback: function () {
        router.go({path: '/main'})
      },
      getAppUsages:function () {
        console.log("---getAppUsages---")
        let vm =this;
        let param=mm_params.getUserInfo()
        param.equipId = sessionStorage.currEquipId;
        console.log(param)
//        let param={userid: localStorage.km_UID, sign: localStorage.km_USIGN,authToken:localStorage.access_token,equipId: sessionStorage.currEquipId}
        let URL = mm_params.mobile_url + mm_params.chart_url.replace("ID", sessionStorage.currChildId).replace("METHOD", "TOP").replace("DAYCOUNT", 5);
        vm.$http.post(URL, param).then((response) => {
          console.log("getAppUsages--success-callback")
          if((response.json().status) == 200){
            for(var int = 0; int < response.json().content.length; int++) {
              var array_element = response.json().content[int];
              vm.appusages.push(array_element);
            }
            console.log("vm.appusages---")
            console.log(vm.appusages)
          }
        },(response) => {
          console.log("getAppUsages--error-callback")
        });
      }
    },
    ready: function () {

    },
    destroy: function () {
    }

  }
</script>
