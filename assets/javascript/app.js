$(document).ready(function() {
	var timeRemaining = 30;
	var intervalId;
	var response = "";
	var questionNumber = 0;
	var numberOfQuestions = 3;
	var correctAnswers = 0;
	var wrongAnswers = 0;
	var image = "";
	var rickRoll = '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>'
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
			message: "Tommy used a toy screwdriver to escape the play pen.",
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
			message: "Stu was a toy maker, not a very good one though.",
			GIF: "./assets/images/stu.gif",
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
			message: "There were 10 seasons of the Rugrats.",
			GIF: "./assets/images/tv.gif"
		}
	];

	$(".button").click(function() {
		startGame();
	});

	function startGame(){
		startTimer();
		$(".startButton").css({'display': 'none'});
		$(".hideOnLoad").css({"display":"block"});
	};

	function startTimer() {
		intervalId = setInterval(decrement, 1000);
		askQuestions(questions, questionNumber);
		
	};

	function decrement() {
		timeRemaining--;

		$(".clock").html("Time Left: " + timeRemaining);
		if (timeRemaining <= 0) {
			outOfTime();
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
	
	function outOfTime() {
			$(".display").show();
			$(".answers").empty();
			endGame();
	};

	function endGame() {
			$(".clock").html("Click Me to Restart.");
			$(".clock").addClass("restart");
			$(".display").show();
			$(".gif").html(rickRoll);
			$(".message").empty();
			$(".question").empty();
			$(".answerOptions").empty();
			stop();
			if (correctAnswers === wrongAnswers) {
				$(".scoreBoard").append("It's A Tie!");
			} else if (correctAnswers < wrongAnswers) {
				$(".scoreBoard").append("<br>You Lost!");
			} else if (correctAnswers > wrongAnswers) {
				$(".scoreBoard").append("<br>You Won!");
			}
			$(".clock").click(function() { document.location.reload(true);})
	};

	function askQuestions(trivia, currentQuestion) {
		$(".gif").empty();
		$(".display").hide();
		$(".answerOptions").show();
		$(".question").html(trivia[currentQuestion].question);
		for (option in trivia[currentQuestion].answers){
			$(".answerOptions").append("<div id='" + option + "' class='answers' data-choice='" + option + "'>" + trivia[currentQuestion].answers[option] + "</div>");
		}
		var theCorrectAnswer = trivia[questionNumber].correctAnswer;
		image = "<img src=" + trivia[questionNumber].GIF + " alt='dog'></img>";
		$(".answers").click(function(){
			response = $(this).attr("data-choice");
			if (response === theCorrectAnswer) {
				correctGuess();
				$(".message").html(trivia[currentQuestion].message);
				$(".display").show();
				$(".answers").empty();
				
			} else {
				$(".message").html(trivia[currentQuestion].message);
				$(".display").show();
				$(".answers").empty();
				incorrectGuess();
			}
		});

		function scoreBoard() {
			$(".scoreBoard").html("Right: " + correctAnswers + " | Wrong: " + wrongAnswers);
		}

		function correctGuess() {
			questionNumber++;
			correctAnswers++;
			$(".gif").html(image);
			scoreBoard()
			function correctBackgroundReset() {
				$("body").removeClass("resetBackground");
				$("body").addClass("correctBackground");
			};
			correctBackgroundReset();
			setTimeout(function() {
				$("body").addClass("resetBackground");
				$("body").removeClass("correctBackground");
			},100);
			keepPlayingCheck();
		};

		function incorrectGuess() {
			questionNumber ++;
			wrongAnswers++;
			scoreBoard()
			$(".gif").html(image);
			function wrongBackgroundReset() {
				$("body").removeClass("resetBackground");
				$("body").addClass("wrongBackground");
			};
			wrongBackgroundReset();
			setTimeout(function() {
				$("body").addClass("resetBackground");
				$("body").removeClass("wrongBackground");
			},100);
			keepPlayingCheck();
		};

		function keepPlayingCheck() {
			if (questionNumber === numberOfQuestions) {
				$(".question").empty();
				clearInterval(intervalId);
				setTimeout(endGame,1000 * 3);
			} else if (questionNumber < numberOfQuestions) {
				pause();
			}
		};

	};

});