ig.module('game.entities.controllers.level-controller')
.requires(
	'impact.entity',
	'game.entities.buttons.button-level',
	'game.entities.buttons.button-switch-level-page-left',
	'game.entities.buttons.button-switch-level-page-right',
	"game.entities.miscellaneous.page-select"
)
.defines(function() {
	EntityLevelController = ig.Entity.extend({
		bgImage : new ig.Image('media/graphics/sprites/games/BG.png'),
		levelselectImage: new ig.Image('media/graphics/sprites/games/level_select.png'),
		size: { x: 1080, y: 1080 },
		anchorPivot: { x: 0.5, y: 0.5 },
		init:function(x, y, settings){
			this.parent(x,y,settings);
			this.switch_level = false;
			this.setAnchoredPosition(0,0,"center-middle");
			//ig.game.sessionData.achieved = 20; //uncomment to unlock all levels
			this.spawnLevelButtons();
			
			this.homeBtn = ig.game.spawnEntity(EntityButtonHome, 0, 0, {zIndex: this.zIndex+1, onClicked: function(){this.onClickHome()}.bind(this)});
			this.homeBtn.setAnchoredPosition(-this.homeBtn.size.x - 50, 55, "top-right");

			this.switchlevelpageright = ig.game.spawnEntity(EntityButtonSwitchLevelPageRight, 0, 0, {zIndex: this.zIndex+1, onClicked: function(){this.onClickSwitchPage()}.bind(this)});
			this.switchlevelpageright.setAnchoredPosition(this.switchlevelpageright.size.x,- this.switchlevelpageright.size.y - 20 , "bottom-center");

			this.switchlevelpageleft = ig.game.spawnEntity(EntityButtonSwitchLevelPageLeft, 0, 0, {zIndex: this.zIndex+1, onClicked: function(){this.onClickSwitchPage()}.bind(this)});
			this.switchlevelpageleft.setAnchoredPosition(- this.switchlevelpageleft.size.x * 2, - this.switchlevelpageleft.size.y - 20 , "bottom-center");
			
			this.pageselect1 = ig.game.spawnEntity(EntityPageSelect, 0,0, {zIndex: this.zIndex+1});
			this.pageselect1.setAnchoredPosition(-this.pageselect1.size.x - 20, -this.pageselect1.size.y -55, "bottom-center");

			this.pageselect2 = ig.game.spawnEntity(EntityPageSelect, 0,0,{zIndex: this.zIndex+1, activity: 1});
			this.pageselect2.setAnchoredPosition(20 , -this.pageselect2.size.y -55, "bottom-center");
			


		},
		spawnLevelButtons:function(){
			var level_loop_counter = 1;
			var level_locked = false;
			var column = 4;
			var row = 3;
			var boxSize = 208;
            var margin = 6;
            var startX = -((boxSize*column) + (margin*(column-1)))/2 +2;
            var startY = boxSize*0.5 - boxSize*row*0.5 - margin*Math.floor(row*0.5) - 101;
            margin = boxSize + margin;
            for (var i = 0; i < row; i++ ){
				for (var x = 0; x < column; x++) {
					if (level_loop_counter > ig.game.sessionData.achieved) level_locked = true; 
					if(i<2){
						var box = ig.game.spawnEntity(EntityButtonLevel, startX + margin*x,  startY + margin*i, {
	                        portraitScaling: true,
	                        maxPortraitAnchorScale: 1,
	                        maxPortraitScale: 1,
	                        level_indicator: level_loop_counter,
	                        isEnabled: true,
	                        locked: level_locked
                    	});
                    	box.updateOnSwitch();

					}
					else{
						if (x>=2){
                    		x=column
                    		break;
                    	}
                    	var box = ig.game.spawnEntity(EntityButtonLevel, startX + margin*(x+1),  startY + margin*i, {
	                        portraitScaling: true,
	                        maxPortraitAnchorScale: 1,
	                        maxPortraitScale: 1,
	                        level_indicator: level_loop_counter,
	                        isEnabled: true,
	                        locked: level_locked
                    	});
                    	box.updateOnSwitch();
					}
                    level_loop_counter++

               }
            }
		},

		draw:function(){
			this.parent()

            var center = ig.responsive.toAnchor(0, 0, "center-middle");
            this.scaleX = (ig.system.width/this.size.x);
            this.scaleY = (ig.system.height/this.size.y);
            var scale = (this.scaleX > this.scaleY) ? this.scaleX : this.scaleY;
           	ig.responsive.drawScaledImage(this.bgImage, center.x, center.y, scale, scale, 0.5, 0.5);
            
           	var top_middle = ig.responsive.toAnchor(0, 0, "center-top");

           	this.levelselectImage.draw(top_middle.x - this.levelselectImage.width/2 , top_middle.y + this.levelselectImage.height/4);
		},
		onClickHome:function(){
			this.kill();

            ig.game.loadLevelDeferred( ig.global['LevelTitle'] );
           
		},
		onClickSwitchPage:function(){
			this.switch = !this.switch

			for (var i = 0; i < ig.game.getEntitiesByType(EntityPageSelect).length;i++){
				ig.game.getEntitiesByType(EntityPageSelect)[i].switch_picture();
			}
			if (this.switch){
				level_loop_counter = 11;
			} else{
				level_loop_counter = 1;
			}
			var level_locked = false;
			for (var x = 0; x < 10; x++ ){
				var box = ig.game.getEntitiesByType(EntityButtonLevel)
				if (level_loop_counter > ig.game.sessionData.achieved) level_locked = true;
				box[x].level_indicator = level_loop_counter;
				box[x].locked = level_locked;
				box[x].updateOnSwitch();
				level_loop_counter++
			}	
			
		}

	});
});
