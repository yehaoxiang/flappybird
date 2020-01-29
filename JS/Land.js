(function () {
	var Land = window.Land = function () {
		this.image = game.R.Land;

		this.w = this.image.width;
		this.h = this.image.height;

		this.x = 0;
	}

	Land.prototype.update = function(){
		this.x -= 2;
		if( this.x < -this.w ){
			this.x =0;
		}
	}

	Land.prototype.render =function () {
		game.ctx.drawImage(this.image,this.x,game.canvas.height * 0.75);
		game.ctx.drawImage(this.image,this.x + this.w, game.canvas.height * 0.75);
		game.ctx.drawImage(this.image,this.x + this.w * 2, game.canvas.height * 0.75);

		game.ctx.fillStyle="#ddd795";
		game.ctx.fillRect(0, game.canvas.height*0.75+this.h-5, game.canvas.width, game.canvas.height*0.25-this.h + 10)
	}
})()