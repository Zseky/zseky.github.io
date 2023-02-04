ig.module("game.entities.miscellaneous.background-box")
	.requires("impact.entity")
	.defines(function() {
		EntityBackgroundBox = ig.Entity.extend({
			size: {x: 395,y: 130},
			offset:{x: 0, y:0},
			zIndex:3,
			animSheet: [
							new ig.AnimationSheet('media/graphics/sprites/games/base-three.png', 395,130),
							new ig.AnimationSheet('media/graphics/sprites/games/base-four.png', 532,130)
						], 
			activity: 0,
			init: function(x, y, settings) {
				this.parent(x, y, settings);
				this.setAnchoredPosition(x, y, "center-middle");
				this.idle = new ig.Animation(this.animSheet[this.activity], 1, [0]);
           		this.currentAnim = this.idle;
				if (settings.alpha_measure == null | undefined) settings.alpha_measure = 1;
				this.currentAnim.alpha = settings.alpha_measure;
			},

			draw:function(){
				this.parent();
			},
			resetBox:function(){
				this.tween({offset:{x:0,y:-15}}, 0.5, {
                easing: ig.Tween.Easing.Sinusoidal.EaseOut,
                onComplete: function() {
                	this.currentAnim.alpha = 0.5;
                }.bind(this)
				}).start();
			}
		});
	});