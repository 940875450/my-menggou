//首先引入config
require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","template","url","header","cookie"],function($,template,url,header,cookie){

		header.init(url,template,cookie);
		$(".gwc-chose ul li").on("click",function(){
			$(".gwc-chose span p").html($(this).html());
		});
		//封装一个计算总价格的函数（计算复选框选中了的商品总价格）
		function allMoney(){
			var allmoney = 0;
			$(".gwc-ck").each(function(){
				if($(this).is(":checked")){
//					console.log($(this).siblings(".gwc-count").children(".gwc-change").val());
					var elecount = parseInt($(this).siblings(".gwc-count").children(".gwc-change").val());					
					var eledan = parseInt($(this).siblings(".gwc-jg").children("i").children(".danjia").html());
//					console.log($(this).siblings(".gwc-jg").children("i").children(".danjia"));		
					allmoney += elecount*eledan;
				}
			});
			$("#ele_all").html(allmoney+".00");
		}
		//这个函数的作用是在模板拼接完成后，对各种按钮的操作
		function selectCk(){
			//判断选中的单选个数
		var n = $(".gwc-ck").length;
		$(".select-all").on("click",function(){
			if($(".select-all").is(":checked")){
				$(".gwc-ck").prop("checked",true);
				n = $(".gwc-ck").length;
			}else{
				$(".gwc-ck").attr("checked",false);
				n = 0;
			}
			allMoney();
		});
		$(".gwc-ck").on("click",function(){
			if($(this).is(":checked")){
				n++;
			}else{
				n--;
			}
			
			if(n == $(".gwc-ck").length){
				$(".select-all").prop("checked",true);
			}else{
				$(".select-all").prop("checked",false);
				
			}
			allMoney();
		});
		//点击删除按钮时删除页面中的这件商品，同时也删去数据库中的这件商品
		$(".gwc-del").on("click",function(){			
			$.ajax({
				url:url.url+"/php/gwcdel.php",
				type:"GET",
				dataType:"json",
				data:{"userid":userId,"eleid":$(this).attr("data-id")},
				success:function(data){
					//将用户username传入gwc.php中得到这个用户的所有购物商品信息
					if(data.code){
						if(confirm("真的要从购物车删除商品么？")){
							gwcrequire();
						}						
					}
					else{
						alert("删除失败！");
					}
				}
			})
		});
		//点击清空购物车时删除当前用户的所有商品，并且在数据库也删除
		$(".gwc-remove").on("click",function(){
			if(confirm("确定要清空所有购物车么？")){
				$.ajax({
				url:url.url+"/php/gwcremove.php",
				type:"GET",
				dataType:"json",
				data:{"userid":userId},
				success:function(data){
					if(data.code){
						var html = template("gwcnone");
						$("#gwcshop").html(html);	
					}else{
						alert("清空失败！！！");
					}
				}
			});
			}			
		})
		//当商品的number发生改变时改变数据库中elenum的值，同时改变页面的num值
		$(".gwc-change").on("blur",function(){
			$.ajax({
				url:url.url+"/php/gwcchange.php",
				type:"GET",
				dataType:"json",
				data:{"userid":userId,"eleid":$(this).attr("data-id"),"elenum":$(this).val()},
				success:function(data){
					//将用户username传入gwc.php中得到这个用户的所有购物商品信息
					if(data.code){
						gwcrequire();
					}
					else{
						alert("添加失败！");
					}
				}
			})
		});
		$(".gwc-toele").on("click",function(){
					$.cookie("userid",$(this).attr("data-id"),{expires: 30 ,path:"/"});
				});
		}
		//判断当前页面是否有用户登录，若存在，取出数据库中用户uesername；
		//封装函数，请求当前页面数据
		var userId;
		function gwcrequire(){
			$.ajax({
			   	url:url.url+"/php/gwcshow.php",
			   	type:"GET",
			   	dataType:"json",
			   	data:{"userid":userId},
			   	success:function(data){
						   		console.log(data == "")
					if(!(data == "")){
						//获取用户购买的所有商品id，用循环去请求element.php中的商品种类
			   		var arr = [];
			   		var j =0;
			   		var tData = data;
			   		var k =0;
			   		for (let p = 0;p<data.length;p++) {
//						   			console.log(data[i].eleid)
			   			$.ajax({
			   				type:"get",
			   				url:url.url+"/php/element.php",
			   				dataType:"json",
			   				data:{"userid":data[p].eleid},
			   				success:function(data){
			   					//在这里得到了所有用户的商品种类
			   					arr.push(data[0])
			   					j++;
			   					if(j == tData.length){
			   						for (var i = 0;i<tData.length;i++) {
			   							arr[i].elenum = tData[i].elenum;
			   							k++;
			   							if(k == tData.length){
			   								//数据得到的差不多了，在页面进行模板拼接
			   								//对arr按照id从小到大排序输出
						   					for (var a=1;a<arr.length;a++){
												for (var m=0;m<arr.length-a;m++) {
													if(parseInt(arr[m].id)>=parseInt(arr[m+1].id)){         
														var t = arr[m+1];
														arr[m+1] = arr[m];
														arr[m] = t;
													}
												}
											}
									   		var html = template("gwcShop",{arr:arr});
											$("#gwcshop").html(html);	
											selectCk();
											allMoney();
			   							}			   							
			   						}
			   					}			   					
			   				}
			   			});
			   		}
					}
					//如果得到的data为空的话就显示购物车为空
			   		else{
			   			var html = template("gwcnone");
						$("#gwcshop").html(html);
			   		}
			   	}
			});
		}
		if(!($.cookie("useName") == null)){
			$.ajax({
				url:url.url+"/php/list.php",
				type:"GET",
				dataType:"json",
				data:{"user":$.cookie("useName")},
				success:function(data){
					userId = data[0].username;
					//将用户username传入gwc.php中得到这个用户的所有购物商品信息
					gwcrequire();					
				}
		});
		}else{
			var html = template("gwcnone");
			$("#gwcshop").html(html);	
		};				
	})
})
