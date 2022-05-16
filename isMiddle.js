function isMiddle(){ // is it in the middle task

	document.getElementById("isMiddleTab").style.display="inline";
	document.getElementById("middleButtonsDiv").style.display="block";
	document.getElementById("middleNextTrialDiv").style.display="none";

	middleObj.imgMid = Math.floor(Math.random() * (G.nNodes));

	// choose transition matrix to use - with or without missing links
	if (exp.mapsVec[exp.curRun]==exp.missLinkMapNum){
		var transMat = G.transMatMiss
	}else{
		var transMat = G.transMat
	}
	// get two neighbours
	[middleObj.img1,middleObj.img2]=findRandTwoNghbrs(transMat,middleObj.imgMid);

	middleObj.correctAns=1;

	if(Math.random()<0.5){ // trials where the image was not in the middle
		middleObj.correctAns=0;
		// get a random imgMid,
		var newImgMid=middleObj.imgMid;
		newImgMid = Math.floor(Math.random() * (G.nNodes));
		// check it is not the img1 or img2, and also not a neighbourof both
		while(newImgMid==middleObj.img1 || newImgMid==middleObj.img2 ||
			(transMat[newImgMid].includes(middleObj.img1) && transMat[newImgMid].includes(middleObj.img2)) ) {
				newImgMid = Math.floor(Math.random() * (G.nNodes));
			}
			middleObj.imgMid = newImgMid;
		}

		middle_img1.src = exp.pathToImgDir + exp.imgFileNamesArr[middleObj.img1];
		middle_img2.src = exp.pathToImgDir + exp.imgFileNamesArr[middleObj.img2];
		middle_imgMid.src = exp.pathToImgDir + exp.imgFileNamesArr[middleObj.imgMid];

		middleObj.imgPresentTime = new Date();
	}

	function conExp_middle(ans){// check if correct and give feedback. previouly called isItMiddleYN
		middleObj.trial = middleObj.trial+1;
		document.getElementById("middleButtonsDiv").style.display="none";
		document.getElementById("middleNextTrialDiv").style.display="inline";
		middleObj.response = ans;
		var  buttonPressTime = new Date();
		middleObj.rt = calResponseTime(buttonPressTime,middleObj.imgPresentTime);
		if (middleObj.correctAns==middleObj.response){
			middleObj.answeredCorrectly =1;
			middleObj.runScore = middleObj.runScore+1;
			exp.totalScore = exp.totalScore+1;
		} else {
			middleObj.answeredCorrectly = 0;
		}

		save2isMiddleTable();// save data into sql table
		if (middleObj.trial>middleObj.maxTrial){// if number of trials exceeded middleObj.maxTrial start navigation task with intial distance 2 between current picture and target picture
			endIsMiddle()
		}
	}

	function endIsMiddle(){// go to next task
		if(exp.curRun<9){
			startNavigTask(2);
		}else{
			startWhichIsCloser(0);
		}
	}
