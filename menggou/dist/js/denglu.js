"use strict";require(["config"],function(){require(["jquery","template","url","cookie","md5"],function(i,e,n,t){i(".denglu-put input").on("blur",function(){""==i(this).val()?i(this).siblings("i").css({display:"block"}):i(this).siblings("i").css({display:"none"})}),i("#denglu-login").on("click",function(){i.ajax({url:n.url+"/php/deng.php",type:"GET",dataType:"json",data:{user:i("#putOne").val(),password:hex_md5(i("#putTwo").val())},success:function(e){e.code?(i.cookie("useName",i("#putOne").val(),{expires:30,path:"/"}),alert("登录成功！"),window.location.href="/index.html"):alert("登录失败！")}})})})});