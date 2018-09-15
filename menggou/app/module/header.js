//定义header模块
define(function(){
	function Header(){}

	Header.prototype.init = function(url,template,cookie){
		//1、把header的html内容加载到对应的页面上
		//2、header的交互
    $("header").load("/html/header.html .head",function(){
		if(!($.cookie("useName") == null)){
		$.ajax({
			url:url.url+"/php/list.php",
			type:"GET",
			dataType:"json",
			data:{"user":$.cookie("useName")},
			success:function(data){
				if(!(data == "")){
				var html = template("need",{data:data});
				$("#content").html(html);
				$("#out").on("click",function(){
    				$.cookie("useName", null,{expires:-1,path:"/"});
    			});
			}
			}
		});
		}else{
			var html = template("onneed");
			$("#content").html(html);
		}
   });
   	
   	$.ajax({
			url:url.url+"/php/list.php",
			type:"GET",
			dataType:"json",
			data:{"user":$.cookie("useName")},
			success:function(data){
				$.ajax({
					url:url.url+"/php/gwcshow.php",
					type:"GET",
					dataType:"json",
					data:{"userid":data[0].username},
					success:function(data){
//						console.log(data);
						var sum = 0;
						for (var i =0;i<data.length;i++) {
							sum += parseInt(data[i].elenum);
						}
//						console.log(sum)
						$("#gwc-sum").html(sum);
					}
				});
			}
		});
		
    $("footer").load("/html/header.html .footer",function(){

    });
	}
	return new Header();
});
