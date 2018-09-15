//首先引入config
require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","template","url","cookie"],function($,template,url,cookie){
		$(".shop-left li").on("click",function(){
			$(".shop-left li").attr({"class":""});
			$(this).attr({"class":"active"});
		});
		$("#shop-server").on("focus",function(){
			$(this).animate({"width":108},"fast");
		});
		$("#shop-server").on("blur",function(){
			$(this).animate({"width":83},"fast");
		});
		$("#shop-server1").on("focus",function(){
			$(this).animate({"width":276},"fast");
		});
		$("#shop-server1").on("blur",function(){
			$(this).animate({"width":145},"fast");
		});
		//每页显示多少个
		var numAge = 12;
		//当前是第几页
  		var index = 1;
  		//用来存一共有多少页
  		var allNum;
		//封装ajax请求函数，每次换页调用，请求新的数据
		function nowKage(){
			$.ajax({
			url:url.url+"/php/shop.php",
			type:"GET",
			dataType:"json",
			data:{"numAge": numAge,"index":index},
			success:function(data){
				//allnum用来分页用，截取data最后一项返回值用于分页
				allNum = data.pop();
				allNum = Math.ceil(allNum.AllNum/numAge);
				if(!(data == "")){
				//使用模板酱内容写入html中
				var html = template("shopMain",{data:data});
				$("#shopmain").html(html);
				var html1 = template("shopKage",{index:index,allNum:allNum});
				$(".shopkage").html(html1);
				$(".shop-pginput").val(index);
				$(".shop-main a").on("click",function(){
					var userid = $(this).attr("data-id");
					$.cookie("userid",userid,{expires: 30 ,path:"/"});
				});
				}
			}
		});
		}
		//页面加载时，先调用一次
		var keywords = decodeURI(location.search).split("=")[1];
		console.log(keywords == null);
		if(keywords == null){
			nowKage();
		}else{
			$.ajax({
			url:url.url+"/php/servey.php",
			type:"GET",
			dataType:"json",
			data:{"keyWord": keywords},
			success:function(data){
				if(!(data == "")){
				//使用模板酱内容写入html中
				var html = template("shopMain",{data:data});
				$("#shopmain").html(html);
				var html1 = template("shopKage",{index:1,allNum:1});
				$(".shopkage").html(html1);
				$(".shop-pginput").val("1");
				$(".shop-main a").on("click",function(){
					var userid = $(this).attr("data-id");
					$.cookie("userid",userid,{expires: 30 ,path:"/"});
				});
				}else{
					var html = template("noneShop",{data:data});
					$("#shopmain").html(html);
				}				
			}
		});
		}
		//点击下一页的函数
		$(".shop-next").on("click",function(){			
			index++;
			if(index >= allNum){
				index = allNum;
			}
			nowKage();
		});
		$(".shop-prev").on("click",function(){
			index--;
			if(index<=1){
				index = 1;
			}	
			nowKage();
		})
		$(".shop-jump").on("click",function(){
			index = $(".shop-pginput").val();
			console.log(index);
			if(index >= allNum){
				index = allNum;
			}
			if(index <= 1){
				index = 1;
			}
			nowKage();
		});
		//这里点击四种类型时，重新请求数据库（另一个表单，额，数据库没写，将就同一个了）
		$(".shop-eles").on("click",function(){
			index = 1;
			//假装意思一下，卡一下再跳
			setTimeout(function(){
				nowKage();
			},300)
		});
		//搜索物品，点击搜索时获取框内值
		$(".shop-serbtn").on("click",function(){
			var mesage = $("#shop-server").val() || $("#shop-server1").val();
			$.ajax({
			url:url.url+"/php/servey.php",
			type:"GET",
			dataType:"json",
			data:{"keyWord": mesage},
			success:function(data){
				if(!(data == "")){
				//使用模板酱内容写入html中
				var html = template("shopMain",{data:data});
				$("#shopmain").html(html);
				var html1 = template("shopKage",{index:1,allNum:1});
				$(".shopkage").html(html1);
				$(".shop-pginput").val("1");
				$(".shop-main a").on("click",function(){
					var userid = $(this).attr("data-id");
					$.cookie("userid",userid,{expires: 30 ,path:"/"});
				});
				}else{
					var html = template("noneShop",{data:data});
					$("#shopmain").html(html);
				}
			}
		});
		});
	})
})
