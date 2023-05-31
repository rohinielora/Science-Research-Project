// Navigation task.
// A trial is an entire walk on the graph - until you reach the target or the max number of steps.
// Each trial consists of however many rounds/steps it takes the subject to reach the target (or the max num of steps)

  

// initDist is the initial distance - 2,3,4 for each round of navigation. Check
function startNavigTask(){ // formerly called startTask


if (navigObj.trial === 0)
  {
  navigObj.TotalNumberofSelections = 0;
  navigObj.TotalNumberofCorrectSelections = 0;
  }
  
  
  navigObj.initDist = navigObj.initDistVec[navigObj.trial]; // note that here trialis still 0 in the first trial - indexing the first element
  navigObj.trial = navigObj.trial+1; // from now on we regard the first trial as trial number 1
  if (navigObj.trial==navigObj.maxTrials) {
      endAllTrials_navig()
      return;
  }  
  setTimeout(function(){flagT=1}, 500);
  navigObj.chNodeLastTrial1 = -1;
  navigObj.chNodeLastTrial2 = -1;
  document.getElementById("nextRoundButton").disabled=true;
  navigObj.nSteps = 0;
  document.getElementById("choiceCardsDiv").style.display="inline";
  document.getElementById("currCardDiv").style.display="inline";
  document.getElementById("currCard").style.display="inline";
  document.getElementById("navigButtonsDiv").style.display="inline";
  document.getElementById("navigTab").style.display="inline";
  document.getElementById("endNavigDiv").style.display="none";

  /*stimulus blocks*/
  navigObj.currNode = Math.floor(Math.random() * (G.nNodes)); //current picture index
  console.log("navigObj.currNode "+navigObj.currNode);
  navigObj.targetNode = findTargGen(navigObj.initDist,navigObj.currNode,G.distMat);//target picture index
  console.log("navigObj.targetNode "+navigObj.targetNode);
  navigObj.currDist = G.distMat[navigObj.targetNode][navigObj.currNode]; // CURRENT distance between target and current Pic

  document.getElementById("currCardText").innerHTML="Your current card:<br>number steps to target is: <b>"+navigObj.initDist;

  /*target picture*/
  document.getElementById("targCardDiv").style.display="inline";
  document.getElementById("targCard").src = exp.pathToImgDir + exp.imgFileNamesArr[navigObj.targetNode];
  document.getElementById("targCard").style.display="inline";

  /*current picture*/
  document.getElementById("currCard").src=exp.pathToImgDir + exp.imgFileNamesArr[navigObj.currNode];

  /* indexes cards/pictures to choose from*/

  // Consider if to change so to use findRandTwoNghbrs_exceptPreviousOptionsIfPossible to make sure
  // the node and options of previous trial are not an option in the curent trial

  navigObj.chNode1=findRandNghbr(G.transMat,navigObj.currNode);
  navigObj.chNode2=findRandNghbrExcept(G.transMat,navigObj.currNode,navigObj.chNode1);

  /* pictures to choose from*/
  document.getElementById("chCard1").src = exp.pathToImgDir + exp.imgFileNamesArr[navigObj.chNode1];
  document.getElementById("chCard1").style.display="inline";

  document.getElementById("chCard2").src = exp.pathToImgDir + exp.imgFileNamesArr[navigObj.chNode2];
  document.getElementById("chCard2").style.display="inline";

  document.getElementById("choiceCardsDiv").style.display="inline";

  timeLast = new Date();

  // store choice option nodes for next trial
  navigObj.chNodeLastTrial1 = navigObj.chNode1;
  navigObj.chNodeLastTrial2 = navigObj.chNode2;


}

function navigTrial(choice){// check subject choices
  navigObj.nSteps = navigObj.nSteps+1;// number of current trial steps
  var thisTime=new Date();
  navigObj.rt = calResponseTime(thisTime,timeLast);

  // save previous node and dist
  navigObj.prevNode = navigObj.currNode;
  navigObj.prevDist =   navigObj.currDist;


  /*checking how many good choices exists*/
  navigObj.distChNode1 = G.distMat[navigObj.targetNode][navigObj.chNode1];// number of steps from choice 1
  navigObj.distChNode2 = G.distMat[navigObj.targetNode][navigObj.chNode2];// number of steps from choice 2

  // how many available correct choices were there. Can delete this (calculate at analysis)
  if((navigObj.distChNode2>navigObj.prevDist&&navigObj.distChNode1>navigObj.prevDist)||(navigObj.distChNode2<navigObj.prevDist&&navigObj.distChNode1>=navigObj.prevDist)||(navigObj.distChNode2>=navigObj.prevDist&&navigObj.distChNode1<navigObj.prevDist)){
    navigObj.nGoodOpt=1;
  }else{
    if(navigObj.distChNode2==navigObj.prevDist&&navigObj.distChNode1==navigObj.prevDist){
      navigObj.nGoodOpt=3; // both choices and pressing Neither were all good options. this can't happen on a square graph
    }else{
      navigObj.nGoodOpt=2;
    }
  }
  
  
  
  // update what the choice was
  if (choice==1) {//UP HAS BEEN CHOSEN
    navigObj.currNode = navigObj.chNode1;
    document.getElementById("currCard").src=exp.pathToImgDir + exp.imgFileNamesArr[navigObj.currNode];
    navigObj.choice = 1;
    if (navigObj.distChNode1<navigObj.distChNode2){
      navigObj.wasCorrect = 1;
        navigObj.TotalNumberofSelections++;
        navigObj.TotalNumberofCorrectSelections++;
        console.log("TotalNumberofSelections" + navigObj.TotalNumberofSelections);
        console.log("TotalNumberofCorrectSelections (after answering correct answer)" + navigObj.TotalNumberofCorrectSelections);

    } else if (navigObj.distChNode1>navigObj.distChNode2){
      navigObj.wasCorrect = 0;
        navigObj.TotalNumberofSelections++;
        console.log("TotalNumberofSelections" + navigObj.TotalNumberofSelections);
        console.log("TotalNumberofCorrectSelections" + navigObj.TotalNumberofCorrectSelections);        
        
        
    } else if ((navigObj.distChNode1==navigObj.distChNode2) && (navigObj.distChNode1>navigObj.prevDist)){ // the chosen option is worse than choosing neither
      navigObj.wasCorrect = 0
        navigObj.TotalNumberofSelections++;
        console.log("TotalNumberofSelections" + navigObj.TotalNumberofSelections);
        console.log("TotalNumberofCorrectSelections" + navigObj.TotalNumberofCorrectSelections);
    }
    
    
    
  } else if(choice==2) {
      navigObj.currNode = navigObj.chNode2;
      document.getElementById("currCard").src=exp.pathToImgDir + exp.imgFileNamesArr[navigObj.currNode];
      navigObj.choice = 2;
     
      if (navigObj.distChNode1<navigObj.distChNode2){
        navigObj.wasCorrect = 0;
          navigObj.TotalNumberofSelections++;
        console.log("TotalNumberofSelections" + navigObj.TotalNumberofSelections);
        console.log("TotalNumberofCorrectSelections" + navigObj.TotalNumberofCorrectSelections);
        
        
      } else if (navigObj.distChNode1>navigObj.distChNode2){
        navigObj.wasCorrect = 1;
        navigObj.TotalNumberofSelections++;
        navigObj.TotalNumberofCorrectSelections++;
        console.log("TotalNumberofSelections" + navigObj.TotalNumberofSelections);
        console.log("TotalNumberofCorrectSelections (after answering correct answer)" + navigObj.TotalNumberofCorrectSelections);
        
        
      } else if ((navigObj.distChNode1==navigObj.distChNode2) && (navigObj.distChNode2>navigObj.prevDist)){ // the chosen option is worse than choosing neither
      navigObj.wasCorrect = 0;
      navigObj.TotalNumberofSelections++;
        console.log("TotalNumberofSelections" + navigObj.TotalNumberofSelections);
        console.log("TotalNumberofCorrectSelections" + navigObj.TotalNumberofCorrectSelections);
      }
      
      
      
  } else if (choice===0){
      navigObj.choice = 0;
      if ((navigObj.distChNode1>navigObj.prevDist)&&(navigObj.distChNode2>navigObj.prevDist)) { // if both options were worst than the current node
        navigObj.wasCorrect = 1;
        navigObj.TotalNumberofSelections++;
        navigObj.TotalNumberofCorrectSelections++; //ro: this variable is not working correctly
        console.log("TotalNumberofCorrectSelections (after answering correct answer in neither)" + navigObj.TotalNumberofCorrectSelections);
        console.log("TotalNumberofSelections" + navigObj.TotalNumberofSelections);

      } else { // if at least one of the options was better than the current node
        navigObj.wasCorrect = 0;
        navigObj.TotalNumberofSelections++;

        console.log("TotalNumberofSelections" + navigObj.TotalNumberofSelections);
        console.log("TotalNumberofCorrectSelections" + navigObj.TotalNumberofCorrectSelections);
      }
  }

  // update current dist (currNode was already updated)
  navigObj.currDist = G.distMat[navigObj.targetNode][navigObj.currNode];

  // Save to table.
  // note that that thesaved chNode1 and chNode2 are the options from the previous trial,
  // and currNode, currDist are in respect to the node that was chosen in the previous trial.
  
  navigObj.RatioCorrect = (navigObj.TotalNumberofCorrectSelections/navigObj.TotalNumberofSelections);
  
  navigObj.percentIntegerCorrect = Math.round((navigObj.TotalNumberofCorrectSelections/navigObj.TotalNumberofSelections)*100);
  
  save2navigTable();

  /*checking reaching to target or too many trials*/
  if ((navigObj.currNode==navigObj.targetNode)||navigObj.nSteps>=navigObj.maxSteps){
    document.getElementById("endNavigDiv").style.display="inline";
    document.getElementById("currCardDiv").style.display="none";
    document.getElementById("chCard2").style.display="none";
    document.getElementById("chCard1").style.display="none";
    document.getElementById("targCardDiv").style.display="none";
    document.getElementById("currCard").style.display="none";
    document.getElementById("navigButtonsDiv").style.display="none";
    if(navigObj.nSteps<navigObj.maxSteps){// end trial if number of steps exceeded max Task number of steps
    
      CurrentmaxTrials = navigObj.maxTrials - 1;
      document.getElementById("endNavigText").innerHTML = "<b> Target card has been reached,<br> number of steps taken = "+navigObj.nSteps.toString()+"<br> <br> Current round number: "+navigObj.trial+" out of "+CurrentmaxTrials+"<br>";
       
       
    }else{
      document.getElementById("endNavigText").innerHTML = "<b> too many steps";
    }
    document.getElementById("endNavigText").style.display="inline";
    document.getElementById("nextRoundButton").disabled=false;
    // not sure need this return - they move toi the next trial using a button,
    // this return is here just to make sure the current function doesn't do anything else.
    return;
  }

  navigObj.chNodeLastTrial1 = navigObj.chNode1;
  navigObj.chNodeLastTrial2 = navigObj.chNode2;
  [navigObj.chNode1,navigObj.chNode2]=findRandTwoNghbrs_exceptPreviousOptionsIfPossible(G.transMat,navigObj.currNode,navigObj.chNodeLastTrial2,navigObj.chNodeLastTrial1); //find next indexes for options. In  a square grid trying to avoid the last two options is meaningless, it never happens. Note that the previous node is not avoided.



  // var tlap = Math.floor((Math.random() * 1000) + 750);
  // setTimeout(myTimeout, tlap,3);
  dispPic()
}
function dispPic(){
  document.getElementById("chCard2").style.display="inline";
  document.getElementById("chCard1").style.display="inline";
  document.getElementById("chCard2").src = exp.pathToImgDir + exp.imgFileNamesArr[navigObj.chNode2];
  document.getElementById("chCard1").src = exp.pathToImgDir + exp.imgFileNamesArr[navigObj.chNode1];
  document.getElementById("currCardText").innerHTML="Your current card:<br>Number steps to target is: <b>"+navigObj.currDist;

  timeLast = new Date();
}

// Alon: this is the function that was reached when hitting "next round" button, but we took this button out
// function conExp_navig(docon){
//   if(docon==1){
//
//     // document.getElementById("dispPc").style.display="none";
//     // document.getElementById("skip").style.display="none";
//
//     if (navigObj.initDist<maxdS){
//       startNavigTask(navigObj.initDist+1); // ndS is number of navigation trials
//     }else{
//       document.getElementById("navigTab").style.display="none";
//       document.getElementById("nextRoundButton").disabled=false;
//       document.getElementById("endExpText").innerHTML = "The experiment is complete! Thank you for participating";
//     }
//   }
// }

function endAllTrials_navig(){// end navigation task function
navigObj.RatioCorrect = (navigObj.TotalNumberofCorrectSelections/navigObj.TotalNumberofSelections);
navigObj.percentIntegerCorrect = Math. round((navigObj.TotalNumberofCorrectSelections/navigObj.TotalNumberofSelections)*100);

console.log("ratioCorrect:" + navigObj.RatioCorrect);
        console.log("TotalNumberofSelections" + navigObj.TotalNumberofSelections);
        console.log("TotalNumberofCorrectSelections" + navigObj.TotalNumberofCorrectSelections);
BonusAmount = Math. round((navigObj.RatioCorrect)*5);
    
    document.getElementById("navigTab").style.display="none";
    document.getElementById("navigTab").remove;
 //   document.getElementById("endExpText").innerHTML = "Well Done! Experiment is Complete";
 //   document.getElementById("endExpText").innerHTML= "Based on your "+navigObj.percentCorrect+"accuracy rate, your bonus reward is "_" pounds!";
    document.getElementById("endExpText").innerHTML= "The experiment is complete. Well done!<br> Based on your accuracy rate of "+navigObj.percentIntegerCorrect+"%, your bonus reward is  £"+BonusAmount+". <br> <br> <bf> Fitbit App for the Brain <br> Oxford Centre for Functional MRI of the Brain </bf>";

}
