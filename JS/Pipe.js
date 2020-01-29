(function () {
	var Pipe = window.Pipe = function () {
		this.imageup = game.R.pipe_up;
		this.imagedown = game.R.pipe_down;

		this.imageupH = this.imageup.height;
		this.imageupW = this.imageup.width;

		this.imagedownH = this.imagedown.height;
		this.imagedownW = this.imagedown.width;

		this.interspace = 120;

		//上面管子
		this.height1 =parseInt( 100 + Math.random() * (320 -100));

		//下面管子
		this.height2 = game.canvas.height * 0.75 - this.height1 - 120;

		this.x = game.canvas.width;

		this.alreadyPass = false;

		//所有管子推入数组
		game.PipeArr.push(this);


	}

	Pipe.prototype.update = function () {
		this.x-=2;

		if( game.bird.T < 0 ){
			game.bird.y = 0;
		}

		//碰撞管子检测（AABB盒子方法），检查小鸟所在的位置的上右下左在画布的定位与管子的位置比较，超过就是碰撞
		if( game.bird.R > this.x && game.bird.L < this.x + 52 ){
			console.log(1)
		    if( game.bird.T < this.height1 || game.bird.B > this.height1 + this.interspace ){
			    game.sm.enter(4)
		    }
		}

		if( game.bird.L > this.x + 52 && !this.alreadyPass ){
		    game.score++;
		    this.alreadyPass = true;
		}


		//如果管子看不见了，就在数组中删除
		for (var i = 0; i < game.PipeArr.length; i++) {
			if( game.PipeArr[i].x < -100 ){
				game.PipeArr.splice(i,1)
			}
		}
	}

	Pipe.prototype.render = function () {
		//上面管子
		game.ctx.drawImage(this.imagedown,0,this.imagedownH - this.height1,this.imagedownW,this.height1,this.x,0,this.imagedownW,this.height1);

		//下面管子
		game.ctx.drawImage(this.imageup,0,0,this.imageupW,this.height2,this.x,this.height1 + 120,this.imageupW,this.height2);
	}
})()