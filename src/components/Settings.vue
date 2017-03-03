<template>
  <div id="more" class="container">
    <div class="i_header">
      <div v-if="goBack" class="i_left" onclick="iGoback()">返回</div>
      <div v-else class="i_left_none"></div>
      <div class="i_title">
        设置
      </div>
    </div>
    <div class="weui_cells_title" style="padding-top:8px;margin-bottom: 8px;">
      孩子手机列表
    </div>
    <div class="weui_cells">
      <template v-for="item in equipList">
        <!-- onclick="deleteEquip({{item.equipId}})"-->
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            {{item.childName}}--<label class="blue_font">{{ item.aliasName }}</label>
          </div>
          <div class="weui_cell_ft" style="color: red;font-size: 10px">
            <a class="weui_btn weui_btn_mini weui_btn_default" @click="delEquip(item.childId,item.equipId,item.aliasName)">删除</a>
          </div>
        </div>
      </template>
      <!--v-if="show_add" -->
      <div class="weui_cell" v-link="{ path : '/addchild' }" style="color: #888;font-size: 14px;">
        添加手机
      </div>
    </div>
    <div class="weui_cells">
      <div id="about" class="weui_cell" v-link="'/html?type=2&url='+ about_us">
        <div class="weui_cell_bd weui_cell_primary blue_font">
          关于苗苗
        </div>
      </div>
      <div id="official" class="weui_cell" v-link="'/html?type=2&url='+ website">
        <div class="weui_cell_bd weui_cell_primary blue_font">
          官方网站
        </div>
      </div>
      <div id="help" class="weui_cell" v-link="'/html?type=2&url='+help">
        <div class="weui_cell_bd weui_cell_primary blue_font">
          帮助
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .blue_font {
    color: #00C69E;
  }
</style>
<script>
  import mm_params from 'js/common';

  export default{
    name: 'Settings',

    components: {},
    data(){
      return {
        equipList: [],
        show_add: localStorage.hasEquip != 0,
        about_us: 'https://www.kidmate.cn/about.html',
        help: 'https://www.kidmate.cn/faq.html',
        website: 'https://www.kidmate.cn/index.html'

      }
    },
    init: function () {

    },
    created: function () {

    },
    ready: function () {
      //this.getEquips()
      //this.getEquipList()
    },
    route: {
      data ({to}){

      },
      activate: function (transition) {
        this.getEquipList()
        console.log('hook-example activated!')
        transition.next()
      },
      deactivate: function (transition) {
        console.log('hook-example deactivated!')
        transition.next()
      },
      canActivate: function (transition) {
        console.log('hook-example canActivate!')
        transition.next()
      },
      canDeactivate: function (transition) {
        console.log('hook-example canDeactivate!')
        transition.next()
      }

    },
    methods: {
      getEquipList: function () {
        console.log("--getEquipList---");
        let vm = this;
        let param = mm_params.getUserInfo(1);
        let URL = mm_params.mobile_url + '/weixin/equip/equipment.wx/detail';
        let equips = new Array();
        vm.$http.post(URL, param).then((response)=> {
          console.log("--getEquipList--success-");
          vm.equipList = []
          if (response.json().status == 200) {
            equips = response.json().content;
            if (equips.length > 0) {
              localStorage.setItem("hasEquip", equips.length)
              localStorage.setItem("km_EQUIP_NUM", equips.length)
              for (var int = 0; int < equips.length; int++) {
                var array_element = equips[int];
                vm.equipList.push(array_element);
              }
            } else {
              localStorage.setItem("hasEquip", 0)
              localStorage.setItem("km_EQUIP_NUM", 0)

            }
          } else {

          }
        }, (response)=> {
          console.log("--getEquipList--error-");
        });
      },
      delEquip: function (cid, eid,aliasName) {
        console.log("--cid:"+cid+",--eid:"+eid);
        let currCID=sessionStorage.currChildId;
        let currEID=sessionStorage.currEquipId;
        let vm = this;
        let equipname ='<font color="#00C69E">'+aliasName+'</font>';
        $.actions({
          title:"删除设备"+equipname,
          actions: [{
            text: "删除",
            className: "color-danger",
            onClick: function() {
              let param = mm_params.getUserInfo(1);
              let URL = mm_params.mobile_url + mm_params.del_equip_url.replace("CID", cid).replace("EID", eid);
              vm.$http.post(URL, param).then((response)=> {
                if (response.json().status == 200) {
                  if(currEID==eid){
                    sessionStorage.removeItem("currChildId")
                    sessionStorage.removeItem("currEquipId")
                  }
                  vm.getEquipList();
                  console.log("--delEquip--success-200");
                } else {
                  console.log("--delEquip--success-400");
                }
              }, (response)=> {
                console.log("--delEquip--error-");
              });
            }
          }]
        });
      }
    },
    watch: {
      equipList: {
        handler: function (newVal, oldVal) {
          console.log("equipList--watch")
        },
        deep: false
      }
    }
  };

</script>
