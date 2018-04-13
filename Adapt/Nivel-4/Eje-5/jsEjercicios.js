datos()
function datos() {

	let clase = $(".datos-r2").attr('class', 'text-center datos-r2a')  

	clase.each((index, item) => {

		$(item).find(".txtRef").remove()

		let id, datos, html
		id = $(item).attr("id").replace('htmlDatos', '')
		datos = $("#htmlDatos"+id)
		html = '<canvas id="canvas'+id+'" ></canvas>'         
		datos.append(html)

		let board = $("#canvas"+id)[0]
		board.width = Number.parseInt(datos.attr("canvasAncho"))
		board.height = Number.parseInt(datos.attr("canvasAlto"))
		container = board

		let c = board

		let mainScaleInterval, mainScaleMin, mainScaleMax, mainMaxValue, mainLenVal, mainLenTags, mainFontFamily

		mainFontFamily = eval(datos.attr("fuenteGraf")) == 0 ? 'Arial' : 'Arial'
		mainMaxValue = Math.max(...datos.attr("grafVal").split(','))
		mainScaleInterval = eval(datos.attr("escalaInterval")) > 0 ? eval(datos.attr("escalaInterval")) : 1 
		mainScaleMin = eval(datos.attr("escalaMin")) > 0 ? eval(datos.attr("escalaMin")) : 0
		mainLenVal = datos.attr("grafVal").split(',').length
		mainLenTags = datos.attr("grafTags").split(',').length
		mainScaleMax = eval(datos.attr("escalaMax")) > 0 ? eval(datos.attr("escalaMax")) : mainMaxValue
		
		let state = {}
		state.ctx = c.getContext("2d")
		state.scale = {
			value: mainScaleInterval,
			width: eval(datos.attr("escalaAncho")),
			color: 'gray',
			min: mainScaleMin,
			max: mainScaleMax,
		}
		state.titles = {
			mainTitle: {
				title: datos.attr("tituloGraf"),
				alignX: 'center',
				alignY: 'top',
				font: {
					family: mainFontFamily,
					weight: eval(datos.attr("fuenteAncho")) == 0 ? 'bold': 'normal',
					color: datos.attr("titulografcolor"),
					size: eval(datos.attr("tituloGrafSize"))
				},
				color: datos.attr("tituloGrafColor"),
				move: {
					moveY: 0,
					moveX: 0
				},
				padding: 0
			},
			titleX: {
				title: datos.attr("AxisTitX"),
				alignX: 'center',
				alignY: 'bottom',
				font: {
					family: mainFontFamily,
					weight: eval(datos.attr("fuenteAncho")) == 0 ? 'bold': 'normal',
					color: datos.attr("fuentecolor"),
					size: eval(datos.attr("tituloGrafSize"))*0.8
				},
				color: datos.attr("tituloGrafColor"),
				move: {
					moveY: 0,
					moveX: 0
				},
				padding: 0
			},
			titleY: {
				title: datos.attr("AxisTitY"),
				alignX: 'center',
				alignY: 'top',
				font: {
					family: mainFontFamily,
					weight: eval(datos.attr("fuenteAncho")) == 0 ? 'bold': 'normal',
					color: datos.attr("fuentecolor"),
					size: eval(datos.attr("tituloGrafSize"))*0.8
				},
				color: datos.attr("tituloGrafColor"),
				move: {
					moveY: 0,
					moveX: 0
				},
				padding: 0
			}
		}
		state.font = {
			family: mainFontFamily,
			weight: 400,
			size: eval(datos.attr("fuenteTam")),
			color: datos.attr("fuentecolor"),
			align: 'left' // end, right, center, start, left
		}
		state.canvas = {
			height: c.height,
			width: c.width,
			padding: { top: 10, right: 10, bottom: 10, left: 10 },
			//margin: { top: 0, right: 0, bottom: 0, left: 0 }
		}
		state.canvas.position = {
			x0: state.canvas.padding.left,
			y0: state.canvas.padding.top,
			x1: c.width - (state.canvas.padding.right),
			y1: c.height - (state.canvas.padding.bottom) 
		}
		state.container = {
			padding: { top: 10 + state.titles.mainTitle.font.size, right: 10, bottom: 0 + state.titles.titleX.font.size, left:10 + state.titles.titleY.font.size },
			//margin: { top: 0, right: 0, bottom: 0, left:0 }
		}
		state.container.position = { 
			x0: state.canvas.position.x0 + state.container.padding.left,
			y0: state.canvas.position.y0 + state.container.padding.top,
			x1: state.canvas.position.x1 - state.container.padding.right,
			y1: state.canvas.position.y1 - state.container.padding.bottom
		}
		state.chart = {
			orientation: datos.attr("grafPos"),
			type: datos.attr("tipograf"),
			style: {
				border: {
					color: '',
					width: 1,
					radius: 4
				},
				backgroundColor: datos.attr("canvasFondo"),
				width: 0,
				height: 0,
				innerPadding: {x: 0, y: 0},
				padding: { top: 10, right: 10, bottom: 20, left: 10 }
				//margin: { top: 0, right: 0, bottom: 0, left: 0 }
			},
			axis: {
				width: eval(datos.attr("axisancho")),
				color: datos.attr("axiscolor"),
				arrowX: eval(datos.attr("conFlechasX")),
				arrowY: eval(datos.attr("conFlechasY")),
				arrowColor: datos.attr("axiscolor")
			},
			position: { x0: 0, y0: 0, x1: 0, y1: 0 },
			image: {
				src: datos.attr("pictoImage"),
				caption: {
					value: datos.attr("pictoValue") + ' ' + datos.attr("pictoTextVal"),
					show: eval(datos.attr("leyenda")),
					font: {
						size: eval(datos.attr("fuentetam")),
						color: '#262626',
						family: eval(datos.attr("fuenteGraf")) == 0 ? 'Arial' : 'Arial',
						alignX: 'right',
						alignY: 'middle',
						weight: eval(datos.attr("fuenteAncho")) == 0 ? 'bold': 'normal'
					},
					leyendaImgSize: eval(datos.attr("fuentetam"))*2,
				}
			},
			values: datos.attr("grafVal").split(','),
			tags: datos.attr("grafTags").split(','),
			config: {
				dataTags: datos.attr("grafdatatags").split(','),
				hightLightBar: datos.attr("hightlightbar").split(','),
				guideLines: {color: datos.attr("escalacolor"), width: eval(datos.attr("escalaancho"))}
			},
			bars: {
				width: 1, // 3 valores {0: grande, 1: mediana, 2: pequeña},
				border: {
					color: '#ba070780',
					width: 2
				},
				margin: 30,
				color: '#c4440980,#1fbc0780,#09ba9c80,#a208ba80', //#c4440980,#1fbc0780,#09ba9c80,#a208ba80
				highlight: {
					color: '#93939380'
				},
				padding: 1 // {0: grande, 1: mediana, 2: pequeña},
			},
			show: {tags: eval(datos.attr("tags")), values: eval(datos.attr("values"))}
		}
	
		if(state.chart.image.caption.show) {
			state.chart.style.padding.top += state.chart.image.caption.leyendaImgSize
		}
		state.chart.position = { 
			x0: state.container.position.x0 + state.chart.style.padding.left + state.font.size,
			y0: state.container.position.y0 + state.chart.style.padding.top,
			x1: state.container.position.x1 - (state.chart.style.padding.right),
			y1: state.container.position.y1 - (state.chart.style.padding.bottom) - state.font.size/2
		}
		state.chart.style.innerPadding.x = (state.chart.position.x1 - state.chart.position.x0)*0.01
		state.chart.style.innerPadding.y = (state.chart.position.y1 - state.chart.position.y0)*0.13

		state.chart.bars.margin = state.chart.style.innerPadding.x
	
		state.scale.max = state.scale.max == 0 ? Math.max(...state.chart.values) : state.scale.max
	
		state.chart.image.height = (state.chart.position.y1 - state.chart.position.y0)*0.3
	
		data = {
			lenVal: state.chart.values.length,
			lenTag: state.chart.tags.length,
			scaleMax: state.scale.max
		}

		if(state.chart.config.dataTags) {
			data.lenVal = state.chart.values.length
			data.scaleMax
		}
		
		state.innerChart = {}
		state.innerChart.position = {
			x0: state.chart.position.x0 + state.chart.style.innerPadding.x + state.chart.style.padding.left,
			y0: state.chart.position.y0 + state.chart.style.innerPadding.y,
			x1: state.chart.position.x1 - state.chart.style.innerPadding.x - state.chart.style.padding.right,
			y1: state.chart.position.y1 - state.chart.axis.width/2
		}

		if(state.chart.orientation != 'vertical') {
			state.innerChart.position.y1 -= state.chart.style.innerPadding.y/2
			state.innerChart.position.x0 = state.chart.position.x0 + state.chart.axis.width/2
			state.innerChart.position.x1 = state.chart.position.x1 - state.chart.style.innerPadding.x - state.chart.style.padding.right - state.chart.axis.width
		}

		//console.log(state)
		
		drawRect(state,state.innerChart.position.x0,state.innerChart.position.y0,state.innerChart.position.x1-state.innerChart.position.x0,state.innerChart.position.y1-state.innerChart.position.y0)
		// drawRect(state,state.chart.position.x0,state.chart.position.y0,state.chart.position.x1-state.chart.position.x0,state.chart.position.y1-state.chart.position.y0)
		// drawRect(state,state.canvas.position.x0,state.canvas.position.y0,state.canvas.position.x1-state.canvas.position.x0,state.canvas.position.y1-state.canvas.position.y0)
		// drawRect(state,state.container.position.x0,state.container.position.y0,state.container.position.x1-state.container.position.x0,state.container.position.y1-state.container.position.y0)

		initEx(state)
	}) // clase.each() END
} // datos() END

// nuevas

// Sólo pruebas
function drawRect(state,x0,y0,x1,y1) {
	const { ctx } = state
	ctx.strokeRect(x0,y0,x1,y1)
}

function initEx(state) {
	const { ctx } = state
	const { type } = state.chart
	ctx.save()

	if (type == 'pictorico') {
		datosPictoricos(state)
	} else {
		datosSimbolicos(state)
	}
	
	ctx.restore()
	ctx.save()
}

// Generar Gráfico Datos Histograma
function datosPictoricos(state){
	console.log('***datosPictoricos')
	insTitulos(state)
	insChart(state)
	insPictoricos(state)
	console.log('datosPictoricos***')
}

function insLeyenda(state) {

}

function insImages(state) {

}

function insPictoricos(state){
	console.log('****insPictoricos')
	const { ctx, innerChart, chart, scale, container } = state
	const { lenVal, lenTag } = data
	const { x0, y0, x1, y1 } = innerChart.position
	const { scaleMax } = data
	ctx.save()

	let img = new Image()
	img.src = chart.image.src

	let width = x1 - x0
	let height = y1 - y0
	let colorBars = chart.bars.color.split(',')
	let barMargin
	if (chart.orientation == 'vertical') {
		let barWidth = width/lenTag
		let barheight = height/scaleMax
		let imgW = barheight > barWidth ? barWidth : barheight
		let imgH = imgW
		barMargin = barWidth - imgW
		//barWidth = barWidth - barMargin
		img.onload = function() {
			for (let i = scale.min; i <= scale.max; i += scale.value ) {
				for (let j = 0; j < chart.values[i]; j++) {
					chart.tags[i] &&
						ctx.drawImage(img, x0 + barMargin/2 + (barWidth)*i, y1 - imgW*j,imgH,-imgW)
					chart.values[i] && chart.tags[i] &&
						insDataTagsBars(state, x0 + barWidth/2 + (barWidth)*i, y1 - imgH*chart.values[i], chart.values[i])
				}
				chart.show.tags && chart.tags[i] &&
					insTags(state, x0 + barWidth/2 + (barWidth)*i, chart.position.y1, chart.tags[i])
				chart.show.values &&
					insValues(state, chart.position.x0, y0, x1, y1)
			}
		}
	} else {
		let barWidth = height/lenTag
		let barheight = width/scaleMax
		console.log(scaleMax)
		let barMargin = (barheight > barWidth ? barWidth : barheight)*0.2
		let imgW = barWidth - barMargin
		let imgH = imgW
		//barMargin = barWidth - imgW
		//barWidth = barWidth - barMargin
		img.onload = function() {
			for (let i = scale.min; i <= scale.max; i += scale.value ) {
				for (let j = 0; j < chart.values[i]; j++) {
					chart.tags[i] &&
						// imagenes pegadas al eje Y
						//ctx.drawImage(img, x0 + chart.axis.width/4 + (barheight)*j, y1 - barMargin/2 - (barWidth)*i,imgH,-imgW)
						// ctx.fillRect(x0 + barWidth/2 - imgW/4 + chart.axis.width/4 + (barheight - imgW/2)*j, y1 - barMargin/2 - (barWidth)*i,imgH,-imgW)
						// Imágenes al medio
						// ctx.drawImage(img, x0 + barWidth/2 - imgW/4 + chart.axis.width/4 + (barheight - imgW/2)*j, y1 - barMargin/2 - (barWidth)*i,imgH,-imgW)
						// imágenes al medio del valor
						ctx.drawImage(img, x0 + chart.axis.width/4 + barheight/2 - imgH/2 + (barheight)*j, y1 - barMargin/2 - (barWidth)*i,imgH,-imgW)
						chart.values[i] && chart.tags[i] &&
							insDataTagsBars(state, x0 + chart.axis.width/4 + barheight/4 - imgH + barheight*chart.values[i], y1 - (imgH + barMargin)*i - barWidth/2, chart.values[i])
					}
				insGuides(state, chart.axis.width/2 + barheight*i)
				chart.show.tags && chart.tags[i] &&
					insTags(state, chart.position.x0, y1 - (barWidth+barMargin)/2 - (barWidth)*i, chart.tags[i])
				chart.show.values &&
					insValues(state, x0, y0, x1, y1)
			}
		}
	}

	ctx.restore()
	ctx.save()
	console.log('insPictoricos****')
}

// Generar Gráfico Datos Histograma
function datosSimbolicos(state){
	insTitulos(state)
	insChart(state)
	insBarras(state)
}

// Generar Barras Histogramas
function insBarras(state) {
	const { ctx, innerChart, chart, scale } = state
	const { lenVal, lenTag } = data
	const { x0, y0, x1, y1 } = innerChart.position
	const { scaleMax } = data
	ctx.save()
	let width = x1 - x0
	let height = y1 - y0
	let colorBars = chart.bars.color.split(',')
	let barMargin
	if (chart.orientation == 'vertical') {
		let barWidth = width/lenTag
		let barheight = height/scaleMax
		barMargin = barWidth*0.15
		barWidth = barWidth - barMargin
		for (let i = scale.min; i < scaleMax; i+=scale.value) {
			insGuides(state, barheight*(i+scale.value))
		}
		for (let i = 0; i < scaleMax; i++) {
			let xPos = x0 + barMargin/2
			let delta = (barWidth + barMargin)
			if (chart.values[i]) {
				ctx.fillStyle = colorBars[i%colorBars.length]
				ctx.fillRect(xPos + delta*i,y1,barWidth,-barheight*chart.values[i])
				if (chart.bars.border.width > 0) {
					ctx.beginPath()
					ctx.lineWidth = chart.bars.border.width
					ctx.strokeStyle = chart.bars.border.color
					ctx.moveTo(xPos + delta*i,y1)
					ctx.lineTo(xPos + delta*i,y1 - barheight*chart.values[i])
					ctx.lineTo(xPos + delta*(i+1) - barMargin,y1 - barheight*chart.values[i])
					ctx.lineTo(xPos + delta*(i+1) - barMargin,y1)
					ctx.stroke()
				}
				insDataTagsBars(state, xPos + delta*i + barWidth/2,y1 - barheight*chart.values[i], chart.values[i])
				insTags(state, xPos + delta*i + barWidth/2, chart.position.y1, chart.tags[i])
			}
		}
		insValues(state, x0, y0, x1, y1)
	} else {
		let barWidth = width/scaleMax
		let barheight = (height)/lenTag
		barMargin = barheight*0.15
		barheight = barheight - barMargin
		for (let i = scale.min; i < scaleMax; i+=scale.value) {
			insGuides(state, barWidth*(i+scale.value))
		}
		for (let i = 0; i < scaleMax; i++) {
			let yPos = y1 - barMargin/2
			let delta = (barheight + barMargin)
			if (chart.values[i]) {
				ctx.fillStyle = colorBars[i%colorBars.length]
				ctx.fillRect(x0,yPos - delta*i,barWidth*chart.values[i],-barheight)
				if (chart.bars.border.width > 0) {
					ctx.beginPath()
					ctx.lineWidth = chart.bars.border.width
					ctx.strokeStyle = chart.bars.border.color
					ctx.moveTo(x0,yPos - delta*i)
					ctx.lineTo(x0 + barWidth*chart.values[i],yPos - delta*i)
					ctx.lineTo(x0 + barWidth*chart.values[i],yPos - delta*(i+1) + barMargin)
					ctx.lineTo(x0,yPos - delta*(i+1) + barMargin)
					ctx.stroke()
				}
				insDataTagsBars(state, x0 + barWidth*chart.values[i],yPos - delta*i - barheight/2, chart.values[i])
				insTags(state, x0, yPos - barheight/2 - delta*i, chart.tags[i])
			}
		}
		insValues(state, x0, y0, x1, y1)
	}
	ctx.restore()
	ctx.save()
}

// Insertar Titulos
function insTitulos(state) {
	const { ctx, chart, titles } = state
	ctx.save()

	let titleHorizontal = 'titleY'
	let titleVertical = 'titleX'
	insMainTitle(state)
	if (chart.orientation == 'vertical') {
		titleHorizontal = 'titleX'
		titleVertical = 'titleY'
	}

	insTitleX(state, titleHorizontal)
	insTitleY(state, titleVertical)

	ctx.restore()
	ctx.save()
}

// Main Title
function insMainTitle(state) {
	const { ctx, chart, canvas } = state
	const { mainTitle, titleX, titleY } = state.titles
	ctx.save()

	let x = (canvas.position.x1)/2 + mainTitle.move.moveX + canvas.position.x0
	let y = 0 + canvas.position.y0 + mainTitle.move.moveY
	ctx.translate(x,y)
	ctx.fillStyle = mainTitle.color
	ctx.textAlign = mainTitle.alignX
	ctx.textBaseline = mainTitle.alignY
	ctx.font = mainTitle.font.weight + ' ' + mainTitle.font.size + 'px ' + mainTitle.font.family
	ctx.fillText(mainTitle.title, 0, 0)

	ctx.restore()
	ctx.save()
}

// Title X
function insTitleX(state, title) {
	const { ctx, chart, canvas } = state
	const { mainTitle, titleX, titleY } = state.titles
	ctx.save()

	title = (title == 'titleX') ? titleX : titleY

	let x = (chart.position.x1 - chart.position.x0)/2 + title.move.moveX + chart.position.x0
	let y = 0 + canvas.position.y1 - title.move.moveY
	ctx.translate(x,y)
	ctx.fillStyle = title.color
	ctx.textAlign = titleX.alignX
	ctx.textBaseline = titleX.alignY
	ctx.font = title.font.weight + ' ' + title.font.size + 'px ' + title.font.family
	ctx.fillText(title.title, 0, 0)

	ctx.restore()
	ctx.save()
}

// Title Y
function insTitleY(state, title) {
	const { ctx, chart, canvas } = state
	const { mainTitle, titleX, titleY } = state.titles
	ctx.save()

	title = (title == 'titleX') ? titleX : titleY

	let x = canvas.position.x0 + titleY.move.moveX
	let y = 0 + (chart.position.y1 - chart.position.y0)/2 + chart.position.y0 - titleY.move.moveY
	ctx.translate(x,y)
	ctx.fillStyle = title.color
	ctx.rotate(-90*Math.PI/180)
	ctx.textAlign = titleY.alignX
	ctx.textBaseline = titleY.alignY
	ctx.font = title.font.weight + ' ' + title.font.size + 'px ' + title.font.family
	ctx.fillText(title.title, 0, 0)

	ctx.restore()
	ctx.save()
}

//insertar Chart
function insChart(state) {
	const { ctx } = state
	const { x0, y0, x1, y1 } = state.chart.position
	const { width, height } = state.chart
	ctx.save()

	insEjes(state, x0, y0, x1, y1)
	insFlechas(state, x0, y0, x1, y1)
	ctx.restore()
	ctx.save()
}

// Generar Ejes
function insEjes(state, x0, y0, x1, y1) {
	const { ctx } = state
	const { axis } = state.chart
	ctx.save()

	ctx.lineWidth = axis.width
	ctx.strokeStyle = axis.color
	ctx.beginPath()
	ctx.moveTo(x0,y0)
	ctx.lineTo(x0,y1)
	ctx.closePath()
	ctx.stroke()
	ctx.beginPath()
	ctx.moveTo(x0,y1)
	ctx.lineTo(x1,y1)
	ctx.closePath()
	ctx.stroke()
	
	ctx.restore()
	ctx.save()
} // End insEjes

// Generar Flechas ejes
function insFlechas(state, x0, y0, x1, y1) {
	const { ctx, chart } = state
	const { axis } = chart
	ctx.save()

	ctx.lineWidth = axis.width
	ctx.strokeStyle = axis.arrowColor
	ctx.lineCap = "round"; // round, square, butt
	ctx.lineJoin="round"; // bevel, round, miter
	
	let auxWidth = chart.position.x1 - chart.position.x0
	let auxHeight = chart.position.y1 - chart.position.y0
	let width = auxWidth < auxHeight ? auxWidth : auxHeight
	let deltaLength = width*0.025
	let deltaIncl = deltaLength*0.7

	if (axis.arrowX) {
		ctx.beginPath()
		ctx.moveTo(x0 - deltaIncl,y0 + deltaLength)
		ctx.lineTo(x0,y0)
		ctx.closePath()
		ctx.stroke()
		ctx.beginPath()
		ctx.moveTo(x0,y0)
		ctx.lineTo(x0 + deltaIncl,y0 + deltaLength)
		ctx.closePath()
		ctx.stroke()
	}
	if (axis.arrowY) {
		ctx.beginPath()
		ctx.moveTo(x1 - deltaLength,y1 + deltaIncl)
		ctx.lineTo(x1,y1)
		ctx.closePath()
		ctx.stroke()
		ctx.beginPath()
		ctx.moveTo(x1,y1)
		ctx.lineTo(x1 - deltaLength,y1 - deltaIncl)
		ctx.closePath()
		ctx.stroke()
	}
	ctx.restore()
	ctx.save()
} // End insFlechas

// Insertar dataTags
function insDataTagsBars(state, posX, posY, text) {
	const { ctx, chart, font } = state
	const { values, tags } = chart
	ctx.save()

	ctx.textAlign = 'center'
	ctx.textBaseline = 'bottom'
	ctx.fillStyle = font.color
	ctx.font = 'bold ' + font.size + 'px ' + font.family
	if (chart.orientation == 'vertical') {
		ctx.fillText(text, posX, posY - font.size/3)
	} else {
		ctx.textAlign = 'left'
		ctx.textBaseline = 'middle'
		ctx.fillText(text, posX + font.size/3, posY)
	}

	ctx.restore()
	ctx.save()
}

// Insertar Tags
function insTags(state, posX, posY, text) {
	const { ctx, font, chart } = state
	ctx.save()

	if (chart.orientation == 'vertical') {
		ctx.textAlign = 'center'
		ctx.textBaseline = 'top'
		ctx.fillStyle = font.color
		ctx.font = font.size + 'px ' + font.family
		posY += 100/font.size
		ctx.fillText(text, posX, posY)
	} else {
		ctx.textAlign = 'right'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = font.color
		ctx.font = font.size + 'px ' + font.family
		posY += 100/font.size
		ctx.fillText(text, posX - 5, posY)
	}
	ctx.restore()
	ctx.save()
}

//Insertar Values
function insValues(state, x0, y0, x1, y1) {
	const { ctx, chart, scale, font } = state
	ctx.save()

	let height = y1 - y0
	let width = x1 - x0
	
	ctx.font = font.size + 'px ' + font.family
	ctx.fillStyle = font.color
	if (chart.orientation == 'vertical') {
		ctx.textAlign = 'right'
		ctx.textBaseline = 'middle'
		let heightVal = height/data.scaleMax
		for (let i = scale.min; i <= data.scaleMax; i += scale.value) {
			ctx.fillText(i,chart.position.x0 - 5, y1 - heightVal*(i))
		}
	} else {
		ctx.textAlign = 'center'
		ctx.textBaseline = 'top'
		let widthVal = width/data.scaleMax
		for (let i = scale.min; i <= data.scaleMax; i += scale.value) {
			ctx.fillText(i,x0 + widthVal*i, chart.position.y1 + 5)
		}
	}
	ctx.restore()
	ctx.save()
}

// Insertar líneas guías
function insGuides(state, delta) {
	const { ctx, chart } = state
	ctx.save()

	if (chart.config.guideLines.width > 0) {
		ctx.lineWidth = chart.config.guideLines.width
		ctx.strokeStyle = chart.config.guideLines.color
		if (chart.orientation == 'vertical') {
			ctx.moveTo(chart.position.x0 + chart.axis.width/2, chart.position.y1 - delta)
			ctx.lineTo(chart.position.x1 - chart.axis.width, chart.position.y1 - delta)
		} else {
			ctx.moveTo(chart.position.x0 + delta, chart.position.y1 - chart.axis.width/2)
			ctx.lineTo(chart.position.x0 + delta, chart.position.y0 + chart.axis.width)
		}
		ctx.stroke()
	}
	ctx.restore()
	ctx.save()
}