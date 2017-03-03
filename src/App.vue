<template>
  <div class="container1">
    <router-view
      transition="fade"
      transition-mode='out-in'>
    </router-view>
  </div>
</template>
<script>
  import mm_params from 'js/common';
  document.body.setAttribute('ontouchstart', '');
  export default{
    data(){
      return {}
    },
    init: function () {
      document.body.setAttribute('ontouchstart', '');
//            judge()
    },
    created: function () {
      //redirect()
    },
    ready: function () {
      judge()
      wxConfig()
    },
    route: {
      data ({to}) {
//                const page = +to.params.equipList
//                console.log("qqqqqq:"+page.childName)
//                return {
//                    equipList:[{childName:'张三s',aliasName:'iphone5'}]
//                }
      },
      activate: function (transition) {
//        this.wxConfig()
        transition.next()
      }
    },
    method: {
      initUserInfo: function () {
        if (localStorage.getItem("km_UINFO")) {
          router.go({path: '/main'})
        } else {
          this.login();
        }
      },
      login: function () {
//                let code = sessionStorage.code;
//                let loginUrl = mm_params.mobile_url + mm_params.login_url;
//                let param ={code:code};
//                this.$http.post(loginUrl,param).then((response) => {
//                    // success callback
//                    console.log("login---http.post()--success callback-")
//                router.go({ path:'/qrcode' });
//            }, (response) => {
//                    // error callback
//                    console.log("login---http.post()--error callback-")
//                });
      },

    }
  }
  function login() {
    console.log("login");
    var code = sessionStorage.code;
    let param = {code: code};
//    console.log("--login-code-:" + code)
//    console.log("--login-param-:" + param)
//    console.log("--login-url-:" + mm_params.mobile_url + mm_params.login_url)
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: mm_params.mobile_url + mm_params.login_url,
      data: param,
      async: false,
      success: function (data) {
        console.log("---login-success--:" + data.toString());
//        console.log("---login-access_token-:" + data.content.accessToken);
//        console.log("---login-openid-:" + data.openid);
//        console.log("---login-userid-:" + data.user.userid);
//        console.log("---login-Extras-:" + data.extras);
//        console.log("---login-sign-:" + data.user.sign);
//        console.log("---login-access_token-:" + data.content.accessToken);
        localStorage.setItem("km_UINFO", data.user);
        localStorage.setItem("km_UID", data.user.userid);
        localStorage.setItem("km_openid", data.openid);
        localStorage.setItem("km_USIGN", data.user.sign);
        localStorage.setItem("access_token", data.content.accessToken);
      },
      error: function () {
        //alert("请求失败！！！");
        console.log("---login-error--");

      }
    })

  }
  function redirect() {
    router.go({path: '/main/settings'})
  }
  function judge() {
    login();
    console.log("judge");
//    if(localStorage.getItem("km_UID")&&(localStorage.getItem("km_USIGN")&&(localStorage.getItem("access_token")))){
//      console.log("judge--1");
//      router.go({ path: '/main' })
//    }else {
//      login();
//      console.log("judge--2");
//      console.log("--------loginsss------");
//    }
  }
  function wxConfig() {
    console.log("---wx.confi--app.vue:");
    let path_url = window.location.href;
    let url_arr = path_url.split("#");
    console.log("wxConfig---param:url-" + url_arr[0]);
    let param = {url: url_arr[0]};
    let URL = mm_params.mobile_url + '/weixin/core/wxconfig.wx';
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: URL,
      data: param,
      async: false,
      success: function (data) {
        var status = data;
//        console.log("-------data-----");
//        console.log(data);
        var timestamp = data.timestamp;
        var nonceStr = data.nonceStr;
        var signature = data.signature;
//        console.log("-------data---end--");
        wxyz(timestamp, nonceStr, signature);
      },
      error: function () {
        //alert("请求失败！！！");
        console.log("请求失败！！！");
      }
    });
  }
  function wxyz(timestamp, nonceStr, signature) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx365c10c5232278d3', // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature,// 必填，签名，见附录1
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
      console.log("----wx.ready------")
      wx.hideAllNonBaseMenuItem();
      wx.showMenuItems({
        menuList: [
          "menuItem:share:appMessage",
          "menuItem:share:timeline"
        ]
      });
      wx.hideMenuItems({
        menuList: [
          "menuItem:share:qq",
          "menuItem:share:weiboApp",
          "menuItem:favorite",
          "menuItem:share:facebook",
          "menuItem:share:QZone",
          "menuItem:editTag",
          "menuItem:delete",
          "menuItem:readMode",
          "menuItem:share:email"
        ]
      });
      wx.onMenuShareTimeline({
        title: '苗苗手机管家',
        link: 'http://www.kidmate.cn/index.html',
        imgUrl: 'http://www.kidmate.cn/images/logo.png',
        trigger: function (res) {
//          alert('用户点击分享到朋友圈');
        },
        success: function (res) {
          //alert('已分享');
        },
        cancel: function (res) {
          //alert('已取消');
        },
        fail: function (res) {
          alert(JSON.stringify(res));
        }
      });
    });
  }
</script>

<style>
  @import 'assets/css/weui.min.css';
  @import 'assets/css/jquery-weui.min.css';
  @import 'assets/css/index.css';
  @import 'assets/css/swiper.min.css';

  .container1 {
    width: 100%;
    height: 100%;
  }
</style>
