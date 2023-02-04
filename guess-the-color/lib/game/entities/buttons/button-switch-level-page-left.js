ig.module('game.entities.buttons.button-switch-level-page-left')
.requires(
	'game.entities.buttons.button'
)
.defines(function() {
	EntityButtonSwitchLevelPageLeft = EntityButton.extend({
        animSheet: new ig.AnimationSheet('media/graphics/sprites/games/left_button.png',122,122),
        isEnabled: true,
        onClickCallback: null,

		size:{x:122,
			y:122},
		initPosX: null,
		initPosY: null,

		init:function(x,y,settings){
			this.parent(x,y,settings);
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
				
				this.anchoredPositionX = this.initPosX + this.controller.xPos;
			}
			this.parent();
		},

		clicked:function()
		{
			if(this.isEnabled){
				if(this.initPosY==null)
					this.initPosY = this.anchoredPositionY;
                this.tween({anchoredPositionY:this.initPosY+5}, 0.2, {}).start();
                ig.soundHandler.sfxPlayer.play("click");
				//this.setScale(0.8,0.8);
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