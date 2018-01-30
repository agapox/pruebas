$(document).ready(function() {

  $('.la-clase').each(function(index,item) {
    rectaNumDec(item);
    $(window).resize(function() {
      rectaNumDec(item);
    })

  });
});

var rectaNumDec = (elPadre) => {
  let c = $('#oneLineTwoStrokes')[0];
  let ctx = c.getContext("2d");

  let anchoCanvas = $(elPadre).width()*0.95;
  let altoCanvas = $(elPadre).width() / 3;
  $('#oneLineTwoStrokes').width(anchoCanvas);
  $('#oneLineTwoStrokes').height(altoCanvas);

  c.width = anchoCanvas;
  c.height = altoCanvas;
  
  ctx.width = anchoCanvas;
  ctx.height = altoCanvas;  
  
  // centrando el canvas a la mitad del alto y ancho
  let centerW = anchoCanvas/2;
  let centerH = altoCanvas/4;
  ctx.translate(0,centerH);

  // Variables modificables desde los inputs
  let varObj = {
    puntoUnit: Math.floor(Math.random()*(10)),
    puntoDec: Math.floor(Math.random()*(9 - 1 + 1)) + 1,
    anchoCanvas: anchoCanvas,
    altoCanvas, altoCanvas,
    coordPrincipales: true, // determina si se grafican las coordenadas principales
    coordDecimales: true, // determina si se grafican las coordenadas decimales
    anchoLineaEjeX: altoCanvas/100, // Ancho de la línea del eje X
    anchoFlechas: anchoCanvas/150, // ancho de las flechas del eje
    largoFlechas: anchoCanvas/40, // largo de las flechas del eje
    anchoCoord: anchoCanvas/300, // ancho del indicador de las coordenadas
    numInicial: 0, // número inicial de la escala del ejercicio
    numFinal: 10, // número final de la escala del ejercicio
    // Decimales
    anchoCoordDec: anchoCanvas/600, // ancho del indicador de las coordenadas
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
  
  varObj.largoCoord = varObj.largoFlechas*1.8; // largo del indicador de las coordenadas
  varObj.ptoInicialEjeX = varObj.anchoCanvas*1/30; // Punto incial del eje
  varObj.ptoFinalEjeX = varObj.anchoCanvas - varObj.ptoInicialEjeX; // Punto Final del eje
  varObj.numDivisiones = varObj.numFinal - varObj.numInicial; // Número en el que dividirá el eje incluyendo las distancias de los extremos (por eso el "+2")
  // varObj.iniFinDist = varObj.ptoInicialEjeX + varObj.anchoCanvas*5/100; // La distancia desde el inicio de la lína al eje
  varObj.iniDist = varObj.ptoInicialEjeX + varObj.anchoCanvas*5/100; // La distancia desde el inicio de la lína al eje
  varObj.finDist = (varObj.ptoFinalEjeX - varObj.anchoCanvas*5/100); // La distancia desde el inicio de la lína al eje
  varObj.distanciDivisiones = (varObj.finDist - varObj.iniDist) / (varObj.numDivisiones); // distancia de las divisiones entre coordenadas
  varObj.numDivDec = varObj.numDivDec + 1;
  varObj.largoCoordDec = varObj.largoCoord * 0.5; // largo del indicador de las coordenadas
  //varObj.iniDist = varObj.ptoInicialEjeX + varObj.anchoCanvas*5/100; // La distancia desde el inicio de la lína al eje
  varObj.iniDistDec = varObj.iniDist + varObj.finDist / (varObj.numDivDec*varObj.numDivisiones); // La distancia desde el inicio del eje
  varObj.finDistDec = varObj.ptoInicialEjeX + varObj.anchoCanvas*5/100 + (varObj.ptoFinalEjeX - varObj.ptoInicialEjeX) / (varObj.numDivDec*varObj.numDivisiones); // La distancia desde el inicio del eje
  varObj.distanciDivDec = (varObj.finDist - varObj.iniDist) / (varObj.numDivDec*varObj.numDivisiones); // distancia de las divisiones entre entre coordenadas
  
  ctx.strokeStyle = '#E58433';

  let coordPrinciapl = dibEjePrincipal(varObj)
  
  function dibEjePrincipal(varObj) {
    // Flechas del eje
    flechasEjes(0, varObj.ptoInicialEjeX, varObj.ptoFinalEjeX, varObj.largoFlechas, varObj.anchoFlechas);
    // Eje X
    ejeX(0, varObj.anchoLineaEjeX, varObj.ptoInicialEjeX, varObj.ptoFinalEjeX);
    // Coordenadas Principales
    let coordPrincipal = generarCoord()
    // 2do Eje Decimales
    //dibEjeLupa(varObj);
    return coordPrincipal;
  }
  
  // Dibuja eje de la lupa
  function dibEjeLupa(varObj) {

    let centroVertical = varObj.altoCanvas/2;
    let anchoLineaEjeX = varObj.anchoLineaEjeX;
    let ptoInicial = varObj.ptoInicialEjeX*8;
    let ptoFinal = varObj.ptoFinalEjeX * 0.75;
    let largoFlechas = varObj.largoFlechas*0.8;
    let anchoFlechas = varObj.anchoFlechas*0.8;

    ejeX(centroVertical, anchoLineaEjeX, ptoInicial, ptoFinal);
    
    flechasEjes(centroVertical, ptoInicial, ptoFinal, largoFlechas*2, anchoFlechas*2)

    let ptosEjeLupa = generarMicroCoord(centroVertical, ptoInicial, ptoFinal, 1, 10, varObj.puntoDec);

    return {
      ptosEjeLupa
    }

  } // End dibEjeLupa()

  // Flechas del eje
  function flechasEjes(centroVertical, ptoInicial, ptoFinal, largoFlechas, anchoFlechas) {
    ctx.save();
    
    if (anchoFlechas != 0) {
      flecha(ptoInicial, centroVertical, 1, largoFlechas, anchoFlechas)
      ctx.restore();
      ctx.save();
      flecha(ptoFinal, centroVertical, -1, largoFlechas, anchoFlechas)
      ctx.restore();
      ctx.save();
    }
    ctx.restore();
    ctx.save();

    function flecha(centroHorizontal, centroVertical, orientacionFlecha, largoFlechas, anchoFlechas) {
      ctx.save();
      // Orientación flecha debe ser 1 o -1
      ctx.translate(centroHorizontal, centroVertical)
      let flecha = new Path2D();
      ctx.beginPath(flecha);
      ctx.lineWidth = anchoFlechas;
      ctx.lineCap = 'round'; // "miter", "bevel", "round"
      ctx.lineJoin = 'round'; // "miter", "bevel", "round"
      flecha.moveTo(orientacionFlecha*largoFlechas,largoFlechas*0.6);
      flecha.lineTo(0,0);
      flecha.lineTo(orientacionFlecha*largoFlechas,-largoFlechas*0.6);
      ctx.stroke(flecha);
      ctx.restore();
      ctx.save();
    }
  } // End flechasEjes()

  // Eje X
  function ejeX(centroVertical, anchoLineaEje, ptoIncial, ptoFinal) {
    let xAxis = new Path2D();
    ctx.beginPath(xAxis);
    ctx.lineWidth = varObj.anchoLineaEjeX;
    xAxis.moveTo(ptoIncial,centroVertical);
    xAxis.lineTo(ptoFinal,centroVertical);
    ctx.closePath(xAxis);
    ctx.stroke(xAxis);
  } // End ejeX()


  //generarMicroCoord(centroVertical, ptoInicial, ptoFinal, divUnit, divDec)
  function generarMicroCoord(centroVertical, ejePtoInicial, ejePtoFinal, divUnit, divDec, ptoDec) {
    let largoEje = ejePtoFinal - ejePtoInicial;
    let margenEje = largoEje*0.15;
    let ptoInicial = ejePtoInicial + margenEje;
    let ptoFinal = ejePtoFinal - margenEje;
    let largoEjeInt = ptoFinal - ptoInicial;
    let distDivUnit = largoEjeInt / divUnit;
    let distDivDec = largoEjeInt / divDec;
    if (varObj.coordPrincipales) {
      for (let i = 0; i <= divUnit; i++) {
        let iniXCoord = new Path2D();
        ctx.beginPath(iniXCoord);
        ctx.lineWidth = varObj.anchoCoord*1.4;
        iniXCoord.moveTo(ptoInicial + distDivUnit*[i],centroVertical+varObj.largoCoord*0.8);
        iniXCoord.lineTo(ptoInicial + distDivUnit*[i],centroVertical-varObj.largoCoord*0.8);
        ctx.closePath(iniXCoord);
        ctx.stroke(iniXCoord);
        coordNom()
        function coordNom () {
          ctx.save()
          ctx.font = varObj.largoCoord*0.7 +"px Arial";
          if (varObj.puntoUnit === 9 && i === divUnit) {
            ctx.fillText("1",((ptoInicial + distDivUnit*[i])*(0.94))+i*distDivUnit*0.1,centroVertical+varObj.largoCoord*1.5);
          } else {
            ctx.fillText("0," + Math.round(varObj.puntoUnit+(i),1),((ptoInicial + distDivUnit*[i])*(0.94))+i*distDivUnit*0.06,centroVertical+varObj.largoCoord*1.5);
          }
          ctx.restore();
          ctx.save()
        }
      }
      for (let i = 0; i <= divDec; i++) {
        let iniXCoord = new Path2D();
        ctx.beginPath(iniXCoord);
        ctx.lineWidth = varObj.anchoCoord*1.2;
        if (i === divDec/2) {
          iniXCoord.moveTo(ptoInicial + distDivDec*[i],centroVertical+varObj.largoCoord*0.6);
          iniXCoord.lineTo(ptoInicial + distDivDec*[i],centroVertical-varObj.largoCoord*0.6);
        } else {
          iniXCoord.moveTo(ptoInicial + distDivDec*[i],centroVertical+varObj.largoCoord*0.5);
          iniXCoord.lineTo(ptoInicial + distDivDec*[i],centroVertical-varObj.largoCoord*0.5);
        }
        ctx.closePath(iniXCoord);
        ctx.stroke(iniXCoord);
        if(i === ptoDec) {
          ctx.fillStyle = "#8B1013";
          ctx.arc(ptoInicial + distDivDec*[i],centroVertical,varObj.largoCoordDec/2,0,Math.PI*2);
          ctx.fill()
        }
      }
    }
    return {
      ejeLupaPtoIni: {
        x: ptoInicial,
        y: centroVertical-varObj.largoCoord
      }, 
      ejeLupaPtoFin: {
        x: ptoFinal,
        y: centroVertical-varObj.largoCoord
      }
    }
  }
  
  // Coordenadas Principales
  function generarCoord() {

    // Genera las coordenadas Unitarias
    if (varObj.coordPrincipales) {

      var coordEjePrincipal;
      for (let i = 0; i <= varObj.numDivisiones; i++) {

        coordNom()
        function coordNom () {
          ctx.save()
          ctx.font = varObj.largoCoord*0.6 +"px Arial";
          ctx.fillStyle = '#8B1013'
          if (i === 0) {
            ctx.fillText("0",varObj.iniDist - varObj.iniDist*0.15,varObj.largoCoord*1.2);
          } else if (i === varObj.numDivisiones){
            ctx.fillText("1",varObj.iniDist + varObj.distanciDivisiones*[i],varObj.largoCoord*1.2);
          }
          ctx.restore();
          ctx.save()
        }
        
        let iniXCoord = new Path2D();
        ctx.beginPath(iniXCoord);
        ctx.lineWidth = varObj.anchoCoord;
        iniXCoord.moveTo(varObj.iniDist + varObj.distanciDivisiones*[i],varObj.largoCoord/2);
        iniXCoord.lineTo(varObj.iniDist + varObj.distanciDivisiones*[i],-varObj.largoCoord/2);
        ctx.closePath(iniXCoord);
        ctx.stroke(iniXCoord);

        // Genera las coordenadas decimales
        if (varObj.coordDecimales && i != varObj.numDivisiones) {
          for (let j = 0; j < varObj.numDivDec-1; j++) {
            let iniXCoordDec = new Path2D();
            ctx.beginPath(iniXCoordDec);
            ctx.lineWidth = varObj.anchoCoordDec;
            if (j === (varObj.numDivDec-2)/2) {
              let largoDec = varObj.largoCoordDec/2*1.2;
              iniXCoordDec.moveTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],largoDec);
              iniXCoordDec.lineTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],-largoDec);
            } else {
              iniXCoordDec.moveTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],varObj.largoCoordDec/2);
              iniXCoordDec.lineTo(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],-varObj.largoCoordDec/2);
            } // End if (j === (varObj.numDivDec-2)/2)
            ctx.closePath(iniXCoordDec);
            ctx.stroke(iniXCoordDec);
            if (varObj.puntoUnit != '' && varObj.puntoUnit === i && varObj.puntoDec != '' && varObj.puntoDec === j+1) {
              ctx.fillStyle = "#8B1013";
              ctx.arc(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],0,varObj.largoCoordDec/4,0,Math.PI*2)
              ctx.fill()
              coordEjePrincipal = {
                coordEjePrinIn: {
                  x:varObj.iniDist + varObj.distanciDivisiones*[i],
                  y:varObj.largoCoord/2*1.2
                },
                coordEjePrinFin: {
                  x:varObj.iniDist + varObj.distanciDivisiones*[i+1],
                  y:varObj.largoCoord/2*1.2
                }
              }
            } else if (varObj.puntoUnit === 0 && varObj.puntoUnit === i && varObj.puntoDec != '' && varObj.puntoDec === j+1) {
              ctx.fillStyle = "#8B1013";
              ctx.arc(varObj.iniDistDec + varObj.distanciDivisiones*[i] + varObj.distanciDivDec*[j],0,varObj.largoCoordDec/4,0,Math.PI*2)
              ctx.fill()
              coordEjePrincipal = {
                coordEjePrinIn: {
                  x:varObj.iniDist,
                  y:varObj.largoCoord/2*1.2
                },
                coordEjePrinFin: {
                  x:varObj.iniDist + varObj.distanciDivisiones,
                  y:varObj.largoCoord/2*1.2
                }
              }

            } // End if (varObj.puntoUnit != '' && varObj.puntoUnit === i && varObj.puntoDec != '' && varObj.puntoDec === j+1)
          } // End for(){}
        } // End if (varObj.coordDecimales && i != varObj.numDivisiones)
      } // End for(){}
    } // End if (varObj.coordPrincipales)
    return coordEjePrincipal;
  } // End generarCoord()

  let puntosLupa = dibEjeLupa(varObj);

  let puntosCoordPrin = coordPrinciapl;

  //console.log(puntosCoordPrin.coordEjePrinIn)
  
  lineasRefLupa(varObj.puntoUnit, puntosLupa.ptosEjeLupa.ejeLupaPtoIni, puntosLupa.ptosEjeLupa.ejeLupaPtoFin, puntosCoordPrin.coordEjePrinIn, puntosCoordPrin.coordEjePrinFin);
  
  function lineasRefLupa( ptoInicial, ptoInicialLupa, ptoFinalLupa, ptoIniPrin, ptoFinPrin ) {
    ctx.strokeStyle = '#F2C93B'
    ctx.moveTo(ptoInicialLupa.x,ptoInicialLupa.y)
    ctx.lineTo(ptoIniPrin.x,ptoIniPrin.y)
    ctx.stroke()
    ctx.moveTo(ptoFinalLupa.x,ptoFinalLupa.y)
    ctx.lineTo(ptoFinPrin.x,ptoFinPrin.y)
    ctx.stroke()
  }
  // let img1 = new Image();
  // img1.src = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_3/OA_19/IE_04/Transportador180.svg';
  // img1.onload = function() { 
  //   ctx.drawImage(0,0)
  // }
} // End rectaNumDec()
