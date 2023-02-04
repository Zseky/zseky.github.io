ig.module('game.entities.buttons.button-play')
.requires(
	'game.entities.buttons.button'
)
.defines(function() {
	EntityButtonPlay = EntityButton.extend({
        animSheet: new ig.AnimationSheet('media/graphics/sprites/games/play.png',268,267),
        onClickCallback: null,

		size:{x:268,
			y:267,
		},
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
                if(this.onClickCallback!=null)
                    this.onClickCallback();
            }
		}
	});
});