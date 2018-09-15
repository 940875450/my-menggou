<?php
  header("content-type:text/html;charset=utf-8");
  header("Access-Control-Allow-Origin:*");
//echo '{"name":"zhangsan"}'
	$user = $_GET["user"];
	mysql_connect("127.0.0.1","root","");
	//选择数据库
	mysql_select_db("menggou");
	mysql_query("set names 'utf8'");
	// 设置sql语句
	$sql="SELECT * FROM alluser WHERE username='$user' OR useremail='$user'";
	$result = mysql_query($sql);
	$arr = array();
		while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
			# code...
			$arr[] = $row;
		}
		echo json_encode($arr);
?>
