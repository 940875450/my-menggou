define(function(){
   //轮播图对象
   function Lunbo(){}
   Lunbo.prototype.init = function(){
           //记录当前是哪一张图片显示
           this.index = 0;
           //点击下标切换淡入图片
          var  _this = this;
           $("#div1 ol li").on("mousemove",function(){
               $(this).addClass("ac").siblings().removeClass("ac");
               $("#div1 ul a:eq("+ $(this).index() +")").fadeIn("normal").siblings().fadeOut("normal");
               _this.index = $(this).index();
           });
           //定时器，自己动
         _this.timer = setInterval(function(){
              _this.goNext()
          },2000);
          // 移入li时清除定时器
          $("#div1").hover(function(){
           clearInterval(_this.timer);
           _this.timer = ""
          },function(){
            _this.timer = setInterval(function(){
                 _this.goNext()
             },2000);
          })
   }
   Lunbo.prototype.goNext = function(){
     if(this.index == $("#div1 ol li").length-1){
       this.index = -1;
     }
     $("#div1 ol li:eq("+ (this.index+1) +")").addClass("ac").siblings().removeClass("ac");
     $("#div1 a:eq("+ (this.index+1) +")").fadeIn("normal").siblings().fadeOut("normal");
     this.index++;
   }
   return new Lunbo();
});
