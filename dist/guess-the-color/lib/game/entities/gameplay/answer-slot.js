ig.module('game.entities.gameplay.answer-slot')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityAnswerSlot = ig.Entity.extend({
        centeredScale: true,
        size: { x: 89, y: 89 },
        anchorPivot: { x: 0, y: 0},
       	animSheet_empty: new ig.AnimationSheet('media/graphics/sprites/games/ball-red.png', 89,88), 
       	animSheet_filled: [ 
                        new ig.AnimationSheet('media/graphics/sprites/games/ball-red.png', 89,88), 
                        new ig.AnimationSheet('media/graphics/sprites/games/ball-green.png', 89,88),
                        new ig.AnimationSheet('media/graphics/sprites/games/ball-blue.png', 89,89),
                        new ig.AnimationSheet('media/graphics/sprites/games/ball-orange.png', 89,88), 
                        new ig.AnimationSheet('media/graphics/sprites/games/ball-yellow.png', 89,89),
                        new ig.AnimationSheet('media/graphics/sprites/games/ball-purple.png', 89,89), 

                    ],
       	color_assigned: [],
       	type: ig.Entity.TYPE.A,
       	checkAgainst: ig.Entity.TYPE.A,
        scale: {x:0,y:0},
        offset: {x:0,y:0},
       	zIndex: 10,
        measuredoff: 0,
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.animation_played = false; 
            this.setAnchoredPosition(x - this.size.x /2, y-this.size.x /2, "center-middle");
            
            this.empty = new ig.Animation(this.animSheet_empty, 1, [0]);
            this.filled = new ig.Animation(this.animSheet_filled[0], 1, [0]);
            //this.color_assigned = this.color_list[randoanimsheet];
            this.currentAnim = this.empty;
        },

        update:function(){
        	this.parent();
            this.offset.x = this.measuredoff; 
            this.offset.y = this.measuredoff;
            //this.setScale(this.scale.x, this.scale.y);
        },
        draw:function(){
            var anchor = ig.responsive.toAnchor(0, 0, "center-middle");
        	this.parent();
        	var ctx = ig.system.context;
        	ctx.save();
        	//ctx.scale(this.scale.x, this.scale.y);
        	ctx.restore();

        },
        updateSlot:function(x){
            if (x!=undefined | null | 'x'){
                this.filled = new ig.Animation(this.animSheet_filled[x], 1, [0]);
                this.currentAnim = this.filled;
                if (this.animation_played == false){
                    this.animation_played = true;
                    //this.offset.x = -this.size.x;
                    //this.offset.y = -this.size.y;
                    this.tween({_scale:{x:1,y:1}, measuredoff: 89/2}, 0.05, {
                    manager:this,
                    easing: ig.Tween.Easing.Sinusoidal.EaseOut,

                    onComplete:function(){
                        //ig.soundHandler.sfxPlayer.play("pop");
                    }.bind(this)
                    }).start(); 
                }

                
            }
        },
        resetBall: function(){
            this.tween({_scale:{x:0,y:0}, measuredoff: 0}, 0.05, {
                    easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                    onComplete:function(){
                        this.animation_played = false; 
                        this.empty = new ig.Animation(this.animSheet_empty, 1, [0]);
                        this.currentAnim = this.empty;

                    }.bind(this)
                    }).start(); 
            
        }
    });
});