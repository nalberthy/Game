(function () {
    var config = {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: { y: 300 }
            }
        },
        dom: {
                createContainer: true
        },
        scene: [
            mainScene,
            tutorialScene,
        ]
    };

    var game = new Phaser.Game(config);
    game.scene.start('main');
})();