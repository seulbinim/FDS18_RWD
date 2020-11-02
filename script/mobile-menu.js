var header = $('.app-header');
var btnMenuOpen = $('.is-open-menu');
var btnMenuClose = $('.is-close-menu');

btnMenuOpen.click(function(e) {
  e.preventDefault();
  header.addClass('is--active');
});
btnMenuClose.click(function(e) {
  e.preventDefault();
  header.removeClass('is--active');
});
