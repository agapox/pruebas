var c = document.getElementById("canvas");

console.log(c.width)
console.log(c.height)

let state = {}
state.ctx = c.getContext("2d")
state.scale = {
  value: 1,
  width: 1,
  color: 'gray',
  min: 0,
  max: 8
}
state.titles = {
  mainTitle: {
    title: 'El Título Principal',
    alignX: 'center',
    alignY: 'top',
    font: {
      family: 'Arial',
      weight: 'bold',
      size: 30
    },
    color: 'green',
    move: {
      moveY: 0,
      moveX: 0
    },
    padding: 0
  },
  titleX: {
    title: 'Título en X',
    alignX: 'center',
    alignY: 'bottom',
    font: {
      family: 'Arial',
      weight: 'bold',
      size: 22
    },
    color: 'red',
    move: {
      moveY: 0,
      moveX: 0
    },
    padding: 0
  },
  titleY: {
    title: 'Título en Y',
    alignX: 'center',
    alignY: 'top',
    font: {
      family: 'Arial',
      weight: 'bold',
      size: 22
    },
    color: 'blue',
    move: {
      moveY: 0,
      moveX: 0
    },
    padding: 0
  }
}
state.font = {
  family: 'Arial',
  weight: 400,
  size: 16,
  align: 'left' // end, right, center, start, left
}
state.canvas = {
  height: c.height,
  width: c.width,
  padding: { top: 40, right: 10, bottom: 40, left: 40 },
  //margin: { top: 0, right: 0, bottom: 0, left: 0 }
}
state.canvas.position = {
  x0: state.canvas.padding.left,
  y0: state.canvas.padding.top,
  x1: c.width - (state.canvas.padding.right),
  y1: c.height - (state.canvas.padding.bottom) 
}
state.container = {
  padding: { top: 20 + state.titles.mainTitle.font.size, right: 10, bottom: 20 + state.titles.titleX.font.size, left:20 + state.titles.titleY.font.size },
  //margin: { top: 0, right: 0, bottom: 0, left:0 }
}
state.container.position = { 
  x0: state.canvas.position.x0 + state.container.padding.left,
  y0: state.canvas.position.y0 + state.container.padding.top,
  x1: state.canvas.position.x1 - state.container.padding.right,
  y1: state.canvas.position.y1 - state.container.padding.bottom
}
state.chart = {
  orientation: 'vertical',
  type:{pictoric: true},
  style: {
    border: {
      color: '',
      width: 1,
      radius: 4
    },
    backgroundColor: '',
    width: 0,
    height: 0,
    innerPadding: {x: 0, y: 0},
    padding: { top: 30, right: 10, bottom: 30, left: 30 }
    //margin: { top: 0, right: 0, bottom: 0, left: 0 }
  },
  axis: {
    width: 2,
    color: 'red',
    arrowX: true,
    arrowY: true,
    arrowColor: 'green'
  },
  position: { x0: 0, y0: 0, x1: 0, y1: 0 },
  image: {
    src: 'https://vignette.wikia.nocookie.net/mario-fanon/images/4/48/Paper_mario.png/revision/latest/scale-to-width-down/640?cb=20131117112706&path-prefix=es',
    caption: {
      value: '5 papas',
      img: {},
      font: {
        size: '22',
        color: '#262626',
        family: 'Arial',
        alignX: 'right',
        alignY: 'middle',
        weight: 'bold'
      }
    }
  },
  values: [2,5,7,1,4],
  tags: ['A', 'B', 'C', 'D', 'E'],
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

state.chart.position = { 
  x0: state.container.position.x0 + state.chart.style.padding.left,
  y0: state.container.position.y0 + state.chart.style.padding.top,
  x1: state.container.position.x1 - (state.chart.style.padding.right),
  y1: state.container.position.y1 - (state.chart.style.padding.bottom)
}
state.chart.style.innerPadding.x = (state.chart.position.x1 - state.chart.position.x0)*0.03
state.chart.style.innerPadding.y = (state.chart.position.y1 - state.chart.position.y0)*0.09

state.scale.max = state.scale.max == 0 ? Math.max(...state.chart.values) : state.scale.max

state.chart.image.height = (state.chart.position.y1 - state.chart.position.y0)*0.3

data = {
  lenVal: state.chart.values.length, lenTag: state.chart.tags.length
}

console.log('**** ' + state.chart.orientation)

// drawRect(state.chart.position.x0,state.chart.position.y0,state.chart.position.x1-state.chart.position.x0,state.chart.position.y1-state.chart.position.y0)
// drawRect(state.canvas.position.x0,state.canvas.position.y0,state.canvas.position.x1-state.canvas.position.x0,state.canvas.position.y1-state.canvas.position.y0)
// drawRect(state.container.position.x0,state.container.position.y0,state.container.position.x1-state.container.position.x0,state.container.position.y1-state.container.position.y0)
function drawRect(x0,y0,x1,y1) {
  const { ctx } = state
  ctx.strokeRect(x0,y0,x1,y1)
}
/*
state = {
  ctx: c.getContext("2d"),
  canvas: {
    height: c.height,
    width: c.width,
    padding: { x: 40, y: 40 },
  },
  font: {
    family: 'Arial',
    weight: 400,
    size: 16,
    align: 'left' // end, right, center, start, left
  },
  chart: {
    style: {
      border: {
        color: '',
        width: 1,
        radius: 4
      },
      backgroundColor: '',
      width: 0,
      height: 0,
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    },
    axis: {
      width: 2,
      color: 'red',
      arrowX: true,
      arrowY: true,
      arrowColor: 'green'
    },
    position: { x0: 0, y0: 0, x1: 0, y1: 0 },
    image: {
      src: 'https://vignette.wikia.nocookie.net/mario-fanon/images/4/48/Paper_mario.png/revision/latest/scale-to-width-down/640?cb=20131117112706&path-prefix=es'
    },
    titles: {
      mainTitle: {
        title: 'El Título Principal',
        alignX: 'center',
        alignY: 'top',
        font: {
          family: 'Arial',
          weight: 'bold',
          size: 24
        },
        color: 'green',
        move: {
          moveY: 0,
          moveX: 0
        }
      },
      titleX: {
        title: 'Título en X',
        alignX: 'center',
        alignY: 'bottom',
        font: {
          family: 'Arial',
          weight: 'bold',
          size: 18
        },
        color: 'red',
        move: {
          moveY: 0,
          moveX: 0
        }
      },
      titleY: {
        title: 'Título en Y',
        alignX: 'center',
        alignY: 'top',
        font: {
          family: 'Arial',
          weight: 'bold',
          size: 18
        },
        color: 'blue',
        move: {
          moveY: 0,
          moveX: 0
        }
      }
    }
  }
}
*/
initEx(state)
function initEx(state) {
  const { ctx } = state
  const { pictoric } = state.chart.type
  ctx.save()
  if (pictoric) {
    datosPictoric(state)
  } else {
    datosSimb(state)
  }
  ctx.restore()
  ctx.save()
}

function datosPictoric(state) {
  const { ctx } = state
  ctx.save()
  insTitulos(state)
  guidelines(state)
  insChart(state)
  insLeyenda(state)
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
      const { ctx, chart, container, canvas, scale } = state
      const { tags, values, position, axis } = chart
      const { x0, x1, y0, y1 } = position
      ctx.save()

      let centerX, centerY, delta
      let len = valuesTags.length
      let width = (x1 - x0 - chart.style.innerPadding.x*2)
      let barMargin = chart.bars.margin
      let barPadding = barMargin/2
      let barCont = (width - barMargin*len - barPadding*len)/len

      let xPos = x0 + chart.axis.width/2
      let x = chart.style.innerPadding.x + barMargin
      let vardx = barCont + barMargin + barPadding
      
      ctx.font = '14px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      if (chart.orientation == 'vertical') {
        centerY = y1 + chart.axis.width*2
        //delta = barCont + barMargin + barPadding
        for (let i = 0; i < len; i++) {
          let dx = vardx*i
          centerX = xPos + x*1.5 + dx + chart.bars.border.width
          ctx.fillText(valuesTags[i], centerX, centerY)
        }
      } else {
        len = Math.max(...valuesTags) > scale.max ? Math.max(...valuesTags) : scale.max
        centerX = x0 + chart.style.padding.left
        centerY = y1 + chart.axis.width*2
        delta = width/len
        for (let i = scale.min; i <= scale.max; i+= scale.value) {
          ctx.fillText((i), centerX + delta*i - delta/2, centerY)
        }
      }
      
      ctx.restore()
      ctx.save()
    }
    function insValuesY(state, valuesTags) {
      const { ctx, chart, container, canvas, scale } = state
      const { tags, values, position, axis } = chart
      ctx.save()
      
      let height = chart.position.y1 - chart.position.y0 - chart.style.innerPadding.y
      let width = chart.position.x1 - chart.position.x0
      let barCont, len, itemHeight, barMargin, barPadding
      barMargin = chart.bars.margin
      barPadding = barMargin/2
      ctx.font = '14px Arial'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      if (chart.orientation == 'vertical') {
        len = data.lenVal
        barCont = (width - barMargin*chart.tags.length - barPadding*chart.tags.length)/len
        itemHeight = height/(Math.max(...chart.values) > scale.max ? Math.max(...chart.values) : scale.max)
        x0 = chart.position.x0 - (chart.position.x0 - container.position.x0)/4
        y = itemHeight
        y0 = chart.position.y1
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
    
    let width = chart.position.x1 - chart.position.x0
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
    const { ctx, scale, chart } = state
    const { x0, y0, x1, y1 } = chart.position
    ctx.save()

    if(scale.width > 0 && scale.value > 0) {
      ctx.lineWidth = scale.width
      ctx.strokeStyle = scale.color
      ctx.beginPath()
      if (chart.orientation == 'vertical') {
        let height = y1 - y0 - chart.style.innerPadding.y
        let spaceScale = (height/scale.max)*scale.value
        for (let i = scale.min; i <= scale.max; i+=scale.value) {
          ctx.moveTo(x0 + chart.axis.width/2, y1 - spaceScale*i)
          ctx.lineTo(x1 - (x1-x0)*0.02, y1 - spaceScale*i)
        }
      } else {
        let width = x1 - x0 - chart.style.innerPadding.x - (x1-x0)*0.02
        let spaceScale = (width/scale.max)*scale.value
        for (let i = scale.min; i <= scale.max; i+=scale.value) {
          ctx.moveTo(x0 + spaceScale*i, y1 - chart.axis.width/2)
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
    const { ctx, chart } = state
    ctx.save()
    ctx.fillStyle = chart.bars.highlight.color
    xIni = x0 - chart.bars.border.width/2
    xFin = x1 + chart.bars.border.width*2
    yIni = y0 + chart.style.padding.bottom
    yFin = y1 - chart.style.padding.bottom
    xIni *= 1.2
    ctx.fillRect(xIni,yIni,xFin,yFin)
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
    const { ctx, chart, scale } = state
    const { values, tags, position } = chart
    const { x0, y0, x1, y1 } = position
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

    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.font = '14px Arial'
    ctx.fillStyle = ''
    if (chart.orientation == 'vertical') {
      let xPos = chart.position.x0 + barCont
      let yPos = chart.position.y1
      for (let i = 0; i < values.length; i++) {
        if (true/* arr[i] */) { // aquí va el array de las posiciones [true,false,true,true]
          ctx.fillText(values[i], xPos + barCont*i + (barMargin + barPadding)*i, yPos - heightImg*values[i] - heightImg/2)
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
    const { ctx, chart, container, canvas } = state
    const { x0, y0, x1, y1 } = chart.position
    ctx.save()

    let img = new Image()
    img.src = chart.image.src
    img.onload = function() {
      // definimos el ancho y largo de la imagen
      let heightImg = chart.image.caption.font.size*4/Math.max(...chart.values)
      let imageH = chart.image.caption.font.size*3
      let imageW = imageH*4/3
      // se translada el ctx a la posición final del canvas en x y del container en Y
      let xPos = canvas.position.x1
      let yPos = container.position.y0
      //ctx.translate(canvas.position.x1, container.position.y0)
      ctx.font = chart.image.caption.font.weight + ' ' + chart.image.caption.font.size + 'px ' + chart.image.caption.font.family
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      let textVal = " = " + chart.image.caption.value
      let textWidth = ctx.measureText(textVal).width // ancho del texto
      ctx.strokeStyle = 'rgba(183, 183, 183, 0.9)'
      ctx.fillStyle = 'rgba(227, 230, 232, 0.5)'
      // ctx.beginPath()
      // ctx.rect(xPos, yPos, -imageW-textWidth, imageH)
      // ctx.stroke()
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
    const { ctx, chart, scale } = state
    const { x0, y0, x1, y1 } = chart.position
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
    
    let barsSize
    chart.bars.width == 0 ? barsSize = 1 : chart.bars.width == 1 ? barsSize = 0.8 : chart.bars.width == 2 ? barsSize = 0.6 : barsSize = 1

    let x = chart.style.innerPadding.x + barMargin
    let y = chart.style.innerPadding.y + barMargin
    let xPos = x0 + chart.axis.width/2
    let yPos = y1 - chart.axis.width/2
    let borderBar = chart.bars.border.width
    let vardx = barCont + barMargin + barPadding
    let vardy = barCont + barMargin + barPadding

    let img = new Image()
    img.src = chart.image.src
    img.onload = function() {
      // definimos el ancho y largo de la imagen
      let imageH = heightImg
      let imageW = imageH*4/3
      let len
      if (chart.orientation == 'vertical') {
        len = chart.tags.length
        for (let i = 0; i < len; i++) {
          let dx = vardx*i
          let xInit = xPos + x - imageW/2, xFin = imageW
          let yInit = yPos, yFin = -imageH*chart.values[i]-imageH
          let delta = (barCont - barMargin - barPadding)*0.2
          if (chart.bars.highlight.color != '') {
            resaltarBarras(state, xInit + barCont*i + (barMargin + barPadding + chart.bars.border.width)/2*i,yInit, xFin,yFin)
          }
          for (let j = 1; j <= chart.values[i]; j++) {
            ctx.drawImage(img, xPos + x + dx, y1 - imageH*(j) - imageH/2,imageW,imageH)
          }
        }
      } else {
        len = chart.values.length
        let y = chart.style.innerPadding.y + barMargin/2
        let widthSpace = width/(Math.max(...chart.values) > scale.max ? Math.max(...chart.values) : scale.max)
        let heightSpace = height/chart.tags.length
        console.log(heightSpace)
        let countFor;
        for (let i = 0; i < len; i++) {
          let dx = vardx*i
          let dy = vardy*i
          for (let j = 1; j <= chart.values[i]; j++) {
            ctx.drawImage(img, xPos + (widthSpace)*(j) - widthSpace/2, y1 - y - dy,imageW,imageH)
            countFor = j
          }
          if (chart.bars.highlight.color != '') {
            let initX = x0 - chart.style.innerPadding.x/2 - chart.axis.width - chart.style.padding.left
            let initY = y1 - chart.style.padding.bottom - chart.axis.width - chart.style.innerPadding.y - heightSpace*i + heightSpace/2
            let finX = xPos + (widthSpace)*(countFor) - widthSpace/2
            let finY = -heightSpace + barMargin + barPadding
            resaltarBarras(state, initX, initY, finX, finY)
          }
        }
      } 
    }

    ctx.restore()
    ctx.save()

  }
// Chart Functions Pictorcs End
