(function () {
	var Game = window.Game = function (params) {

		this.canvas = document.querySelector(params.canvasid);

		this.ctx = this.canvas.getContext("2d");

		this.RjsonUrl = params.RjsonUrl;
		//帧
		this.fno = 0;

		this.init();

		var self = this;
		this.loadAllResource(function () {
			self.start();

		});
		this.score = 0;

	}

	//给canvas加宽高
	Game.prototype.init = function () {
		var windowW = document.documentElement.clientWidth;
		var windowH = document.documentElement.clientHeight;

		if(windowW < 320){
			windowW = 320;
		}else if(windowW > 414){
			windowW = 414;
		}

		if( windowH > 736 ){
			windowH = 736;
		}else if(windowH < 500){
			windowH = 500;
		}

		this.canvas.width = windowW;
		this.canvas.height = windowH;
	}

	//加载需要的图片
	Game.prototype.loadAllResource = function (callback) {
		var xhr = new XMLHttpRequest();
		//创建一个空对象，让R.json里面的信息放进去去加载图片
		this.R = {};
		//加载完成数目
		var alreadyLoad = 0;

		var self = this;
		xhr.onreadystatechange = function () {
			if( xhr.readyState === 4 ){
				var RObj = JSON.parse(xhr.responseText);
				for (var i = 0; i < RObj.images.length; i++) {
					self.R[RObj.images[i].name] = new Image();
					self.R[RObj.images[i].name].src = RObj.images[i].url;
					//R[RObj.images[i].name]是一个image对象，对象加载完毕执行语句
					self.R[RObj.images[i].name].onload  = function(){
						alreadyLoad++;
						//清屏
						self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
						//加载资源提示
						self.ctx.fillText("正在加载资源" + alreadyLoad + "/" + RObj.images.length + "请稍后",self.canvas.width / 2 ,self.canvas.height * (1 - 0.618));
						self.ctx.textAlign = "center";
						self.ctx.font = "20px consolas";
						//所有资源加载完毕
						if( alreadyLoad === RObj.images.length){
							callback()
						}
					}

				}
			}
		}
		xhr.open("get",this.RjsonUrl,true);
		xhr.send();
	}
	
	Game.prototype.start = function () {

		this.sm = new SceneManager();




		var self = this;
		//设置帧编号定时器
		this.timer = setInterval(function () {
			//图片加载完成之后清屏
			self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);

			self.sm.update();
			self.sm.render();


			//帧编号++
			self.fno++;


			self.ctx.fillStyle = "black";
			self.ctx.font = "16px consolas";
			self.ctx.textAlign = "left";
			self.ctx.fillStyle = "black";
			self.ctx.fillText("fno" + self.fno,20,20);
			self.ctx.fillText("场景号" + self.sm.sceneNumber,20,40);
		},20)
	}

	Game.prototype.bindEvent = function () {
		var self = this;
		this.canvas.onclick = function () {
			self.bird.fly();
		}
	}

})()
