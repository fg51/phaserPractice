/// <reference path="../typings/index.d.ts" />


const kWIDTH: number  = 800;
const kHEIGHT: number = 600;


let platforms;
let player;
let cursors;


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

    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    game.load.image('star', 'assets/star.png');
}



function create() {
    gen_world();
    gen_player();

    //gen_controls
    cursors = game.input.keyboard.createCursorKeys();

}

function update() {
    game.physics.arcade.collide(player, platforms);

    // player movement
    player.body.velocity.x = 0;

    if (cursors.left.isDown) { // left
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) { // right
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else { // stand still
        player.animations.stop();
        player.frame = 4;
    }

    // jump
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }

}


function gen_world() {
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


function gen_player () {
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}
