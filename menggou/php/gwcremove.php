<?php
  header("content-type:text/html;charset=utf-8");
  header("Access-Control-Allow-Origin:*");
  $userid = $_GET["userid"];
	mysql_connect("localhost","root","");
	mysql_select_db("menggou");
	mysql_query("set names 'utf8'");
	$sql = "DELETE FROM gwc WHERE userid = '$userid'";
	$result = mysql_query($sql);
	if($result){
	    echo '{"code":1}';
	}else{
	    echo '{"code":0}';
	}
	mysql_close();
?>
