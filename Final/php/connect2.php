<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: disable-www-authenticate");
header("Content-Type: application/json; charset=UTF-8"); 
$link = mysqli_connect();
if( !$link ) {
    echo "MySQL 連線失敗<br>";
    return;
}
else
    //echo "MySQL 連線成功<br>";
	
$sql = "select * from test_location limit 10"; 
$result = mysqli_query($link, $sql);
$queryResult = mysqli_num_rows($result);

$outp = array();
if($queryResult > 0)
{
	if($queryResult == 1) {
		$row = mysqli_fetch_assoc($result);
		$outp = array(
		    "uuid" => $row["uuid"],
			"department" => $row["department"],
			"floor" => $row["floor"],
			"x" => $row["x"],
			"y" => $row["y"]
		);		
    }
	else {
		while($row = mysqli_fetch_assoc($result))
			{			
				$out = ""; 
				$out = array(
				    "uuid" => $row["uuid"],
					"department" => $row["department"],
					"floor" => $row["floor"],
					"x" => $row["x"],
					"y" => $row["y"]
				);
				array_push($outp, $out);
				
			}
	}
}
echo(json_encode($outp, true)); 
?>
