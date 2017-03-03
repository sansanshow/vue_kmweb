import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

//引入组件
import App from './App.vue';
import Index from './components/Index';
import History from './components/index/history.vue';
import Location from './components/index/location.vue';
import Main from './components/Main.vue';
import NewsList from './components/NewsList.vue';
import Settings from './components/Settings.vue';
import AddChild from './components/more/addChild.vue';
import DataReport from './components/index/dataReport.vue';
import WebView from './components/more/webview.vue';
import TimeSet from './components/index/TimeSet.vue';
import TimesetDetail from './components/index/TimesetDetail.vue';
import SnapShot from './components/index/SnapShot.vue';
import TimeLimit from './components/index/TimeLimit.vue';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.devtools = true
// Vue.directive('echarts', require('https://cdnjs.cloudflare.com/ajax/libs/echarts/3.2.3/echarts.js'));
Vue.http.options.root = '/root';
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
Vue.http.options.emulateJSON = true;

var app=Vue.extend(App);
var router=new VueRouter({
  history: false,
  linkActiveClass: 'active'
});

//配置路由
router.map({
  '/home': {
    component: Main
  },
  '/main': {
    component: Main,
    subRoutes: {
      '/': {
        component: Index

      },
      '/news': {
        history:false,
        component: NewsList
      },
      '/settings': {
        component: Settings
      }
    }
  },
  '/location': {
    component: Location
  },
  '/history': {
    component: History
  },
  '/addchild':{
    component: AddChild
  },
  'datareport':{
    component: DataReport
  },
  '/html': {
    component: WebView
  },
  '/timeset': {
    component: TimeSet
  },
  '/setdetail': {
    component: TimesetDetail
  },
  '/snapshot': {
    component: SnapShot
  },
  '/timelimit': {
    component: TimeLimit
  }
});

//设置默认情况下打开的页面
router.redirect({
  '/':'main'
});
router.start(app,'#app');
//暴露路由接口调试
window.router = router;
