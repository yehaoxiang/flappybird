(function () {
	var Bird = window.Bird = function () {
		//随机小鸟的颜色
		this.color = parseInt(Math.random() * 3)

		this.imageArr = [
			game.R["bird" + this.color + "_0"],
			game.R["bird" + this.color + "_1"],
			game.R["bird" + this.color + "_2"]
		]


		//翅膀状态
		this.windstep = 0

		//小鸟位置
		this.x = game.canvas.width* (1- 0.618);
		this.y = 100;

		//三个参数给小鸟的状态。this.isClick是是否点击，点击了，小鸟上升   this.d是小鸟的转向  this.birdf是小鸟下降的速度的参数
		this.isClick = false;
		this.d = 0;
		this.birdf = 0;
	}


	Bird.prototype.update =function () {
		game.fno % 20 === 0 && this.windstep++;
		if( this.windstep > 2 ){
		    this.windstep = 0;
		}
		//小鸟是否下降或者上升的判断，有限状态机
		if( this.isClick ){
			this.y -= 0.5 * ( 13 - this.birdf);
			//20帧后，没有能量，下降
			if( this.birdf > 20 ){
				this.isClick = false;
				this.birdf=0;
			}
		}else{
			this.y += 0.5 * this.birdf;
		}

		this.birdf++;
		this.d+=0.03;

		//不让小鸟超出顶部
		if( this.y < 0 ){
		    this.y =0;
		}

	   //鸟的上右下左的位置

		this.T = this.y -12;
		this.R = this.x + 15;
		this.B = this.y + 12;
		this.L = this.x - 15;

		//小鸟碰地死亡
		if( this.B > game.canvas.height * 0.75 ){
			game.sm.enter(4)
		}
	}
	
	Bird.prototype.render = function ( ) {
		game.ctx.save();
		game.ctx.translate(this.x,this.y);
		game.ctx.rotate(this.d);
		game.ctx.drawImage(this.imageArr[this.windstep],-24,-24)
		game.ctx.restore();
	}

	Bird.prototype.fly = function () {
		this.isClick = true;
		this.birdf = 0;
		this.d = -0.5;
	}

})()