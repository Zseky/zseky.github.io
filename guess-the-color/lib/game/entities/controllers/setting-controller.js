ig.module('game.entities.controllers.setting-controller')
.requires(
    'impact.entity',
    'game.entities.controllers.popup-controller',
    'game.entities.buttons.button-home',
    'game.entities.buttons.button-resume',
    'game.entities.buttons.button-toggle',
    'game.entities.buttons.button-retry'
)
.defines(function() {
    EntitySettingController = EntityPopupController.extend({ 
        panelImage : new ig.Image('media/graphics/sprites/games/popup.png'), 
        
        musicIconImg: new ig.Image('media/graphics/sprites/games/music.png'),
        soundIconImg: new ig.Image('media/graphics/sprites/games/volume.png'),
        controller: null,
        onCloseCallback: null,
        zIndex: 50,
        xPos: 0,

        init:function(x, y, settings){
            this.xPos = -ig.responsive.width;
            this.parent(x, y, settings);

            if(settings.controller!=null)
                this.controller=settings.controller;

            if(settings.onClosed!=null)
                this.onCloseCallback = settings.onClosed;

            var bgmVolume = ig.game.getMusicVolume();
            var sfxVolume = ig.game.getSoundVolume();

            console.log("Get bgm : " + bgmVolume + ", sfx : " + sfxVolume);
            
            this.musicToggle = this.spawnEntity(EntityButtonToggle, 0, 0, {state:bgmVolume, onClicked: function(state){this.changeBGMVolume(state)}.bind(this), controller: this });
            this.soundToggle = this.spawnEntity(EntityButtonToggle, 0, 0, {state:sfxVolume, onClicked: function(state){this.changeSFXVolume(state)}.bind(this), controller: this });
            this.musicToggle.setAnchoredPosition(-this.musicToggle.size.x/2 + 80, this.anchoredPositionY - 155, "center-middle");
            this.soundToggle.setAnchoredPosition(-this.soundToggle.size.x/2 + 80, this.anchoredPositionY + 25, "center-middle");

            if(this.controller==ig.game.getEntitiesByType(EntityTitleController)[0])
            {
                //consosle.log('do it');
                this.homeBtn = this.spawnEntity(EntityButtonHome,  0 , this.anchoredPositionY + 200 ,{onClicked: function(){this.onClickedhome()}.bind(this), controller: this, anchor: "center-middle", xPos:this.xPos, popup_child: true });
                this.homeBtn.setAnchoredPosition( - this.homeBtn.size.x/2 , this.anchoredPositionY + 200, "center-middle");
            }
            else
            {
                this.homeBtn = this.spawnEntity(EntityButtonHome, 0  , -100, {onClicked: function(){this.onClickedhome()}.bind(this), controller: this, anchor: "center-middle", xPos:this.xPos, popup_child: true });
                this.homeBtn.setAnchoredPosition( - this.homeBtn.size.x/2 - this.homeBtn.size.x - 20 , this.anchoredPositionY + 200, "center-middle");
                
                this.resumeBtn = this.spawnEntity(EntityButtonResume, 0, -100, {onClicked: function(){this.onCickedResume()}.bind(this), controller: this });
                this.resumeBtn.setAnchoredPosition( - this.resumeBtn.size.x/2 , this.anchoredPositionY + 200, "center-middle");

                this.retryLevelBtn = this.spawnEntity(EntityButtonRetry, 0, -100, {zIndex: this.zIndex + 1, onClicked: function(){this.onClickedRetry()}.bind(this), controller:this })
                this.retryLevelBtn.setAnchoredPosition(-this.retryLevelBtn.size.x/2 +this.retryLevelBtn.size.x+ 20, this.anchoredPositionY + 200, "center-middle");
            } 
            ig.game.sortEntitiesDeferred();

            this.tween({xPos:0}, 0.3, {easing: ig.Tween.Easing.Exponential.EaseInOut}).start();
        },

        draw:function()
        {
            this.parent();
            this.fnDrawRectangle();
            var center = ig.responsive.toAnchor(0, 0, "center-middle");
            var scaleX = ig.system.width/this.size.x;
            var scaleY = ig.system.height/this.size.y;
            
            this.panelImage.draw(this.xPos + center.x-this.panelImage.width/2,center.y-this.panelImage.height/2);

            var ctx = ig.system.context;
            ctx.font = 'normal 80px montserrat';
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'; 
            var text
            if(this.controller == ig.game.getEntitiesByType(EntityTitleController)[0] ){
                text = _STRINGS.Game.Settings;
            }
            else {
                text = _STRINGS.Game.Pause;
            }

             ctx.fillText(text, this.xPos + center.x-text.length/2, center.y-text.length/2 - 275);

            this.musicIconImg.draw(this.xPos + center.x-this.musicIconImg.width/2 - 185, center.y - 155);
            this.soundIconImg.draw(this.xPos + center.x-this.soundIconImg.width/2 - 185, center.y + 25);
        },

        onClickedhome:function()
        {
            this.kill();
            if(this.controller==ig.game.getEntitiesByType(EntityLevelController)[0])
            {
                if(this.onCloseCallback!=null)
                    this.onCloseCallback();
            }
            else if (this.controller == ig.game.getEntitiesByType(EntityTitleController)[0]){
                this.controller.playBtn.isEnabled = true;
                this.controller.settingBtn.isEnabled = true;
                if(_SETTINGS.MoreGames.Enabled) this.controller.moreGameBtn.show();
                console.log("titlecontroller origin");

            }
            else
            {
                ig.game.loadLevelDeferred( ig.global['LevelTitle'] );
            }

            

        },

        onCickedResume:function()
        {
            this.kill();
            
            if(this.onCloseCallback!=null)
                this.onCloseCallback();
        },

        changeBGMVolume: function(state){
            // if(state)
            //  ig.soundHandler.unmuteBGM(true);
            // else
            //  ig.soundHandler.muteBGM(true);

            console.log("Change bg state : " + state);
            // ig.soundHandler.bgmPlayer.volume(percentage);
            ig.game.setMusicVolume(state);
            ig.soundHandler.sfxPlayer.play("click");
            ig.game.saveAll();
            // console.log("Change bgm : " + state);
        },

        changeSFXVolume: function(state){
            // if(state)
            //  ig.soundHandler.unmuteSFX(true);
            // else
            //  ig.soundHandler.muteSFX(true);
            // ig.soundHandler.sfxPlayer.volume(percentage);
            ig.game.setSoundVolume(state);
            ig.soundHandler.sfxPlayer.play("click");
            ig.game.saveAll();
            // console.log("Change sfx : " + state);
        },
        onClickedRetry:function(){
            ig.game.loadLevelDeferred( ig.global['LevelGameplay'] );
        },
        fnDrawRectangle:function(){
            ig.system.context.save();
            ig.system.context.fillStyle = '#000000';
            ig.system.context.globalAlpha = 0.5;
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            ig.system.context.restore();
        }
        
    });
});
