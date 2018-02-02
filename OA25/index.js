// let datosAnimales = ['Hurón', 'Coneje', 'Gato', 'Perro'];
// let datosFrutas = ['Fruntilla', ];

$(document).ready(function() {

  $('#addDatosGraf').click(function() {
    let mainCont = $('#datos-graficos');
    state = {
      tipoGraf: Number.parseInt(mainCont.find('#datos-tipo-graf').val()),
      tituloGraf: mainCont.find('#datos-titulo-grafico').val(),
      tituloLeyendaH: mainCont.find('#datos-titulo-leyendaH').val(),
      tituloLeyendaV: mainCont.find('#datos-titulo-leyendaV').val(),
      datosEjeH: mainCont.find('#datos-data-ejeH').val().split(','),
      datosEjeY: mainCont.find('#datos-data-ejeY').val().split(','),
  
    }
    console.log(state)
  })
});