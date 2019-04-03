

function Player()
{
	this.player_sprite = new Sprite(resources["img/ship.png"].texture);
	this.player_sprite.x = window_width/2;
    this.player_sprite.y = window_height/2;
    this.player_sprite.vx = 0;
    this.player_sprite.vy = 0; 
    this.player_sprite.v_rot = 0;
    this.player_sprite.angle = 0;
    this.player_sprite.nominal_speed = VITESSE;

    this.player_sprite.width = this.player_sprite.texture.width;
    this.player_sprite.height = this.player_sprite.texture.height; 

    this.player_sprite.pivot.set(this.player_sprite.width/2,this.player_sprite.height/2);
    app.stage.addChild(this.player_sprite);   
    
    this.player_sprite.scale.set(0.3,0.3);

    this.enemy_tab;

    this.missile_array = [];
    this.missile_number = 10;

    this.rocket_array = [];
    this.rocket_number = 5;

    this.remove = function(){
    	app.stage.removeChild(this.player_sprite);
    }

    this.init_enemy_army = function(army)
    {
        this.enemy_army = army;
    }

    this.addMissile = function () {
    	if(this.missile_array.length < this.missile_number)
    	{
    		let textureBeam = TextureCache["img/beams.png"];
    		let rect = new Rectangle(0,0,30,30);
    		textureBeam.frame = rect;
    		let tmpMissile = new Sprite(textureBeam);
    		tmpMissile.bool = true;
        	tmpMissile.x = player.player_sprite.x-8;
        	tmpMissile.y = player.player_sprite.y+10;
        	tmpMissile.nominal_speed = 12;
        	tmpMissile.vx = tmpMissile.nominal_speed*Math.sin(player.player_sprite.angle);
        	tmpMissile.vy = -tmpMissile.nominal_speed*(Math.cos(player.player_sprite.angle));
        	this.missile_array.push(tmpMissile);
        	app.stage.addChild(tmpMissile);
        }
    }

    this.updateMissile = function()
    {
        let enemy_tab = this.enemy_army.enemy_tab;
    	for( var i = 0; i < this.missile_array.length ; i++ )
    	{
    		if(this.missile_array[i].bool == true)
			{
	    	    newX_missile = this.missile_array[i].x + this.missile_array[i].vx;
	    	    newY_missile = this.missile_array[i].y + this.missile_array[i].vy;
	    	    if( borderTest(newX_missile,newY_missile) )
	    	    {
	    	    	this.missile_array[i].x   = newX_missile;
	    	        this.missile_array[i].y   = newY_missile;
	    	        for(var j = enemy_tab.length - 1; j >= 0 ; j--)
	    	        {
	    	            if(hitTestRectangle(this.missile_array[i],enemy_tab[j]))
	    	            {
	    	            	console.log("Shot on target" + j);
	    	                app.stage.removeChild(enemy_tab[j]);
	    	                enemy_tab.splice(j,1);
	    	                console.log("Remaining targets : "+enemy_tab.length);
	    	                app.stage.removeChild(this.missile_array[i]);
	    	                this.missile_array.shift();
	    	            }
	    	        }   
	    	        
	    	    }else{
	    	        this.missile_array[i].bool = false;
	    	        app.stage.removeChild(this.missile_array[i]);
	    	        this.missile_array.shift();
	    	    }
	    	}
    	}
    	
    }

    this.addRocket = function()
    {
    	if(this.rocket_array.length < this.rocket_number)
    	{
    		let textureBeam = TextureCache["img/beams.png"];
    		let rect = new Rectangle(0,180,30,30);
    		textureBeam.frame = rect;
    		let tmpRocket = new Sprite(textureBeam);
    		tmpRocket.bool = true;
        	tmpRocket.x = player.player_sprite.x-8;
        	tmpRocket.y = player.player_sprite.y+10;
        	tmpRocket.nominal_speed = 12;
        	tmpRocket.vx = tmpRocket.nominal_speed*Math.sin(player.player_sprite.angle);
        	tmpRocket.vy = -tmpRocket.nominal_speed*(Math.cos(player.player_sprite.angle));
        	this.rocket_array.push(tmpRocket);
        	app.stage.addChild(tmpRocket);
    	}
    }
    this.updateRocket = function()
    {
        let enemy_tab = this.enemy_army.enemy_tab;
    	for(var i = 0 ; i < this.rocket_array.length;i++)
    	{
    		//Find nearest target
    		ans = rocketDetector(this.rocket_array[i],enemy_tab); 
			if(ans[0] == false)
			{
				newX_missile = this.rocket_array[i].x + this.rocket_array[i].vx;
	    	    newY_missile = this.rocket_array[i].y + this.rocket_array[i].vy;
	    	    if( borderTest(newX_missile,newY_missile) )
	    	    {
	    	    	this.rocket_array[i].x   = newX_missile;
	    	        this.rocket_array[i].y   = newY_missile;
	    	        for(var j = enemy_tab.length - 1; j >= 0 ; j--)
	    	        {
	    	            if(hitTestRectangle(this.rocket_array[i],enemy_tab[j]))
	    	            {
	    	            	console.log("Shot on target" + j);
	    	                app.stage.removeChild(enemy_tab[j]);
	    	                enemy_tab.splice(j,1);
	    	                console.log("Remaining targets : "+enemy_tab.length);
	    	                app.stage.removeChild(this.rocket_array[i]);
	    	                this.rocket_array.shift();
	    	            }
	    	        }
	    	    }else{
	    	        this.rocket_array[i].bool = false;
	    	        app.stage.removeChild(this.rocket_array[i]);
	    	        this.rocket_array.shift();
	    	    }	
			}else
			{
				//AI
				//console.log("Target "+ans[1]+" Detected at distance "+ ans[2]);
				x_dir = Math.floor(enemy_tab[ans[1]].x - this.rocket_array[i].x)/ans[2];
				y_dir = Math.floor(enemy_tab[ans[1]].y - this.rocket_array[i].y)/ans[2];

				newX_missile = this.rocket_array[i].x + x_dir*5;
				newY_missile = this.rocket_array[i].y + y_dir*5;
				if( borderTest(newX_missile,newY_missile) )
	    	    {
	    	    	this.rocket_array[i].x   = newX_missile;
	    	        this.rocket_array[i].y   = newY_missile;
	    	        for(var j = ans[1]; j >= ans[1] ; j--)
	    	        {
	    	            if(hitTestRectangle(this.rocket_array[i],enemy_tab[j]))
	    	            {
	    	            	console.log("Shot on target" + j);
	    	                app.stage.removeChild(enemy_tab[j]);
                            enemy_tab[j].remove();
	    	                enemy_tab.splice(j,1);
	    	                console.log("Remaining targets : "+enemy_tab.length);
	    	                app.stage.removeChild(this.rocket_array[i]);
	    	                this.rocket_array.shift();
	    	            }
	    	        }
	    	    }else{
	    	        this.rocket_array[i].bool = false;
	    	        app.stage.removeChild(this.rocket_array[i]);
	    	        this.rocket_array.shift();
	    	    }
			}
		}    	


    }


    this.update = function(){
        // update Missiles
        this.updateMissile();
        // update rockets
        this.updateRocket();
        //update the player movments
    	newX = this.player_sprite.x + this.player_sprite.vx;
    	newY = this.player_sprite.y + this.player_sprite.vy;
        let enemy_tab = this.enemy_army.enemy_tab;
    	// Test Joueur en dehors ou collided
    	if( borderTest(newX,newY) ){
    		if(enemy_tab.length == 0)	state = end;
    	    for(var i = 0 ; i < enemy_tab.length ; i++)
    	    {
    	        if(hitTestRectangle(this.player_sprite,enemy_tab[i]))
    	        {
    	            console.log("Collision with enemy " + i);
    	            this.player_sprite.x = window_width/2;
    	            this.player_sprite.y = window_height/2;
    	            remove_enemies();
    	            init_enemies();
    	            this.remove();
    	            state = game_over;
    	        }else{
    	            this.player_sprite.x = newX;
    	            this.player_sprite.y = newY;    
    	        }
    	    }
    	}
    	this.player_sprite.rotation += this.player_sprite.v_rot;
    	this.player_sprite.angle = this.player_sprite.rotation;
    }
}

function rocketDetector(rocket,enemy)
{
	for(var i = 0; i < enemy.length ; i++)
	{
		distance = Math.floor(Math.sqrt( (rocket.x - enemy[i].x)*(rocket.x - enemy[i].x) + (rocket.y - enemy[i].y)*(rocket.y - enemy[i].y) ));
		if(distance < 150)
		{
			return [true,i,distance];
		}
	}
	return [false,0];
}