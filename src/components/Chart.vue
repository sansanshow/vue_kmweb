<template>
  <div id="chart" class="weui_cell chart" style="width: 100%;height:200px;padding-left: 0px;">

  </div>
</template>
<script>
  import mm_params from 'js/common';
  export default{
    data(){
      return {
        dataY_avg: [],
        dataY_self: [],
        dataX: []
      }
    },
    init: function () {

    },
    created: function () {

    },
    ready: function () {
      let vm = this;
      this.initChartData();
      console.log("vm.dataX--")
      console.log(vm.dataX)
      console.log(vm.dataX)
    },
    route: {
      data ({to}){
//        this.initChartData();
      },
      activate: function (transition) {
        console.log('hook-example activated!--Chart')
        transition.next()
      }

    },
    methods: {
      initChartData: function () {
        let vm = this;
        let dataX = new Array()
        let dataY_avg = new Array()
        let dataY_self = new Array()
        let URL = mm_params.mobile_url + mm_params.chart_url.replace("ID", sessionStorage.currChildId).replace("METHOD", "CHART").replace("DAYCOUNT", 5);
        let param = mm_params.getUserInfo();
        vm.$http.post(URL, param).then((response) => {
          // success callback
          console.log("initChartData---http.post()--success callback-")
          var status = response.json().status;
          var timeStatis = response.json().content;
          console.log("-------times---end--");
          console.log(timeStatis);
          console.log("-------times---end--");
          if (status == 200) {
            for (var i = 0; i < timeStatis.length; i++) {
              dataX[i] = timeStatis[i].time;
              dataY_self[i] = timeStatis[i].selfDuration;
              dataY_avg[i] = timeStatis[i].avgDuration;
            }
            console.log("-dataX-" + dataX);
            console.log("-dataY_self-" + dataY_self);
            console.log("-dataY_avg-" + dataY_avg);
//            initChartOption(dataX, dataY_self, dataY_avg)
            this.dataX = dataX;
            this.dataY_self = dataY_self;
            this.dataY_avg = dataY_avg;
            let chart = echarts.init(vm.$el)
            let options = {
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['您的孩子', '同龄人的孩子']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dataX
                //data:dataX
              },
              yAxis: {
                type: 'value',
                axisLine: {
                  show: true
                }
              },
              series: [
                {
                  name: '您的孩子',
                  type: 'line',
                  stack: '总量',
                  data: dataY_self
                  //data:dataY_self
                },
                {
                  name: '同龄人的孩子',
                  type: 'line',
                  stack: '总量',
                  data: dataY_avg
                }
              ]
            }
            chart.setOption(options)
          } else {
            $.weui.topTips('请求失败400！');
          }
        }, (response) => {
          // error callback
          console.log("initChartData---http.post()--error callback-")
        });
//        if(status_g == 200){
//          this.dataX = dataX;
//          this.dataY_self = dataY_self;
//          this.dataY_avg = dataY_avg;
//        }
      }
    }

  }
</script>
<style>
  .chart {
    width: 100%;
    height: 200px;
    padding-left: 0px;
  }

</style>
