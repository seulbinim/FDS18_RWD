(function GoToTop() {
  'use strict';

  var templateButton =
    '<button type="button" class="button-goToTop">\
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">\
        <title>{title}</title>\
        <circle cx="25" cy="25" r="25" fill="#C8CDE2" />\
        <path d="M25 38C25.6072 38 26.1 37.5147 26.1 36.9167V15.3047L34.1037 23.5803C34.3198 23.804 34.6097 23.9167 34.9001 23.9167C35.1723 23.9167 35.4457 23.8175 35.6585 23.6177C36.0985 23.2049 36.1156 22.5192 35.6965 22.0858L26.556 12.6348C26.1402 12.2259 25.588 12 25 12C24.412 12 23.8598 12.2259 23.4259 12.6538L14.3035 22.0864C13.8844 22.5197 13.9015 23.2055 14.3415 23.6182C14.7815 24.031 15.4783 24.0142 15.8969 23.5808L23.9 15.2706V36.9167C23.9 37.5147 24.3928 38 25 38Z" fill="#0F0F0F" />\
      </svg>\
    </button>';

  /* 생성자 ---------------------------------------------------------------------- */

  function GoToTopClass(options) {
    this.init(options);
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */
  GoToTopClass.mixins = mixins;
  GoToTopClass.defaultOptions = {
    title: '페이지 상단 이동',
    targetTop: 50,
    activeClassName: 'is--active',
  };

  /* 인스턴스 멤버 ------------------------------------------------------------------ */
  function init(options) {
    this.options = GoToTopClass.mixins(GoToTopClass.defaultOptions, options);
    this.template = templateButton;
    this.render();
  }

  function render() {
    var title = this.options.title;
    this.template = this.template.replace(/{title}/g, title);
    document.body.insertAdjacentHTML('beforeend', this.template);

    this.bindEvents();
  }

  function bindEvents() {
    this.button = document.querySelector('.button-goToTop');
    this.button.addEventListener('click', this.goTo.bind(this, document.body));

    // 스크롤 이벤트 핸들링
    window.addEventListener('scroll', this.handleDisplayButtonGotoTop.bind(this));
  }

  function handleDisplayButtonGotoTop(e) {
    var targetTop = this.options.targetTop;
    var activeClassName = this.options.activeClassName;
    var button = this.button;

    // 브라우저 창 스크롤 Y축 위치
    var scrollTop = window.scrollY;

    // 조건 처리
    if (scrollTop > targetTop) {
      // 목표 위치보다 스크롤 위치가 클 경우
      // 활성 클래스 이름 추가
      button.classList.add(activeClassName);
    }
    else {
      // 목표 위치보다 스크롤 위치가 작을 경우
      // 활성 클래스 이름 제거
      button.classList.remove(activeClassName);
    }
  }

  function goTo(targetEl) {
    if (!targetEl || targetEl.nodeType !== 1) {
      throw new Error('전달되어야 하는 인자는 HTML 요소 객체여야 합니다.');
    }
    targetEl.scrollIntoView({ behavior: 'smooth' });
  }

  Object.defineProperties(GoToTopClass.prototype, {
    init: { value: init },
    render: { value: render },
    bindEvents: { value: bindEvents },
    goTo: { value: goTo },
    handleDisplayButtonGotoTop: { value: handleDisplayButtonGotoTop },
  });

  window.GoToTop = GoToTopClass;
})();
