$(document).ready(function() {

  $('button').click(function(ev) {
    ev.preventDefault();
    var rotarPlano = $('#rotarPlano').val();
    var valorQ = $('#valorQ').val();
    var valorL = $('#valorL').val();
    var colorRectas = $('#colorRectas').val();
    var colorArcos = $('#colorArc').val();

    console.log('Captura de Datos =============');
    console.log('rotarPlano = ' + rotarPlano);
    console.log('valorQ = ' + valorQ);
    console.log('valorL = ' + valorL);
    console.log('Color Recta = ' + colorRectas);
    console.log('Color Arcos = ' + colorArcos);
    
    drawCanvas(rotarPlano, valorQ, valorL, colorRectas, colorArcos)
  });
  
});

var drawCanvas = function(rotarPlano, anguloT, anguloL, colorRectas, colorArcos) {

  // Angulo de rotacion debe estar entre -30° hasta +30°
  // Angulo Q y L deben estar entre 30° y 70° para la buena diagramación del ejercicio
  // Angulo T siempres es 180°

  var anguloQ = 180;

  anguloT = parseInt(anguloT);
  anguloL = parseInt(anguloL);
  
  console.log('funcion drawCanvas() ==============')
  console.log('rotarPlano = ' + rotarPlano);
  console.log('valorQ = ' + anguloQ);
  console.log('valorL = ' + anguloL);
  console.log('Color Recta = ' + colorRectas);
  console.log('Color Arcos = ' + colorArcos);

  var c = document.querySelector("canvas");

  // Setting de width and height of the canvas
  var mainMeasure = window.innerWidth;

  c.width = mainMeasure;
  c.height = mainMeasure;

  var ctx = c.getContext("2d");

  
  ctx.translate(mainMeasure/2,mainMeasure/2);
  
  ctx.rotate(rotarPlano*Math.PI/180);
  // Excersise variables

  var linesWidth = 3,
      fontSizeVariables,
      arcsRadius = mainMeasure/7;

  fontSizeVariables = mainMeasure/25;
  
  ctx.lineWidth = linesWidth;
  ctx.strokeStyle = colorRectas;

  ctx.rotate(-90*Math.PI/180);
  
  ctx.save();
  
  // Arcos BEGIN
  // Color de los Arcos
  ctx.strokeStyle = colorArcos;

  // ArcT
  ctx.beginPath();
  ctx.arc(0,0,arcsRadius*0.8,(180)*Math.PI/180,(180+anguloT)*Math.PI/180,false)
  ctx.stroke();
  ctx.closePath();

  // ArcL
  ctx.beginPath();
  ctx.arc(0,0,arcsRadius,(90-anguloL)*Math.PI/180,(90)*Math.PI/180,false)
  ctx.stroke();
  ctx.closePath();

  // ArcQ
  ctx.beginPath();
  ctx.arc(0,0,arcsRadius*1.4,(-90+anguloQ)*Math.PI/180,(90)*Math.PI/180,false)
  ctx.stroke();
  ctx.closePath();
  
  // ArcQ
  ctx.beginPath();
  ctx.arc(0,0,arcsRadius*1.2,(-90)*Math.PI/180,(-90+anguloQ)*Math.PI/180,false)
  ctx.stroke();
  ctx.closePath();

  /*

  ctx.rotate(-rotarPlano*Math.PI/180);
  ctx.rotate(90*Math.PI/180);

  var ctxNomArc = c.getContext("2d");

  ctxNomArc.rotate(rotarPlano*Math.PI/180);

  ctxNomArc.save();

  
  // ArcT nomenclatura
  ctxNomArc.translate(-mainMeasure/100,mainMeasure/15);
  ctxNomArc.rotate(-rotarPlano*Math.PI/180);
  ctxNomArc.beginPath();
  ctxNomArc.font = fontSizeVariables + 'px Arial';
  ctxNomArc.fillText("T",0,0)
  ctxNomArc.closePath();
  ctxNomArc.restore();

  ctxNomArc.save();
  
  // ArcL nomenclatura
  ctxNomArc.translate(mainMeasure/12+1*mainMeasure/15*anguloL/100,-mainMeasure/80-1*mainMeasure/50*anguloL/100);
  ctxNomArc.rotate(-rotarPlano*Math.PI/180);
  ctxNomArc.beginPath();
  ctxNomArc.font = fontSizeVariables + 'px Arial';
  ctxNomArc.fillText("L",0,0)
  ctxNomArc.closePath();
  ctxNomArc.restore();

  ctxNomArc.save();
  
  // ArcQ nomenclatura
  ctxNomArc.translate(-mainMeasure/11-1*mainMeasure/40*anguloQ/100,-mainMeasure/80-1*mainMeasure/50*anguloQ/100);
  ctxNomArc.rotate(-rotarPlano*Math.PI/180);
  ctxNomArc.beginPath();
  ctxNomArc.font = fontSizeVariables + 'px Arial';
  ctxNomArc.fillText("Q",0,0)
  ctxNomArc.closePath();
  ctxNomArc.restore();

  ctxNomArc.save();
  
  // ArcP nomenclatura
  ctxNomArc.translate(0,-mainMeasure/8-1*mainMeasure/50*anguloL/100);
  ctxNomArc.rotate(-rotarPlano*Math.PI/180);
  ctxNomArc.beginPath();
  ctxNomArc.font = fontSizeVariables + 'px Arial';
  ctxNomArc.fillText("P",0,0)
  ctxNomArc.closePath();
  ctxNomArc.restore();
  
  ctx.restore();

  // Arcos END

  // Líneas BEGIN

  ctx.strokeStyle = colorRectas;

  // Line1 Vertical
  var line1 =  new Path2D();
  ctx.beginPath(line1);
  line1.moveTo(0,-mainMeasure/2);
  line1.lineTo(0,mainMeasure/2);
  ctx.closePath(line1);
  ctx.stroke(line1);

  ctx.rotate(-anguloL*Math.PI/180);

  // Line2
  var line2 =  new Path2D();
  ctx.beginPath(line2);
  line2.moveTo(0,0);
  line2.lineTo(0,mainMeasure/2);
  ctx.closePath(line2);
  ctx.stroke(line2);

  ctx.rotate(anguloL*Math.PI/180);

  ctx.rotate(anguloQ*Math.PI/180);

  // Line3
  var line3 =  new Path2D();
  ctx.beginPath(line3);
  line3.moveTo(0,0);
  line3.lineTo(0,-mainMeasure/2);
  ctx.closePath(line3);
  ctx.stroke(line3);


  // Líneas END

*/

  
}
