(function() {
	const valentineQuestions = {
		0: "Ready?",
		1: "Is this Phoebe?",
		2: "Sure? Like, Phoebe Kate Suyao Maiquilla?",
		3: "If you truly are Phoebe, I have questions for you.",
		4: "What is the favorite thing you have been doing with bb?",
		5: "Do you love your boyfriend?",
		6: "Will you be my valentine?"
	}

	let questionCounter = 0;
	let animationCounter = 0;
	const aInstant = 0;
	const aSlow = 100;
	let correct = true;
	let questionType = [0,1,1,3,2,1,1];
	const answerYes = true;
	const answerNo = false;

	let YNNum = 0;
	const alertForYN  = ["Only for PB.", "For my girlfriend only.","But he loves you so he doesn't care.", "Try again."]


	function hideQuestions(){
		$(".questionsCont").animate({opacity: 0}, animationCounter, function(){
			$(".questionsCont").hide();
		})
	}

	function showQuestions(){
		$(".questionsCont").show();
		$(".questionsCont").animate({opacity: 1}, animationCounter)
	}


	function hideTextCont(){
		$(".inputBox, .buttonContSuccess").animate({opacity: 0}, animationCounter, function(){
			$(".inputBox").css("display", "none");
			$(".buttonContSuccess").css("display", "none");
		})	
	}

	function showTextCont(){
		$(".inputBox").show();
		$(".buttonContSuccess").css("display", "flex");
		$(".inputBox, .buttonContSuccess").animate({opacity: 1}, animationCounter)
	}

	function hideYNButtons(){
		$(".buttonContYN").animate({opacity: 0}, animationCounter, function(){
			$(".buttonContYN").css("display", "none");
		})
	}

	function showYNButtons(){
		$(".buttonContYN").css("display", "flex");
		$(".buttonContYN").animate({opacity: 1}, animationCounter)
	}

	function hideOKButton(){
		$(".buttonContOK").animate({opacity: 0}, animationCounter, function(){
			$(".buttonContOK").css("display", "none");
		})
	}

	function showOKButton(){
		$(".buttonContOK").css("display", "flex");
		$(".buttonContOK").animate({opacity: 1}, animationCounter)
	}


	function hideAll(){

		hideQuestions();
		hideYNButtons();
		hideTextCont();
		hideOKButton();
		
	}


	function showAll(){

		showQuestions();
		if (questionType[questionCounter] == 1) showYNButtons();
		else if (questionType[questionCounter] == 2) showTextCont();
		else showOKButton();
		
	}


	function init(){
		hideAll();

		showOKButton();
		animationCounter = aSlow;
	}

	function programBody(){
		
		if(questionCounter <6){
			questionCounter++;
	
			setTimeout(showAll, 200);	
		
			$(".hContainer").text("Question " + String(questionCounter));
			$(".qContainer").text(String(valentineQuestions[questionCounter]));
		} else {
			hideAll();
			$(".hContainer").text("I love you Phoebe BB! See you sa valentine's!!! ");
			$(".hContainer").append("&#x2665;");
			$(".hContainer").append("&#x2665;");
			$(".hContainer").append("&#x2665;");
		}
	}

	function sendEmail(x) {
		Email.send({
		    SecureToken: "eecbdc2e-b9f9-48cb-b95b-a63855ecc87f",
		    To : 'zj.labasano@gmail.com',
		    From : "zj.labasano@gmail.com",
		    Subject : "Valentine Notif",
		    Body : String(x)
		}).then(
			message => alert(message)
		);
	}

	function validityChecker(event){
		event.preventDefault();
		if ($(".message").val() == ""){

		} else {
			sendEmail($(".message").val());
			hideAll();
			programBody();
		}
	}


	init();

	$(".ok").click(function(){
		hideAll();
		programBody();
	});

	$("#formid").submit(function(event){
		validityChecker(event);
	});

	$(".yes").click(function(){
		
		if (correct == answerYes || questionCounter == 5){
			hideAll();
			if (questionCounter == 5) alert("Yay!");
			programBody();
			YNNum++;
		}
		else {
			alert(alertForYN[YNNum]);
		}
	});

	$(".no").click(function(){
		
		if (correct == answerNo || questionCounter == 5) {
			hideAll();
			if (questionCounter == 5) alert(alertForYN[YNNum]);
			programBody();
			YNNum++;
		} else {
			alert(alertForYN[YNNum]);
		}
	});
	
})()