/**
 ** 패스워드, 폼 인풋 컴포넌트 아키텍처 설계(Architecture Design)
 *
 * ![주의] 오류 발생 시, 의존성 모듈 확인
 * - utils/helper.js
 * - components/form/_formConstant.js
 * - components/form/PasswordDisplayButton.js
 */

(function PasswordInput() {
  'use strict';

  /* 생성자 ---------------------------------------------------------------------- */

  /**
   * 패스워드 인풋 컴포넌트
   * @constructor
   * @param {HTMLElmenet} elNode HTML 요소
   * @example
   * var passwordInputNode = document.querySelector('.member-password')
   * var passwordInputComponent = new PasswordInput(passwordInputNode).init()
   */
  function PasswordInputClass(elNode) {
    if (!elNode || elNode.nodeType !== 1) {
      throw Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.');
    }

    // 컴포넌트 객체 참조
    this.component = elNode;
    // 레이블 객체 참조
    this.label = this.component.querySelector('label');
    // 인풋 객체 참조
    this.input = this.component.querySelector('input');
    // 패스워드 디스플레이 버튼 객체 참조
    this.button = this.component.querySelector('button');
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
   * @memberof PasswordInputClass
   * @static
   */

  PasswordInputClass.mixins = mixins;
  PasswordInputClass.STATES = FORM_STATE_CLASSES;

  PasswordInputClass.defaultOptions = {
    on: {},
    debug: false,
    confirm: false,
    compareInput: null,
  };

  PasswordInputClass.isValidPasswordFormat = function(input) {
    // 숫자, 영문 조합 6자리 이상 입력해야 유효함
    const reg = /(?=.*\d)(?=.*[a-z]).{6,}/;
    return reg.test(input.value);
  };

  /**
   * @memberof PasswordInputClass.prototype
   * @instance
   */

  function init(options) {
    options = PasswordInputClass.mixins(PasswordInputClass.defaultOptions, options);

    this.events = options.on;
    this.debugMode = options.debug;
    this.confirmMode = options.confirm;
    this.compareInput = options.compareInput;

    var component = this.component;
    var input = this.input;

    // 패스워드 디스플레이 버튼 컴포넌트화
    this.button = new PasswordDisplayButton(this.button).init({
      debug: this.debugMode,
      on: {
        click: function() {
          // this === PasswordDisplayButton 컴포넌트 인스턴스
          if (!this.state.visible) {
            input.type = 'text';
            component.classList.add(PasswordInputClass.STATES.visible);
            this.updateLabel('패스워드 감추기');
          }
          else {
            input.type = 'password';
            component.classList.remove(PasswordInputClass.STATES.visible);
            this.updateLabel('패스워드 보기');
          }
        },
      },
    });

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
    this.state = PasswordInputClass.mixins(this.state, newValue);
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
      component.classList.add(PasswordInputClass.STATES.focus);
      /* @debug */
      _this.debugMode && console.log(component, _this.state.current);
    });
    input.addEventListener('input', function() {
      _this.setState({ current: 'input', pure: false });
      if (!_this.confirmMode) {
        _this.checkPasswordFormat();
      }
      else {
        _this.checkPasswordMatch();
      }
      _this.render();
      /* @debug */
      _this.debugMode && console.log(component, '컴포넌트 상태: ', _this.state);
    });
    input.addEventListener('blur', function() {
      _this.setState({ current: 'normal' });
      component.classList.remove(PasswordInputClass.STATES.focus);
      /* @debug */
      _this.debugMode && console.log(component, _this.state.current);
    });
  }

  function checkPasswordFormat() {
    var input = this.input;
    var isValidPasswordFormat = PasswordInputClass.isValidPasswordFormat;

    if (!isValidPasswordFormat(input)) {
      this.setState({ current: 'invalid', valid: false });
    }
    else {
      this.setState({ current: 'valid', valid: true });
    }
  }

  function checkPasswordMatch() {
    var input = this.input;
    var compareInput = this.compareInput.querySelector('input');

    if (input.value === compareInput.value) {
      this.setState({ current: 'valid', valid: true });
    }
    else {
      this.setState({ current: 'invalid', valid: false });
    }
  }

  function render() {
    var component = this.component;
    var input = this.input;

    switch (this.state.current) {
      case 'invalid':
        component.classList.remove(PasswordInputClass.STATES.valid);
        component.classList.add(PasswordInputClass.STATES.invalid);
        input.setAttribute('aria-invalid', true);
        break;
      case 'valid':
        component.classList.remove(PasswordInputClass.STATES.invalid);
        component.classList.add(PasswordInputClass.STATES.valid);
        input.setAttribute('aria-invalid', false);
    }
  }

  function reset() {
    var component = this.component;
    component.classList.remove(PasswordInputClass.STATES.valid);
  }

  Object.defineProperties(PasswordInputClass.prototype, {
    init: { value: init },
    setState: { value: setState },
    bindEvents: { value: bindEvents },
    checkPasswordFormat: { value: checkPasswordFormat },
    checkPasswordMatch: { value: checkPasswordMatch },
    render: { value: render },
    reset: { value: reset },
  });

  window.PasswordInput = PasswordInputClass;
})();
