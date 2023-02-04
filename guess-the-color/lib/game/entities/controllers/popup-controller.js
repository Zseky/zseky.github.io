ig.module('game.entities.controllers.popup-controller')
.requires(
	'impact.entity'
)
.defines(function() {
	EntityPopupController = ig.Entity.extend({

		childArr: [],

    	spawnEntity: function(entityClass, x, y, settings){
			var child = ig.game.spawnEntity(entityClass, this.pos.x+x, this.pos.y+y, settings);
			child.childX = x;
			child.childY = y;
			this.childArr.push(child);

			return child;
		},

		/*update: function(){
			for(var i=0;i<this.childArr.length;i++){
				this.childArr[i].pos.x = this.childArr[i].childX + this.pos.x;
				this.childArr[i].pos.y = this.childArr[i].childY + this.pos.y;
			}

			this.parent();
		},*/

		kill: function(){
			console.log("Child in popup " + this.childArr.length);
			for(var i=this.childArr.length-1;i>=0;i--){

				var child = this.childArr.pop();
				child.kill();
			}
			this.childArr = null;

			this.parent();
		}
	});
});
