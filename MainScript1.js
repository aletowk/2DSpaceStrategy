/* To make it works: */
/*chrome.exe --allow-file-access-from-files*/

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    print = console.log;

//Create a Pixi Application
let app = new Application({ 
    width: window_width, 
    height: window_height,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);


//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

/*// To check key name
window.addEventListener("keydown",function(evt){
    console.log(evt.key)
},false );
*/

loader.add("img/ship.png")
        .add("img/beams.png")
        .add("img/enemyShip1.png")
        .load(setup);

//Define any variables that are used in more than one function
let ship;
let missile;
let enemy;
let player;
let army = new CArmy();

function setup()
{

    player = new Player();

    //init_enemies();
    army.init_army();


    //print_enemies();    
    //Set the game state
    state = play;
    app.ticker.add(function(delta){
        gameLoop(delta);
    });
}

function gameLoop(delta){
    state(delta);
}
function play(delta)
{
    //player.updateRocket();
    //player.updateMissile();
    //player.update();
    //tracking_IA(enemy_tab,player.player_sprite);

    army.update(player);


}
function end(delta)
{
    alert("End Of Game !");
    print("No more ticker, nothing to do");
    app.ticker.destroy();
}

function game_over(delta)
{
    alert("You have lost");
    print("No more ticker, nothing to do");
    app.ticker.destroy();
}