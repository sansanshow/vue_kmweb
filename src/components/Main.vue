<template>
  <div>
    <div class="weui_tab_bd main_content">
      <router-view
        transition="fade"
        transition-mode='out-in'>

      </router-view>
    </div>
    <div class="m_weui_tabbar">
      <!--weui_bar_item_on-->
      <a v-link="{ path: '/main' }" class="weui_tabbar_item" id="index">
        <div class="weui_tabbar_icon">
          <img src="../../static/img/home.png" alt="">
        </div>
        <p class="weui_tabbar_label">手机管家</p>
      </a>
      <a v-link="{ path: '/main/news' }" class="weui_tabbar_item" id="news">
        <div class="weui_tabbar_icon">
          <img src="../../static/img/index/icon_nav_article.png" alt="">
        </div>
        <p class="weui_tabbar_label">教育资讯</p>
      </a>
      <a v-link="{ path: '/main/settings' }" class="weui_tabbar_item" id="settings">
        <div class="weui_tabbar_icon">
          <img src="../../static/img/settings.png" alt="">
        </div>
        <p class="weui_tabbar_label">设置</p>
      </a>
    </div>
  </div>
</template>
<script>
  import history from 'components/index/history.vue';
  import location from 'components/index/location.vue';
  import mm_params from 'js/common';
  export default{
    name: 'Main',

    components: {},
    data(){
      return {
        'name': 'sb'
      }
    },
    route: {
      activate: function (transition) {
        transition.next()
      }
    },
    init: function () {

    },
    created: function () {
      document.body.setAttribute('ontouchstart', '');
    },
    ready(){
//      document.body.setAttribute('ontouchstart', '');
//      $('.weui_tab').tab();
//            let code1 = mm_params.getCode('code',this.$route.path)
//            console.log("code--:"+code1)
//            // GET /someUrl
//            this.$http.get('http://gold.xitu.io/timeline/subscribe').then((response) => {
//                // success callback
//                console.log("main---this.$http.get()--success callback-")
//            }, (response) => {
//                // error callback
//                console.log("main---this.$http.get()--error callback-")
//            });
    },
    methods: {
      clearCache: function () {
        console.log("--clearCache---")
        localStorage.clear();
      }
    }
  }
</script>
<style>
  .v-link-active {
    color: #09BB07;
  }
</style>
