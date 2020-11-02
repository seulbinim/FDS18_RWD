(function landingControl() {
  'use strict';

  var templateLanding =
    '\
    <figure class="landing-cover" style="{landingStyle}">\
      <img src="../images/landing-brand.svg" alt="이디야 커피 브랜드(학습용) 디자인" />\
    </figure>\
  ';

  var landingStyle = [
    'display: flex',
    'justify-content: center',
    'align-items: center',
    'position: fixed',
    'z-index: 10000',
    'top: 0',
    'right: 0',
    'bottom: 0',
    'left: 0',
    'margin: 0',
    'background: #24388D',
    'transition: all 0.84s ease',
  ].join(';');

  var landingCover = null;
  var hideTime = 1400;

  function init() {
    templateLanding = templateLanding.replace(/{landingStyle}/, landingStyle);
    document.body.insertAdjacentHTML('afterbegin', templateLanding);
    landingCover = document.querySelector('.landing-cover');
  }

  function hideLandingCover() {
    landingCover.style.opacity = 0;
    landingCover.addEventListener('transitionend', handleRemoveLandingCover);
  }

  function handleRemoveLandingCover() {
    this.remove();
  }

  init();

  window.setTimeout(hideLandingCover, hideTime);
})();
