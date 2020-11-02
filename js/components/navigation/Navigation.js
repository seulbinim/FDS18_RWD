(function Navigation() {
  'use strict';

  var setTimeout = window.setTimeout;

  /* 생성자 ---------------------------------------------------------------------- */

  function NavigationClass(navigationNode, options) {
    if (!navigationNode || navigationNode.nodeType !== 1) {
      throw Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.');
    }

    this.component = navigationNode;
    this.openButton = null;
    this.closeButton = null;

    if (options) {
      this.init(options);
    }
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  NavigationClass.mixins = mixins;
  NavigationClass.defaultOptions = {
    breakpoint: 768,
    list: [],
    templateId: '#template-id',
    openMen: null,
  };

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  function init(options) {
    this.options = NavigationClass.mixins(NavigationClass.defaultOptions, options);

    this.render();
    this.renderingDevice();
  }

  function renderingDevice() {
    if (window.innerWidth >= this.options.breakpoint) {
      this.component.hidden = false;
    }
  }

  function render() {
    var listData = this.options.list;
    var navigationItemsCode = listData.map(this.renderItemFromData.bind(this)).join('');
    this.component.querySelector('ul').innerHTML = navigationItemsCode;

    this.bindEvents();
    this.a11y();
  }

  function renderItemFromData(itemData) {
    var itemComponent = new NavigationItem(itemData, this.options.templateId);
    return itemComponent.render();
  }

  function bindEvents() {
    this.openButton = this.options.openButton;
    this.closeButton = this.component.querySelector('.button.is-close-menu');

    this.openButton.addEventListener('click', this.open.bind(this));
    this.closeButton.addEventListener('click', this.close.bind(this));
    window.addEventListener('resize', this.renderingDevice.bind(this));
  }

  function open() {
    var component = this.component;
    var openButton = this.openButton;

    component.hidden = false;
    openButton.setAttribute('disabled', 'disabled');

    setTimeout(function() {
      component.classList.add('is-active');
    }, 10);
  }

  function close() {
    var component = this.component;
    var openButton = this.openButton;

    component.classList.remove('is-active');
    setTimeout(function() {
      component.hidden = true;
      openButton.removeAttribute('disabled');
    }, 400);
  }

  function a11y() {
    var breakpoint = this.options.breakpoint;

    var component = this.component;
    var nav_focusables = component.querySelectorAll('a, button');
    var nav_focusable_first = nav_focusables[0];
    var nav_focusable_last = nav_focusables[nav_focusables.length - 1];

    window.addEventListener('keyup', escCloseMenu);
    nav_focusable_first.addEventListener('keydown', navLastFocus);
    nav_focusable_last.addEventListener('keydown', navFirstFocus);

    var _this = this;

    function escCloseMenu(e) {
      // 모바일 환경에서만 작동되도록 조건 처리
      if (e.keyCode === 27 && window.innerWidth < breakpoint) {
        _this.close();
      }
    }

    function navFirstFocus(e) {
      if (!e.shiftKey && e.keyCode === 9 /* Tab */) {
        e.preventDefault();
        nav_focusable_first.focus();
      }
    }

    function navLastFocus(e) {
      if (document.activeElement === e.target && e.shiftKey && e.keyCode === 9 /* Tab */) {
        e.preventDefault();

        nav_focusable_last.focus();
        nav_focusable_last.addEventListener('keydown', navFirstFocus);
      }
    }
  }

  Object.defineProperties(NavigationClass.prototype, {
    init: { value: init },
    render: { value: render },
    renderingDevice: { value: renderingDevice },
    renderItemFromData: { value: renderItemFromData },
    bindEvents: { value: bindEvents },
    open: { value: open },
    close: { value: close },
    a11y: { value: a11y },
  });

  window.Navigation = NavigationClass;
})();
