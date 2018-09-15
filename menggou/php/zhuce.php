<?php
  header("content-type:text/html;charset=utf-8");
  header("Access-Control-Allow-Origin:*");
  $username = $_GET["username"];
	$useremail = $_GET["useremail"];
  $userpassword = $_GET["userpassword"];
	mysql_connect("localhost","root","");
	mysql_select_db("menggou");
	mysql_query("set names 'utf8'");
	$sql = "INSERT INTO alluser(username,useremail,userpassword) VALUES ('$username','$useremail','$userpassword')";
	$issucc =  mysql_query("$sql");
	
	if($issucc){
	    echo '{"code":1}';
	}else{
	    echo '{"code":0}';
	}

	mysql_close();
?>
