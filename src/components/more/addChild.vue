<template>
  <div class="container">
    <div class="i_header">
      <div class="i_left" @click="goback()">返回</div>
      <div class="i_title">
        孩子资料
      </div>
    </div>
    <form>
      <div class="weui_cells weui_cells_form">
        <div class="weui_cell">
          <div class="weui_cell_hd">
            <label class="weui_label">姓名</label>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <input name="name" v-model="child_name" class="weui_input" type="text" placeholder="孩子姓名" maxlength="12"/>
          </div>
        </div>
        <div class="weui_cell weui_cell_select">
          <div class="weui_cell_hd">
            <div class="weui_label" style="padding-left: 15px;">性别</div>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <select v-model="child_gender" name="gender" class="weui_select">
              <option value="1">男</option>
              <option value="0">女</option>
            </select>
          </div>
        </div>
        <div class="weui_cell">
          <div class="weui_cell_hd">
            <label class="weui_label">生日</label>
          </div>
          <div class="weui_cell_bd">
            <input type="text" v-model="child_birth" name="birth" id="birth" class="weui_input" data-toggle='date'/>
          </div>
        </div>
      </div>
    </form>
    <div class="weui_btn_area">
      <a class="weui_btn weui_btn_plain_primary" id="save" @click="saveChild">保存</a>
    </div>
  </div>
</template>
<script>
  //    import BindChild from './BindChild.vue'
  import mm_params from 'js/common';
  import ChildDownload from './ChildDownload.vue'
  export default {
    name: 'AddChild',

    components: {},
    data() {
      return {
        'child_name': '',
        'child_gender': 0,
        'child_birth': '2000-01-01',
      }
    },
    route: {
      activate: function (transition) {
//        $('#birth').calendar({
//          value: ['2016-12-12'],
//          dateFormat: 'yyyy-mm-dd',
//          "minDate": "1980-01-01",
//          "maxDate": "2016-1-1"
//        });
//        $("#birth").calendar("value", ["2000-01-01"]);
//        $("#birth").calendar();
//        $("#birth").calendar();
        transition.next()
      },
    },
    ready: function () {
      $('#birth').calendar({
        value: ['2000-01-01'],
        dateFormat: 'yyyy-mm-dd',
        minDate: "1980-01-01",
        maxDate: "2016-01-01"
      });
    },
    created: function () {
      router.on('/ChildDownload', {
        component: ChildDownload
      })
    },
    props: ['msgfromfather'],
    methods: {
      saveChild: function () {
        let isOk = true;
        var param;
        let vm = this;
        let birth_date = new Date(vm.child_birth.trim()).getTime();
        //规则名
        if (vm.child_name== '' || typeof(vm.child_name) == 'undefined' || vm.child_name.length == 0) {
          $.hideLoading();
          $.alert('姓名名不能为空', '提示');
          dataOk = false
          return false;
        } else if (birth_date > new Date().getTime()) {
          $.toptip('生日填写有误', 'warning');
          isOk = false;
          return false;
        }
        if (isOk) {
          $.showLoading("保存中");
          console.log("birth - date:" + birth_date + "--" + (vm.child_birth).trim() + ",name:" + vm.child_name + ",gender:" + vm.child_gender)
          param = {
            userid: localStorage.km_UID,
            sign: localStorage.km_USIGN,
            authToken: localStorage.access_token,
            gender: vm.child_gender,
            name: vm.child_name,
            birth: birth_date
          };
          console.log("addChild--param--")
          console.log(param)
          let URL = mm_params.mobile_url + "/weixin/child/child.wx/add";
          vm.$http.post(URL, param).then((response) => {
            // success callback
            console.log("addchild---http.post()--success callback-")
          let data = response.json();
            if (response.json().status == 200) {
              //sessionStorage.setItem("bind_code",response.json().extras);
              sessionStorage.setItem("curr_child_id", response.json().content.id);
              $.hideLoading();
//              $.toast("保存成功")
              router.go({path: '/ChildDownload'});
//              router.go({path: '/ChildDownload'});
            } else if(data.status==300){
              $.hideLoading();
              $.alert('孩子名字已存在', '提示');
            } else {
              $.hideLoading();
              $.toast("保存失败", "cancel")
            }

          }, (response) => {
            // error callback
            console.log("addchild---http.post()--error callback-")
            if (mm_params.devlop) {
//            router.go({path: '/ChildDownload'});
            } else {

            }
            $.hideLoading();
            $.toast("保存失败", "forbidden")
          });
        }
      },
      goback: function () {
        router.go({path: '/main/settings'})
      }
    },
    watch: {
      child_gender: {
        handler: function (newVal, old) {
          //console.log("gender-watch=new:" + newVal + ",old:" + old)
        },
        deep: true
      },
      child_name: {
        handler: function (newVal, old) {
          //console.log("name-watch=new:" + newVal + ",old:" + old)
        },
        deep: true
      }
    }
  }
</script>
<style>

</style>
