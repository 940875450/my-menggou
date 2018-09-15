//首先引入config
require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","template","url","cookie"],function($,template,url,cookie){
		function running(){
			$(".show-small img").on("click",function(){
			$(".wrap-show img:eq(0)").attr('src',$(this).attr('src'));
		});
		var mLeft = parseInt($(".element-other").css("margin-left"));					
		var flag = false;
		$("#element-next").on("click",function(){
			if(!flag){
				flag = true;
			    mLeft = parseInt($(".element-other").css("margin-left"));
			$(".element-other").animate({"margin-left": mLeft-$(".element-one:eq(0)").width()},function(){
				if(mLeft <= -$(".element-one:eq(0)").width()*parseInt($(".element-item").length/4)) {
					$("#element-next").css({
						"background": "#e0e0e0",
   						"cursor": "default"
					});
				$(".element-other").css({"margin-left":-$(".element-one:eq(0)").width()*parseInt($(".element-item").length/4)});
			}else{
				$("#element-prev,#element-next").css({
						"background": "#333",
   						"cursor": "pointer"
				});
			}
			flag = false;
			});
			}
		})

		$("#element-prev").on("click",function(){
			if(!flag){
			flag = true;
			   mLeft = parseInt($(".element-other").css("margin-left"));			
			$(".element-other").animate({"margin-left": mLeft+$(".element-one:eq(0)").width()},function(){
			if(mLeft >= 0){
				$(".element-other").css({"margin-left":"0px"});				
					$("#element-prev").css({
						"background": "#e0e0e0",
   						"cursor": "default"
					});
			}else{
				$("#element-prev,#element-next").css({
						"background": "#333",
   						"cursor": "pointer"
				});
			}
			flag = false;
			});	
			}
		});	
		}
		//下面开始多重套ajax,懵逼啊
		//一、模板拼接用
		$.ajax({
			type:"get",
			url:url.url+"/php/element.php",
			dataType:"json",
			data:{"userid":$.cookie("userid")},
			success:function(data){
				var html = template("elementImg",{data:data});
				$("#elementimg").html(html);
				var html1 = template("elementright",{data:data});
				$("#elementRight").html(html1);
				running();
				$(".put-gwc").on("click",function(){
//					console.log(!($.cookie("useName") == null));
					//二、当页面存在用户登录信息时获取用户名的ajax
					if(!($.cookie("useName") == null)){
						$.ajax({
						url:url.url+"/php/list.php",
						type:"GET",
						dataType:"json",
						data:{"user":$.cookie("useName")},
						success:function(data){
						  	console.log(data[0].username);
							console.log($.cookie("userid"));
							var userId = data[0].username;
							var eleId = $.cookie("userid");
						//三、把上面console的这两个值传入数据库判断是否存在。若存在elenum加一，不存在则创建一个
						   $.ajax({
						   	url:url.url+"/php/gwc.php",
						   	type:"GET",
						   	dataType:"json",
						   	data:{"userid":data[0].username,"eleid":$.cookie("userid")},
						   	success:function(data){
						   		//返回的值判断到了购物车中是否已经有这件商品
						   		//四、存在这个用户的这件商品即userid和eleid都满足条件时,elenum+1
						   		if(data.code){
						   			$.ajax({
								   	url:url.url+"/php/gwcaddnum.php",
								   	type:"GET",
								   	dataType:"json",
								   	data:{"userid":userId,"eleid":eleId},
								   	success:function(data){
								   		alert("添加购物车成功！");
								   	}
								   	});
						   		}
						   		//否则创建一个
						   		else{
						   			$.ajax({
								   	url:url.url+"/php/gwcadd.php",
								   	type:"GET",
								   	dataType:"json",
								   	data:{"userid":userId,"eleid":eleId},
								   	success:function(data){
								   		alert("添加购物车成功！");
								   	}
								   	});
						   		}
						   	}
						   })
						}
					});
					}
					else{
						alert("请先登录 (´･ω･`)");
					}			
				});
			}
		});
		$.ajax({
			url:url.url+"/php/index.php",
			type:"GET",
			dataType:"json",
			success:function(data){
				if(!(data == "")){
				var html = template("elementOther",{data:data});
				$("#elementother").html(html);
		//模板加载完成之后点击模板中的a标签存一个cookie用于下个页面
				$(".element-item a").on("click",function(){
					var userid = $(this).attr("data-id");
					$.cookie("userid",userid,{expires: 30 ,path:"/"});
				});
				//点击日版或者代理版切换版本
				$(".element-selected").on("click",function(){
					$(this).addClass("selected").siblings().removeClass("selected");
				})
				}
			}
		});
	})
})
