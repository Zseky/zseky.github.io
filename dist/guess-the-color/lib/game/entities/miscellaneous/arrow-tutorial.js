ig.module("game.entities.miscellaneous.arrow-tutorial")
	.requires("impact.entity")
	.defines(function() {
		EntityArrowTutorial = ig.Entity.extend({
			size: {x: 150,y: 150},
			mod_alpha: 0,
			animSheet: new ig.AnimationSheet('media/graphics/sprites/games/arrow_tutorial.png', 150,150),
			init: function(x, y, settings) {
				this.parent(x, y, settings);
				this.addAnim("idle", 1, [0]);
           		this.currentAnim = this.anims.idle;
           		this.currentAnim.alpha = this.mod_alpha;
			},
			draw:function(){
				this.parent();
			},
			show:function(){
				this.tween({offset:{x:0, y: -50}, mod_alpha: 1}, 0.5, {
					onComplete:function(){

					}.bind(this)
				}).start()
			},
			hide:function(){
				this.tween({offset:{x:0, y: 0}, mod_alpha: 0}, 0.5, {
					onComplete:function(){

					}.bind(this)
				}).start()
			},
			update:function(){
				this.parent();
				this.currentAnim.alpha = this.mod_alpha; 
			}
		});
	});