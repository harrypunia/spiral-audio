let init = false,
    reset = false,
    col = {
        0: {
            r: 30,
            g: 10,
            b: 22
        },
        1: {
            r: 250,
            g: 73,
            b: 60
        },
        2: {
            r: 82,
            g: 10,
            b: 20
        },
        3: {
            r: 155,
            g: 120,
            b: 120
        },
        4: {
            r: 222,
            g: 23,
            b: 120
        },
    },
    song,
    amp,
    vol = 0,
    tents = [];

function preload() {
    song = loadSound('assets/hell.mp3');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    if (song.isLoaded()) { //Condition here
        let btn = document.getElementById('play');
        btn.classList.add('in');
    }
    for (let i = 0; i < 20; i++) {
        tents[i] = new Tenticle(400);
    }
    amp = new p5.Amplitude();
}

function draw() {
    background(col[0].r, col[0].g, col[0].b, 90);
    if (init) {
        vol = amp.getLevel();
        for (let i in tents) {
            tents[i].show(vol, i);
        }
    }
}

function windowResized() {
    reset = true;
    resizeCanvas(window.innerWidth, window.innerHeight);
}


const initSketch = () => {
    init = true;
    song.play();
    let btn = document.getElementById('play');
    btn.style.display = 'none';
}
