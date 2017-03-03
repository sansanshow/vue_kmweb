<template>
  <div class="container">
    <div class="i_header">
      <div class="i_left" @click="goback">返回</div>
      <div class="i_title">
        截屏
      </div>
      <div class="i_right" @click="snapShot">
        立即截屏
      </div>
    </div>
    <div class="main">
      <div class="weui-pull-to-refresh-layer">
        <div class="pull-to-refresh-arrow"></div> <!-- 上下拉动的时候显示的箭头 -->
        <div class="pull-to-refresh-preloader"></div> <!-- 正在刷新的* -->
        <div class="down">下拉刷新</div><!-- 下拉过程显示的文案 -->
        <div class="up">释放刷新</div><!-- 下拉超过50px显示的文案 -->
        <div class="refresh">正在刷新...</div><!-- 正在刷新时显示的文案 -->
      </div>
      <div class="weui_grids">
        <div class="weui_grid i_grid" v-for="item in snapList" @click="scanImage($index)">
          <img class="small_img" :src="snapList[$index].url" alt="">
        </div>
      </div>
      <div class="weui_cells">
        <div class="weui_cell">
          <div v-if="footer_show" class="weui_cell_bd weui_cell_primary" @click="loadmore()">
            <p align="center">加载更多</p>
          </div>

          <div v-else class="weui_cell_bd weui_cell_primary">
            <p align="center">已全部加载</p>
          </div>
        </div>
      </div>
      <!--<div class="weui-infinite-scroll">-->
      <!--<div class="infinite-preloader"></div>-->
      <!--正在加载...-->
      <!--</div>-->
    </div>
  </div>
</template>
<style>
  .small_img {
    width: 100%;
    height: 140px;
  }

  .i_grid {
    padding: 2px;
  }

  .i_grids {
    width: 100%;
    height: 100%;
  }
</style>
<script>
  import mm_params from 'js/common'
  export default{
    data(){
      return {
        img_url: 'http://tpic.home.news.cn/xhCloudNewsPic/xhpic1501/M06/23/24/wKhTlVfGjmuEW0rbAAAAADcO2D8123.jpg',
        loading: false,
        footer_show: true,
        page: 1,
        imageList: [],
//        pb: $.photoBrowser({
//          items: []
//        }),
        snapList: []
      }
    },
    components: {},
    init: function () {

    },
    created: function () {

    },
    ready: function () {
      let vm = this;
      vm.loadData(1);
      $('.main').pullToRefresh();
      $('.main').on("pull-to-refresh", function () {
        console.log("---pull-to-refresh---444")
        vm.loadData(1);
        vm.page = 1
        vm.footer_show = true
      });
    },
    route: {
      data ({to}){
        return {}
      },
      activate: function (transition) {
        transition.next()
      }
    },
    methods: {
      goback: function () {
        router.go({path: '/main'})
        this.pb.close();
      },
      snapShot: function () {
        let vm = this;
        let param = mm_params.getUserInfo();
        if (param.userid == 2000) {
          $('.main').pullToRefreshDone();
          mm_params.nosupport(1)
        } else {
          $.showLoading("发送请求中");
          let URL = mm_params.mobile_url + mm_params.snapshot_url.replace('EID', sessionStorage.currEquipId);
          vm.$http.post(URL, param).then((response) => {
            console.log("---snapShot-----success callback-")
            let data = response.json()
            if (data.status == 200) {
              $.hideLoading();
              $.toast("截屏请求成功");
            } else {
              $.toast("截屏请求失败", "cancel");
              $.hideLoading();
            }
          }, (response) => {
            console.log("---snapShot-----ERROR callback-")
            $.hideLoading();
            $.toast("截屏异常", "forbidden")
          });
        }
      },
      loadmore: function () {
        let vm = this;
        vm.page++
        this.loadData(vm.page);
      },
      loadData: function (page) {
        console.log("---loadData----")
        let vm = this;
        let pageSize = 9;
        let param = mm_params.getUserInfo();
        if (param.userid == 2000) {
          mm_params.nosupport(1)
        } else {
          let URL = mm_params.mobile_url + mm_params.snapshot_list_url.replace('EID', sessionStorage.currEquipId).replace("PAGE", page).replace('SIZE', pageSize);
          vm.$http.post(URL, param).then((response) => {
            console.log("---loadData-----success callback-")
            let data = response.json()
            if (data.status == 200) {
              if (page == 1) {
                console.log("page====1");
                vm.snapList = data.content;
              } else {
                console.log("page   --大于--1--" + page);
                for (var int = 0; int < data.content.length; int++) {
                  var array_element = data.content[int];
                  vm.snapList.push(array_element);
                }
              }
              if (data.content.length < pageSize) {
                vm.footer_show = false;
              }
            } else {
              $.toast("列表获取失败", "cancel");
            }
            $('.main').pullToRefreshDone();
          }, (response) => {
            console.log("---loadData-----ERROR callback-")
            $('.main').pullToRefreshDone();
            $.toast("服务器异常", "forbidden")
          });
        }
      },
      scanImage: function (index) {
//        let vm = this;
//        vm.imageList = [];
//        var imgArr =new Array();
//        for (var imgL = 0; imgL < vm.snapList.length; imgL++) {
//          var array_element = vm.snapList[imgL];
//          vm.imageList.push(array_element.url);
//          imgArr.push(array_element.url);
//        }
//        let pd = $.photoBrowser({
//          items: imgArr,
//          initIndex:index
//        })
//        pd.open()
      }
    }
  }
</script>
