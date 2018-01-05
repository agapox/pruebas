$(document).ready(function() {

  $('button').click(function(ev) {
    ev.preventDefault();
    var valorF = $('#valorF').val();
    var valorH = $('#valorH').val();
    var valorK = $('#valorK').val();

    console.log('valorF ' + valorF);
    console.log('valorH ' + valorH);
    console.log('valorK ' + valorK);    
    
    drawCanvas(valorF,valorK)
  });
  
});

var drawCanvas = function(anguloF, anguloK) {

  console.log('drawCanvas')

  var c = document.querySelector("canvas");

  // Setting de width and height of the canvas
  var mainMeasure = window.innerWidth;

  c.width = mainMeasure;
  c.height = mainMeasure;

  var ctx = c.getContext("2d");

  // Excersise variables

  var initAngle = 0,
      linesWidth = 4,
      lineAC,
      lineFD,
      lineBE, // línea secante de AC y FD
      fontSizeVariables;

  fontSizeVariables = mainMeasure/30;
  ctx.translate(mainMeasure/2,mainMeasure/2);

  ctx.rotate(-45*Math.PI/180)
  
  lineDemoVert = new Path2D();
  ctx.beginPath(lineDemoVert);
  ctx.lineWidth = linesWidth;
  lineDemoVert.moveTo(0,-10000);
  lineDemoVert.lineTo(0,10000);
  ctx.closePath(lineDemoVert);

  lineDemoHor = new Path2D();
  ctx.beginPath(lineDemoHor);
  ctx.lineWidth = linesWidth;
  lineDemoHor.moveTo(-10000,0);
  lineDemoHor.lineTo(10000,0);
  ctx.closePath(lineDemoHor);
  
  ctx.save();

  var LineGreen = new Path2D(lineDemoHor);
  ctx.beginPath(LineGreen);
  ctx.strokeStyle = "green";
  ctx.stroke(LineGreen);
  ctx.closePath(LineGreen);

  ctx.translate(mainMeasure*0.7,0);

  ctx.rotate(-anguloF*Math.PI/180);
  
  var LineBlue = new Path2D(lineDemoHor);
  ctx.beginPath(LineBlue);
  ctx.strokeStyle = "blue";
  ctx.stroke(LineBlue);
  ctx.closePath(LineBlue);
  
}
