/// <reference path="../typings/index.d.ts" />


const kWIDTH: number  = 800;
const kHEIGHT: number = 600;


let platforms;


let game = new Phaser.Game(
    kWIDTH, kHEIGHT, Phaser.AUTO, '',
    { preload: preload
    , create: create
    , update: update
    }
);


function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');

    game.load.image('star', 'assets/star.png');
}



function create() {
    //NOTE: enable phisics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //NOTE: background
    game.add.sprite(0, 0, 'sky');

    // platforms contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();   // ????
    platforms.enableBody = true;    // enable phisics of objects in the platforms

    //NOTE: genarate ground
    const ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    //NOTE: generate ledge1
    let ledge1 = platforms.create(400, 400, 'ground');
    ledge1.body.immovable = true;

    //NOTE: genarate ledge2
    let ledge2 = platforms.create(-150, 250, 'ground');
    ledge2.body.immovable = true;


}

function update() {
}

