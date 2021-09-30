<?php

$link = mysqli_connect("140.113.144.124", "openmrs-user", "password", "openmrs", 33306);
if( !$link ) {
    echo "MySQL 連線失敗";
    return;
}
else
    //echo "MySQL 連線成功<br>";

$dx = -9;
$dy = -9;
$counter = 0;

while (true) {
	if($counter == 100) break;
    $uuid = 1000;    
	while(true) {
        if($uuid == 1100) break;
		
		$sql = "SELECT * FROM test_location WHERE uuid = $uuid";
        $result = mysqli_query($link, $sql);
        $row = mysqli_fetch_assoc($result);
        $x = $row["x"];
        $y = $row["y"];
                     
        $x = $x + $dx;
        $y = $y + $dy;        
        $sql = "UPDATE test_location SET x=$x, y=$y WHERE uuid=$uuid";
        $result = mysqli_query($link, $sql);

        $uuid = $uuid+1;
	}
    $counter = $counter + 1;
}


?>