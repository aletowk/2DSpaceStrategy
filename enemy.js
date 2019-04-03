
let enemy_tab = [];
let enemy_pos = [10,700,200,60];


function CArmy()
{
	this.troop_number = 1;
	this.enemy_tab = [];

	this.init_army = function()
	{
		for(var i = 0; i < this.troop_number ; i++)
		{
			var tmpEnemy = new Enemy();
			tmpEnemy.init_enemy();
			this.enemy_tab.push(tmpEnemy);
			app.stage.addChild(this.enemy_tab[i].enemy_sprite);
		}
	}
	this.remove_army = function()
	{
		for(var i = 0 ; i < this.enemy_tab.length ; i++)
		{
			this.enemy_tab[i].remove_enemy();
		}
		this.enemy_tab.length = 0;
	}
	this.print_army = function()
	{
		for(var i = 0 ; i < this.enemy_tab.length; i++)
		{
			this.enemy_tab[i].print_enemy();
		}
	}
	this.update = function(target)
	{
		for(var i = 0 ; i < this.enemy_tab.length ; i++)
		{
			this.enemy_tab[i].enemy_IA(target);
		}
	}
}

function Enemy()
{
	this.sprite_ressource = resources["img/enemyShip1.png"].texture;
	this.init_enemy = function()
	{	
		this.enemy_sprite = new Sprite(this.sprite_ressource);
		this.enemy_sprite.x = getRandomInt(0,window_width/2 - 80);
    	this.enemy_sprite.y = getRandomInt(0,window_width/2 - 80);
    	this.enemy_sprite.scale.set(0.2,0.2);
    	this.x = this.enemy_sprite.x;
    	this.y = this.enemy_sprite.y;
    	this.pos = [this.x,this.y];
	}
	this.get_pos = function()
	{
		return this.pos;
	}
	this.remove_enemy = function()
	{
		app.stage.removeChild(this);
	}
	this.print_enemy = function()
	{
		console.log(this);
	}
	this.enemy_IA = function(target)
	{
		distance = Math.floor(Math.sqrt( (target.x - this.enemy_sprite.x)*(target.x - this.enemy_sprite.x) + (target.y - this.enemy_sprite.y)*(target.y - this.enemy_sprite.y) ));
		x_dir = Math.floor(target.x - this.enemy_sprite.x)/distance;
		y_dir = Math.floor(target.y - this.enemy_sprite.y)/distance;

		this.enemy_sprite.x += x_dir*2;
		this.enemy_sprite.y += y_dir*2;
	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// function init_enemies()
// {
//     for(var i = 0 ; i < 1 ; i++)
//     {
//         var tmpEnemy = new Sprite(resources["img/enemyShip1.png"].texture);
//         tmpEnemy.x = getRandomInt(0,window_width/2 - 80);
//         tmpEnemy.y = getRandomInt(0,window_width/2 - 80);
//         tmpEnemy.scale.set(0.2,0.2);
//         enemy_tab.push(tmpEnemy);
//         app.stage.addChild(enemy_tab[i]);
//     }
// }

// function remove_enemies()
// {
// 	for(var i = enemy_tab.length - 1 ; i >= 0  ; i--)
// 	{
// 		app.stage.removeChild(enemy_tab[i]);
// 	}
// 	enemy_tab.length = 0;
// }

// function print_enemies()
// {
// 	for( var i = 0 ; i < enemy_tab.length ; i++)
// 	{
// 		console.log(enemy_tab[i]);
// 	}
// }



// function tracking_IA(enemy,target)
// {
// 	for(var i = 0 ; i < enemy.length ; i++){
// 		distance = Math.floor(Math.sqrt( (target.x - enemy[i].x)*(target.x - enemy[i].x) + (target.y - enemy[i].y)*(target.y - enemy[i].y) ));
// 		x_dir = Math.floor(target.x - enemy[i].x)/distance;
// 		y_dir = Math.floor(target.y - enemy[i].y)/distance;

// 		enemy[i].x += x_dir*2;
// 		enemy[i].y += y_dir*2;	
// 	}
// }