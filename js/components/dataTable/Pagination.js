(function Pagination() {
  'use strict';

  var templatePagination =
    '\
    <div class="pagination-container">\
      <button type="button" class="button button-prev" title="{prevButtonLabel}" aria-label="{prevButtonLabel}">\
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none">\
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8865 10.981C21.9625 11.479 22.0005 11.99 22.0005 12.5C22.0005 18.014 17.5145 22.5 12.0005 22.5C6.48649 22.5 2.00049 18.014 2.00049 12.5C2.00049 6.986 6.48649 2.5 12.0005 2.5C15.1285 2.5 18.0175 3.923 19.9275 6.402C20.1725 6.72 20.1125 7.178 19.7955 7.422C19.4775 7.668 19.0215 7.607 18.7745 7.29C17.1435 5.169 14.6735 3.954 12.0005 3.954C7.28849 3.954 3.45449 7.787 3.45449 12.5C3.45449 17.212 7.28849 21.045 12.0005 21.045C16.7125 21.045 20.5465 17.212 20.5465 12.5C20.5465 12.063 20.5135 11.626 20.4485 11.201C20.3885 10.805 20.6605 10.434 21.0575 10.373C21.4565 10.307 21.8255 10.584 21.8865 10.981ZM9.20629 12.4992C9.20629 12.3002 9.28529 12.1092 9.42729 11.9682L12.9133 8.4972C13.2073 8.2042 13.6823 8.2052 13.9743 8.4992C14.2663 8.7932 14.2663 9.2672 13.9723 9.5592L11.0193 12.4992L13.9723 15.4392C14.2663 15.7312 14.2663 16.2062 13.9743 16.5002C13.6823 16.7932 13.2073 16.7942 12.9133 16.5022L9.42729 13.0302C9.28529 12.8902 9.20629 12.6992 9.20629 12.4992Z" fill="#0F0F0F" />\
        </svg>\
      </button>\
      <ul class="pagination reset-list">{paginationItems}</ul>\
      <button type="button" class="button button-next" title="{nextButtonLabel}" aria-label="{nextButtonLabel}">\
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none">\
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4805 22.386C10.9785 22.462 11.4895 22.5 11.9995 22.5C17.5135 22.5 21.9995 18.014 21.9995 12.5C21.9995 6.986 17.5135 2.5 11.9995 2.5C6.48551 2.5 1.99951 6.986 1.99951 12.5C1.99951 15.628 3.42251 18.517 5.90151 20.427C6.21951 20.672 6.67751 20.612 6.92151 20.295C7.16751 19.977 7.10651 19.521 6.78951 19.274C4.66851 17.643 3.45351 15.173 3.45351 12.5C3.45351 7.788 7.28651 3.954 11.9995 3.954C16.7115 3.954 20.5445 7.788 20.5445 12.5C20.5445 17.212 16.7115 21.046 11.9995 21.046C11.5625 21.046 11.1255 21.013 10.7005 20.948C10.3045 20.888 9.93351 21.16 9.87251 21.557C9.80651 21.956 10.0835 22.325 10.4805 22.386ZM14.7937 12.4992C14.7937 12.3002 14.7147 12.1092 14.5727 11.9682L11.0867 8.49719C10.7927 8.20419 10.3177 8.20519 10.0257 8.49919C9.73369 8.79319 9.73369 9.26719 10.0277 9.55919L12.9807 12.4992L10.0277 15.4392C9.73369 15.7312 9.73369 16.2062 10.0257 16.5002C10.3177 16.7932 10.7927 16.7942 11.0867 16.5022L14.5727 13.0302C14.7147 12.8902 14.7937 12.6992 14.7937 12.4992Z" fill="#0F0F0F" />\
        </svg>\
    </div>\
  ';

  var templatePaginationItem =
    '<li><a href="#page-{hash}" class="_pagerNo" data-page-no="{index}" title="{index} 페이지로 이동">{index}</a></li>';

  /* 생성자 ---------------------------------------------------------------------- */

  function PaginationClass(options) {
    this.component = null;
    this.template = templatePagination;
    this.templateItem = templatePaginationItem;

    this.state = {
      currentPage: 1,
      previousPage: 1,
      nextPage: 1,
      totalPageCount: 1,
    };

    this.init(options);
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  PaginationClass.mixins = mixins;
  PaginationClass.defaultOptions = {
    current: 1,
    displayItemCount: 5,
    totalItemCount: 50,
    prevButtonLabel: '이전 페이지 이동',
    nextButtonLabel: '다음 페이지 이동',
    activeClassName: 'on',
  };

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  function init(options) {
    this.options = PaginationClass.mixins(PaginationClass.defaultOptions, options);

    var current = this.options.current;
    var totalPageCount = Math.ceil(this.options.totalItemCount / this.options.displayItemCount);

    this.setState({
      currentPage: current,
      previousPage: current - 1 < 1 ? totalPageCount : current - 1,
      nextPage: current + 1 > totalPageCount ? 1 : current + 1,
      totalPageCount: totalPageCount,
    });
  }

  function setState(newState) {
    this.state = PaginationClass.mixins(this.state, newState);
  }

  function render() {
    var options = this.options;

    var paginationItems = this._renderPaginationItems();

    this.template = this.template.replace(/{prevButtonLabel}/g, options.prevButtonLabel);
    this.template = this.template.replace(/{nextButtonLabel}/g, options.nextButtonLabel);
    this.template = this.template.replace(/{paginationItems}/g, paginationItems);

    var paginationWrapper = document.createElement('div');
    paginationWrapper.innerHTML = this.template.trim();

    this.component = paginationWrapper.firstElementChild;

    this.settingDisabled();

    return this.component;
  }

  function settingDisabled() {
    var currentPageLink = this.component.querySelector('[aria-current="page"]');
    currentPageLink.style.cssText = 'cursor: not-allowed; box-shadow: none;';

    if (this.state.currentPage === 1) {
      var previousButton = this.component.querySelector('button.button-prev');
      previousButton.setAttribute('disabled', 'disabled');
      previousButton.setAttribute('title', '이동할 이전 페이지가 없습니다.');
    }
    if (this.state.currentPage === this.state.totalPageCount) {
      var nextButton = this.component.querySelector('button.button-next');
      nextButton.setAttribute('disabled', 'disabled');
      nextButton.setAttribute('title', '이동할 다음 페이지가 없습니다.');
    }
  }

  function onClick(callback) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('전달 인자는 함수 유형이어야 합니다.');
    }
    this.component.addEventListener('click', callback.bind(this, this.state));
  }

  function _renderPaginationItems() {
    var options = this.options;

    var paginationItems = '';
    var pageCount = Math.ceil(options.totalItemCount / options.displayItemCount);

    for (var i = 0, l = pageCount, template = this.templateItem; i < l; i++) {
      var innerTemplate = '';
      var humanReadableNumber = i + 1;

      innerTemplate = template
        .replace(/{hash}/g, humanReadableNumber)
        .replace(/{index}/g, humanReadableNumber);

      // 현재 페이지에 aria-current="page" 설정, on 클래스 속성 추가
      if (options.current - 1 === i) {
        innerTemplate = innerTemplate.replace(
          'class="_pagerNo"',
          'class="_pagerNo on" aria-current="page"'
        );
      }
      paginationItems += innerTemplate;
    }

    return paginationItems;
  }

  Object.defineProperties(PaginationClass.prototype, {
    init: { value: init },
    setState: { value: setState },
    render: { value: render },
    _renderPaginationItems: { value: _renderPaginationItems },
    onClick: { value: onClick },
    settingDisabled: { value: settingDisabled },
  });

  window.Pagination = PaginationClass;
})();
