/// <reference path="../typings/index.d.ts" />
var kWIDTH = 800;
var kHEIGHT = 600;
var platforms;
var player;
var stars;
var cursors;
var game = new Phaser.Game(kWIDTH, kHEIGHT, Phaser.AUTO, '', { preload: preload,
    create: create,
    update: update
});
function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('star', 'assets/star.png');
}
function create() {
    //NOTE: enable phisics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    gen_world();
    gen_player();
    gen_stars();
    //gen_controls
    cursors = game.input.keyboard.createCursorKeys();

    game.input.onTap.add(onTap,this);
}
function update() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    // player movement
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 4;
    }
    // jump
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }

    if (game.input.pointer1.isDown){
        if (game.input.pointer1.worldX > player.body.center.x) {
            player.body.velocity.x = 150;
        }
        else {
            player.body.velocity.x = -150;
        }
    }
    //if (game.input.pointer1.justPressed(200) && player.body.touching.down) {
    //    player.body.velocity.y = -350;
    //}
}
function gen_world() {
    //NOTE: background
    game.add.sprite(0, 0, 'sky');
    // platforms contains the ground and the 2 ledges we can jump on
    platforms = game.add.group(); // ????
    platforms.enableBody = true; // enable phisics of objects in the platforms
    //NOTE: genarate ground
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    //NOTE: generate ledge1
    var ledge1 = platforms.create(400, 400, 'ground');
    ledge1.body.immovable = true;
    //NOTE: genarate ledge2
    var ledge2 = platforms.create(-150, 250, 'ground');
    ledge2.body.immovable = true;
}
function gen_player() {
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
function gen_stars() {
    //  Finally some stars to collect
    stars = game.add.group();
    stars.enableBody = true;
    for (var i = 0; i < 12; ++i) {
        var star = stars.create(i * 70, 0, 'star');
        //game.physics.arcade.enable(star);
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
}
function collectStar(player, star) {
    star.kill();
}
function onTap(pointer,doubleTap){
    if (doubleTa && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
}
