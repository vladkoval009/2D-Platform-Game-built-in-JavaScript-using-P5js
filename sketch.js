//The Game Project 7 - 

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var game_score;
var flagpole;

var clouds;
var mountain;
var trees_x;
var collectable;
var canyon;

var lives;

var mars;

var jumpSound;
var backmusic;
var fallsounds;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    backmusic = loadSound('assets/theme.mp3');
    backmusic.setVolume(0.3 );
    fallsounds = loadSound('assets/fall.mp3');
    fallsounds.setVolume(0.5);
    
}

function setup() 
{
    createCanvas(1024, 576);
    
    stroke(25)
    lives = 4;
    textSize(20);
    
    mars = loadImage("assets/mars.jpg");
    sun = loadImage("assets/sun.png");

    startGame();
    
}

function startGame()

{
    floorPos_y = height * 3 / 4;
    gameChar_x = width / 2 + (-460);
    gameChar_y = floorPos_y;
    backmusic.play();
   
 
    // Variable to control the background scrolling.

    scrollPos = 0;

    // Variable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    
    gameChar_world_x = gameChar_x - scrollPos;

    // Boolean variables to control the movement of the game character.
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;


    // Initialise arrays of scenery objects.
    
    trees_x = [-300,-500,-700,100, 352, 700, 1700, 1000, 2500, 3000, 3300];

    clouds = [{
            x_pos: 700,
            width: 0,
            y_pos: 500
        },
        {
            x_pos: 50,
            width: 200,
            y_pos: 100
        },
        {
            x_pos: 250,
            width: 200,
            y_pos: 80
        },
        {
            x_pos: 10,
            width: 0,
            y_pos: 50
        },
        {
            x_pos: 500,
            width: 230,
            y_pos: 90
        },
        
        {
            x_pos: -300,
            width: 200,
            y_pos: 90
        },
            
         {
            x_pos: 10,
            width: 0,
            y_pos: 50
        },
        {
            x_pos: -600,
            width: 200,
            y_pos: 90
        },
        
        {
            x_pos: 600,
            width: 200,
            y_pos: 90
        },
              ];

    mountains = [
          {
            x_pos: -100,
            y_pos: floorPos_y
        },
        {
            x_pos: -200,
            y_pos: floorPos_y
        },
        {
            x_pos: -300,
            y_pos: floorPos_y
        },
        {
            x_pos: 200,
            y_pos: floorPos_y
        },
        {
            x_pos: 400,
            y_pos: floorPos_y
        },
        {
            x_pos: 100,
            y_pos: floorPos_y
        },

        {
            x_pos: 800,
            y_pos: floorPos_y
        },
        {
            x_pos: 1000,
            y_pos: floorPos_y
        },
        {
            x_pos: 1200,
            y_pos: floorPos_y
        },
        {
            x_pos: 1400,
            y_pos: floorPos_y
        },
        {
            x_pos: 1600,
            y_pos: floorPos_y
        },
                ];
    canyon = [

        {
            canyonPos_x: 100,
            canyonPos_y: floorPos_y,
            width: 120,
            height: 150
        },
        {
            canyonPos_x: 600,
            canyonPos_y: floorPos_y,
            width: 120,
            height: 150
        },
        {
            canyonPos_x: 900,
            canyonPos_y: floorPos_y,
            width: 120,
            height: 150
        }



              ];

    collectable = [
        {
            x_pos: -200,
            y_pos: floorPos_y,
            width: 50,
            height: 50,
            isFound: false
        },
        {
            x_pos: 800,
            y_pos: floorPos_y,
            width: 50,
            height: 50,
            isFound: false
        },
        {
            x_pos: 1300,
            y_pos: floorPos_y,
            width: 50,
            height: 50,
            isFound: false
        },
        
            {
            x_pos: -200,
            y_pos: floorPos_y,
            width: 50,
            height: 50,
            isFound: false
        },
         {
            x_pos: 300,
            y_pos: floorPos_y,
            width: 50,
            height: 50,
            isFound: false
        },
                   ];

    game_score = 0;

    flagpole = {
        x_pos: 1700,
        isReached: false,
        height: 40
    }
    lives -= 1;
}

function draw() 
    
    {
        
    background(150, 123, 182);

    noStroke();
    fill(237, 155, 0);
    rect(0, floorPos_y, width, height / 4);
    image(mars, 0, floorPos_y, width, height / 4);

        
    //Scrolling of the background
    
    push();
    translate(scrollPos, 0);
        
    //giant planets
        
    fill(255,255,0);  
    ellipse(1200,100,100,100)  
    fill(75,0,130);
    ellipse(500,100,500,500)
    fill(0,0,0);
    
    //the dark sun

    image(sun, 170,-330,500,800)
    

    // Draw clouds.

    drawClouds();
        
    // Draw mountains.

    drawMountains();  
    

    // Draw trees.

    drawTrees();

    // Draw canyons.
        
    

    for (var i = 0; i < canyon.length; i++) {
        drawCanyon(canyon[i]);
        checkCanyon(canyon[i]);
    }

    //Draw collectable items.

    for (var q = 0; q < collectable.length; q++) {
        if (collectable[q].isFound != true) {
            drawCollectable(collectable[q]);
            checkCollectable(collectable[q]); 
        }
        

    }

    renderFlagpole();

    pop();


    drawGameChar();

    // Logic to make the game character move or the background scroll.

    if (isLeft) {
        if (gameChar_x > width * 0.5) {
            gameChar_x -= 5;
        } else {
            scrollPos += 5;
        }
    }

    if (isRight) {
        if (gameChar_x < width * 0.5) {
            gameChar_x += 5;
        } else {
            scrollPos -= 5;
        }
    }


    // Logic to make the game character rise and fall.

    if (gameChar_y < floorPos_y) {
        gameChar_y += 2;
        isFalling = true;
    } else {
        isFalling = false;
    } 
    if (isPlummeting) {
        gameChar_y += 8;
    }

    if (flagpole.isReached != true); {
        checkFlagpole();
    }


    gameChar_world_x = gameChar_x - scrollPos;

   console.log ("FALL",gameChar_y);

}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
    if (keyCode == 37) {
        isLeft = true;
    }
    if (keyCode == 39) {
        isRight = true;
    }

    if (key == " ") {
        if (isFalling); {
            gameChar_y -= 100;
            
        }
    }


}


function keyReleased() {

    if (keyCode == 37) {
        isLeft = false;
    };

    if (keyCode == 39) {
        isRight = false;
    };

    if (keyCode == 32) {
        isPlummeting = false;
        jumpSound.play();
    }


    console.log("keyReleased: " + key);
    console.log("keyReleased: " + keyCode);
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() {

    //the game character

    //draw screen text

    fill(255);
    noStroke();

    text("SCORE - " + game_score, 20, 20);
    text("LIVES - " + lives, 20, 60);

    if (lives < 1) 
    {
        background(0);
        
        text("GAME OVER - PRESS ANY KEY TO CONTINUE", width / 2 - 100, height / 2);
        return;
    } 
    else if (flagpole.isReached) {
        text("LEVEL COMPLETED", width / 2 - 100, height / 2);
        return;
    }
    
    if (gameChar_y > height) 
    {
        if (lives > 0) startGame()
    }

    if (isLeft && isFalling) {
        // add your jumping-left code

        fill(255, 0, 0);
        stroke(0, 0, 0);
        rect(gameChar_x - 9, gameChar_y - 49, 15, 28);
        ellipse(gameChar_x + 1, gameChar_y - 55, 23, 38);
        //glass cover 
        fill(0, 0, 0);
        ellipse(gameChar_x - 2, gameChar_y - 58, 10, 19);
        fill(255, 255, 255);
        ellipse(gameChar_x - 4, gameChar_y - 59, 5, 5);
        //arms
        fill(255, 255, 0);
        rect(gameChar_x - 14, gameChar_y - 35, 11, 11);
        fill(0, 0, 255);
        rect(gameChar_x - 21, gameChar_y - 34, 7, 7);

        //legs
        fill(255, 255, 0);
        rect(gameChar_x - 10, gameChar_y - 21, 6, 11);
        rect(gameChar_x + 0, gameChar_y - 21, 6, 18);

    } else if (isRight && isFalling) {
        // add your jumping-right code

        fill(255, 0, 0);
        stroke(0, 0, 0);
        rect(gameChar_x - 9, gameChar_y - 49, 15, 28);
        ellipse(gameChar_x + 1, gameChar_y - 55, 23, 38);
        //glass cover 
        fill(0, 0, 0);
        ellipse(gameChar_x + 4, gameChar_y - 58, 10, 19);
        fill(255, 255, 255);
        ellipse(gameChar_x + 6, gameChar_y - 59, 5, 5);
        //arms
        fill(255, 255, 0);
        rect(gameChar_x + 3, gameChar_y - 35, 11, 11);
        fill(0, 0, 255);
        rect(gameChar_x + 14, gameChar_y - 34, 7, 7);

        //legs
        fill(255, 255, 0);
        rect(gameChar_x + 2, gameChar_y - 21, 6, 11);
        rect(gameChar_x - 9, gameChar_y - 21, 6, 18);
    } else if (isLeft) {
        // add your walking left code

        fill(255, 0, 0);
        stroke(0, 0, 0);
        rect(gameChar_x - 9, gameChar_y - 49, 15, 28);
        ellipse(gameChar_x + 1, gameChar_y - 55, 23, 38);
        //glass cover 
        fill(0, 0, 0);
        ellipse(gameChar_x - 2, gameChar_y - 58, 10, 19);
        fill(255, 255, 255);
        ellipse(gameChar_x - 4, gameChar_y - 59, 5, 5);
        //arms
        fill(255, 255, 0);
        rect(gameChar_x - 14, gameChar_y - 35, 11, 11);

        //legs
        fill(255, 255, 0);
        rect(gameChar_x - 7, gameChar_y - 21, 11, 18);
        fill(0, 0, 0);
        rect(gameChar_x - 11, gameChar_y - 9, 15, 6);
    } else if (isRight) {
        // add your walking right code

        fill(255, 0, 0);
        stroke(0, 0, 0);
        rect(gameChar_x - 9, gameChar_y - 49, 15, 28);
        ellipse(gameChar_x + 1, gameChar_y - 55, 23, 38);
        //glass cover 
        fill(0, 0, 0);
        ellipse(gameChar_x + 4, gameChar_y - 58, 10, 19);
        fill(255, 255, 255);
        ellipse(gameChar_x + 6, gameChar_y - 59, 5, 5);
        //arms
        fill(255, 255, 0);
        rect(gameChar_x + 3, gameChar_y - 35, 11, 11);
        fill(0, 0, 255);
        rect(gameChar_x + 14, gameChar_y - 34, 7, 7);

        //legs
        fill(255, 255, 0);
        rect(gameChar_x - 7, gameChar_y - 21, 11, 18);
        fill(0, 0, 0);
        rect(gameChar_x - 7, gameChar_y - 9, 15, 6);
    } else if (isFalling || isPlummeting) {
        // add your jumping facing forwards code

        fill(255, 0, 0);
        stroke(0, 0, 0);
        rect(gameChar_x - 14, gameChar_y - 49, 30, 28);
        ellipse(gameChar_x + 1, gameChar_y - 55, 38, 38);
        //glass cover 
        fill(0, 0, 0);
        ellipse(gameChar_x + 0, gameChar_y - 58, 31, 15);
        fill(256, 256, 256);
        ellipse(gameChar_x - 1, gameChar_y - 61, 5, 5);
        //arms
        fill(255, 255, 0);
        rect(gameChar_x + 10, gameChar_y - 35, 11, 11);
        fill(255, 255, 0);
        rect(gameChar_x - 20, gameChar_y - 35, 11, 11);
        fill(0, 0, 255);
        rect(gameChar_x + 12, gameChar_y - 35, 11, -7);
        rect(gameChar_x - 22, gameChar_y - 35, 11, -7);
        //legs
        fill(255, 255, 0);
        rect(gameChar_x - 11, gameChar_y - 21, 8, 11);
        rect(gameChar_x + 3, gameChar_y - 21, 8, 18);
    } else {
        // add your standing front facing code

        fill(255, 0, 0);
        stroke(0, 0, 0);
        rect(gameChar_x - 15, gameChar_y - 49, 30, 28);
        ellipse(gameChar_x + 0, gameChar_y - 55, 38, 38);
        //glasss cover
        fill(0, 0, 0);
        ellipse(gameChar_x - 1, gameChar_y - 58, 31, 15);
        fill(256, 256, 256);
        ellipse(gameChar_x - 1, gameChar_y - 58, 5, 5);
        //arms
        fill(255, 255, 0);
        rect(gameChar_x + 10, gameChar_y - 35, 11, 11);
        fill(255, 255, 0);
        rect(gameChar_x - 20, gameChar_y - 35, 11, 11);
        //hands
        fill(255, 255, 0);
        //ellipse(gameChar_x -20,gameChar_y +60, 5,5)
        //legs
        fill(255, 255, 0);
        rect(gameChar_x - 10, gameChar_y - 21, 10, 16);
        rect(gameChar_x + 2, gameChar_y - 21, 10, 16);
        fill(0, 0, 0);
        rect(gameChar_x - 15, gameChar_y - 10, 15, 6);
        rect(gameChar_x + 2, gameChar_y - 10, 15, 6);
    }


}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

function drawClouds() {

    for (var i = 0; i < clouds.length; i++) {

        fill(256, 256, 256, 200);
        ellipse(clouds[i].x_pos + 150, clouds[i].y_pos + 186, clouds[i].width + 39, 90);
        ellipse(clouds[i].x_pos + 60, clouds[i].y_pos + 140, clouds[i].width - 90, 200);

        ellipse(clouds[i].x_pos + 103, clouds[i].y_pos + 205, clouds[i].width - 99, 100);

    }
}

// Function to draw mountains objects.

function drawMountains() {
    for (var p = 0; p < mountains.length; p++) {


        fill(0, 0, 255, 90);
        triangle(mountains[p].x_pos + 400, floorPos_y, mountains[p].x_pos + 50, floorPos_y - 350, mountains[p].x_pos - 300, floorPos_y);

        fill(101, 33, 67);
        triangle(mountains[p].x_pos + 600, floorPos_y, mountains[p].x_pos + 100, floorPos_y - 200, mountains[p].x_pos - 300, floorPos_y);

    }
}

// Function to draw trees objects.

function drawTrees() 
{
    for (var i = 0; i < trees_x.length; i++) {
        stroke(209, 142, 74);
        strokeWeight(2);

        fill(0, 0, 0);
        ellipse(trees_x[i] - 213, 458, 60, 15);

        fill(0, 126, 0);
        ellipse(trees_x[i] - 213, 299, 130, 120);
        fill(0, 151, 0);
        ellipse(trees_x[i] - 213, 220, 100, 90);
        fill(0, 177, 0)
        ellipse(trees_x[i] - 213, 160, 74, 64);
    }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon) {
    {
        fill(101, 33, 67)
        noStroke();
        rect(t_canyon.canyonPos_x, t_canyon.canyonPos_y, t_canyon.width, t_canyon.height)
    }

}

// Function to check character is over a canyon.

function checkCanyon(t_canyon) {

    if (gameChar_world_x > t_canyon.canyonPos_x && gameChar_world_x < t_canyon.canyonPos_x + t_canyon.width && gameChar_y == floorPos_y) {
        isPlummeting = true;
        fallsounds.play();
    }

}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable) {

    stroke(0)
    fill(255, 255, 0);
    rect(t_collectable.x_pos - 10, t_collectable.y_pos - 100, t_collectable.width, t_collectable.height);
    noStroke()
    fill(0, 0, 0);
    textSize(50);
    text("?", t_collectable.x_pos, t_collectable.y_pos - 100, t_collectable.width, t_collectable.height);

}


// Function to check character has collected an item.

function checkCollectable(t_collectable) {

    if (dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.width)

    {
        t_collectable.isFound = true;
        game_score += 1;
    }
   

}

function renderFlagpole() {
    push();
    stroke(0, 0, 255);
    strokeWeight(5);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 400);
    pop();
    if (flagpole.isReached) {
        noStroke();
        fill(0, 255, 0);
        rect(flagpole.x_pos, floorPos_y - 350, 50, 40);
    }
    else 
    {
        noStroke();
        fill(0, 255, 0);
        rect(flagpole.x_pos, floorPos_y - 50, 50, 40);
    }

}

function checkFlagpole() {
    var d = abs(gameChar_world_x - flagpole.x_pos);
    if (d <= 50) {
        flagpole.isReached = true;
    }
}
