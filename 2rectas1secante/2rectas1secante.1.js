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
      linesWidth = 5,
      lineAC,
      lineFD,
      lineBE, // línea secante de AC y FD
      fontSizeVariables;

  fontSizeVariables = mainMeasure/24;

  lineDemo = new Path2D();
  ctx.beginPath(lineDemo);
  ctx.lineWidth = linesWidth;
  lineDemo.moveTo(-10000,0);
  lineDemo.lineTo(10000,0);
  ctx.closePath(lineDemo);
  ctx.translate(-mainMeasure*0.1,mainMeasure*0.2);

  
  lineAC = new Path2D(lineDemo);
  ctx.beginPath(lineAC);
  ctx.strokeStyle = "blue";
  ctx.translate(mainMeasure*0.9,0);
  lineAC.arc(0,0,mainMeasure/6,0,-anguloF*Math.PI/180,true);
  ctx.stroke(lineAC);
  ctx.font = fontSizeVariables + "px Arial";
  ctx.fillText("F",mainMeasure/11,-mainMeasure/55);
  ctx.closePath(lineAC);
  //ctx.stroke();

  lineFD = new Path2D(lineDemo);
  ctx.beginPath(lineFD);
  ctx.rotate(-anguloF*Math.PI/180);
  ctx.strokeStyle = "green";
  ctx.stroke(lineFD);
  ctx.translate(-mainMeasure*0.8,-mainMeasure*0.1);
  ctx.arc(0,0,mainMeasure/5,0,-(anguloK)*Math.PI/180,true);
  ctx.stroke();
  ctx.closePath(lineFD);
  
  lineBE = new Path2D(lineDemo);
  ctx.beginPath(lineBE);
  ctx.rotate(-anguloK*Math.PI/180);
  ctx.strokeStyle = "red";
  ctx.stroke(lineBE)
  ctx.closePath(lineBE);  
}
