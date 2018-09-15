/*存cookie
 * key  string cookie的名称
 * value string cookie的值
 * day  number 几天后过期 不传默认是会话生存期
 * path string 路径  默认为当前路径
 * */
function setCookie(key,value,day,path){
	
	if(day){
		var d = new Date();
		d.setDate(d.getDate()+day);
		if(path){
			document.cookie = key + "=" + value + ";expires=" + d+";path="+path;
		}else{
			document.cookie = key + "=" + value + ";expires=" + d;
		}
		
	}else{
		if(path){
			document.cookie = key + "=" + value+";path="+path;
		}else{
			document.cookie = key + "=" + value;
		}
		
	}	
}

/*取cookie
 * key string 取的cookie的名称
 * */
function getCookie(key){
	//页面有没有cookie
	if(document.cookie){
		var str = document.cookie;
		var arr = str.split("; ");
		for(var i = 0; i < arr.length; i++){
			var item = arr[i].split("=");
			//item =["username","zhagnsan"]
			if(item[0] == key){
				return item[1];
			}
		}
		return "";
	}else{
		return "";
	}
	
}

/*删除cookie
 * key  string  cookie名称
 * */
function removeCookie(key){
	//把cookie的过期日期提前
	setCookie(key,"",-1);
}
