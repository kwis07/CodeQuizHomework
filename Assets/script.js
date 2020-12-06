window.addEventListener('DOMContentLoaded', (event) => {

	//Variables
	const startTimer = 60;
	let time = 60;
	let score = 0;
	let questionCounter = 0;
let timeset;
let answers = document.querySelectorAll('#quizContainer button');


let highscoreArray = [];


(localStorage.getItem('highscoreArray')) ? highscoreArray = JSON.parse(localStorage.getItem('highscoreArray')): highscoreArray = [];
	

// Declarations 
let queryElement = (element) => {
return document.querySelector(element);
}
	
//Function if the game has started
let onlyDisplaySection = (element) => {
let sections = document.querySelectorAll("section");
Array.from(sections).forEach((userItem) => {
	userItem.classList.add('hide');
});
queryElement(element).classList.remove('hide');
}
	

let highscoreHtmlReset = () => {
queryElement('#highScores div').innerHTML = "";
var i = 1;
highscoreArray.sort((a, b) => b.score - a.score);
Array.from(highscoreArray).forEach(check =>
{
	var scores = document.createElement("div");
	scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
	queryElement('#highScores div').appendChild(scores);
	i = i + 1
});
i = 0;
Array.from(answers).forEach(answer => {
	answer.classList.remove('disable');
});
}

//Questions
let setQuestionData = () => {
	queryElement('#quizContainer p').innerHTML = questions[questionCounter].title;
	queryElement('#quizContainer button:nth-of-type(1)').innerHTML = `1. ${questions[questionCounter].choices[0]}`;
	queryElement('#quizContainer button:nth-of-type(2)').innerHTML = `2. ${questions[questionCounter].choices[1]}`;
	queryElement('#quizContainer button:nth-of-type(3)').innerHTML = `3. ${questions[questionCounter].choices[2]}`;
	queryElement('#quizContainer button:nth-of-type(4)').innerHTML = `4. ${questions[questionCounter].choices[3]}`;
}

//Function of the question (correct or incorrect)
let quizUpdate = (answerCopy) => {
	queryElement('#scoreIndicator p').innerHTML = answerCopy;
	queryElement('#scoreIndicator').classList.remove('invisible', scoreIndicator());
	Array.from(answers).forEach(answer =>
	{
		answer.classList.add('disable');
	});

// If all the questions are answered 
setTimeout(() => {
	if (questionCounter === questions.length) {
		onlyDisplaySection("#finish");
		time = 0;
			queryElement('#time').innerHTML = time;
	} else {

setQuestionData();
	
		Array.from(answers).forEach(answer => {
		answer.classList.remove('disable');
			});
		}
	}, 1000);
}


let myTimer = () => {
	if (time > 0) {
		time = time - 1;
		queryElement('#time').innerHTML = time;
	} else {
		clearInterval(clock);
		queryElement('#score').innerHTML = score;
		onlyDisplaySection("#finish");
	}
}

// Function for timer//
let clock;
queryElement("#intro button").addEventListener("click", (event) => {
	
	setQuestionData();
	onlyDisplaySection("#quizContainer");
	clock = setInterval(myTimer, 1000);
});



let scoreIndicator = () => {
	clearTimeout(timeset);
	timeset = setTimeout(() => {
	    queryElement('#scoreIndicator').classList.add('invisible');
	}, 1000);
}


Array.from(answers).forEach(check => {
	check.addEventListener('click', function (event) {
		
		if (this.innerHTML.substring(3, this.length) === questions[questionCounter].answer) {
			score = score + 1;
			questionCounter = questionCounter + 1;
			quizUpdate("Your answer is correct");
		}else{
			
			time = time - 10;
			questionCounter = questionCounter + 1;
			quizUpdate("Your answer is incorrect");
		}
	});
});


queryElement("#reset").addEventListener("click", () => {
	time = startTimer;
	score = 0;
	questionCounter = 0;
	onlyDisplaySection("#intro");
});
	//High scores
queryElement("#scores").addEventListener("click", (event) => {
	event.preventDefault();
	clearInterval(clock);
	queryElement('#time').innerHTML = 0;
	time = startTimer;
	score = 0;
	questionCounter = 0;
	onlyDisplaySection("#highScores");
	highscoreHtmlReset();
});

//Submitting score
let errorIndicator = () => {
	clearTimeout(timeset);
	timeset = setTimeout(() => {
		queryElement('#errorIndicator').classList.add('invisible');
	}, 3000);
}
//Debugging
queryElement("#records button").addEventListener("click", () => {
	let initialsRecord = queryElement('#initials').value;
	if (initialsRecord === ''){
		queryElement('#errorIndicator p').innerHTML = "Please enter at least 1 character";
		queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
	} else if (initialsRecord.length > 5) {
		queryElement('#errorIndicator p').innerHTML = "not more than 5 characters allowed";
	} else if (initialsRecord.match(/[[A-Za-z]/) === null) {
		queryElement('#errorIndicator p').innerHTML = "Please only use letters.";
		queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
	} else {
		
		highscoreArray.push({
			"initialRecord": initialsRecord,
			"score": score
		});
		
		localStorage.setItem('highscoreArray', JSON.stringify(highscoreArray));
		queryElement('#highScores div').innerHTML = '';
		onlyDisplaySection("#highScores");
		highscoreHtmlReset();
		queryElement("#initials").value = '';
	}
});

queryElement("#clearScores").addEventListener("click", () => {
	highscoreArray = [];
	queryElement('#highScores div').innerHTML = "";
	localStorage.removeItem('highscoreArray');
});

});