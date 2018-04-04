var c = document.getElementById("canvas");

console.log(c.width)
console.log(c.height)

let state = {}
state.ctx = c.getContext("2d")
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
  padding: { top: 40, right: 40, bottom: 40, left: 40 },
  //margin: { top: 0, right: 0, bottom: 0, left: 0 }
}

state.canvas.position = {
  x0: state.canvas.padding.left,
  y0: state.canvas.padding.top,
  x1: c.width - (state.canvas.padding.right),
  y1: c.height - (state.canvas.padding.top) 
}
console.log(state.canvas.position)

state.container = {
  padding: { top: 20 + state.titles.mainTitle.font.size, right: 20, bottom: 20 + state.titles.titleX.font.size, left:20 + state.titles.titleY.font.size },
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
    padding: { top: 30, right: 30, bottom: 30, left: 30 }
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
    src: 'https://vignette.wikia.nocookie.net/mario-fanon/images/4/48/Paper_mario.png/revision/latest/scale-to-width-down/640?cb=20131117112706&path-prefix=es'
  }
}
state.chart.position = { 
  x0: state.container.position.x0 + state.chart.style.padding.left,
  y0: state.container.position.y0 + state.chart.style.padding.top,
  x1: state.container.position.x1 - (state.chart.style.padding.right),
  y1: state.container.position.y1 - (state.chart.style.padding.bottom)
}
console.log(state.chart.position.y1)

drawRect(state.chart.position.x0,state.chart.position.y0,state.chart.position.x1-state.chart.position.x0,state.chart.position.y1-state.chart.position.y0)
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
pictoricEx(state)

function pictoricEx(state) {
  insTitulo(state)
  insChart(state)
}


// chart functions Begin

  function insTitulo(state) {
    const { ctx } = state
    ctx.save()

    insMainTitle(state)
    insTitleX(state)
    insTitleY(state)

    ctx.restore()
    ctx.save()

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
  function insBarras(state) {
    const { ctx } = state
    ctx.save()
    console.log('insBarras')

    ctx.restore()
    ctx.save()
  }

// chart functions End