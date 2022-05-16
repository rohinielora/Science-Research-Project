<?php
// this path should point to your configuration file:
include('dbConnectConfig.php');

$db =  new mysqli($servername, $username, $password,$dbname);
if (mysqli_connect_errno()) {
  printf("DB error: %s", mysqli_connect_error());
  exit();
}
//for security reasons we remove slashes from the inputs
$subjectId = stripslashes(htmlspecialchars($_POST['subjectId']));
$run = stripslashes(htmlspecialchars($_POST['run']));
$map = stripslashes(htmlspecialchars($_POST['map']));
$trial = stripslashes(htmlspecialchars($_POST['trial']));
$img1 = stripslashes(htmlspecialchars($_POST['img1']));
$img2 = stripslashes(htmlspecialchars($_POST['img2']));
$imgMid = stripslashes(htmlspecialchars($_POST['imgMid']));
$response = stripslashes(htmlspecialchars($_POST['response']));
$correctAns = stripslashes(htmlspecialchars($_POST['correctAns']));
$answeredCorrectly = stripslashes(htmlspecialchars($_POST['answeredCorrectly']));
$runScore = stripslashes(htmlspecialchars($_POST['runScore']));
$totalScore = stripslashes(htmlspecialchars($_POST['totalScore']));
$rt = stripslashes(htmlspecialchars($_POST['rt']));

$stmt = $db->prepare("INSERT INTO isMiddleTable VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?)");//I also insert the time
$stmt->bind_param("siiiiiiiiiiid", $subjectId,$run,$map,$trial,$img1,$img2,$imgMid,$response,$correctAns,$answeredCorrectly,$runScore,$totalScore,$rt);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
  'ErrorNo' => $err,
);
$stmt->close();
$db->close();
echo json_encode($data);
?>
