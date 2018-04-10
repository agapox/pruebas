var numeroIntento = 1;
var hiddenParent = window.parent.parent.varHidden; //Comunicacón con frame para resolver ejercicio
var hiddenTutorial = window.parent.parent.varTutorial; //Comunicacón con frame por video tutorial
var hiddenSegundoError = window.parent.parent.varSegundoError; //Comunicacón con frame Segundo error
var hiddenCierraFeed = window.parent.parent.cerrarFeedbackHijo; //Comunicacón con frame Segundo error
var hiddenPressConsulta = window.parent.parent.pressConsulta; //Comunicacón con frame Segundo error
var respCorrecta = ["¡Muy bien!","¡Lo has logrado!","¡Genial!","¡Así se hace!"];

var arrCorrecta = ["PatoFeedBack_00007.png","PataFeedBack_00007.png"];//Imagen feedback si es correcto
var rando = Math.floor((Math.random() *  arrCorrecta.length));	

var arrGlosa = ["PatoFeedBack_00001.png","PataFeedBack_00001.png"];//Imagen Glosa
var randoom = Math.floor((Math.random() *  arrGlosa.length));	

var arrImgOk = [];
for (var ind = 1; ind < 4; ind++) { 
	arrImgOk.push("PataFeedBack_0000"+ind+".png");
}
for (var ind = 1; ind < 4; ind++) { 
	arrImgOk.push("PatoFeedBack_0000"+ind+".png");
}										
	
function enviar(){	
	var ranOk = Math.floor(Math.random() *  respCorrecta.length);	
	var ran = Math.floor((Math.random() *  arrImgOk.length) + 1);
	
	var patron = /([0-9])/g;
	var he1 = $("#spanFeedBack").css('height');
	var he2 = $("#bubble").css('height');
	
	var wi1 = $("#spanFeedBack").css('width');
	var wi2 = $("#bubble").css('width');

	if(parseInt(he1) > parseInt(he2)){
		$("#bubble").css('height','100%');	
		$("#spanFeedBack").css('font-size','110%');	
	}else{
		$("#bubble").css('height','110px');	
		$("#spanFeedBack").css('font-size','150%');
	}

	var fechaTerminoIntento = new Date();
	var vercionEjercicio = window.location.href.substring(window.location.href.search(idEjercicio)+(String(idEjercicio).length+1),window.location.href.search(".html"));
	
	Date.prototype.yyyymmdd = function() {
	  var mm = this.getMonth() + 1; // getMonth() is zero-based
	  var dd = this.getDate();

	  return [this.getFullYear(),
			  (mm>9 ? '' : '0') + mm,
			  (dd>9 ? '' : '0') + dd
			 ].join('-');
	};

	var date = new Date();
	
	/*---captura valore de los elementos-----*/
		var values = "";		
		$('input').each(function() {
			if($(this).attr("type") == "radio"){
				values = "Valor radio= "+ $("input[name=grupoRdo1]:checked").val();
				return;
			}else{
				values += " IDInput= "+this.id +" valor= "+$(this).val();		
			}

		});
		
		$('select').each(function(){
			values +=  "Valor select= "+ $("#"+this.id+"option:selected").val();
		});		
	/*---------------------------------------*/
	
	var envioIntento = JSON.stringify({ "idejercicioversion":vercionEjercicio,"escorrecta" : 0, "estarea" : 0 , "idtareaiematricula" :0 , "tiempoInicio" : ""+date.yyyymmdd()+" "+fechaEntrada+"", "tiempoRespuesta" : ""+date.yyyymmdd()+" "+fechaTerminoIntento.toLocaleTimeString()+"", "feedback": ""+$("#spanFeedBack").text()+"" , "codigoErrorComun" : ""+errFre+"", "respuesta": ""+values+"","glosa":glosa });
	
	//Oculta btn Respondar para no enviar otra petición
	$("#imagenBotonRespuesta").css("visibility","hidden");
	
	if($("#spanFeedBack").text() == "Respuesta Correcta"){
		$(".imgFeed").attr("src","https://desarrolloadaptatin.blob.core.windows.net/feedbacksimg/"+arrCorrecta[rando]);	
		//EJERCICIO CORRECTO
		$("#spanFeedBack").text(respCorrecta[ranOk]);
		$("#imagenBotonRespuesta").css("visibility","visible");
		$("#bubble").css("text-align","center");	
		$("#imagenBotonRespuesta").parent().css("background-color","#3CB371");
		$("#imagenBotonRespuesta").parent().html('<img align="left" id="imagenBotonRespuesta" src="https://desarrolloadaptatin.blob.core.windows.net/iconosimg/botones/ok2.png" width="50px" height="50px" style="cursor:pointer;z-index:999;margin-left:30px;" onclick="siguiente()">');
	
	}else if(numeroIntento == 2 && $("#spanFeedBack").text() != "Respuesta Correcta"){
		$(".imgFeed").attr("src","https://desarrolloadaptatin.blob.core.windows.net/feedbacksimg/"+arrGlosa[randoom]);
		//GLOSA		
		$("#divGeneralFeed").css('height', '100%');
		$("#divGeneralFeed").css("margin-top","2%");
		$("#spanFeedBack").html(glosa);
		$("#spanFeedBack").attr('style','font-size: 147%;overflow-y:auto;height:75%;margin-top:-20px;width:95%;');				
		$(".div1Feed").css("top","5%");
		$("#bubble").css("width","70%");
		$("#bubble").css('z-index', '9999999');			
		if(glosa.length > 200){
			$("#bubble").css('height', "70%");
		}else{
			$("#bubble").css('height', "35%");
		}
		$("#imagenBotonRespuesta").parent().html('<img align="right" id="imagenBotonRespuesta" src="https://desarrolloadaptatin.blob.core.windows.net/iconosimg/botones/Siguiente_Generico" style="cursor:pointer;z-index:999;" onclick="sgteGlosa()">');
		$("#imagenBotonRespuesta").css("visibility","hidden");
		$(".btnFeedBackCerrar").attr("onClick","cerrarFeedGlosa();");//Btn cerrar feedback segundo error.	

		/*Glosa con más contenido*/
		if($("#spanFeedBack").children().length >= 1){
			if($("#spanFeedBack").children()[0].id == "idDivImageCont1"){
				var hijoConImagen = $("#spanFeedBack").children()[0];
				$("#spanFeedBack").css("padding","10px");
				$(hijoConImagen).removeAttr("style");
				$(hijoConImagen).attr("style","position: absolute; left: 15%;padding: 10px;");
			}else{
				$("#spanFeedBack").css("margin-top","-22px");
				$("#bubble").css("height","95%");			
			}			
		}	
		/*Fin glosa con más contenido*/
		DatosX()
		datosPicto()
		conteoEnTablas()
	}else{
		$(".imgFeed").attr("src","https://desarrolloadaptatin.blob.core.windows.net/feedbacksimg/"+arrImgOk[ran-1]);	
	}
	/*----Comunicacion de frame a página padre----*/
	$(hiddenParent).val(envioIntento).trigger('change');
	/*--------------------------------------------*/
	numeroIntento++;	
	$('body').find("input").each(function() {
		if($(this).attr("type") == "text" || $(this).attr("type") == "number"){
			$(this).val("");
		}
	});

	// llamadas a las funciones del eje 5
	
}
function validaNumero(elEvento){ 
	var evento = window.event || elEvento;
	var teclaPresionada = String.fromCharCode(evento.charCode);
	var soloFlechas = evento.charCode;
	if(soloFlechas == 37 || soloFlechas == 38 || soloFlechas == 39 || soloFlechas == 40){
		return false;
	}
	var soloNumero = new RegExp(/[0-9]/g);
	if(!soloNumero.test(teclaPresionada) || $(elEvento).val().length > 8){
		evento.preventDefault();
	}		
}
function validaFormato(elemento){ 
	var sinEspacios = $(elemento).val().replace(/ /g,"");
	var array = sinEspacios.split("");
	var res = "";		
	
	if(sinEspacios.length <= 3){
		$(elemento).val(sinEspacios);
		return false;
	}
	
	if(sinEspacios.length == 5){
		$(array).each(function(i){
			if(i == 2){
				res += " "+this;
			}else{
				res += this;
			}
		});
		$(elemento).val(res);
		return false;
	}
	if(sinEspacios.length == 6){
		$(array).each(function(i){
			if(i == 3){
				res += " "+this;
			}else{
				res += this;
			}
		});
		$(elemento).val(res);
		return false;
	}		
	
	if(sinEspacios.length == 4){
		$(array).each(function(i){
			if(i == 1){
				res += " "+this;
			}else{
				res += this;
			}
		});
		$(elemento).val(res);
		return false;
	}			
			
	if(sinEspacios.length == 7){
		$(array).each(function(i){
			if(i == 1 || i == 4){
				res += " "+this;
			}else{
				res += this;
			}
		});
		$(elemento).val(res);
		return false;
	}		
}	
function limpiarVista(){
	var domain = window.location.href.replace('http://','').replace('https://','').split(/[/?#]/)[0];
	if(domain != "testing.adaptativamente.cl"
		|| domain != "cursos.adaptativamente.cl"
		|| domain != "preprod.adaptativamente.cl"
		|| domain != "desarrollo.adaptativamente.cl"){
				$("#imagenBotonRespuesta").css("visibility","visible");
		}
	var htmlLocal = $("body");
	$(htmlLocal).find("input").each(function(){
			if($(this).attr("type") == "text" || $(this).attr("type") == "number" ){
					$(this).val("");
			}
			if($(this).attr("type") == "radio" && $(this).prop("checked") == true){
					$(this).prop("checked",false)
			}
	}); 
	$(htmlLocal).find("select").each(function(){
			$('select option:first-child').attr("selected", "selected");
	});                 
}
function cerrarFeed(){
	$("#divGeneralFeed").hide();
	//$("#imagenBotonRespuesta").css("visibility","visible");
	limpiarVista();
	$(hiddenCierraFeed).val(true).trigger('change');        
}
function pressConsulta(){
	$(hiddenPressConsulta).val("1").trigger('change');	
}
function cerrarFeedGlosa(){
	$(hiddenSegundoError).val(true).trigger('change');
	//$(hiddenCierraFeed).val(true).trigger('change');
}
function siguiente(){}
function sgteGlosa(){
	$("#imagenBotonRespuesta").css("visibility","hidden");	
	$(hiddenTutorial).val(true).trigger('change');
}

/*---------VALIDACIÓN INGRESO A EJERCICIO--------*/

	/*document.addEventListener('contextmenu', event => event.preventDefault());

	$(document).keydown(function(event){ // previene f12
			if(event.keyCode==123){
				return false;
			}
			else if(event.ctrlKey && event.shiftKey && event.keyCode==73){        
				return false;  //previene ctrl+shift+i
			}
			else if(event.ctrlKey && event.keyCode==85){        
				return false;  //previene control u
			}
			else if(event.ctrlKey && event.keyCode==67){        
				return false;  //previene control c
			}
			else if(event.ctrlKey && event.keyCode==74){        
				return false;  //previene control j
			}
			else if(event.shiftKey && event.keyCode==123){        
				return false;  //previene shift+f12 (firefox)
			}
			else if(event.ctrlKey && event.shiftKey && event.keyCode==81){        
				return false;  //previene contro+shift+q (firefox)
			}
			else if(event.shiftKey && event.keyCode==118){        
				return false;  //previene shift+f7 (firefox)
			}	
			else if(event.ctrlKey && event.shiftKey && event.keyCode==75){        
				return false;  //previene ctrl+shift+k (firefox)
			}	
			else if(event.ctrlKey && event.shiftKey && event.keyCode==74){        
				return false;  //previene ctrl+shift+j (firefox)
			}	
			else if(event.ctrlKey && event.shiftKey && event.keyCode==83){        
				return false;  //previene ctrl+shift+s (firefox)
			}	
			else if(event.ctrlKey && event.shiftKey && event.keyCode==67){        
				return false;  //previene ctrl+shift+c (firefox)
			}		
			else if(event.keyCode==27){        
				return false;  //previene escape(Opera)
			}
	});	
		*/
/*---------------FIN VALIDACIÓN INGRESO  ---------------------*/	

var footer = $("#imagenBotonRespuesta").parent();
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
$( document ).ready(function() {
	$(".imgFeed").attr("src","");
	//Sin contenedor no se puede visualizar el ejercicio y se elimina el script
	/*if(hiddenParent == undefined){ 
		$("#divCreacionHtml").remove();
		var x = document.getElementsByTagName("SCRIPT");
		$(x).each(function(){
			if($(this).text().search("glosa") != -1){
				$(this).remove();
			}
		});
	}*/
	$("body").append("<input type='hidden' id='hiddenIntento' value='hiddenIntento' onChange='cambio(this)'>");
	
	/*---Add Estilo a footer y botón consulta---*/
		$(footer).css("padding",".75rem")
		$(footer).css("background","#FAEDC3")
		$(footer).css("border-top","4px solid #05366A")
		$(footer).prepend("<div id='consulta' onClick='pressConsulta();' style=\"position:relative;left:-370px;content: '';display: inline-block;vertical-align: middle;width: 42px;height: 42px;border-radius: 42px;margin-right: .5rem;background-color: #fff;background-repeat: no-repeat;background-position: 50% 50%;background-size: 60%;background-image: url('https://desarrolloadaptatin.blob.core.windows.net:443/iconosimg/botones/btn_consulta.svg');border: 2px solid #05366A; cursor:pointer;\"><span onClick='pressConsulta();' class='spanConsulta' >Consulta</span></div>");
	/*-- Fin Add Estilo a footer y botón consulta*/
	
	$(".glyphicon-remove-circle").removeAttr("style");
    $(".glyphicon-remove-circle").css("font-size","x-large");
	$("body").css("height","551px");
	$("body").css("width","980px");
	$("#divCreacionHtml").css("width","960px");
	$("#divCreacionHtml").css("height","541px");
	$("#divCreacionHtml").css("background-color","#FFFFFF");	
	$("select").css("font-size","16px");	if($("select").attr("slcFlag") == "OA3IE1"){ 			$("select").css("font-size","19px"); 	}
	
	
	if($(".labelGrupoRdo").length > 0){
		var arrRadios = [], flag = 0;
		$("#rdoButtonsDiv1").children().each(function(i){	
			if($(this).prop("tagName") == "INPUT" && $(this).next().prop("tagName")== "LABEL"){
				flag = 1 ;
				var nxt = $(this).next();
				var txt = this.outerHTML + " " + $(nxt)[0].outerHTML + "<br>";
				arrRadios.push(txt);
			}			
		});	
		if(flag == 1){
			$("#rdoButtonsDiv1").html("");
			shuffle(arrRadios);	
			$(arrRadios).each(function(i,v){
				$("#rdoButtonsDiv1").append(v);
			});
		}
		if($("#divCreacionHtml").attr("template") == 5){
			$("#divCreacionHtml").find(".labelGrupoRdo").each(function(i){	
				if(i == 1) 	$(this).text("A. "+$(this).text());
				if(i == 0) 	$(this).text("B. "+$(this).text());
				if(i == 2) 	$(this).text("C. "+$(this).text());
				if(i == 3) 	$(this).text("D. "+$(this).text());
			});	
		}else{
			$("#divCreacionHtml").find(".labelGrupoRdo").each(function(i){	
				if(i == 0) 	$(this).text("A. "+$(this).text());
				if(i == 1) 	$(this).text("B. "+$(this).text());
				if(i == 2) 	$(this).text("C. "+$(this).text());
				if(i == 3) 	$(this).text("D. "+$(this).text());
			});	
		}

	}
	
});

function cambio(elemento){
	numeroIntento = $(elemento).val();	
}
function selInput(){}
function selecCbo(){}

/* Datos Gráficos */
function DatosX2() { 

	let clase = $(".datos-r1").attr('class', 'text-center datos-r1')  

	clase.each((index, item) => {

			$(item).find(".txtRef").remove()

			let id = $(item).attr("id").replace('htmlDatos', ''),
					datos = $("#htmlDatos"+id), values = [], tags = [],
					position = datos.attr("grafPos"), max = 0,
					html = '<canvas id="canvas'+id+'" ></canvas>'            
			datos.append(html)

			values = datos.attr("grafVal").split(',')
			tags = datos.attr("grafTags").split(',')
			
			let board = $("#canvas"+id)[0]
			board.width = Number.parseInt(datos.attr("canvasAncho"))
			board.height = Number.parseInt(datos.attr("canvasAlto"))

			
			
			let state = {
				ctx: board.getContext('2d'),
				canvas: {
					ctx: board.getContext('2d'),
					border: {
						width: datos.attr("bordeAncho"),
						style: datos.attr("bordeEstilo"), // 'dotted','dashed','solid','double','groove','ridge','inset','outset','none','hidden'
						color: datos.attr("bordeColor"),
						radius: datos.attr("bordeRadius"),
						margin: datos.attr("canvasMargen")
					},
					color: datos.attr("canvasFondo"),
					height: board.height - 15,
					width: board.width - 5,
					padding: {
						top: board.height*0.01,
						right: board.width*0.01,
						bottom: board.height*0.01,
						left: board.width*0.01
					}
				},
				chart: {
					axis: {
						color: datos.attr("AxisColor"),
						width: datos.attr("AxisAncho")
					},
					style: {
						border: {
							color: datos.attr("grafBarBorCol"),
							width: 2
						},
						color: datos.attr("grafBarColor").split(','),
						margin: { x:board.width*0.1, y:board.height*0.1 },
						padding: { x:board.width*0.07, y:board.height*0.07 },
						dataPadding: { x:board.width*0.05, y:board.height*0.05 },
						withArrowsX: eval(datos.attr("conFlechasX")),
						withArrowsY: eval(datos.attr("conFlechasY")),
					},
					position: position,
					length: values.length,
					tags: tags,
					values: values,
					dataTags: datos.attr("grafDataTags"),
					projection: {
						//projection: eval(datos.attr("conProyeccion")) == '1' ? true : false,
						values: datos.attr("ProyeccionVal"),
					},
					limit: {
						//limit: eval(datos.attr("conLimite")) == '1' ? true : false,
						values: datos.attr("limiteVal"),
					},
					highlightBar: {
						values: datos.attr("hightLightBar").split(","),
						color: '#d4e6c0'
					},
					line: {
							color: datos.attr("lineaColor"), //#d4e6c0
							width: datos.attr("lineaAncho")
					},
					scale: {
						max: eval(datos.attr("escalaMax")),
						min: eval(datos.attr("escalaMin")),
						interval: datos.attr("escalaInterval") == '0' ? 'auto':  eval(datos.attr("escalaInterval")),
						color: datos.attr("escalaColor"),
						width: eval(datos.attr("escalaAncho"))
					},
				},
				font: {
					family: datos.attr("fuenteGraf") == '0' ? 'Larke Neue Thin' : 'Arial',
					alignX: 'center',
					alignY: 'middle',
					color: datos.attr("fuenteColor"),
					size: eval(datos.attr("fuenteTam"))
				},
				titles: {
					mainTitle: {
						style: {
							margin: {top: eval(datos.attr("tituloGrafTop")), right: 0, bottom: datos.attr("tituloGrafTop")*0.7, left: 0},
							color: datos.attr("tituloGrafColor"),
							font: {
								family: datos.attr("fuenteGraf") == '0' ? 'Larke Neue Thin' : 'Arial',
								alignX: 'center',
								alignY: 'top', // ['top','hanging','middel','alphabetic','ideographic','bottom']
								color: datos.attr("fuenteColor"),
								size: eval(datos.attr("tituloGrafSize")),
							},
						},
						title: datos.attr("tituloGraf")
					},
					titleX: {
						style: {
							margin:{top: 5, right: 0, bottom: 5, left: 0},
							color: datos.attr("tituloGrafColor"),
							font: {
								family: datos.attr("fuenteGraf") == '0' ? 'Larke Neue Thin' : 'Arial',
								alignX: 'center',
								alignY: 'bottom', // ['top','hanging','middel','alphabetic','ideographic','bottom']
								color: datos.attr("fuenteColor"),
								size: eval(datos.attr("tituloGrafSize"))*0.85,
							},
						},
						title: datos.attr("AxisTitX")
					},
					titleY: {
						style: {
							margin:{top: 0, right: 5, bottom: 0, left: 5},
							color: datos.attr("tituloGrafColor"),
							font: {
								family: datos.attr("fuenteGraf") == '0' ? 'Larke Neue Thin' : 'Arial',
								alignX: 'center',
								alignY: 'top', // ['top','hanging','middel','alphabetic','ideographic','bottom']
								color: datos.attr("fuenteColor"),
								size: eval(datos.attr("tituloGrafSize"))*0.85,
							},
						},
						title: datos.attr("AxisTitY")
					},
					tags: {
						style: {
							margin: {top: eval(datos.attr("tituloGrafTop")), right: 0, bottom: datos.attr("tituloGrafTop")*0.7, left: 0},
							color: datos.attr("tituloGrafColor"),
							font: {
								family: datos.attr("fuenteGraf") == '0' ? 'Larke Neue Thin' : 'Arial',
								alignX: 'center',
								alignY: 'bottom', // ['top','hanging','middel','alphabetic','ideographic','bottom']
								color: datos.attr("fuenteColor"),
								size: eval(datos.attr("fuenteTam")),
							},
						},
						title: tags
					},
					values: {
						style: {
							margin: {top: eval(datos.attr("tituloGrafTop")), right: 0, bottom: datos.attr("tituloGrafTop")*0.7, left: 0},
							color: datos.attr("tituloGrafColor"),
							font: {
								family: datos.attr("fuenteGraf") == '0' ? 'Larke Neue Thin' : 'Arial',
								alignX: 'right',
								alignY: 'top', // ['top','hanging','middel','alphabetic','ideographic','bottom']
								color: datos.attr("fuenteColor"),
								size: eval(datos.attr("fuenteTam")),
							},
						},
						title: values
					}
				}
			}

			let anchoTag = []

			state.chart.tags.map(tag => {
				anchoTag.push(state.canvas.ctx.measureText(tag).width)
			})
			anchoTag = Math.max(...anchoTag)
			
			const { chart, canvas } = state
			chart.position == 'horizontal' ? chart.style.margin.x += anchoTag : false 
			const { x, y } = chart.style.margin
			
			$("#canvas"+id).attr('style', 'border:'+canvas.border.width+'px solid '+canvas.border.color+'; border-radius:'+canvas.border.radius
			 		+'px; margin: 0 auto; background: '+canvas.color) 

			let data = {
				ctx: canvas.ctx, height: canvas.height - 2*y, len: chart.length, 
				max: Math.max(...chart.values), width: canvas.width - 2*(x + 10), x0: x, y0: canvas.height - y,
				dx: Math.min(Math.floor((canvas.width - 2*(x + 10))/(3/2*chart.length)), 100),
				dy: Math.min(Math.floor((canvas.height - 2*(y - 5))/(4/3*chart.length)), 60)
			}
				
			data.cx = data.x0 + 2*chart.style.padding.x + data.width/data.len/2 - data.dx/2
			data.cy = data.y0 - chart.style.padding.y - data.height/data.len/2 - data.dy/2    

			data.ctx.translate(0, canvas.margin == 'si' ? 0 : 10)
			data.ctx.save()

			

			initCanvas(state)
			insertarTituloPrincipal(state)
			insertarTituloX(state)
			insertarTituloY(state)
			valoresPorDefecto(state)
			insertarTagsValues(state, data)
			insertarEjes(state)
			flechasEjes(state)
			insertarBarras(state)

		})
		
		function initCanvas(state) {
			const { ctx, canvas } = state
			ctx.save()				
			ctx.beginPath()
			ctx.clearRect(0,0, canvas.width, canvas.height)
			ctx.closePath()
			ctx.restore()
			ctx.save()
		}
		function valoresPorDefecto(state) {
			const { ctx, font, canvas } = state
			ctx.save()
			ctx.fillStyle = font.color
			ctx.strokeStyle = font.color
			ctx.textBaseline = font.alignY
			ctx.textAlign = font.alignX
			ctx.font = font.sise + 'px' + font.family
			ctx.fill()
			ctx.stroke()
			ctx.restore()
			ctx.save()
		}
		function insertarTituloPrincipal(state) {
			const { mainTitle } = state.titles
			const { ctx, canvas } = state
			ctx.save()
			ctx.beginPath()
			ctx.font = mainTitle.style.font.size + 'px ' + mainTitle.style.font.family
			ctx.fillStyle = mainTitle.style.font.color
			ctx.textAlign = mainTitle.style.font.alignX
			ctx.textBaseline = mainTitle.style.font.alignY
			ctx.fillText(mainTitle.title, canvas.width/2, mainTitle.style.margin.top)
			ctx.closePath()
			ctx.restore()
			ctx.save()
		}
		function insertarTituloX(state) {
			const { titleX, titleY } = state.titles
			const { ctx, canvas, chart } = state

			let title = chart.position == 'vertical' ? titleX.title : titleY.title
			ctx.save()
			ctx.beginPath()
			ctx.font = titleX.style.font.size + 'px ' + titleX.style.font.family
			ctx.fillStyle = titleX.style.font.color
			ctx.textAlign = titleX.style.font.alignX
			ctx.textBaseline = titleX.style.font.alignY
			ctx.fillText(title, canvas.width/2 + canvas.padding.left, canvas.height)
			ctx.closePath()
			ctx.restore()
			ctx.save()
		}
		function insertarTituloY(state) {
			const { titleY, titleX } = state.titles
			const { ctx, canvas, chart } = state

			let title = chart.position == 'vertical' ? titleY.title : titleX.title

			ctx.save()
			ctx.beginPath()
			ctx.font = titleY.style.font.size + 'px ' + titleY.style.font.family
			ctx.fillStyle = titleY.style.font.color
			ctx.textAlign = titleY.style.font.alignX
			ctx.textBaseline = titleY.style.font.alignY
			ctx.translate(canvas.padding.left, canvas.height/2 - canvas.padding.bottom - titleX.style.font.size)
			ctx.rotate(270*Math.PI/180)
			ctx.fillText(title, 0,0)
			ctx.closePath()
			ctx.restore()
			ctx.save()
		}
		function insertarTagsValues(state, data) {
			const { ctx, canvas, chart } = state
			const { tags, values, titleX, titleY } = state.titles
			const { min, max } = data

			let horText;
			let verText;

			
			chart.scale.interval == 0 ? chart.scale.interval = 1 : false
			
			let scaleValues = []
			for (i = chart.scale.min; i <= chart.scale.max; i+= chart.scale.interval) {
				scaleValues.push(i)
			}

			if (chart.position == 'vertical') {
				horText = tags
				verText = values
			} else {
				horText = values
				verText = tags
			}

			// Horizontal Texts
			ctx.save()
			ctx.beginPath()
			ctx.font = tags.style.font.size + 'px ' + tags.style.font.family
			ctx.fillStyle = tags.style.font.color
			ctx.textAlign = tags.style.font.alignX
			ctx.textBaseline = tags.style.font.alignY
			ctx.translate(canvas.padding.left + titleY.style.font.size*1.2 + horText.style.font.size*2, canvas.height - tags.style.font.size - titleX.style.font.size*0.8)
			let chartWidth = canvas.width - (canvas.padding.right + canvas.padding.left + titleY.style.font.size*1.2 + horText.style.font.size*2 + chart.style.padding.x*2)
			// console.log(chartWidth)
			// console.log(canvas.padding.left + titleY.style.font.size*1.2 + horText.style.font.size*2)
			for (let i = 0; i < chart.length; i++) {
				//dx = x + chartWidth/10+chart.style.dataPadding.x
				let xDist = chartWidth/chart.length*(i) + chart.style.dataPadding.x + chart.style.padding.x
				//console.log(dx)
				ctx.fillText(horText.title[i], xDist,0)
			}
			ctx.closePath()
			ctx.restore()
			ctx.save()

			// Vertical Texts
			ctx.save()
			ctx.beginPath()
			ctx.font = values.style.font.size + 'px ' + values.style.font.family
			ctx.fillStyle = values.style.font.color
			ctx.textAlign = values.style.font.alignX
			ctx.textBaseline = values.style.font.alignY
			ctx.translate(canvas.padding.left + verText.style.font.size*1.5 + titleY.style.font.size*1.5, canvas.height - (canvas.padding.top + canvas.padding.bottom + titleX.style.font.size*1.5 + horText.style.font.size))
			ctx.rotate(0*Math.PI/180)
			let chartHeightIni =  - canvas.height + (canvas.padding.top + canvas.padding.bottom + verText.style.font.size*1.2 + horText.style.font.size*2 + chart.style.padding.y*2)
			//let chartHeight = canvas.height - 
			for (let i = 0; i < scaleValues.length; i++) {
				let yDist = chartHeightIni/scaleValues.length*(i) - chart.style.dataPadding.y
				// ctx.arc(0,yDist,5,0,1000)
				// ctx.fill()
				//dx = x + chartWidth/10+chart.style.dataPadding.x
				//console.log(dx)
				ctx.fillText(scaleValues[i], 0,yDist)
			}
			//ctx.fillText(verText.title, 0,0)
			ctx.closePath()
			
			ctx.restore()
			ctx.save()
		}
		function insertarEjes(state) {
			const { ctx, canvas, chart } = state
			const { axis } = state.chart
			const { tags, values, titleX, titleY, mainTitle } = state.titles
			ctx.save()
			ctx.strokeStyle = axis.color
			ctx.lineWidth = axis.width
			ctx.beginPath()
			if (chart.position /*== 'vertical'*/) {
				ctx.font = values.style.font.size + 'px ' + values.style.font.family;
				let bigTag = Math.max(...values.title)

				let witdhText = ctx.measureText(bigTag).width
				let xDist = canvas.padding.left + titleY.style.font.size + witdhText + chart.style.margin.x/2
				let yDist = canvas.padding.top + mainTitle.style.font.size + chart.style.margin.y/2
				ctx.translate(xDist, yDist)
				ctx.moveTo(0, 0)
				ctx.lineTo(0, canvas.height - (yDist + titleX.style.font.size*1.5 + tags.style.font.size*2))
				ctx.stroke()
				ctx.lineTo(canvas.width - (xDist*1.2), canvas.height - (yDist + titleX.style.font.size*1.5 + tags.style.font.size*2))
				ctx.stroke()
			} else {

			}
			ctx.closePath()
			ctx.restore()
			ctx.save()
		}
		function flechasEjes(state) {
			const { ctx, canvas, chart } = state
			const { axis } = state.chart
			const { tags, values, titleX, titleY, mainTitle } = state.titles
			ctx.save()
			ctx.strokeStyle = axis.color
			ctx.lineWidth = axis.width
		
			ctx.font = values.style.font.size + 'px ' + values.style.font.family;
			let bigTag = Math.max(...values.title)
			let witdhText = ctx.measureText(bigTag).width
			let xDist = canvas.padding.left + titleY.style.font.size + witdhText + chart.style.margin.x/2
			let yDist = canvas.padding.top + mainTitle.style.font.size + chart.style.margin.y/2
			ctx.translate(xDist, yDist)
			ctx.beginPath()
			ctx.moveTo(-canvas.height*0.02, canvas.height*0.03)
			ctx.lineTo(0, 0)
			ctx.lineTo(canvas.height*0.02, canvas.height*0.03)
			ctx.stroke()

			ctx.translate(canvas.width - (xDist*1.2), canvas.height - (yDist + titleX.style.font.size*1.5 + tags.style.font.size*2))
			ctx.beginPath()
			ctx.moveTo(-canvas.height*0.03, canvas.height*0.02)
			ctx.lineTo(0, 0)
			ctx.lineTo(-canvas.height*0.03, -canvas.height*0.02)
			ctx.stroke()
			ctx.stroke()
			ctx.restore()
			ctx.save()

		}
		function insertarBarras(state) {
			const { ctx, canvas, chart } = state
			const { tags, values, titleX, titleY, mainTitle } = state.titles
			ctx.save()
			ctx.font = values.style.font.size + 'px ' + values.style.font.family;
			let bigTag = Math.max(...values.title)
			let witdhText = ctx.measureText(bigTag).width
			let xDist = canvas.padding.left + titleY.style.font.size + witdhText + chart.style.margin.x/2
			let yDist = canvas.padding.top + mainTitle.style.font.size + chart.style.margin.y/2
			yDist += canvas.height - (yDist + titleX.style.font.size*1.5 + tags.style.font.size*2) - chart.style.border.width*0.63

			ctx.beginPath()
			ctx.lineWidth = chart.axis.width
			ctx.fillStyle = chart.style.color
			ctx.strokeStyle = chart.style.border.color

			ctx.translate(xDist,yDist)
			for (let i = 0; i < chart.len; i++) {
				
				ctx.moveTo(0,0)
				ctx.lineTo(0,-50)
				ctx.lineTo(30,-50)
				ctx.lineTo(30,0)
				ctx.stroke()	
				ctx.fill()
				ctx.closePath()
			}

			ctx.restore()
			ctx.save()
		}
	
}
function DatosX() { 

	let clase = $(".datos-r1").attr('class', 'text-center datos-r1a')  

	clase.each((index, item) => {

			$(item).find(".txtRef").remove()

			let id = $(item).attr("id").replace('htmlDatos', ''),
					datos = $("#htmlDatos"+id), values = [], tags = [],
					position = datos.attr("grafPos"), max = 0,
					html = '<canvas id="canvas'+id+'" ></canvas>'            
			datos.append(html)

			values = datos.attr("grafVal").split(',')
			tags = datos.attr("grafTags").split(',')
			/*
			if (position == "vertical") {
					values = datos.attr("valores").split(',')
					tags = datos.attr("etiquetas").split(',')
			} 
			else {
					values = datos.attr("valoresy").split(',')
					tags = datos.attr("valoresx").split(',')
			}
			*/

			//height = $(item).parent().height()
			//width = $(item).parent().width()
			// width = Number.parseInt(datos.attr("canvasAncho"))
			// height = Number.parseInt(datos.attr("canvasAlto"))
			// margin = 0
			
			let board = $("#canvas"+id)[0]
			board.width = Number.parseInt(datos.attr("canvasAncho"))
			board.height = Number.parseInt(datos.attr("canvasAlto"))
			container = board
			
			// if (!container) return
			// 	let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
			// 	width = responsive ? params.width : maxWidth - 15, height = responsive ? params.height : width

			// container.width = width
			// container.height = height

			let state = {
					axis: {
							color: datos.attr("AxisColor"),
							scale: 'auto', //datos.attr("escala"),
							title_x: datos.attr("AxisTitX"),
							title_y: datos.attr("AxisTitY"),
							width: datos.attr("AxisAncho")
					},
					border: {
							width: datos.attr("bordeAncho"),
							style: datos.attr("bordeEstilo"),
							color: datos.attr("bordeColor"),
							radius: datos.attr("bordeRadius"),
							margin: datos.attr("canvasMargen")
					},
					canvas: {
							color: datos.attr("canvasFondo"),
							context: board.getContext('2d'),
							height: board.height - 10,
							width: board.width - 0,
							ctx: container.getContext('2d')
					},
					chart: {
							border: {
									color: datos.attr("grafBarBorCol"),
									width: 2
							},
							color: datos.attr("grafBarColor").split(','),
							length: values.length,
							margin: { x:container.width*0.15, y:container.width*0.15 },
							padding: { x:container.height*0.03, y:container.height*0.03 },
							position: position,
							tags: tags,
							values: values,
							dataTags: datos.attr("grafDataTags"),
							withArrowsX: eval(datos.attr("conFlechasX")),
							withArrowsY: eval(datos.attr("conFlechasY"))
					},
					extra: {
							//limitColor: eval(datos.attr("conLimite")) == '1',
							projection: eval(datos.attr("conProyeccion")) == '1' ? true : false,
							projectionVal: datos.attr("ProyeccionVal"),
							limit: eval(datos.attr("conLimite")) == '1' ? true : false,
							limitVal: datos.attr("limiteVal"),
							//projectionColor: eval(datos.attr("conProyeccion")),
							highlightBar: datos.attr("hightLightBar").split(",")
					},
					font: {
							family: datos.attr("fuenteGraf") == 0 ? 'Larke Neue Thin' : 'Arial',
							align: 'center',
							color: datos.attr("fuenteColor"),
							size: eval(datos.attr("fuenteTam"))
					},
					line: {
							color: datos.attr("lineaColor"),
							//limitVal: datos.attr("lineasVal").split(","),
							value: 10,
							width: datos.attr("lineaAncho")
							//value: datos.attr("lineavalor"),
					},
					scale: {
						max: eval(datos.attr("escalaMax")),
						min: eval(datos.attr("escalaMin")),
						interval: datos.attr("escalaInterval") == '0' ? 'auto':  eval(datos.attr("escalaInterval")),
						color: datos.attr("escalaColor"),
						width: eval(datos.attr("escalaAncho"))
					},
					title: {
							color: datos.attr("tituloGrafColor"),
							size: eval(datos.attr("tituloGrafSize")),
							value: datos.attr("tituloGraf"),
							top: datos.attr("tituloGrafTop"),
					}
			}

			let anchoTag = []

			state.chart.tags.map(tag => {
				anchoTag.push(state.canvas.ctx.measureText(tag).width)
			})
			anchoTag = Math.max(...anchoTag)
			
			const { chart, border, canvas } = state
			chart.position == 'horizontal' ? chart.margin.x += anchoTag : false 
			let { x, y } = chart.margin

			//x = x - canvas.width*0.01
			//y = y - canvas.width*0.01
			
			$("#canvas"+id).attr('style', 'border:'+border.width+'px solid '+border.color+'; border-radius:'+border.radius
					+'px; margin: 0 auto; background: '+canvas.color) 

			let data = {
					ctx: canvas.ctx, height: canvas.height - 2*y, len: chart.length, 
					max: Math.max(...chart.values), width: canvas.width - 2*(x+10), x0: x, y0: canvas.height - y,
					dx: Math.min(Math.floor((canvas.width - 2*(x))/(3/2*chart.length)), 100),
					dy: Math.min(Math.floor((canvas.height - 2*(y))/(4/3*chart.length)), 60)
			}

			state.canvas.ctx.font = state.font.size + 'px ' + state.font.family

			data.cx = data.x0 + 2*chart.padding.x + data.width/data.len/2 - data.dx/2
			data.cy = data.y0 - chart.padding.y - data.height/data.len/2 - data.dy/2    

			data.ctx.translate(0, canvas.margin == 'si' ? 0 : 10)
			data.ctx.save()

			generarColumnas(data, state)
			generarEjes(container, state)
			if (state.extra.projection) 
			proyectarColumnas(data, state)
			if (state.extra.limit) 
			limitarColumnas(data, state)
			insertarTextos(data, state)
			insertarValores(data, state)
			insertarTitulos(data, state)
	})

	function generarEjes(canvas, state) {

    let ctx = canvas.getContext('2d')

    const { axis, chart, font, title } = state
    const { height, width } = state.canvas
    const { x, y } = chart.margin 
		const { padding } = chart
		
		let x2;
		chart.position == 'vertical' ? x2 = x : x2 = x/2 

    ctx.beginPath()
    ctx.moveTo(x, y - 2*padding.y)
    ctx.lineTo(x, height - y) //EJE VERTICAL
    ctx.lineTo(width - x2 + 2*padding.x, height - y) //EJE HORIZONTAL
    
		if (chart.withArrowsY) {
			//EJE VERTICAL
			ctx.moveTo(x + width/110, y - 2*padding.y + width/110)
			ctx.lineTo(x, y - 2*padding.y)
			ctx.lineTo(x - width/110, y - 2*padding.y + width/110)
		}
		if (chart.withArrowsX) {
			//EJE HORIZONTAL
			ctx.moveTo(width - x2 + 2*padding.x - width/110, height - y - width/110) 
			ctx.lineTo(width - x2 + 2*padding.x, height - y)
			ctx.lineTo(width - x2 + 2*padding.x - width/110, height - y + width/110)
		}

    ctx.lineWidth = axis.width
    ctx.strokeStyle = axis.color
    ctx.stroke()

    
    ctx.closePath()
	}
	function generarColumnas(data, state) {

			const { canvas, chart, scale, font, extra } = state
			const { dx, dy, height, len, max, width, x0, y0 } = data
			const { ctx } = canvas
			const limit = Math.max(scale.max, max)
			
			if (chart.position != 'vertical') {
				width2 = canvas.width - 2*(chart.margin.x/2+10) - chart.padding.x*2-10
			}

			ctx.beginPath()
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			
			lineasGuias(data, state)

			extra.highlightBar && resaltarBarras(data, state)

			if (chart.position == 'vertical') {

				ctx.beginPath()
				ctx.fillStyle = chart.color[0]
				for (let i = 0, x = data.cx; i < len; i++, x += width/len) {
					let dy = height/limit * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
					ctx.fillRect(x, y, dx, dy) //DIBUJAR COLUMNA      
					ctx.moveTo(x, y0) 
					ctx.lineTo(x, y)
					ctx.lineTo(x + dx, y)
					ctx.lineTo(x + dx, y0) //BORDES COLUMNA
				}
			} 
			else {
				ctx.fillStyle = chart.color[0]
				for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
					let dx = width2/(limit) * chart.values[i], x = x0 //TAMAÑO DE LA COLUMNA
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

			const { chart, line, scale, extra, canvas } = state
			const { ctx, height, len, max, width, x0, y0, dx } = data
			const limit = Math.max(scale.max, max)

			let valuesProj = extra.projectionVal.split(',')

			if (chart.position != 'vertical')
				width2 = canvas.width - 2*(chart.margin.x/2+10) - chart.padding.x*2-10
		
			ctx.beginPath()
			if (chart.position == 'vertical') 
			{
					for (let i = 0, x = data.cx + dx; i < len; i++, x += width/len) {
						if(valuesProj[i] == '0') {
							let dy = height/limit * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
							ctx.moveTo(x0, y) 
							ctx.lineTo(x, y) //PROYECCION COLUMNA
						}
					}
			}
			else
			{
					for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
						if(valuesProj[i] == '0') {
							let dx = width2/limit * chart.values[i], x = x0 //TAMAÑO DE LA COLUMNA
							ctx.moveTo(x + dx, y0) 
							ctx.lineTo(x + dx, y) //PROYECCION COLUMNA
						}
					}
			}

			ctx.strokeStyle = line.color
			ctx.setLineDash([5, 1])
			ctx.lineWidth = line.width
			ctx.stroke()
			ctx.closePath()
	}
	function limitarColumnas(data, state) {
			const { chart, line, scale, canvas, extra } = state
			const { ctx, height, len, max, width, x0, y0 } = data
			const limit = Math.max(scale.max, max)

			let values = extra.limitVal.split(',')
			//let values = line.limitVal
			if (chart.position != 'vertical')
				width2 = canvas.width - 2*(chart.margin.x/2+10) - chart.padding.x*2-10
			if (values.length) 
			{
					ctx.beginPath()
					if (chart.position == 'vertical') 
					{
							for (let i = 0, x = data.cx; i < max; i++, x += width/len) {
								if (true) {
									let dy = height/limit * values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
									ctx.moveTo(x0, y) 
									ctx.lineTo(canvas.width - chart.margin.x + 2*chart.padding.x, y) //PROYECCION COLUMNA
								}
							}
					}
					else
					{
							for (let i = 0, y = data.cy; i < max; i++, y -= height/len) {
								if (true) {
									let dx = width2/(limit) * values[i], x = x0 //TAMAÑO DE LA COLUMNA
									ctx.moveTo(x + dx, y0) 
									ctx.lineTo(x + dx,  chart.margin.y - 2*chart.padding.y + canvas.height/110) //PROYECCION COLUMNA
								}
							}
					}
					ctx.strokeStyle = line.color
					ctx.setLineDash([5, 1])
					ctx.lineWidth = line.width
					ctx.stroke()
					ctx.closePath()
			}

	}
	function insertarTextos(data, state) {

			const { chart, font, scale, canvas } = state
			const { ctx, dx, dy, height, len, width, x0, y0, max } = data
			const limit = Math.max(scale.max, max)
			ctx.save()
			let width2 
			if (chart.position != 'vertical')
				width2 = canvas.width - 2*(chart.margin.x/2+10) - chart.padding.x*2-10
			
		// Textos de Tags y Values Begin
			ctx.beginPath()
			if (chart.position == 'vertical') {
				ctx.font = font.size + 'px ' + font.family
				ctx.textAlign = font.align
				ctx.textBaseline = 'top'  
				ctx.fillStyle = font.color
				for (let i = 0, x = data.cx + dx/2; i < len; i++, x += width/len) {
						ctx.fillText(chart.tags.length > i ? chart.tags[i] : '', x, y0*1.02) //INSERTAR TEXTO
				}
				
				ctx.beginPath()
				ctx.font = font.size + 'px ' + font.family
				ctx.textAlign = 'right'
				ctx.textBaseline = 'alphabetic'
				ctx.fillStyle = font.color
				for (let i = scale.min; i <= limit; i += scale.interval) {
						let dy = height/limit * i, y = y0 - dy //TAMAÑO DE LA COLUMNA
						ctx.fillText(i, x0 - 7, y + 5) //INSERTAR TEXTO
				}
				ctx.closePath()
			} else {
				ctx.font = font.size + 'px ' + font.family
				ctx.textAlign = 'right'
				ctx.textBaseline = 'alphabetic'
				ctx.fillStyle = font.color
				for (let i = 0, y = data.cy; i < len; i++, y-= height/len) {
						ctx.fillText(chart.tags.length > i ? chart.tags[i] : '', x0 - 5, y + dy/2 + 5) //INSERTAR TEXTO 
				}
				ctx.beginPath()
				ctx.font = font.size + 'px ' + font.family
				ctx.fillStyle = font.color
				ctx.textBaseline = 'top'
				ctx.textAlign = font.align
				for (let i = scale.min; i <= limit; i += scale.interval) {
					let dx = width2/limit * i, x = x0 + dx //TAMAÑO DE LA COLUMNA
					ctx.fillText(i, x, y0 + 5) //INSERTAR TEXTO
				}
				ctx.closePath()
			}
			ctx.closePath()
		// Textos de Tags y Values End
		ctx.restore()
		ctx.save()

	}
	function insertarValores(data, state) {
			const { chart, font, scale, canvas } = state
			const { ctx, dx, dy, height, len, max, width, x0, y0 } = data

			ctx.save()
			if (chart.dataTags != '' && chart.dataTags) {
					ctx.fillStyle = font.color
					
					let dataTags = chart.dataTags.split(',')
					let width2 
					if (chart.position != 'vertical')
						width2 = canvas.width - 2*(chart.margin.x/2) - chart.padding.x
			
					ctx.beginPath()
					ctx.font = font.size + 'px ' + font.family
					const limit = Math.max(scale.max, max)
					
					if (chart.position == 'vertical') {
						ctx.textAlign = 'center'
						ctx.textBaseline = 'bottom'
							for (let i = 0, x = data.cx + dx/2; i < len; i++, x += width/len) {
									if (dataTags[i] == '0') {
											let dy = height/limit * chart.values[i], y = y0 - dy//TAMAÑO DE LA COLUMNA
											ctx.fillText(chart.values[i], x, y) //INSERTAR TEXTO
									}
							}
					} else {
						ctx.textAlign = 'left'
						ctx.textBaseline = 'alphabetic'
							for (let i = 0, y = data.cy + dy/2 + font.size/2; i < len; i++, y -= height/len) {
									if (dataTags[i] == '0') {
											let dx = width2/(limit+state.scale.interval) * chart.values[i], x = x0 + dx//TAMAÑO DE LA COLUMNA
											ctx.fillText(chart.values[i], x*1.05, y - 2) //INSERTAR TEXTO
									}
							}
					}
					
			} else {
					ctx.fillStyle = 'transparent'
			}
			
			ctx.closePath()
			ctx.restore()
			ctx.save()
	}
	function resaltarBarras(data, state) {

			const { canvas, chart, scale, font, extra } = state
			const { dx, dy, height, len, max, width, x0, y0 } = data
			const { ctx } = canvas
			const limit = Math.max(scale.max, max)

			ctx.font = font.size + 'px ' + font.family

			let hightBar = extra.highlightBar
			let width2 
			if (chart.position != 'vertical')
				width2 = canvas.width - 2*(chart.margin.x/2)

			// anchoTags
			// let tagsWidth = []
			// chart.tags.map((tagWidth, i) => tagsWidth[i] = (ctx.measureText(chart.tags[i]).width))
			// tagsWidth = Math.max(...tagsWidth)
			
			//anchoValues
			let valuesWidth = []
			chart.values.map((valueWidth, i) => valuesWidth[i] = (ctx.measureText(chart.values[i]).width))
			valuesWidth = Math.max(...valuesWidth)
			ctx.beginPath()
			ctx.fillStyle = 'rgba(212,230,192, 0.6)'

			if (chart.position == 'vertical') {
					for (let i = 0, x = data.cx/1.08; i < len; i++, x += width/len) {
							if (!isNaN(hightBar[i]) && hightBar[i].length === 1 && eval(hightBar[i]) === 0) {
									let dy = height/limit * chart.values[i], y = y0 - dy //TAMAÑO DE LA COLUMNA
									ctx.fillRect(x, y - height*0.13, dx*1.34, dy + height*0.13 + font.size*2) //DIBUJAR COLUMNA
							}
					}
			} else {
					for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
						let dx2 = []
						for (let j = 0; j < len; j ++) {
							dx2.push(ctx.measureText(chart.tags[j]).width + font.size)
						}
						dx2 = Math.max(...dx2)
							if (!isNaN(hightBar[i]) && hightBar[i].length === 1 && eval(hightBar[i]) === 0) {
									let dx = width2/(limit+state.scale.interval) * chart.values[i], x = x0 //TAMAÑO DE LA COLUMNA
									ctx.fillRect(x - dx2, y - height/len*0.1, dx + dx2*1.5, dy + height/len*0.2) //DIBUJAR COLUMNA
									// let dx = width/limit * chart.values[i], x = x0 + dx //TAMAÑO DE LA COLUMNA
									// ctx.fillRect(x0 - width/limit*0.25, y + height/limit*0.2, dx + width/limit*0.45, dy - height/limit*0.4) //DIBUJAR COLUMNA
							}
					}
			}
	}
	function lineasGuias(data, state) {
		const { canvas, scale, chart, font } = state
		const { ctx } = canvas
		const { dx, dy, height, len, max, width, x0, y0 } = data
		const limit = Math.max(scale.max, max)

		ctx.strokeStyle = scale.color == '' ? 'transparent' : scale.color
		ctx.lineWidth = scale.width
		let width2 

		if (chart.position != 'vertical')
				width2 = canvas.width - 2*(chart.margin.x/2+10) - chart.padding.x*2-10

		if (scale.interval > 0) {
			if (scale.width > 0) {
				if (chart.position == 'vertical') {
					for (let i = scale.min; i <= limit; i += scale.interval) { 
						let dy = height/limit * i, y = y0 - dy //TAMAÑO DE LA COLUMNA
						ctx.moveTo(chart.margin.x, y)
						ctx.lineTo(canvas.width - chart.margin.x + 2*chart.padding.x, y)
					}
				} else {
					for (let i = scale.min; i <= limit; i += scale.interval) { 
						let dx = width2/limit * i, x = x0 + dx //TAMAÑO DE LA COLUMNA
						ctx.moveTo(x, chart.margin.y - 2*chart.padding.y)
						ctx.lineTo(x, y0)
					}
				}
			} 
		}
		ctx.stroke()
		ctx.closePath()
	}
	function insertarTitulos(data, state) {
		const { canvas, axis, chart, font, title } = state
		const { height, width } = state.canvas
		const { ctx } = canvas
    const { x, y } = chart.margin 
		const { padding } = chart

		ctx.textAlign = font.align
		ctx.font = (title.size*0.9) + 'px ' + font.family
		ctx.fillStyle = title.color
    ctx.fillText(axis.title_x, width/2,height - padding.y) //INSERTAR TITULO X

    ctx.rotate(3*Math.PI/2)
    ctx.fillText(axis.title_y, - height/2, y/2 - Number(font.size)/1.5) //INSERTAR TITULO Y

    ctx.rotate(Math.PI/2)
		ctx.fillStyle = title.color
		ctx.font = title.size + 'px ' + font.family
		ctx.textBaseline = 'top'
		ctx.fillText(title.value, width/2, title.top) //INSERTAR TITULO
	}
}
function datosPicto() {

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
						img: {},
						font: {
							size: eval(datos.attr("tituloGrafSize"))*0.7,
							color: '#262626',
							family: eval(datos.attr("fuenteGraf")) == 0 ? 'Arial' : 'Arial',
							alignX: 'right',
							alignY: 'middle',
							weight: eval(datos.attr("fuenteAncho")) == 0 ? 'bold': 'normal'
						}
					}
				},
				values: datos.attr("grafVal").split(','),
				tags: datos.attr("grafTags").split(','),
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
			state.chart.style.innerPadding.y = (state.chart.position.y1 - state.chart.position.y0)*0.15

			state.chart.bars.margin = state.chart.style.innerPadding.x
		
			state.scale.max = state.scale.max == 0 ? Math.max(...state.chart.values) : state.scale.max
		
			state.chart.image.height = (state.chart.position.y1 - state.chart.position.y0)*0.3
		
			data = {
				lenVal: state.chart.values.length, lenTag: state.chart.tags.length
			}

			console.log(state)
		
			// drawRect(state.chart.position.x0,state.chart.position.y0,state.chart.position.x1-state.chart.position.x0,state.chart.position.y1-state.chart.position.y0)
			// drawRect(state.canvas.position.x0,state.canvas.position.y0,state.canvas.position.x1-state.canvas.position.x0,state.canvas.position.y1-state.canvas.position.y0)
			// drawRect(state.container.position.x0,state.container.position.y0,state.container.position.x1-state.container.position.x0,state.container.position.y1-state.container.position.y0)
			function drawRect(x0,y0,x1,y1) {
				const { ctx } = state
				ctx.strokeRect(x0,y0,x1,y1)
			}
		
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
				// insLeyenda(state)
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
						const { ctx, chart, container, canvas, scale, font } = state
						const { tags, values, position, axis } = chart
						const { x0, x1, y0, y1 } = position
						ctx.save()
		
						let centerX, centerY, delta
						let len = valuesTags.length
						let width = (x1 - x0 - chart.style.innerPadding.x*2)
						let barMargin = chart.bars.margin
						let barPadding = barMargin/2
						let barCont = (width - barMargin*len - barPadding*len)/len
						let height = (y1 - y0 - chart.style.innerPadding.y - chart.axis.width/2)
		
						let xPos = x0 + chart.axis.width/2
						let x = chart.style.innerPadding.x + barMargin
						let vardx = barCont + barMargin + barPadding

						let heightImg = height/(Math.max(...chart.values) > scale.max ? Math.max(...chart.values) : scale.max)
						
						ctx.font = font.size + 'px ' + font.family
						ctx.textAlign = 'center'
						ctx.textBaseline = 'top'
						if (chart.orientation == 'vertical') {
							centerY = y1 + chart.axis.width*2
							//delta = barCont + barMargin + barPadding
							for (let i = 0; i < len; i++) {
								let dx = vardx*i
								centerX = xPos + chart.bars.border.width + x + dx + heightImg/2
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
						const { ctx, chart, container, canvas, scale, font } = state
						const { tags, values, position, axis } = chart
						ctx.save()
						
						let height = chart.position.y1 - chart.position.y0 - chart.style.innerPadding.y
						let width = chart.position.x1 - chart.position.x0
						let barCont, len, itemHeight, barMargin, barPadding
						barMargin = chart.bars.margin
						barPadding = barMargin/2
						ctx.font = font.size + 'px ' + font.family
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
					const { ctx, chart, scale, font } = state
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
					ctx.font = font.size + 'px ' + font.family
					ctx.fillStyle = ''
					if (chart.orientation == 'vertical') {
						let xPos = chart.position.x0 + heightImg + chart.bars.border.width
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
								let xInit = xPos, xFin = imageW
								let yInit = yPos, yFin = -imageH*chart.values[i]-imageH
								let delta = (barCont - barMargin - barPadding)*0.2
								if (chart.bars.highlight.color != '') {
									resaltarBarras(state, xPos + chart.style.innerPadding.x - chart.bars.border.width/2 + barCont*i,yInit, xFin,yFin)
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
	})

}
function conteoEnTablas() {
	$(".tablaConteo").each(function(index, tabla) {
			let tAlto = parseInt($(this).css("height"));
			let tFontTam = tAlto*0.063;
			$(this).css("font-size",tFontTam);

			let arreglo = $(this).find("tr").not(".tituloConteo,.subtituloConteo");
			arreglo.each(function() {
					let lasttd = $(this).find("td:last");
					let lastvalue = lasttd.text();
					let tdconteo = lasttd.prev()
					lastvalue = parseInt(lastvalue);
					let toreplacevalue = "/".repeat(lastvalue);
					tdconteo.text(toreplacevalue);
			})
	})
}
$(document).ready(function() {
	let btnURL = 'https://desarrolloadaptatin.blob.core.windows.net/iconosimg/botones/Datos_Terminar'
	let imgBtn = $('#imagenBotonRespuesta')
	if (imgBtn.attr('src') != btnURL) {
		imgBtn.attr({
			src: btnURL
		})
	}
	conteoEnTablas()
	datosPicto()
	$('datos-r1').ready(function() {
		DatosX()
	})
})
