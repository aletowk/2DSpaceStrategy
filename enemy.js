
let enemy_tab = [];
let enemy_pos = [10,700,200,60];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function init_enemies()
{
    for(var i = 0 ; i < 1 ; i++)
    {
        var tmpEnemy = new Sprite(resources["img/enemyShip1.png"].texture);
        tmpEnemy.x = getRandomInt(0,window_width/2 - 80);
        tmpEnemy.y = getRandomInt(0,window_width/2 - 80);
        tmpEnemy.scale.set(0.2,0.2);
        enemy_tab.push(tmpEnemy);
        app.stage.addChild(enemy_tab[i]);
    }
}

function remove_enemies()
{
	for(var i = enemy_tab.length - 1 ; i >= 0  ; i--)
	{
		app.stage.removeChild(enemy_tab[i]);
	}
	enemy_tab.length = 0;
}

function print_enemies()
{
	for( var i = 0 ; i < enemy_tab.length ; i++)
	{
		console.log(enemy_tab[i]);
	}
}



function tracking_IA(enemy,target)
{
	for(var i = 0 ; i < enemy.length ; i++){
		distance = Math.floor(Math.sqrt( (target.x - enemy[i].x)*(target.x - enemy[i].x) + (target.y - enemy[i].y)*(target.y - enemy[i].y) ));
		x_dir = Math.floor(target.x - enemy[i].x)/distance;
		y_dir = Math.floor(target.y - enemy[i].y)/distance;
	
		enemy[i].x += x_dir*2;
		enemy[i].y += y_dir*2;	
	}
}