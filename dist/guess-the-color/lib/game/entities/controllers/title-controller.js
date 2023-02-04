ig.module('game.entities.controllers.title-controller')
.requires(
    'impact.entity',
    'game.entities.buttons.button-play',
    'game.entities.buttons.button-more-games',
    'game.entities.buttons.button-setting',
)
.defines(function() {
	EntityTitleController = ig.Entity.extend({
        size:{x: 1080, y: 1080},
        bgImage : new ig.Image('media/graphics/sprites/games/BG.png'),
        titleImage: new ig.Image('media/graphics/sprites/games/title.png'),
        zIndex: 0,

        init:function(x, y, settings){
            this.parent(x, y, settings);
            this.setAnchoredPosition(0,0,"center-middle");

            var title = ig.game.spawnEntity(EntityGameObject, 484, 204, { scaleX: 1.3, scaleY: 1.3, anchorX: 0.5, anchorY: 0.5, image: this.images[3], exitType: "fadeOut", zIndex: 3 });

            this.fullscreenBtn = ig.game.spawnEntity(ig.FullscreenButton, 15, 15, { 
                enterImage: new ig.Image("media/graphics/sprites/games/zoom_in.png"), 
                exitImage: new ig.Image("media/graphics/sprites/games/zoom_out.png") 
            });
            this.fullscreenBtn.setAnchoredPosition(15, 15, "top-left");

            this.playBtn = ig.game.spawnEntity(EntityButtonPlay, 0,0 , {onClicked: function(){this.onClickPlay()}.bind(this)});
            this.playBtn.setAnchoredPosition(-this.playBtn.size.x/2,-this.playBtn.size.y/2 + 250,"center-middle");
            if(_SETTINGS.MoreGames.Enabled)
            {
                this.settingBtn = ig.game.spawnEntity(EntityButtonSetting, 0,0, {onClicked: function(){this.onClickSetting()}.bind(this)} );
                this.settingBtn.setAnchoredPosition(-this.settingBtn.size.x + this.playBtn.size.x + 20,-this.settingBtn.size.y/2+350,"center-middle");
                
                this.moreGameBtn = ig.game.spawnEntity(EntityButtonMoreGames, 100, 200, {zIndex:this.zIndex+1});
                this.moreGameBtn.setAnchoredPosition(- this.playBtn.size.x - 20, -this.moreGameBtn.size.y/2+350, "center-middle");
                this.moreGameBtn.zIndex = this.zIndex+1;
            }
            else
            {
               this.settingBtn = ig.game.spawnEntity(EntityButtonSetting, 0,0, {onClicked: function(){this.onClickSetting()}.bind(this)} );
               this.settingBtn.setAnchoredPosition(-this.settingBtn.size.x - 15, 15 , "top-right");

            }
            this.playBtn.zIndex = this.zIndex+1;
            this.settingBtn.zIndex= this.zIndex+1;
            this.fullscreenBtn.zIndex = this.zIndex+1;

            this.enabledButtons(true);
        },
        
        draw:function()
        {
            this.parent();
            var center = ig.responsive.toAnchor(0, 0, "center-middle");
           
            // // var fillScale = ig.responsive.fillScale;
            this.scaleX = (ig.system.width/this.size.x);
            this.scaleY = (ig.system.height/this.size.y);
            var scale = (this.scaleX > this.scaleY) ? this.scaleX : this.scaleY;
           ig.responsive.drawScaledImage(this.bgImage, center.x, center.y, scale, scale, 0.5, 0.5);
            
            //if(this.index==3){
        


            this.titleImage.draw(center.x-this.titleImage.width/2.0, center.y-this.titleImage.height/2-190);
        },

        
        onClickPlay: function()
        {
            // console.log("Clicked play button");
            //ig.game.tutorialMode = false;

            ig.game.loadLevelDeferred( ig.global['LevelPage'] );
            //ig.soundHandler.sfxPlayer.play("click");
            this.enabledButtons(false);
            if(_SETTINGS.MoreGames.Enabled) this.moreGameBtn.hide();
        },

        enabledButtons: function(enabled)
        {
            console.log("Enable buttons : " + enabled);
            this.playBtn.isEnabled = enabled;
            this.settingBtn.isEnabled = enabled;
            //this.shopBtn.isEnabled = enabled;
           // this.fullscreenBtn.changeInteractable(enabled);
            //this.helpBtn.isEnabled = enabled;

            /*if(enabled)
            {
                if(_SETTINGS.MoreGames.Enabled) this.moreGameBtn.show();
                // console.log("Enabled more games");
            }
            else
            {
                // console.log("Disabled more games");
                if(_SETTINGS.MoreGames.Enabled) this.moreGameBtn.hide();
            }*/
        },
        onClickSetting:function(){
            this.playBtn.isEnabled = false;
            this.settingBtn.isEnabled = false;
            if(_SETTINGS.MoreGames.Enabled) this.moreGameBtn.hide();
            this.settingPanel = ig.game.spawnEntity(EntitySettingController, 0,0, {controller: this, onClosed: function(){this.hideSettings()}.bind(this)} );
            this.settingPanel.setAnchoredPosition(0, 0, "center-middle");
        },


	});
});
