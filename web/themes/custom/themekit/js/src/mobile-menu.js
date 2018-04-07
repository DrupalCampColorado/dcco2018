import $ from 'jquery';

$('.mobile-menu').click(function (e) {
  $(this).toggleClass('open cross');
  $('.menu--main').toggleClass('open');
  $('.layout-container').toggleClass('fixed');
});

$('#block-useraccountmenu').clone().addClass('cloned').appendTo('#block-themekit-main-menu');