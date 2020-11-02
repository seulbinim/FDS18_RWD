(function tabMenuControl() {
  'use strict';

  /* 지역 변수 -------------------------------------------------------------------- */

  // 로컬라이제이션
  var location = window.location;

  // 활성 상태 클래스 이름
  var activeClass = 'is--selected';

  // DOM 객체 참조 변수
  var newsTabMenu = null;
  var newsContents = [];

  /* 함수 ----------------------------------------------------------------------- */

  /**
   * 초기 실행
   * @function
   */
  function init() {
    // 뉴스 탭 메뉴 찾기
    newsTabMenu = document.querySelector('.news-tab');
    // 뉴스 콘텐츠 수집(배열화)
    newsContents = Array.from(document.querySelectorAll('.news [role="tabpanel"]'));

    // 이벤트 연결
    bindEvents();

    // 페이지 로딩 시, 해시 값 분석
    handleAnalysisHash();
  }

  /**
   * 이벤트 연결
   * @function
   */
  function bindEvents() {
    newsTabMenu.addEventListener('click', handleTabClick);
    window.addEventListener('hashchange', handleAnalysisHash);
  }

  /**
   * 탭 클릭 이벤트 핸들러
   * @function
   * @param {EventObject} e 이벤트 객체
   */
  function handleTabClick(e) {
    // 현재 이벤트 대상
    var target = e.target;

    // 현재 이벤트 대상이 <a> 요소인 경우, 탭 렌더링 실행
    if (target.nodeName === 'A') {
      renderTab(target);
    }
  }

  /**
   * 탭 렌더링
   * @function
   * @param {HTMLAnchorElement} target <a role="tab"> 요소
   */
  function renderTab(target) {
    // 이전에 활성화 된 탭 참조
    var activatedTab = newsTabMenu.querySelector('[aria-selected="true"]');
    // 이전 활성화 된 탭이 존재할 경우, aria-selected 값을 false로 설정
    activatedTab && activatedTab.setAttribute('aria-selected', false);

    // 현재 활성화 할 탭이 존재할 경우, aria-selected 값을 true로 설정
    target && target.setAttribute('aria-selected', true);
  }

  /**
   * URL 해시(hash) 값 분석 핸들러
   * @function
   */
  function handleAnalysisHash() {
    var hash = location.hash;

    switch (hash) {
      case '#notice':
        render('.news__notice');
        break;
      case '#awards':
        render('.news__award');
        break;
      case '#promotion':
        render('.news__video');
        break;
      case '#press':
      default:
        location.hash = 'press';
        render('.news__press');
    }
  }

  /**
   * 화면에 문서 객체 UI 렌더링
   * @function
   * @param {String} visibleSelector 화면에 표시할 문서 객체를 가리키는 CSS 선택자
   */
  function render(visibleSelector) {
    // 이전에 표시된 문서 객체를 찾아 참조
    var actibatedContent = findNewsContent(newsContents, activeClass);
    // 이전에 표시된 문서 객체가 존재할 경우, 활성 클래스 이름 제거
    actibatedContent && actibatedContent.classList.remove(activeClass);

    // 화면에 표시할 문서 객체 참조
    var visibleContent = document.querySelector(visibleSelector);
    // 화면에 표시할 문서 객체가 존재할 경우, 활성 클래스 이름 추가
    visibleContent && visibleContent.classList.add(activeClass);

    // 탭 런데링
    renderTab(document.querySelector('a[href="' + location.hash + '"]'));
  }

  /**
   * 활성 클래스 이름을 가진 뉴스 콘텐츠 찾기
   * @function
   * @param {Array} contents 뉴스 콘텐츠 집합
   * @param {String} activeClassName 활성 클래스 이름
   */
  function findNewsContent(contents, activeClassName) {
    return contents.find(function(content) {
      return content.classList.contains(activeClassName);
    });
  }

  // DOM 콘텐츠가 준비되면 init() 실행
  window.addEventListener('DOMContentLoaded', init);
})();
