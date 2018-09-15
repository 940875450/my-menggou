//首先引入config
require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","template","url","header","lunbo","servey","cookie","md5"],function($,template,url,header,lunbo,servey,cookie){

		header.init(url,template,cookie);
		lunbo.init();
		servey.init();
		$(".shouye-chose ul li").on("click",function(){
			$(".shouye-chose span p").html($(this).html());
		})
		var userid;
		$.ajax({
			url:url.url+"/php/index.php",
			type:"GET",
			dataType:"json",
			success:function(data){
				if(!(data == "")){
				var html = template("list1",{data:data});
				$("#three1").html(html);
	//模板加载完成之后点击模板中的a标签存一个cookie用于下个页面
				$(".three1 a").on("click",function(){
					userid = $(this).attr("data-id");
					$.cookie("userid",userid,{expires: 30 ,path:"/"});
					$.cookie(userid,userid,{expires: 30 ,path:"/"});					
				});
				}
			}
	});
	$.ajax({
			url:url.url+"/php/index2.php",
			type:"GET",
			dataType:"json",
			success:function(data){
				if(!(data == "")){
				var html = template("list2",{data:data});
				$("#three2").html(html);
				$(".three1 a").on("click",function(){
					userid = $(this).attr("data-id");
					$.cookie("userid",userid,{expires: 30 ,path:"/"});
				});
				}
			}
	});
	$.ajax({
			url:url.url+"/php/index3.php",
			type:"GET",
			dataType:"json",
			success:function(data){
				if(!(data == "")){
				var html = template("list3",{data:data});
				$("#three3").html(html);
				$(".three1 a").on("click",function(){
					userid = $(this).attr("data-id");
					$.cookie("userid",userid,{expires: 30 ,path:"/"});
				});
				}
			}
	});
	$.ajax({
			url:url.url+"/php/paihang.php",
			type:"GET",
			dataType:"json",
			success:function(data){
				if(!(data == "")){
				var html = template("paihang",{data:data});
				$("#nPaihang").html(html);
				$("#nPaihang a").on("click",function(){
					userid = $(this).attr("data-id");
					$.cookie("userid",userid,{expires: 30 ,path:"/"});
				});
			}
		}
	});
	
	})
})
