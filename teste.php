<?php

/*
	-	DATABASE 	-	
Username: 3OapZq0KAC
Database name: 3OapZq0KAC
Password: q1ouA3wwOO
Server: remotemysql.com
Port: 3306
*/
function h_auto_define($name, $value){
	if(!defined($name)){
		define($name, $value);
	}
}

h_auto_define('DB_PORT', '3306');
h_auto_define('DB_USER', '3OapZq0KAC');
h_auto_define('DB_NAME', '3OapZq0KAC');
h_auto_define('DB_PASS', 'q1ouA3wwOO');
h_auto_define('DB_SERVER', 'remotemysql.com');


function open_database(){
	$conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
	if($conn){
		echo 'conexão realizada com sucesso!';
	}else{
		echo 'Erro.';
	}
}

open_database();

?>
