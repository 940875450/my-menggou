<?php
  header("content-type:text/html;charset=utf-8");
  header("Access-Control-Allow-Origin:*");
  $keyword = $_GET["keyWord"];
	mysql_connect("localhost","root","");
	mysql_select_db("menggou");
	mysql_query("set names 'utf8'");
	$sql = "SELECT * FROM element WHERE elements LIKE '%$keyword%' OR title LIKE '%$keyword%' OR  emm6 LIKE'%$keyword%'";
	$result = mysql_query("$sql");
	$row=array();
	while($arr = mysql_fetch_array($result,MYSQL_ASSOC)) {
		# code...
	     $row[] = $arr;
	}
	echo json_encode($row);
	mysql_close();
?>