<template>
  <div class="container">
    <div class="i_header">
      <div class="i_left" @click="goback">返回</div>
      <div class="i_title">
        允许使用的应用程序
      </div>
    </div>
    <div class="weui_cells">
      <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
          全选
        </div>
        <div class="weui_cell_ft">
          <input id="chkAll" class="weui_switch" type="checkbox" @click="selectAll">
        </div>
      </div>
      <template v-for="item in appInfos">
        <div class="weui_cell">
          <div class="weui_cell_hd">
            <img :src="item.url" alt="" class="cover">
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <h3>{{item.name}}</h3>
          </div>
          <div class="weui_cell_ft">
            <label v-if="item.statusType == 100">禁止</label>
            <input v-if="item.statusType == 200" name="chk_item" @click="checkIsAllchecked" class="weui_switch chk_item" type="checkbox" :value="item.id" checked>
            <input v-if="item.statusType == 300" name="chk_item" @click="checkIsAllchecked" class="weui_switch chk_item" type="checkbox" :value="item.id">
          </div>
        </div>
      </template>
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
        ruleid: sessionStorage.km_edit_ruleId,
        except: sessionStorage.km_edit_rule_except,
        appInfos:[],
        chkAll:0,
        AllChkNum:0
      }
    },
    components: {},
    created: function () {

    },
    ready: function () {
      console.log("-----alloeApps-----")
      let vm = this;
      this.getAppsList()
      console.log(vm.except)
      console.log(vm.ruleid)
    },
    route: {
      data ({to}){

      },
      activate: function (transition) {
        transition.next()
      }
    },
    methods: {
      goback: function () {
        let rid = sessionStorage.km_edit_ruleId
        let index = sessionStorage.km_edit_index
        router.go({path: '/setdetail?r_id=-1&r_index=' + index})
        let exceptnum = 0;
        let adIds = "";
        $("input:checkbox[name=chk_item]:checked").each(function(i) {
          if(0==i){
            adIds = $(this).val();
          }else{
            adIds += (","+$(this).val());
          }
          exceptnum++;
        });
        console.log("-------goback-------exceptapp--------")
        let item = JSON.parse(sessionStorage.km_edit_rule)
        item.exceptapp = adIds
        item.exceptnum = exceptnum
        console.log(adIds)
        console.log(exceptnum)
        sessionStorage.setItem("km_edit_rule",JSON.stringify(item));
        sessionStorage.setItem("km_edit_rule_except",adIds);
      },
      selectAll: function () {
        if ($("#chkAll").prop("checked")) {
          console.log($("#chkAll").prop("checked"));
          $(".chk_item").prop("checked",true)

        } else {
          console.log($("#chkAll").prop("checked"))
          $(".chk_item").prop("checked",false)
        }
        var adIds;
        $("input:checkbox[name=chk_item]:checked").each(function(i) {
          if(0==i){
            adIds = $(this).val();
          }else{
            adIds += (","+$(this).val());
          }
          console.log(adIds)
        });
      },
      getAppsList: function () {
        let vm = this;
        let param = mm_params.getUserInfo();
        console.log("----ruleid--")
        console.log(sessionStorage.km_edit_ruleId)
        param.except=vm.except;
        console.log("0------getAppsList-----")
        console.log(param.except)
        console.log("1------getAppsList-----")
        let URL = mm_params.mobile_url + mm_params.allow_apps_url.replace("EID", sessionStorage.currEquipId).replace('RID', sessionStorage.km_edit_ruleId);
        vm.$http.post(URL, param).then((response) => {
          console.log("---getAppsList-----success callback-")
          let data = response.json()
          if (data.status == 200) {
//            console.log(JSON.stringify(data.content))
            vm.appInfos = data.content
            //判断是否全选
            vm.AllChkNum = parseInt(data.extras);
            if(data.type == 100){
              $("#chkAll").prop("checked",true)
            }
          } else {
            console.log("---getAppsList-----success callback- 400")
          }
        }, (response) => {
          console.log("---getAppsList-----ERROR callback-")
        });

      },
      checkIsAllchecked:function () {
        let vm = this;
        $("input:checkbox[name=chk_item]").click(function() {
          console.log("vm.AllChkNum==="+vm.AllChkNum)
          if($("input[name='chk_item']:checked").length == vm.AllChkNum){
            $("#chkAll").prop("checked",true)
          }else {
            $("#chkAll").prop("checked",false)
          }
        });
      }
    }
  }
</script>
