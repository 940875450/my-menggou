<?php
  header("content-type:text/html;charset=utf-8");
  header("Access-Control-Allow-Origin:*");
  $userid = $_GET["userid"];
  $eleid = $_GET["eleid"];
	mysql_connect("localhost","root","");
	mysql_select_db("menggou");
	mysql_query("set names 'utf8'");
	$sql = "UPDATE gwc SET elenum = elenum+1 WHERE userid='$userid' AND eleid='$eleid'";
	$issucc =  mysql_query("$sql");
	$sql1 = "SELECT * FROM gwc";
	$result = mysql_query("$sql1");
	$arr = array();
	while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
		# code...
		$arr[] = $row;
	}
	echo json_encode($arr);
	mysql_close();
?>