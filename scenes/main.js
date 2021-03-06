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
    var text;
    var valorK = 0;
    var valorX = 0;
    var iniciar = false;
    // new Phaser.Game(config);
    var reiniciar;
    
    var colidiu;

/*https://phaser.io/examples/v3/view/camera/follow-user-controlled-sprite*/
mainScene.init = function () {

};

mainScene.preload=function() {
        this.load.html('angulo', 'assets/angulo.html');
        // this.load.html('buttonreset', 'assets/buttonreset.html');
        this.load.html('forcaElastica', 'assets/forcaElastica.html');
        this.load.image('backdrop', 'assets/back.png')
        this.load.image('cannon', 'assets/cannon3.png'); // canhão base
        this.load.spritesheet('bala', 'assets/bala.png', { frameWidth: 16, frameHeight: 18 }); // 
        // this.load.image('ground', 'assets/platform.png');
        // this.load.image('grass', 'assets/grass.png'); 
        this.load.image('platform', 'assets/plataforma.png'); 
        this.load.image('cano', 'assets/cano.png');
        this.load.image('reiniciar', 'assets/reiniciar.png');
        this.load.image('alvo','assets/alvo.png');
    }

    mainScene.create=function() {  

        
//------------------CRIAÇÃO DE CENÁRIO---------------------------------------------------------------------------------------------------------- 
        platforms = this.physics.add.staticGroup();
        this.cameras.main.setBounds(0, 0, 1920 , 1080);
        this.physics.world.setBounds(0, 0, 1920, 1080);
        this.add.image(0, 0, 'backdrop').setOrigin(0);
        this.add.image(1920, 0, 'backdrop').setOrigin(0).setFlipX(true);
        platforms.create(60, 1050, 'platform').setScale(2).refreshBody();
        reiniciar= this.add.image(70,350,"reiniciar").setInteractive();
        
        cannon = this.add.image(70, 980, 'cannon');

// ----------------------------------------------------------------------------------------------------------------------------------------------
        BetweenPoints = Phaser.Math.Angle.BetweenPoints;
        DefinirAngulo = Phaser.Geom.Line.SetToAngle;
        velocidadeRotacao = this.physics.velocityFromRotation;
// ----------------------------------------------------------------------------------------------------------------------------------------------
        alvo = this.physics.add.staticGroup();
        alvo.create(1800, 600, 'alvo').setScale(2).refreshBody();
// ----------------------------------------------------------------------------------------------------------------------------------------------
        bala = this.physics.add.sprite(cannon.x, cannon.y, 'bala').setScale(2);
        cano = this.add.image(60, 987, 'cano'); 
        
        this.add.image(70, 980, 'cannon');
        bala.setCollideWorldBounds(true);
        this.cameras.main.startFollow(bala);
        this.physics.add.collider(bala, platforms);
        this.physics.add.collider(bala, alvo);
// ----------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------
        gfx = this.add.graphics() 
        // gfx.setTexture('cano');
        gfx.setDefaultStyles({lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });

// ----------------------------------------------------------------------------------------------------------------------------------------------
        velocity = new Phaser.Math.Vector2();
        line = new Phaser.Geom.Line();
// ----------------------------------------------------------------------------------------------------------------------------------------------
        // Desativa o corpo da física, desativa o objeto do jogo, oculta o objeto do jogo
        bala.disableBody(true, true);
        angle = Phaser.Math.DegToRad(valor); 
        DefinirAngulo(line, cannon.x, cannon.y, angle, 128);
        velocidadeRotacao(angle, force, velocity);
        // gfx.clear().strokeLineShape(line);

        
// ----------------------------------------------------------------------------------------------------------------------------------------------
    //====================== TESTES DE APLICAÇÃO ====================
      



        
        // bala.setGravityY(-120);      // gravidade
        // bala.setGravityX(0);
       
// ----------------------------------------------------------------------------------------------------------------------------------------------
        
        // this.input.on('pointerup', function () {
        //     bala.enableBody(true, cannon.x, cannon.y, true, true).setVelocity(velocity.x, velocity.y);
        //     bala.play('fly');
        // }, this);
        
        reiniciar.on('pointerdown', function (event) {
            location.reload();
        });
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
                    valorK = this.getChildByName('valor');
                    valorX = this.getChildByName('valor1');
                    
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

            text = this.add.text(32, 70).setScrollFactor(0).setFontSize(32).setColor('#ffffff');

        }
       

    mainScene.update=function() {

        var cam = this.cameras.main;
        text.setText([
            'Angulo:'+valor,
            'Constante elástica (K):'+valorK.value,
            'Deformação da mola (X):'+valorX.value,
            'Força:'+force,

        ]);


        if (iniciarAng == true){
            cano.rotation=Phaser.Math.DegToRad(-valor)
            angle = Phaser.Math.DegToRad(-valor); 
            DefinirAngulo(line, cannon.x, cannon.y, angle, 128);
            velocidadeRotacao(angle, force, velocity);
            // gfx.clear().strokeLineShape(line);
        }
        if (iniciar== true){
            this.input.on('pointerup', function () {
            bala.enableBody(true, cannon.x, cannon.y, true, true).setVelocity(velocity.x, velocity.y);
            bala.play('fly');
            }, this);
        }
        reiniciar.x=cam.scrollX+40;
        reiniciar.y=cam.scrollY+40;
        if(bala.body.touching.right&&bala.y>700&&bala.y<800){
           console.log('bateu'); 
        }

    }
    
 