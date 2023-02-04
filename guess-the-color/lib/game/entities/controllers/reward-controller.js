ig.module('game.entities.controllers.reward-controller')
.requires(
    'impact.entity',
    'game.entities.controllers.popup-controller',
    'game.entities.buttons.button-ok'

)
.defines(function() {
    EntityRewardController = EntityPopupController.extend({
        panelImage : new ig.Image('media/graphics/sprites/games/gameover_popup.png'), 
        onCloseCallback: null,
       
        zIndex: 100,
        xPos: 0,
        messageRv: null,
        init:function(x, y, settings){
            this.xPos = -ig.responsive.width;
            this.parent(x, y, settings);

            if(settings.onClosed!=null)
                this.onCloseCallback = settings.onClosed;
    
            this.okBtn = this.spawnEntity(EntityButtonOk, 0, -100, {zIndex: this.zIndex + 1, onClicked: function(){this.onClickOk()}.bind(this), controller:this });
            this.okBtn.setAnchoredPosition(-this.okBtn.size.x/2 , this.anchoredPositionY + 50, "center-middle");

            ig.game.sortEntitiesDeferred();
            this.tween({xPos:0}, 0.3, {easing: ig.Tween.Easing.Exponential.EaseInOut}).start();

        },

        onClickOk:function(){
            this.kill();

            this.controller.homeBtn.isEnabled = true;
            this.controller.nextLevelBtn.isEnabled = true;
            this.controller.retryLevelBtn.isEnabled = true;

        }, 

        draw:function(){
            this.parent();
            this.fnDrawRectangle();
            var center = ig.responsive.toAnchor(0, 0, "center-middle");
            var scaleX = ig.system.width/this.size.x;
            var scaleY = ig.system.height/this.size.y;
           

            this.panelImage.draw(this.xPos + center.x-this.panelImage.width/2, center.y-this.panelImage.height/2);
            
           
            var text 

             var ctx = ig.system.context;
            if (this.messageRv == "success"){
               

                ctx.font = 'normal 70px montserrat';
                ctx.fillStyle =  ctx.fillStyle = "rgba(255,255,255, 255)";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'; 

                text = _STRINGS.Game.RewardVideo;
                ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 - 255);
                text = _STRINGS.Game.RewardCallbackSuccess;
                ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 - 185);

            }

            else if (this.messageRv == "failed"){
              
                ctx.font = 'normal 70px montserrat';
                ctx.fillStyle =  ctx.fillStyle = "rgba(255,255,255,255)";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'; 

                text = _STRINGS.Game.RewardVideo;
                ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 - 255);
                text = _STRINGS.Game.RewardCallbackFailed;
                ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 - 185);


            }


           


        },

        fnDrawRectangle:function(){
            ig.system.context.save();
            ig.system.context.fillStyle = '#000000';
            ig.system.context.globalAlpha = 0.5;
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            ig.system.context.restore();
        }
        
    });
});
