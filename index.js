$(document).ready(function() {

  $('button').click(function(ev) {
    ev.preventDefault();
    var trpMinAnguloR1 = $('#trpMinAnguloR1').val();
    var trpMaxAnguloR1 = $('#trpMaxAnguloR1').val();
    var cantEjerci = $('#cantEjerci').val();

    console.log('trpMinAnguloR1 ' + trpMinAnguloR1);
    console.log('trpMaxAnguloR1 ' + trpMaxAnguloR1);
    console.log('cantEjerci ' + cantEjerci);

    listOptionsAns(trpMaxAnguloR1)

  });
  
});

function listOptionsAns(angulo) {
  drawCorrectAnsw(0, angulo,1);
  drawCorrectAnsw(0,180-angulo,2);
  drawCorrectAnsw(90,-angulo,3);
  drawCorrectAnsw(angulo,45,4);
};



function drawCorrectAnsw(givenAngle, questionAngle,optionAns) {

  var c = document.querySelector('#canvas-'+optionAns);

  // Setting de width and height of the canvas

  var myCanvasWidth = window.innerWidth; // $('#canvas-1-container').width();
  var myCanvasHeight = window.innerHeight;// $('#canvas-1-container').height();

  c.width = myCanvasWidth;
  c.height = myCanvasHeight;

  var centerWidth = myCanvasWidth/2;
  var centerHeight = myCanvasHeight/2;

  var ctx = c.getContext("2d");

  // Excersise variables

  var initAngle = 0,
      linesWidth = 4;

  var img = new Image();
  img.src = 'https://questions.learnosity.com/v2.113.0/images/protractor.png';

  ctx.translate(img.width/2-img.width*0.004,img.height-img.height*0.055);

  img.onload = function() {

    var imgTransportador = new Path2D();
    ctx.beginPath(imgTransportador);
    ctx.rotate(initAngle*Math.PI/180+givenAngle*Math.PI/180+questionAngle*Math.PI/180);
    ctx.translate(-img.width/2+img.width*0.002,-img.height+img.height*0.05);
    ctx.drawImage(img, 0, 0);
    ctx.closePath(imgTransportador);

  }

  // Gen of the initial line with 0°
  var initAngleLine = new Path2D();
  ctx.beginPath(initAngleLine);
  ctx.rotate(-initAngle*Math.PI/180);
  ctx.strokeStyle = "blue";
  ctx.lineWidth = linesWidth;
  initAngleLine.moveTo(0,0);
  initAngleLine.lineTo(img.width/2,0);
  //ctx.stroke(initAngleLine)
  ctx.closePath(initAngleLine);

  // Gen of the initial line
  var givenAngleLine = new Path2D(initAngleLine);
  ctx.beginPath(givenAngleLine);
  ctx.rotate(-givenAngle*Math.PI/180);
  ctx.strokeStyle = "red";
  ctx.stroke(givenAngleLine)
  ctx.closePath(givenAngleLine);
  
  var questionAngleLine = new Path2D(initAngleLine);
  ctx.beginPath(questionAngleLine);
  ctx.rotate(-questionAngle*Math.PI/180)
  ctx.strokeStyle = "green";
  ctx.stroke(questionAngleLine)
  ctx.closePath(questionAngleLine);

}