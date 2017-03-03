<template>
  <div class="weui_cell">
    <div class="weui_cell_bd weui_cell_primary" align="center" id="code">

    </div>
  </div>
</template>
<script>
  import mm_params from 'js/common';
  export default{
    name: 'Qrcode',
    props: ['codestr'],
    components: {},
    data(){
      return {
        qr_info:this.codestr
      }
    },
    created: function () {

    },
    ready: function () {
      let code_str = this.codestr;
      console.log("qrcode--"+code_str)
      $("#code").empty();
      $('#code').qrcode({
        render: "table",
        width: 200,
        height: 200,
        text: code_str
      });
    },
    methods: {
      goback: function (path) {
        router.go(path)
      },
      refreshImg:function (codeinfo) {
        let code_str = codeinfo;
        console.log("refreshImg--"+code_str)
        $("#code").empty();
        $('#code').qrcode({
          render: "table",
          width: 200,
          height: 200,
          text: code_str
        });
      }
    },
    watch:{
      bindcode: {
        handler:function(newVal,oldVal){
          console.log("changed-qr_info_newVal:"+newVal);
          console.log("changed-qr_info_oldVal:"+oldVal);
          this.$method.refreshImg(newVal);
        },
        deep:true
      }
    }
  }


</script>
<style>

</style>
