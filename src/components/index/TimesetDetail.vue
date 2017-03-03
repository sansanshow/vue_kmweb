<template>
  <div class="container">
    <div class="i_header">
      <div class="i_left" @click="goback">取消</div>
      <div class="i_title">
        编辑时段
      </div>
      <div class="i_right" @click="saveRule">
        保存
      </div>
    </div>
    <div class="weui_cells">
      <div class="weui_cell">
        <div class="weui_cell_hd">
          <label class="weui_label">名称</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <input class="weui_input" v-model="ruleName" :value="edit_rule.controlname" @click="closeWeek" type="text" placeholder="学习时间">
        </div>
      </div>
    </div>
    <div class="weui_cells">
      <div class="weui_cell weui_cell_select cell-padding">
        <div class="weui_cell_hd">
          <label class="weui_label">开始时间</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <input id="start" v-model="start" :value="edit_rule.start" class="weui_input" @click="closeWeek" type="time" placeholder="请选择">
        </div>
      </div>
      <div class="weui_cell weui_cell_select cell-padding">
        <div class="weui_cell_hd">
          <label class="weui_label">结束时间</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <input id="end" v-model="end" :value="edit_rule.end" class="weui_input" @click="closeWeek" type="time" placeholder="请选择">
        </div>
      </div>
      <div class="weui_cell weui_cell_select cell-padding">
        <div class="weui_cell_hd">
          <label class="weui_label">重复</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <input style="font-size:12px" id="repeat" v-model="repeat" :value="edit_rule.repeat" class="weui_input"
                 size="8px" type="text" :data-values="edit_rule.repeatValue" placeholder="请选择">
        </div>
      </div>
    </div>
    <div class="weui_cells">
      <div class="weui_cell weui_cell_select cell-padding" v-link="{ path:'/allow' }" @click="closeWeek">
        <div class="weui_cell_hd weui_cell_primary">
          <label>允许使用的应用程序</label>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <label style="margin-left:5px;" class="weui_label">{{edit_rule.exceptnum}}个</label>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .cell-padding {
    padding: 10px 15px;
  }
</style>
<script>
  import mm_params from 'js/common';
  import AllowApps from './allowApps.vue'
  export default{
    data(){
      return {
        index: this.$route.query.r_index,
        ruleid: this.$route.query.r_id,
        except: '',
        item: {},
        ruleName: '',
        start: '',
        end: '',
        repeat: '',
        repeatValue: '',
        on: true,
        edit_rule: {id: 0}
      }
    },
    created: function () {
      router.on('/allow', {
        component: AllowApps
      })
    },
    ready: function () {
      let vm = this;
      vm.initData();
      $("#repeat").select({
        title: "重复",
        multi: true,
        items: [
          {
            title: "周一",
            value: 1
          },
          {
            title: "周二",
            value: 2
          },
          {
            title: "周三",
            value: 3
          },
          {
            title: "周四",
            value: 4
          },
          {
            title: "周五",
            value: 5
          },
          {
            title: "周六",
            value: 6
          },
          {
            title: "周日",
            value: 7
          }
        ],
        onOpen: function () {
          console.log("----onOpen----")
          console.log($("#repeat").attr("data-values"))
        },
        onClose: function () {
//          vm.repeat =
          console.log("----onClose-1111---")
          console.log($("#repeat").attr("data-values"))
          console.log("----onClose---ssss-")
          vm.repeatValue = $("#repeat").attr("data-values")
          console.log(vm.repeatValue)
        }
      });
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
      goback: function () {
        router.go({path: '/timeset'})
      },
      initData: function () {
        console.log("--timeSetDetail--initData--")
        let vm = this;
        if (parseInt(vm.index) >= 0 && vm.ruleid > 2000) {
          console.log("----detail------0000")
//          vm.item = sessionStorage.km_rule_timeset[vm.index];
          console.log("---vm.item--yes")
          console.log("---vm.item--yes--index:" + vm.index)
          let str = sessionStorage.km_rule_timeset;
          let set_arr = JSON.parse(str);
          console.log("=========");
          console.log(set_arr[0].controlname);
          let timeset = set_arr[vm.index];
          //初始化参数
          vm.edit_rule = timeset;
          sessionStorage.setItem("km_edit_rule", JSON.stringify(vm.edit_rule));
          vm.ruleName = timeset.controlname;
          vm.start = timeset.start
          vm.end = timeset.end
          vm.repeat = timeset.repeat
          vm.repeatValue = timeset.repeatValue
          vm.ruleid = timeset.id
          vm.except = timeset.exceptapp
          console.log("--timeset.except11111-" + timeset.exceptapp)
          vm.on = timeset.on
          sessionStorage.setItem("km_edit_ruleId", timeset.id);
          sessionStorage.setItem("km_edit_index", vm.index);
          if (typeof(timeset.exceptapp) == 'undefined') {
            console.log("vm.except--undefined--")
            vm.except = ''
          } else {
            vm.except = timeset.exceptapp
            console.log("vm.except" + vm.except)
          }
          sessionStorage.setItem("km_edit_rule_except", vm.except);
        } else if (parseInt(vm.ruleid) == -1) {
          console.log("----detail------1111")
          sessionStorage.setItem("km_edit_ruleId", 0);
          sessionStorage.setItem("km_edit_rule_except", '');
          sessionStorage.setItem("km_edit_index", -1);
          console.log("---vm.item--no")
          let timeset = JSON.parse(sessionStorage.km_edit_rule)
          vm.edit_rule = timeset
          vm.ruleName = timeset.controlname;
          vm.start = timeset.start
          vm.end = timeset.end
          vm.repeat = timeset.repeat
          vm.repeatValue = timeset.repeatValue
          vm.ruleid = timeset.id
          vm.except = timeset.exceptapp
          console.log("--timeset.except222222-" + timeset.exceptapp)
          vm.on = timeset.on
          sessionStorage.setItem("km_edit_ruleId", timeset.id);
          sessionStorage.setItem("km_edit_index", vm.index);
          sessionStorage.setItem("km_edit_rule_except", vm.index);
          if (typeof(timeset.exceptapp) == 'undefined') {
            console.log("vm.except--undefined--")
            vm.except = ''
          } else {
            vm.except = timeset.exceptapp
            console.log("vm.except" + vm.except)
          }
          sessionStorage.setItem("km_edit_rule_except", vm.except);
        } else if (parseInt(vm.ruleid) == -2) {
          console.log("----detail------2222")
          let vm = this;
          let timeset = {id: "", start: "10:00", end: "14:00", exceptapp: '', exceptnum: 0, on: "true"}
          sessionStorage.setItem("km_edit_rule", JSON.stringify(timeset))
          vm.repeatValue = $("#repeat").attr("data-values")
          vm.edit_rule = timeset
          vm.start = timeset.start
          vm.end = timeset.end
          vm.except = timeset.exceptapp
          sessionStorage.setItem("km_edit_rule_except", vm.except);
        } else {
          console.log("----detail------3333")
        }
      },
      saveRule: function () {
        let vm = this;
        let param = mm_params.getUserInfo();
        if (param.userid == 2000) {
          mm_params.nosupport(1)
        } else {
          $.showLoading("正在保存");
          let URL = mm_params.mobile_url + mm_params.rule_save_url.replace("TYPE", 0).replace('CID', sessionStorage.currChildId).replace('EID', sessionStorage.currEquipId);
          console.log("------ruleName---");
          console.log(vm.ruleName);
          console.log("------start---");
          console.log(vm.start);
          console.log("------end---");
          console.log(vm.end);
          console.log("------repeat---");
          console.log(vm.repeat);
          let saveRule = JSON.parse(sessionStorage.km_edit_rule)
          //---------------
//        param.ruleid = vm.ruleid
//        param.start = vm.start
//        param.end = vm.end
//        param.ruleName = vm.ruleName
//        param.on = vm.on;
          //-------------------------
          param.ruleid = saveRule.id
          param.start = saveRule.start
          param.end = saveRule.end
          param.ruleName = saveRule.controlname
          param.on = saveRule.on;
          param.exceptapp = saveRule.exceptapp;
          let dataOk = true;
          //---------------------

          //规则名
          if (saveRule.controlname == '' || typeof(saveRule.controlname) == 'undefined' || saveRule.controlname.length == 0) {
            $.hideLoading();
//          $.toptip('规则名不能为空', 'error');
            $.alert('规则名不能为空', '提示');
            dataOk = false
            return false;
            console.log("----dataOk--controlname-false")

          }
          //开始时间
          if ((vm.start) == '' || typeof(vm.start) == 'undefined' || vm.start.length == 0) {
            $.hideLoading();
//          $.toptip('请选择重复', 'error');
            $.alert('请选择开始时间', '提示');
            dataOk = false
            console.log("----dataOk--repeatValue-false")
            return false;
          }
          //结束时间
          if ((vm.end) == '' || typeof(vm.end) == 'undefined' || vm.end.length == 0) {
            $.hideLoading();
//          $.toptip('请选择重复', 'error');
            $.alert('请选择结束时间', '提示');
            dataOk = false
            console.log("----dataOk--repeatValue-false")
            return false;
          }
          //重复
          if ((vm.repeatValue) == '' || typeof(vm.repeatValue) == 'undefined' || vm.repeatValue.length == 0) {
            $.hideLoading();
//          $.toptip('请选择重复', 'error');
            $.alert('请选择重复', '提示');
            dataOk = false
            console.log("----dataOk--repeatValue-false")
            return false;
          } else {
            let arr = vm.repeatValue.split(",");
            let repeatVal = 0;
            for (let i = 0; i < arr.length; i++) {
              let index = parseInt(arr[i])
              console.log("------repeatVal-for--" + index);
              console.log(Math.pow(2, index - 1));
              repeatVal += Math.pow(2, index - 1);
              console.log(repeatVal)
            }
            console.log("------repeatVal---");
            console.log(repeatVal)
            //--------old-------------
//        param.repeat = repeatVal;
            param.repeatType = repeatVal;
          }




          if (dataOk == true) {
            vm.$http.post(URL, param).then((response) => {
              console.log("---saveRule-----success callback-")
              let data = response.json()
              if (data.status == 200) {
                $.hideLoading();
                $.toast("保存成功");
                //清除缓存---
                sessionStorage.removeItem("km_edit_ruleId")
                sessionStorage.removeItem("km_edit_rule_except")
                sessionStorage.removeItem("km_edit_index")
                sessionStorage.removeItem("km_edit_rule")
                router.go({path: '/timeset'})
              } else {
                $.toast("修改失败", "cancel");
                $.hideLoading();

              }
            }, (response) => {
              console.log("---saveRule-----err callback-")
              $.toast("操作失败", "forbidden");
              $.hideLoading();
            });
          }
        }
      },
      closeWeek:function () {
        $("#repeat").select("close")
      }
    },
    watch: {
      edit_rule: {
        handler: function (newVal, oldVal) {
          let vm = this
          console.log("edit_rule--change")
          console.log(JSON.stringify(newVal));
          vm.edit_rule = newVal;
        },
        deep: true
      },
      ruleName: {
        handler: function (newVal, oldVal) {
          console.log("ruleName--change")
          console.log(newVal);
          let item = JSON.parse(sessionStorage.km_edit_rule)
          item.controlname = newVal
          console.log(item)
          sessionStorage.setItem("km_edit_rule", JSON.stringify(item));
        },
        deep: true
      },
      start: {
        handler: function (newVal, oldVal) {
          console.log("start--change")
          console.log(newVal);
          let item = JSON.parse(sessionStorage.km_edit_rule)
          item.start = newVal
          console.log(item)
          sessionStorage.setItem("km_edit_rule", JSON.stringify(item));
        },
        deep: true
      },
      end: {
        handler: function (newVal, oldVal) {
          console.log("ruleName--change")
          console.log(newVal);
          let item = JSON.parse(sessionStorage.km_edit_rule)
          item.end = newVal
          console.log(item)
          sessionStorage.setItem("km_edit_rule", JSON.stringify(item));
        },
        deep: true
      },
      repeatValue: {
        handler: function (newVal, oldVal) {
          console.log("repeatValue--change")
          console.log(newVal);
          let vm = this;
          vm.repeatValue = $("#repeat").attr("data-values")
          console.log(vm.repeatValue)
          console.log(newVal);
          let item = JSON.parse(sessionStorage.km_edit_rule)
          item.repeatValue = newVal
          sessionStorage.setItem("km_edit_rule", JSON.stringify(item));
        },
        deep: true
      },
      repeat: {
        handler: function (newVal, oldVal) {
          console.log("repeat--change")
          console.log(newVal);
          let vm = this;
          vm.repeat = $("#repeat").attr("value")
          console.log(vm.repeat)
          console.log(newVal);
          let item = JSON.parse(sessionStorage.km_edit_rule)
          item.repeat = newVal
          sessionStorage.setItem("km_edit_rule", JSON.stringify(item));
        },
        deep: true
      },
      on: {
        handler: function (newVal, oldVal) {
          console.log("--on--change")
          console.log(newVal);
          let vm = this;
          let item = JSON.parse(sessionStorage.km_edit_rule)
          item.on = newVal
          console.log(item)
          sessionStorage.setItem("km_edit_rule", JSON.stringify(item));

        },
        deep: true
      }
    },
    components: {}
  }
</script>
