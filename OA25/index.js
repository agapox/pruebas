// let datosAnimales = ['Hurón', 'Coneje', 'Gato', 'Perro'];
// let datosFrutas = ['Fruntilla', ];

$(document).ready(function() {
  
  $('#btnGenerarDatos').click(function() {
    let mainCont = $('.datos-r1');
    stateInit = {
      tipoGraf: Number.parseInt(mainCont.find('#datos-tipo-graf').val()),
      tituloGraf: mainCont.find('#datos-titulo-grafico').val(),
      tituloLeyendaH: mainCont.find('#datos-titulo-leyendaH').val(),
      tituloLeyendaV: mainCont.find('#datos-titulo-leyendaV').val(),
      datosEjeH: mainCont.find('#datos-data-ejeH').val().split(','),
      datosEjeY: mainCont.find('#datos-data-ejeY').val().split(','),
      anchoCanvas: Number.parseInt(mainCont.find('#datos-ancho').val()),
      altoCanvas: Number.parseInt(mainCont.find('#datos-alto').val()),
      bordeCanvas: Number.parseInt(mainCont.find('#datos-border-width').val()),
      bordeRadiusCanvas: Number.parseInt(mainCont.find('#datos-border-radius').val()),
      bgCanvas: mainCont.find('#datos-background').val(),
      colorEje: mainCont.find('#datos-axis').val(),
      colorTextos: mainCont.find('#datos-font').val(),
      colorGuia: mainCont.find('#datos-guias').val(),
      colorBorde: mainCont.find('#datos-color-bordes').val(),
      colorBarras: mainCont.find('#datos-color-barras').val().split(',')  
    }
    
    DatosX(stateInit);
    console.log(state)
  })
});

function DatosX(stateInit) { 

    let clase = $(".datos-r1").attr('class','text-center')  
    clase.each((index, item) => {
      $(item).find(".txtRef").remove();
      let id = $(item).attr("id").split('htmlDatos')[1]
        let datos = $("#htmlDatos"+id)     
        let state = {
            selection: stateInit.tipoGraf,
            tituloGraf: stateInit.tituloGraf,
            tituloLeyendaH: stateInit.tituloLeyendaH,
            tituloLeyendaV: stateInit.tituloLeyendaV,
            datosEjeH: stateInit.datosEjeH,
            datosEjeY: stateInit.datosEjeY,
            height: stateInit.altoCanvas,
            width: stateInit.anchoCanvas,
            cols:[10, 3, 8],
            background:'white', //datos.attr("fondo"),
            borderWidth: stateInit.bordeCanvas,
            borderColor: stateInit.bordeCanvas,
            borderRadius: stateInit.bordeRadiusCanvas,
            tituloPrincipal: datos.attr("tituloP")
          };
        let html = '<canvas id="canvas'+id+'" style="border:'+state.borderWidth+'px solid '+state.borderColor+'; border-radius:'+state.borderRadius+'px; margin: 0 auto; background: '+state.background+';"></canvas>';
        datos.append(html);
        
        let canvas = $("#canvas"+id)[0];
        generarCanvas(canvas, state);
    })
};

function generarCanvas(canvas, state) {

    canvas.width = state.width; canvas.height = state.height
    let ctx = canvas.getContext('2d'), margin = [90, 70], ancho = Math.min(Math.floor((state.width-220)/(3/2*state.cols.length)), 100)
    ctx.clearRect(0, 0, state.width, state.height)

    let size = 0, w = state.width - 2*(margin[0] + 10), h = state.height - 2*margin[1]
    for (let i = 0; i < state.cols.length; i++) {
        size = Math.max(size, state.cols[i])
    }

    ctx.beginPath()
    //Creacion de ejes
    ctx.moveTo(margin[0], margin[1] - 10)
    ctx.lineTo(margin[0], state.height - margin[1])
    ctx.lineTo(state.width - margin[0] + 20, state.height - margin[1])

    ctx.strokeStyle = 'gray'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    //Creacion de columnas
    for (let i = 0, x = margin[0] + 20 + (w/state.cols.length/2 - ancho/2); i < state.cols.length; i++, x += w/state.cols.length) 
    {
        let alto = h/size*state.cols[i] + margin[1]
        ctx.moveTo(x, state.height - margin[1])
        ctx.lineTo(x, state.height - alto)
        ctx.lineTo(x + ancho, state.height - alto)
        ctx.lineTo(x + ancho, state.height - margin[1])

        ctx.fillStyle = 'rgba(64, 0, 64, .7)'
        ctx.fillRect(x, state.height - alto, ancho, alto - margin[1]);
    }

    ctx.strokeStyle = 'rgba(64, 0, 64, .9)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    //Proyectar columnas
    ctx.font = "14px Larke Neue Thin"
    ctx.fillStyle = 'black'
    ctx.textAlign = "right"

    for (let i = 0, x = margin[0] + 20 + (w/state.cols.length/2 - ancho/2); i < state.cols.length; i++, x += w/state.cols.length) {

        let alto = h/size*state.cols[i] + 70
        ctx.moveTo(x + ancho, state.height - alto)
        ctx.lineTo(margin[0], state.height - alto)
        ctx.fillText(state.cols[i], margin[0] - 5, state.height - alto + 5)
    }

    ctx.strokeStyle = 'red'
    ctx.setLineDash([5, 1]);
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    //Insertar titulos
    ctx.font = Math.min(ancho*27/45, 14) + "px Larke Neue Thin"
    ctx.fillStyle = 'black'
    ctx.textAlign = "center"

    for (let i = 0, x = margin[0] + 20 + (w/state.cols.length/2); i < state.cols.length; i++, x += w/state.cols.length) {
        ctx.fillText(String.fromCharCode(65 + i), x, h + margin[0])
    }

    ctx.font = "20px Larke Neue Thin"
    ctx.fillText('Título', state.width/2, 42)

    ctx.font = "15px Larke Neue Thin"
    ctx.fillText('-- Eje X --', state.width/2, h + margin[0] + 30)

    ctx.rotate( 3*Math.PI/2 )
    ctx.fillText('-- Eje Y --', -state.height/2, margin[1] - 30)

    ctx.closePath()
}