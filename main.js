var game = new Phaser.Game(743, 396, Phaser.AUTO, 'game_div', { preload: preload, create: create, update: update});

function preload() {
    game.load.spritesheet('felock', 'Geffen_Mage_02_noBG.png', 80, 130, 50);
    game.load.spritesheet('felock2', 'Geffen_Mage_14_noBG.png', 90, 140, 50);
    game.load.spritesheet('felock3', 'Felock_noBG.png', 60, 70, 50);
    game.load.image('background', 'back03.jpg');
}

var felock;
var felock2;
var felock3;
var background;
var cursors;
var attackButton;
var facing = 'right';
var attacking = false;
var attackTimer = 0;

function create() {
    background = game.add.tileSprite(0, 0, 743, 396, 'background');
    background.fixedToCamera = true;

    game.stage.backgroundColor = '#001122';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    felock = game.add.sprite(200, 250, 'felock');
    game.physics.enable(felock, Phaser.Physics.ARCADE);
    felock.anchor.setTo(0.5,0.5);
    felock.scale.x *= -1;

    felock.animations.add('idle', [0, 1, 2, 3, 4], 10, true, true);
    felock.animations.add('walk', [10, 11, 12, 13, 14, 15, 16, 17], 10, true, true);
    felock.animations.add('attack', [30, 31, 32, 33, 34, 35, 36], 10, true, true);

    felock.inputEnabled = true;
    felock.input.enableDrag();

    felock2 = game.add.sprite(450, 150, 'felock2');
    felock2.animations.add('idle', [0, 1, 2, 3, 4, 5], 8, true, true);
    felock2.animations.play('idle');

    felock3 = game.add.sprite(300, 250, 'felock3');
    felock3.animations.add('idle', [0, 1, 2, 3], 8, true, true);
    felock3.animations.play('idle');

    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    felock.body.velocity.x = 0;
    felock.body.velocity.y = 0;
    if (cursors.left.isDown)
    {
        if (facing == 'right') {
            felock.scale.x *= -1;
        }
        facing = 'left';
        felock.body.velocity.x = -80;
        felock.animations.play('walk');
    } else if(cursors.right.isDown) {
        if (facing == 'left') {
            felock.scale.x *= -1;
        }
        facing = 'right';
        felock.body.velocity.x = 80;
        felock.animations.play('walk');
    } else if (cursors.up.isDown) {
        felock.body.velocity.y = -80;
        felock.animations.play('walk');
    } else if (cursors.down.isDown) {
        felock.body.velocity.y = 80;
        felock.animations.play('walk');
    } else if (attackButton.isDown && game.time.now > attackTimer) {
        attacking = true;
        felock.animations.play('attack');
        attackTimer = game.time.now + 300;
    } else if(!attacking) {
        felock.animations.play('idle');
    }
    if (game.time.now > attackTimer) {
        attacking = false;
    }
}
