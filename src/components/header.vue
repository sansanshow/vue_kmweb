<template>
  <div class="i_header">
    <div class="i_left" @click="goback">{{LeftText}}</div>
    <div class="i_title">
      {{title}}
    </div>
    <div class="i_right">
      {{RightText}}
    </div>
  </div>
</template>
<style>

</style>
<script>
  import mm_params from 'js/common';
  export default{
    data(){
      return {
        LeftText: '返回',
        title: '',
        RightText: '',
        LinkUrl: ''
      }
    }, method: {
      goback: function () {
        router.go()
      }
    }

  }
</script>
