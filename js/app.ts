/// <reference path="../typings/index.d.ts" />

const kWIDTH: number  = 800;
const kHEIGHT: number = 600;

let game = new Phaser.Game(
    kWIDTH, kHEIGHT, Phaser.AUTO, '',
    { preload: preload
    , create: create
    , update: update
    }
);


function preload() {
    game.load.image('star', 'assets/star.png');
}

function create() {
    game.add.sprite(0, 0, 'star');
}

function update() {
}

