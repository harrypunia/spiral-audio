let init = false,
    reset = false,
    col = {
        0: {
            r: 50,
            g: 10,
            b: 38
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
    circle = {
        size: 400,
        reponsive: 500,
    },
    song,
    eye = 255,
    amp,
    rain = [],
    rainIntensity = 100,
    vol,
    openEye = 10,
    a = 0,
    test = 0;

function preload() {
    song = loadSound('assets/song.mp3');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    if (song.isLoaded()) { //Condition here
        let btn = document.getElementById('play');
        btn.classList.add('in');
    }
    amp = new p5.Amplitude();
    for (let i = 0; i < rainIntensity; i++) {
        rain[i] = new Rain((width / (rainIntensity)) * (i + 1) - (width / 2), random(-height / 2, -height * 2), 100);
        rain[i].preload();
    }
}

function draw() {
    test++;
    reset ? (background(col[0].r, col[0].g, col[0].b), reset = false) : background(col[0].r, col[0].g, col[0].b, 20);
    circle.x = map(mouseX, 0, width, -20, 20);
    circle.y = map(mouseY, 0, height, -20, 20);

    if (init) {
        a += 0.0001
        vol = amp.getLevel();
        //-------------------
        push();
        translate(width / 2, height / 2 + 50);
        //
        rotate(degrees(1 + a));
        rectMode(CENTER);
        fill(0, 100);
        rect(0, 0, 20 + (vol * 100), 20 + (vol * 100))
        rotate(degrees(-(1 + a)));
        translate(0, -50);
        //
        for (let i = 0; i < rainIntensity; i++) {
            let responsive = {
                x: (circle.size / 40) + (vol * circle.reponsive),
                y: (circle.size / 2) + (vol * circle.reponsive)
            }
            rain[i].show(responsive.x, responsive.y);
        }
        //
        fill(0);
        noStroke();
        ellipse(circle.x, circle.y - 200, (circle.size / 40) + (vol * circle.reponsive / openEye), (circle.size / 2) + (vol * circle.reponsive / 4));
        ellipse(circle.x - 200, circle.y + 200, (circle.size / 2) + (vol * circle.reponsive / 4), (circle.size / 20) + (vol * circle.reponsive / openEye));
        ellipse(circle.x + 200, circle.y + 200, (circle.size / 2) + (vol * circle.reponsive / 4), (circle.size / 20) + (vol * circle.reponsive / openEye));
        //
        noFill();
        if (vol > 0.5) {
            eye = 255
            fill(50, 10, 38);
            noStroke();
            ellipse(circle.x, circle.y - 200, (circle.size / 20) + vol * 100, (circle.size / 12) + vol * 100);
            ellipse(circle.x - 200, circle.y + 200, (circle.size / 20) + vol * 100, (circle.size / 12) + vol * 100);
            ellipse(circle.x + 200, circle.y + 200, (circle.size / 20) + vol * 100, (circle.size / 12) + vol * 100);
            openEye = 4;
        } else {
            eye -= 5;
            fill(50, 10, 38, eye);
            noStroke();
            ellipse(circle.x, circle.y - 200, (circle.size / 20) + vol * 100, (circle.size / 12) + vol * 100);
            ellipse(circle.x - 200, circle.y + 200, (circle.size / 20) + vol * 100, (circle.size / 20) + vol * 100);
            ellipse(circle.x + 200, circle.y + 200, (circle.size / 20) + vol * 100, (circle.size / 20) + vol * 100);
            openEye = 10;
        }
        //
        pop();
        test % 100 == 0 ? console.log(frameRate()) : 0;
        //-------------------
    }
}


function mousePressed() {
    circle.size = 700
}

function mouseReleased() {
    circle.size = 400;
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
