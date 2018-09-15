//首先引入config
require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","template","url","cookie","md5"],function($,template,url,cookie){
			$(".denglu-put input").on("blur",function(){
				var val = $(this).val();
				if(val == ""){
					$(this).siblings("i").css({"display":"block"});
				}else{
					$(this).siblings("i").css({"display":"none"});
				}
			});
			$("#denglu-login").on("click",function(){
					$.ajax({
						url:url.url+"/php/deng.php",
						type:"GET",
						dataType:"json",
						data:{
				      	"user":$("#putOne").val(),
				      	"password":hex_md5($("#putTwo").val())
        				},
						success:function(data){
							 if(data.code){
							 	 $.cookie("useName",$("#putOne").val(),{expires:30,path:'/'});
							 	 alert("登录成功！");
							 	 window.location.href = "/index.html";
							 }else{
							 	 alert("登录失败！")
							 }
						}
					})
			})
	})
})
