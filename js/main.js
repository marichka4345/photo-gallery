 $(function() {
     animateScroll();
     scrollMenu();
 });

 function animateScroll() {
     $('a[href*="#"]:not([href="#"])').click(function() {
         if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
             var target = $(this.hash);
             target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
             if (target.length) {
                 $('html, body').animate({
                     scrollTop: (target.offset().top - parseFloat(target.css('padding-top')))
                 }, 1000);
                 return false;
             }
         }
     });
 }

 function scrollMenu() {
     var header = $('.main-header');
     $(window).on('scroll', function() {
         if ($(this).scrollTop() > 200) {
             header.addClass('menu-scrolled');
             $('.menu').addClass('menu-scrolled');
             var logoPath = '../img/ico/svg/black-logo.svg',
                 fallbackPath = '../img/ico/png/black-logo.png';
             var topLogoSrc = $('.top-logo img').attr('src');
             if (topLogoSrc.slice(-3) === 'svg') $('.top-logo img').attr('src', logoPath);
             else topLogoSrc = fallbackPath;
             $('.login-container').css('color', '#000');
             $('.user-links').addClass('user-link-scrolled');
             $('.login-btn').addClass('login-btn-scrolled');
             $('.site-search .flaticon-search').addClass('search-icon-scrolled');
             $('.site-search .search').addClass('search-scrolled');

         } else {
             header.removeClass('menu-scrolled');
             $('.menu').removeClass('menu-scrolled');
             var logoPath = '../img/ico/svg/white-logo.svg',
                 fallbackPath = '../img/ico/png/white-logo.png';
             var topLogoSrc = $('.top-logo img').attr('src');
             if (topLogoSrc.slice(-3) === 'svg') $('.top-logo img').attr('src', logoPath);
             else topLogoSrc = fallbackPath;
             $('.login-container').css('color', '#fff');
             $('.user-links').removeClass('user-link-scrolled');
             $('.login-btn').removeClass('login-btn-scrolled');
             $('.site-search .flaticon-search').removeClass('search-icon-scrolled');
             $('.site-search .search').removeClass('search-scrolled');
         }
     });
 }