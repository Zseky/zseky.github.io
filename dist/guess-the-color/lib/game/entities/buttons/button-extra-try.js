ig.module('game.entities.buttons.button-extra-try')
.requires(
	'game.entities.buttons.button'
)
.defines(function() {
	EntityButtonExtraTry = EntityButton.extend({
        animSheet: new ig.AnimationSheet('media/graphics/sprites/games/extra-chance.png',156,182),
		onClickCallback: null,
        isEnabled: true,
		size:{x:156,
			y:182,
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
		over: function()
		{
			if(!ig.game.buttonPressed)
				ig.game.buttonPressed = true;
		},

		leave: function()
		{
			if(ig.game.buttonPressed)
				ig.game.buttonPressed = false;

		},
		clicked:function()
		{

			if(this.isEnabled){
				if(this.initPosY==null)
					this.initPosY = this.anchoredPositionY;
                this.tween({anchoredPositionY:this.initPosY+5}, 0.2, {}).start();
				ig.game.buttonPressed = true;
				//ig.soundHandler.sfxPlayer.play("click");

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
				ig.game.buttonPressed = false;
				if(this.onClickCallback!=null)
					this.onClickCallback();
			}
		},
		teeter:function(){
			this.tween({offset:{x: -10,y:0}},0.025,{ easing: ig.Tween.Easing.Sinusoidal.EaseOut,
			onComplete:function(){
				this.tween({offset:{x: 10,y:0}},0.05,{ easing: ig.Tween.Easing.Sinusoidal.EaseOut,
				onComplete:function(){
					this.tween({offset:{x: -10,y:0}},0.025,{ easing: ig.Tween.Easing.Sinusoidal.EaseOut,
					onComplete:function(){
						this.tween({offset:{x: 10,y:0}},0.05,{ easing: ig.Tween.Easing.Sinusoidal.EaseOut,
						onComplete:function(){
							this.tween({offset:{x: 0,y:0}},0.025,{ easing: ig.Tween.Easing.Sinusoidal.EaseOut,
							onComplete:function(){

							}.bind(this)
							}).start();
						}.bind(this)
						}).start();
					}.bind(this)
					}).start();
				}.bind(this)
				}).start();
			}.bind(this)
			}).start();
		}
	});
});