$(document).ready(function() {

  $('button').click(function(ev) {
    ev.preventDefault();
    var trpMinAnguloR1 = $('#trpMinAnguloR1').val();
    var trpMaxAnguloR1 = $('#trpMaxAnguloR1').val();
    var cantEjerci = $('#cantEjerci').val();

    console.log('trpMinAnguloR1 ' + trpMinAnguloR1);
    console.log('trpMaxAnguloR1 ' + trpMaxAnguloR1);
    console.log('cantEjerci ' + cantEjerci);    

    genRandIteration(trpMinAnguloR1,trpMaxAnguloR1,cantEjerci);
  });

  

});

// genRandIteration = generador de ejercicios al azar
var genRandIteration = function(minAngR1, maxAngR1, numEjer) {
  // minAngR1 = Mínimo valor de ángulo para la recta R1
  // maxAngR1 = Máximo valor de ángulo para la recta R1
  // numEjer = Cantidad de ejercicios a crear

  var valAngulos = [];

  for (i = 0; i < numEjer; i++) {
    valAngulos[i] = Math.floor(Math.random() * (maxAngR1 - minAngR1 + 1) + minAngR1);

    drawCanvas(0, valAngulos[i]);

  }

  console.log(valAngulos)

}

var drawCanvas = function(givenAngle, questionAngle) {

  console.log('drawCanvas')

  var c = document.querySelector("canvas");

  // Setting de width and height of the canvas
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  var centerWidth = window.innerWidth/2;
  var centerHeight = window.innerHeight/2;

  var ctx = c.getContext("2d");

  // Excersise variables

  var initAngle = 0,
      linesWidth = 5;

  var img = new Image();
  img.src = 'https://questions.learnosity.com/v2.113.0/images/protractor.png';

  ctx.translate(img.width/2-img.width*0.004,img.height-img.height*0.055)

  img.onload = function() {

    // Gen of the initial line with 0°
    var initAngleLine = new Path2D();
    ctx.beginPath(initAngleLine);
    ctx.rotate(-initAngle*Math.PI/180);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = linesWidth;
    initAngleLine.moveTo(0,0);
    initAngleLine.lineTo(img.width/2,0);
    ctx.stroke(initAngleLine)
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
    

    var imgTransportador = new Path2D();
    ctx.beginPath(imgTransportador);
    ctx.rotate(initAngle*Math.PI/180+givenAngle*Math.PI/180+questionAngle*Math.PI/180);
    ctx.translate(-img.width/2+img.width*0.004,-img.height+img.height*0.055)
    ctx.drawImage(img, 0, 0);
    ctx.closePath(imgTransportador);

  }

}
