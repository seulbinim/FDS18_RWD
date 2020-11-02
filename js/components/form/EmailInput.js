/**
 ** 이메일, 폼 인풋 컴포넌트 아키텍처 설계(Architecture Design)
 *
 * ![주의] 오류 발생 시, 의존성 모듈 확인
 * - utils/helper.js
 * - components/form/_formConstant.js
 */

(function EmailInput() {
  'use strict';

  /* 생성자 ---------------------------------------------------------------------- */

  /**
   * 이메일 인풋 컴포넌트
   * @constructor
   * @param {HTMLElmenet} elNode HTML 요소
   * @example
   * var emailInputNode = document.querySelector('.member-id')
   * var emailInputComponent = new EmailInput(emailInputNode).init({ placeholderText: '야무@이듬.run' })
   */
  function EmailInputClass(elNode) {
    if (!elNode || elNode.nodeType !== 1) {
      throw Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.');
    }

    // 컴포넌트 객체 참조
    this.component = elNode;
    // 레이블 객체 참조
    this.label = this.component.querySelector('label');
    // 인풋 객체 참조
    this.input = this.component.querySelector('input');
    // 커스텀 이벤트 객체
    this.events = {};
    // 버튼 객체 상태
    this.state = {
      // 순수 입력 상태
      pure: true,
      // 유효 성태
      valid: false,
      // 현재 상태: normal, hover, focus, valid, invalid
      current: 'normal',
    };
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  /**
   * @memberof EmailInputClass
   * @static
   */
  EmailInputClass.STATES = FORM_STATE_CLASSES;

  EmailInputClass.isValidEmailFormat = function(input) {
    const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
    return reg.test(input.value);
  };

  EmailInputClass.mixins = mixins;

  EmailInputClass.defaultOptions = {
    placeholderText: '야무@euid.dev',
    on: {},
    debug: false,
  };

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  /**
   * @memberof EmailInputClass.prototype
   * @instance
   */

  function init(options) {
    options = EmailInputClass.mixins(EmailInputClass.defaultOptions, options);

    this.placeholderText = options.placeholderText;
    this.events = options.on;
    this.debugMode = options.debug;

    for (var eventType in this.events) {
      if (this.events.hasOwnProperty(eventType)) {
        var eventHandler = this.events[eventType];
        this.input.addEventListener(eventType, eventHandler.bind(this));
      }
    }

    this.bindEvents();

    return this;
  }

  function setState(newValue) {
    this.state = EmailInputClass.mixins(this.state, newValue);
  }

  function bindEvents() {
    var _this = this;
    var component = this.component;
    var input = this.input;
    component.addEventListener('mouseenter', function() {
      _this.setState({ current: 'hover' });
      /* @debug */
      _this.debugMode && console.log(component, _this.state.current);
    });
    component.addEventListener('mouseleave', function() {
      _this.setState({ current: 'normal' });
      /* @debug */
      _this.debugMode && console.log(component, _this.state.current);
    });
    input.addEventListener('focus', function() {
      _this.setState({ current: 'focus' });
      input.setAttribute('placeholder', _this.placeholderText);
      component.classList.add(EmailInputClass.STATES.focus);
      /* @debug */
      _this.debugMode && console.log(component, _this.state.current);
    });
    input.addEventListener('input', function() {
      _this.setState({ current: 'input', pure: false });
      _this.checkEmailFormat();
      _this.render();
      /* @debug */
      _this.debugMode && console.log(component, '컴포넌트 상태: ', _this.state);
    });
    input.addEventListener('blur', function() {
      _this.setState({ current: 'normal' });
      input.removeAttribute('placeholder');
      component.classList.remove(EmailInputClass.STATES.focus);
      /* @debug */
      _this.debugMode && console.log(component, _this.state.current);
    });
  }

  function checkEmailFormat() {
    var component = this.component;
    var input = this.input;
    var isValidEmailFormat = EmailInputClass.isValidEmailFormat;

    if (!isValidEmailFormat(input)) {
      this.setState({ current: 'invalid', valid: false });
    }
    else {
      this.setState({ current: 'valid', valid: true });
    }
  }

  function render() {
    var component = this.component;
    var input = this.input;

    switch (this.state.current) {
      case 'invalid':
        component.classList.add(EmailInputClass.STATES.invalid);
        input.setAttribute('aria-invalid', true);
        break;
      case 'valid':
        component.classList.remove(EmailInputClass.STATES.invalid);
        component.classList.add(EmailInputClass.STATES.valid);
        input.setAttribute('aria-invalid', false);
    }
  }

  function reset() {
    var component = this.component;
    component.classList.remove(EmailInputClass.STATES.valid);
  }

  Object.defineProperties(EmailInputClass.prototype, {
    init: { value: init },
    setState: { value: setState },
    bindEvents: { value: bindEvents },
    checkEmailFormat: { value: checkEmailFormat },
    render: { value: render },
    reset: { value: reset },
  });

  window.EmailInput = EmailInputClass;
})();
