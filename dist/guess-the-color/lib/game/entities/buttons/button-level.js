ig.module('game.entities.buttons.button-level')
.requires(
	'game.entities.buttons.button'
)
.defines(function() {
	EntityButtonLevel = EntityButton.extend({
        animSheet: [
        	new ig.AnimationSheet('media/graphics/sprites/games/tile.png',207,208),
        	new ig.AnimationSheet('media/graphics/sprites/games/tile_locked.png',207,208),
        	],
        onClickCallback: null,
        level_indicator: 1,
		size:{x:207,
			y:208,
		},
		initPosY: null,
		locked: false,
		tile_type: 0,
		init:function(x,y,settings){
			this.parent(x,y,settings);			
           	this.idle = new ig.Animation(this.animSheet[this.tile_type], 1, [0]);
           	this.currentAnim = this.idle;
            this.setAnchoredPosition(x,y, "center-middle");
            if(settings.onClicked!=null)
                this.onClickCallback = settings.onClicked;

            

			if(ig.global.wm)
			{
				return;
			}
		},
		clicked:function()
		{
			if(this.isEnabled){
				if(this.initPosY==null)
					this.initPosY = this.anchoredPositionY;
                this.tween({anchoredPositionY:this.initPosY+5}, 0.2, {}).start();
				//this.setScale(0.8,0.8);
				ig.soundHandler.sfxPlayer.play("click");
			}
		},
		clicking:function()
		{
			// this.parent();
        },

		leave: function()
		{
			if(this.anchoredPositionY!=this.initPosY)
				this.tween({anchoredPositionY:this.initPosY}, 0.2, {}).start();
		},

        
		released:function()
		{
            if(this.isEnabled)
            {
				this.tween({anchoredPositionY:this.initPosY}, 0.2, {}).start();
				ig.game.sessionData.level = this.level_indicator;
                ig.game.loadLevelDeferred( ig.global['LevelGameplay'] );
                if(this.onClickCallback!=null)
                    this.onClickCallback();
            }
		},
		draw:function(){

            //var anchor = ig.responsive.toAnchor(0, 0, "center-middle");
            this.parent()
            var ctx = ig.system.context;
            ctx.font = 'normal 80px montserrat';
            ctx.fillStyle = "#ee4791";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'; 

            if (this.locked == false) ctx.fillText(this.level_indicator, this.pos.x + this.size.x /2 - 2, this.pos.y + this.size.y /2 - 2);
            
		},
		updateOnSwitch: function(){
			if (this.locked == true){
				this.tile_type = 1;
				this.idle = new ig.Animation(this.animSheet[this.tile_type], 1, [0]);
           		this.currentAnim = this.idle;
				this.isEnabled = false;
				this.currentAnim.alpha = 0.5;
            } else{
            	this.tile_type = 0;
            	this.idle = new ig.Animation(this.animSheet[this.tile_type], 1, [0]);
           		this.currentAnim = this.idle;
				this.isEnabled = true;
				this.currentAnim.alpha = 1;
            } 
		}
	});
});