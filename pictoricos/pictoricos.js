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
  max: 10
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
      img: {}
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
    color: 'rgba(21, 216, 10,0.8)',
    highlight: {
      color: 'rgba(99, 99, 99, 0.5)'
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

state.chart.image.height = (state.chart.position.y1 - state.chart.position.y0)*0.4

console.log(state.scale.max)
//drawRect(state.chart.position.x0,state.chart.position.y0,state.chart.position.x1-state.chart.position.x0,state.chart.position.y1-state.chart.position.y0)
drawRect(state.canvas.position.x0,state.canvas.position.y0,state.canvas.position.x1-state.canvas.position.x0,state.canvas.position.y1-state.canvas.position.y0)
drawRect(state.container.position.x0,state.container.position.y0,state.container.position.x1-state.container.position.x0,state.container.position.y1-state.container.position.y0)
// drawRect(state.canvas.position)
// drawRect(state.container.position)
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
  if (true) {
    datosPictoric(state)
  } else {
    datosSimb(state)
  }
}

function datosPictoric(state) {
  insTitulos(state)
  insChart(state)
  insPic(state)
  insLeyenda(state)
}
function datosSimb(state) {
  insTitulos(state)
  insChart(state)
  guidelines(state)
  insBarras(state)
  insEtqDatos(state)
}


// chart functions Begin

  function insTitulos(state) {
    const { ctx } = state
    ctx.save()

    insMainTitle(state)
    insTitleX(state)
    insTitleY(state)

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
  function insTitleX(state) {
    const { ctx, chart, canvas } = state
    const { mainTitle, titleX, titleY } = state.titles
    ctx.save()

    let x = (chart.position.x1 - chart.position.x0)/2 + titleX.move.moveX + chart.position.x0
    let y = 0 + canvas.position.y1 - titleX.move.moveY
    ctx.translate(x,y)
    ctx.fillStyle = titleX.color
    ctx.textAlign = titleX.alignX
    ctx.textBaseline = titleX.alignY
    ctx.font = titleX.font.weight + ' ' + titleX.font.size + 'px ' + titleX.font.family
    ctx.fillText(titleX.title, 0, 0)

    ctx.restore()
    ctx.save()
  }
  // Title Y
  function insTitleY(state) {
    const { ctx, chart, canvas } = state
    const { mainTitle, titleX, titleY } = state.titles
    ctx.save()

    let x = canvas.position.x0 + titleY.move.moveX
    let y = 0 + (chart.position.y1 - chart.position.y0)/2 + chart.position.y0 - titleY.move.moveY
    ctx.translate(x,y)
    ctx.fillStyle = titleY.color
    ctx.rotate(-90*Math.PI/180)
    ctx.textAlign = titleY.alignX
    ctx.textBaseline = titleY.alignY
    ctx.font = titleY.font.weight + ' ' + titleY.font.size + 'px ' + titleY.font.family
    ctx.fillText(titleY.title, 0, 0)

    ctx.restore()
    ctx.save()
  }
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

    ctx.beginPath()
    ctx.lineWidth = axis.width
    ctx.strokeStyle = axis.color
    ctx.beginPath()
    ctx.moveTo(x0,y0)
    ctx.lineTo(x0,y1)
    ctx.lineTo(x1,y1)
    ctx.stroke()
    
    ctx.restore()
    ctx.save()
  } // End insEjes
  function insFlechas(state, x0, y0, x1, y1) {
    const { ctx, chart } = state
    const { axis } = chart
    ctx.save()

    ctx.beginPath()
    ctx.lineWidth = axis.width
    ctx.strokeStyle = axis.arrowColor
    //ctx.lineCap = "round"; round, square, butt
    ctx.lineJoin="round"; // bevel, round, miter

    let width = chart.position.x1 - chart.position.x0
    let deltaLength = width*0.025
    let deltaIncl = deltaLength*0.7

    if (axis.arrowX) {
      ctx.moveTo(x0 - deltaIncl,y0 + deltaLength)
      ctx.lineTo(x0,y0)
      ctx.lineTo(x0 + deltaIncl,y0 + deltaLength)
    }
    ctx.stroke()
    if (axis.arrowY) {
      ctx.moveTo(x1 - deltaLength,y1 + deltaIncl)
      ctx.lineTo(x1,y1)
      ctx.lineTo(x1 - deltaLength,y1 - deltaIncl)
    }
    ctx.stroke()

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
      let height = y1 - y0 - chart.style.innerPadding.y
      let spaceScale = (height/scale.max)*scale.value
      for (let i = scale.min; i <= scale.max; i+=scale.value) {
        ctx.beginPath()
        ctx.moveTo(x0 + chart.axis.width/2, y1 - spaceScale*i)
        ctx.lineTo(x1 - (x1-x0)*0.02, y1 - spaceScale*i)
        ctx.stroke()
        ctx.closePath()
      }
    }
    ctx.restore()
    ctx.save()
  }
  function insBarras(state) {
    const { ctx, chart, scale } = state
    const { x0, y0, x1, y1 } = chart.position

    ctx.save()
    
    let width = (x1 - x0 - chart.style.innerPadding.x*2)
    let height = (y1 - y0 - chart.style.innerPadding.y - chart.axis.width/2)
    let barMargin = 30
    let barPadding = barMargin/2
    let barCont = (width - barMargin*chart.tags.length - barPadding*chart.tags.length)/chart.tags.length

    // let spaceWidth = (width)/chart.tags.length
    // let spaceWidthPadding = spaceWidth*0.05
    // let barsWidth = spaceWidth - spaceWidthPadding

    let barsSize
    chart.bars.width == 0 ? barsSize = 1 : chart.bars.width == 1 ? barsSize = 0.8 : chart.bars.width == 2 ? barsSize = 0.6 : barsSize = 1

    let dy = scale.max == Math.max(...chart.values) ? height / Math.max(...chart.values) : height / scale.max
    let x = chart.style.innerPadding.x + barMargin
    ctx.translate(x0,y1 - chart.axis.width/2)
    let borderBar = chart.bars.border.width
    let vardx = barCont + barMargin + barPadding
    for (let i = 0; i < chart.values.length; i++) {
      let dx = vardx*i
      resaltarBarras(state, x+dx,0,barCont - borderBar,-dy*chart.values[i], barPadding)

      ctx.fillStyle = chart.bars.color
      ctx.beginPath()
      ctx.rect(x + dx + borderBar/2,0,barCont - borderBar,-dy*chart.values[i])
      ctx.closePath()
      ctx.fill()
      if (borderBar > 0) {
        ctx.beginPath()
        ctx.lineWidth = borderBar
        ctx.strokeStyle = chart.bars.border.color
        ctx.moveTo(x + dx,0)
        ctx.lineTo(x + dx,-dy*chart.values[i])
        ctx.lineTo(x + dx,-dy*chart.values[i])
        ctx.lineTo(x + dx + barCont - borderBar,-dy*chart.values[i])
        ctx.lineTo(x + dx + barCont - borderBar,0)
        ctx.stroke()
      }
      
    }

    ctx.restore()
    ctx.save()
  }
  function insEtqDatos(state) {
    console.log('insEtqDatos')
    const { ctx } = state

  }
  function resaltarBarras(state, x0,y0,x1,y1, dist) {
    const { ctx, chart } = state
    ctx.save()
    xIni = x0 - chart.bars.border.width/2 - dist
    xFin = x1 + chart.bars.border.width + dist*2
    yIni = y0 + chart.style.padding.bottom
    yFin = y1 - chart.style.padding.bottom*2
    ctx.fillStyle = chart.bars.highlight.color
    ctx.fillRect(xIni,yIni,xFin,yFin)
    ctx.restore()
    ctx.save()
  }
// chart functions End

// Chart Functions Pictorcs Begin
  function insPic(state) {
    console.log('insPic')
  }
  function insLeyenda(state) {
    const { ctx, chart, container } = state
    ctx.save()
    ctx.beginPath()
    console.log('insLeyenda')
    let img = new Image()
    img.src = chart.image.src

    capH = chart.image.height*3/4
    capW = chart.image.height
    ctx.translate(container.position.x1, container.position.y0)
    ctx.strokeStyle = '#fff'
    ctx.rect(0, 0, -capW,capH)
    ctx.stroke()

    let imageW = capW
    let imageH = imageW*3/4
    let imgCont = 
    img.onload = function() {
      ctx.translate(container.position.x1 - imageW, container.position.y0 + capH/2 - imageH/2)
      ctx.drawImage(img, -imageW, 0,imageW,imageH)
      ctx.translate(-10,-10)
      ctx.font = 'bold 16px Arial'
      ctx.fillStyle = 'red'
      ctx.textBaseline = 'bottom'
      ctx.fillText("= " + chart.image.caption.value,10,50);
    }

    ctx.restore()
    ctx.save()
  }
// Chart Functions Pictorcs End