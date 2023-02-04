ig.module('game.entities.buttons.button-ok')
.requires(
	'game.entities.buttons.button'
)
.defines(function() {
	EntityButtonOk = EntityButton.extend({
        animSheet: new ig.AnimationSheet('media/graphics/sprites/games/tile.png',207,208),
       	isEnabled: true,
        onClickCallback: null,
		size:{x:207,
			y:208,
		},
		initPosX: null,
		initPosY: null,

		init:function(x,y,settings){
			this.parent(x,y,settings);			
           	this.idle = new ig.Animation(this.animSheet, 1, [0]);
           	this.currentAnim = this.idle;
            this.setAnchoredPosition(x,y, "center-middle");

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
		},
		draw:function(){

            //var anchor = ig.responsive.toAnchor(0, 0, "center-middle");
            this.parent()
            var ctx = ig.system.context;
            ctx.font = 'normal 80px montserrat';
            ctx.fillStyle = "#ee4791";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'; 

           ctx.fillText("OK", this.pos.x + this.size.x /2 - 2, this.pos.y + this.size.y /2 - 2);
            
		}
	});
});