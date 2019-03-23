var assets = [
    "images/title.png",
    "images/b_blue.png",
    "images/b_red.png",
    "images/kikori_gosaku.png",
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene); core.resume();

    //==========
    // ここから
    //==========

    scene.backgroundColor = "skyblue";

    var sound = new Howl({
        src: ["sounds/bgm_maoudamashii_8bit29.mp3"],
        onload: function() {
            console.log('Load!');
            //this.play();
        },
        onplay: function() {
            console.log('play!');
        },
        onstop: function() {
            console.log('stop!');
        },
        onend: function() {
          console.log('Finished!');
        }
    });

    var soundId = 0;


    //再生ボタン
    var playButton = new Sprite(62/1, 110/2);
    playButton.image = core.assets["images/b_blue.png"];
    playButton.x = (scene.width - playButton.width) * 0.25;
    playButton.y = (scene.height - playButton.height) * 0.5;
    scene.addChild(playButton);

    playButton.on(enchant.Event.TOUCH_START, function(){
        this.frame = [1];

        stopButton.touchEnabled = true;
        this.touchEnabled = false;

        soundId = sound.play();
    });
    //
    // playButton.on(enchant.Event.ANIMATION_END, function(){
    //     this.frame = [0];
    // });


    //停止ボタン
    var stopButton = new Sprite(62/1, 110/2);
    stopButton.image = core.assets["images/b_red.png"];
    stopButton.x = (scene.width - playButton.width) * 0.75;
    stopButton.y = (scene.height - playButton.height) * 0.5;
    scene.addChild(stopButton);

    stopButton.on(enchant.Event.TOUCH_START, function(){
        this.frame = [0, 1, null];

        playButton.frame = [0];
        playButton.touchEnabled = true;
        this.touchEnabled = false;

        sound.stop();
    });

    stopButton.on(enchant.Event.ANIMATION_END, function(){
        this.frame = [0];
    });


    //ボタンの初期状態
    playButton.touchEnabled = true;
    stopButton.touchEnabled = false;


    //スライダーを作る関数
    function createSlider(width, boxColor, backColor, start, callback) {
        var group = new Group();

        //背景
        var back = new Sprite(width, 10);
        back.backgroundColor = backColor;
        back.y = -(back.height * 0.5);
        group.addChild(back);

        //つまみ
        var box = new Sprite(30, 30);
        //box.x = back.x - (box.width * 0.5);
        box.centerX = Math.max(back.x, Math.min(back.width, width * start));
        box.centerY = back.centerY;
        box.backgroundColor = boxColor;
        group.addChild(box);

        //マウスでつまみをドラッグする操作
        var g_box = new GestureDetector(box);
        box.on(Event.SLIP, function(e){
            //console.log(e);
            var posX = e.x - group.x;
            this.centerX = Math.max(back.x, Math.min(back.width, posX));

            var value = (this.centerX - back.x) / back.width;
            callback(value);
        });

        return group;
    }


 　　//TODO: ボリューム調整

    //TODO: スピード調整



    //==========
    // ここまで
    //==========

};

function titleStart(){// タイトル画面
    var scene = gameManager.createTitleScene();
    core.replaceScene(scene); core.pause();
    scene.on(enchant.Event.TOUCH_START, function(){gameStart();});
}

//==========
//EnchantJS
enchant();
var gameManager;
var core;
var scene;
window.onload = function(){
    gameManager = new common.GameManager();
    core = gameManager.createCore(320, 480);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
};
