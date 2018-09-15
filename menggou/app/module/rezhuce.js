define(function(){
  function Rezhuce(){}
  Rezhuce.prototype.init = function(){
    var _this = this;
    _this.flags = [false,false,false,false,false,false]
      $(".zhuce-fr input:eq(0)").on("blur",function(){
        var val = $(this).val();
        var reg = /^[a-zA-Z0-9_-]{4,16}$/;
        if(reg.test(val)){
            _this.flags[0] = true;
            $(this).siblings("i").css({"display":"none"});
        }else {
            _this.flags[0] = false;
            $(this).siblings("i").css({"display":"block"});
        }
      });
      $(".zhuce-fr input:eq(1)").on("blur",function(){
        var val = $(this).val();
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(val)){
            _this.flags[1] = true;
            $(this).siblings("i").css({"display":"none"});
        }else {
            _this.flags[1] = false;
            $(this).siblings("i").css({"display":"block"});
        }
      })
      $(".zhuce-fr input:eq(2)").on("blur",function(){
        var val = $(this).val();
        var reVal = $(".zhuce-fr input:eq(1)").val();
        if(val === reVal){
            _this.flags[2] = true;
            $(this).siblings("i").css({"display":"none"});
        }else {
            _this.flags[2] = false;
            $(this).siblings("i").css({"display":"block"});
        }
      })
      $(".zhuce-fr input:eq(3)").on("blur",function(){
        var val = $(this).val();
        var reg = /^.{6,}$/;
        if(reg.test(val)){
            _this.flags[3] = true;
            $(this).siblings("i").css({"display":"none"});
        }else {
            _this.flags[3] = false;
            $(this).siblings("i").css({"display":"block"});
        }
      })
      $(".zhuce-fr input:eq(4)").on("blur",function(){
        var val = hex_md5($(this).val());
        var reVal = hex_md5($(".zhuce-fr input:eq(3)").val());
        console.log(val)
        if(val === reVal){
            _this.flags[4] = true;
            $(this).siblings("i").css({"display":"none"});
        }else {
            _this.flags[4] = false;
            $(this).siblings("i").css({"display":"block"});
        }
      })
      $(".next").on("click",function(){
        if($("#agreen:checked").length){
            _this.flags[5] = true;
        }else{
            _this.flags[5] = false;
        }
      })
      $("form").on("submit",function(e){
        var isSubmit = _this.flags.every(function(item){
					return item == true;
				})
					if(!isSubmit){
					e.preventDefault();
				}
      })
  }
  return new Rezhuce();
})
