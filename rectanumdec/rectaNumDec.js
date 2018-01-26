$(document).ready(function() {

  $('.la-clase').each(function(index,item) {
    rectaNumDec(item);
  });
});

var rectaNumDec = (elPadre) => {
  let c = $('#oneLineTwoStrokes')[0];
  let ctx = c.getContext("2d");

  let anchoCanvas = 800;
  let altoCanvas = 200;

  $('#oneLineTwoStrokes').width(anchoCanvas);
  $('#oneLineTwoStrokes').height(altoCanvas);

  c.width = anchoCanvas;
  c.height = altoCanvas;
  
  ctx.width = anchoCanvas;
  ctx.height = altoCanvas;  
  
  // centrando el canvas a la mitad del alto y ancho
  let centerW = anchoCanvas/2;
  let centerH = altoCanvas/2;
  ctx.translate(0,centerH);

  // Variables modificables desde los inputs
  let varObj = {
    puntoUnit: 9,
    puntoDec: 9,
    anchoCanvas: anchoCanvas,
    altoCanvas, altoCanvas,
    coordPrincipales: true, // determina si se grafican las coordenadas principales
    coordDecimales: true, // determina si se grafican las coordenadas decimales
    anchoLineaEjeX: 4, // Ancho de la línea del eje X
    anchoFlechas: 5, // ancho de las flechas del eje
    largoFlechas: 18, // largo de las flechas del eje
    anchoCoord: 3, // ancho del indicador de las coordenadas
    numInicial: 0, // número inicial de la escala del ejercicio
    numFinal: 10, // número final de la escala del ejercicio
    // Decimales
    anchoCoordDec: 1, // ancho del indicador de las coordenadas
    numDivDec: 9, // Número en el que se dividirá el espacio entre coordenadas
    largoCoord: '',
    ptoInicialEjeX: '',
    ptoFinalEjeX: '',
    numDivisiones: '',
    iniFinDist: '',
    distanciDivisiones: '',
    largoCoordDec: '',
    iniFinDistDec: '',
    distanciDivDec: ''
  };

  varObj = eval(varObj);
  
  varObj.largoCoord = 25 + varObj.anchoLineaEjeX; // largo del indicador de las coordenadas
  varObj.ptoInicialEjeX = varObj.anchoCanvas*1/100; // Punto incial del eje
  varObj.ptoFinalEjeX = varObj.anchoCanvas - varObj.ptoInicialEjeX; // Punto Final del eje
  varObj.numDivisiones = varObj.numFinal - varObj.numInicial; // Número en el que dividirá el eje incluyendo las distancias de los extremos (por eso el "+2")
  // varObj.iniFinDist = varObj.ptoInicialEjeX + varObj.anchoCanvas*5/100; // La distancia desde el inicio de la lína al eje
  varObj.iniDist = varObj.ptoInicialEjeX + varObj.anchoCanvas*5/100; // La distancia desde el inicio de la lína al eje
  varObj.finDist = (varObj.ptoFinalEjeX - varObj.anchoCanvas*5/100); // La distancia desde el inicio de la lína al eje
  varObj.distanciDivisiones = (varObj.finDist - varObj.iniDist) / (varObj.numDivisiones); // distancia de las divisiones entre coordenadas
  varObj.numDivDec = varObj.numDivDec + 1;
  varObj.largoCoordDec = varObj.largoCoord*2/3; // largo del indicador de las coordenadas
  //varObj.iniDist = varObj.ptoInicialEjeX + varObj.anchoCanvas*5/100; // La distancia desde el inicio de la lína al eje
  varObj.iniDistDec = varObj.iniDist + varObj.finDist / (varObj.numDivDec*varObj.numDivisiones); // La distancia desde el inicio del eje
  varObj.finDistDec = varObj.ptoInicialEjeX + varObj.anchoCanvas*5/100 + (varObj.ptoFinalEjeX - varObj.ptoInicialEjeX) / (varObj.numDivDec*varObj.numDivisiones); // La distancia desde el inicio del eje
  varObj.distanciDivDec = (varObj.finDist - varObj.iniDist) / (varObj.numDivDec*varObj.numDivisiones); // distancia de las divisiones entre entre coordenadas

  // Flechas del eje
  if (varObj.anchoFlechas != 0) {
    let flechas = new Path2D();
    ctx.lineWidth = varObj.anchoFlechas;
    flechas.moveTo(varObj.ptoInicialEjeX+varObj.largoFlechas,varObj.largoFlechas);
    flechas.lineTo(varObj.ptoInicialEjeX,0);
    flechas.lineTo(varObj.ptoInicialEjeX+varObj.largoFlechas,-varObj.largoFlechas);
    flechas.moveTo(varObj.ptoFinalEjeX-varObj.largoFlechas,varObj.largoFlechas);
    flechas.lineTo(varObj.ptoFinalEjeX,0);
    flechas.lineTo(varObj.ptoFinalEjeX-varObj.largoFlechas,-varObj.largoFlechas);
    ctx.stroke(flechas);
  }
  // Eje X
  let xAxis = new Path2D();
  ctx.beginPath(xAxis);
  ctx.lineWidth = varObj.anchoLineaEjeX;
  xAxis.moveTo(varObj.ptoInicialEjeX,0);
  xAxis.lineTo(varObj.ptoFinalEjeX,0);
  ctx.closePath(xAxis);
  ctx.stroke(xAxis);
  
  // Coordenadas Principales
  generarCoord()
  
  function generarCoord() {
    // Genera las coordenadas Unitarias
    if (varObj.coordPrincipales) {
      for (let i = 0; i <= varObj.numDivisiones; i++) {
        let iniXCoord = new Path2D();
        ctx.beginPath(iniXCoord);
        ctx.lineWidth = varObj.anchoCoord;
        iniXCoord.moveTo(varObj.iniDist + varObj.distanciDivisiones*[i],0);
        iniXCoord.lineTo(varObj.iniDist + varObj.distanciDivisiones*[i],varObj.largoCoord/2);
        iniXCoord.moveTo(varObj.iniDist + varObj.distanciDivisiones*[i],0);
        iniXCoord.lineTo(varObj.iniDist + varObj.distanciDivisiones*[i],-varObj.largoCoord/2);
        ctx.closePath(iniXCoord);
        ctx.stroke(iniXCoord);
        // Genera las coordenadas decimales
        if (varObj.coordDecimales && i != varObj.numDivisiones) {
          for (let j = 0; j < varObj.numDivDec-1; j++) {
            if (varObj.puntoUnit != '' && varObj.puntoUnit === i && varObj.puntoDec != '' && varObj.puntoDec === j+1) {
              ctx.arc(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],0,5,0,1000)
              ctx.fill()
            
            }
            let iniXCoordDec = new Path2D();
            ctx.beginPath(iniXCoordDec);
            ctx.lineWidth = varObj.anchoCoordDec;
            if (j === (varObj.numDivDec-2)/2) {
              let largoDec = varObj.largoCoordDec/2*1.2;
              iniXCoordDec.moveTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],0);
              iniXCoordDec.lineTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],largoDec);
              iniXCoordDec.moveTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],0);
              iniXCoordDec.lineTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],-largoDec);
            } else {
              iniXCoordDec.moveTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],0);
              iniXCoordDec.lineTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],varObj.largoCoordDec/2);
              iniXCoordDec.moveTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],0);
              iniXCoordDec.lineTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],-varObj.largoCoordDec/2);
            }
            ctx.closePath(iniXCoordDec);
            ctx.stroke(iniXCoordDec);
          }
        }
      }
    }
  }
}
