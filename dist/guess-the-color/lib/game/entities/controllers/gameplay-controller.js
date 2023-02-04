ig.module('game.entities.controllers.gameplay-controller')
.requires(
	'impact.entity',
	'game.entities.gameplay.color-slot',
	'game.entities.gameplay.answer-slot',
	'game.entities.gameplay.answer-evaluator',
	'game.entities.controllers.game-ui-controller',
	'game.entities.controllers.gameover-controller',
	'game.entities.miscellaneous.confetti',
	'game.entities.miscellaneous.background-box',
	'game.entities.miscellaneous.lock',
	'game.entities.miscellaneous.tutorial-cursor',
	"game.entities.miscellaneous.arrow-tutorial",
	"game.entities.miscellaneous.arrow-shadow"
	
)
.defines(function() {
	EntityGameplayController = ig.Entity.extend({
		size: { x: 1080, y: 1080 },
		anchorPivot: { x: 0.5, y: 0.5 },
		currentRow: 0,
		currentColumn: 0,
		bgImage : new ig.Image('media/graphics/sprites/games/BG.png'),
		extra_chance: false,
		init:function(x, y, settings){
			ig.game.colorSlot = [];
			this.parent(x,y,settings);

			//define level parameters
			this.uiController = ig.game.spawnEntity(EntityGameUIController, 0,0, {controller: this}); //refer to this as UI
			this.currentColumn = 0;
			this.level = ig.game.sessionData.level;
			this.color_answer = ig.color_levels.Groups[0].Levels[this.level-1].Color_Answer;
			this.level_column = ig.color_levels.Groups[0].Levels[this.level-1].Columns;
			this.color_list_clickable = ig.color_levels.Groups[0].Levels[this.level-1].Color_Choices;
			this.tries = ig.color_levels.Groups[0].Levels[this.level-1].Max_Tries;
			this.count_tries = 0;
			this.columncount = 0;
			var space_occupied  = this.spawnAnswerSection(); // spawn answer slots
			this.spawnClickableRow(space_occupied);	//spawn clickable color slots
			this.extra_chance_on_tut = false;
			this.display_Level = this.level;
			this.setAnchoredPosition(0,0,"center-middle");
			this.clickables = ig.game.getEntitiesByType(EntityColorSlot);
			this.answerspot = ig.game.getEntitiesByType(EntityAnswerSlot);
			this.gameOverChecker = false; //sees if game over 
			this.checking = false; // sees if game is checking
			this.currentBox = 0;
			for (i=0; i<this.level_column;i++){
				ig.game.colorSlot.push('x');
			}
			this.lock_sprite = ig.game.spawnEntity(EntityLock, 0,0, {zIndex: this.zIndex + 1} );
			this.lock_sprite.setAnchoredPosition(-this.lock_sprite.size.x/2,this.lock_sprite.size.y/2 - 50 ,"top-center");
				
			if (this.level == 1){
				this.arrowShadow1 = ig.game.spawnEntity(EntityArrowShadow, 0,0, {zIndex: this.zIndex+1});
				this.arrowTutorial1 = ig.game.spawnEntity(EntityArrowTutorial, 0,0, {zIndex: this.zIndex+2});
				this.arrowShadow1.setAnchoredPosition(-355, -255, "center-middle");
				this.arrowTutorial1.setAnchoredPosition(-350, -250, "center-middle");
				this.arrowShadow1.currentAnim.angle = -0.8;
				this.arrowTutorial1.currentAnim.angle = -0.8;

				this.arrowShadow2 = ig.game.spawnEntity(EntityArrowShadow, 0,0, {zIndex: this.zIndex+1});
				this.arrowTutorial2 = ig.game.spawnEntity(EntityArrowTutorial, 0,0, {zIndex: this.zIndex+2});
				this.arrowShadow2.setAnchoredPosition(-55, -385, "center-middle");
				this.arrowTutorial2.setAnchoredPosition(-50, -380, "center-middle");
				this.arrowShadow2.currentAnim.flip.x = true;
				this.arrowShadow2.currentAnim.angle = -0.9;
				this.arrowTutorial2.currentAnim.flip.x = true;
				this.arrowTutorial2.currentAnim.angle = -0.9;
				
				this.arrowShadow3 = ig.game.spawnEntity(EntityArrowShadow, 0,0, {zIndex: this.zIndex+1});
				this.arrowTutorial3 = ig.game.spawnEntity(EntityArrowTutorial, 0,0, {zIndex: this.zIndex+2});
				this.arrowShadow3.setAnchoredPosition(+205, -195, "center-middle");
				this.arrowTutorial3.setAnchoredPosition(+210, -190, "center-middle");
				this.arrowShadow3.currentAnim.flip.x = true;
				this.arrowShadow3.currentAnim.angle = 1.0;
				this.arrowTutorial3.currentAnim.flip.x = true;
				this.arrowTutorial3.currentAnim.angle = 1.0;
			}
			else if (this.level == 2){
				this.arrowShadow3 = ig.game.spawnEntity(EntityArrowTutorial, 0,0, {zIndex: this.zIndex+1});
				this.arrowShadow3.setAnchoredPosition(+205, -225, "center-middle");
				this.arrowShadow3.currentAnim.flip.x = true;
				this.arrowShadow3.currentAnim.angle = 1.0;
				this.arrowTutorial3 = ig.game.spawnEntity(EntityArrowTutorial, 0,0, {zIndex: this.zIndex+2});
				this.arrowTutorial3.setAnchoredPosition(+210, -220, "center-middle");
				this.arrowTutorial3.currentAnim.flip.x = true;
				this.arrowTutorial3.currentAnim.angle = 1.0;
			}
			


			if (this.level < 3 && ig.game.sessionData.tutorialDone == false){ // tutorial spawner
				//this.uiController.money = 100;
				this.tutorialIndexPos = 0;
				this.tutorialCursor = ig.game.spawnEntity(EntityTutorialCursor, 0, 0, {zIndex: this.zIndex + 12});
				var txpos = ig.game.getEntitiesByType(EntityColorSlot)[this.tutorialIndexPos].pos.x;
				var typos = ig.game.getEntitiesByType(EntityColorSlot)[this.tutorialIndexPos].pos.y;
				this.tutorialCursor.setAnchoredPosition(txpos - 23, typos -20, "center-middle");

				for (var x = 0; x < this.clickables.length; x++){
					this.clickables[x].isEnabled = false;
				}
				
				this.clickables[this.tutorialIndexPos].isEnabled = true;
			}
			

			//ig.soundHandler.enginePlayer.play(ig.soundHandler.enginePlayer.soundList.background);
			ig.soundHandler.sfxPlayer.volume(1);

			this.rewardTemplate = 50; 
			if (this.level!= ig.game.sessionData.achieved) this.rewardTemplate = 10;
			
			
		},
		
		tutorialCursorChangePos: function(){
		if(!this.extra_chance_on_tut){
			if (this.tutorialIndexPos < this.color_list_clickable.length - 1){
				this.tutorialIndexPos++;
				var txpos = ig.game.getEntitiesByType(EntityColorSlot)[this.tutorialIndexPos].pos.x + 20;
				var typos = ig.game.getEntitiesByType(EntityColorSlot)[this.tutorialIndexPos].pos.y + 23;
				this.tutorialCursor.setAnchoredPosition(txpos , typos, "top-left");

				for (var x = 0; x < this.clickables.length; x++){
					this.clickables[x].isEnabled = false;
				}
				
				this.clickables[this.tutorialIndexPos].isEnabled = true;
			}
			else{

				if (this.tutorialCursor != undefined || null) this.tutorialCursor.kill();
				
				var buttonHint = ig.game.getEntitiesByType(EntityButtonHint)[0];

				buttonHint.tween({offset:{x:0,y:0}}, 0.5, { //animating the box behind answer color slots to fade up and move up
                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                onComplete: function() {
                	buttonHint.currentAnim.alpha = 1;
                	buttonHint.isEnabled = true;
                	}.bind(this)
                	}).start();

				var buttonExtraTry = ig.game.getEntitiesByType(EntityButtonExtraTry)[0];


				buttonExtraTry.tween({offset:{x:0,y:0}}, 0.5, { //animating the box behind answer color slots to fade up and move up
                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                onComplete: function() {
                	buttonExtraTry.currentAnim.alpha = 1;
                	buttonExtraTry.isEnabled = true;
                	}.bind(this)
                	}).start();

				this.uiController.tutorial_trigger = true;

				for (var x = 0; x < this.clickables.length; x++){
					this.clickables[x].isEnabled = true;
				}
				if (this.arrowShadow1 != null || undefined) this.arrowShadow1.show();
				if (this.arrowShadow2 != null || undefined) this.arrowShadow2.show();
				if (this.arrowShadow3 != null || undefined) this.arrowShadow3.show();
				if (this.arrowTutorial1 != null || undefined) this.arrowTutorial1.show();
				if (this.arrowTutorial2 != null || undefined) this.arrowTutorial2.show();
				if (this.arrowTutorial3 != null || undefined) this.arrowTutorial3.show();
			}
		}
			
			/*
			else if (this.tutorialIndexPos == 2){
				//this.tutorialCursor.kill();

				for (var x = 0; x < this.clickables.length; x++){
					this.clickables[x].isEnabled = false;
				}

				var buttonHint = ig.game.getEntitiesByType(EntityButtonHint)[0]

				this.tutorialCursor.zIndex = buttonHint.zIndex + 1;
				this.tutorialCursor.setAnchoredPosition(buttonHint.pos.x+70 , buttonHint.pos.y + 130, "top-left");

				this.uiController.tutorial_trigger = true; 

				
				buttonHint.tween({offset:{x:0,y:0}}, 0.5, { //animating the box behind answer color slots to fade up and move up
                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                onComplete: function() {
                	buttonHint.currentAnim.alpha = 1;
                	buttonHint.isEnabled = true;
                	}.bind(this)
                	}).start();

				

				console.log(ig.game.sessionData.tutorialDone);
			}
			else if (this.tutorialIndexPos == 3){
				var buttonExtraTry = ig.game.getEntitiesByType(EntityButtonExtraTry)[0]

				this.tutorialCursor.zIndex = buttonExtraTry.zIndex + 1;
				this.tutorialCursor.setAnchoredPosition(buttonExtraTry.pos.x+70 , buttonExtraTry.pos.y + 130, "top-left");

				buttonExtraTry.tween({offset:{x:0,y:0}}, 0.5, { //animating the box behind answer color slots to fade up and move up
                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                onComplete: function() {
                	buttonExtraTry.currentAnim.alpha = 1;
                	buttonExtraTry.isEnabled = true;
                	}.bind(this)
                	}).start();

			}

			else if (this.tutorialIndexPos >3){ 
				
				var txpos = ig.game.getEntitiesByType(EntityColorSlot)[2].pos.x + 30;
				var typos = ig.game.getEntitiesByType(EntityColorSlot)[2].pos.y + 33;
				this.tutorialCursor.setAnchoredPosition(txpos , typos, "top-left");

				this.clickables[2].isEnabled = true;
			}
			//else if ()
			*/
			
		},

		finishTutorial:function(){
			this.uiController.tutorial_trigger = false;
			this.extra_chance_on_tut = true;
			if (this.arrowShadow1 != null || undefined) this.arrowShadow1.hide();
			if (this.arrowShadow2 != null || undefined) this.arrowShadow2.hide();
			if (this.arrowShadow3 != null || undefined) this.arrowShadow3.hide();

			if (this.arrowTutorial1 != null || undefined) this.arrowTutorial1.hide();
			if (this.arrowTutorial2 != null || undefined) this.arrowTutorial2.hide();
			if (this.arrowTutorial3 != null || undefined) this.arrowTutorial3.hide();
		},
		spawnClickableRow:function(space_occupied){
			var column = this.color_list_clickable.length;
			var boxSize = 89;
            var margin = 46.55;
            var startX = -((boxSize*column) + (margin*(column-1)))*0.5 + boxSize*0.5;
            margin = boxSize + margin;

        	if (column >3) var column_slots_type = 1;
        	else var column_slots_type = 0;

            var place_box = ig.game.spawnEntity(EntityBackgroundBox,  startX - 57, space_occupied-18,{alpha_measure: 1, activity: column_slots_type,
            	portraitScaling: true,
                maxPortraitAnchorScale: 1,
                maxPortraitScale: 1
                });
           
			for (var x = 0; x < column; x++) {
                var box = ig.game.spawnEntity(EntityColorSlot, startX+5 + margin*x, space_occupied+ 32, {
                    portraitScaling: true,
                    maxPortraitAnchorScale: 1,
                    maxPortraitScale: 1,
                    color_assigned: this.color_list_clickable[x],
                    controller: this
                    //clicked:function(){this.clickFunctionHandler[x]}.bind(this)
                });


            }

            
            
		},
		spawnAnswerSection:function(){
			var column = this.level_column;
			var row = this.tries
			var boxSize = 89;
            var margin_x = 46.55;
            var margin_y = 50;
            var startX = -((boxSize*column) + (margin_x*(column-1)))*0.5 + boxSize*0.5;
            var startY = boxSize*0.5 - boxSize*row*0.5 - margin_y*Math.floor(row*0.5) +70 - 69;
            margin_x = boxSize + margin_x;
            margin_y = boxSize + margin_y;
            for (var i = 0; i < this.tries; i++ ){
            	if (column >3) var column_slots_type = 1;
            	else var column_slots_type = 0;


            	if (i<1) var place_box = ig.game.spawnEntity(EntityBackgroundBox,  startX - 57, startY + margin_y*i-46, {activity: column_slots_type, 
            		portraitScaling: true,
	                maxPortraitAnchorScale: 1,
	                maxPortraitScale: 1 });
            	else var place_box = ig.game.spawnEntity(EntityBackgroundBox,  startX - 57, startY + margin_y*i-46, {alpha_measure: 0.5, offset: {x: 0, y: -15}, activity: column_slots_type,
            		portraitScaling: true,
	                maxPortraitAnchorScale: 1,
	                maxPortraitScale: 1 });	


				for (var x = 0; x < column; x++) {
                    var box = ig.game.spawnEntity(EntityAnswerSlot, startX +5+ margin_x*x,  startY + margin_y*i, {
                        portraitScaling: true,
                        maxPortraitAnchorScale: 1,
                        maxPortraitScale: 1
                        
                    });
                    
               }

            }

            return startY + margin_y*i;
           
		},

		update:function()
		{
			this.parent();
			//console.log(ig.game.colorSlot);
			this.currentBox = this.currentColumn + this.columncount;
			
			if (ig.game.colorSlot[this.currentColumn] != 'x' && ig.game.colorSlot[this.currentColumn] != 'y' && this.gameOverChecker == false && !this.checking){
				this.updateGraphics();
			} //checks if global definition of answered slots is changed, if it does, change slot sprite then show

			if (this.currentColumn >= this.level_column && this.gameOverChecker == false && !this.checking){
				this.checkAnswer()
			}//checking of answer each row
			 
		},


		updateGraphics:function(){
			if (this.currentColumn <= this.level_column){
				this.answerspot[this.currentColumn  + this.columncount].updateSlot(ig.game.colorSlot[this.currentColumn]); 
				this.currentColumn++ 
			}


		},
		checkAnswer:function(){
			this.checking = !this.checking;
			var wrong_place_holder = []
			var answered_already = []
			for (i=0; i<this.level_column;i++){
				wrong_place_holder.push('x')
				answered_already.push(this.color_answer[i])
			} // assess wrong places if theyre already in the answer or not
			var answers_correct = 0;
			for (var n = 0; n < this.clickables.length; n++){
				this.clickables[n].isEnabled = false;
			} // array checking if answer in current column is correct
			for (var x = 0; x < this.level_column; x++){
				if (this.color_answer[x] == ig.game.colorSlot[x]){
					
					answered_already[x] = 'n'
					answers_correct ++;
					if (answers_correct == this.level_column){
						this.gameWin(); // called if all slots were correctly in place then breaks
						break;

					}
				}
				else if (this.color_answer.includes(ig.game.colorSlot[x])){
					
					wrong_place_holder[x]=ig.game.colorSlot[x];
					ig.game.colorSlot[x] = 'y';
					
				}
				else{
					
					ig.game.colorSlot[x] = 'x';
				}
			} // checks every loop for every wrong place or correct or blatant wrong answers

        	this.graphicsChecker(wrong_place_holder, answers_correct, answered_already)
        	
            
			
			
				
			
			
		},
		graphicsChecker:function(wrong_place_holder, answers_correct,answered_already){ //function visualizing wrong places, correct, and wrong answers
			var column = this.level_column;
			var row = this.tries
			var boxSize = 89;
            var margin_x = 46.55;
            var margin_y = 50;
            var startX = -((boxSize*column) + (margin_x*(column-1)))*0.5 + boxSize*0.5 + 5;
            var startY = boxSize*0.5 - boxSize*row*0.5 - margin_y*Math.floor(row*0.5) +93 - 69 ;
            margin_x = boxSize + margin_x;
            margin_y = boxSize + margin_y;
           	var z= 0;
            var counter_sequence = 0.1 //delay for animating each colorslot so that there is sequential delay effect
           	
			for (var x = 0; x < this.level_column; x++){
				if (this.color_answer.includes(ig.game.colorSlot[x])){
					ig.game.spawnEntity(EntityAnswerEvaluator,startX + margin_x*z, startY + margin_y*this.count_tries,{answer_assigned: 1, counter: counter_sequence});
				}
				
				else if (ig.game.colorSlot[x] == 'y' && answered_already.includes(wrong_place_holder[x])){ //checks if wrong places were already included in the answers
					ig.game.spawnEntity(EntityAnswerEvaluator, startX + margin_x*z,startY + margin_y*this.count_tries,{answer_assigned: 2, counter: counter_sequence});
					ig.game.colorSlot[x] = 'x';	
				} 
				else {
					ig.game.spawnEntity(EntityAnswerEvaluator, startX + margin_x*z,startY + margin_y*this.count_tries,{answer_assigned: 0, counter: counter_sequence});
					ig.game.colorSlot[x] = 'x';
				}
				z++
				counter_sequence+=0.2 
				ig.game.sortEntitiesDeferred();
			}

			this.tween({},counter_sequence,{onComplete:function(){ //tween for delaying
				this.resetColumn(answers_correct); 
				}.bind(this)
			}).start()
			



		},
		resetColumn:function(answers_correct){
			this.currentColumn = 0;
			this.count_tries++

			//check if gameover
			if (answers_correct != this.level_column){
				if (this.count_tries<=this.tries-1){
					this.checkNextColumn(); //checks next column for right answers, animate slots which has the correct ones
				}
				else{
					

					if (this.extra_chance) {

						this.currentColumn = 0;
						this.columncount = 0;
						this.count_tries = 0;
						this.currentBox = 0;

						for (var i = 0; i < ig.game.getEntitiesByType(EntityAnswerSlot).length; i++ ){
							ig.game.getEntitiesByType(EntityAnswerSlot)[i].resetBall();
						}

						for (var n = 0; n < ig.game.getEntitiesByType(EntityBackgroundBox).length; n++){
							if (n>0 && n<ig.game.getEntitiesByType(EntityBackgroundBox).length - 1){
								ig.game.getEntitiesByType(EntityBackgroundBox)[n].resetBox();
							}
						}
						for (var y = 0; y < ig.game.getEntitiesByType(EntityAnswerEvaluator).length; y++){
							ig.game.getEntitiesByType(EntityAnswerEvaluator)[y].resetEvaluator();
						}

						this.tween({},0.4,{onComplete:function(){
							for (var x = 0; x < this.level_column; x++){
								if (this.color_answer[x] == ig.game.colorSlot[x]){
								//console.log(this.columncount)
									this.answerspot[x  + this.columncount].updateSlot(ig.game.colorSlot[x]); 
								}
							}
						}.bind(this)
						}).start()
						

						this.checking = !this.checking;
						for (var n = 0; n < this.clickables.length; n++){
							this.clickables[n].isEnabled = true;
						}

						this.extra_chance = false;
						
						var extraTryBtn = ig.game.getEntitiesByType(EntityButtonExtraTry)[0];

						extraTryBtn.tween({offset:{x:0,y:0}}, 0.5, { //animating the box behind answer color slots to fade up and move up
		                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
		                onComplete: function() {
		                	extraTryBtn.currentAnim.alpha = 1;
		                	extraTryBtn.isEnabled = true;
		                	ig.soundHandler.sfxPlayer.play("extra_chance")
		                	}.bind(this)
		                	}).start();

						if (this.uiController.tutorial_trigger) {
							this.finishTutorial();
						}
					}

					else {this.gameOver()};
					 //exhausting all tries leads to game losing or game over
				}
			}
			
			
		},
		
		checkNextColumn:function(){

			var tweened_entity = ig.game.getEntitiesByType(EntityBackgroundBox)[this.count_tries]
			
			tweened_entity.tween({offset:{x:0,y:0}}, 0.5, { //animating the box behind answer color slots to fade up and move up
                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                onComplete: function() {
                	ig.soundHandler.sfxPlayer.play("nextcolumn");
                	tweened_entity.currentAnim.alpha = 1;
                	
                  	this.columncount += this.level_column;
					for (var x = 0; x < this.level_column; x++){
						if (this.color_answer[x] == ig.game.colorSlot[x]){
							this.answerspot[x  + this.columncount].updateSlot(ig.game.colorSlot[x]); 
						}
					}



					this.currentColumn = 0

					this.checking=!this.checking; //checking is done

					for (var n = 0; n < this.clickables.length; n++){
						//if (ig.game.sessionData.tutorialDone) 
							this.clickables[n].isEnabled = true;
					}

					//if(this.tutorialIndexPos > 3) this.clickables[2].isEnabled = true;

                }.bind(this)
                }).start();

			
		},

		gameOver:function(){
			this.gameOverChecker = true; // game is done 
			
			this.uiController.disableClickableEntities(); //disable all ui no conflict with game over controller on click feedbacks
			/*if (ig.game.sessionData.playerMoney >= 50) { 
				ig.game.sessionData.playerMoney -= 50;
				this.uiController.money = ig.game.sessionData.playerMoney;

				ig.game.saveAll();
			}*/
			

			for (var x = 0; x < this.clickables.length; x++){
				this.clickables[x].isEnabled = false;
			}
			x
 			this.tween({}, 0.8, { // delay appearing of gameover controller to allow other animation to finish and confetti to show
                manager:this,
                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                onComplete:function(){
                	//API_END_GAME
                	ig.soundHandler.sfxPlayer.play("gameLose");
                	this.gameover_panel = ig.game.spawnEntity(EntityGameoverController, 0,0, {controller: this,gameResult: "lose"} );
            		this.gameover_panel.setAnchoredPosition(0, 0, "center-middle");
                }.bind(this)

                }).start();


		},


		gameWin:function(){
			this.gameOverChecker = true;
			
			this.lock_sprite.swap_lock();
			
			if(this.tutorialCursor != undefined || null){
				this.tutorialCursor.kill();
			}
			
			
			this.uiController.disableClickableEntities();
		 	this.tween({}, 0.5, {
            manager:this,
            easing: ig.Tween.Easing.Sinusoidal.EaseOut,
            onComplete:function(){
            	ig.soundHandler.sfxPlayer.play("gameWin");
             	this.confettiSpawn();
			 	this.tween({}, 1, {
	                manager:this,
	                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
	                onComplete:function(){
		                	//API_END_GAME
		                	console.log(this.rewardTemplate);
		                	this.gameover_panel = ig.game.spawnEntity(EntityGameoverController, 0,0, {controller: this,gameResult: "win", rewardTemplate: this.rewardTemplate} );
		            		this.gameover_panel.setAnchoredPosition(0, 0, "center-middle");
		            		ig.game.sessionData.playerMoney += this.rewardTemplate;
							this.uiController.money = ig.game.sessionData.playerMoney;
		            		if (ig.game.sessionData.achieved == this.level ){ 
		            			i
								ig.game.sessionData.achieved ++;
								if(this.level == 2 && ig.game.sessionData.tutorialDone == false) { 
									ig.game.sessionData.tutorialDone = true;
								}
							}

							

							ig.game.saveAll();

		                }.bind(this)

	                }).start();
			}.bind(this)

            }).start();


			
		},

		confettiSpawn:function(){
			 var _batch = 20;
                for (var i = 0; i < _batch; i++) {
                    var _xAnchor = (ig.system.width / (_batch + 1)) * (i + 1);

                    var _xPt = _xAnchor + Math.random() * 100 - 50;
                    var _yPt = 50+ Math.random() * 1500;

                    for (var _c = 0; _c < 20; _c++) ig.game.spawnEntity(EntityConfetti, _xPt, _yPt);
                }
		},
		
		
		onPauseGame: function()
		{
			this.isPaused = true;
			//ig.soundHandler.enginePlayer.stop();
		},

		onResumeGame: function()
		{
			this.isPaused = false;
			//ig.soundHandler.enginePlayer.play(ig.soundHandler.enginePlayer.soundList.background);
		},

		draw:function(){
			this.parent();

            var center = ig.responsive.toAnchor(0, 0, "center-middle");
           
          
            // // var fillScale = ig.responsive.fillScale;
            this.scaleX = (ig.system.width/this.size.x);
            this.scaleY = (ig.system.height/this.size.y);
            var scale = (this.scaleX > this.scaleY) ? this.scaleX : this.scaleY;
           	ig.responsive.drawScaledImage(this.bgImage, center.x, center.y, scale, scale, 0.5, 0.5);
            
		}
		


	});
});
