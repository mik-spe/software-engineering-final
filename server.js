var myGamePiece;
var myGameTitle;
var myBackground;
var myObstacles = [];
var myScore;
var gamePaused;
var item = [];
var xr;
var yr;
var score = 0;
var message;
var max;
var scoreEnd = 1000;
var answer;

// Starting componets on the canvas, images and text
function startGame() 
{
    myGamePiece = new component(50, 50, "avatar_down.png", 10, 120, "image");
    myBackground = new component(480, 270, "winterBackground.png", 0, 0, "image");
    myGameTitle = new component("30px", "Lucida Sans Unicode", "#353b3d", 10, 40, "text");
    myGamePiece.gravity = 0.05;
    gamePaused = false;
    myScore = new component("20px", "Lucida Sans Unicode", "#353b3d", 350, 40, "text");
    }

function play()
{
    myGameArea.start();
}

// Set up the game area
var myGameArea = 
{
canvas : document.createElement("canvas"),
start : function() 
{
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) 
    {
        myGameArea.key = e.keyCode;
        e.preventDefault();
    })
    window.addEventListener('keyup', function (e) 
    {
        myGameArea.key = false;
        e.preventDefault();
    })
},
clear : function() 
{
    // Clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
},
stop : function() 
{
    // Stop canvas
    clearInterval(this.interval);
}
}

// Adding a new image or text
function component(width, height, color, x, y, type) 
{
this.type = type;
if (type == "image")
{
    this.image = new Image();
    this.image.arc = color;
}

this.width = width;
this.height = height;
this.speedX = 0;
this.speedY = 0;    
this.x = x;
this.y = y;
this.gravity = 0;
this.gravitySpeed = 0;

this.update = function() 
{
    ctx = myGameArea.context;

    if (type == "image") 
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } 
    else if (type == "text")
    {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
    else 
    {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

this.newPos = function() 
{
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
}

this.hitBottom = function() 
{
    var rockbottom = myGameArea.canvas.height - this.height;

    if (this.y > rockbottom) 
    {
        this.y = rockbottom;
        this.gravitySpeed = 0;
    }
}

// If player hits the item
this.hitWith = function(otherobj)
{
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var hit = true;
    var center = ((mytop + mybottom) / 2);
    var othercenter = ((othertop + otherbottom) / 2);

    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) 
    {
        hit = false;
    }
    if (center = othercenter)
    {
        return hit;
    }
    else
    {
        hit = false;
    }
}

// If the player crashes into an obstacle
this.crashWith = function(otherobj) 
{
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;

    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) 
    {
        crash = false;
    }
    else
    {
        alert("You hit a snow pillar. " + myScore.text + ". Select 'Close'/'OK' to restart.");
        document.location.reload();
        return crash;
    }
}
}

function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}

// Restart the game
function restart()
{
    document.location.href="";
}

// Stop the game
function pause()
{
if (!gamePaused)
{
    myGameArea = clearInterval(myGameArea);
    gamePaused = true;
}
else if (gamePaused)
{
    myGameArea = everyinterval(20);
    gamePaused = false;
}
}

// Updating canvas
function updateGameArea() 
{
myGamePiece.speedX = 0;
myGamePiece.speedY = 0; 
myGamePiece.image.src = "avatar_down.png";
myBackground.image.src = "winterBackground.png";

if (myGameArea.key && myGameArea.key == 37) 
{
    myGamePiece.image.src = "avatar_left.png";
    myGamePiece.speedX = -3; 
}
if (myGameArea.key && myGameArea.key == 39) 
{
    myGamePiece.image.src = "avatar_right.png";
    myGamePiece.speedX = 3; 
    score++;
    // If player reaches preset score
    if (score == scoreEnd)
    {
        myGameArea.stop();
        alert("Congrats! You have reached your goal at " + scoreEnd + " points.");
        document.location.reload();
    }
}
if (myGameArea.key && myGameArea.key == 38) 
{
    myGamePiece.image.src = "avatar_up.png";
    myGamePiece.speedY = -5; 
}
if (myGameArea.key && myGameArea.key == 40) 
{
    myGamePiece.image.src = "avatar_down.png";
    myGamePiece.speedY = 3; 
}

var x, height, gap, minHeight, maxHeight;

for (i = 0; i < myObstacles.length; i += 1) 
{
    if (myGamePiece.crashWith(myObstacles[i])) 
    {
        myGameArea.stop();
    } 
}

myGameArea.clear();

myGamePiece.newPos(); 
myGamePiece.update();

myBackground.newPos();    
myBackground.update();

myGameArea.frameNo += 1;

// Creating new obstacles and items to spawn randomly
if (myGameArea.frameNo == 1 || everyinterval(150)) 
{
    x = myGameArea.canvas.width;
    minHeight = 100;
    maxHeight = 250;

    height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    xr = Math.floor((Math.random() * 300) + 1);
    yr = Math.floor((Math.random() * 300) + 1);
    myObstacles.push(new component(20, x - height, "white", x, height));
    item.push(new component(10, 10, "orange", xr+300, yr));
}

for (i = 0; i < item.length; i += 1)
{
    // Randomly generate items
    item[i].x += -1;
    item[i].update();

    if (myGamePiece.hitWith(item[i]))
    {
        // Add to the score when the item block is hit
        score = score + 10;
        myScore.update();
    }
}

for (i = 0; i < myObstacles.length; i += 1) 
{
    myObstacles[i].x += -1;
    myObstacles[i].update();
}

myScore.text="SCORE: " + score;
myScore.update();
myGameTitle.text="Snowy Sweep";
myGameTitle.update();
myGamePiece.newPos();
myGamePiece.update();
}

function everyinterval(n) 
{
if ((myGameArea.frameNo / n) % 1 == 0) 
{
    return true;
}

return false;
}

function accelerate(n) 
{
    myGamePiece.gravity = n;
}

// The story message that will appear on "Story" button
function story()
{
    alert("You are wandering a frozen tundra, trying to find your way back. With nowhere else to go, you must take the dangerous path with many obstacles in your way. Dodge snow pillars and collect balls of warmth as you travel back home.");
}

// Option to preset the cutoff of how long to play on "Length" button
function length()
{
    scoreEnd = prompt("How long would you like to play?", scoreEnd);
    document.getElementById("msg").innerHTML = "You have entered to stop at " + scoreEnd + " points.";
}