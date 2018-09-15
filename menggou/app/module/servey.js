define(function(){
  function Servey(){};
  Servey.prototype.init = function(){
    var scrTop = $(".shouye-server").offset().top;
    $(document).on("scroll",function(){
      if($(document).scrollTop() >= scrTop){
        $(".shouye-server").css({
              "width":1000,
              "position":"fixed",
              "top":-70,
              "left":0,
              "right":0,
              "z-index":999,
             "text-align":"center"
        });
        $(".shouye-server input").css({
            "width":810
        })
      }else{
          $(".shouye-server").css({
               "width":780,
              "position":"relative",
              "margin": "70px auto -70px",
              "top":0
          });
          $(".shouye-server input").css({
              "width":570
          })

      }
    });
  }
  return new Servey();
})
