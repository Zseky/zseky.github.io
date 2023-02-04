ig.module("game.entities.miscellaneous.confetti")
	.requires("impact.entity")
	.defines(function() {
		EntityConfetti = ig.Entity.extend({
			// imgConfetti:{
			//     spriteImage: new ig.Image(spriteSheets["confetti-color"].meta.image),
			//     numberSprite:0
			// },
			colorRoster: [
				//"rgba(172,50,50,1)",
				//"rgba(153,229,80,1)",
				//"rgba(91,110,225,1)",
				"rgba(251,242,54,1)",
				//"rgba(217,87,99,1)",
				//"rgba(106,190,48,1)",
				//"rgba(99,155,255,1)",
				"rgba(223,113,38,1)",
				//"rgba(215,123,186,1)",
				//"rgba(55,148,110,1)",
				//"rgba(95,205,228,1)",
				"rgba(255,255,255,1)",
				//"rgba(118,66,138,1)",
				//"rgba(75,105,47,1)",
				//"rgba(48,96,130,1)",
				"rgba(217,160,102,1)"
			],

			rotation: 1,
			scale: { x: 1, y: 1 },
			speed: { x: 1, y: 1, a: 0 },
			rotation: 0,
			alpha: 1,
			lifeTime: 3,
			fadeDuration: 0.2,
			pivot: { x: -4, y: -6 },
			zIndex: 600,
			colorNumber: -1,
			ignorePause: true,
			fillColor: "rgba(255,255,255,1)",
			init: function(x, y, settings) {
				this.parent(x, y, settings);
				this.scale.x = 2;
				this.scale.y = 2;
				
				//this.scale.x = Math.random()*1+2;
				//this.scale.y = Math.random()*3+2;
				//this.speed.x = Math.floor(Math.random()*6)-3;
				//this.speed.y = Math.floor(Math.random()*6)-3;
				var ang = Math.floor(Math.random() * 360);
				this.speed.x = Math.sin(ang / Math.PI) * 4;
				this.speed.y = Math.cos(ang / Math.PI) * 4;
				this.speed.a = (Math.random() * 10 - 5) * (Math.PI / 180) * 5;

				this.lifeTime = (Math.floor(Math.random() * 15) + 5) / 10;

				// if(this.colorNumber != -1){
				//     this.imgConfetti.numberSprite = this.colorNumber;
				// }
				// else{
				//     this.imgConfetti.numberSprite = Math.floor(Math.random()*16);
				// }

				this.fillColor = this.colorRoster[Math.floor(Math.random() * this.colorRoster.length)];
			},
			update: function() {
				this.parent();
				this.pos.x += this.speed.x;
				this.pos.y += this.speed.y;
				this.rotation += this.speed.a;

				this.alpha = 1;

				this.lifeTime -= ig.system.tick;

				if (this.lifeTime <= this.fadeDuration) {
					this.alpha = this.lifeTime.map(this.fadeDuration, 0, 1, 0);
				}

				if (
					this.pos.x > ig.system.width + 50 ||
					this.pos.y > ig.system.height + 50 ||
					this.pos.x < -50 ||
					this.pos.y < -50 ||
					this.lifeTime <= 0
				)
					this.kill();
			},
			updateOnOrientationChange: function() {},
			draw: function() {
				var ctx = ig.system.context;
				ctx.save();
				ctx.translate(this.pos.x, this.pos.y);
				ctx.rotate(this.rotation);
				ctx.scale(this.scale.x, this.scale.y);
				ctx.translate(-this.pos.x, -this.pos.y);

				ctx.globalAlpha = this.alpha;

				// this.imgConfetti.spriteImage.drawTile(
				//     this.pos.x+this.pivot.x, this.pos.y+this.pivot.x,
				//     this.imgConfetti.numberSprite,
				//     4,8,
				//     false, false
				// );

				ctx.fillStyle = this.fillColor;
				ctx.fillRect(this.pos.x + this.pivot.x, this.pos.y + this.pivot.x, 4*1.3, 8*1.3);

				ctx.restore();
				this.parent();
			}
		});
	});