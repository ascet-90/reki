
$(document).ready(function() { 

  checkSupport();
  function checkSupport() {
      var html = document.documentElement,
          WebP = new Image();

      WebP.onload = WebP.onerror = function() {
          isSupported = (WebP.height === 2);

          if (isSupported) {
              if (html.className.indexOf('no-webp') >= 0)
                  html.className = html.className.replace(/\bno-webp\b/, 'webp');
              else html.className += ' webp';
          }
          //fn(isSupported);
      };
      WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

   

  $('input[type=tel]').inputmask({ "mask": "+7 (999) 999-99-99" });

    $('.mob_toggle').click(function(){
      var ths = $(this);
      if ($('.mobile-nav').hasClass('open')) {
          $('.mobile-nav').removeClass('open');
          $('.mob_toggle').removeClass('open');
          $('body').css('overflow-y','auto');
          $('header').removeClass('open');
      }else{
          $('.mobile-nav').addClass('open');
          $('.mob_toggle').addClass('open');
          $('header').addClass('open');
          $('body').css('overflow-y','hidden');
      }
      return false;
  });


  $('.slider_main').slick({
      accessibility: false,
      dots: false,
      arrows: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,  
      appendArrows: $('.slider_arrows > div'),
      prevArrow: '<button id="prev" type="button" class="prev"><img src="img/arrow-left.svg"></button>',
      nextArrow: '<button id="next" type="button" class="next"><img src="img/arrow-right.svg"></button>'
  });
  


  if($(window).width()<768){
     $('.slider_main .slide.slick-current.first-slide .slide_bg').addClass('loaded-slide');
     setTimeout(function(){
        $('.slider_main .slide.slick-current.first-slide .slide_bg').removeClass('loaded-slide');
        $('.slider_main .slide').removeClass('first-slide');
     }, 3000);
   }
   





    if($(window).width()>480){
      $('[data-fancybox="gallery"]').fancybox({
        thumbs : {
          autoStart : true
        }
      })
    };

  setTimeout(function(){

    if (typeof ymaps !== 'undefined') {
      ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
            center: ['50.189513', '53.285882'],
            zoom: '13',
            controls: ['routePanelControl']
        }, {
            searchControlProvider: 'yandex#search'
        }),
        myPlacemark = new ymaps.Placemark(['55.6815238', '37.5571908'], {
            hintContent: 'База отдыха Река',
            balloonContent:'База отдыха Река'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'favicon.png'
        });

        myMap.geoObjects.add(myPlacemark);

        var control = myMap.controls.get('routePanelControl');

    // Зададим состояние панели для построения машрутов.
    control.routePanel.state.set({
        // Тип маршрутизации.
        type: 'masstransit',
        // Выключим возможность задавать пункт отправления в поле ввода.
        fromEnabled: true,
        // Адрес или координаты пункта отправления.
        from: '',
        // Включим возможность задавать пункт назначения в поле ввода.
        toEnabled: false,
        // Адрес или координаты пункта назначения.
        to: 'Самара, ул. Берег реки Волги, 1'
    });

    // Зададим опции панели для построения машрутов.
    control.routePanel.options.set({
        // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
        allowSwitch: false,
        // Включим определение адреса по координатам клика.
        // Адрес будет автоматически подставляться в поле ввода на панели, а также в подпись метки маршрута.
        reverseGeocoding: true,
        // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
        types: { masstransit: true, pedestrian: true, taxi: true }
    });

        myMap.controls
        .remove('geolocationControl')
        .remove('typeSelector')
        .remove('searchControl')
        .remove('trafficControl')
        .remove('rulerControl')
        myMap.behaviors.disable([
           // 'scrollZoom',
           // 'dblClickZoom'
            ]);
     });
    } 

  }, 3000);
    
    $('.map_popup').click(function(e) {
      e.preventDefault();
      $('#map_modal').addClass('open');
      $('body').css({'overflow-y': 'hidden'});
      return false;
    });
    $('.modal_sandbox, .modal .close').click(function(e) {      
      $('#map_modal').removeClass('open');
      $('#form_modal').removeClass('open');
      $('body').css({'overflow-y': 'auto'});
    });
    $('#form_modal .modal_sandbox,#form_modal .close').click(function(e) {  
      $('#form_modal').removeClass('open');
      $('body').css({'overflow-y': 'auto'});
    });

    var pl = $('.container').css('margin-left');
    $('.fund_inner').css({'margin-left': pl});

    $('.tabs').tabs();

    $('.fund_tabs .fund_tab').each(function(){
      var slider = $(this).find('.slider');
      slider.slick({
        accessibility: false,
        dots: true,
        arrows: true,
        infinite: false,
        lazyLoad: 'ondemand',
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        appendDots: slider.next('.slider_controls'),
        prevArrow: '<button id="prev" type="button" class="prev"><img src="img/arrow-left.svg"></button>',
        nextArrow: '<button id="next" type="button" class="next"><img src="img/arrow-right.svg"></button>'
      });
      slider.next('.slider_controls').find('button.next').click(function(){
        $(this).closest('.slider_controls').prev('.slider').slick('slickNext');
      });
      slider.next('.slider_controls').find('button.prev').click(function(){
        $(this).closest('.slider_controls').prev('.slider').slick('slickPrev');
      });
    });
    
    
    $('.tabs ul li a').click(function() {
      var href = $(this).attr('href');
      $(this).closest('.tabs').find(href).find('.slider').slick('setPosition');
     $(this).closest('.tabs').find(href).find('.slider').slick('slickGoTo', 0);
     $(this).closest('.tabs').find(href).find('.slider').resize();
    });

    $('.fund_tabs .slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        if(slick.slideCount-1 == currentSlide) {
            $(this).find('.slick-arrow.next').css({'opacity': '0'});
        }
        else {
          $(this).find('.slick-arrow.next').css({'opacity': '1'});
        }
    });

    $('.gallery_slider').slick({
      accessibility: false,
      dots: true,
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      rows: 2,
      slidesPerRow: 3,
      appendDots: $('.gallery_slider').next('.slider_controls'),
      prevArrow: '<button id="prev" type="button" class="prev"><img src="img/arrow-left.svg"></button>',
      nextArrow: '<button id="next" type="button" class="next"><img src="img/arrow-right.svg"></button>',
      responsive: [
        {
          breakpoint: 541,
          settings: {
            rows: 3,
            slidesPerRow: 2,            
          }
        }
      ]
    });

    $('.gallery_slider').next('.slider_controls').find('button.next').click(function(){
      $(this).closest('.slider_controls').prev('.gallery_slider').slick('slickNext');
    });
    $('.gallery_slider').next('.slider_controls').find('button.prev').click(function(){
      $(this).closest('.slider_controls').prev('.gallery_slider').slick('slickPrev');
    });

    $( "#accordion" ).accordion({
      heightStyle: "content"
    });

    if($(window).width() > 1024) {
      var section_width = $("#accordion").prev('.section_title').width();
      $("#accordion .accordion_link").first().css({'left': section_width + 40});
      console.log(section_width);
      $("#accordion .accordion_link:not(:first-child)").each(function(index, el) {
        var prevLeft = parseInt($(el).prev().prev().css('left'));
        var prevWidth = $(el).prev().prev().width();
        $(el).css({'left': prevLeft + prevWidth + 60});
      })
    }

    // if($(window).innerWidth() <= 540) {
    //   var seo_text_height = $('.base_description .section_text').height();

    //   if(seo_text_height > 120) {
    //       $('.base_description .section_text').height(120);
    //   }

    //   $('.base_description .section_text_more').click(function(e) {
    //       var seo_text = $(this).prev('.section_text');
    //       if(seo_text.hasClass('open')) {
    //           seo_text.removeClass('open');
    //           seo_text.animate({
    //               height: 120
    //           }, 400);
    //           $(this).text('Развернуть');
    //       }
    //       else {
    //           seo_text.addClass('open');
    //           seo_text.animate({
    //               height: seo_text_height
    //           }, 400);
    //           $(this).text('Свернуть');
    //       }
    //       return false;
    //   });
    // }

    $('.base_description .section_text_more').click(function(){
      $('.base_description .section_text').toggleClass('active');
      if($('.base_description .section_text').hasClass('active')){
        $(this).text('Свернуть');
      }
      else {
        $(this).text('Развернуть');
      }
      return false;
    });
    
    var scrollPos = $('.footer_right .form').offset().top;
    $('.form_link,.header .call').click(function () {
        $('.mob_toggle').removeClass('open');
        $('.mobile-nav').removeClass('open');
        $('body').css({'overflow-y': 'auto'});
        $('body,html').animate({
            scrollTop: scrollPos - 130
        }, 400);
        return false;
    });
    
    var scrollPosMenu = null;
    $('.header .menu a, .header .mobile-nav__menu a').click(function () {
        $('.mob_toggle').removeClass('open');
        $('.mobile-nav').removeClass('open');
        $('body').css({'overflow-y': 'auto'});
        if($(this).data('scroll')) {
          var scrollTo = '.' + $(this).data('scroll');
          scrollPosMenu = $(scrollTo).offset().top;
          $('body,html').animate({
              scrollTop: scrollPosMenu - 130
          }, 400);
        }        
        return false;
    });


    if($(window).scrollTop() >= 50) {
      $('.header').addClass('fixed');
    }
    else {
      $('.header').removeClass('fixed');
    }

    $('.scroll_top').click(function(){
      $('body,html').animate({
        scrollTop: 0
      }, 400);
      return false;
    });

    var galnum = 1;
    $('body').on('click', '.gallery_more button.canload', function(){
      images_load();
    });

    function images_load() {
      galnum = galnum + 6;
      $.ajax({
        url: 'gallery.php',
        type: 'POST',
        data: 'galnum='+galnum,
        beforeSend: function( xhr ) {
           $('.gallery_more button img').addClass('loading');
        },
        success: function( data ) {
          $('.gallery_grid').append(data);
          $('.gallery_more button img').removeClass('loading');
          var n = data.indexOf("tomach");
          if(n!=-1){
            $('.gallery_more button').html('<span></span><img src="img/gallery-more.svg"> Свернуть');
            $('.gallery_more button').removeClass('canload');
            $('.gallery_more button').addClass('noload');
          };
          $('.tomach').remove();
          if($(window).width()>480){
            $('[data-fancybox="gallery"]').fancybox({
              thumbs : {
                autoStart : true
              }
            })
          };
        }
      });
    }

    $('body').on('click', '.gallery_more button.noload', function(){
      $('.gallery_more button').html('<span></span><img src="img/gallery-more.svg"> Показать еще фотографии');
      $('.gallery_more button').addClass('canload');
      $('.gallery_more button').removeClass('noload');
      $('.gallery_grid .gallery_item').not('.firstload').remove();
      $('html, body').animate({
        scrollTop: parseInt($('.gallery_grid').offset().top)
      }, 1000);
      galnum = 1;
    })

   
    $('body').on('click', '#accordion .accordion_link', function(){
      if($(window).width()<992){
        $('html, body').animate({
          scrollTop: parseInt($('.price_list .section_title').offset().top)-80
        }, 1000);
      }
    })

});

$(window).on('resize', function() {
    var pl = $('.container').css('margin-left');
    $('.fund_inner').css({'margin-left': pl});

    if($(window).width() > 1024) {
      $('.mobile-nav').removeClass('open');
      $('.mob_toggle').removeClass('open');
      $('body').css({'overflow-y': 'auto'});
      var section_width = $("#accordion").prev('.section_title').width();
      $("#accordion .accordion_link").first().css({'left': section_width + 40});
      
      $("#accordion .accordion_link:not(:first-child)").each(function(index, el) {
        var prevLeft = parseInt($(el).prev().prev().css('left'));
        var prevWidth = $(el).prev().prev().width();
        $(el).css({'left': prevLeft + prevWidth + 60});
      })
    }
    if($(window).width() <= 1024) {
      $("#accordion .accordion_link").css({'left': '0'})
    }    

})

$(window).scroll(function(){
  if($(window).scrollTop() >= 50) {
      $('.header').addClass('fixed');
      $('.scroll_top').css({'opacity': '1', 'visibility':'visible'});
    }
    else {
      $('.header').removeClass('fixed');
      $('.scroll_top').css({'opacity': '0', 'visibility':'hidden'});
    }
});

$('.form_wrap form,.footer_right form').find('input[type=submit]').click(function(e){
  var checkbox = $(this).closest('form').find('input[type=checkbox]');
  console.log(checkbox.is(':checked'))
  if(!checkbox.is(':checked')) {
    checkbox.closest('.custom_checkbox').addClass('pulse');
    setTimeout(function(){
      checkbox.closest('.custom_checkbox').removeClass('pulse');
    },1000);
  }
});

$('.form_wrap form,.footer_right form').submit(function(e) {
  var $form = $(this);
  var ph = $form.find('input[name=phone]').val();
  var valid = false;
  if(ph.indexOf('_') === -1){
    valid = true;
    // console.log(ph);
  }else{
    alert('Введите телефон полностью');
  }  
  if(!$form.find('input[type=checkbox]').is(':checked')) {
    valid = false;
    $(this).find('.custom_checkbox span').addClass('pulse');
    setTimeout(function(){
      $('.custom_checkbox span').removeClass('pulse');
    },2000);
  }
  if(valid) {
    $.ajax({
      type: "POST",
      url: $form.attr('action'),
      data: $form.serialize()
    }).done(function() {
      $('#form_modal').addClass('open');
      $('body').css({'overflow-y': 'hidden'});
      $form.trigger("reset");
    }).fail(function() {
      console.log('fail');
    });
  }
  
  
  e.preventDefault(); 
});

$(window).on('load', function(){
  //setTimeout(function(){$("body").addClass("load")},100);

})