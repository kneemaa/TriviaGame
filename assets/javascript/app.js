$(document).ready(function() {
	var timeRemaining = 30;
	var clockRunning = false;
	var gameStarted = false;
	var intervalId;
	var questionNumber = 0;
	/*var questions = {
		firstQuestion: {
			question: "Which letter?",
			correctAnswer: "A",
			firstWrongAnswer: "B",
			secondWrongAnswer: "C",
			thirdWrongAnswer: "D"},
		secondQuestion: {
			question: "NO Boy",
			correctAnswer: "E",
			firstWrongAnswer: "F",
			secondWrongAnswer: "G",
			thirdWrongAnswer: "H"}
	}*/

	var questions = [
	{
		question: "Which letter?",
		answers: {
			a: "@",
			b: "#",
			c: "$",
			d: "%"
		},
		correctAnswer: 'b'
	},
	{
		question: "NO Boy",
		answers: {
			a: '1',
			b: '2',
			c: '3',
			d: '4'
		},
		correctAnswer: 'd'
		}
	];

	$(".button").click(function() {
		startGame();
		gameStarted = true;
	});

	function startGame(){
		$(".startButton").css({'display': 'none'});
		$(".hideOnLoad").css({"display":"block"});
		askQuestions(questions);
	};

	function timer() {
		intervalId = setInterval(decrement, 1000);
		
	};

	function decrement() {
		if (clockRunning === false) {
			timeRemaining--;
		}
		$(".clock").html("Time Left: " + timeRemaining);
		console.log(timeRemaining);
		if (timeRemaining <= 0) {
			stop();
			console.log("out of time");
		}
	};

	function stop() {
		clearInterval(intervalId);
		clockRunning = false;
	};

	// game logic here

	function askQuestions(trivia) {
		var output = [];
		timer();
		$(".question").html(trivia[questionNumber].question);
		for (option in trivia[questionNumber].answers){
			console.log(option);
			$(".answerOptions").append("<div id='" + option + "' class='question' choice='" + option + "'>" + trivia[questionNumber].answers[option] + "</div>");
		}
		
		/*function answerCheck(){
			var response = $(this).attr("choice");
			console.log($(this).attr("choice"));
		};*/
		$(".answerOptions").click(function(){
			console.log($(this).attr("id"));
		});
		


	};





});