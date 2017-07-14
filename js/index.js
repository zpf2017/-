  var music = document.getElementById("music");

  //禁止橡皮筋效果
  var ua = navigator.userAgent.toLowerCase(); 
  if(/iphone|ipad|ipod/.test(ua)) {
      function stopScrolling( touchEvent ) { 
        touchEvent.preventDefault(); 
       } 
       document.addEventListener( 'touchstart' , stopScrolling , false ); 
       document.addEventListener( 'touchmove' , stopScrolling , false ); 
  }
 
  //加载图片列表
  var pics = [
      "images/lianjia_landscape_phone@2x.png",
      "images/lianjia_landscape_hint@2x.png",
      "images/lianjia_music_icon.png",
      "images/lianjia_a2_people.png",
      "images/lianjia_green_ball.png",
      "images/lianjia_ld_img.png",
      "images/lianjia_ld_star.png",
      "images/lianjia_peo_touying.png",

      "images/lianjia_p1_hand.png",
      "images/lianjia_p1_bg.jpg",
      "images/lianjia_p1_box.png",
      "images/lianjia_p1_boxone.png",
      "images/lianjia_p1_boxtwo.png",      
      "images/lianjia_p1_peo.png",
      "images/lianjia_p1_triangle.png",
      "images/lianjia_p2_bg.jpg",
      "images/lianjia_p2_car.png",
      "images/lianjia_p2_cartwo.png",
      "images/lianjia_p2_peo.png",
      "images/lianjia_p2_star.png",
      "images/lianjia_p2_cloud.png",
      "images/lianjia_p2_cloudone.png",
      "images/lianjia_p2_cloudtwo.png",
      "images/lianjia_p2_xbt.png",

      "images/lianjia_p3_bg1.jpg",
      "images/lianjia_p3_bg2.jpg",
      "images/lianjia_p3_meteor.png",
      "images/lianjia_p3_moonlit.png",
      "images/lianjia_p3_peo.png",
      "images/lianjia_p3_reolit.png",
      "images/lianjia_p3_roadlamp.png",
      "images/lianjia_p3_roadlamptwo.png",
      "images/lianjia_p3_roadlit.png",
      "images/lianjia_p3_star.png",
      "images/lianjia_p3_winlit.png",
      "images/lianjia_p3_moon.png",    
      "images/lianjia_p4_cloud.png",
      "images/lianjia_p4_cloudtwo.png",
      "images/lianjia_p4_door.png",
      "images/lianjia_p4_doorone.png",
      "images/lianjia_p4_doortwo.png",
      "images/lianjia_p4_house.png",
      "images/lianjia_p4_peo.png",
      "images/lianjia_p4_stair.png",
      "images/lianjia_p5_lit.png",
      "images/lianjia_p5_peo.png",
      "images/lianjia_p5_star.png",
      "images/lianjia_p5_lit.png",
      "images/lianjia_people_left.png",
      "images/lianjia_people_right.png",
      "images/lianjia_people_top.png",
      "images/lianjia_star.png",
      "images/lianjia_logo_bg3.png",
      "images/lianjia_logo_bg2.png",
      "images/lianjia_logo_bg1.png",
      "images/lianjia_qrcode1.jpg",
      "images/lianjia_logo_bg.png"
    ];
  function _loadImages(pics, callback, len){
        len = len || pics.length;
        if(pics.length){
            var IMG = new Image(),
                picelem = pics.shift();
                
            if(window._pandaImageLoadArray){
                window._pandaImageLoadArray = window._pandaImageLoadArray
            }else{
                window._pandaImageLoadArray = [];
            }
            window._pandaImageLoadArray.push(picelem);
            IMG.src = picelem;
            // 从数组中取出对象的一刻，就开始变化滚动条
            _drawLoadProgress(window._pandaImageLoadArray.length/(len*len));
            // 缓存处理
            if (IMG.complete) {
                window._pandaImageLoadArray.shift();
                return _loadImages(pics,callback, len); 
            }else{
                // 加载处理
                IMG.onload = function() {
                    window._pandaImageLoadArray.shift();
                    IMG.onload = null;  // 解决内存泄漏和GIF图多次触发onload的问题
                }
                // 容错处理 todo 应该如何处理呢?
                // 目前是忽略这个错误，不影响正常使用
                IMG.onerror = function(){
                    window._pandaImageLoadArray.shift();
                    IMG.onerror = null;
                }
                return _loadImages(pics, callback, len);
            }
            return;
        }
        if(callback) _loadProgress(callback, window._pandaImageLoadArray.length, len);
  }

  // 监听实际的加载情况
  function _loadProgress(callback, begin, all){
      var loadinterval = setInterval(function(){
          if(window._pandaImageLoadArray.length != 0 && window._pandaImageLoadArray.length != begin){
              _drawLoadProgress((begin - window._pandaImageLoadArray.length )/all);
          }else if(window._pandaImageLoadArray.length == 0){
              _drawLoadProgress(1)
              setTimeout(function(){
                  callback.call(window);
              },500);
              clearInterval(loadinterval);
          }
      },300);
  }

  //加载百分比
  function _drawLoadProgress(w){
      var num = Math.floor(w*100) >= 100 ? 100 : Math.floor(w*100);
  }

  //加载完成回调
  music.play();
  _loadImages(pics, function(){
      console.log(888888888888)
    setTimeout(function(){
      $(".music_icon").show();
      $(".ld_page").fadeOut(800);
      $(".pageHome").fadeIn(800)
    },3000)
  });

//音频
$(".music_icon").on("touchstart",function(){
  if($(this).hasClass("mute")){
    music.play();
    $(this).removeClass("mute");

  }else{
    music.pause();
    $(this).addClass("mute");
  }
});



$( ".p1_bal" ).draggable({
  revert: "invalid"
});
$( ".p1_ball").droppable({
  // activeClass: "p1active",
  drop: function( event, ui ) {
    ui.draggable.hide();
    $(".page1").addClass('play');
    $(".p1_baltwo").fadeIn();
    $(".p1_hand_wrap").removeClass('play').fadeOut();
    $(".p1_hand_wrap .p1_hand").hide();
    setTimeout(function(){
      $(".page1").fadeOut(800);
      $(".page2").fadeIn(800);
    },6500)
  }
});



$( ".p2_ballbox" ).draggable({
  revert: "invalid"
});
$( ".p2_litbox").droppable({
  // activeClass: "p1active",
  drop: function( event, ui ) {
    ui.draggable.hide();
    
    $(".p2_litbox .green_ball").fadeIn();
    $(".p2_car_inner,.p2_cartwo_inner").addClass("paused");
    $(".page2").addClass("play");
    setTimeout(function(){
      $(".page2").fadeOut(800);
      $(".page3").fadeIn(800);
    },10000)
  }
});



$( ".p3_ballbox" ).draggable({
  revert: "invalid"
});
$( ".p3_litbox").droppable({
  // activeClass: "p1active",
  drop: function( event, ui ) {
    ui.draggable.hide();
    $(".p3_wrap").fadeOut(800);
    $(".p3_gable_ball,.p3_wraptwo").fadeIn();
    $(".page3").addClass("play");
    $(".p3_peo").hide();
    setTimeout(function(){
      $(".page3").fadeOut(800);
      $(".page4").fadeIn(800,function(){
        $(".page4").addClass("play4");
      });
    },7000)
  }
});



$( ".p4_baltwo" ).draggable({
  revert: "invalid"
});
$( ".p4_doorone").droppable({
  // activeClass: "p1active",
  drop: function( event, ui ) {
    ui.draggable.hide();
    $(".p4_doorone").fadeOut();
    $(".p4_doortwo").fadeIn();
    $(".p4_peo1").fadeIn();
    // $(".p4_green_ball").fadeIn();
    $(".page4").addClass("play");
    // $(".p3_peo").hide();
    setTimeout(function(){
      $(".p5_area").fadeIn();
      // $(".page4").fadeOut(800);
      $(".music_icon").css("background-image","url(images/music_icon2.png)");
      $(".page5").fadeIn(800);
      $(".p5_area").delay(800).addClass("play");
      $(".page5").delay(800).addClass("play");
    },5500)
  }
});


//分享
$(".shair_icon").on("touchstart",function(){
  $(".p5_shair").fadeIn();
})

$(".back_icon").on("touchstart",function(){
  window.location.href="http://huodong.lianjia.com/newicon/";
})

$(".p5_shair").on("touchstart",function(){
  $(this).fadeOut();
})


/*
 * [wxShare 微信分享]
 * @param  {[text]} shareTitle [分享标题]
 * @param  {[text]} shareDesc  [分享描述]
 * @param  {[link]} link       [分享链接]
 */
//wxShare('链家APP，全新启程','在寻找家的路上，成为你的那一点光');
//function wxShare(shareTitle,shareDesc,link){
//  if(!link){ var link = location.href; }
//  var uri = window.location.href.split("#")[0];
//  $.ajax({
//	url : "http://wechat.lianjia.com/js/config",
//	data : {
//      		url: uri
//  	},
//	type : "GET",
//	dataType : "jsonp",
//	success : function (data) {
//      		//var apilist = [
//      		//    'onMenuShareTimeline',
//      		//    'onMenuShareAppMessage'
//      		//];
//      		//wx.config({
//      		//    debug: false,
//      		//    appId: data.appid,
//      		//    timestamp: data.timestamp,
//      		//    nonceStr: data.noncestr,
//      		//    signature: data.signature,
//      		//    jsApiList: apilist
//      		//});
//
//		wx.config(data);
//
//      wx.ready(function () {
//        // 分享给朋友事件绑定
//          wx.onMenuShareAppMessage({
//              title: shareTitle,
//              desc: shareDesc,
//              link: link,
//              imgUrl: 'images/lianjia_wx1.jpg',
//              success: function () {
//                showIframe('./status/lianjia_firend.html');
//              }
//          });
//
//          // 分享到朋友圈
//          wx.onMenuShareTimeline({
//              title:shareTitle,
//              link: link,
//              imgUrl: 'images/lianjia_wx1.jpg',
//              success: function () {
//                showIframe('./status/lianjia_moments.html');
//
//              }
//          });
//      })
//  }
//});
//}
