var c = document.getElementById("canvas");

let state = {
  ctx: c.getContext("2d"),
  canvas: {
    height: c.height,
    width: c.width
  },
  chart: {
    axis: {
      width: 4,
      color: 'red',
      arrowX: true,
      arrowY: true
    },
    width: c.width,
    height: c.height
  }
}

pictoricEx(state)

function pictoricEx(state) {
  insChart(state)
}

function updateCanvas(state) {

}

function insChart(state) {
  const { width, height } = state.chart
  insEjes(state, 10, 10, width-10, height-10)  
  
  function insEjes(state, x0, y0, x1, y1) {
    const { ctx, chart } = state
    const { height, width } = state.canvas
    const { axis } = state.chart
    ctx.save()
    ctx.lineWidth = axis.width
    ctx.strokeStyle = axis.color
    ctx.beginPath()
    ctx.moveTo(x0,y0)
    ctx.lineTo(x0,y1)
    ctx.lineTo(x1,y1)
    ctx.stroke()
    ctx.restore()
    ctx.save()

    insFlechas(state, x0, y0, x1, y1)

    function insFlechas(state, x0, y0, x1, y1) {
      const { ctx, chart } = state
      const { axis } = state.chart
      ctx.save()
      ctx.lineWidth = axis.width*0.8
      ctx.strokeStyle = 'green'
      let delta = chart.width*0.035
      ctx.beginPath()
      ctx.moveTo(x0 - delta,y0 + delta)
      ctx.lineTo(x0,y0)
      ctx.lineTo(x0 + delta,y0 + delta)
      ctx.moveTo(x1 - delta,y1 + delta)
      ctx.lineTo(x1,y1)
      ctx.lineTo(x1 - delta,y1 - delta)
      ctx.stroke()
      ctx.restore()
      ctx.save()
    }
  }
}
