
var window_width = window.innerWidth;
var window_height= window.innerHeight;

/* To make it works: */
/*chrome.exe --allow-file-access-from-files*/

let app = new PIXI.Application({width: window_width, height: window_height});
document.body.appendChild(app.view);

var sprite;

/*let options = {
        crossOrigin: true
};*/
/*PIXI.loader.add("./img/ship.png",options).load(setup);*/
PIXI.loader.add("./img/ship.png").load(setup);
function setup(){
	sprite = new PIXI.Sprite(PIXI.loader.resources["./img/ship.png"].texture);

	app.stage.addChild(sprite);
	sprite.x = window_width/2;
	sprite.y = window_height/2;
  	app.ticker.add(function gameLoop(delta){
  		sprite.x +=10;
  		if(sprite.x >= window_width){
  			sprite.x = 0;		
  		}
  	});
}

/*function gameLoop(delta){

  //Move the cat 1 pixel 
  //cat.x += 1;
  
}*/