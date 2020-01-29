(function () {
	var SceneManager = window.SceneManager = function(){
		//场景 1欢迎界面  2教程  3游戏  4GameOver
		this.sceneNumber = 1;

		game.bg = new Background();
		game.land = new Land();
		game.bird = new Bird();
	    //logo的y值
		this.logoY = -48;
		//button的X,Y值
		this.button_playX= game.canvas.width / 2 -58;
		this.button_playY = game.canvas.height;

	    //事件监听
		this.bindEvent();
	}

	SceneManager.prototype.update = function () {
		switch (this.sceneNumber) {
			case 1:
				//logo进行下移动
				this.logoY += 10;
				if( this.logoY > 120 ){
					this.logoY = 120;
				}
				//play进行上移动
				this.button_playY -=16;
				if( this.button_playY < 360 ){
					this.button_playY = 360;
				}
				break;

			case 2:
				this.tutorialOpacity += !this.tutorialOpacityIsdown ? -0.1 : 0.1;
				if( this.tutorialOpacity < 0.1 || this.tutorialOpacity > 0.9 ){
					this.tutorialOpacityIsdown = !this.tutorialOpacityIsdown;
				}
				break;

			case 3:
				game.bg.update();
				game.land.update();
				game.bird.update();

				//管子的实例化
				game.fno % 150 === 0 && (new Pipe());

				//管子
				for (var i = 0; i < game.PipeArr.length; i++) {
					game.PipeArr[i] && game.PipeArr[i].update();
				}
				break;

			case 4:
				//落到地面上
				if(game.bird.y > game.canvas.height * 0.78 - 17){
					this.isbirdLand = true;
				}
				//帧更新
				this.birdfno++;

				//判断鸟是否落地
				if( !this.isbirdLand ){
				    game.bird.y += 1.4 * this.birdfno;
				}else {
					game.fno % 4 === 0  && this.bombStep++;
				}

				//死亡白屏
				this.maskOpacity -= 0.1;
				if( this.maskOpacity < 0 ){
				    this.maskOpacity = 0;
				}
				break;


		}
	}

	SceneManager.prototype.render = function () {
		switch (this.sceneNumber) {
			case 1:
				game.bg.render();
				game.land.render();
				game.bird.render();
				game.bird.x = game.canvas.width / 2;
				game.bird.y = 260;

				game.ctx.drawImage(game.R["logo"],game.canvas.width / 2 - 89,this.logoY);
				game.ctx.drawImage(game.R["button_play"],this.button_playX,this.button_playY);
				break;
			case 2:
				game.bg.render();
				game.land.render();
				game.bird.render();

				//小教程的图
				game.ctx.save();
				game.ctx.globalAlpha = this.tutorialOpacity; //透明度
				game.ctx.drawImage(game.R["tutorial"],game.canvas.width / 2 - 57 , 280);
				game.ctx.restore();
				break;

			case 3:
				//背景
				game.bg.render();
				game.land.render();
				game.bird.render();
				//管子
				for (var i = 0; i < game.PipeArr.length; i++) {
					game.PipeArr[i] && game.PipeArr[i].render();
				}

				//分数
				var scoreLength = game.score.toString().length;
				for (var i = 0; i < scoreLength; i++) {
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 + 34 * i,100)
				}
				break;

			case 4:
				//背景
				game.bg.render();
				game.land.render();
				if( !this.isbirdLand ){
					game.bird.render();
				}else {
					if( this.bombStep <= 11 ){
						game.ctx.drawImage(game.R["b" + this.bombStep],game.bird.x - 24 - 36, game.bird.y - 24 - 60)
					}else{
						this.enter(5);
					}
				}

				//死亡动画，画面白一下，用一个白色罩子罩住
				game.ctx.fillStyle = "rgba(255,255,255," + this.maskOpacity + ")";
				game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height)

				//管子
				for (var i = 0; i < game.PipeArr.length; i++) {
					game.PipeArr[i] && game.PipeArr[i].render();
				}

				//分数
				var scoreLength = game.score.toString().length;
				for (var i = 0; i < scoreLength; i++) {
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 + 34 * i,100)
					console.log(game.R["shuzi" + game.score.toString().charAt(i)])
				}
				break;

			case 5:
				//背景
				game.bg.render();
				game.land.render();
				//管子
				for (var i = 0; i < game.PipeArr.length; i++) {
					game.PipeArr[i] && game.PipeArr[i].render();
				}
				//分数
				var scoreLength = game.score.toString().length;
				for (var i = 0; i < scoreLength; i++) {
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 + 34 * i,100)
				}

				//game over图片

				game.ctx.drawImage(game.R["text_game_over"],game.canvas.width / 2 - 90, 200)

				break;



		}
	}

	SceneManager.prototype.enter = function (number) {
		this.sceneNumber = number;
		switch (number) {
			case 1:
				this.logoY = -48;
				this.button_playY = game.canvas.height;
				game.bird = new Bird();
				break;

			case 2:
				game.bird.y = 150;
				this.tutorialOpacity = 1;
				this.tutorialOpacityIsdown = false;
				break;
			case 3:
				game.PipeArr = [];
				break;
			case 4:
				//死亡动画,让画面白一下
				this.maskOpacity = 1;

				//小鸟是否已经触底
				this.isbirdLand = false;
				//小帧编号
				this.birdfno = 0;
				//爆炸动画
				this.bombStep = 0;
				break;

			case 5:
				break;
		}
	}

	SceneManager.prototype.bindEvent = function () {
		var self = this;
			game.canvas.onclick = function(e){
			clickHandler(e.clientX,e.clientY);
		}

		function clickHandler(mousex,mousey) {
			console.log(self.button_playX,self.button_playY )
			switch(self.sceneNumber) {
				case 1:

					if(mousex>self.button_playX&&mousex<self.button_playX+116&&mousey>self.button_playY && mousey<self.button_playY + 70 ){
						 self.enter(2)
							console.log(1)
					}
					break;
				case 2:
					self.enter(3)
					break;

				case 3:
					game.bird.fly();
					break;

				case 5:
					self.enter(1);


			}
		}
	}




})()