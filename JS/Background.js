(function () {
	var Background = window.Background = function() {
		this.image = game.R.bg_day;

		//图片初始位置
		this.x = 0;
		this.y = game.canvas.height * 0.75 - 396;

		//图片本身宽高
		this.w = this.image.width;
		this.h = this.image.height;
	};

	Background.prototype.update = function(){
		this.x--;
		if( this.x < -this.w ){
			this.x=0
		}
	};

	Background.prototype.render = function () {
		//无缝轮播，图片在动，在第一张图片出去一会完全拉回
		game.ctx.drawImage(this.image,this.x,this.y);
		game.ctx.drawImage(this.image,this.x+this.w,this.y);
		game.ctx.drawImage(this.image,this.x+this.w *2,this.y);

		//顶部不够用纯色补齐
		game.ctx.fillStyle = "#4dbfc9";
		game.ctx.fillRect(0,0,game.canvas.width,this.y+10);

	}
})()
