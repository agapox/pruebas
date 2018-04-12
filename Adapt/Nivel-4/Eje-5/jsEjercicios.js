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
				type:{pictoric: true},
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
					width: eval(datos.attr("bordeAncho")),
					color: datos.attr("bordeColor"),
					arrowX: eval(datos.attr("conFlechasX")),
					arrowY: eval(datos.attr("conFlechasY")),
					arrowColor: datos.attr("bordeColor")
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
				},
				bars: {
					width: 0, // 3 valores {0: grande, 1: mediana, 2: pequeña},
					border: {
						color: 'red',
						width: 4
					},
					margin: 30,
					color: 'rgba(21, 216, 10,0.8)',
					highlight: {
						color: 'rgba(0, 0, 10,0.4)'
					},
					padding: 1 // {0: grande, 1: mediana, 2: pequeña},
				}
			}
		
			if(state.chart.image.caption.show) {
				state.chart.style.padding.top += state.chart.image.caption.leyendaImgSize
			}
			state.chart.position = { 
				x0: state.container.position.x0 + state.chart.style.padding.left,
				y0: state.container.position.y0 + state.chart.style.padding.top,
				x1: state.container.position.x1 - (state.chart.style.padding.right),
				y1: state.container.position.y1 - (state.chart.style.padding.bottom)
			}
			state.chart.style.innerPadding.x = (state.chart.position.x1 - state.chart.position.x0)*0.01
			state.chart.style.innerPadding.y = (state.chart.position.y1 - state.chart.position.y0)*0.13

			state.chart.bars.margin = state.chart.style.innerPadding.x
		
			state.scale.max = state.scale.max == 0 ? Math.max(...state.chart.values) : state.scale.max
		
			state.chart.image.height = (state.chart.position.y1 - state.chart.position.y0)*0.3
		
			data = {
				lenVal: state.chart.values.length, lenTag: state.chart.tags.length
			}
			console.log(state)
			state.innerChart = {}
			state.innerChart.position = {
				x0: state.chart.position.x0 + state.chart.style.innerPadding.x + state.chart.style.padding.left,
				y0: state.chart.position.y0 + state.chart.style.innerPadding.y,
				x1: state.chart.position.x1 - state.chart.style.innerPadding.x - state.chart.style.padding.right,
				y1: state.chart.position.y1
			}

			if(state.chart.orientation != 'vertical') {
				state.innerChart.position.x0 = state.chart.position.x0
			}
		
			drawRect(state.innerChart.position.x0,state.innerChart.position.y0,state.innerChart.position.x1-state.innerChart.position.x0,state.innerChart.position.y1-state.innerChart.position.y0)
			drawRect(state.chart.position.x0,state.chart.position.y0,state.chart.position.x1-state.chart.position.x0,state.chart.position.y1-state.chart.position.y0)
			drawRect(state.canvas.position.x0,state.canvas.position.y0,state.canvas.position.x1-state.canvas.position.x0,state.canvas.position.y1-state.canvas.position.y0)
			drawRect(state.container.position.x0,state.container.position.y0,state.container.position.x1-state.container.position.x0,state.container.position.y1-state.container.position.y0)
			function drawRect(x0,y0,x1,y1) {
				const { ctx } = state
				ctx.strokeRect(x0,y0,x1,y1)
			}
		
			initEx(state)
			function initEx(state) {
				const { ctx } = state
				const { pictoric } = state.chart.type
        ctx.save()
        
        datosHistograma(state)

				//if (pictoric) {
				//	datosPictoric(state)
				//} else {
				//	datosSimb(state)
				//}
				ctx.restore()
				ctx.save()
      }
      
      function datosHistograma(state){
        insTitulos(state)
        guidelines(state)
        insChart(state)
        insValoresEjes(state)
        instHistogramas(state)
      }

      function instHistogramas(state){
        const { ctx, innerChart } = state
        let width
        if (chart.orientation == 'vertical') {

        } else {
          
        }
      }
		
			function datosPictoric(state) {
				const { ctx, chart } = state
				ctx.save()
				insTitulos(state)
				guidelines(state)
				insChart(state)
				if(chart.image.caption.show) {
					insLeyenda(state)
				}
				insImages(state)
				insValoresEjes(state)
				insEtqDatos(state)
				ctx.restore()
				ctx.save()
			}
			function datosSimb(state) {
				const { ctx } = state
				ctx.save()
				insTitulos(state)
				insValoresEjes(state)
				insChart(state)
				guidelines(state)
				insBarras(state)
				// insEtqDatos(state)
				ctx.restore()
				ctx.save()
			}
		
		
			// chart functions Begin
				// insTitulos Begin
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
				// insTitulos End
				// Insertar Valores en los ejes Begin
					function insValoresEjes(state) {
						const { ctx, chart } = state
						const { tags, values } = chart
						ctx.save()
						let valuesAxisX = values
						let valuesAxisY = tags
						if (chart.orientation == 'vertical') {
							valuesAxisX = tags
							valuesAxisY = values
						}
						insValuesX(state, valuesAxisX)
						insValuesY(state, valuesAxisY)
						ctx.restore()
						ctx.save()
					}
					function insValuesX(state, valuesTags) {
						const { ctx, chart, container, canvas, scale, font, innerChart } = state
						const { tags, values, position, axis } = chart
						const { x0, x1, y0, y1 } = innerChart.position
						ctx.save()
		
						let centerX, centerY, delta
						let len = valuesTags.length
						let width = (x1 - x0 - chart.style.innerPadding.x*2)
						let barMargin = chart.bars.margin
						let barPadding = barMargin/2
						let barCont = (width - barMargin*len - barPadding*len)/len
						let height = (y1 - y0 - chart.style.innerPadding.y - chart.axis.width/2)
		
						let heightImg = height/(Math.max(...chart.values) > scale.max ? Math.max(...chart.values) : scale.max)
						let xPos = chart.position.x0 + heightImg + chart.bars.border.width
						let x = chart.style.innerPadding.x + barMargin
						let vardx = barCont + barMargin + barPadding

						let imageW = heightImg*4/3 - barPadding*2
						
						ctx.font = font.size + 'px ' + font.family
						ctx.textAlign = 'center'
						ctx.textBaseline = 'top'
						ctx.fillStyle = font.color
						if (chart.orientation == 'vertical') {
							centerY = y1 + chart.axis.width*2
							//delta = barCont + barMargin + barPadding
							for (let i = 0; i < len; i++) {
								centerX = xPos
								delta = barCont + barMargin + barPadding
								ctx.fillText(valuesTags[i], x0 + (barCont + barMargin + barPadding)*i + barCont/2, centerY)
							}
						} else {
							len = Math.max(...valuesTags) > scale.max ? Math.max(...valuesTags) : scale.max
							centerX = x0
							centerY = y1 + chart.axis.width*2
							delta = width/len
							for (let i = scale.min; i <= scale.max; i+= scale.value) {
								ctx.fillText((i), centerX + delta*i, centerY)
							}
						}
						
						ctx.restore()
						ctx.save()
					}
					function insValuesY(state, valuesTags) {
						const { ctx, chart, container, canvas, scale, font, innerChart } = state
						const { tags, values, position, axis } = chart
						ctx.save()
						
						let height = innerChart.position.y1 - innerChart.position.y0
						let width = innerChart.position.x1 - innerChart.position.x0
						let barCont, len, itemHeight, barMargin, barPadding
						barMargin = chart.bars.margin
						barPadding = barMargin/2
						ctx.font = font.size + 'px ' + font.family
						ctx.textAlign = 'right'
						ctx.textBaseline = 'middle'
						ctx.fillStyle = font.color
						if (chart.orientation == 'vertical') {
							len = data.lenVal
							barCont = (width - barMargin*chart.tags.length - barPadding*chart.tags.length)/len
							itemHeight = height/(Math.max(...chart.values) > scale.max ? Math.max(...chart.values) : scale.max)
							x0 = chart.position.x0 - (chart.position.x0 - container.position.x0)/2
							y = itemHeight
							y0 = innerChart.position.y1
							for (let i = scale.min; i <= scale.max; i+=scale.value) {
								ctx.fillText(i, x0,y0 - y*i)
							}
						} else {
							len = data.lenTag
							barCont = (height - barMargin*chart.tags.length - barPadding*chart.tags.length)/len
							itemHeight = height/len
							// let vardy = barCont + barMargin + barPadding
							x0 = container.position.x0 + (chart.position.x0 - container.position.x0)/2
							y0 = chart.position.y1 - itemHeight/4 - chart.bars.border.width
							y = itemHeight
							for (let i = 0, dy=0; i < len; i++, dy+=y) {
								ctx.fillText(valuesTags[i], x0,y0 - dy)
							}
						}
						ctx.restore()
						ctx.save()
					}
				// Insertar Valores en los ejes End
				function insChart(state) {
					const { ctx } = state
					const { x0, y0, x1, y1 } = state.chart.position
					const { width, height } = state.chart
					ctx.save()
		
					
					insEjes(state, x0, y0, x1, y1)
					insFlechas(state, x0, y0, x1, y1)
					// insBarras(state)
					ctx.restore()
					ctx.save()
				}
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
				function guidelines(state) {
					const { ctx, scale, chart, innerChart } = state
					const { x0, y0, x1, y1 } = innerChart.position
					ctx.save()
		
					if(scale.width > 0 && scale.value > 0) {
						ctx.lineWidth = scale.width
						ctx.strokeStyle = scale.color
						ctx.beginPath()
						if (chart.orientation == 'vertical') {
							let height = y1 - y0
							let spaceScale = (height/scale.max)*scale.value
							for (let i = scale.min; i <= scale.max; i+=scale.value) {
								ctx.moveTo(chart.position.x0 + chart.axis.width, y1 - spaceScale*i)
								ctx.lineTo(chart.position.x1 - (x1-x0)*0.02, y1 - spaceScale*i)
							}
						} else {
							let width = x1 - x0 - (x1-x0)*0.02
							let spaceScale = (width/scale.max)*scale.value
							for (let i = scale.min; i <= scale.max; i+=scale.value) {
								ctx.moveTo(x0 + spaceScale*i, y1)
								ctx.lineTo(x0 + spaceScale*i, y0 + (y1-y0)*0.02 )
							}
						}
						ctx.stroke()
						ctx.closePath()
					}
					ctx.restore()
					ctx.save()
				}
				function resaltarBarras(state, x0,y0,x1,y1) {
					const { ctx, chart, container } = state
					ctx.save()
					ctx.fillStyle = chart.bars.highlight.color
					ctx.fillRect(x0,chart.position.y1+state.font.size*1.5,x1,y1 - state.font.size)
					ctx.restore()
					ctx.save()
				}
			// chart functions End
		
			// datos chart functions Begin
				function insBarras(state) {
					const { ctx, chart, scale } = state
					const { x0, y0, x1, y1 } = chart.position
					ctx.save()
					
					let barMargin = 10
					let barPadding = barMargin/2
					let barsSize
					chart.bars.width == 0 ? barsSize = 1 : chart.bars.width == 1 ? barsSize = 0.8 : chart.bars.width == 2 ? barsSize = 0.6 : barsSize = 1
					
					if (chart.orientation == 'vertical') {
						let width = (x1 - x0 - chart.style.innerPadding.x*2)
						let height = (y1 - y0 - chart.style.innerPadding.y - chart.axis.width/2)
						let barCont = (width - barMargin*chart.tags.length - barPadding*chart.tags.length)/chart.tags.length
						let dy = scale.max == Math.max(...chart.values) ? height / Math.max(...chart.values) : height / scale.max
						let x = chart.style.innerPadding.x + barMargin
						let xPos = x0
						let yPos = y1 - chart.axis.width/2
						let borderBar = chart.bars.border.width
						let vardx = barCont + barMargin + barPadding
						for (let i = 0; i < chart.values.length; i++) {
							let dx = vardx*i
							if (chart.bars.highlight.color != '') {
								resaltarBarras(state, xPos + x + dx,yPos,barCont - borderBar,-dy*chart.values[i], barPadding)
							}
							ctx.fillStyle = chart.bars.color
							ctx.beginPath()
							ctx.rect(xPos + x + dx + borderBar/2,yPos,barCont - 2*borderBar,-dy*chart.values[i])
							ctx.closePath()
							ctx.fill()
							if (borderBar > 0) {
								ctx.beginPath()
								ctx.lineWidth = borderBar
								ctx.strokeStyle = chart.bars.border.color
								ctx.moveTo(xPos + x + dx, yPos)
								ctx.lineTo(xPos + x + dx,yPos - dy*chart.values[i])
								ctx.lineTo(xPos + x + dx,yPos - dy*chart.values[i])
								ctx.lineTo(xPos + x + dx + barCont - borderBar,yPos - dy*chart.values[i])
								ctx.lineTo(xPos + x + dx + barCont - borderBar, yPos)
								ctx.stroke()
							}
						}
					} else {
						let height = (y1 - y0 - chart.style.innerPadding.y*2)
						let width = (x1 - x0 - chart.style.innerPadding.x - chart.axis.width/2)
						let barCont = (height - barMargin*chart.tags.length - barPadding*chart.tags.length)/chart.tags.length
						let dx = scale.max == Math.max(...chart.values) ? width / Math.max(...chart.values) : width / scale.max
						let x = chart.style.innerPadding.x + barMargin
						let y = chart.style.innerPadding.y/2 + barMargin
						let xPos = x0 + chart.axis.width/2
						let yPos = y1
						let borderBar = chart.bars.border.width
						console.log(barCont)
						let vardx = barCont + barMargin + barPadding
						let vardy = barCont + barMargin + barPadding
						for (let i = 0; i < chart.values.length; i++) {
							let dy = vardy*i
							// if (chart.bars.highlight.color != '') {
							//   resaltarBarras(state, xPos + x + dx,yPos,barCont - borderBar,-dy*chart.values[i], barPadding)
							// }
							ctx.fillStyle = chart.bars.color
							ctx.beginPath()
							// ctx.rect(xPos + x + dx + borderBar/2,yPos,barCont - 2*borderBar,-dy*chart.values[i])
							ctx.rect(xPos,yPos - dy - y,dx*chart.values[i],-dx)
							console.log(chart.values[i])
							ctx.closePath()
							ctx.fill()
							// if (borderBar > 0) {
							//   ctx.beginPath()
							//   ctx.lineWidth = borderBar
							//   ctx.strokeStyle = chart.bars.border.color
							//   ctx.moveTo(xPos + x + dx, yPos)
							//   ctx.lineTo(xPos + x + dx,yPos - dy*chart.values[i])
							//   ctx.lineTo(xPos + x + dx,yPos - dy*chart.values[i])
							//   ctx.lineTo(xPos + x + dx + barCont - borderBar,yPos - dy*chart.values[i])
							//   ctx.lineTo(xPos + x + dx + barCont - borderBar, yPos)
							//   ctx.stroke()
							// }
						}      
					}
		
					ctx.restore()
					ctx.save()
				}
				function insEtqDatos(state) {
					console.log('insEtqDatos')
					const { ctx, chart, scale, font, innerChart } = state
					const { values, tags, position } = chart
					const { x0, y0, x1, y1 } = innerChart.position
					ctx.save()
		
					let width = (x1 - x0 - chart.style.innerPadding.x*2)
					let height = (y1 - y0 - chart.style.innerPadding.y - chart.axis.width/2)
					let barMargin = chart.bars.margin
					let barPadding = barMargin/2
					let barCont, len, heightImg

					if (chart.orientation == 'vertical') {
						len = chart.tags.length
						barCont = (width - barMargin*len - barPadding*len)/len
						heightImg = height/(Math.max(...chart.values) > scale.max ? Math.max(...chart.values) : scale.max)
					} else {
						len = data.lenTag
						barCont = (height - barMargin*len - barPadding*len)/len
						console.log(height)
						heightImg = height/(Math.max(...chart.values) > scale.max ? Math.max(...chart.values) : scale.max)
					}
		
					let imageW = heightImg*4/3 - barPadding*2

					ctx.textAlign = 'center'
					ctx.textBaseline = 'bottom'
					ctx.font = 'Bold ' + font.size + 'px ' + font.family
					ctx.fillStyle = font.color
					if (chart.orientation == 'vertical') {
						for (let i = 0; i < values.length; i++) {
							if (chart.config.dataTags[i] == 0) { // aquí va el array de las posiciones [true,false,true,true]
								ctx.fillText(values[i], x0 + (barCont + barMargin + barPadding)*i + barCont/2, y1 - heightImg*values[i] - heightImg/5*(i+1))
							}
						}
					} else {
						console.log('falta hacer el insertar etiquetas cuando el gráfico es horizontal')
					}
					ctx.restore()
					ctx.save()
				}
			// datos chart functions End
		
			// Chart Functions Pictorcs Begin
				function insLeyenda(state) {
					let { ctx, chart, container, canvas } = state
					const { x0, y0, x1, y1 } = canvas.position
					ctx.save()
		
					let img = new Image()
					img.src = chart.image.src
					img.onload = function() {
						// definimos el ancho y largo de la imagen
						let imageH = chart.image.caption.font.size*3
						let imageW = imageH*4/3
						// se translada el ctx a la posición final del canvas en x y del container en Y
						let xPos = chart.position.x1
						let yPos = container.position.y0
						//ctx.translate(canvas.position.x1, container.position.y0)
						ctx.font = chart.image.caption.font.weight + ' ' + chart.image.caption.font.size + 'px ' + chart.image.caption.font.family
						ctx.textAlign = 'right'
						ctx.textBaseline = 'middle'
						let textVal = " = " + chart.image.caption.value
						let textWidth = ctx.measureText(textVal).width // ancho del texto
						ctx.strokeStyle = 'rgba(183, 183, 183, 0.9)'
						ctx.fillStyle = 'rgba(227, 230, 232, 0.5)'
						ctx.beginPath()
						ctx.rect(xPos, yPos, -imageW-textWidth, imageH)
						ctx.stroke()
						ctx.fill()
						ctx.beginPath()
						ctx.fillStyle = chart.image.caption.font.color
						ctx.fillText(textVal,xPos, yPos + imageH/2);
						ctx.drawImage(img, xPos - imageW - textWidth, yPos,imageW,imageH)
					}
		
					ctx.restore()
					ctx.save()
				}
				function insImages(state) {
					const { ctx, chart, scale, innerChart } = state
					const { x0, y0, x1, y1 } = innerChart.position
					ctx.save()
					
					let width = (x1 - x0)
					let height = (y1 - y0)
					let barMargin = chart.bars.margin
					let barPadding = barMargin/2
					let barCont, len, heightImg
					if (chart.orientation == 'vertical') {
						len = chart.tags.length
						barCont = (width - barMargin*len - barPadding*len)/len
						heightImg = height/(Math.max(...chart.values) > scale.max ? Math.max(...chart.values) : scale.max)
					} else {
						len = data.lenTag
						barCont = (height - barMargin*len - barPadding*len)/len
						let heightImgAux1 = width/(Math.max(...chart.values) > scale.max ? Math.max(...chart.values) : scale.max)
						let heightImgAux2 = height/(Math.max(...chart.values) > scale.max ? Math.max(...chart.values) : scale.max)
						heightImg = heightImgAux1 < heightImgAux2 ? heightImgAux1 : heightImgAux2

					}
					console.log(heightImg)
					
					let barsSize
					chart.bars.width == 0 ? barsSize = 1 : chart.bars.width == 1 ? barsSize = 0.8 : chart.bars.width == 2 ? barsSize = 0.6 : barsSize = 1
					
					let img = new Image()
					img.src = chart.image.src
					img.onload = function() {
						
						// definimos el ancho y largo de la imagen
						
						let imageH = heightImg
						let imageW = imageH*4/3 - barPadding*2
						imageH = imageW*3/4
						if (chart.orientation == 'vertical') {
							let imaMargin = (heightImg - imageH)
							len = chart.tags.length
							for (let i = 0; i < len; i++) {
								let dx = barCont*i
								let xInit = x0, xFin = imageW
								let yInit = y1, yFin = -imageH*chart.values[i]-imageH
								if (chart.bars.highlight.color != '') {
									ctx.fillStyle = 'rgba(0,0,0,0.5)'
									if (chart.config.hightLightBar[i] == 0) {
										resaltarBarras(state,x0 + (barCont+barMargin)*i,y1,imageW,yFin + imageH/2 - state.font.size)
									}
								}
								for (let j = 1; j <= chart.values[i]; j++) {
									ctx.drawImage(img, x0 + (barCont+barMargin)*i, y1 - (imageH+imaMargin)*j,imageW,imageH)
								}
							}
						} else {
							let imaMargin = Math.abs((heightImg - imageW))
							for (let i = 0; i < len; i++) {
								for (let j = 1; j <= chart.values[i]; j++) {
									console.log(imaMargin)
									ctx.drawImage(img, x0 + imaMargin + (imageW+imaMargin)*i, y1 - (barCont+barMargin)*j,imageW,imageH)
								}
							}
						} 
					}
		
					ctx.restore()
					ctx.save()
		
				}
			// Chart Functions Pictorcs End
	})

}
