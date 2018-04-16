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
					value: ' = ' + datos.attr("pictoValue") + ' ' + datos.attr("pictoTextVal"),
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
				guideLines: {color: datos.attr("escalacolor"), width: eval(datos.attr("escalaancho"))},
				girarTextos: {tags: eval(datos.attr("girTags")), values: eval(datos.attr("girValues"))}
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

		let tagWordSizeX = 0
		let tagWordSizeY = 0
		state.ctx.font = `${state.font.size}px ${state.font.family}`
		let maxWord = 0
		state.chart.tags.map( el => { if (maxWord < el.length) {maxWord = el}})
		if (state.chart.orientation == 'vertical') {
			tagWordSizeX = Math.sin(state.chart.config.girarTextos.tags*Math.PI/180)*state.ctx.measureText(maxWord).width
		} else {
			tagWordSizeY = Math.cos(state.chart.config.girarTextos.tags*Math.PI/180)*state.ctx.measureText(maxWord).width
			// if (state.chart.config.girarTextos.tags > 0) {
			// } else {
			// 	tagWordSizeY = state.ctx.measureText(maxWord).width
			// }

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
	
		if(state.chart.image.caption.show) {
			state.chart.style.padding.top += state.chart.image.caption.leyendaImgSize
		}
		state.chart.position = { 
			x0: state.container.position.x0 + state.chart.style.padding.left + state.font.size + tagWordSizeY,
			y0: state.container.position.y0 + state.chart.style.padding.top,
			x1: state.container.position.x1 - (state.chart.style.padding.right),
			y1: state.container.position.y1 - (state.chart.style.padding.bottom) - state.font.size/2 - tagWordSizeX
		}
		state.chart.style.innerPadding.x = (state.chart.position.x1 - state.chart.position.x0)*0.01
		state.chart.style.innerPadding.y = (state.chart.position.y1 - state.chart.position.y0)*0.13

		state.chart.bars.margin = state.chart.style.innerPadding.x
	
		state.scale.max = state.scale.max == 0 ? Math.max(...state.chart.values) : state.scale.max
	
		state.chart.image.height = (state.chart.position.y1 - state.chart.position.y0)*0.3
		
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

		data = {
			maxVal: Math.max(...state.chart.values),
			lenVal: state.chart.values.length,
			lenTag: state.chart.tags.length,
			scaleMax: state.scale.max,
			scaleMin: state.scale.min,
			scaleInterval: state.scale.value,
			innerChart: {
				width: state.innerChart.position.x1 - state.innerChart.position.x0,
				height: state.innerChart.position.y1 - state.innerChart.position.y0,
			}
		}
		let divisorLength = data.scaleMin > 1 ? (((data.scaleMax - data.scaleMin)/data.scaleInterval) + 1) : (((data.scaleMax - data.scaleMin)/data.scaleInterval))
		if (state.chart.orientation == 'vertical') {
			data.barHeight =  data.innerChart.height / divisorLength
			data.barWidth = data.innerChart.width / state.chart.tags.length
			data.vertDiv = data.scaleMax > data.maxVal ? (data.scaleMax - data.scaleMin)/data.scaleInterval : (data.maxVal - data.scaleMin)/data.scaleInterval
			if (data.scaleMin > 1) {data.vertDiv+=1}
		} else {
			data.barHeight = data.innerChart.width / divisorLength
			data.barWidth = data.innerChart.height / state.chart.tags.length
			data.vertDiv = data.scaleMax > data.maxVal ? (data.scaleMax - data.scaleMin)/data.scaleInterval : (data.maxVal - data.scaleMin)/data.scaleInterval
			if (data.scaleMin > 1) {data.vertDiv+=1}
		}


		console.log(data)

		//console.log(state)
		
		// drawRect(state,state.canvas.position.x0,state.canvas.position.y0,state.canvas.position.x1-state.canvas.position.x0,state.canvas.position.y1-state.canvas.position.y0)
		// drawRect(state,state.container.position.x0,state.container.position.y0,state.container.position.x1-state.container.position.x0,state.container.position.y1-state.container.position.y0)
		// drawRect(state,state.chart.position.x0,state.chart.position.y0,state.chart.position.x1-state.chart.position.x0,state.chart.position.y1-state.chart.position.y0)
		// drawRect(state,state.innerChart.position.x0,state.innerChart.position.y0,state.innerChart.position.x1-state.innerChart.position.x0,state.innerChart.position.y1-state.innerChart.position.y0)

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
	console.log('*initEx')
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
	console.log('initEx*')
}

// Generar Gráfico Datos Histograma
function datosPictoricos(state){
	console.log('**datosPictoricos')
	insTitulos(state)
	insChart(state)
	insPictoricos(state)
	state.scale.width > 0 && insGuides(state)
	state.chart.show.values && insValues(state)
	state.chart.show.tags && insTags(state)
	insLeyenda(state)
	console.log('datosPictoricos**')
}

// Insertar Leyenda
function insLeyenda(state) {
	console.log('****insLeyenda')
	const { ctx, container, chart, innerChart, font } = state
	const { caption } = chart.image
	ctx.save()

	let img = new Image()
	img.src = chart.image.src

	let height = innerChart.position.y1 - innerChart.position.y0
	let width = innerChart.position.x1 - innerChart.position.x0

	let imgSize = 0.2
	let imgW = height > width ? width*imgSize : height*imgSize
	let imgH = imgW
	let captText = caption.value
	ctx.font = `bold ${caption.font.size}px ${caption.font.family}`
	ctx.fillStyle = caption.font.color
	let captTextW = ctx.measureText(captText).width
	let captTextH = ctx.measureText(captText).height
	
	if (chart.orientation == 'vertical') {
		ctx.textAlign = 'right'
		ctx.textBaseline = 'middle'
		ctx.fillText(captText, chart.position.x1, container.position.y0 + imgH/2)
		img.onload = function() {
			ctx.drawImage(img,chart.position.x1 - imgW - captTextW, container.position.y0, imgW,imgH)
		}
	} else {
		ctx.textAlign = 'right'
		ctx.textBaseline = 'middle'
		ctx.fillText(captText, chart.position.x1, container.position.y0 + imgH/2)
		img.onload = function() {
			ctx.drawImage(img,chart.position.x1 - imgW - captTextW, container.position.y0, imgW,imgH)
		}
	}
	let captBox = 0.2
	ctx.fillStyle = 'rgba(0,0,0,0.2)'
	ctx.strokeStyle = 'rgba(0,0,0,0.3)'
	ctx.rect(chart.position.x1 - imgW - captTextW - imgW*captBox/2, container.position.y0 - imgH*captBox/2, (imgW + captTextW)*(captBox+1), imgH*(captBox+1))
	ctx.stroke()
	ctx.fill()


	ctx.restore()
	ctx.save()
	console.log('insLeyenda****')
}

// Generar Gráfico Datos Pictoricos
function insPictoricos(state){
	console.log('***insPictoricos')
	const { ctx, innerChart, chart, scale, container, font } = state
	const { lenVal, lenTag } = data
	const { x0, y0, x1, y1 } = innerChart.position
	const { scaleMax } = data
	ctx.save()

	let img = new Image()
	img.src = chart.image.src

	let colorBars = chart.bars.color.split(',')
	let barMargin
	let heighVal = data.scaleMin > 1 ? 1 : 0
	if (chart.orientation == 'vertical') {
		let imgW = data.barHeight > data.barWidth ? data.barWidth : data.barHeight
		let imgH = imgW
		barMargin = data.barWidth - imgW
		img.onload = function() {
			for (let i = 0; i <= (data.scaleMax-data.scaleMin)/data.scaleInterval; i ++) {
				for (let j = 0; j < (chart.values[i]-data.scaleMin)/data.scaleInterval; j++) {
					chart.tags[i] &&
						ctx.drawImage(img, x0 + barMargin/2 + (data.barWidth)*i, y1 - imgW*(j+heighVal),imgH,-imgW)
					chart.values[i] && chart.tags[i] &&
						insDataTagsBars(state, x0 + data.barWidth/2 + (data.barWidth)*i, y1 - data.barHeight - imgH*(chart.values[i]-data.scaleMin)/data.scaleInterval, chart.values[i])
				}
			}
		}
	} else {
		let imgW = data.barHeight > data.barWidth ? data.barWidth : data.barHeight
		let imgH = imgW
		let barMargin = data.barHeight*0.2 - imgW
		img.onload = function() {
			for (let i = 0; i <= (data.scaleMax-data.scaleMin)/data.scaleInterval; i ++) {
				for (let j = 0; j < (chart.values[i]-data.scaleMin)/data.scaleInterval; j++) {
					chart.tags[i] &&
						// imagenes pegadas al eje Y
						// ctx.drawImage(img, x0 + chart.axis.width/4 + (barheight)*j, y1 - barMargin/2 - (barWidth)*i,imgH,-imgW)
						// imágenes al medio del valor
						ctx.drawImage(img, x0 + chart.axis.width/2 + (data.barHeight)*(j+heighVal), y1 - data.barWidth/2 + imgW/2 - (data.barWidth)*i + 100/font.size,imgH,-imgW)
						chart.values[i] && chart.tags[i] &&
							insDataTagsBars(state, x0 + chart.axis.width/4 - barMargin/2 + data.barWidth + data.barWidth*(chart.values[i]-data.scaleMin)/data.scaleInterval, y1 - (data.barWidth)*i - data.barWidth/2, chart.values[i])
				}
			}
		}
	}

	ctx.restore()
	ctx.save()
	console.log('insPictoricos***')
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
function insTags(state) {
	console.log('****insTags')
	const { ctx, font, chart, innerChart } = state
	const { x0, y0, x1, y1 } = innerChart.position
	ctx.save()

	let girarTexto = chart.config.girarTextos.tags
	for (let i = 0; i < data.lenTag; i++) {
		if (chart.tags[i]) {
			if (chart.orientation == 'vertical') {
				ctx.save()
				ctx.textAlign = girarTexto > 0 ? 'right' : 'center'
				ctx.textBaseline = girarTexto > 0 ? 'middle' : 'top'
				ctx.translate(x0+ data.barWidth/2 + (data.barWidth)*(i), chart.position.y1 + 100/font.size)
				girarTexto > 0 && ctx.rotate(-girarTexto*Math.PI/180)
				ctx.fillStyle = font.color
				ctx.font = font.size + 'px ' + font.family
				ctx.fillText(chart.tags[i], 0,0)
				ctx.restore()
				ctx.save()
			} else {
				ctx.save()
				ctx.textAlign = 'right'
				ctx.textBaseline = 'middle'
				ctx.translate(chart.position.x0 - 10, y1 - data.barWidth/2 - data.barWidth*i + 100/font.size)
				girarTexto > 0 && ctx.rotate(-girarTexto*Math.PI/180)
				ctx.fillStyle = font.color
				ctx.font = font.size + 'px ' + font.family
				ctx.fillText(chart.tags[i], 0, 0)
				ctx.restore()
				ctx.save()
			}
		}
	}
	ctx.restore()
	ctx.save()
	console.log('insTags****')
}

//Insertar Values
function insValues(state) {
	console.log('****insValues')
	const { ctx, chart, scale, font, innerChart } = state
	const { x0, y0, x1, y1} = innerChart.position
	ctx.save()

	// chart.position.x0, y0, x1, y1
	
	ctx.font = font.size + 'px ' + font.family
	ctx.fillStyle = font.color
	if (chart.orientation == 'vertical') {
		ctx.textAlign = 'right'
		ctx.textBaseline = 'middle'
		for (let i = data.scaleMin, pos = scale.min > 1 ? 1 : 0; i <= data.scaleMax; i += data.scaleInterval, pos++) {
			ctx.fillText(i,chart.position.x0 - 5, y1 - data.barHeight*(pos))
		}
		if (scale.min > 1) {
			ctx.textBaseline = 'middle'
			ctx.translate(chart.position.x0+1, y1 - data.barHeight/3)
			ctx.rotate(70*Math.PI/180)
			ctx.fillText('//', 0, 0)
			ctx.translate(-(chart.position.x0+1), +(y1 - data.barHeight/3))
		}
	} else {
		ctx.textAlign = 'center'
		ctx.textBaseline = 'top'
		for (let i = data.scaleMin, pos = scale.min > 1 ? 1 : 0; i <= data.scaleMax; i += data.scaleInterval, pos++) {
			ctx.fillText(i,x0 + data.barHeight*pos, chart.position.y1 + 5)
		}
		if (scale.min > 1) {
			ctx.textBaseline = 'middle'
			ctx.translate(x0 + data.barHeight/3, chart.position.y1)
			//ctx.rotate(90*Math.PI/180)
			ctx.fillText('//',0, 0)
			ctx.translate(-(chart.position.x0+5), -(y1 - data.barHeight/3))
		}
	}
	ctx.restore()
	ctx.save()
	console.log('insValues****')
}

// Insertar líneas guías
function insGuides(state) {
	const { ctx, chart } = state
	ctx.save()

	if (chart.config.guideLines.width > 0) {
		ctx.lineWidth = chart.config.guideLines.width
		ctx.strokeStyle = chart.config.guideLines.color

		for (let i = 0; i < data.vertDiv; i ++) {
			if (chart.orientation == 'vertical') {
				ctx.moveTo(chart.position.x0 + chart.axis.width/2, chart.position.y1 - chart.axis.width/2 - data.barHeight*(i+1))
				ctx.lineTo(chart.position.x1 - chart.axis.width, chart.position.y1 - chart.axis.width/2 - data.barHeight*(i+1))
			} else {
				ctx.moveTo(chart.position.x0 + chart.axis.width/2 + data.barHeight*(i+1), chart.position.y1 - chart.axis.width/2)
				ctx.lineTo(chart.position.x0 + chart.axis.width/2 + data.barHeight*(i+1), chart.position.y0 + chart.axis.width)
			}
		}
		ctx.stroke()
	}
	ctx.restore()
	ctx.save()
}