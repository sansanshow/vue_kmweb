/**
 * Created by Keaven on 2016/9/12.
 */

let timePlug = {
  title:'',
  text:'',
  hour:'',
  min:'',
  btn_text1:'',
  btn_text2:'',
  func_ensure1:'',
  func_ensure2:'',
  init:function(title,text,hour,min,btn1,func_1,btn2,func_2){
    this.hour = hour;
    this.min = min;
    this.title = title;
    this.text = text;
    this.btn_text1 = btn1;
    this.btn_text2 = btn2;
    this.func_ensure1 = func_1;
    this.func_ensure2 = func_2;
    timePlug.html();
  },
  display:function () {
    $(".timePlug").remove()
  },
  html:function(){
    var html = [];
    html.push("<div class='timePlug' id='timePlug'>");
    html.push("<div>");
    html.push("<h2>"+timePlug.title+"</h2>");
    html.push("<p align='ceter'>"+timePlug.text+"</p>");
    html.push("<div class='time'>");
    html.push("<div class='time-border'></div>");
    html.push("<div class='swiper-container' id='swiper'>");
    html.push("<div class='swiper-wrapper'>");
    for(var i = 0; i<24; i++){
      html.push("<div class='swiper-slide'>"+i+"小时</div>");
    }
    html.push("</div>");
    html.push("</div>");
    html.push("<div class='swiper-container' id='swiper2'>");
    html.push("<div class='swiper-wrapper'>");
    for(var i = 0; i<60; i++){
      html.push("<div class='swiper-slide'>"+i+"分钟</div>");
    }
    html.push("</div>");
    html.push("</div>");
    html.push("</div>");
    html.push("<div class='but'>");
    html.push("<div id='time_btn_cancel'>取消</div>");
    if(timePlug.btn_text2.length > 0){
      html.push("<div id='time_btn2' style='color: #00c69e;'>"+timePlug.btn_text2+"</div>");
    }
    html.push("<div id='time_btn_sure' style='color: #00c69e;'>"+timePlug.btn_text1+"</div>");
    html.push("</div>");
    html.push("</div>");
    html.push("</div>");
    $("body").append(html.join(""));
    this.event789();
  },
  event789:function(){
    var swiper = new Swiper('#swiper', {
      paginationClickable: true,
      direction: 'vertical',
      nextButton:'.swiper-top',
      slidesPerView: 4,
      centeredSlides: true,
      initialSlide :timePlug.hour,
    });
    //分钟
    var swiper2 = new Swiper('#swiper2', {
      paginationClickable: true,
      direction: 'vertical',
      nextButton:'.swiper-top',
      slidesPerView: 4,
      centeredSlides: true,
      initialSlide :timePlug.min,
    });
    $(".timePlug>div").click(function(){
      event.stopPropagation();
    });
    $(".timePlug").click(function(){
      $(this).remove();
    });
    $("#time_btn_cancel").click(function(){
      $(".timePlug").remove();
    });
    $("#time_btn_sure").click(function(){
        timePlug.func_ensure1(swiper.activeIndex,swiper2.activeIndex);
    });
    $("#time_btn2").click(function(){
        timePlug.func_ensure2();
    });
  }
};
export default timePlug;
