DatosX()

function DatosX() { 

    let clase = $(".datos-r1").attr('class', 'text-center')  

    clase.each((index, item) => {

        $(item).find(".txtRef").remove()

        let id = $(item).attr("id").replace('htmlDatos', ''),
            datos = $("#htmlDatos"+id), values = [], tags = [],
            position = datos.attr("orientacion"), max = 0,
            html = '<canvas id="canvas'+id+'" ></canvas>'            
        datos.append(html)

        values = datos.attr("valoresx").split(',')
        tags = datos.attr("valoresy").split(',')
        /*
        if (position == "vertical") {
            values = datos.attr("valoresx").split(',')
            tags = datos.attr("valoresy").split(',')
        } 
        else {
            values = datos.attr("valoresy").split(',')
            tags = datos.attr("valoresx").split(',')
        }
        */

        let board = $("#canvas"+id)[0]
        board.width = Number.parseInt(datos.attr("ancho"))
        board.height = Number.parseInt(datos.attr("alto"))
        let state = {
            axis: {
                color: datos.attr("ejecolor"),
                scale: datos.attr("escala"),
                title_x: datos.attr("tituloejex"),
                title_y: datos.attr("tituloejey"),
                width: datos.attr("ejegrosor") 
            },
            border: {
                color: datos.attr("bordecolor"),
                radius: datos.attr("borderadio"),
                width: datos.attr("bordegrosor")
            },
            canvas: {
                color: datos.attr("fondo"),
                context: board.getContext('2d'),
                height: board.height + 15,
                width: board.width + 5
            },
            chart: {
                border: {
                    color: '#0075b7',
                    width: 2
                },
                color: datos.attr("colores").split(','),
                length: values.length,
                margin: { x:70, y:90 },
                padding: { x:10, y:10 },
                position: position,
                tags: tags,
                values: values
            },
            extra: {
                limit: eval(datos.attr("limitar")),
                limitValues: datos.attr("limitval").split(","),
                projection: eval(datos.attr("proyectar"))
            },
            font: {
                align: 'center',
                color: datos.attr("textocolor"),
                family: 'Larke Neue Thin',
                size: 14
            },
            line: {
                color: datos.attr("lineacolor"),
                value: datos.attr("lineavalor"),
                width: datos.attr("lineagrosor")
            },
            title: {
                size: datos.attr("titulotamano"),
                value: datos.attr("titulo")
            },
            pictoric: {
                leyenda: eval(datos.attr("leyenda")),
                leyendaImg: datos.attr("leyendaimg"),
                leyendaValor: eval(datos.attr("leyendavalor"))
            }
        }

        if (state.chart.position == 'horizontal') state.chart.margin.x += 50;

        const { border, canvas, chart } = state //VARIABLES DE INPUTS
        const { x, y } = chart.margin 
        
        $("#canvas"+id).attr('style', 'border:'+border.width+'px solid '+border.color+'; border-radius:'+border.radius
            +'px; margin: 0 auto; background: '+canvas.color) 

        for (let i = 0; i < chart.length; i++)
            max = Math.max(max, chart.values[i]) //OBTENER VALOR MAXIMO
   
        let data = {
            ctx: canvas.context, //CONTEXTO
            dx: Math.min(Math.floor((canvas.width - 2*(x + 10))/(3/2*chart.length)), 100), //ANCHO DE LAS COLUMNAS
            dy: Math.min(Math.floor((canvas.height - 2*(y - 5))/(4/3*chart.length)), 60), //ALTO DE LAS COLUMNAS
            height: canvas.height - 2*y, //ALTURA DEL GRAFICO
            len: chart.length, //NÚMERO DE COLUMNAS
            max: max, //VALOR MÁXIMO EN EL EJE Y
            width: canvas.width - 2*(x + 10), //ANCHO DEL GRAFICO
            x0: x, y0: canvas.height - y, //EJES X = 0, Y = 0
        }

        data.cx = data.x0 + 2*chart.padding.x + data.width/data.len/2 - data.dx/2 //CENTRO DE LA COLUMNA X
        data.cy = data.y0 - chart.padding.y - data.height/data.len/2 - data.dy/2 //CENTRO DE LA COLUMNA Y    

        if (state.pictoric.leyenda) {
            generarColumPic(data, state)
        } else {
            generarColumnas(data, state)
            state.extra.projection && proyectarColumnas(data, state);
            state.extra.limit && limiteColumnas(data, state);
        }
        generarEjes(data, state)
        insertarTextos(data, state)
    })

    function generarEjes(data, state) {

        const { ctx } = data
        const { axis, chart, font, title } = state
        const { height, width } = state.canvas
        const { x, y } = chart.margin 
        const { padding } = chart

        ctx.beginPath()
        ctx.moveTo(x, y - 2*padding.y)
        ctx.lineTo(x, height - y) //EJE VERTICAL
        ctx.lineTo(width - x + 2*padding.x, height - y) //EJE HORIZONTAL

        ctx.lineWidth = axis.width
        ctx.strokeStyle = axis.color
        ctx.stroke()

        ctx.textAlign = font.align
        ctx.font = font.size + "px " + font.family
        ctx.fillText(axis.title_x, width/2, height - x/2 + font.size - 20) //INSERTAR TITULO X

        ctx.rotate(3*Math.PI/2)
        ctx.fillText(axis.title_y, -height/2, y/2 - font.size) //INSERTAR TITULO Y

        ctx.rotate(Math.PI/2)
        ctx.font = title.size + "px " + font.family
        ctx.fillText(title.value, width/2, 42) //INSERTAR TITULO

        ctx.closePath()
    }
    function generarColumnas(data, state) {

        const { canvas, chart } = state
        const { ctx, dx, dy, height, len, max, width, x0, y0 } = data

        ctx.beginPath()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = chart.color[0]

        if (chart.position == 'vertical') 
        {
            for (let i = 0, x = data.cx; i < len; i++, x += width/len) {
                let dy = height/max * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
                ctx.fillRect(x, y, dx, dy) //DIBUJAR COLUMNA      
                ctx.moveTo(x, y0) 
                ctx.lineTo(x, y)
                ctx.lineTo(x + dx, y)
                ctx.lineTo(x + dx, y0) //BORDES COLUMNA
            }
        } 
        else 
        {
            for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
                let dx = width/max * chart.values[i], x = x0 //TAMAÑO DE LA COLUMNA
                ctx.fillRect(x, y, dx, dy) //DIBUJAR COLUMNA
                ctx.moveTo(x, y) 
                ctx.lineTo(x + dx, y)
                ctx.lineTo(x + dx, y + dy)
                ctx.lineTo(x, y + dy) //BORDES COLUMNA
            }
        }

        ctx.strokeStyle = chart.border.color
        ctx.lineWidth = chart.border.width
        ctx.stroke()
        ctx.closePath()
    }
    function proyectarColumnas(data, state) {
        
        const { canvas, chart, line } = state
        const { ctx, dx, dy, height, len, max, width, x0, y0 } = data
       
        ctx.beginPath()
        if (chart.position == 'vertical') 
        {
            for (let i = 0, x = data.cx; i < len; i++, x += width/len) {
                let dy = height/max * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
                ctx.moveTo(x0, y) 
                ctx.lineTo(x, y) //PROYECCION COLUMNA
            }
        }
        else
        {
            for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
                let dx = width/max * chart.values[i], x = x0 //TAMAÑO DE LA COLUMNA
                ctx.moveTo(x + dx, y0) 
                ctx.lineTo(x + dx, y) //PROYECCION COLUMNA
            }
        }

        ctx.strokeStyle = line.color
        ctx.setLineDash([5, 1])
        ctx.lineWidth = line.width
        ctx.stroke()
        ctx.closePath()
    }
    function insertarTextos(data, state) {

        const { canvas, chart, font, pictoric } = state
        const { ctx, dx, dy, height, len, max, width, x0, y0 } = data
        
        ctx.beginPath()
        ctx.font = font.size + "px " + font.family
        ctx.fillStyle = font.color

        if (chart.position == 'vertical') 
        {
            ctx.textAlign = "right"
            for (let i = 0; i < len; i++) {
                let dy = height/max * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
                ctx.fillText(chart.values[i], x0 - 5, y + 5) //INSERTAR TEXTO
            }

            ctx.textAlign = font.align    
            for (let i = 0, x = data.cx + dx/2; i < len; i++, x += width/len) {
                ctx.fillText(chart.tags[i], x, y0 + font.size + 5) //INSERTAR TEXTO
            }
        }
        else 
        {
            ctx.textAlign = font.align
            if (!pictoric.leyenda)
            for (let i = 0; i < len; i++) {
                let dx = width/max * chart.values[i], x = x0 + dx //TAMAÑO DE LA COLUMNA
                ctx.fillText(chart.values[i], x, y0 + font.size + 5) //INSERTAR TEXTO
            }

            ctx.textAlign = "right"
            for (let i = 0, y = data.cy; i < len; i++, y-= height/len) {
                ctx.fillText(chart.tags[i], x0 - 5, y + dy/2 + 5) //INSERTAR TEXTO
            }
        }

        ctx.closePath()
    }
    function limiteColumnas(data, state) {

        const { canvas, chart, line, extra } = state
        const { ctx, dx, dy, height, len, max, width, x0, y0 } = data
       
        ctx.beginPath()
        if (chart.position == 'vertical') 
        {
            for (let i = 0, x = data.cx; i < len; i++, x += width/len) {
                if (extra.limitValues[i] != 0) {
                    let dy = height/max * extra.limitValues[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
                    ctx.moveTo(x0, y) 
                    ctx.lineTo(x, y) //PROYECCION COLUMNA
                }
            }
        }
        else
        {
            for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
                if (extra.limitValues[i] != 0) {
                    let dx = width/max * extra.limitValues[i], x = x0 //TAMAÑO DE LA COLUMNA
                    ctx.moveTo(x + dx, y0) 
                    ctx.lineTo(x + dx, y) //PROYECCION COLUMNA
                }
            }
        }

        ctx.strokeStyle = 'red'
        ctx.setLineDash([0])
        ctx.lineWidth = line.width
        ctx.stroke()
        ctx.closePath()
    }
    function generarColumPic(data, state) {

        const { canvas, chart, pictoric } = state
        const { ctx, dx, dy, height, len, max, width, x0, y0 } = data

        ctx.beginPath()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = chart.color[0]

        let maxCantImg = Math.max(...chart.values)/pictoric.leyendaValor;
        let imgSpace = data.height/maxCantImg
        let imgSpaceH = data.height/len

        if (chart.position == 'vertical') {
            for (let i = 0,x = data.cx + data.dx/2 - imgSpace/2; i < len; i++, x += width/len) {
                let cantImg = chart.values[i]/pictoric.leyendaValor;
                for (let j = 0; j < cantImg; j++) {
                    let imgObj = new Image();
                    imgObj.src = pictoric.leyendaImg;
                    imgObj.onload = function() {
                        ctx.drawImage(imgObj, x, y0 - imgSpace - imgSpace*(j),imgSpace*0.9,imgSpace*0.9);
                    };
                }
                ctx.beginPath()
                ctx.stroke()
                ctx.closePath()
            }
        } 
        else {
            for (let i = 0; i < len; i++) {
                let cantImg = chart.values[i]/pictoric.leyendaValor;
                for (let j = 0, x = x0 + chart.padding.x + data.width/maxCantImg/2; j < cantImg; j++, x += width/maxCantImg) {
                    let imgObj = new Image();
                    imgObj.src = pictoric.leyendaImg;
                    imgObj.onload = function() {
                        ctx.drawImage(imgObj, x, y0 - imgSpaceH*(i+1),imgSpaceH*0.9,imgSpaceH*0.9);
                    };
                }
            }
        }

        ctx.strokeStyle = chart.border.color
        ctx.lineWidth = chart.border.width
        ctx.stroke()
        ctx.closePath()
    }
}

