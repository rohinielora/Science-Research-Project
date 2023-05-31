<?php
// this path should point to your configuration file:
include('dbConnectConfig.php');

$db = new mysqli($servername, $username, $password,$dbname);
if (mysqli_connect_errno()) {
  printf("DB error: %s", mysqli_connect_error());
  exit();
}
//for security reasons we remove slashes from the inputs
$subjectId = stripslashes(htmlspecialchars($_POST['subjectId']));
$trial = stripslashes(htmlspecialchars($_POST['trial']));
$run = stripslashes(htmlspecialchars($_POST['run']));
$map = stripslashes(htmlspecialchars($_POST['map']));
$targetNode = stripslashes(htmlspecialchars($_POST['targetNode']));
$node1 = stripslashes(htmlspecialchars($_POST['node1']));
$node2 = stripslashes(htmlspecialchars($_POST['node2']));
$distTargToNode1 = stripslashes(htmlspecialchars($_POST['distTargToNode1']));
$distTargToNode2 = stripslashes(htmlspecialchars($_POST['distTargToNode2']));
$correctAnswer = stripslashes(htmlspecialchars($_POST['correctAnswer']));
$choice = stripslashes(htmlspecialchars($_POST['choice']));
$wasCorrect = stripslashes(htmlspecialchars($_POST['wasCorrect']));
$rt = stripslashes(htmlspecialchars($_POST['rt']));
$percentIntegerCorrect = stripslashes(htmlspecialchars
    ($_POST['percentIntegerCorrect'])); //ro added


$stmt = $db->prepare("INSERT INTO whichIsCloserTable VALUE
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");//I also insert the time //ro 
$stmt->bind_param("siiiiiiiiiiidi", $subjectId,$trial,$run,$map,$targetNode,$node1,$node2,$distTargToNode1,$distTargToNode2,$correctAnswer,$choice,$wasCorrect,$rt,$percentIntegerCorrect);//s=string, i=integer, d=double //ro added
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
  'ErrorNo' => $err,
);
$stmt->close();
$db->close();
echo json_encode($data);

//console.log("Save2WICTable percentIntegerCorrect: "+percentIntegerCorrect);
?>
