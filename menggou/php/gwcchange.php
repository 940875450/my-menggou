<?php
  header("content-type:text/html;charset=utf8");
  header("Access-Control-Allow-Origin:*");
  $userid = $_GET["userid"];
  $eleid = $_GET["eleid"];
  $elenum = $_GET["elenum"];
  // 连接数据库
  mysql_connect("127.0.0.1","root","");
  //选择数据库
  mysql_select_db("menggou");
  mysql_query("set names 'utf8'");
  // 设置sql语句
	$sql="UPDATE gwc SET elenum ='$elenum' WHERE userid = '$userid' AND eleid = '$eleid'";
	//执行sql
	$result = mysql_query($sql);
	if($result){
	    echo '{"code":1}';
	}else{
	    echo '{"code":0}';
	}
  //关闭数据库
  mysql_close();
 ?>