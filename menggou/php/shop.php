<?php
  header("content-type:text/html;charset=utf-8");
  header("Access-Control-Allow-Origin:*");
  $numAge=$_GET['numAge'];
  $index=$_GET['index'];
	mysql_connect("localhost","root","");
	mysql_select_db("menggou");
	$sql = "SELECT * FROM element LIMIT ".($index-1)*$numAge.",".$numAge;
  	mysql_query("set names 'utf8'");
 	 $result = mysql_query($sql);
  	$sql1 = "SELECT COUNT(*) as AllNum FROM element";
  	$numYe = mysql_query($sql1);
  	$numYe = mysql_fetch_assoc($numYe);
 	 $row = array();
 		 while($arr = mysql_fetch_array($result)){
  			  # code...
  		  $row[]=$arr;
  	}
  $row[]=$numYe;
  echo json_encode($row);
?>