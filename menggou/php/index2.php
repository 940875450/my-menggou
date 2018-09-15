<?php
  header("content-type:text/html;charset=utf-8");
  header("Access-Control-Allow-Origin:*");
  $username = $_GET["username"];
	$useremail = $_GET["useremail"];
  $userpassword = $_GET["userpassword"];
	mysql_connect("localhost","root","");
	mysql_select_db("menggou");
	mysql_query("set names 'utf8'");
	$sql = "SELECT * FROM element LIMIT 7,16";
	$result = mysql_query("$sql");
	$arr = array();
	while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
		# code...
		$arr[] = $row;
	}
	echo json_encode($arr);
	mysql_close();
?>