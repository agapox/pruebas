$(document).ready(function() {

  $('button').click(function(ev) {
    ev.preventDefault();
    var rotarPlano = $('#rotarPlano').val();
    var valorF = $('#valorJ').val();

    console.log('rotarPlano ' + rotarPlano);
    console.log('valorJ ' + valorJ);
    
    drawCanvas(rotarPlano, valorJ)
  });
  
});

var drawCanvas = function(rotarPlano, anguloJ) {

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

  var linesWidth = 4,
      fontSizeVariables,
      arcsRadius = mainMeasure/7;

  fontSizeVariables = mainMeasure/25;


  ctx.rotate(-90*Math.PI/180);

  var xAxis =  new Path2D();
  ctx.beginPath(xAxis);
  ctx.lineWidth = linesWidth;
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

}
