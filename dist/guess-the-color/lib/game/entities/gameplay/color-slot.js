ig.module('game.entities.gameplay.color-slot')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityColorSlot = ig.Entity.extend({
        size: { x: 89, y: 89 },
        isEnabled: null,
        onClickCallback: null,
        anchorPivot: { x: 0, y: 0 },
       	animSheet: [	
       					new ig.AnimationSheet('media/graphics/sprites/games/ball-red.png', 89,88), 
       					new ig.AnimationSheet('media/graphics/sprites/games/ball-green.png', 89,88),
       					new ig.AnimationSheet('media/graphics/sprites/games/ball-blue.png', 89,89),
                        new ig.AnimationSheet('media/graphics/sprites/games/ball-orange.png', 89,88),
                        new ig.AnimationSheet('media/graphics/sprites/games/ball-yellow.png', 89,89),
                        new ig.AnimationSheet('media/graphics/sprites/games/ball-purple.png', 89,89),
       				],
        offset:{x: 0, y:0},
       	color_assigned: 0,
       	type: ig.Entity.TYPE.A,
       	checkAgainst: ig.Entity.TYPE.A,
       	zIndex: 10,
        measuredoff: 0,
        init:function(x,y,settings){
            this.tutorialDone = ig.game.sessionData.tutorialDone;
            this.isEnabled = true;
            this.parent(x,y,settings);
            this.setAnchoredPosition(x - this.size.x /2, y-this.size.x/2, "center-middle");
            this.idle = new ig.Animation(this.animSheet[this.color_assigned], 1, [0]);
            this.currentAnim = this.idle;
        },

        update:function(){
        	this.parent();
            this.offset.x = this.measuredoff; 
            this.offset.y = this.measuredoff;
            //this.setScale(this.scale.x, this.scale.y);
            //this.setAnchoredPosition(this.pos.x, this.pos.y);
        },
        draw:function(){
            var anchor = ig.responsive.toAnchor(0, 0, "center-middle");
        	this.parent();
        	var ctx = ig.system.context;
        	ctx.save();
        	//ctx.scale(this.scale.x, this.scale.y);
        	ctx.restore();
        },
        clicked:function(){
            if(this.isEnabled == true){
             this.tween({measuredoff: -89 * 0.1, _scale:{x:0.8,y:0.8}}, 0.1, {
                manager:this,
                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                }).start();
            }
         },
        leave:function(){
             this.tween({_scale:{x:1,y:1}, measuredoff: 0}, 0.1, {
                manager:this,
                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                
                }).start();
        },
        released:function(){
            if(this.isEnabled == true){
            this.tween({_scale:{x:1,y:1}, measuredoff: 0}, 0.1, {
                manager:this,
                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                }).start();

                
               
                for(var x = 0; x < ig.game.colorSlot.length; x++){
                    if(ig.game.colorSlot[x] == 'x'| ig.game.colorSlot[x] == 'y'){
                        ig.game.colorSlot[x] = this.color_assigned;
                        break;
                    }
                }
                if (!this.tutorialDone && this.controller.level < 3 && !this.controller.uiController.tutorial_trigger){
                    this.controller.tutorialCursorChangePos();
                }
                ig.soundHandler.sfxPlayer.play("pop");
                //console.log(ig.game.colorSlot);
            }
        }
    });
});