(function($) {
	$.fn.fullDivGal = function(){
		
		// GET DATA & CREATE OBJECTS
		var wrapper = $('#work-detail-wrapper');
		var divGal = $(this);
		var imgs = divGal.find('img');  // get images
		var videos = divGal.find('iframe'); //get embeded videos
		var nvideos = videos.length;
		var videoshtml5 = divGal.find('video'); //get html5 videos
		var nvideoshtml5 = videoshtml5.length;
		var listas = divGal.find('li');  // get li		
		var nimgs = listas.length;  // images number
		var posicion = 0;
		var slides = divGal.find('ul');
		var fdgThumbs = $('<ul id="fdgThumbs"></ul>');
		var divThumbs = $('<div id="divThumbs"></div>');
		var fdgNav = $('<div id="fdgNav"></div>');
		var fdgPrev = $('<span id="fdgPrev">Prev</span>');
		var fdgNext = $('<span id="fdgNext">Next</span>');
		
		// CREATE SLIDES & THUMBS
		function creaLista(valor){
			var lThumb = $('<li id="fdgt'+ valor +'"><img src="'+ imgs.eq(valor).attr('src')+'" /></li>');
			lThumb.click(function(){
				posicion = valor;
				coloca();
			});
			fdgThumbs.append(lThumb);
		};
		for ( i=0; i < nimgs; i++){
			creaLista(i);
		};
		// PRELOAD & LOAD IMAGES
		for ( i = 0 ; i < nimgs ; i++ ){
			imgs.eq(i).load(function(){
				escala();
				fdgCenter();
				ratioThumbnails();
			});
		};
		
		
		//SET VIDEO WIDTHS	
		//Set widths for embededd videos
		for ( n = 0 ; n < nvideos ; n++ ){
			var vWidth = videos.eq(n).attr("width");
			var vHeight = videos.eq(n).attr("height");
				
			videos.eq(n).parent().parent().css('width', vWidth);
		};
			
		//Vertical centering for emebeded videos
		function centerVideos(){
			for ( n = 0 ; n < nvideos ; n++ ){
				var galHeight = $("#work-detail-wrapper").height();
				var videoHeight = videos.eq(n).height();
				var theMiddleGal = galHeight/2;
				var theMiddleVideo = videoHeight/2;
				var centeredVideo =  theMiddleGal-theMiddleVideo;
				
				var vWidth = videos.eq(n).attr("width");
				var vHeight = videos.eq(n).attr("height");
					
				videos.eq(n).parent().parent().css('margin-top', centeredVideo-80);
				
			};
		};
		centerVideos();	
		
		//Set widths for HTML5 videos
		for ( n = 0 ; n < nvideoshtml5 ; n++ ){
			var vWidth = videoshtml5.eq(n).attr("width");
			var vHeight = videoshtml5.eq(n).attr("height");
				
			videoshtml5.eq(n).parent().parent().css('width', vWidth);
		};
		
		function centerVideoshtml5(){
			for ( n = 0 ; n < nvideoshtml5 ; n++ ){
				var galHeight = $("#work-detail-wrapper").height();
				var videoHeight = videoshtml5.eq(n).height();
				var theMiddleGal = galHeight/2;
				var theMiddleVideo = videoHeight/2;
				var centeredVideo =  theMiddleGal-theMiddleVideo;
				var vWidth = videoshtml5.eq(n).attr("width");
				var vHeight = videoshtml5.eq(n).attr("height");
					
				videoshtml5.eq(n).parent().parent().css('margin-top', centeredVideo-90);
			};
		};
		centerVideoshtml5();
		
		
		// SET NAVIGATION FUNCTIONS
		fdgPrev.click(function(){
			if (posicion != 0){
				posicion--;
				coloca();
			};
		});
		fdgNext.click(function(){
			if (posicion < (nimgs - 1) ){
				posicion++;
				coloca();
			};
		});
		
		
		// KEYBOARD ACTIONS
		function prevySlide(){
			if (posicion != 0){
				posicion--;
				coloca();
			};
		};					
							
		function nextySlide(){
			if (posicion < (nimgs - 1) ){
				posicion++;
				coloca();
			};
		};
		
		function showThumbsKey(){
			divThumbs.stop();
			divThumbs.animate({
				marginTop: '-75px'
			}, 500);
			$("#up").delay(50).fadeOut(100);
		};
		
		function hideThumbsKey(){
			divThumbs.stop();
			divThumbs.animate({
				marginTop: 0
			}, 500 );
			$("#up").delay(200).fadeIn(100);
		};
		
		$(document).keydown(function(e){								  
			 switch(e.keyCode) { 
			 // User pressed "up" arrow
			 case 37:
			   prevySlide()
					direction = 'prev';
			 break;
			 // User pressed "down" arrow
			 case 39:
				nextySlide();
					direction = 'next';
			 break;
			 // User pressed "enter"
			 case 38:
				e.preventDefault();
				showThumbsKey();
			 break;
			 case 40:
				e.preventDefault();
				hideThumbsKey();
			 break;
		  	 }
	    });
		
		
		// GEstures
		
		$('#fdgSlides').touchwipe({
                wipeLeft: function(){ nextySlide();
					direction = 'next'; },
                wipeRight: function(){ prevySlide()
					direction = 'prev'; },
                wipeUp: function(){ hideThumbsKey(); },
                wipeDown: function(){ showThumbsKey(); }
        })
		
		// SLIDE - Set horizontal ul#slide
		function coloca(){
			slides.stop();
			slides.animate({ left : '-'+divGal.width() * posicion }, 500);
			( posicion == 0 ) ? fdgPrev.addClass('hide') : fdgPrev.removeClass('hide');
			( posicion == ( nimgs - 1) ) ? fdgNext.addClass('hide') : fdgNext.removeClass('hide');
		};
		
		
		// CENTERING LAYERS
		function fdgCenter(){
			var slidesLi = slides.find('li');
			var ratGal =  divGal.width() / divGal.height();
			// fix width ul#slide
			slides.width( divGal.width() * nimgs );
			slides.height( divGal.height());
			// fix width ul#slide li
			slidesLi.width( divGal.width());
			slides.css( 'left', '-' + divGal.width() * posicion +'px' );
		};
		
		
		//ON RESIZE
		$(window).resize(function(){
			fdgCenter();
			escala();
			centerVideos();
			centerVideoshtml5();
			placethumbs();
		});
	
		 // SCALE IMAGES
		function escala(e){
			var ratGal = divGal.width() / divGal.height() ;
			var cual;
			function escalada(x){
				var ratCual = x.width() / x.height();
				if ( ratCual > ratGal){
					x.width('100%');
					x.height('auto');
				} else{
					x.width('auto');
					x.height('100%');
				};
				x.stop().animate({
					marginTop : '-' + ( cual.height() / 2 ) + 'px'
				}, 300);
			};

			if (e){
				cual = imgs.eq(e);
				escalada(cual);
			}else{
				for (i= 0; i < nimgs ; i++){
					cual = imgs.eq(i);
					escalada(cual);
				};
			};
		};
		
		
		// :hover LINK IMAGES
		function hoverimg(){
			$('ul#fdgSlides li a img').css("opacity", "0.85");
			$('ul#fdgSlides li a img').mouseenter(function(){
				$(this).stop().animate({
					opacity: 0.4
				}, 700);
			});
			$('ul#fdgSlides li a img').mouseleave(function(){
				$(this).stop().animate({
					opacity: 0.85
				}, 700);
			});
		}
		
		
		// THUMBS BEHAVIORS
		divThumbs.mouseenter(function(){
			$(this).stop();
			$(this).animate({
				marginTop: '-75px'
			}, 500);
			$("#up").delay(200).fadeOut(100);
		});
		divThumbs.mouseleave(function(e){
			$(this).stop();
			$(this).animate({
				marginTop: 0
			}, 1000 );
			$("#up").delay(200).fadeIn(100);
		});
		divThumbs.mouseleave();
		
		// ADD ELEMENTS AND CENTER & SCALE THE LAYERS
		fdgNav.append(fdgPrev);
		fdgNav.append(fdgNext);
		fdgNav.append('<span id="keyboard-icon"><a href="#">&nbsp;</a></span>')
		$('#slideshow').append(fdgNav);//work-gal is the wrapper for the V1 Gallery
		$('#work-gallery .item').append('<span id="info-btn"><a href="#">info</a></span>')
		$('#work-gallery').append(fdgNav);
		divThumbs.append(fdgThumbs);
		divThumbs.append($('<div class="clearfix"></div>'));
		divThumbs.append($('<span id="up">· · ·</span>'));
		$("#slideshow").append(divThumbs);
		fdgCenter();
		coloca();
		escala();
		hoverimg();
		
		function ratioThumbnails()
		{
		var numImgs = document.images.length;
		var imgEl;
		var w;
		var h;
		for (i = 0; i < nimgs; i++)
			{	
					w = $("#fdgSlides li img").eq(i).width();
					h = $("#fdgSlides li img").eq(i).height();
					
					if (w > h)
							{
								//if you change the ratio for horizontal images
								//you will need to adjust the ratio for vertical
								//images. If you do it chack the height of your
								//horizontal images and set the same value for
								//verticale images
								divFactor = w / 50;
							}
						else 
							{	
								//this factor should be equal to the height
								//generated for horizontal images in order
								//to preserve the general thumbs height
								divFactor = h / 70;
							}
						//constrains either the width or height (whichever is largest) to div factor
						//also figures out how much the other dimension will have to be
						//divided by to make it proportional.
				
					thumbWidth = Math.round(w / divFactor);
					thumbHeight = Math.round(h / divFactor);
					imgEl = $(".galThumb").eq(i);
					imgEl
						.css("width", thumbWidth)
						.css("height", thumbHeight)
						.css("overflow", "hidden");
				}
		}
		ratioThumbnails();
		
		function placethumbs(){
			var divThumbsWidth = $("#divThumbs").width();
			var ulWidth = $("ul#fdgThumbs").width();
			var spacethumbsMiddle = divThumbsWidth/2;
			var thumbsMiddle = ulWidth/2;
			var centeredThumbs =  spacethumbsMiddle-thumbsMiddle;
			$("ul#fdgThumbs").css('margin-left', centeredThumbs);
			}
		placethumbs();
		
	};
})(jQuery)
