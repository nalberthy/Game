var mainScene = new Phaser.Scene('main');
    var valor = 0;
    var iniciarAng = false;
    var BetweenPoints;
    var DefinirAngulo;
    var velocidadeRotacao;
    var velocity;
    var line;
    var cannon;
    var bala;
    var gfx;
    var force = 0;
    var posX=0;


    var iniciar = false;
    // new Phaser.Game(config);

/*https://phaser.io/examples/v3/view/camera/follow-user-controlled-sprite*/
mainScene.init = function () {

};

mainScene.preload=function() {
        console.log('aqui');
        this.load.html('angulo', 'assets/angulo.html');
        this.load.html('buttonreset', 'assets/buttonreset.html');
        this.load.html('forcaElastica', 'assets/forcaElastica.html');
        this.load.image('backdrop', 'assets/back.jpg')
        this.load.image('cannon', 'assets/cannon.png'); // canhão base
        this.load.spritesheet('bala', 'assets/bala.png', { frameWidth: 16, frameHeight: 18 }); // 
        this.load.image('ground', 'assets/platform.png');
        // this.load.image('grass', 'assets/grass.png'); 
        this.load.image('platform', 'assets/platform.png'); 
        this.load.image('cano', 'assets/cano.png');
        this.load.image('reiniciar', 'assets/reiniciar.png');
    }

    mainScene.create=function() {  

        
//------------------CRIAÇÃO DE CENÁRIO---------------------------------------------------------------------------------------------------------- 
        platforms = this.physics.add.staticGroup();
        this.cameras.main.setBounds(0, 0, 1920 , 1080);
        this.physics.world.setBounds(0, 0, 1920, 1080);
        this.add.image(0, 0, 'backdrop').setOrigin(0);
        this.add.image(1920, 0, 'backdrop').setOrigin(0).setFlipX(true);
        platforms.create(960, 1070, 'platform').setScale(2).refreshBody();
        
        cannon = this.add.image(70, 1008, 'cannon');
        
// ----------------------------------------------------------------------------------------------------------------------------------------------
        BetweenPoints = Phaser.Math.Angle.BetweenPoints;
        DefinirAngulo = Phaser.Geom.Line.SetToAngle;
        velocidadeRotacao = this.physics.velocityFromRotation;
// ----------------------------------------------------------------------------------------------------------------------------------------------
        bala = this.physics.add.sprite(cannon.x, cannon.y, 'bala').setScale(2);
        bala.setCollideWorldBounds(true);
        this.cameras.main.startFollow(bala);
        this.physics.add.collider(bala, platforms);
//-----------------------------------------------------------------------------------------------------------------------------------------------
        gfx = this.add.graphics()        // linha do canhão
        gfx.setDefaultStyles({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
// ----------------------------------------------------------------------------------------------------------------------------------------------
        velocity = new Phaser.Math.Vector2();
        line = new Phaser.Geom.Line();
// ----------------------------------------------------------------------------------------------------------------------------------------------
        // Desativa o corpo da física, desativa o objeto do jogo, oculta o objeto do jogo
        bala.disableBody(true, true);
        angle = Phaser.Math.DegToRad(valor); 
        DefinirAngulo(line, cannon.x, cannon.y, angle, 128);
        velocidadeRotacao(angle, force, velocity);
        gfx.clear().strokeLineShape(line);
// ----------------------------------------------------------------------------------------------------------------------------------------------
    //====================== TESTES DE APLICAÇÃO ====================
        
        // bala.setGravityY(0);      // gravidade
        // bala.setGravityX(0);
       
// ----------------------------------------------------------------------------------------------------------------------------------------------
        
        // this.input.on('pointerup', function () {
        //     bala.enableBody(true, cannon.x, cannon.y, true, true).setVelocity(velocity.x, velocity.y);
        //     bala.play('fly');
        // }, this);
        var reiniciar= this.add.image(posX,1070,"reiniciar").setInteractive();

        var angulo = this.add.dom(400, 0).createFromCache('angulo');
            angulo.addListener('click');
            angulo.on('click', function (event) {
                if (event.target.name === 'playButton'){
                    var valorentrada = this.getChildByName('valor');
                    valor = valorentrada.value;
                    iniciarAng = true;

                    console.log(this.valor);
                    if (valorentrada.value !== ''){
                        this.removeListener('click');
                        this.setVisible(false);
                    }else{
                        this.scene.tweens.add({
                        targets: text,
                        alpha: 0.2,
                        duration: 250,
                        ease: 'Power3',
                        yoyo: true
                        });
                    }
                }
            });
            this.tweens.add({
                targets: angulo,
                x:300,
                y: 560,
                duration: 0,
                ease: 'Power3'
            });
// --------------------------------------------------------------------------------------------------------------
        var forcaElastica = this.add.dom(400, 0).createFromCache('forcaElastica');
        forcaElastica.addListener('click');
        forcaElastica.on('click', function (event) {
                if (event.target.name === 'play'){
                    var valorK = this.getChildByName('valor');
                    var valorX = this.getChildByName('valor1');
                    force = (valorK.value * valorX.value);
                    iniciar=true;
                    console.log(force);
                    if (valorK.value !== '' && valorX.value !== ''){
                        this.removeListener('click');
                        this.setVisible(false);
                    }else{
                        this.scene.tweens.add({
                        targets: text,
                        alpha: 0.2,
                        duration: 250,
                        ease: 'Power3',
                        yoyo: true
                        });
                    }
                }
            });
            this.tweens.add({
                targets: forcaElastica,
                x:700,
                y: 560,
                duration: 0,
                ease: 'Power3'
            });

            reiniciar.on('pointerdown', function (event) {
                location.reload();
            });

        }

        mainScene.update=function() {

            posX=bala.x;

            console.log("update")

        if (iniciarAng == true){
            console.log(force);
            angle = Phaser.Math.DegToRad(-valor); 
            DefinirAngulo(line, cannon.x, cannon.y, angle, 128);
            velocidadeRotacao(angle, force, velocity);
            gfx.clear().strokeLineShape(line);
        }
        if (iniciar== true){
            this.input.on('pointerup', function () {
            bala.enableBody(true, cannon.x, cannon.y, true, true).setVelocity(velocity.x, velocity.y);
            bala.play('fly');
            }, this);
        }

    }
    
