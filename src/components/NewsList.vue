<template>
  <div class="container" style="padding-bottom: 5px;">
    <div class="i_header">
      <div v-if="goBack" class="i_left" onclick="iGoback()">返回</div>
      <div v-else class="i_left_none"></div>
      <div class="i_title">
        教育资讯
      </div>
    </div>
    <!--<div class="weui_cells">-->
    <!--<template v-for="item in newsList">-->
    <!--<div class="weui_cell" v-link="'/html?type=1&url='+ item.link">-->
    <!--<div class="weui_cell_bd weui_cell_primary">-->
    <!--<h3 class="title">{{item.title}}</h3>-->
    <!--<p class="summary" style="-webkit-line-clamp: 3;">{{item.description}}</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</template>-->
    <!--</div>-->
    <div class="weui_panel weui_panel_access">
      <div class="weui_panel_bd">
        <template v-for="item in newsList">
          <div class="weui_media_box weui_media_text" v-link="'/html?type=1&url='+ item.link">
            <h4 class="weui_media_title">{{item.title}}</h4>
            <p class="weui_media_desc">{{item.description}}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import mm_params from 'js/common';
  export default {
    name: 'NewsList',

    components: {},
    data () {
      return {
        goBack: false,
        newsList: []
      }
    },
    ready: function () {
      this.loadData()
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
      loadData: function () {
        console.log("newslist---loaddata-")
        $.showLoading("加载中");
        let vm = this;
//        let URL = mm_params.mobile_url + mm_params.rss_ser_url;
//        let URL = mm_params.rss_json_url;
        let URL = mm_params.rss_url;
        setTimeout(function () {
          $.hideLoading();
        }, 2000)
        vm.$http.jsonp(URL).then((response) => {
          $.hideLoading();
          console.log("newslist---http.post()--success callback-")
          if (response.json().status == 'ok') {
            vm.newsList = response.json().items;
//            console.log(vm.newsList);
          } else {
            $.toast("数据异常", "cancel");
            $.hideLoading();
          }
//          console.log("newslist---http.post()--success callback-")
//          let data = response.json()
//          console.log(response.json())
//          if (data.status == 200) {
//            $.hideLoading();
//            let channel = JSON.parse(data.content).rss.channel;
//            console.log(channel)
//            vm.newsList = channel[0].item;
//          } else {
//            $.toast("数据异常", "cancel");
//            $.hideLoading();
//          }
        }, (response)=> {
          console.log("newslist---http.post()--error callback-")
          $.hideLoading();
          $.toast("加载失败", "forbidden")
        })
      },
      detail: function (url) {
        console.log("url--" + url)
//        router.go({ name: 'detail'})
      },
      cancelLoading: function () {
        $.hideLoading();
      }
    },
    watch: {
      newsList: {
        handler: function (newVal, oldVal) {
          console.log("-news watch-newsList_1--NewVal:" + newVal + ",oldVal:" + oldVal)
        },
        deep: true
      }
    }

  }


</script>
