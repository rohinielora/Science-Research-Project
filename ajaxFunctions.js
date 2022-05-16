// functions to read and write from sql tables

function getParamOfLastTableRow(tableName,paramStr){// counts the number of repetitions in the task part that was played before
	var param
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myData = JSON.parse(this.responseText);
			if (myData.length>0){
				//get the param value of the last row with the current subjectId and tableName
				param = Number(eval("myData[myData.length-1]." + paramStr));
			}else{
				param=-1;
			}
		}
	};
	xhttp.open("GET", "getParamFromTable.php?tableName="+tableName+"&subjectId="+exp.subjectId+"&paramStr="+paramStr, false);
	xhttp.send();
	return param;
}


function getRunNumFromTable(tableName){ // check the run number of the last trial saved to the table
	var run;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myData = JSON.parse(this.responseText);
			if (myData.length>0){
				run = Number(myData[myData.length-1].run);
			}else{
				run=0;
			}
		}
	};
	xhttp.open("GET", "getRunAndTrialNumber.php?tableName="+tableName+"&subjectId="+exp.subjectId, false);
	xhttp.send();
	return run;
}

function getNavigDetailsFromTable(tableName){// counts the number of repetitions in the task part that was played before
	var trial, step, curImg, target;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myData = JSON.parse(this.responseText);
			if (myData.length>0){
				trial = Number(myData[myData.length-1].trial);
				step = Number(myData[myData.length-1].step);
				curNode = Number(myData[myData.length-1].curNode);
				targetNode = Number(myData[myData.length-1].targetNode);
			}else{
				trial=0;
				step=0;
				curNode=-1;
				targetNode=-1;
			}
		}
	};
	xhttp.open("GET", "getRunAndTrialNumber.php?tableN="+tableName+"&subjectId="+exp.subjectId, false);
	xhttp.send();
	return [trial, step, curNode, targetNode];
}


function getScore(tableName){// check the number of points that was earned until now
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myData = JSON.parse(this.responseText);
			var len = myData.length;
			if (len>0){
				score = Number(myData[len-1].score);
			}else{
				score=0;
			}
		}
	};
	xhttp.open("GET", "getScore.php?tableName="+tableName+"&subjectId="+exp.subjectId, false);
	xhttp.send();
	return score;
}

/*save variable into sql table*/
function save2imagesFilesTable(sqlStr){ // save in sql table
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			 console.log("wrote new map:" + this.responseText);
		}
	};
	xhttp.open("POST", "save2imagesFilesTable.php", true);
	xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhttp.send("sqlStr="+sqlStr);
}


function save2subjectDetailsAndStartTimeTable(){//
	var d = new Date();
	$.ajax({
		type:'POST',
		url: 'save2subjectDetailsAndStartTimeTable.php',
		data: {subjectId:exp.subjectId,d:d},
		async: true,
		dataType:'json',
		success: function() {
		}
	});

}

function save2learnRandomWalkTable(subjectId, run, map, trial, nodeNumImgOld, imgFileOld, nodeNumImgNew, imgFileNew, rt){// previously -  saveDataDBnotU: save to cover table
	var ans=-1;
	$.ajax({
		type:'POST',
		url: 'save2learnRandomWalkTable.php',
		data: {subjectId: subjectId, run:run, map:map, trial:trial, nodeNumImgOld:nodeNumImgOld, imgFileOld:imgFileOld,
			nodeNumImgNew:nodeNumImgNew, imgFileNew:imgFileNew, rt:rt},
		async: true,
		dataType:'json',
		success: function(ans) {
		}
	});
	return ans;
}


function save2learnRandomPairTable(subjectId,Tnum,npic1,npic2,rt,c,TableName){
	var ans=-1;
	$.ajax({
		type:'POST',
		url: 'save2learnRandomPairs.php',
		data: {name: subjectId, run: Tnum,map:exp.curMap,picN1:npic1,picN2:npic2,RTv:rt,tableN:TableName},
		async: true,
		dataType:'json',
		success: function(ans) {
		}
	});
	return ans;
}


function save2pilesTable(){
	$.ajax({
		type:'POST',
		url: 'save2pilesTable.php',//'save2pileTable.php',
		data: {subjectId: exp.subjectId, run: exp.curRun, map:exp.curMap, trial:pileObj.trial,
	    pile1Img1:pileObj.pile1Img1,pile1Img2:pileObj.pile1Img2,pile1Img3:pileObj.pile1Img3,
			pile2Img1:pileObj.pile2Img1,pile2Img2:pileObj.pile2Img2,pile2Img3:pileObj.pile2Img3,
			targetNode: pileObj.targetNode,response: pileObj.response,correctPile: pileObj.correctPile, answeredCorrectly: pileObj.answeredCorrectly,
			runScore:pileObj.runScore, totalScore: exp.totalScore,rt:pileObj.rt}, // save data into the piles table in sql
		async: true,
		dataType:'json',
		success: function(ans) {
		}
	});
}

function save2isMiddleTable(){
	$.ajax({
		type:'POST',
		url: 'save2isMiddleTable.php',
		data: {subjectId: exp.subjectId, run: exp.curRun, map:exp.curMap, trial:middleObj.trial,
			img1:middleObj.img1, img2:middleObj.img2, imgMid:middleObj.imgMid,
			response: middleObj.response, correctAns:middleObj.correctAns, answeredCorrectly: middleObj.answeredCorrectly,
			runScore:middleObj.runScore, totalScore: exp.totalScore,rt:middleObj.rt},
		async: true,
		dataType:'json',
		success: function(ans) {
		}
	});
}

function save2navigTable(Tchoice,fnGood,fnGoodInD,corTask,RTt){//inMv12,cim1,cim2,prC: save things into task table
	$.ajax({
		type:'POST',
		url: 'save2navigTable.php',//save2navigTable.php',
		data: {name: subjectId, run: exp.curRun,map:exp.curMap,dS:ndS,target:tar1,inP:inP,choice:Tchoice,inPlast:inPlast,in1R:inRlast,in1L:inLlast,isCorrect:corTask,nCor:fnGood,nCorInD:fnGoodInD,curDS:LastnSt,curDSnew:nSt,RT:RTt,totalScore:exp.totalScore},
		async: false,
		dataType:'json',
		success: function(ans) {
		}
	});
}

function save2whichIsCloserTable(cq,iq1,iq2,corQ,RTq){//inMv12,cim1,cim2,prC, save to distance estimation questions table
	$.ajax({
		type:'POST',
		url: 'save2whichIsCloserTable.php',
		data: {name: subjectId, run: exp.curRun,map:exp.curMap,target:tarQ,choice:cq,im1:iq1,im2:iq2,isCorrect:corQ,RT:RTq,totalScore:exp.totalScore},
		async: false,
		dataType:'json',
		success: function(ans) {
		}
	});
}



function calCorQ(tableName,name){// sum over the number of correct answers as save in the column 'isCorr'
	var sumCor=0;
	var j;
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myData = JSON.parse(this.responseText);
			var len = myData.length;
			if (len>0){
				for(j=0;j<len;j++){
					sumCor+=Number(myData[j].isCorr);
				}
			}
		}
	};
	xhttp.open("GET", "findIscor.php?tableN="+tableName+"&Fname="+name+"&run="+exp.curRun, false);
	xhttp.send();
	return sumCor;
}


function TaskdS(name){// check what was the initial distance between initial picture and target in the last time participant played the navigation task
	var cds;
	var xhttp;
	var tableName = "navigTable";
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myData = JSON.parse(this.responseText);
			var len = myData.length;
			if (len>0){
				cds = Number(myData[len-1]);
			}else{
				cds=0;
			}
		}
	};
	xhttp.open("GET", "find_dSnewWB.php?tableN="+tableName+"&Fname="+name, false);
	xhttp.send();

	return cds;
}
