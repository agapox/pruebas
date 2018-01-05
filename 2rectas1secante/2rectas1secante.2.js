$(document).ready(function() {

  $('button').click(function(ev) {
    ev.preventDefault();
    var valorF = $('#valorF').val();
    var valorH = $('#valorH').val();
    var valorK = $('#valorK').val();

    console.log('valorF ' + valorF);
    console.log('valorH ' + valorH);
    console.log('valorK ' + valorK);    
    
    drawCanvas(valorF,valorK)
  });
  
});


var drawCanvas = function(anguloF, anguloK) {
  var posA=0;
   var posB=0;
  console.log('drawCanvas')
  
   if(anguloK>=110 && anguloK<120)
     {
       let div=0;
       div=anguloK-110;
       posA = 35 + (1.5*div);
       posB=95
     }
    if(anguloK>=120 && anguloK<=140)
     {
       let div=0;
       div=anguloK-120;
       posA = 50 + (3*div);
       posB=95
     }
   if(anguloK>140 && anguloK<=150)
     {
       let div=0;
       div=anguloK-140;
       posA = 110 + (5*div);
       posB=95
     }
    if(anguloK>150 && anguloK<=160)
     {
       let div=0;
       div=anguloK-150;
       posA = 160 + (9*div);
       posB=95
     }
  var c = document.querySelector("canvas");
  
  // Setting de width and height of the canvas
  var mainMeasure = window.innerWidth;
  
  c.width = mainMeasure;
  c.height = mainMeasure;
  
  var ctx = c.getContext("2d");
  
  // Excersise variables
  
  var initAngle = 0,
  linesWidth = 5,
  lineAC,
  lineFD,
  lineBE, // línea secante de AC y FD
  fontSizeVariables;
  
  fontSizeVariables = mainMeasure/24;
  
  lineDemo = new Path2D();
  ctx.beginPath(lineDemo);
  ctx.lineWidth = linesWidth;
  lineDemo.moveTo(-10000,0);
  lineDemo.lineTo(10000,0);
  ctx.closePath(lineDemo);
  ctx.translate(-mainMeasure*0.1,mainMeasure*0.2);
  
  console.log(mainMeasure)
   
  lineAC = new Path2D(lineDemo);
  ctx.beginPath(lineAC);
  ctx.strokeStyle = "blue";
  ctx.stroke(lineAC);
  ctx.closePath(lineAC);
  ctx.translate(mainMeasure*0.9,0);
  // Arcs
  var arcF = new Path2D();
  arcF.arc(0,0,mainMeasure/6,0,-anguloF*Math.PI/180,true);
  ctx.stroke(arcF);
  ctx.font = fontSizeVariables + "px Arial";
  ctx.fillText("F",mainMeasure/11,-mainMeasure/55);
  var arcH = new Path2D();
  arcH.arc(0,0,mainMeasure/6,-anguloF*Math.PI/180,-180*Math.PI/180,true);
  ctx.stroke(arcH);
  ctx.font = fontSizeVariables + "px Arial";
  ctx.fillText("H",-mainMeasure/30,-mainMeasure/55);
  
  lineFD = new Path2D(lineDemo);
  ctx.beginPath(lineFD);
  ctx.rotate(-anguloF*Math.PI/180);
  ctx.strokeStyle = "green";
  ctx.stroke(lineFD);
  ctx.closePath(lineFD);
  ctx.translate(-mainMeasure*0.65,-mainMeasure*0.1);
  
  // Arcs
  var arcK = new Path2D();
  arcK.arc(posA,posB,mainMeasure/8,0,-(anguloK)*Math.PI/180,true);
  ctx.stroke(arcK);
  ctx.strokeStyle = "red";
  var arcJ = new Path2D();
  arcJ.arc(posA,posB,mainMeasure/8,-(180-anguloK)*Math.PI/180-(anguloK)*Math.PI/180,(180-anguloK)*Math.PI/180,true);
  ctx.stroke(arcJ);
  
  ctx.font = fontSizeVariables + "px Arial";
  ctx.fillText("K",posA+10,posB-10);
  ctx.font = fontSizeVariables + "px Arial";
  ctx.fillText("J",posA-30,posB+50);
  
  lineBE = new Path2D(lineDemo);
  ctx.beginPath(lineBE);
  ctx.rotate(-anguloK*Math.PI/180);
  ctx.stroke(lineBE)
  ctx.stroke()
  ctx.closePath(lineBE);
  
  

}