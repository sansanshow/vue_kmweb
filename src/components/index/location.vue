<template>
  <div class="container" style="height: 100%">
    <div class="i_header">
      <div class="i_left" @click="goback">返回</div>
      <div class="i_title">
        定位查看
      </div>
    </div>
    <map class="map" :longitude="longitude" :latitude="latitude" :zoom="10"></map>

  </div>
</template>
<script>
  import mm_params from 'js/common';
  import Map from '../Map.vue'
  export default{
    name: 'Location',

    components: {
      Map
    },
    init: function () {
    },
    created: function () {

    },
    ready: function () {
      this.testmm()
    },
    data(){
      return {
        longitude: 4.0,
        latitude: 5.0
      }
    },
    route: {
      data ({to}){
        return
        {

        }
      },
      activate: function (transition) {
        this.getLocation()
        transition.next()
      }
    },
    methods: {
      goback: function () {
        router.go({path: '/main'})
      },
      testmm: function () {
        console.log("--测试调用--")
      },
      getLocation: function () {
        let vm = this;
        let param = mm_params.getUserInfo();
        let URL = mm_params.location_url.replace("EQUIP_ID", sessionStorage.currEquipId)
        vm.$http.post(mm_params.mobile_url + URL, param).then((response) => {
          console.log("--loadHistory--success-");
          // get status
          console.log(response.status);
          console.log(response.json());
          if (response.json().status == 200) {
            console.log("lon:" + response.json().content.longitude)
            console.log("lat:" + response.json().content.latitude)
            vm.longitude = response.json().content.longitude
            vm.latitude = response.json().content.latitude
            console.log("this.longitude：" + vm.longitude)
            console.log("this.latitude：" + vm.latitude)
          } else {
            alert("定位数据异常");
          }
        }, (response) => {
          // error callback
          alert("定位获取失败");
          console.log('--loadHistory--error-response:' + response);
        });
      }
    }
  }
</script>
<style>
  .map {
    width: 100%;
    min-height: 100%;
    height: 100%;
  }
</style>
