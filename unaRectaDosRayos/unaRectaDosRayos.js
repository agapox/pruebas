$(document).ready(function() {

  $('button').click(function(ev) {
    ev.preventDefault();
    var rotarPlano = $('#rotarPlano').val();
    var valorJ = $('#valorJ').val();
    var colorRectas = $('#colorRectas').val();
    var colorArcos = $('#colorArc').val();
    var colorLetras = $('#colorLetras').val();

    console.log('rotarPlano = ' + rotarPlano);
    console.log('valorJ =' + valorJ);
    console.log('Color Recta = ' + colorRectas);
    console.log('Color Arcos = ' + colorArcos);
    
    unaRectaDosRayos(rotarPlano, valorJ,colorRectas, colorArcos)
  });
  
});

var unaRectaDosRayos = function(rotarPlano, anguloJ, colorRectas, colorArcos, colorLetras, anchoCanvas, altoCanvas) {
  console.log('drawCanvas');

  colorRectas === undefined ? colorRectas = '#00c7ca' : colorRectas;
  colorArcos === undefined ?  colorArcos = '#00c7ca' : colorRectas;
  colorLetras === undefined ? colorLetras = '#00c7ca' : colorRectas;

  var valorColorRectas = colorRectas;
  var valorColorArcos = colorArcos;
  var valorColorLetras = colorLetras;


  anguloJ = parseInt(anguloJ);
  
  console.log('colorRectas = ' + colorRectas);
  console.log('valorColorRectas = ' + valorColorRectas);
  console.log('colorArcos = ' + colorArcos);
  console.log('valorColorArcos = ' + valorColorArcos);
  console.log('colorLetras = ' + colorLetras);
  console.log('valorColorLetras = ' + valorColorLetras);
  
  
  var c = document.querySelector("#oneLineTwoStrokes");
  
  // Setting de width and height of the canvas

  var mainMeasure;

  if (anchoCanvas > altoCanvas) {
    mainMeasure = altoCanvas;
  } else if (anchoCanvas < altoCanvas) {
    mainMeasure = anchoCanvas;
  } else {
    mainMeasure = window.innerWidth;
  }
  
  c.width = mainMeasure;
  c.height = mainMeasure;
  
  var ctx = c.getContext("2d");
  
  
  ctx.translate(mainMeasure/2,mainMeasure/2);
  
  ctx.rotate(rotarPlano*Math.PI/180);
  // Excersise variables
  
  var linesWidth = 2,
      fontSizeVariables,
      arcsRadius;
  
  arcsRadius = mainMeasure/7;
  
  fontSizeVariables = mainMeasure/25;
  
  ctx.lineWidth = linesWidth;
  ctx.strokeStyle = valorColorRectas;
  
  ctx.rotate(-90*Math.PI/180);
  
  // Line1 horizontal
  var line1 =  new Path2D();
  ctx.beginPath(line1);
  line1.moveTo(-mainMeasure/2,0);
  line1.lineTo(mainMeasure/2,0);
  ctx.closePath(line1);
  ctx.stroke(line1);
  
  // Line2 vertical
  var line2 =  new Path2D();
  ctx.beginPath(line2);
  line2.moveTo(0,-mainMeasure);
  line2.lineTo(0,mainMeasure);
  ctx.closePath(line2);
  ctx.stroke(line2);
  
  ctx.strokeStyle = valorColorArcos;
  
  // Arco anguloJ
  var arcAnguloJ = new Path2D();
  ctx.beginPath(arcAnguloJ);
  arcAnguloJ.arc(0,0,mainMeasure/5,(90-anguloJ)*Math.PI/180,(90)*Math.PI/180,false)
  ctx.closePath(arcAnguloJ);
  ctx.stroke(arcAnguloJ);
  
  // Arco anguloK
  var arcAnguloK = new Path2D();
  ctx.beginPath(arcAnguloK);
  arcAnguloK.arc(0,0,mainMeasure/7,(270)*Math.PI/180,(90-anguloJ)*Math.PI/180,false)
  ctx.closePath(arcAnguloK);
  ctx.stroke(arcAnguloK);
  
  // Arco anguloF
  var arcAnguloF = new Path2D();
  ctx.beginPath(arcAnguloF);
  arcAnguloF.arc(0,0,mainMeasure/5,(180+(90-anguloJ))*Math.PI/180,(270)*Math.PI/180,false)
  ctx.closePath(arcAnguloF);
  ctx.stroke(arcAnguloF); 
  
  // Arco anguloH
  var arcAnguloH = new Path2D();
  ctx.beginPath(arcAnguloH);
  arcAnguloH.arc(0,0,mainMeasure/6,90*Math.PI/180,180*Math.PI/180,false)
  ctx.closePath(arcAnguloH);
  ctx.stroke(arcAnguloH);
  
  ctx.save();

  
  // nomenclatura anguloJ begin
  ctx.fillStyle = valorColorLetras;
  
  if (rotarPlano >= 0 && rotarPlano <= 90 ) {
  
      ctx.translate(10,mainMeasure/7);
  
  } else if (rotarPlano > 90 && rotarPlano <= 240 ) {
  
      ctx.translate(10+20*rotarPlano/100,mainMeasure/7);
  
  } else if (rotarPlano > 240 && rotarPlano <= 280 ) {
  
      ctx.translate(10+15*rotarPlano/100,mainMeasure/7);
  
  } else {
  
      ctx.translate(mainMeasure/90*(1+rotarPlano/100),mainMeasure/7,mainMeasure/7);
  
  }
  
  ctx.rotate(-rotarPlano*Math.PI/180);
  ctx.rotate(90*Math.PI/180);
  
  
  var nomAnguloJ = new Path2D();
  ctx.beginPath(nomAnguloJ);
  ctx.font = mainMeasure/18 + 'px Arial';
  ctx.fillText("J",0,0);
  ctx.closePath(nomAnguloJ);
  ctx.stroke(nomAnguloJ);
  
  ctx.restore();
  
  // nomenclatura anguloJ end
  
  ctx.save();
  
  // nomenclatura anguloK begin
  ctx.fillStyle = valorColorLetras;
  
  
  if (rotarPlano >= 0 && rotarPlano <= 90 ) {
      
      ctx.translate(10,-mainMeasure/12+10*rotarPlano/100);
  
  } else if (rotarPlano > 90 && rotarPlano <= 220 ) {
  
      ctx.translate(10+20*rotarPlano/100,-mainMeasure/12+20*rotarPlano/100);
  
  } else if (rotarPlano > 220 && rotarPlano <= 290 ) {
  
      ctx.translate(10+20*rotarPlano/100,-mainMeasure/12+5*rotarPlano/100);
  
  } else {
  
      ctx.translate(mainMeasure/12+rotarPlano/100,-mainMeasure/12+5*rotarPlano/100);
  
  }
  
  ctx.rotate(-rotarPlano*Math.PI/180);
  ctx.rotate(90*Math.PI/180);
  
  var nomAnguloJ = new Path2D();
  ctx.beginPath(nomAnguloJ);
  ctx.font = mainMeasure/18 + 'px Arial';
  ctx.fillText("K",0,0);
  ctx.closePath(nomAnguloJ);
  ctx.stroke(nomAnguloJ);
  
  ctx.restore();
  
  // nomenclatura anguloK End
  
  ctx.save();
  
  // nomenclatura anguloF begin
  ctx.fillStyle = valorColorLetras;
  
  if (rotarPlano >= 0 && rotarPlano <= 50 ) {
      
      ctx.translate(-mainMeasure/20-mainMeasure/20*rotarPlano/100,-mainMeasure/8-10*rotarPlano/100);
  
  } else if (rotarPlano > 50 && rotarPlano <= 110 ) {
  
      ctx.translate(-mainMeasure/20-mainMeasure/50*rotarPlano/100,-mainMeasure/6+20*rotarPlano/100);
  
  } else if (rotarPlano > 110 && rotarPlano <= 210 ) {
  
      ctx.translate(-mainMeasure/20+mainMeasure/50*rotarPlano/100,-mainMeasure/8+10*rotarPlano/100);
  
  } else if (rotarPlano > 210 && rotarPlano <= 280 ) {
  
      ctx.translate(-mainMeasure/20+mainMeasure/65*rotarPlano/100,-mainMeasure/8-10*rotarPlano/100);
  
  } else {
  
      ctx.translate(-mainMeasure/35-mainMeasure/200*rotarPlano/100,-mainMeasure/8-10*rotarPlano/100);
  
  }
  
  ctx.rotate(-rotarPlano*Math.PI/180);
  ctx.rotate(90*Math.PI/180);
  
  
  var nomAnguloF = new Path2D();
  ctx.beginPath(nomAnguloF);
  ctx.font = mainMeasure/18 + 'px Arial';
  ctx.fillText("F",0,0);
  ctx.closePath(nomAnguloF);
  ctx.stroke(nomAnguloF);
  
  ctx.restore();
  
  // nomenclatura anguloF End
  
  ctx.save();
  
  // nomenclatura anguloH begin
  ctx.fillStyle = valorColorLetras;
  
  if (rotarPlano >= 0 && rotarPlano <= 160 ) {
      
      ctx.translate(-mainMeasure/15-mainMeasure/40*rotarPlano/100,mainMeasure/30+mainMeasure/30*rotarPlano/100);
  
  } else if (rotarPlano > 160 && rotarPlano <= 200 ) {
  
      ctx.translate(-mainMeasure/20-mainMeasure/40*rotarPlano/100,mainMeasure/40+mainMeasure/40*rotarPlano/100);
  
  } else if (rotarPlano > 200 && rotarPlano <= 280 ) {
  
      ctx.translate(-mainMeasure/10+mainMeasure/40*rotarPlano/100,mainMeasure/40+mainMeasure/40*rotarPlano/100);
  
  } else {
  
      ctx.translate(-mainMeasure/7+mainMeasure/40*rotarPlano/100,+mainMeasure/7-mainMeasure/40*rotarPlano/100);
  
  }
  
  
  ctx.rotate(-rotarPlano*Math.PI/180);
  ctx.rotate(90*Math.PI/180);
  
  
  var nomAnguloH = new Path2D();
  ctx.beginPath(nomAnguloH);
  ctx.font = mainMeasure/18 + 'px Arial';
  ctx.fillText("H",0,0);
  ctx.closePath(nomAnguloH);
  ctx.stroke(nomAnguloH);
  
  ctx.restore();
  
  // nomenclatura anguloH End
  
  ctx.strokeStyle = colorRectas;
  
  var ctx2 = c.getContext("2d");

  ctx2.lineWidth = linesWidth;

  ctx2.strokeStyle = valorColorLetras;

  ctx2.rotate(-anguloJ*Math.PI/180);
  
  // Line3 diagonal con angulo
  var line3 =  new Path2D();
  ctx2.beginPath(line3);
  line3.moveTo(0,-mainMeasure);
  line3.lineTo(0,mainMeasure);
  ctx2.closePath(line3);
  ctx2.stroke(line3);
  
}
