$(document).ready(function() {

  $('button').click(function(ev) {
    ev.preventDefault();
    var rotarPlano = $('#rotarPlano').val();
    var valorF = $('#valorF').val();
    var valorK = $('#valorK').val();

    console.log('rotarPlano ' + rotarPlano);
    console.log('valorF ' + valorF);
    console.log('valorK ' + valorK);    
    
    drawCanvas(rotarPlano, valorF,valorK)
  });
  
});

var drawCanvas = function(rotarPlano, anguloF, anguloK) {

  console.log('drawCanvas')

  var c = document.querySelector("canvas");

  // Setting de width and height of the canvas
  var mainMeasure = window.innerWidth;

  c.width = mainMeasure;
  c.height = mainMeasure;

  var ctx = c.getContext("2d");

  
  ctx.translate(mainMeasure/2,mainMeasure/2);
  
  ctx.rotate(rotarPlano*Math.PI/180);
  // Excersise variables

  var initAngle = 0,
      linesWidth = 4,
      lineAC,
      lineFD,
      lineBE, // línea secante de AC y FD
      fontSizeVariables,
      arcsRadius = mainMeasure/7;

  fontSizeVariables = mainMeasure/25;


  ctx.rotate(-90*Math.PI/180);
/*
  var xAxis =  new Path2D();
  ctx.beginPath(xAxis);
  xAxis.moveTo(-mainMeasure/2,0);
  xAxis.lineTo(mainMeasure/2,0);
  ctx.strokeStyle = "black";
  ctx.closePath(xAxis);

  ctx.stroke(xAxis);

  var yAxis =  new Path2D();
  ctx.beginPath(yAxis);
  yAxis.moveTo(0,-mainMeasure);
  yAxis.lineTo(0,mainMeasure);
  ctx.strokeStyle = "black";
  ctx.closePath(yAxis);

  ctx.stroke(yAxis);
*/

  
  mainLine = new Path2D();
  ctx.beginPath(mainLine);
  ctx.lineWidth = linesWidth;
  mainLine.moveTo(mainMeasure,0);
  mainLine.lineTo(-mainMeasure,0);
  // mainLine.rect(mainMeasure/4,0,5,5);
  // mainLine.rect(-mainMeasure/4,0,5,5);
  ctx.strokeStyle = "green";
  ctx.closePath(mainLine);
  
  ctx.stroke(mainLine);
  
  ctx.save();

  ctx.translate(mainMeasure/4,0);
  ctx.rotate((anguloF)*Math.PI/180);
  
  line1 = new Path2D(mainLine);
  ctx.beginPath(line1);
  ctx.strokeStyle = "blue";
  ctx.closePath(line1);
  
  ctx.stroke(line1);

  // nombreAnguloF y nombreAnguloH Begin
  ctx.rotate(-rotarPlano*Math.PI/180);
  ctx.rotate(90*Math.PI/180);
  ctx.rotate((-anguloF)*Math.PI/180);

  ctx.font = fontSizeVariables + "px Arial"
  ctx.fillText("F",5,-20)
  ctx.fillText("H",10,10)
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.rotate(-90*Math.PI/180);
  ctx.rotate(rotarPlano*Math.PI/180);
  // nombreAnguloF y nombreAnguloH End

  // line1 arcs
  var line1Arc1 = new Path2D();
  ctx.beginPath(line1Arc1);
  line1Arc1.arc(0,0,arcsRadius,0,anguloF*Math.PI/180);
  ctx.strokeStyle = "green";
  ctx.closePath(line1Arc1);
  ctx.stroke(line1Arc1);

  var line1Arc2 = new Path2D();
  ctx.beginPath(line1Arc2);
  line1Arc2.arc(0,0,arcsRadius,anguloF*Math.PI/180,(180)*Math.PI/180);
  ctx.strokeStyle = "blue";
  ctx.closePath(line1Arc2);
  ctx.stroke(line1Arc2);

  ctx.restore();

  ctx.translate(-mainMeasure/4,0);
  ctx.rotate((anguloK)*Math.PI/180);
  
  line2 = new Path2D(mainLine);
  ctx.beginPath(line2);
  ctx.strokeStyle = "red";
  ctx.closePath(line2);
  ctx.stroke(line2);

  // nombreAnguloK y nombreAnguloJ Begin
  ctx.rotate(-rotarPlano*Math.PI/180);
  ctx.rotate(90*Math.PI/180);
  ctx.rotate(-(anguloK)*Math.PI/180);

  ctx.font = fontSizeVariables + "px Arial"
  ctx.fillText("K",-15,20)
  ctx.fillText("J",10,10)
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.rotate(-90*Math.PI/180);
  ctx.rotate(rotarPlano*Math.PI/180);
  // nombreAnguloK y nombreAnguloJ End

 
  // line2 arcs
  var line2Arc1 = new Path2D();
  ctx.beginPath(line2Arc1);
  line2Arc1.arc(0,0,arcsRadius,0,(anguloK)*Math.PI/180);
  ctx.strokeStyle = "red";
  ctx.closePath(line2Arc1);
  ctx.stroke(line2Arc1);

  var line2Arc2 = new Path2D();
  ctx.beginPath(line2Arc2);
  line2Arc2.arc(0,0,arcsRadius,180*Math.PI/180,(anguloK)*Math.PI/180+180*Math.PI/180);
  ctx.strokeStyle = "red";
  ctx.closePath(line2Arc2);
  ctx.stroke(line2Arc2);

  ctx.restore();

  // nomenclatura de los ángulos

}
