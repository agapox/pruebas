$(document).ready(function() {

  $('button').click(function(ev) {
    ev.preventDefault();
    var rotarPlano = $('#rotarPlano').val();
    var valorP = $('#valorP').val();
    var valorL = $('#valorL').val();
    var colorRectas = $('#colorRectas').val();
    var colorArcos = $('#colorArc').val();

    console.log('Captura de Datos =============');
    console.log('rotarPlano = ' + rotarPlano);
    console.log('valorP = ' + valorP);
    console.log('valorL = ' + valorL);
    console.log('Color Recta = ' + colorRectas);
    console.log('Color Arcos = ' + colorArcos);
    
    drawCanvas(rotarPlano, valorP, valorL, colorRectas, colorArcos)
  });
  
});

var drawCanvas = function(rotarPlano, anguloP, anguloL, colorRectas, colorArcos) {

  // Los Angulos L + T >= 100
  // Angulo L y T [10°,80°]
  // Angulo T = Angulo P - Angulo L
  // Angulo p [100,170]
  // Angulo Q [180°]
  // Angulo de rotacion debe estar entre -30° hasta +30°
  // Angulo L y T deben estar entre 30° y 70° para la buena diagramación del ejercicio
  // Angulo T siempres es 180°

  var anguloQ = 180;

  anguloP = parseInt(anguloP);
  anguloL = parseInt(anguloL);
  anguloT = anguloP - anguloL;
  
  console.log('funcion drawCanvas() ==============')
  console.log('rotarPlano = ' + rotarPlano);
  console.log('valorP = ' + anguloP);
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

  // ArcL
  ctx.beginPath();
  ctx.arc(0,0,arcsRadius,(90-anguloL)*Math.PI/180,(90)*Math.PI/180,false)
  ctx.stroke();
  ctx.closePath();
  
  // ArcP
  ctx.beginPath();
  ctx.arc(0,0,arcsRadius*1.2,(90-(anguloP))*Math.PI/180,(90)*Math.PI/180,false)
  ctx.stroke();
  ctx.closePath();

  // ArcQ
  ctx.beginPath();
  ctx.arc(0,0,arcsRadius*1.4,(90-anguloL-anguloQ)*Math.PI/180,(90-anguloL)*Math.PI/180,false)
  ctx.stroke();
  ctx.closePath();
  
  // ArcT
  ctx.beginPath();
  ctx.arc(0,0,arcsRadius*0.9,(90-anguloL-anguloQ-anguloT)*Math.PI/180,(90-anguloL-anguloQ)*Math.PI/180,false)
  ctx.stroke();
  ctx.closePath();
  
  
  
  
  ctx.rotate(-rotarPlano*Math.PI/180);
  ctx.rotate(90*Math.PI/180);
  
  var ctxNomArc = c.getContext("2d");
  
  ctxNomArc.rotate(rotarPlano*Math.PI/180);
  
  ctxNomArc.save();
  
  
  // ArcT nomenclatura
  
  if (rotarPlano >= 0 && rotarPlano < 60 || rotarPlano >= 340 && rotarPlano <= 360 ) {
    ctxNomArc.translate(-mainMeasure/12+mainMeasure/15*anguloL/100+mainMeasure/35*anguloP/100,mainMeasure/8-mainMeasure/35*anguloL/100);
  } else if (rotarPlano >= 60 && rotarPlano < 210) {
    ctxNomArc.translate(-mainMeasure/15+mainMeasure/15*anguloL/100+mainMeasure/35*anguloP/100,mainMeasure/10-mainMeasure/35*anguloL/100);
  } else if (rotarPlano >= 210 && rotarPlano < 260) {
    ctxNomArc.translate(-mainMeasure/15+mainMeasure/20*anguloL/100+mainMeasure/35*anguloP/100,mainMeasure/25+mainMeasure/25*anguloL/100);
  } else {
    ctxNomArc.translate(-mainMeasure/12+mainMeasure/20*anguloL/100+mainMeasure/35*anguloP/100,mainMeasure/25+mainMeasure/25*anguloL/100);
  }
  
  ctxNomArc.rotate(-rotarPlano*Math.PI/180);
  ctxNomArc.beginPath();
  ctxNomArc.font = fontSizeVariables + 'px Arial';
  ctxNomArc.fillText("T",0,0)
  ctxNomArc.closePath();
  ctxNomArc.restore();
  
  ctxNomArc.save();
  
  // ArcL nomenclatura

  if (rotarPlano >= 0 && rotarPlano < 90) {
    ctxNomArc.translate(mainMeasure/12+mainMeasure/50*anguloL/100,-mainMeasure/90);
  } else if (rotarPlano >= 90 && rotarPlano < 150) {
    ctxNomArc.translate(mainMeasure/10+mainMeasure/50*anguloL/100,-mainMeasure/45-mainMeasure/65*anguloL/100);
  } else if (rotarPlano >= 150 && rotarPlano < 300) {
    ctxNomArc.translate(mainMeasure/10+mainMeasure/50*anguloL/100,-mainMeasure/35-mainMeasure/65*anguloL/100);
  } else {
    ctxNomArc.translate(mainMeasure/12,-mainMeasure/65-mainMeasure/65*anguloL/100);
  }
  ctxNomArc.rotate(-rotarPlano*Math.PI/180);
  ctxNomArc.beginPath();
  ctxNomArc.font = fontSizeVariables + 'px Arial';
  ctxNomArc.fillText("L",0,0)
  ctxNomArc.closePath();
  ctxNomArc.restore();
  
  ctxNomArc.save();
  
  // ArcQ nomenclatura
  if (rotarPlano >= 0 && rotarPlano < 180 || rotarPlano >= 330 && rotarPlano <= 360) {
    ctxNomArc.translate(-mainMeasure/7,mainMeasure/20);
  } else if (rotarPlano >= 180 && rotarPlano < 330) {
    ctxNomArc.translate(-mainMeasure/7,mainMeasure/40);
  }
  ctxNomArc.rotate(-rotarPlano*Math.PI/180);
  ctxNomArc.beginPath();
  ctxNomArc.font = fontSizeVariables + 'px Arial';
  ctxNomArc.fillText("Q",0,0)
  ctxNomArc.closePath();
  ctxNomArc.restore();
  
  ctxNomArc.save();
  
  // ArcP nomenclatura
  ctxNomArc.translate(0,-mainMeasure/8);
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
  
  // Line1 horizontal
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
  line2.moveTo(0,-mainMeasure/2);
  line2.lineTo(0,mainMeasure/2);
  ctx.closePath(line2);
  ctx.stroke(line2);
  
  ctx.rotate((-anguloP+anguloL)*Math.PI/180);
  
  // Line3
  var line3 =  new Path2D();
  ctx.beginPath(line3);
  line3.moveTo(0,mainMeasure/2);
  line3.lineTo(0,-mainMeasure/2);
  ctx.closePath(line3);
  ctx.stroke(line3);
  
  /*
  */
  // Líneas END


  
}
