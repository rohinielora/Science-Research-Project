  /*task functions*/
// the missing links questions are for recangular only - need to be checked for other structures!!!
function startWhichIsCloser(trial){//distance estimation, formerly called startQustions
  closerObj.percentIntegerCorrect =0;
  closerObj.trial = trial;
  if(closerObj.trial===0){
    closerObj.totalCorrect = 0; // total number of correct answers
    closerObj.trial = 1;
  }
 // closerObj.trial = closerObj.trial+1;
  closerObj.correctAnswer = 0; // what is the correct answer, regardless of what the subject chose
console.log("closerObj.trial Value: " +closerObj.trial);

  document.getElementById("globalInstructions").style.display="none";
  document.getElementById("whichIsCloserTab").style.display="inline";
  document.getElementById("buttonCloser1").style.visibility="visible";
  document.getElementById("buttonCloser2").style.visibility="visible";
  document.getElementById("buttonCloserNext").style.visibility="hidden";
  document.getElementById("closerAnswerRecordText").style.visibility="hidden";
  //c=1;

  /*print instructions:"*/
  document.getElementById("closerInsText").innerHTML= "Session 2";
  document.getElementById("closerInsText").innerHTML="You are in the first game of Session 2. <br> Choose the card (Card 1 or Card 2) that is closer to the target card that appears on the right.";
  document.getElementById("closerTargetText").innerHTML="Your target card is:<br> ";

  /*stimulus blocks*/
  closerObj.correctAnswer = 0;

  closerObj.targetNode = Math.floor(Math.random() * (G.nNodes));// target index
  var ran1 = Math.random();
  if (ran1<0.333){// find the indexes of the pictures to choose from. In a 1/3 of cases dists are 2 and 4.
    closerObj.node1 = findTargGen(2,closerObj.targetNode,G.distMat);
    closerObj.node2 = findTargGen(4,closerObj.targetNode,G.distMat);
  }else{
    if(ran1<0.6667){ // in 4/9 of cases, the distances are 2 and 3
      closerObj.node1 = findTargGen(2,closerObj.targetNode,G.distMat);
      closerObj.node2 = findTargGen(3,closerObj.targetNode,G.distMat);
    }else{ // in 2/9 of cases, distances are 3 and 4
      closerObj.node1 = findTargGen(3,closerObj.targetNode,G.distMat);
      closerObj.node2 = findTargGen(4,closerObj.targetNode,G.distMat);
    }
  }

  closerObj.distTargToNode1 = G.distMat[closerObj.targetNode][closerObj.node1];
  closerObj.distTargToNode2 = G.distMat[closerObj.targetNode][closerObj.node2];

  if (closerObj.distTargToNode1<closerObj.distTargToNode2){
    closerObj.correctAnswer=1;
  }else{
    if (closerObj.distTargToNode1==closerObj.distTargToNode2){
      closerObj.correctAnswer = 0; 
    }else{
      closerObj.correctAnswer = 2;
    }
  }

  // Flip between node1 and node2 so the correct answer in half the times is node2
  var tmpNode1 = closerObj.node1;
  var ran2 = Math.random();
  if (ran2 <0.5){
    closerObj.node1 = closerObj.node2;
    closerObj.node2 = tmpNode1;
    if (closerObj.correctAnswer==1){
      closerObj.correctAnswer = 2;
    }else{
      if(closerObj.correctAnswer==2){
        closerObj.correctAnswer=1;
      }
    }
  }

  // show the images
  /*the target picture*/
  document.getElementById("closerTargetImg").src = exp.pathToImgDir + exp.imgFileNamesArr[closerObj.targetNode];
  document.getElementById("closerTargetImg").style.display="inline";
  /*  other pictures*/
  document.getElementById("closerIm1").src = exp.pathToImgDir + exp.imgFileNamesArr[closerObj.node1];
  document.getElementById("closerIm1").style.display="inline";
  document.getElementById("closerIm2").src = exp.pathToImgDir + exp.imgFileNamesArr[closerObj.node2];
  document.getElementById("closerIm2").style.display="inline";

  timeLast = new Date();
}

function conExp_isCloser(choice){// check subject response

  closerObj.choice = choice;
//  closerObj.trial = closerObj.trial+1;
  var  thisTime=new Date();
  closerObj.rt = calResponseTime(thisTime,timeLast);

  /*  correct / non-correct*/
  console.log("subject chose card: " + choice);
  if(closerObj.correctAnswer==choice || closerObj.correctAnswer===0){
    closerObj.totalCorrect = closerObj.totalCorrect+1; 
    //variable for number of correct answers
 
    closerObj.wasCorrect = 1;
    console.log("closerObj.totalCorrect value when the user selects the right answer: "+ closerObj.totalCorrect);

  }else{
    closerObj.wasCorrect = 0;
    console.log("closerObj.totalCorrect value when the user selects the wrong answer: "+ closerObj.totalCorrect);

  }
  
    closerObj.RatioCorrect = (closerObj.totalCorrect/closerObj.trial);
    closerObj.percentIntegerCorrect = Math.round(closerObj.RatioCorrect*100.0);

    console.log("percentCorrect:" + closerObj.percentIntegerCorrect);
    console.log("TotalNumberofSelections" + closerObj.trial);
    console.log("TotalNumberofCorrectSelections" + closerObj.totalCorrect);
    
  console.log("saving data");
  console.log(" ");
  save2whichIsCloserTable();// save data in sql table

  document.getElementById("closerAnswerRecordText").style.visibility="visible";
  document.getElementById("buttonCloser1").style.visibility="hidden";
  document.getElementById("buttonCloser2").style.visibility="hidden";
  document.getElementById("buttonCloserNext").style.visibility="visible";


  if (closerObj.trial>closerObj.maxTrial){// if number of trials exceeded middleObj.maxTrial start navigation task with intial distance 2 between current picture and target picture
      endwhichIsCloser()
    }


}

function closerNextRound(){
    
  currentTrialNum = closerObj.trial + 1;
  maxTrialNum = closerObj.maxTrial - 1;

  document.getElementById("closerAnswerRecordText").innerHTML="Current round number: "+currentTrialNum+" out of "+maxTrialNum+" ";
  
  
  closerObj.trial = closerObj.trial+1;
  document.getElementById("closerAnswerRecordText").style.visibility="hidden";
  document.getElementById("closerIm1").style.display="none";
  document.getElementById("closerIm2").style.display="none";

  timeLast = new Date();
  if (closerObj.trial<closerObj.maxTrial){
    startWhichIsCloser(closerObj.trial);
  }else{
      closerObj.trial = 0;
      document.getElementById("whichIsCloserTab").style.display="none";
      startNavigTask(2); // start navigation task with initial distance 2
      // document.getElementById("whichIsCloser_feedback").style.display="inline";
      // document.getElementById("Qfeedback").style.display="inline";
      // precntCor = Math.ceil(100*closerObj.totalCorrect/qend);
      // document.getElementById("Qfeedback").innerHTML = "Thank you, you have done: %" + precntCor + "correct";

  }
  

}

  

function endwhichIsCloser(){// go to next task
      document.getElementById("whichIsCloserTab").style.display="none";
      // document.getElementById("whichIsCloser_feedback").style.display="inline";
      // document.getElementById("Qfeedback").style.display="inline";
      // precntCor = Math.ceil(100*closerObj.totalCorrect/qend);
      // document.getElementById("Qfeedback").innerHTML = "Thank you, you have done: %" + precntCor + "correct";
      startNavigTask(2); // start navigation task with initial distance 2
  }
