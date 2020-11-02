(function goToTopControl() {
  'use strict';

  function init() {
    var appHeader = document.querySelector('.app-header');

    new GoToTop({
      targetTop: appHeader.getBoundingClientRect().bottom,
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
