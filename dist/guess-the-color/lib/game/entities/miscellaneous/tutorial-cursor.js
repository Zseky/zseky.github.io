ig.module("game.entities.miscellaneous.tutorial-cursor")
	.requires("impact.entity")
	.defines(function() {
		EntityTutorialCursor = ig.Entity.extend({
			size: {x: 97,y: 107},
			
			offset: {x: 0, y:0},
			animSheet: new ig.AnimationSheet('media/graphics/sprites/games/cursor.png',97,107),
			init: function(x, y, settings) {
				this.parent(x, y, settings);
				this.addAnim("idle", 0.3, [0,1]);
           		this.currentAnim = this.anims.idle;
           		
			},
			draw:function(){
				this.parent();
			}
		});
	});