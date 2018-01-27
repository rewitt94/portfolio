// create sub
var sub = document.getElementById('sub');
sub.style.bottom = '300px'
sub.style.left = '50px'


var flame = document.getElementById('flame');
flame.style.left = '-2000px';
flame.style.bottom = '50px'


// One
// all the booeans and numbers

var started = false;
var vector = {
  up: false,
  down: false,
  left: false,
  right: false
}
var facing = {
  right: true,
  left: false,
}
var turbo = false;
var dead = false;

// One.5
// The numbers
var hostileProb = 0.99;
var mineProb = 0.99;
var distanceTravelled = 0;


// Two
// next, the arrays
var firedRight = [];
var firedLeft = [];
var hostiles = [];
var mines = [];



// Three
// These are buttons within the HTML

function reload() {
  window.scrollTo(0,0);
  location.reload();
}

function play() {
  started = true;
  var instructions = document.getElementById('instructions');
  instructions.style.visibility = 'hidden';
}


// Four
// This is the bulk of the code
// let's define or functions that run on loop

function subMove() {
  if (turbo) {
    if (vector.up) {
       sub.style.bottom = parseInt(sub.style.bottom) + 5 + 'px';
    }
    if (vector.down) {
      sub.style.bottom = parseInt(sub.style.bottom) - 5 + 'px';
    }
    if (vector.left) {
      sub.style.left = parseInt(sub.style.left) - 5 + 'px';
    }
    if (vector.right) {
      sub.style.left = parseInt(sub.style.left) + 5 + 'px';
    }
    if (facing.left) {
      sub.style['-moz-transform'] = 'scaleX(-1)';
      sub.style['-o-transform'] = 'scaleX(-1)';
      sub.style['-webkit-transform'] = 'scaleX(-1)';
      sub.style.transform = 'scaleX(-1)';
      sub.style.filter = 'FlipH';
      sub.style['-ms-filter'] = 'FlipH';
    }
    if (facing.right) {
      sub.style['-moz-transform'] = 'none';
      sub.style['-o-transform'] = 'none';
      sub.style['-webkit-transform'] = 'none';
      sub.style.transform = 'none';
      sub.style.filter = 'none';
      sub.style['-ms-filter'] = 'none';
    }
  } else {
    if (vector.up) {
       sub.style.bottom = parseInt(sub.style.bottom) + 3 + 'px';
    }
    if (vector.down) {
      sub.style.bottom = parseInt(sub.style.bottom) - 3 + 'px';
    }
    if (vector.left) {
      sub.style.left = parseInt(sub.style.left) - 3 + 'px';
    }
    if (vector.right) {
      sub.style.left = parseInt(sub.style.left) + 3 + 'px';
    }
    if (facing.left) {
      sub.style['-moz-transform'] = 'scaleX(-1)';
      sub.style['-o-transform'] = 'scaleX(-1)';
      sub.style['-webkit-transform'] = 'scaleX(-1)';
      sub.style.transform = 'scaleX(-1)';
      sub.style.filter = 'FlipH';
      sub.style['-ms-filter'] = 'FlipH';
    }
    if (facing.right) {
      sub.style['-moz-transform'] = 'none';
      sub.style['-o-transform'] = 'none';
      sub.style['-webkit-transform'] = 'none';
      sub.style.transform = 'none';
      sub.style.filter = 'none';
      sub.style['-ms-filter'] = 'none';
    }
  }
}


function torpedoMove() {
  if (firedRight.length > 0) {
    for (i = 0; i < firedRight.length; i++) {
      firedRight[i].style.left = parseInt(firedRight[i].style.left) + 12 + 'px';
    }
  }
  if (firedLeft.length > 0) {
    for (i = 0; i < firedLeft.length; i++) {
      firedLeft[i].style.left = parseInt(firedLeft[i].style.left) - 12 + 'px';
    }
  }
}


function scroll() {
  if (turbo) {
    if ((Number(sub.style.left.slice(0,-2)) - window.pageXOffset) > window.innerWidth - 700) {
      window.scrollBy(5, 0);
    }
    if ((Number(sub.style.left.slice(0,-2)) - window.pageXOffset) < 500) {
      window.scrollBy(-5, 0);
    }
  } else {
    if ((Number(sub.style.left.slice(0,-2)) - window.pageXOffset) > window.innerWidth - 700) {
      window.scrollBy(3, 0);
    }
    if ((Number(sub.style.left.slice(0,-2)) - window.pageXOffset) < 500) {
      window.scrollBy(-3, 0);
    }
  }
}

function mineSpawn() {
  if (Math.random() > mineProb) {
    var mine = document.createElement("IMG");
    mine.setAttribute( "src", "http://www.clker.com/cliparts/c/e/7/c/1230571109126653456rg1024_cartoon_sea_mine.svg.med.png" );
    mine.setAttribute( "style", "position:absolute;width:60px" );
    mine.style.left = (Number(sub.style.left.slice(0,-2)) + 1.5 * window.innerWidth + 0.5 * window.innerWidth * Math.random()).toString() + 'px';
    mine.style.bottom = (((Math.random() * 0.95) + 0.01) * window.innerHeight).toString() + 'px';
    document.body.appendChild(mine);
    mines.push(mine);
  }
}

function mineCollision() {
  if (mines.length > 0) {
    for (i = 0; i < mines.length; i++) {
      horizontalHit = (Number(mines[i].style.left.slice(0,-2)) - 180< Number(sub.style.left.slice(0,-2)) && Number(mines[i].style.left.slice(0,-2)) + 30 > Number(sub.style.left.slice(0,-2)));
      verticalHit = (Number(mines[i].style.bottom.slice(0,-2)) - 80 < Number(sub.style.bottom.slice(0,-2)) && Number(mines[i].style.bottom.slice(0,-2)) + 45 > Number(sub.style.bottom.slice(0,-2)));
      if (verticalHit && horizontalHit) {
        dead = true;
        needRespawn = true;
        var detonated = mines.splice(i,1)[0];
        detonated.src = 'http://clipartix.com/wp-content/uploads/2016/06/Explosion-free-to-use-clip-art.png';
        detonated.setAttribute("class", "destroyed");
      }
    }
  }
}

function mineShoot() {
  // torpedo firedRight shoots mine
  if ((mines.length && firedRight.length > 0)) {
    for (i = 0; i < firedRight.length; i++) {
      for (j = 0; j < mines.length; j++) {
        horizontalHit = (Number(mines[j].style.left.slice(0,-2)) - 10 < Number(firedRight[i].style.left.slice(0,-2)) && Number(mines[j].style.left.slice(0,-2)) + 10 > Number(firedRight[i].style.left.slice(0,-2)));
        verticalHit = (Number(mines[j].style.bottom.slice(0,-2)) - 10 < Number(firedRight[i].style.bottom.slice(0,-2)) && Number(mines[j].style.bottom.slice(0,-2)) + 50 > Number(firedRight[i].style.bottom.slice(0,-2)));
        if (verticalHit && horizontalHit) {
          var detonated = mines.splice(j,1)[0];
          detonated.src = 'http://clipartix.com/wp-content/uploads/2016/06/Explosion-free-to-use-clip-art.png';
          detonated.setAttribute("class", "destroyed");
        }
      }
    }
  }
  // torpedo firedLeft shoots mine
  if ((mines.length && firedLeft.length > 0)) {
    for (i = 0; i < firedLeft.length; i++) {
      for (j = 0; j < mines.length; j++) {
        horizontalHit = (Number(mines[j].style.left.slice(0,-2)) - 10 < Number(firedLeft[i].style.left.slice(0,-2)) && Number(mines[j].style.left.slice(0,-2)) + 10 > Number(firedLeft[i].style.left.slice(0,-2)));
        verticalHit = (Number(mines[j].style.bottom.slice(0,-2)) - 10 < Number(firedLeft[i].style.bottom.slice(0,-2)) && Number(mines[j].style.bottom.slice(0,-2)) + 50 > Number(firedLeft[i].style.bottom.slice(0,-2)));
        if (verticalHit && horizontalHit) {
          var detonated = mines.splice(j,1)[0];
          detonated.src = 'http://clipartix.com/wp-content/uploads/2016/06/Explosion-free-to-use-clip-art.png';
          detonated.setAttribute("class", "destroyed");
        }
      }
    }
  }
}

function hostileSpawn() {
  if (Math.random() > hostileProb) {
    var switcher = Math.floor(Math.random() * 4);
    switch(switcher) {
      case 0:
        var hostile = document.createElement('IMG');
        hostile.src = "http://images.clipartpanda.com/missile-clipart-missile.png";
        hostile.style.width = '60px';
        hostile.style.position = 'absolute';
        var generalAngle = Math.atan((2 * window.innerHeight) / window.innerWidth);
        var hostileAngle = (Math.random()* generalAngle) + (Math.PI * 1.5 - generalAngle);
        hostile.id = hostileAngle.toString().slice(0,4);
        hostile.style.transform = 'rotate(' + hostileAngle.toString() + 'rad)';
        hostile.style.left = (window.pageXOffset + Math.random() * window.innerWidth * 0.5).toString() + 'px';
        hostile.style.bottom = (window.innerHeight - 50).toString() + 'px';
        document.body.appendChild(hostile);
        hostiles.push(hostile);
        setTimeout( () => hostiles.shift(), 6000);
        document.body.appendChild(hostile);
        setTimeout( () => hostile.remove(), 6000);
        break;
      case 1:
        var hostile = document.createElement('IMG');
        hostile.src = "http://images.clipartpanda.com/missile-clipart-missile.png";
        hostile.style.width = '60px';
        hostile.style.position = 'absolute';
        var generalAngle = Math.atan((2 * window.innerHeight) / window.innerWidth);
        var hostileAngle = (Math.random()* generalAngle) + Math.PI * 1.5;
        hostile.id = hostileAngle.toString().slice(0,4);
        hostile.style.transform = 'rotate(' + hostileAngle.toString() + 'rad)';
        hostile.style.left = (window.pageXOffset + window.innerWidth * 0.5 + Math.random() * window.innerWidth * 0.5).toString() + 'px';
        hostile.style.bottom = (window.innerHeight - 50).toString() + 'px';
        document.body.appendChild(hostile);
        hostiles.push(hostile);
        setTimeout( () => hostiles.shift(), 6000);
        document.body.appendChild(hostile);
        setTimeout( () => hostile.remove(), 6000);
        break;
      case 2:
        var hostile = document.createElement('IMG');
        hostile.src = "http://images.clipartpanda.com/missile-clipart-missile.png";
        hostile.style.width = '60px';
        hostile.style.position = 'absolute';
        var generalAngle = Math.atan((2 * window.innerHeight) / window.innerWidth);
        var hostileAngle = (Math.random()* generalAngle) + Math.PI * 0.5;
        hostile.id = hostileAngle.toString().slice(0,4);
        hostile.style.transform = 'rotate(' + hostileAngle.toString() + 'rad)';
        hostile.style.left = (window.pageXOffset + Math.random() * window.innerWidth * 0.5 - 70).toString() + 'px';
        hostile.style.bottom = '-50px';
        document.body.appendChild(hostile);
        hostiles.push(hostile);
        setTimeout( () => hostiles.shift(), 6000);
        document.body.appendChild(hostile);
        setTimeout( () => hostile.remove(), 6000);
        break;
      case 3:
        var hostile = document.createElement('IMG');
        hostile.src = "http://images.clipartpanda.com/missile-clipart-missile.png";
        hostile.style.width = '60px';
        hostile.style.position = 'absolute';
        var generalAngle = Math.atan((2 * window.innerHeight) / window.innerWidth);
        var hostileAngle = (Math.random()* generalAngle) + (0.5 * Math.PI - generalAngle);
        hostile.id = hostileAngle.toString().slice(0,4);
        hostile.style.transform = 'rotate(' + hostileAngle.toString() + 'rad)';
        hostile.style.left = (window.pageXOffset + window.innerWidth * 0.5 + Math.random() * window.innerWidth * 0.5 - 70).toString() + 'px';
        hostile.style.bottom = '-50px';
        document.body.appendChild(hostile);
        hostiles.push(hostile);
        setTimeout( () => hostiles.shift(), 6000);
        document.body.appendChild(hostile);
        setTimeout( () => hostile.remove(), 6000);
        break;
    }
  }
}


function hostileMove() {
  if(hostiles.length > 0) {
    for(i = 0; i < hostiles.length; i++) {
    hostiles[i].style.left = parseInt(hostiles[i].style.left) - (3 * Math.cos(Number(hostiles[i].id))) + 'px';
    hostiles[i].style.bottom = parseInt(hostiles[i].style.bottom) + (3 * Math.sin(Number(hostiles[i].id))) + 'px';
    }
  }
}

function hostileHit() {
  if(hostiles.length > 0) {
    for(i = 0; i < hostiles.length; i++) {
      var verticalHit = (Number(hostiles[i].style.bottom.slice(0,-2)) - 60 < Number(sub.style.bottom.slice(0,-2)) && Number(hostiles[i].style.bottom.slice(0,-2)) + 20 > Number(sub.style.bottom.slice(0,-2)));
      var horizontalHit = (Number(hostiles[i].style.left.slice(0,-2)) - 150 < Number(sub.style.left.slice(0,-2)) && Number(hostiles[i].style.left.slice(0,-2)) + 10 > Number(sub.style.left.slice(0,-2)));
      if (verticalHit && horizontalHit) {
        dead = true;
      }
    }
  }
}

function spawnProb() {
  mineProb = 0.99 - 0.000005 * distanceTravelled;
  hostileProb = 0.99 - 0.0000008 * distanceTravelled;
}

function score() {
  distanceTravelled = (Number(sub.style.left.slice(0,-2)) - 50)
  var score = document.getElementById('distance');
  score.innerHTML = (Number(sub.style.left.slice(0,-2)) - 50).toString()
}

function death() {
  if (dead) {
    vector.up = false;
    vector.down = false;
    vector.left = false;
    vector.right = false;
    sub.src = 'http://images.clipartpanda.com/explosion-clipart-explosion6.png';
    setTimeout( () => end(), 1000);
  }
}

function end() {
  var gameOver = document.getElementById('gameover');
  gameOver.style.visibility = 'visible';
  started = false;
  var endScore = document.getElementById('end_score');
  endScore.innerHTML = distanceTravelled;
}

// Five
// These are functions called on interval

function update() {
  if (started) {
    subMove();
    torpedoMove();
    scroll();
    mineSpawn();
    mineCollision();
    mineShoot();
    hostileSpawn();
    hostileMove();
    hostileHit();
    spawnProb();
    score();
    death();
  }
}



function sweep() {
  var removables = document.getElementsByClassName('destroyed')
  if (removables.length > 0) {
    for (x = 0; x < removables.length; x++) {
      removables[x].remove();
    }
  }
}

function mineSpawnScroll() {
  var mine = document.createElement("IMG");
  mine.setAttribute( "src", "http://www.clker.com/cliparts/c/e/7/c/1230571109126653456rg1024_cartoon_sea_mine.svg.med.png" );
  mine.setAttribute( "style", "position:absolute;width:60px" );
  mine.style.left = (Number(sub.style.left.slice(0,-2)) + 5 * window.innerWidth).toString() + 'px';
  mine.style.bottom = (((Math.random() * 0.95) + 0.01) * window.innerHeight).toString() + 'px';
  document.body.appendChild(mine);
  mines.push(mine);
}

// Six
// Call the intervals.


setInterval(update, 10);

setInterval(sweep, 1000);

setInterval(mineSpawnScroll, 1500);


// Seven
// Finally, the Event Listeners for the controls

const onDown = event => down(event.which)
const onUp = event => up(event.which)

document.addEventListener('keydown', onDown)
document.addEventListener('keyup', onUp)

function down(keycode) {
  // start movement with keydown
  if (dead == false) {
    if (keycode == 38) {
      vector.up = true
    }
    if (keycode == 40) {
      vector.down = true
    }
    if (keycode == 37) {
      vector.left = true;
      facing.left = true;
      facing.right = false;
      // flip submarine
    }
    if (keycode == 39) {
        vector.right = true;
        facing.right = true;
        facing.left = false;
        // unflip submarine
    }
    if (keycode == 90) {
      turbo = true;
    }
  }
}

function up(keycode) {
  // stop movement with keyup
  if (keycode == 38) {
    vector.up = false
  }
  if (keycode == 40) {
    vector.down = false
  }
  if (keycode == 37) {
    vector.left = false
  }
  if (keycode == 39) {
    vector.right = false
  }
  // spawn torpedo
  if (keycode == 32) {
    if (firedRight.length + firedLeft.length < 5  && dead == false) {
      started = true;
      var instructions = document.getElementById('instructions');
      instructions.style.visibility = 'hidden';
      var torpedo = document.createElement("IMG");
      torpedo.setAttribute( "src", "http://www.clker.com/cliparts/1/E/6/6/w/J/bomb-hi.png");
      torpedo.setAttribute( "style", "position:absolute;width:60px" );
      torpedo.style.bottom = sub.style.bottom;
      if (facing.right) {
        torpedo.style.left = (Number(sub.style.left.slice(0,-2)) + 90).toString() + 'px';
        firedRight.push(torpedo);
        setTimeout( () => firedRight.shift(), 2000);
        document.body.appendChild(torpedo);
        setTimeout( () => torpedo.remove(), 2000);
      }
      if (facing.left) {
        torpedo.style.left = (Number(sub.style.left.slice(0,-2)) + 58).toString() + 'px';
        torpedo.style['-moz-transform'] = 'scaleX(-1)';
        torpedo.style['-o-transform'] = 'scaleX(-1)';
        torpedo.style['-webkit-transform'] = 'scaleX(-1)';
        torpedo.style.transform = 'scaleX(-1)';
        torpedo.style.filter = 'FlipH';
        torpedo.style['-ms-filter'] = 'FlipH';
        firedLeft.push(torpedo)
        setTimeout( () => firedLeft.shift(), 2000)
        document.body.appendChild(torpedo);
        setTimeout( () => torpedo.remove(), 2000);
      }
    }
  }
  if (keycode == 90) {
    turbo = false;
  }
}
