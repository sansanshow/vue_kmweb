let mm_params = {
  devlop: true,
  timer: null,
  lockTimer: null,
  // mobile_url: "http://t.kidmate.cn/kidmatemobile",
  // page_url: "http://t.kidmate.cn/kmwxweb",
  mobile_url: "https://i.kidmate.cn",
  page_url: "https://i.kidmate.cn/kmwxweb",
  login_url: "/weixin/user/login.wx",
  help_url:  'https://www.kidmate.cn/faq.html',
  download_url:  'http://a.app.qq.com/o/simple.jsp?pkgname=com.kidmate.parent',
  location_url: "/weixin/equip/location.wx/EQUIP_ID",
  add_child_url: "/weixin/child/child.wx/add",
  qrcode_url: "/weixin/child/qrcode.wx/PID/CID",
  // get openid,token,refresh_token
  USER_INFO: "https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN",
  history_url: "/weixin/equip/appusage.wx/ID/PAGE/SIZE/TYPE",
  chart_url: "/weixin/child/child.wx/ID/METHOD/DAYCOUNT",
  rss_url: "https://rss2json.com/api.json?rss_url=http%3A%2F%2Fimg.baobeizn.com%2Fkidmate%2F2026feed.xml",
  rss_json_url: "http://img.baobeizn.com/kidmate/2026feed.txt",
  rss_ser_url: "/weixin/user/rss.wx",
  lock_url: "/weixin/equip/lock.wx/CID/EID/LOCK",
  init_lock_url: "/weixin/equip/lock.wx/init/CID/EID",
  judge_lock_url: "/weixin/equip/lock.wx/status/CID/EID",
  del_equip_url: '/weixin/equip/delete.wx/CID/EID',
  rule_url: '/weixin/equip/rule.wx/get/TYPE/CID/EID',
  rule_on_url: '/weixin/equip/rule.wx/status/RID/STATUS',
  //{childid}/{equipid}/{ruletype}
  rule_save_url: '/weixin/equip/rule.wx/save/CID/EID/TYPE',
  allow_apps_url: '/weixin/equip/rule.wx/allow/EID/RID',
  snapshot_url: '/weixin/equip/snapshot.wx/EID',
  snapshot_list_url: '/weixin/equip/snapshot.wx/list/EID/SIZE/PAGE',
  instance: {},
  //控制开关
  timeLimit:true,

  //获取url中的参数
  getUrlParam: function (name) {
    //var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null)
      return decodeURI(r[2]);
    return null; //返回参数值
  },
  //获取url中的参数
  getCode: function (name, str) {
    //var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = str.search.substr(1).match(reg); //匹配目标参数
    if (r != null)
      return unescape(r[2]);
    return null; //返回参数值
  },

  getAccessToken: function () {
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: mm_params.mobile_url + mm_params.login_url,
      data: param,
      async: false,
      success: function (data) {
        console.log("---login-success--");
      },
      error: function () {
        //alert("请求失败！！！");
        console.log("---login-error--");

      }
    })
  },
  getUserInfo: function (ischeck) {
    var param;
    if (ischeck == 1) {
      param = {userid: localStorage.km_UID, sign: localStorage.km_USIGN, authToken: localStorage.access_token};
      console.log("----getSignUser-- ischeck--userid:" + param.userid);
    } else {
      if (localStorage.hasEquip == 0) {
        param = {userid: 2000, sign: '2000', authToken: '2000'};
        // sessionStorage.currEquipId = 2000
        // sessionStorage.currChildId = 2000
        console.log("----getSignUser-- not hasEquip--userid:" + param.userid);
      } else {
        param = {userid: localStorage.km_UID, sign: localStorage.km_USIGN, authToken: localStorage.access_token};
        console.log("----getSignUser-- hasEquip--userid:" + param.userid);

      }
    }

    return param;
  },
  computeHHMM: function (millisecond) {
    var datMill =new Date("2000/01/01 00:00:00").getTime()+millisecond;
    var date = new Date();
    date.setTime(datMill);
    var hh = date.getHours();
    var mm = date.getMinutes();
    return [hh,mm];
  },
  nosupport: function (type) {
    if (type == 1) {//演示数据
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
};
export default mm_params;


