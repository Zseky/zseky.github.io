ig.module('game.entities.buttons.button-toggle')
.requires(
	'game.entities.buttons.button'
)
.defines(function() {
	EntityButtonToggle = EntityButton.extend({
        onImage: new ig.Image('media/graphics/sprites/games/on.png'),
        offImage: new ig.Image('media/graphics/sprites/games/off.png'),
        isEnabled: true,
        onClickCallback: null,
        state: null,

		size:{x:326,
			y:123,
		},
		initPosX: null,
		initPosY: null,

		init:function(x,y,settings){
			this.parent(x,y,settings);
            // this.addAnim('idle', 1, [0]);

            if(settings.stete!=null)
                this.state = settings.state;

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
        
        changeState: function(state)
        {
            this.state = state;
			console.log("Change state button : " + this.state);
        },

		leave: function()
		{
			if(this.anchoredPositionY!=this.initPosY)
				this.tween({anchoredPositionY:this.initPosY}, 0.2, {}).start();
		},


		clicked:function()
		{
			if(this.isEnabled){
				if(this.initPosY==null)
					this.initPosY = this.anchoredPositionY;
                this.tween({anchoredPositionY:this.initPosY+5}, 0.2, {}).start();
				//this.setScale(0.8,0.8);
			}
		},
		clicking:function()
		{
			// this.parent();
        },
        
		released:function()
		{
            if(this.isEnabled)
            {
				this.tween({anchoredPositionY:this.initPosY}, 0.2, {}).start();
				this.changeState(!this.state);
                if(this.onClickCallback!=null)
                    this.onClickCallback(this.state);
            }
        },
        
        draw: function(){

			if(this.state)
			{
				this.onImage.draw(this.pos.x, this.pos.y);
			}
			else
			{
				this.offImage.draw(this.pos.x, this.pos.y);
			}
		}
	});
});