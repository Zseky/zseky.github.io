ig.module('game.entities.controllers.gameover-controller')
.requires(
    'impact.entity',
    'game.entities.controllers.popup-controller',
    'game.entities.buttons.button-home',
    'game.entities.buttons.button-next-level',
    'game.entities.buttons.button-retry',
    'game.entities.buttons.button-double-reward',
    'game.entities.controllers.reward-controller'

)
.defines(function() {
    EntityGameoverController = EntityPopupController.extend({
        panelImage : new ig.Image('media/graphics/sprites/games/popup.png'), 
        rewardImage: new ig.Image('media/graphics/sprites/games/reward.png'),
        coinImage: new ig.Image('media/graphics/sprites/games/coin.png'),
        onCloseCallback: null,
        highScore: false,
        zIndex: 50,
        xPos: 0,
        gameResult: null,
        show_now_reward: false,
        init:function(x, y, settings){
            this.reward = settings.rewardTemplate;
            this.xPos = -ig.responsive.width;
            this.parent(x, y, settings);
            this.tip_over1 = null;
            this.tip_over2 = null; 
            if(settings.onClosed!=null)
                this.onCloseCallback = settings.onClosed;
            
            if (this.gameResult == "win"){ 
                this.homeBtn = this.spawnEntity(EntityButtonHome, 0  , -100, {zIndex: this.zIndex + 1,onClicked: function(){this.onClickedhome()}.bind(this), controller: this, anchor: "center-middle", xPos:this.xPos, popup_child: true });
                this.homeBtn.setAnchoredPosition( - this.homeBtn.size.x/2 - this.homeBtn.size.x - 20 , this.anchoredPositionY + 200, "center-middle");
                this.nextLevelBtn = this.spawnEntity(EntityButtonNextLevel, 0, -100, {zIndex: this.zIndex + 1, onClicked: function(){this.onClickedNextLevel()}.bind(this), controller:this });
                this.nextLevelBtn.setAnchoredPosition(-this.nextLevelBtn.size.x/2 , this.anchoredPositionY + 200, "center-middle");
                this.retryLevelBtn = this.spawnEntity(EntityButtonRetry, 0, -100, {zIndex: this.zIndex + 1, onClicked: function(){this.onClickedRetry()}.bind(this), controller:this })
                this.retryLevelBtn.setAnchoredPosition(-this.retryLevelBtn.size.x/2 +this.retryLevelBtn.size.x+ 20, this.anchoredPositionY + 200, "center-middle");
                //if(ig.game.sessionData.achieved == ig.game.sessionData.level){ // checks if level has been completed already or not to render end level rewards
                if (_SETTINGS.RewardedVideo.Enabled) this.doubleRewardShow();
                
                //}
            }
            else{
                this.panelImage = new ig.Image('media/graphics/sprites/games/gameover_popup.png')
                this.homeBtn = this.spawnEntity(EntityButtonHome, 0  , -100, {onClicked: function(){this.onClickedhome()}.bind(this), controller: this, anchor: "center-middle", xPos:this.xPos, popup_child: true });
                this.homeBtn.setAnchoredPosition( - this.homeBtn.size.x/2 - this.homeBtn.size.x/2 - 20 , this.anchoredPositionY + 120, "center-middle");
                this.retryLevelBtn = this.spawnEntity(EntityButtonRetry, 0, -100, {zIndex: this.zIndex + 1, onClicked: function(){this.onClickedRetry()}.bind(this), controller:this })
                this.retryLevelBtn.setAnchoredPosition(-this.retryLevelBtn.size.x/2 +this.retryLevelBtn.size.x/2 + 20, this.anchoredPositionY + 120, "center-middle");
                this.tipsGenerator();
            }
            
            this.rvAlpha = 1;


           
            

            ig.game.sortEntitiesDeferred();
            this.tween({xPos:0}, 0.3, {easing: ig.Tween.Easing.Exponential.EaseInOut}).start();

        },
        doubleRewardShow: function(){
            this.doubleRewardBtn = this.spawnEntity(EntityButtonDoubleReward, 0, 0, {zIndex: this.zIndex + 1, onClicked: function(){this.onClickedDoubleReward()}.bind(this), controller:this })
            this.doubleRewardBtn.setAnchoredPosition(-this.doubleRewardBtn.size.x/2, this.anchoredPositionY + 60, "center-middle");
        },

        draw:function(){
            this.parent();
            this.fnDrawRectangle();
            var center = ig.responsive.toAnchor(0, 0, "center-middle");
            var scaleX = ig.system.width/this.size.x;
            var scaleY = ig.system.height/this.size.y;
           

            this.panelImage.draw(this.xPos + center.x-this.panelImage.width/2, center.y-this.panelImage.height/2);
            
           
            var text 

                  
            var currentLevel = ig.game.getEntitiesByType(EntityGameplayController)[0].level;
            if (this.gameResult == "win") {

                var ctx = ig.system.context;
                ctx.font = 'normal 80px montserrat';
                ctx.fillStyle = "#ee4791";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'; 

                text = String(this.reward);

                ctx.fillText(text, this.xPos + center.x-text.length/2 + 40, center.y-this.coinImage.height/2 + 47);


                this.rewardImage.draw(this.xPos + center.x-this.rewardImage.width/2, center.y-this.rewardImage.height-70);
                this.coinImage.draw(this.xPos + center.x-this.coinImage.width/2- 80, center.y-this.coinImage.height/2 );

               
                
                var ctx = ig.system.context;
                ctx.font = 'normal 70px montserrat';
                ctx.fillStyle = "#FFFFFF";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'; 


                text = _STRINGS.Game.Level+ " " + currentLevel; 
                ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 - 325);
                text = _STRINGS.Game.Complete;
                ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 - 245);
                
            }
            else if(this.gameResult == "lose"){


                var ctx = ig.system.context;
                ctx.font = 'normal 70px montserrat';
                ctx.fillStyle = "#FFFFFF";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'; 

                text = _STRINGS.Game.Lose;
                ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 - 205);

                ctx.font = 'normal 35px montserrat';
                ctx.fillStyle = "rgba(238,58,127,255)";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'; 

                if (this.tip_over2 != ""){
                    //console.log("double");
                    text = this.tip_over1;
                    ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 -17.5);
                    text = this.tip_over2;
                    ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 +17.5);
                }
                else {
                    //console.log("single");
                    text = this.tip_over1;
                    ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 );
                }
               
            }
           

        },

        tipsGenerator:function(){
            var tipDeterminer = Math.floor(Math.random() * (7 - 1 + 1) + 1);
            switch (tipDeterminer){
                case 1: 
                    this.tip_over1 = _STRINGS.Game.text_tips1a; 
                    this.tip_over2 = _STRINGS.Game.text_tips1b;
                    break;
                case 2: 
                    this.tip_over1 = _STRINGS.Game.text_tips2a; 
                    this.tip_over2 = _STRINGS.Game.text_tips2b;
                    break;
                case 3: 
                    this.tip_over1 = _STRINGS.Game.text_tips3a; 
                    this.tip_over2 = _STRINGS.Game.text_tips3b;
                    break;
                case 4: 
                    this.tip_over1 = _STRINGS.Game.text_tips4a; 
                    this.tip_over2 = _STRINGS.Game.text_tips4b;
                    break;
                case 5: 
                    this.tip_over1 = _STRINGS.Game.text_tips5a; 
                    this.tip_over2 = _STRINGS.Game.text_tips5b;
                    break;
                case 6: 
                    this.tip_over1 = _STRINGS.Game.text_tips6a; 
                    this.tip_over2 = _STRINGS.Game.text_tips6b;
                    break;
                case 7: 
                    this.tip_over1 = _STRINGS.Game.text_tips7a; 
                    this.tip_over2 = _STRINGS.Game.text_tips7b;
                    break;
            }
        },

        onClickedhome: function()
        {
            ig.game.loadLevelDeferred( ig.global['LevelTitle'] );
        },

        onClickedNextLevel: function()
        {
            if (ig.game.sessionData.level < 20){ // if all levels completed, load level controller
                    ig.game.sessionData.level++;
                    ig.game.loadLevelDeferred( ig.global['LevelGameplay'] );
                    console.log("not complete")
                }
            else {
                    ig.game.loadLevelDeferred( ig.global['LevelPage'] );
                    console.log("complete");
                }
        },
        onClickedRetry:function(){
            ig.game.loadLevelDeferred( ig.global['LevelGameplay'] );
        },
        onClickedDoubleReward:function(){
            this.showRewardedVideo();
        },

        fnDrawRectangle:function(){
            ig.system.context.save();
            ig.system.context.fillStyle = '#000000';
            ig.system.context.globalAlpha = 0.5;
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            ig.system.context.restore();
        },
                //REWARDED VIDEO CALL
        showRewardedVideo: function () {
            //directly call the result for now, will be replaced by API Later

            var reward_determiner = Math.random();
            var rewardRandom = false;
            if (reward_determiner<0.5){
                rewardRandom = true;
            }

            this.rewardedVideoResult(rewardRandom);
        },
         
        rewardedVideoResult: function (isSuccess) {
            //add code after the rewarded video is displayed
            if (isSuccess) {
                ig.game.sessionData.playerMoney += this.reward;
                ig.game.saveAll();
                this.controller.uiController.money = ig.game.sessionData.playerMoney;
                this.reward = this.reward*2;
                this.doubleRewardBtn.kill();
                this.reward_panel = ig.game.spawnEntity(EntityRewardController, 0,0, {controller: this, messageRv: "success"} );
                this.reward_panel.setAnchoredPosition(0, 0, "center-middle");
                this.homeBtn.isEnabled = false;
                this.nextLevelBtn.isEnabled = false;
                this.retryLevelBtn.isEnabled = false;


            } else {

                this.doubleRewardBtn.kill();
                this.reward_panel = ig.game.spawnEntity(EntityRewardController, 0,0, {controller: this, messageRv: "failed"} );
                this.reward_panel.setAnchoredPosition(0, 0, "center-middle");
                this.homeBtn.isEnabled = false;
                this.nextLevelBtn.isEnabled = false;
                this.retryLevelBtn.isEnabled = false;
            }
        }
        
    });
});
