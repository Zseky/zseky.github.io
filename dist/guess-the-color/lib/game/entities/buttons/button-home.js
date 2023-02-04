ig.module('game.entities.buttons.button-home')
.requires(
	'game.entities.buttons.button'
)
.defines(function() {
	EntityButtonHome = EntityButton.extend({
        animSheet: new ig.AnimationSheet('media/graphics/sprites/games/home.png',108,109),
        isEnabled: true,
        onClickCallback: null,
		initPosX: null,

		size:{x:108,
			y:109,
		},
		initPosY: null,

		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.popup_child = settings.popup_child;
			if (this.popup_child){
				this.animSheet = new ig.AnimationSheet('media/graphics/sprites/games/home-popup.png',122,122);
				this.size.x = 122;
				this.size.y = 122;
			}
            this.addAnim('idle', 1, [0]);

            if(settings.onClicked!=null)
                this.onClickCallback = settings.onClicked;

			if(ig.global.wm)
			{
				return;
			}
			
		},

		update: function()
		{
			
			if(this.controller!=null)
			{
				 if(this.initPosX ==null)
				 	this.initPosX = this.anchoredPositionX;
				
				this.anchoredPositionY = this.initPosY + this.controller.yPos;

			}
			this.parent();
		},	
		
		clicked:function()
		{
			console.log("Clicked home button");
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
                if(this.onClickCallback!=null)
                    this.onClickCallback();
            }
		}
	});
});