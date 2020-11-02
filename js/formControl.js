;(function formControl() {
  'use strict'

  // 지연 시간 변수(ms)
  var delayTime = 2500

  // 문서 객체 참조 변수
  var memberForm = null
  var buttonLogin = null
  var buttonSignup = null

  // 폼 유효성 상태
  var formValidState = {
    email: false,
    password: false,
  }
  // 폼 데이터 JSON → 객체
  var formDataJSON = {}

  // 컴포넌트 인스턴스 참조
  var emailInput = null
  var passwordInput = null
  var passwordConfirmInput = null

  /**
   * 폼 컨트롤 초기화
   * @function
   */
  function init() {
    settingEmailInput()
    settingPasswordInput()
    settingSaveEmailInput()
    settingMemberFormSubmit()
  }

  /**
   * 이메일 인풋 설정
   * @function
   */
  function settingEmailInput() {
    // 문서에서 이메일 인풋 요소를 찾아 참조
    var emailInputNode = el('.member-id')
    // 컴포넌트 → 이메일 인풋 인스턴스 생성
    // 플레이스홀더(placeholderText), 이벤트(on) 옵션 설정 가능
    emailInput = new EmailInput(emailInputNode).init({
      on: {
        input: function() {
          updateFormValidState('email', this.state.valid)
          renderAllInputsFilled()
        },
      },
      // placeholderText: '야무@이듬.run',
      // debug: true,
    })
  }

  function updateFormValidState(type, isValid) {
    formValidState[type] = isValid
  }

  /**
   * 패스워드 인풋 설정
   * @function
   */
  function settingPasswordInput() {
    // 문서에서 패스워드 인풋 리스트를 찾아 참조
    var passwordInputs = els('.member-password')

    // 패스워드 인풋
    var pass1 = passwordInputs[0]
    // 패스워드 확인 인풋
    var pass2 = passwordInputs[1]

    // 컴포넌트 → 패스워드 인풋 인스턴스 생성
    // 이벤트(on) 옵션 설정 가능
    passwordInput = new PasswordInput(pass1).init({
      on: {
        input: function() {
          updateFormValidState('password', this.state.valid)
          renderAllInputsFilled()
        },
      },
    })

    if (pass2) {
      passwordConfirmInput = new PasswordInput(pass2).init({
        confirm: true,
        compareInput: pass1,
        on: {
          input: function() {
            updateFormValidState('passwordConfirm', this.state.valid)
            renderAllInputsFilled()
          },
        },
        // debug: true,
      })
    }
  }

  /**
   * 이메일 저장 인풋 설정
   * @function
   */
  function settingSaveEmailInput() {
    // 문서에서 이메일 인풋 요소를 찾아 참조
    var saveEmailInputNode = el('.save-email')
    // 컴포넌트 → 이메일 인풋 인스턴스 생성
    // 플레이스홀더(placeholderText), 이벤트(on) 옵션 설정 가능
    if (saveEmailInputNode) {
      new SaveEmailInput(saveEmailInputNode).init()
    }
  }

  /**
   * 로그인, 회원가입 폼 전송 이벤트 설정
   * @function
   */
  function settingMemberFormSubmit() {
    // 문서에서 이메일 인풋 요소를 찾아 참조
    memberForm = el('.member-form')
    buttonLogin = el('button.button-login')
    buttonSignup = el('button.button-signup')

    // 회원가입 폼일 경우만
    if (buttonSignup) {
      // 패스워드 확인 검사를 위한 유효성 속성 추가
      formValidState.passwordConfirm = false
    }

    memberForm.addEventListener('submit', handleSubmit)
  }

  function handleSubmit(e) {
    e.preventDefault()

    var formEl = e.target
    var formData = new FormData(formEl)

    // 로그인 페이지에서만 이메일 저장 설정 유무를 추가
    if (buttonLogin) {
      formData.append('userEmailSave', el('input#userEmailSave', formEl).checked)
    }

    formDataJSON = convertFormDataToJSON(formData)
    changeSubmitButtonLoading()
  }

  /**
   * 폼 데이터 → JSON 포멧 변경 함수
   * @function
   * @param {FormData} formData 폼 데이터 객체
   */
  function convertFormDataToJSON(formData) {
    const formDataObj = {}
    for (var keyValue of formData.entries()) {
      formDataObj[keyValue[0]] = keyValue[1]
    }
    return JSON.stringify(formDataObj, null, '  ')
  }

  /**
   * 전송 버튼 로딩 상태로 변경하는 함수
   * @function
   */
  function changeSubmitButtonLoading() {
    var button = buttonLogin ? buttonLogin : buttonSignup ? buttonSignup : null
    var wrapper = button.parentNode
    var disabledClassName = FORM_STATE_CLASSES.disabled
    var loadingClassName = FORM_STATE_CLASSES.loading

    wrapper.classList.add(loadingClassName)

    button.setAttribute('disabled', 'disabled')

    window.setTimeout(() => {
      // 비동기 시뮬레이션 데이터 출력
      console.log(formDataJSON)

      // 폼 컨트롤 초기화
      memberForm.reset()
      emailInput.reset()
      passwordInput.reset()
      passwordConfirmInput && passwordConfirmInput.reset()

      // 로딩 상태 제거
      wrapper.classList.remove(loadingClassName)
      // 비활성 상태로 변경
      wrapper.classList.add(disabledClassName)
    }, delayTime)
  }

  /**
   * 검사 할 인풋 요소의 모든 값이 채워졌는지 확인
   * @function
   * @param {HTMLDivElement} inputWrapper 이메일, 패스워드 래퍼 요소
   */
  function checkAllInputsFilled(inputs) {
    return inputs.every(function(input) {
      return input.value
    })
  }

  /**
   * 모든 인풋이 채워졌는지 검사 후, UI 렌더링 함수
   * @function
   */
  function renderAllInputsFilled() {
    var checkInputSelector = '.member-id input, .member-password input'
    var isAllInputFilled = checkAllInputsFilled(Array.from(els(checkInputSelector)))

    if (isAllInputFilled && formValidState.email) {
      changeSubmitButtonSubmitEnable()
    }
    else {
      changeSubmitButtonSubmitDisable()
    }
  }

  /**
   * 전송 버튼 활성 상태로 변경하는 함수
   * @function
   */
  function changeSubmitButtonSubmitEnable() {
    var button = buttonLogin ? buttonLogin : buttonSignup ? buttonSignup : null
    button.parentNode.classList.remove('is--disabled')
    button.removeAttribute('disabled')
  }

  /**
   * 전송 버튼 비활성 상태로 변경하는 함수
   * @function
   */
  function changeSubmitButtonSubmitDisable() {
    var button = buttonLogin ? buttonLogin : buttonSignup ? buttonSignup : null
    button.parentNode.classList.add('is--disabled')
    button.setAttribute('disabled', 'disabled')
  }

  window.addEventListener('DOMContentLoaded', init)
})()
