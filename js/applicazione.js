// JavaScript Document

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
	
	if (lArea*1.8<hArea) {
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
			
	$('#tavolocarte').css('display','block');	
	//$('#areacarte').css({'width':lArea + 'px','height': hArea + 'px', 'top': 2*hUnit + 'px' , 'margin': Math.floor(wMain*0.05) + 'px ' + Math.floor(hMain*0.05) + 'px'});
	$('#areacarte').css({'width':lArea + 'px','height': hArea + 'px', 'top': 2*hUnit + 'px' , 'left':Math.floor(wMain*0.05) + 'px'});
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
		$('#c' + i.toString() + ' .dorso').html((i+1).toString());
		cLeft++;
		
	}
	
	shuffle(casualeIndex1);
	shuffle(casualeIndex2);
	
	
	var indexDistr = -1;
		
	function carteDistribuite() {
		indexDistr++;
		if (indexDistr<22) {
			$('#c' + casualeIndex1[indexDistr].toString()).animate({'top': posizY[casualeIndex2[indexDistr]]  + 'px','left': posizX[casualeIndex2[indexDistr]] + 'px'}, { duration: 200, easing: "linear", complete: carteDistribuite });
		} else {
			assegnaClick();	
		}
		
   	}
	
	
	
	$('.carta').css({top:hArea + 'px',left:Math.floor((lArea-lCarta)*0.5) + 'px'});
	
	function assegnaClick() {	
		$('.carta').on('click',function(e){
			$('.carta').unbind('click');
			var cartaScelta = $(this).attr('id');
			$('#' + $(this).attr('id') + ' .dorso').stop().animate({width:'0px',marginLeft:''+ Math.floor(lCarta*0.9*0.5) +'px'},{duration:300});
			$('#' + cartaScelta + ' .fronte').css({'margin-left':Math.floor(lCarta*0.9*0.5) + 'px','background-image':'url(img/' + cartaScelta + '.png)'});
			$('#' + cartaScelta).addClass('cartaScelta').removeClass('carta');
			setTimeout(function(){
				$('#' + cartaScelta + ' .fronte').stop().animate({width:Math.ceil(lCarta*0.9) + 'px',marginLeft:'0px'},{duration:300});
			}, 300);
			
			setTimeout(function(){
				$('.carta').stop().animate({opacity:0},{duration:300});
				$('#' + cartaScelta).css('z-index','2');			
				$('#' + cartaScelta + ' .fronte').stop().animate({width:Math.ceil(lCartaBig*1) + 'px',height:Math.ceil(hCartaBig*1) + 'px'},{duration:300});
				$('#' + cartaScelta).stop().animate({top:0,left:0,width:lCartaBig + 'px',height:hCartaBig + 'px', marginLeft:lftMrgCartaBig+'px',marginTop:topMrgCartaBig+'px'},{duration:300});
			}, 600);			
			
		});
	}
	
	
	carteDistribuite();
}



// FUNZIONE GALLERY
function gallery() {
	
	var urlJsonpG = 'http://www.massimoabbondi.it/apps/pandino/data/gallery.php';
	
	function jsonpCallback(response){
		$('#galleria .swiper-wrapper').append(response);
		var hUnit = 0;
		var hMain = 0;
		hUnit = Math.ceil($(window).height()/14);
		hMain = $(window).height() - hUnit*1 - 0;
		
		$('.back-home').css('width', 2*hUnit + 'px');
		$('.back-home').click(function(){
			$('.pagina').css('display','none');
			$('#home').css('display','block');
			
		});
		
		
		$('.header').css({'height': hUnit *1 + 'px'});
		$('.header h4').css({'line-height': hUnit*1 + 'px'});
		$('#galleria').css({'top':  hUnit *1 + 0 + 'px', 'height': hMain + 'px'});
		$('.centratoVert ').css({'height': hMain + 'px'});
		//$('#galleria .immagine').css({'height': Math.ceil(hMain/3) + 'px'});
		
		
		$('.pagina').css('display','none');
		$('#gallery').css('display','block');

		$('.centratoVert img').each(function() {				
			var altezza = $(this).height();
			//alert(altezza);
			if (altezza<hMain) {
				$(this).css({'top': Math.floor((hMain-altezza)*0.5) + 'px'});
			}
		});
	
		
		var mySwiperG = new Swiper('#galleria',{
			mousewheelControl: true,
			slidesPerView: 1,
			slidesPerGroup:1,
			mode:'vertical',
			

		});	
				
		
	}
	
	$.ajax({
		url: urlJsonpG,
		dataType: 'jsonp',
		error: function(xhr, status, error) {
				//alert(error);
				},
		success: jsonpCallback			
	});
	
};

// FUNZIONE SU CLICK NOTIZIA
function notizia(numNot, IDNuova) {
	
	var urlJsonpN = 'http://www.massimoabbondi.it/apps/pandino/data/notizia.php';
	
	
	function jsonpCallback(response){
		$('#flussoNotizie').html(response);
		
		var hUnit = 0;
		var hMain = 0;
		hUnit = Math.ceil($(window).height()/14);
		hMain = $(window).height() - hUnit*1 - 0;
		
		$('.back-home').css('width', 2*hUnit + 'px');
		$('.back-home').click(function(){
			$('.pagina').css('display','none');
			$('#home').css('display','block');
			
		});
		
		$('.pagina').css('display','none');
		$('#notizia').css('display','block');
		
				
		// inizio codice swipe e scroll pages
		$('.swiper-pages').css({
			'height': hMain + 'px',
			'top': hUnit + 'px'
			
		});
		
		//inizializza Pagine
		var pages = $('.swiper-pages').swiper();
	
		//Scroll Containers
		$('.scroll-container').each(function(){
			$(this).swiper({
				mode:'vertical',
				scrollContainer: true,
				mousewheelControl: true,
				scrollbar: {
					container:$(this).find('.swiper-scrollbar')[0]
				}
			})
		});
		
		var mySwiperN = new Swiper('.swiper-pages', { 
			speed:750, 
			mode:'horizontal',
			initialSlide:numNot
		});				
		// fine codice swipe e scroll pages
		
		// se la notizia è nuova, tolgo il segno di notifica dall'elenco in home visto che l'ho appena cliccata;
		$('#n' + IDNuova + ' .novita').css('display','none');
		if ($.inArray(IDNuova, arrLette)==-1) {
			// se ho già dieci elementi rimuovo il più vecchio;
			if(arrLette.length>9) {
				arrLette.splice(0,1);
			}
			arrLette.push(IDNuova);
			//setCookie('mieLetture',arrLette.toString() ,30);
			setit('mieLetture',arrLette.toString());
		}
			
											
	}
	
	$.ajax({
		url: urlJsonpN,
		dataType: 'jsonp',
		data: { IDNotizia: numNot, location: 'notizia' },
		error: function(xhr, status, error) {
				//alert(error);
				},
		success: jsonpCallback			
	});
	
};


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
		scale: 0.95,
		reveal: 2
    });
		
	
	$('#photos').on('click',function(e){
		mostraCarte(idArg);		
	});
	
	/*
	setTimeout(function(){
		mostraCarte(idArg);
	}, 60000);
	*/
}


// FUNZIONE AVVIO
function appInizia() {
	
	var urlJsonp = 'http://www.massimoabbondi.it/apps/pandino/data/home.php';
	
	function jsonpCallback(response){
		//$('#main .swiper-wrapper').append(response);
		var hUnit = 0;
		var hMain = 0;
		hUnit = Math.ceil($(window).height()/14);
		hMain = $(window).height() - hUnit;
		$('.header').css({'height': hUnit + 'px'});
		
		$('.header h4').css({'line-height': hUnit*1 + 'px', 'font-size': hUnit*0.5 + 'px'});
		$('#main').css({'top':  hUnit + 'px', 'height': hMain + 'px'});
		$('#main .segnaposto').css({'margin-top':  Math.ceil(hMain/56) + 'px', 'height': Math.ceil(hMain/7) + 'px', 'padding':'0', 'font-size': Math.ceil(hMain/14) + 'px', 'line-height': Math.ceil(hMain/7) + 'px'});
		
		//$('.footer').css({'height': hUnit *1 + 'px'});
		$('.pmenu').css({'height': hUnit + 'px'});
		$('.pmenu h4').css({'line-height': hUnit + 'px'});		
		
		$('#sfondo').css('display','none');
		$('#home').css('display','block');
		
		$('.argomento').click(function(){
			mescolaCarte($(this).attr('id'));
		});
	
					
		
	}
	
	$.ajax({
		url: urlJsonp,
		dataType: 'jsonp',
		error: function(xhr, status, error) {
				//alert(error);
				},
		success: jsonpCallback			
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