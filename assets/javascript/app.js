$(document).ready(function() {
	var timeRemaining = 15;
	var intervalId;
	var response = "";
	var questionNumber = 0;
	var numberOfQuestions = 3;
	var correctAnswers = 0;
	var wrongAnswers = 0;
	var image = "";
	var questions = [
		{
			question: "What tool did Tommy Pickles use to get out of the play pen?",
			answers: {
				a: "A Spatula",
				b: "A Fork",
				c: "A Hammer",
				d: "A Screwdriver"
			},
			correctAnswer: "d",
			GIF: "./assets/images/screwdriver.gif",
		},
		{
			question: "What did Stu, Tommy's Dad, do for a living?",
			answers: {
				a: "Toy Maker",
				b: "Stay At Home Dad",
				c: "Engineer",
				d: "Lawyer"
			},
			correctAnswer: "a",
			correctGIF: "",
			wrongGIF: "",
		},
		{
			question: "How many seasons of the Rugrats were there?",
			answers: {
				a: "3",
				b: "7",
				c: "10",
				d: "12"
			},
			correctAnswer: "c",
			correctGIF: "",
			wrongGIF: ""
		}
	];

	$(".button").click(function() {
		startGame();
	});

	function startGame(){
		startTimer();
		$(".startButton").css({'display': 'none'});
		$(".hideOnLoad").css({"display":"block"});
		askQuestions(questions, questionNumber);
	};

	function startTimer() {
		intervalId = setInterval(decrement, 1000);
		
	};

	function decrement() {
		timeRemaining--;

		$(".clock").html("Time Left: " + timeRemaining);
		if (timeRemaining <= 0) {
			stop();
			console.log("out of time");
		}
	};

	function stop() {
		clearInterval(intervalId);
	};
	function pause() {
		clearInterval(intervalId);
		setTimeout(startTimer,1000 * 3);
		$(".answers").remove();
		$(".question").empty();
	};


	function askQuestions(trivia, currentQuestion) {
		$(".question").html(trivia[currentQuestion].question);
		for (option in trivia[currentQuestion].answers){
			$(".answerOptions").append("<div id='" + option + "' class='answers' data-choice='" + option + "'>" + trivia[currentQuestion].answers[option] + "</div>");
		}
		var theCorrectAnswer = trivia[questionNumber].correctAnswer;
		console.log(theCorrectAnswer);
		$(".answers").click(function(){
			response = $(this).attr("data-choice");

			if (response === theCorrectAnswer) {
				correctGuess();
			} else {
				incorrectGuess();
			}
		console.log(trivia[questionNumber].GIF);
		image = "<img src=" + trivia[questionNumber].GIF + " alt='dog'></img>";

		function postQuestionPrompt(){
			pause();

			$(".display").append(image);
			
		};

		function correctGuess() {
			questionNumber++;
			correctAnswers++;
			console.log("Correct");
			postQuestionPrompt();
			keepPlayingCheck();
		};

		function incorrectGuess() {
			questionNumber ++;
			wrongAnswers++;
			console.log("Incorrect");
			postQuestionPrompt();
			keepPlayingCheck();
		};
		
		function keepPlayingCheck() {
			if (questionNumber === numberOfQuestions) {
				console.log("Game Over");
				console.log(correctAnswers, wrongAnswers);
			} else if (questionNumber < numberOfQuestions) {
				askQuestions(questions, questionNumber);
			}
		};
	
		});
	};







});