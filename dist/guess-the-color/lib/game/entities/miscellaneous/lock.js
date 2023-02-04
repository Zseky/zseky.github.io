ig.module("game.entities.miscellaneous.lock")
	.requires("impact.entity")
	.defines(function() {
		EntityLock = ig.Entity.extend({
			size: {x: 153,y: 166},
			animSheet: [
						new ig.AnimationSheet('media/graphics/sprites/games/locked.png', 153,166),
						new ig.AnimationSheet('media/graphics/sprites/games/unlocked.png', 153,166)
					], 
			activity: 0,
			currentAnim_alpha: 1,
			init: function(x, y, settings) {
				this.parent(x, y, settings);
				this.idle = new ig.Animation(this.animSheet[this.activity], 1, [0]);
           		this.currentAnim = this.idle;
			},
			update:function(){
				this.parent();
				this.currentAnim.alpha = this.currentAnim_alpha;
			},
			swap_lock: function(x, y, settings){
				this.activity = 1;
				this.idle = new ig.Animation(this.animSheet[this.activity],1,[0]);
				this.currentAnim = this.idle;
				this.tween({offset:{x:0, y: -50}},0.05,{
					onComplete:function(){
						ig.soundHandler.sfxPlayer.play("unlock");
						this.tween({offset:{x:0, y: 100}, currentAnim_alpha: 0},0.15,{

						}).start()
					}.bind(this)
					}).start()
				
			},
			draw:function(){
				this.parent();
			}
		});
	});