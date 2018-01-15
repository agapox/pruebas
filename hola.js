function crear2Rectas1Transversal(){

  $(".2rectas1transversal.ready").each(function(){

      $(this).find(".txtRef").remove();

      let anchoLineaPorDefecto = 2;

      let colorPorDefecto = '#00C7CA';

      
      anguloPrincipal = parseInt($(this).attr("data-rotate"));
      rotarPlano = parseInt($(this).attr("data-rotate"));
      rotarPlano === undefined ? rotarPlano = 0 : rotarPlano;
      //radios = eval("[" + $(this).attr("data-radios") + "]");
      letras = $(this).attr("data-letters").split(",");
      if (letras == "") {
        letras = ["E", "F", "G", "H"];
      }
      
      colorRectas = $(this).attr("data-colorrecta");
      colorRectas === undefined ? colorRectas = colorPorDefecto :  colorRectas;
      colorArcos = $(this).attr("data-colorradios").split(",");
      for (let i = 0; i<colorArcos.lengtj; i++) {
        colorArcos === undefined ? $(this).attr("data-colorradios").split(",") : colorArcos = colorPorDefecto;
      }
      colorLetras = $(this).attr("data-colorletras");
      colorLetras === undefined ? colorLetras = colorPorDefecto : colorLetras;
      linesWidth = $(this).attr("data-grosor");
      linesWidth === undefined ? linesWidth = anchoLineaPorDefecto : linesWidth;
      anchoCanvas = $(this).width();
      altoCanvas = $(this).height();
      nId = $(this).attr("data-code");

      htmlCanv = '<canvas id="angulos'+nId+'" width="'+anchoCanvas+'" height="'+altoCanvas+'" style="width:'+anchoCanvas+'px; height:'+altoCanvas+'px;"></canvas>';
      $(this).append(htmlCanv);
      
      c = document.getElementById("angulos"+nId);

      // Setting de width and height of the canvas
      var mainMeasure = altoCanvas < anchoCanvas ? altoCanvas : anchoCanvas;
          
      c.width = mainMeasure;
      c.height = mainMeasure;

      var ctx = c.getContext("2d");


      ctx.translate(mainMeasure/2,mainMeasure/2);

      ctx.rotate(rotarPlano*Math.PI/180);
      // Excersise variables

      var	fontSizeVariables,
          arcsRadius;

      arcsRadius = mainMeasure/7;

      fontSizeVariables = mainMeasure/25;

      // Formato de Texto BEGIN

      // Centrado Horizontal
      ctx.textAlign = "center";
      // Centrado Vertical
      ctx.textBaseline = 'middle';

      // Formato de Texto END

      ctx.lineWidth = linesWidth;
      ctx.strokeStyle = colorRectas;

      ctx.rotate(-90*Math.PI/180);

      // Line1 horizontal
      var line1 =  new Path2D();
      ctx.beginPath(line1);
      line1.moveTo(-mainMeasure/2,0);
      line1.lineTo(mainMeasure/2,0);
      ctx.closePath(line1);
      ctx.stroke(line1);

      // Line2 vertical
      var line2 =  new Path2D();
      ctx.beginPath(line2);
      line2.moveTo(0,-mainMeasure/2);
      line2.lineTo(0,mainMeasure/2);
      ctx.closePath(line2);
      ctx.stroke(line2);

      ctx.strokeStyle = colorArcos;

      // Arco anguloPrincipal
      var arcanguloPrincipal = new Path2D();
      ctx.beginPath(arcanguloPrincipal);
      arcanguloPrincipal.arc(0,0,mainMeasure/5,(90-anguloPrincipal)*Math.PI/180,(90)*Math.PI/180,false)
      ctx.closePath(arcanguloPrincipal);
      ctx.stroke(arcanguloPrincipal);

      // Arco anguloK
      var arcAnguloK = new Path2D();
      ctx.beginPath(arcAnguloK);
      arcAnguloK.arc(0,0,mainMeasure/7,(270)*Math.PI/180,(90-anguloPrincipal)*Math.PI/180,false)
      ctx.closePath(arcAnguloK);
      ctx.stroke(arcAnguloK);

      // Arco anguloF
      var arcAnguloF = new Path2D();
      ctx.beginPath(arcAnguloF);
      arcAnguloF.arc(0,0,mainMeasure/5,(180+(90-anguloPrincipal))*Math.PI/180,(270)*Math.PI/180,false)
      ctx.closePath(arcAnguloF);
      ctx.stroke(arcAnguloF); 

      // Arco anguloH
      var arcAnguloH = new Path2D();
      ctx.beginPath(arcAnguloH);
      arcAnguloH.arc(0,0,mainMeasure/6,90*Math.PI/180,180*Math.PI/180,false)
      ctx.closePath(arcAnguloH);
      ctx.stroke(arcAnguloH);

      ctx.save();

      // nomenclatura anguloPrincipal begin

      ctx.translate(mainMeasure/60+mainMeasure/40*anguloPrincipal/30,mainMeasure/6-mainMeasure/40*anguloPrincipal/30);

      ctx.rotate(-rotarPlano*Math.PI/180);
      ctx.rotate(90*Math.PI/180);


      var nomanguloPrincipal = new Path2D();
      ctx.beginPath(nomanguloPrincipal);
      ctx.font = mainMeasure/18 + 'px Arial';
      ctx.fillStyle = colorLetras;
      ctx.fillText(letras[0],0,0);
      ctx.closePath(nomanguloPrincipal);
      ctx.stroke(nomanguloPrincipal);

      ctx.restore();

      // nomenclatura anguloPrincipal end

      ctx.save();

      // nomenclatura anguloK begin


      ctx.translate(mainMeasure/12,-mainMeasure/20);

      ctx.rotate(-rotarPlano*Math.PI/180);
      ctx.rotate(90*Math.PI/180);

      var nomanguloPrincipal = new Path2D();
      ctx.beginPath(nomanguloPrincipal);
      ctx.font = mainMeasure/18 + 'px Arial';
      ctx.fillStyle = colorLetras;
      ctx.fillText(letras[1],0,0);
      ctx.closePath(nomanguloPrincipal);
      ctx.stroke(nomanguloPrincipal);

      ctx.restore();

      // nomenclatura anguloK End

      ctx.save();

      // nomenclatura anguloF begin

      ctx.translate(-mainMeasure/60-mainMeasure/40*anguloPrincipal/30,-mainMeasure/6+mainMeasure/40*anguloPrincipal/30);

      ctx.rotate(-rotarPlano*Math.PI/180);
      ctx.rotate(90*Math.PI/180);


      var nomAnguloF = new Path2D();
      ctx.beginPath(nomAnguloF);
      ctx.font = mainMeasure/18 + 'px Arial';
      ctx.fillStyle = colorLetras;
      ctx.fillText(letras[2],0,0);
      ctx.closePath(nomAnguloF);
      ctx.stroke(nomAnguloF);

      ctx.restore();

      // nomenclatura anguloF End

      ctx.save();

      // nomenclatura anguloH begin

      ctx.translate(-mainMeasure/12,mainMeasure/12);

      ctx.rotate(-rotarPlano*Math.PI/180);
      ctx.rotate(90*Math.PI/180);


      var nomAnguloH = new Path2D();
      ctx.beginPath(nomAnguloH);
      ctx.font = mainMeasure/18 + 'px Arial';
      ctx.fillStyle = colorLetras;
      ctx.fillText(letras[3],0,0);
      ctx.closePath(nomAnguloH);
      ctx.stroke(nomAnguloH);

      ctx.restore();

      // nomenclatura anguloH End

      ctx.strokeStyle = colorRectas;

      var ctx2 = c.getContext("2d");
      ctx2.rotate(-anguloPrincipal*Math.PI/180);

      // Line3 diagonal con angulo
      var line3 =  new Path2D();
      ctx2.beginPath(line3);
      line3.moveTo(0,-mainMeasure);
      line3.lineTo(0,mainMeasure);
      ctx2.closePath(line3);
      ctx2.stroke(line3);
      
      $(this).removeClass('ready');
  })

}