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
$trial = stripslashes(htmlspecialchars($_POST['trial']));
$run = stripslashes(htmlspecialchars($_POST['run']));
$map = stripslashes(htmlspecialchars($_POST['map']));
$initDist = stripslashes(htmlspecialchars($_POST['initDist']));
$target = stripslashes(htmlspecialchars($_POST['target']));
$prevNode = stripslashes(htmlspecialchars($_POST['prevNode']));
$prevDist = stripslashes(htmlspecialchars($_POST['prevDist']));
$currNode = stripslashes(htmlspecialchars($_POST['currNode']));
$currDist = stripslashes(htmlspecialchars($_POST['currDist']));
$choice = stripslashes(htmlspecialchars($_POST['choice']));
$chNode1 = stripslashes(htmlspecialchars($_POST['chNode1']));
$chNode2 = stripslashes(htmlspecialchars($_POST['chNode2']));
$distChNode1 = stripslashes(htmlspecialchars($_POST['distChNode1']));
$distChNode2= stripslashes(htmlspecialchars($_POST['distChNode2']));
$correct= stripslashes(htmlspecialchars($_POST['correct']));
$nGoodOpt = stripslashes(htmlspecialchars($_POST['nGoodOpt']));
$percentIntegerCorrect = stripslashes(htmlspecialchars($_POST['percentIntegerCorrect'])); //ro added
$rt = stripslashes(htmlspecialchars($_POST['rt']));
$stmt = $db->prepare("INSERT INTO navigTable VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");//I also insert the time //ro
$stmt->bind_param("siiiiiiiiiiiiiiiidd", $subjectId,$trial,$run,$map,$initDist,$target,$prevNode,$prevDist,$currNode,$currDist,$choice,$chNode1,$chNode2,$distChNode1,$distChNode2,$correct,$nGoodOpt,$percentIntegerCorrect,$rt);// ro added //s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
  'ErrorNo' => $err,
);
$stmt->close();
$db->close();
echo json_encode($data);
?>
