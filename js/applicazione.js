// JavaScript Document
var percorsoCarte = "http://www.massimoabbondi.it/apps/zoit/data/arcani/";
/* GESTIONE COOKIE */
function getCookie(c_name)
{
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
	{
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1)
	{
		c_value = null;
	}
	else
	{
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1)
		{
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function checkCookie(c_name)
{
	var risposta = '';
	var cookieSt=getCookie(c_name);
	if (cookieSt!=null && cookieSt!='')
	{
		risposta = cookieSt;
	}
			
	return risposta;
}			
/* FINE GESTIONE COOKIE */

/* GESTIONE DATI LOCALI */
function setit(database,valori) {
	localStorage.setItem(database, valori);
	//document.getElementById("stringResponseText").innerHTML = "Set string value: " + stringValue;
}
function nullit(database) {
	localStorage.setItem(database, null);
	//document.getElementById("stringResponseText").innerHTML = "Set string value to null.";
}
function getit(database) {
	var risposta = '';
	var cookieSt=localStorage.getItem(database); 
	if (cookieSt!=null && cookieSt!='')
	{
		risposta = cookieSt;
	}
			
	return risposta;
}
/* FINE GESTIONE DATI LOCALI */

// FUNZIONI di servizio

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function mostraOracolo(idArg, cartaScelta) {
	//alert('cliccato ' + idArg + ', ' + cartaScelta);
	var urlJsonpN = 'http://www.massimoabbondi.it/apps/zoit/data/oracolo.php';
	
	
	function jsonpCallback(response){
		
		//alert(response);
		var hUnit = 0;
		var hMain = 0;
		var hCartaBig = 0;
		var lCartaBig = 0;
		var topMrgCartaBig = 0;
		var lftMrgCartaBig = 0;
		var scala = 1.38;
	
		hUnit = Math.ceil($(window).height()/14);
		hMain = $(window).height() - hUnit;
		wMain = $(window).width();
		lArea = Math.floor(wMain*1);
		hArea = Math.floor(hMain*1 - hUnit*2);
		
		if (lArea*scala<hArea) {
			hCartaBig = Math.floor(lArea*scala);
			lCartaBig = lArea;
			topMrgCartaBig = Math.floor((hArea - lArea*scala)*0.5);
			lftMrgCartaBig = 0;
		} else {
			hCartaBig = hArea;
			lCartaBig = Math.floor(hArea/scala);
			topMrgCartaBig = 0;
			lftMrgCartaBig = Math.floor((lArea - hArea/scala)*0.5);		
		}
	
		$('#contenitore-pergamena').css({'top':  Math.floor(hUnit * 0.5) + 'px', 'width':  lCartaBig + 'px', 'height':  hCartaBig + 'px', 'margin-left':  lftMrgCartaBig + 'px'});
		//$('#pergamena').css({'top':  Math.floor(hUnit * 0.5) + 'px', 'width':  lCartaBig + 'px', 'height':  hCartaBig + 'px', 'margin-left':  lftMrgCartaBig + 'px'});
			
		$('#pergamena .slide-inner').html(response + '<p>&nbsp;</p><p>&nbsp;</p>');
		$('#pergamena .slide-inner img').css('width','100%');		
		
		$('.back-center').css('width', 2*hUnit + 'px');
		$('.footer').css({'height': hUnit *1 + 'px'});
		$('.pagina').css('display','none');
		$('#oracolo').css('display','block');
		
				
		// inizio codice swipe e scroll pages
		var mySwiper = new Swiper('.swiper-container', {
			scrollContainer:true,
			mousewheelControl : true,
			mode:'vertical',
			//Enable Scrollbar
			scrollbar: {
				container :'.swiper-scrollbar',
				hide: true,
				draggable: false  
			}
		});
		//inizializza Pagine
		
		// fine codice swipe e scroll pages	
		$('#pergamena-sup').css({'top':'0px','height':Math.ceil(hCartaBig/788*65) + 'px'});
		$('#pergamena-inf').css({'bottom':'0px','height':Math.ceil(hCartaBig/788*68) + 'px'});
		$('.back-center').click(function(){
			window.location.href = 'index.html';
		});		
											
	}
	
	$.ajax({
		url: urlJsonpN,
		dataType: 'jsonp',
		data: { Argomento: idArg, CodC: cartaScelta },
		error: function(xhr, status, error) {
				//alert(error);
				},
		success: jsonpCallback			
	});
}

function mostraCarte(idArg) {
	$('.pagina').css('display','none');	
	//$('.testata-argomento').css('background-image','url(img/ico1.png)');
	
	var hUnit = 0;
	var hMain = 0;
	var lArea = 0;
	var hArea = 0;
	var lCarta = 0;
	var hCarta = 0;
	var hCartaBig = 0;
	var lCartaBig = 0;
	var topMrgCartaBig = 0;
	var lftMrgCartaBig = 0;
	var l1 = 0;
	var l2 = 0;
	var l3 = 0;
	var l4 = 0;
	var l5 = 0;
	var scala = 1.86;
	var colonne = 0;
	var posizX = new Array();
	var posizY = new Array();
	var casualeIndex1 = new Array();
	var casualeIndex2 = new Array();
		
	hUnit = Math.ceil($(window).height()/14);
	hMain = $(window).height() - hUnit*1 - 0;
	wMain = $(window).width();
	
	lArea = Math.floor(wMain*0.9);
	hArea = Math.floor(hMain*0.9);
	
	if (lArea*scala<hArea) {
		hCartaBig = Math.floor(lArea*scala);
		lCartaBig = lArea;
		topMrgCartaBig = Math.floor((hArea - lArea*scala)*0.5);
		lftMrgCartaBig = 0;
	} else {
		hCartaBig = hArea;
		lCartaBig = Math.floor(hArea/scala);
		topMrgCartaBig = 0;
		lftMrgCartaBig = Math.floor((lArea - hArea/scala)*0.5);		
	}
	
	//lCarta = Math.floor(Math.sqrt(wMain*0.9*wMain*0.9/22/scala)); 
	//hCarta = Math.floor(lCarta*scala); 
	
	if ((lArea/3)<(hArea/(8*scala))) {
		l1 = Math.floor(lArea/3);
	} else {
		l1 = Math.floor(hArea/(8*scala));
	}
	
	if ((lArea/4)<(hArea/(6*scala))) {
		l2 = Math.floor(lArea/4);
	} else {
		l2 = Math.floor(hArea/(6*scala));
	}
	
	if ((lArea/5)<(hArea/(5*scala))) {
		l3 = Math.floor(lArea/5);
	} else {
		l3 = Math.floor(hArea/(5*scala));
	}
	
	if ((lArea/6)<(hArea/(4*scala))) {
		l4 = Math.floor(lArea/6);
	} else {
		l4 = Math.floor(hArea/(4*scala));
	}
	
	if ((lArea/8)<(hArea/(3*scala))) {
		l5 = Math.floor(lArea/8);
	} else {
		l5 = Math.floor(hArea/(3*scala));
	}
		
	lCarta = l1;
	colonne = 3;
	
	if (lCarta<l2) {
		lCarta=l2;
		colonne = 4;	
	}
	
	if (lCarta<l3) {
		lCarta=l3;
		colonne = 5;	
	}
	
	if (lCarta<l4) {
		lCarta=l4;	
		colonne = 6;
	}
	
	if (lCarta<l5) {
		lCarta=l5;	
		colonne = 8;
	}
	
	hCarta = Math.floor(lCarta*scala); 
	
	lftMrgCartaBig -= Math.floor((lArea - (lCarta*colonne - lCarta*0.1))*0.5);
			
	$('#tavolocarte').css('display','block');	
	//$('#areacarte').css({'width':lArea + 'px','height': hArea + 'px', 'top': 2*hUnit + 'px' , 'margin': Math.floor(wMain*0.05) + 'px ' + Math.floor(hMain*0.05) + 'px'});
	$('#areacarte').css({'width':lArea + 'px','height': hArea + 'px', 'top': 2*hUnit + 'px' , 'left':Math.floor(wMain*0.05 + (lArea - (lCarta*colonne - lCarta*0.1))*0.5) + 'px'});
	$('.carta').css({'width': lCarta + 'px','height': hCarta + 'px'});
	
	var cTop = 0;
	var cLeft = 0;
	for (i=0;i<22;i++) {
		if ((cLeft+1)*lCarta>lArea) {
			cTop++;	
			cLeft = 0;
		}
		
		casualeIndex1.push(i);
		casualeIndex2.push(i);
		posizX.push(cLeft*lCarta);
		posizY.push(cTop*hCarta);
		$('#c' + i.toString() + ' .dorso').html('<div class="ncarta">' + (i+1).toString() + '</div>');
		if (i==2) {
			$('#c' + i.toString() + ' .dorso .ncarta').css('background-color','#f00');
		}
		cLeft++;
		
	}
	
	if (colonne==3) {
		posizX[21] +=lCarta;
	} else if (colonne==4) {
		posizX[20] +=lCarta;
		posizX[21] +=lCarta;		
	} else if (colonne==5) {
		posizX[20] +=lCarta*1.5;
		posizX[21] +=lCarta*1.5;		
	} else if (colonne==6) {
		posizX[18] +=lCarta;
		posizX[19] +=lCarta;
		posizX[20] +=lCarta;
		posizX[21] +=lCarta;
	} else if (colonne==8) {
		posizX[16] +=lCarta;
		posizX[17] +=lCarta;
		posizX[18] +=lCarta;
		posizX[19] +=lCarta;
		posizX[20] +=lCarta;
		posizX[21] +=lCarta;		
	}
	
	shuffle(casualeIndex1);
	shuffle(casualeIndex2);
	
	
	var indexDistr = -1;
		
	function carteDistribuite() {
		indexDistr++;
		if (indexDistr<22) {
			$('#c' + casualeIndex1[indexDistr].toString()).animate({'top': posizY[casualeIndex2[indexDistr]]  + 'px','left': posizX[casualeIndex2[indexDistr]] + 'px'}, { duration: 100, easing: "linear", complete: carteDistribuite });
		} else {
			$('.dorso').addClass('dorsoClick');
			assegnaClick();	
		}
		
   	}
	
	
	
	$('.carta').css({top:hArea + 'px',left:Math.floor((lArea-lCarta)*0.5) + 'px'});
	
	function assegnaClick() {
		$('.back-home').css('width', 2*hUnit + 'px');
		$('.back-home').click(function(){
			window.location.href = 'index.html';
		});	
			
		$('.carta').on('click',function(e){
			$('.carta').unbind('click');
			var cartaScelta = $(this).attr('id');
			//$('#' + $(this).attr('id') + ' .dorso').stop().animate({width:'0px',marginLeft:''+ Math.floor(lCarta*0.9*0.5) +'px'},{duration:300});
			$('#' + cartaScelta).css('z-index','2');
			$('#' + cartaScelta + ' .dorso').stop().animate({width:Math.ceil(lCartaBig*1) + 'px',height:Math.ceil(hCartaBig*1) + 'px'},{duration:300});
			$('#' + cartaScelta).stop().animate({top:0,left:0,width:lCartaBig + 'px',height:hCartaBig + 'px', marginLeft:lftMrgCartaBig+'px',marginTop:topMrgCartaBig+'px'},{duration:300});			
			$('#' + cartaScelta + ' .fronte').css({'margin-left':Math.floor(lCartaBig*0.5) + 'px', 'height':Math.ceil(hCartaBig*1) + 'px',  'background-image':'url(' + percorsoCarte + cartaScelta + '.png)'});
			$('#' + cartaScelta).addClass('cartaScelta').removeClass('carta');
			setTimeout(function(){
				$('#' + cartaScelta + ' .dorso').stop().animate({width:'0px',marginLeft:Math.floor(lCartaBig*0.5) + 'px'},{duration:300});
			}, 300);
			
			setTimeout(function(){
				$('.carta').stop().animate({opacity:0},{duration:300});
				//$('#' + cartaScelta).css('z-index','2');			
				$('#' + cartaScelta + ' .fronte').stop().animate({width:Math.ceil(lCartaBig*1) + 'px', marginLeft:'0px'},{duration:300});
				//$('#' + cartaScelta).stop().animate({top:0,left:0,width:lCartaBig + 'px',height:hCartaBig + 'px', marginLeft:lftMrgCartaBig+'px',marginTop:topMrgCartaBig+'px'},{duration:300});
			}, 600);	
			
			setTimeout(function(){
				$('#' + cartaScelta + ' .fronte').html('<div class="leggi"></div>');
				$('#' + cartaScelta + ' .fronte .leggi').css({'width':'100%','height':Math.ceil(hCartaBig*0.08) + 'px','bottom':Math.ceil(hCartaBig*0.02) + 'px','display':'block'});
				$('#' + cartaScelta + ' .fronte .leggi').on('click',function(e){					
					mostraOracolo(idArg,cartaScelta);
				});
				
				
			}, 1000);		
			
		});
	}
	
	
	carteDistribuite();
}

function mescolaCarte(idArg) {
	$('.pagina').css('display','none');	
	//$('.testata-argomento').css('background-image','url(img/ico1.png)');
	
	var hUnit = 0;
	var hMain = 0;
	var lArea = 0;
	var hArea = 0;
	var lCarta = 0;
	var hCarta = 0;
	var scala = 1.86;
		
	hUnit = Math.ceil($(window).height()/14);
	hMain = $(window).height() - hUnit*1 - 0;
	wMain = $(window).width();
	
	lArea = Math.floor(wMain*0.9);
	hArea = Math.floor(hMain*0.9);
	
	lCarta = Math.floor(Math.sqrt(wMain*0.9*0.25)); 
	hCarta = Math.floor(lCarta*scala); 
	$('#photos').css({'width':lArea + 'px','height': hArea + 'px', 'top': 2*hUnit + 'px' , 'left':Math.floor(wMain*0.05) + 'px'});	
	$('#photos li').css({'width':6*lCarta + 'px','height': 6*hCarta + 'px'});		
	$('#mescolacarte').css('display','block');	
	
	$('#photos').sphere3d({
		elems: 'li',
		scale: 1,
		reveal: 2
    });
		
	
	var intervalloMsc=setTimeout(function(){
		clearTimeout(intervalloMsc);
		$('#photos').sphere3d( false );		
		mostraCarte(idArg);
	}, 3000);
	
	
	$('#photos').on('click',function(e){
		clearTimeout(intervalloMsc);
		$('#photos').sphere3d( false );
		mostraCarte(idArg);		
	});
	
	
}


// FUNZIONE AVVIO
function appInizia() {

	var hUnit = 0;
	var hMain = 0;
	hUnit = Math.ceil($(window).height()/14);
	hMain = $(window).height() - hUnit;
	$('.header').css({'height': hUnit + 'px'});
	
	$('.header h4').css({'line-height': hUnit*1 + 'px', 'font-size': hUnit*0.5 + 'px'});
	$('#main').css({'top':  hUnit + 'px', 'height': hMain + 'px'});
	$('#main .segnaposto').css({'margin-top':  Math.ceil(hMain/56) + 'px', 'height': Math.ceil(hMain/7) + 'px', 'padding':'0', 'font-size': Math.ceil(hMain/14) + 'px', 'line-height': Math.ceil(hMain/7) + 'px'});
	
	$('#anteprima').css('z-index','99');	
	$('#sfondo').css('display','none');
	$('#home').css('display','block');
	
	$('#anteprima').fadeTo(800 , 0, function() {
		$('#anteprima').css('display','none');
	});
	
	$('.argomento').click(function(){
		mescolaCarte($(this).attr('id'));
	});
	
	$('.consiglio').click(function(){
		mostraOracolo('A1','cdg');
	});	
	
	
};


function riprova() {
	$('#riprova').css('display','none');
	$('#sfondo').removeClass('errore');
	testConn();
}

function doConnectFunction() {
	//alert('sei connesso');
	// carico i contenuti;		
	appInizia();
}

function doNotConnectFunction() {
	$('#sfondo').addClass('errore');
	//alert('ATTENZIONE: non sei connesso');
	$('#riprova').css('display','block');
	$('#riprova').click(function() {riprova();});
}

function testConn() {
	var i = new Image();
	i.onload = doConnectFunction;
	i.onerror = doNotConnectFunction;
	// IMMAGINE DI TEST
	i.src = 'http://www.massimoabbondi.it/apps/test.gif?d=' + escape(Date());
}