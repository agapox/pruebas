$(document).ready(function() {
  rectaNumDec();
});

var rectaNumDec = () => {
  let c = $('#oneLineTwoStrokes')[0];
  let ctx = c.getContext("2d");

  let anchoCanvas = 800;
  let altoCanvas = 400;

  $('#oneLineTwoStrokes').width(anchoCanvas);
  $('#oneLineTwoStrokes').height(altoCanvas);

  c.width = anchoCanvas;
  c.height = altoCanvas;
  
  ctx.width = anchoCanvas;
  ctx.height = altoCanvas;  
  
  // centrando el canvas a la mitad del alto y ancho
  let anchoLineaEjeX = 4;
  let anchoFlechas = 5;
  var centerW = anchoCanvas/2;
  let centerH = altoCanvas/2;

  console.log(centerW)
  console.log(centerH)
  ctx.translate(1,centerH);

  let ptoInicialEjeX = anchoCanvas*10/100;
  let ptoFinalEjeX = anchoCanvas - anchoCanvas*10/100;


  // Eje X
  let xAxis = new Path2D();
  ctx.beginPath(xAxis);
  ctx.lineWidth = anchoLineaEjeX;
  xAxis.moveTo(ptoInicialEjeX,0);
  xAxis.lineTo(ptoFinalEjeX,0);
  xAxis.lineTo(ptoFinalEjeX-anchoLineaEjeX*4,anchoLineaEjeX*4);
  xAxis.lineTo(ptoFinalEjeX,0);
  xAxis.lineTo(ptoFinalEjeX-anchoLineaEjeX*4,-anchoLineaEjeX*4);
  ctx.closePath(xAxis);
  ctx.stroke(xAxis);

  /*
  // Flechas del eje
  let flechaIzq = new Path2D();
  ctx.beginPath(flechaIzq);
  ctx.lineWidth = anchoFlechas;
  flechaIzq.moveTo(ptoInicialEjeX,0);
  flechaIzq.lineTo(ptoInicialEjeX+anchoLineaEjeX*4,anchoLineaEjeX*4);
  flechaIzq.moveTo(ptoInicialEjeX,0);
  flechaIzq.lineTo(ptoInicialEjeX+anchoLineaEjeX*4,-anchoLineaEjeX*4);
  ctx.closePath(flechaIzq);
  ctx.stroke(flechaIzq);

  let flechaDer = new Path2D();
  ctx.beginPath(flechaDer);
  ctx.lineWidth = anchoFlechas;
  flechaDer.moveTo(ptoFinalEjeX,0);
  flechaDer.lineTo(ptoFinalEjeX-anchoLineaEjeX*4-3,anchoLineaEjeX*4);
  flechaDer.moveTo(ptoFinalEjeX,0);
  flechaDer.lineTo(ptoFinalEjeX-anchoLineaEjeX*4-3,-anchoLineaEjeX*4);
  ctx.closePath(flechaDer);
  ctx.stroke(flechaDer);

  // Eje inicial en X
  let ceroXAxis = new Path2D();
  ctx.beginPath(ceroXAxis);
  ctx.lineWidth = anchoLineaEjeX/2;
  ceroXAxis.moveTo(0,0);
  ceroXAxis.lineTo(anchoLineaEjeX*4,anchoLineaEjeX*4);
  ceroXAxis.moveTo(0,0);
  ceroXAxis.lineTo(anchoLineaEjeX*4,-anchoLineaEjeX*4);
  ctx.closePath(ceroXAxis);
  ctx.stroke(ceroXAxis);
  */
}
