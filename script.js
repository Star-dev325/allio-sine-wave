window.requestAnimationFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(f) {
    return setTimeout(f, 1000 / 60)
  };

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var startTime = new Date().getTime();

function getPath(height) {
  var width = canvas.width;
  var spacing = 0.08;
  var loopNum = 0;
  var pointList = [];
  var i = 0;
  for (i = 0; i < width / 2; i++) {
    pointList[loopNum] = [loopNum, Math.sin(loopNum * spacing) * (i * height) + 100];
    loopNum++;
  }
  for (i = width / 2; i > 0; i--) {
    pointList[loopNum] = [loopNum, Math.sin(loopNum * spacing) * (i * height) + 100];
    loopNum++;
  }
  return pointList;
}

function draw() {
  var currentTime = new Date().getTime();
  var runTime = currentTime - startTime;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(80, 100, 230)";
  var height = Math.sin(runTime * 0.008) * 0.2;
  var pointList = getPath(height);
  for (var i = 0; i < 500; i++) {
    if (i === 0) {
      ctx.moveTo(pointList[0][0], pointList[0][1]);
    } else {
      ctx.lineTo(pointList[i][0], pointList[i][1]);
    }
  }
  ctx.stroke();
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);