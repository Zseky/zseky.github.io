/**
 *  SoundHandler
 *
 *  Created by Justin Ng on 2014-08-19.
 *  Copyright (c) 2014 __MyCompanyName__. All rights reserved.
 */

ig.module('plugins.audio.sound-info')
.requires(
)
.defines(function () {

    SoundInfo = ig.Class.extend({
		FORMATS:{
			OGG:".ogg",
			MP3:".mp3",
		},
        
		/**
		* Define your sounds here
		* 
        */
		sfx: {
			logosplash1:{path:"media/audio/opening/logosplash1"}
			,logosplash2:{path:"media/audio/opening/logosplash2"}
			,staticSound:{path:"media/audio/play/static"},
			openingSound:{path:"media/audio/branding/splash/opening"},
			click:{path:"media/audio/click"},
			nextcolumn: {path:"media/audio/nextcolumn"},
			pop: {path:"media/audio/pop"},
			insufficientfund: {path:"media/audio/insufficientfund"},
			gameWin: {path:"media/audio/gamewin"},
			gameLose: {path:"media/audio/gamelose"},
			unlock: {path:"media/audio/unlock"},
			extra_chance: {path:"media/audio/extra_chance"}


		},
		
        /**
        * Define your BGM here
        */
		bgm:{
			background:{path:'media/audio/bgm',startOgg:0,endOgg:21.463,startMp3:0,endMp3:21.463}
		},
        
		
    });

});
