<?php
  header("content-type:text/html;charset=utf8");
  header("Access-Control-Allow-Origin:*");
  $user = $_GET["user"];
  $password = $_GET["password"];
  // 连接数据库
  mysql_connect("127.0.0.1","root","");
  //选择数据库
  mysql_select_db("menggou");
  mysql_query("set names 'utf8'");
  // 设置sql语句
  //phone
	$sql="SELECT count(*) FROM alluser WHERE username='$user' AND userpassword='$password' OR  useremail='$user' AND userpassword='$password'";
	//执行sql
	$result = mysql_query($sql);
	$num = mysql_fetch_array($result);
	if($num[0]){
	    echo '{"code":1}';
	}else{
	    echo '{"code":0}';
	}
  //关闭数据库
  mysql_close();
 ?>
