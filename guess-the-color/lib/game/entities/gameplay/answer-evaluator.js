ig.module('game.entities.gameplay.answer-evaluator')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityAnswerEvaluator = ig.Entity.extend({
        size: { x: 185, y: 145 },
        isEnabled: null,
        onClickCallback: null,
        anchorPivot: { x: 0, y: 0 },
       	animSheet: [	
       					new ig.AnimationSheet('media/graphics/sprites/games/wrong.png', 185,145),
                        new ig.AnimationSheet('media/graphics/sprites/games/right.png', 186,145), 
       					new ig.AnimationSheet('media/graphics/sprites/games/wrong_place.png', 185,145),
       				],
       	answer_assigned: 0,
       	type: ig.Entity.TYPE.A,
       	checkAgainst: ig.Entity.TYPE.A,
       	zIndex: 4,
        scale:{x:1,y:1},
        alpha_measure: 0,
        init:function(x,y,settings){
            this.isEnabled = true;
            this.parent(x,y,settings);
            this.setAnchoredPosition(x-this.size.x/2,y-this.size.y/2, "center-middle");
            this.idle = new ig.Animation(this.animSheet[this.answer_assigned], 1, [0]);
            this.currentAnim = this.idle;
            this.timer= new ig.Timer(this.counter);
            this.shown = false;
        },

        update:function(){
        	this.parent();
            this.currentAnim.alpha = this.alpha_measure; 
            //this.timer.delta()
            if (this.timer.delta() > 0 && this.shown == false){
                this.showNow();
                this.shown = true;
            }

        },
        showNow:function(){

            this.tween({alpha_measure: 1}, 0.2, {
            easing: ig.Tween.Easing.Sinusoidal.EaseOut,
            onComplete:function(){
                
            }
            }).start();
            
        },
        draw:function(){
            var anchor = ig.responsive.toAnchor(0, 0, "center-middle");
        	this.parent();
        	var ctx = ig.system.context;
        	ctx.save();
        	//ctx.scale(this.scale.x, this.scale.y);
        	ctx.restore();
        },
        resetEvaluator:function(){
            this.tween({alpha_measure: 0}, 0.3, {
            easing: ig.Tween.Easing.Sinusoidal.EaseOut,
            onComplete:function(){
                this.currentAnim.alpha = 0;
            }.bind(this)
            }).start();
        }
    });
});