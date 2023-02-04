ig.module("game.entities.miscellaneous.page-select")
	.requires("impact.entity")
	.defines(function() {
		EntityPageSelect = ig.Entity.extend({
			size: {x: 48.5,y: 49},
			animSheet: [
							new ig.AnimationSheet('media/graphics/sprites/games/active-page.png', 49,49),
							new ig.AnimationSheet('media/graphics/sprites/games/passive-page.png', 48,48)
						], 
			activity: 0,
			init: function(x, y, settings) {
				this.parent(x, y, settings);
				this.idle = new ig.Animation(this.animSheet[this.activity], 1, [0]);
           		this.currentAnim = this.idle;
				console.log(this.pos.x +"  "+this.pos.y)
			},
			switch_picture: function() {
				if (this.activity == 0){
					this.activity = 1;
					this.idle = new ig.Animation(this.animSheet[this.activity], 1, [0]);
           			this.currentAnim = this.idle;
				} else if (this.activity == 1 ){
					this.activity = 0;
					this.idle = new ig.Animation(this.animSheet[this.activity], 1, [0]);
           			this.currentAnim = this.idle;
				}
				
			},
			draw:function(){
				this.parent();
			}
		});
	});