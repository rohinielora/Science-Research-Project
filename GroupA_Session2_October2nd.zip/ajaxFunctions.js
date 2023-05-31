// functions to read and write from sql tables

function getParamOfLastTableRow(tableName,paramStr){// counts the number of repetitions in the task part that was played before
	var param
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myData = JSON.parse(this.responseText);
			console.log("My data length:"+myData.length);
			if (myData.length>0){
				//get the param value of the last row with the current subjectId and tableName
				param = Number(eval("myData[myData.length-1]." + paramStr));
				console.log("My data length next: "+param);
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




function save2navigTable(){
	$.ajax({
		type:'POST',
		url: 'save2navigTable.php',//save2navigTable.php',
		data: {subjectId:exp.subjectId,trial:navigObj.trial,
			run: exp.curRun,
			map:exp.curMap,
			initDist:navigObj.initDist,
			target:navigObj.targetNode,
			prevNode:navigObj.prevNode, 
			prevDist:navigObj.prevDist,
			currNode:navigObj.currNode,
			currDist:navigObj.currDist,
			choice:navigObj.choice,
			chNode1:navigObj.chNode1,
			chNode2:navigObj.chNode2,
			distChNode1:navigObj.distChNode1,
			distChNode2:navigObj.distChNode2,
			correct:navigObj.wasCorrect,
			nGoodOpt:navigObj.nGoodOpt,
			percentIntegerCorrect:navigObj.percentIntegerCorrect,  //ro added
			rt:navigObj.rt}, 
		async: true,
		dataType:'json',
		success: function(ans) {
		}
	});
}

function save2whichIsCloserTable(){
	$.ajax({
		type:'POST',
		url: 'save2whichIsCloserTable.php',
		data: {subjectId: exp.subjectId,trial:closerObj.trial,
			run: exp.curRun,
			map:exp.curMap,
			numCorrect:closerObj.numCorrect, 
			targetNode:closerObj.targetNode,
			node1:closerObj.node1,
			node2:closerObj.node2,
			distTargToNode1:closerObj.distTargToNode1,
			distTargToNode2:closerObj.distTargToNode2,
			correctAnswer:closerObj.correctAnswer, 
			choice: closerObj.choice,
			wasCorrect:closerObj.wasCorrect,
			rt: closerObj.rt,
			percentIntegerCorrect: closerObj.percentIntegerCorrect}, //ro added
		async: true,
		dataType:'json',
		success: function(ans) {
		}
	});
}




