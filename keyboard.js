
function keyboard(value)
{
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = function(event) {
        if(event.key == key.value ){
            if( key.isUp && key.press )
            {
                key.press();
                key.isUp = false;
                key.isDown = true; 
            } 
        }
    }
    key.upHandler = function(event){
        if(event.key == key.value){
            if(key.isDown && key.release)
            {
                key.release();
                // console.log(key.value + " released");
                key.isUp = true;
                key.isDown = false;
            }
        }
    }
    window.addEventListener(
        "keydown", key.downHandler, false
    );
    window.addEventListener(
        "keyup",key.upHandler,false
    );
    return key;
}

  
let left = keyboard('Left'),
    q_key = keyboard('q'),
    up = keyboard('Up'),
    z_key = keyboard('z'),
    right = keyboard('Right'),
    d_key = keyboard('d'),
    down = keyboard('Down'),
    s_key = keyboard('s'),
    a_key = keyboard('a'),
    e_key = keyboard('e'),
    shot_one_key = keyboard('&'),
    shot_two_key = keyboard('é'),
    shift = keyboard('Shift'),
    ctrl_key = keyboard('Control');

    left.press = function(){
        player.player_sprite.vx = -player.player_sprite.nominal_speed/2;
    }
    left.release = function(){
        player.player_sprite.vx = 0;
    }
    q_key.press = function(){
        player.player_sprite.vx = -player.player_sprite.nominal_speed/2;
    }
    q_key.release = function(){
        player.player_sprite.vx = 0;
    }
    up.press = function(){
        player.player_sprite.vx = +player.player_sprite.nominal_speed*Math.sin(player.player_sprite.angle);
        player.player_sprite.vy = -player.player_sprite.nominal_speed*Math.cos(player.player_sprite.angle);
    }
    up.release = function(){
        player.player_sprite.vx = 0;
        player.player_sprite.vy = 0;
    }  
    z_key.press = function(){
        player.player_sprite.vx = +player.player_sprite.nominal_speed*Math.sin(player.player_sprite.angle);
        player.player_sprite.vy = -player.player_sprite.nominal_speed*Math.cos(player.player_sprite.angle);
    }
    z_key.release = function(){
        player.player_sprite.vx = 0;
        player.player_sprite.vy = 0;
    } 
    
    right.press = function(){
        player.player_sprite.vx = player.player_sprite.nominal_speed/2;
    }
    right.release = function(){
        player.player_sprite.vx = 0;
    }
    d_key.press = function(){
        player.player_sprite.vx = player.player_sprite.nominal_speed/2;
    }
    d_key.release = function(){
        player.player_sprite.vx = 0;
    }  
    down.press = function(){
        player.player_sprite.vy = player.player_sprite.nominal_speed;
    }
    down.release = function(){
        player.player_sprite.vy = 0;
    }
    s_key.press = function(){
        player.player_sprite.vy = player.player_sprite.nominal_speed;
    }
    s_key.release = function(){
        player.player_sprite.vy = 0;
    }

    a_key.press = function(){
        
        player.player_sprite.v_rot = -Math.PI/48;
    }
    a_key.release = function(){
        player.player_sprite.v_rot = 0;
        if( z_key.isDown || up.isDown)
        {
            player.player_sprite.vx = +player.player_sprite.nominal_speed*Math.sin(player.player_sprite.angle);
            player.player_sprite.vy = -player.player_sprite.nominal_speed*Math.cos(player.player_sprite.angle);
        }
    }
    e_key.press = function(){
        
        player.player_sprite.v_rot = +Math.PI/48;
    }
    e_key.release = function(){
        player.player_sprite.v_rot = 0;
        if( z_key.isDown || up.isDown)
        {
            player.player_sprite.vx = +player.player_sprite.nominal_speed*Math.sin(player.player_sprite.angle);
            player.player_sprite.vy = -player.player_sprite.nominal_speed*Math.cos(player.player_sprite.angle);
        }
    }

    shot_one_key.press = function(){   
        player.addMissile();
    }
    shot_one_key.release = function(){

    }
    shot_two_key.press = function(){
        player.addRocket();
    }
    shift.press = function(){
        player.player_sprite.nominal_speed += 1;
        if(player.player_sprite.nominal_speed >= 10){
            player.player_sprite.nominal_speed = 10;
        }
        player.player_sprite.vx = +player.player_sprite.nominal_speed*Math.sin(player.player_sprite.angle);
        player.player_sprite.vy = -player.player_sprite.nominal_speed*Math.cos(player.player_sprite.angle);
    }
    shift.release = function(){
        
    }
    ctrl_key.press = function(){
        player.player_sprite.nominal_speed -= 1;
        if(player.player_sprite.nominal_speed <= 1){
            player.player_sprite.nominal_speed = 1;
        }
        player.player_sprite.vx = +player.player_sprite.nominal_speed*Math.sin(player.player_sprite.angle);
        player.player_sprite.vy = -player.player_sprite.nominal_speed*Math.cos(player.player_sprite.angle);
    }
    ctrl_key.release = function(){
        
    }