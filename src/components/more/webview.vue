<template>
  <div class="container" style="height: 100%;display: flex;flex-direction: column;position: absolute">
    <div class="i_header" style="height: 50px">
      <div class="i_left" @click="goback(type)">返回</div>
      <div class="i_title">
        {{title}}
      </div>
    </div>
    <iframe style="flex: 1;border: 0px;width:100%;height:auto;" :src="url">

    </iframe>
  </div>
</template>
<script>
  import mm_params from 'js/common';
  export default{
    data(){
      return {
        url: this.$route.query.url,
        title: '',
        type: 1
      }
    },
    route: {
      activate: function (transition) {
        let vm =this;
        console.log("--route-path:" + this.$route.path)
        this.url = vm.$route.query.url;
        this.type = vm.$route.query.type
        if ((vm.$route.query.type) == 32) {
          vm.title = '使用帮助'
          vm.url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kidmate.parent'
        }
        console.log("this.url:" + this.url)
        console.log("this.$route.query.url:" + this.$route.query.url)
        transition.next()
      }
    },
    methods: {
      goback: function (type) {
        if (type == 1) {
          router.go({path: '/main/news'})
        } else if (type == 2) {
          router.go({path: '/main/settings'})
        } else if (type == 31 || type == 32 ) {
          router.go({path: '/main'})
        }
      }
    }
  }
</script>
