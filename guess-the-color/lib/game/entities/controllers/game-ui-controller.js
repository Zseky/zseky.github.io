ig.module('game.entities.controllers.game-ui-controller')
.requires(
    'impact.entity',
    'game.entities.controllers.setting-controller',
    'game.entities.buttons.button-pause',
    'game.entities.buttons.button-hint',
    'game.entities.buttons.button-extra-try',
    'game.entities.miscellaneous.confetti'
)
.defines(function() {
    EntityGameUIController = EntityPopupController.extend({
        zIndex: 50,
        // money: 0,
        coinImg: new ig.Image('media/graphics/sprites/games/coins.png'),
        instructionImg: new ig.Image('media/graphics/sprites/games/instruction_bar.png'),
        tutorial_trigger: false,
        init:function(x, y, settings){
            this.parent(x, y, settings);
            this.mobile_dev = false;
            if (ig.system.width < ig.system.height) this.mobile_dev = true;
            this.money = ig.game.sessionData.playerMoney; //define money for text render
            var anchor = ig.responsive.toAnchor(0, 0, "center-middle");
            this.yPos =  anchor.y -220;
            this.instructionPosY = anchor.y  + ig.system.height/2 + 10;
            this.alpha = 0;
            this.pauseBtn = this.spawnEntity(EntityButtonPause, 0,0, {zIndex: this.zIndex, onClicked: function(){this.showSettings()}.bind(this)} );
            this.pauseBtn.setAnchoredPosition(-this.pauseBtn.size.x - 50, 80, "top-right");

            this.hintBtn= this.spawnEntity(EntityButtonHint, 0,0, {zIndex: this.zIndex, onClicked: function(){this.giveHint()}.bind(this)} );
            this.hintBtn.setAnchoredPosition( 50, -this.hintBtn.size.y * 2 - 120, "bottom-left");

            this.extraTryBtn= this.spawnEntity(EntityButtonExtraTry, 0,0, {zIndex: this.zIndex, onClicked: function(){this.extraTry()}.bind(this)} );
            this.extraTryBtn.setAnchoredPosition(  50, -this.extraTryBtn.size.y - 80, "bottom-left");

            if(ig.game.sessionData.level < 3 && !ig.game.sessionData.tutorialDone){
                this.hintBtn.offset.y = -15;
                this.extraTryBtn.offset.y = -15;
                this.hintBtn.currentAnim.alpha = 0.5;
                this.extraTryBtn.currentAnim.alpha = 0.5;
                this.hintBtn.isEnabled = false;
                this.extraTryBtn.isEnabled =false;
            }

        },
        
        draw:function(){

            
            this.parent();

            var topRight = ig.responsive.toAnchor(0, 0, "top-right");
            var topLeft = ig.responsive.toAnchor(0, 0, "top-left");
            var bottomRight = ig.responsive.toAnchor(0,0, "bottom-right");
            var bottomCenter = ig.responsive.toAnchor(0,0, "bottom-center");
            this.coinImg.draw(topLeft.x  + 50, topLeft.y + 80);
            

            var ctx = ig.system.context;
            ctx.font = 'normal 40px montserrat';
            ctx.fillStyle = "#ee4791";
            ctx.textAlign = 'right';

            ctx.fillText(this.money, topLeft.x + 240, topLeft.y + 80 + this.coinImg.height/2);
           

            var anchor = ig.responsive.toAnchor(0, 0, "center-middle");
            var ctx = ig.system.context;
            //console.log(this.mobile_dev);
            if (this.tutorial_trigger){
                if (this.yPos < anchor.y -220){ 
                    this.yPos+=2; 
                    this.alpha += 0.05;
                }
                else if (this.yPos >= anchor.y - 220){
                    this.yPos = anchor.y -220;
                    this.alpha = 1;
                }

                if (this.instructionPosY > anchor.y + 425){
                    if (!this.mobile_dev) this.instructionPosY-=15;
                    else this.instructionPosY -=50; 
                    //console.log("this one");
                }
                else if (this.instructionPosY <= anchor.y + 425){
                    this.instructionPosY = anchor.y + 425; 
                    //console.log("this two");  
                } 
            }

            else if (!this.tutorial_trigger){
                if (this.yPos > anchor.y -270){ 
                    this.yPos-=2; 
                    this.alpha -= 0.05;
                }
                else if (this.yPos <= anchor.y - 270){
                    this.yPos = anchor.y -270;
                    this.alpha = 0;
                }

                if (this.instructionPosY < anchor.y + ig.system.height/2 + 10){
                    if (!this.mobile_dev) this.instructionPosY+=15;
                    else this.instructionPosY +=50; 

                }
                else if (this.instructionPosY >= anchor.y + ig.system.height/2 + 50){
                    this.instructionPosY = anchor.y + ig.system.height/2 + 10; 
                } 
            }


            if (this.controller.level ==1 ){

                ctx.font = 'normal 40px montserrat';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'; 
                ctx.fillStyle = "rgba(157,216,216, " + this.alpha + ")";
                ctx.fillText(_STRINGS.Game.Correct, anchor.x -302, this.yPos + 18);

                ctx.fillStyle = "rgba(157,216,216, " + this.alpha + ")";
                ctx.fillText(_STRINGS.Game.Wrong, anchor.x - 52 , this.yPos-43);
                ctx.fillText(_STRINGS.Game.Place, anchor.x - 52, this.yPos-2);

                ctx.fillStyle = "rgba(157,216,216, " + this.alpha + ")";
                ctx.fillText(_STRINGS.Game.Wrong, anchor.x +328, this.yPos +43);
                ctx.fillText(_STRINGS.Game.Place, anchor.x + 328, this.yPos + 84);

                ctx.font = 'normal 40px montserrat';
                ctx.fillStyle = "rgba(238,58,127, " + this.alpha + " )";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'; 

                this.instructionImg.draw(anchor.x - this.instructionImg.width/2, this.instructionPosY);
                ctx.fillText(_STRINGS.Game.Guess, anchor.x, this.instructionPosY + 40);


                ctx.font = 'normal 40px montserrat';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'; 
                ctx.fillStyle = "rgba(238,58,127, " + this.alpha + ")";
                ctx.fillText(_STRINGS.Game.Correct, anchor.x -300, this.yPos + 20);

                ctx.fillStyle = "rgba(238,58,127, " + this.alpha + ")";
                ctx.fillText(_STRINGS.Game.Wrong, anchor.x - 50 , this.yPos-41);
                ctx.fillText(_STRINGS.Game.Place, anchor.x - 50, this.yPos);

                ctx.fillStyle = "rgba(238,58,127, " + this.alpha + ")";
                ctx.fillText(_STRINGS.Game.Wrong, anchor.x +330, this.yPos +45);
                ctx.fillText(_STRINGS.Game.Place, anchor.x + 330, this.yPos + 86);

               
            }
            
            else if (this.controller.level == 2){ 
                ctx.font = 'normal 40px montserrat';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'; 

                ctx.fillStyle = "rgba(157,216,216, " + this.alpha + ")";
                ctx.fillText(_STRINGS.Game.Incorrect, anchor.x +358, this.yPos +43);

                ctx.fillStyle = "rgba(238,58,127, " + this.alpha + ")";
                ctx.fillText(_STRINGS.Game.Incorrect, anchor.x +360, this.yPos +45);
            }

                ctx.font = 'normal 60px montserrat';
                ctx.textAlign = 'right';
                ctx.fillStyle = "rgba(157,216,216,255)";
                ctx.fillText(_STRINGS.Game.Level+ " " + ig.game.sessionData.level, bottomRight.x - _STRINGS.Game.Level.length - 55 , bottomRight.y -100 );
                ctx.fillStyle = "rgba(238,58,127,255)";
                ctx.fillText(_STRINGS.Game.Level+ " " + ig.game.sessionData.level, bottomRight.x - _STRINGS.Game.Level.length - 50 , bottomRight.y -95 );
                
               

                

            // console.log("Draw coin");
        },

        showSettings: function()
        {
            console.log("Show settings");
            
            this.disableClickableEntities(); //disable all other entities to allow for setting panel to be the only receiver of click feedback
            this.controller.onPauseGame();
            this.settingPanel = ig.game.spawnEntity(EntitySettingController, 0,0, {controller: this.controller, onClosed: function(){this.hideSettings()}.bind(this)} );
            this.settingPanel.setAnchoredPosition(0, 0, "center-middle");
        },

       
        hideSettings: function()
        {
           
            this.enableClickableEntities();

            this.controller.onResumeGame();
        },

        giveHint:function(){
            if (!this.controller.checking && this.controller.gameOverChecker == false){
                var rando_slot_hint = Math.floor(Math.random() * (2 - 0 + 1) + 0);
                if (this.money >= 50){ //checks if hints can now be placed
                    ig.soundHandler.sfxPlayer.play("click");
                    if (ig.game.colorSlot[rando_slot_hint] == 'x'| ig.game.colorSlot[rando_slot_hint] == 'y'){//gets random slot to fill with answer
                        
                        ig.game.colorSlot[rando_slot_hint] = ig.color_levels.Groups[0].Levels[this.controller.level-1].Color_Answer[rando_slot_hint];
                        this.controller.answerspot[rando_slot_hint + this.controller.columncount].updateSlot(ig.game.colorSlot[rando_slot_hint]); 
                        this.money = this.money - 50;
                        ig.game.sessionData.playerMoney = this.money;
                        ig.game.saveAll();
                    }
                    else { // if random slot is filled, get next viable slot to fill
                       var color_slots = ig.game.colorSlot
                       var rando_viable_index = color_slots.indexOf('x');   
                      
                        ig.game.colorSlot[rando_viable_index] = ig.color_levels.Groups[0].Levels[this.controller.level-1].Color_Answer[rando_viable_index];
                        this.controller.answerspot[rando_viable_index + this.controller.columncount].updateSlot(ig.game.colorSlot[rando_viable_index]); 
                        this.money = this.money - 50;
                        ig.game.sessionData.playerMoney = this.money;
                        ig.game.saveAll();
                    }
                    
                }
                



                /*else if (!ig.game.sessionData.tutorialDone && ig.game.sessionData.level < 2 && ig.game.getEntitiesByType(EntityGameplayController)[0].tutorialIndexPos <= 2 && this.money >= 50){
                   ig.soundHandler.sfxPlayer.play("click");
                   this.money = this.money - 50;
                   ig.game.colorSlot[1] = ig.color_levels.Groups[0].Levels[this.controller.level-1].Color_Answer[1];
                   this.controller.answerspot[1 + this.controller.columncount].updateSlot(ig.game.colorSlot[1]);

                   this.hintBtn.tween({offset:{x:0,y:-15}}, 0.5, { //animating the box behind answer color slots to fade up and move up
                    easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                    onComplete: function() {
                        this.hintBtn.currentAnim.alpha = 0.5;
                        }.bind(this)
                        }).start();
                   this.hintBtn.isEnabled = false;
                   ig.game.getEntitiesByType(EntityGameplayController)[0].tutorialIndexPos++;
                   ig.game.getEntitiesByType(EntityGameplayController)[0].tutorialCursorChangePos();
                }*/
                //console.log(ig.game.colorSlot)

                else if (this.money<50){
                    ig.soundHandler.sfxPlayer.play("insufficientfund");
                    this.hintBtn.teeter();
                }
            }

           
        },

        extraTry:function(){
            if (this.money >= 50){
                ig.soundHandler.sfxPlayer.play("click");
                this.money = this.money - 50;
                ig.game.sessionData.playerMoney = this.money;
                ig.game.saveAll();
                this.controller.extra_chance = true;
                this.extraTryBtn.isEnabled = false;

                this.extraTryBtn.tween({offset:{x:0,y:-15}}, 0.5, { //animating the box behind answer color slots to fade up and move up
                    easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                    onComplete: function() {
                        this.extraTryBtn.currentAnim.alpha = 0.5;
                        }.bind(this)
                        }).start();


                /*if (!ig.game.sessionData.tutorialDone && ig.game.sessionData.level < 2){
                    ig.game.getEntitiesByType(EntityGameplayController)[0].tutorialIndexPos++;
                    ig.game.getEntitiesByType(EntityGameplayController)[0].tutorialCursorChangePos();
                }*/
            }
            else if (this.money<50){
                ig.soundHandler.sfxPlayer.play("insufficientfund");
                this.extraTryBtn.teeter();
            }
        },

        disableClickableEntities:function(){
            this.pauseBtn.isEnabled = false;
            //if (ig.game.sessionData.tutorialDone){
                this.hintBtn.isEnabled = false;
                this.extraTryBtn.isEnabled = false;

                for (i=0; i < this.controller.clickables.length; i++){
                   this.controller.clickables[i].isEnabled = false;

                }
            //}
        },

        enableClickableEntities:function(){
            this.pauseBtn.isEnabled = true;
            //if (ig.game.sessionData.tutorialDone){
                this.hintBtn.isEnabled = true;
                this.extraTryBtn.isEnabled = true;
                for (i=0; i < this.controller.clickables.length; i++){
                    this.controller.clickables[i].isEnabled = true;
                }
            
                if (!this.tutorial_trigger && !ig.game.sessionData.tutorialDone){
                    for (i=0; i < this.controller.clickables.length; i++){
                        this.controller.clickables[i].isEnabled = false;
                    }
                    this.controller.clickables[this.controller.tutorialIndexPos].isEnabled = true;
                } 
                
            //}
            
        }


    });
});
