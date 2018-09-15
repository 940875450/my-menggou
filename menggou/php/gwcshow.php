<?php
  header("content-type:text/html;charset=utf-8");
  header("Access-Control-Allow-Origin:*");
  $userid = $_GET["userid"];
	mysql_connect("localhost","root","");
	mysql_select_db("menggou");
	mysql_query("set names 'utf8'");
	$sql = "SELECT * FROM gwc WHERE userid = '$userid'";
	$result = mysql_query("$sql");
	$arr = array();
	while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
		# code...
		$arr[] = $row;
	}
	echo json_encode($arr);
	mysql_close();
?>
