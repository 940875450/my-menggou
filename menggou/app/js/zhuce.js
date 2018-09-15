//首先引入config
require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","template","url","rezhuce"],function($,template,url,rezhuce){
			rezhuce.init();
			$(".next").on("click",function(){
					var isSubmit = rezhuce.flags.every(function(item){
					return item == true;
				})
				if(isSubmit){
					$.ajax({
						url:url.url+"/php/zhuce.php",
						type:"GET",
						dataType:"json",
						data:{"username":$(".zhuce-fr input:eq(0)").val(),
						"useremail":$(".zhuce-fr input:eq(2)").val(),
						"userpassword":hex_md5($(".zhuce-fr input:eq(4)").val())},
						success:function(data){
							if(data.code){
								alert("注册成功！！！");
								window.location.href = "/html/denglu.html";
							}else{
								alert("用户名已存在！！！");
							}							
						}
					})
				}
			})
		})
})
