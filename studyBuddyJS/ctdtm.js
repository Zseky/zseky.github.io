(function() {
	let pause = false;
	let timerStarted;
	let restartNow = false;
	let hoursNow = '00';
	let minutesNow = '00';
	let secondsNow = '00';
	let numHours = 0;
	let numMinutes = 0;
	let numSeconds = 0;
	$('.outputAll').hide();

	function reInit(){

		pause = false;
		restartNow = false;
		hoursNow = '00';
		minutesNow = '00';
		secondsNow = '00';
		numHours = 0;
		numMinutes = 0;
		numSeconds = 0;
		$('.outputAll').hide();
	}
	
	
	var max_chars = 2;
    	    
	$('.hoursInput, .minutesInput, .secondsInput').on('change', function(e){
	    	
		if ($(this).val() < 10){
	    	$(this).val(0 + $(this).val());
	    } 

	    if ($(this).val() > 60){
	    	$(this).val(60);	    } 

	    if ($(this).val() < 0) {
	    	$(this).val(0);
	    }
	    	
	    if ($(this).val().length >= max_chars) { 
	        $(this).val($(this).val().substr(0, max_chars));
	    }

	    
	});


	function displayTime(){
		if (numSeconds >= 10)$('.secondsOutput').text(String(numSeconds));
		else $('.secondsOutput').text('0' + String(numSeconds));
		if (numMinutes >= 10)$('.minutesOutput').text(String(numMinutes));
		else $('.minutesOutput').text('0' + String(numMinutes));
		if (numHours >= 10)$('.hoursOutput').text(String(numHours));
		else $('.hoursOutput').text('0' + String(numHours));
	}
	

	function countDownStart(){
		
		numHours = parseInt(hoursNow);
		numMinutes = parseInt(minutesNow);
		numSeconds = parseInt(secondsNow);
		displayTime();
		timerStarted = setInterval(function(){runningTimer()},1000);
		
	}

	function countDownStartWithoutInit(){
		
		displayTime();
		timerStarted = setInterval(function(){runningTimer()},1000);
		
	}

	function showInput(){
		$('#formid').show(200);
		$('.outputAll').hide(200);
	}

	function showOutput(){
		$('#formid').hide(200);
		$('.outputAll').show(200);
	}

	$(".startTimer").click(function(event){
		event.preventDefault();

		showOutput();
		resetPause();
		if ( $('.hoursInput').val() != '') hoursNow = $('.hoursInput').val();
		else $('.hoursInput').val() == hoursNow;
		if ( $('.minutesInput').val() != '') minutesNow = $('.minutesInput').val();
		else $('.minutesInput').val() == minutesNow;
		if ( $('.secondsInput').val() != '') secondsNow = $('.secondsInput').val();
		else $('.secondsInput').val() == secondsNow;
		countDownStart();
	});

	$('.stopTimer').click(function(event){


		clearInterval(timerStarted);
		reInit();
		showInput();
	})

	$('.resetTimer').click(function(event){
		if ( $('.hoursInput').val() != '') hoursNow = $('.hoursInput').val();
		else $('.hoursInput').val() == hoursNow;
		if ( $('.minutesInput').val() != '') minutesNow = $('.minutesInput').val();
		else $('.minutesInput').val() == minutesNow;
		if ( $('.secondsInput').val() != '') secondsNow = $('.secondsInput').val();
		else $('.secondsInput').val() == secondsNow;
		numHours = parseInt(hoursNow);
		numMinutes = parseInt(minutesNow);
		numSeconds = parseInt(secondsNow);
		displayTime();
		restartNow = true;
		clearInterval(timerStarted);
		if (!pause)countDownStart();

	})

	$('.togglePauseTimer').click(function(event){
		pause = !pause;
		if (pause){
			clearInterval(timerStarted);

			$(this).removeClass("btn-light");
			$(this).addClass("btn-primary");
			$(this).text("Play");
		} else {
			countDownStartWithoutInit();
			resetPause();
		}
	})

	function resetPause(){
		$('.togglePauseTimer').addClass("btn-light");
		$('.togglePauseTimer').removeClass("btn-primary");
		$('.togglePauseTimer').text("Pause");
	}

	function runningTimer(){
		if (numHours>0 && numMinutes <=0){
			numHours--;
			numMinutes = 60;
		}
		if (numMinutes>0 && numSeconds <=0){
			numMinutes--;
			numSeconds = 60;
		}
		if (numSeconds> 0) numSeconds--;
		//console.log(numHours,numMinutes,numSeconds)
		displayTime();
		if (numSeconds <= 0 && numMinutes <= 0 && numHours <= 0) {
			clearInterval(timerStarted);
			showInput();
		}
		
	}


	
})()