(function DataTable() {
  'use strict';

  /* 템플릿 ---------------------------------------------------------------------- */

  var templateTableComponent =
    '\
    <div class="news__press-container">\
      {{searchForm}}\
      <table class="news__press-table">\
        <caption class="a11y-hidden">{caption}</caption>\
        <colgroup>\
          <col />\
          <col />\
          <col />\
        </colgroup>\
        <thead>\
          <tr>\
            {tableHeaders}\
          </tr>\
        </thead>\
        <tbody>{tableItems}</tbody>\
      </table>\
    </div>\
  ';

  var templateTableHeader = '<th scope="col">{header}</th>';

  var templateTableItem =
    '\
    <tr>\
      <td>{item.no}</td>\
      <td>\
        <a class="press-link" href="{item.link}" target="_blank" rel="noopener noreferrer">\
          <figure class="press-thumbnail">\
            <img src="{item.image}" alt="" />\
          </figure>\
          <dl class="press-article">\
            <dt>{item.title}</dt>\
            <dd>{item.content}</dd>\
          </dl>\
        </a>\
      </td>\
      <td><time class="press-date" datetime="{item.publishedAt}T17:30:45">{item.publishedAt}</time></td>\
    </tr>\
  ';

  /* 지역 변수, 함수 ---------------------------------------------------------------- */

  var ORIGINAL_TEXT = 'data-original-text';

  function backupText(pressArticles) {
    pressArticles.forEach(function(article) {
      var title = article.querySelector('dt');
      var desc = article.querySelector('dd');
      title.setAttribute(ORIGINAL_TEXT, title.textContent);
      desc.setAttribute(ORIGINAL_TEXT, desc.textContent);
    });
  }

  function restoreText(titleEl, descEl) {
    if (titleEl.getAttribute(ORIGINAL_TEXT)) {
      titleEl.textContent = titleEl.getAttribute(ORIGINAL_TEXT);
      descEl.textContent = descEl.getAttribute(ORIGINAL_TEXT);
    }
  }

  function drawText(pressArticles, settingEllipsis, isMobile) {
    pressArticles.forEach(function(article) {
      var title = article.querySelector('dt');
      var desc = article.querySelector('dd');

      if (isMobile) {
        title.textContent = ellipsisText(title.textContent, settingEllipsis.mobile.title);
        desc.textContent = ellipsisText(desc.textContent, settingEllipsis.mobile.desc);
      }
      else {
        restoreText(title, desc);
        title.textContent = ellipsisText(title.textContent, settingEllipsis.desktop.title);
        desc.textContent = ellipsisText(desc.textContent, settingEllipsis.desktop.desc);
      }
    });
  }

  function handleResize(e) {
    var options = this.options;
    var pressArticles = this.pressArticles;

    if (window.innerWidth >= options.breakpoint) {
      drawText(pressArticles, options.settingEllipsis);
    }
    else {
      drawText(pressArticles, options.settingEllipsis, 'mobile');
    }
  }

  /* 생성자 ---------------------------------------------------------------------- */

  function DataTableClass(containerNode, options) {
    if (!containerNode || containerNode.nodeType !== 1) {
      throw new Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.');
    }

    this.container = containerNode;
    this.component = null;
    this.tableHeadersCode = null;
    this.pressArticles = null;

    this.state = {
      data: [],
      filteredData: [],
      currentPage: 1,
      displayItemCount: 1,
      totalItemCount: 1,
    };

    this.init(options);
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  DataTableClass.mixins = mixins;
  DataTableClass.defaultOptions = {
    data: [],
    current: 1,
    displayItemCount: 5,
    caption: '',
    headers: [ '제목1', '제목2', '제목3' ],
    selectOptions: [ { value: 'title', text: '타이틀' }, { value: 'content', text: '콘텐츠' } ],

    // 설정 옵션
    breakpoint: 768,
    settingEllipsis: {
      desktop: {
        title: 30,
        desc: 60,
      },
      mobile: {
        title: 18,
        desc: 32,
      },
    },
  };

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  function init(options) {
    this.options = DataTableClass.mixins(DataTableClass.defaultOptions, options);

    this.setState({
      data: this.options.data.reverse(),
      filteredData: [],
      currentPage: this.options.current,
      displayItemCount: this.options.displayItemCount,
      totalItemCount: this.options.data.length,
    });

    this.render();
    this.renderTableHeaders();
  }

  function setState(newState) {
    this.state = DataTableClass.mixins(this.state, newState);
  }

  function bindEvents() {
    var _this = this;

    // 검색 시 처리할 동작
    this.searchForm.onSearch(function(category, keyword) {
      _this.renderSearchResult(category, keyword);
    });

    // 페이지네이션 버튼 클릭 시 처리할 동작
    this.pagination.onClick(function(paginationState, e) {
      e.preventDefault();
      e.stopPropagation();

      var target = e.target;
      var targetTagName = target.nodeName.toLowerCase();
      var targetPageNum = paginationState.currentPage;

      switch (targetTagName) {
        case 'svg':
          var button = target.parentNode;
          if (!button.getAttribute('disabled')) {
            if (button.classList.contains('button-prev')) {
              targetPageNum = paginationState.previousPage;
            }
            else {
              targetPageNum = paginationState.nextPage;
            }
          }
          break;

        case 'button':
          var button = target;
          if (button.classList.contains('button-prev')) {
            targetPageNum = paginationState.previousPage;
          }
          else {
            targetPageNum = paginationState.nextPage;
          }
          break;
        case 'a':
          targetPageNum = Number(target.textContent);
          break;
        default:
      }

      // if (targetPageNum !== paginationState.currentPage) {
      _this.render(targetPageNum);
      // }
    });

    // 이전 연결된 이벤트 헨들러 제거
    window.removeEventListener('resize', handleResize.bind(this));

    // 다시 이벤트 핸들러 설정
    window.addEventListener('resize', handleResize.bind(this));
  }

  function render(current) {
    // 이전 렌더 결과 제거
    this.removeRendered();

    // ----------------------------------------------------------------------------

    var filteredItems = [];
    var templateCode = templateTableComponent;

    // CASE 1. current 값이 undefined인 경우
    if (!current) {
      current = this.state.currentPage;
    }

    // CASE 2. current 값이 숫자인 경우
    if (typeof current === 'number') {
      filteredItems = this.filterCurrentItems(current);

      // 상태 업데이트
      this.setState({
        currentPage: current,
      });
    }

    // CASE 3. current 값이 배열인 경우 (검색)
    if (Array.isArray(current)) {
      filteredItems = current; // 검색 필터링 된 아이템 배열(searchedItems)
      current = 1;

      // 상태 업데이트
      this.setState({
        currentPage: current,
        filteredData: filteredItems,
        totalItemCount: filteredItems.length,
      });

      filteredItems = this.filterCurrentItems(current, filteredItems);
    }

    // ----------------------------------------------------------------------------

    // 캡션 렌더링
    templateCode = templateCode.replace(/{caption}/, this.options.caption);

    // 검색 폼 렌더링
    this.searchForm = new SearchForm({
      selectOptions: this.options.selectOptions,
    });

    templateCode = templateCode.replace(/{{searchForm}}/, this.searchForm.render());

    // 테이블 헤더, 테이블 아이템 렌더링
    var tableHeaders = this.renderTableHeaders();
    var tableItems = this.renderTableItems(filteredItems);

    templateCode = templateCode.replace(/{tableHeaders}/, tableHeaders);
    templateCode = templateCode.replace(/{tableItems}/, tableItems);

    // 페이지네이션 렌더링
    this.pagination = new Pagination({
      current: this.state.currentPage,
      displayItemCount: this.state.displayItemCount,
      totalItemCount: this.state.totalItemCount,
    });

    // DOM 렌더링
    this.container.insertAdjacentHTML('beforeend', templateCode);

    this.container
      .querySelector('.news__press-container')
      .insertAdjacentElement('beforeend', this.pagination.render());

    // pressArticles 참조
    this.pressArticles = Array.from(this.container.querySelectorAll('.press-article'));

    // 반응형 텍스트 줄침 처리
    this.responsiveEllipsisText();

    // 이벤트 연결
    this.bindEvents();
  }

  function renderTableHeaders() {
    // 캐싱
    if (!this.tableHeadersCode) {
      var headers = this.options.headers;
      var headersCode = headers
        .map(function(header) {
          return templateTableHeader.replace(/{header}/g, header);
        })
        .join('');
      this.tableHeadersCode = headersCode;
    }

    return this.tableHeadersCode;
  }

  function renderTableItems(data) {
    var tableItemsCode = data.map(function(item, index) {
      var template = templateTableItem;

      template = template.replace(/{item.no}/g, item.no);
      template = template.replace(/{item.link}/g, item.link);
      template = template.replace(
        /{item.image}/g,
        item.image || (isDevelopmentMode() ? '' : '/EDIYA') + '/images/ediya-table-thumb.jpg'
      );
      template = template.replace(/{item.title}/g, item.title);
      template = template.replace(/{item.content}/g, item.content);
      template = template.replace(/{item.publishedAt}/g, item.publishedAt);

      return template.trim();
    });

    return tableItemsCode.join('');
  }

  function renderSearchResult(category, keyword) {
    var searchedItems = this.searchKeywordItems(category, keyword);
    this.render(searchedItems);
  }

  function responsiveEllipsisText() {
    // 초기 텍스트 백업
    backupText(this.pressArticles);

    handleResize.call(this);
  }

  function filterCurrentItems(current, data) {
    data = data || this.options.data;

    var displayItemCount = this.options.displayItemCount;
    var currentIndex = current - 1;
    var startIndex = currentIndex > 0 ? displayItemCount * currentIndex : 0;
    var endIndex = startIndex + displayItemCount - 1;
    endIndex = endIndex >= data.length ? data.length - 1 : endIndex;

    // 현재 페이지 아이템 필터링
    return data.filter(function(item, index) {
      return index >= startIndex && index <= endIndex;
    });
  }

  function searchKeywordItems(category, keyword) {
    var data = this.options.data;

    if (keyword.trim().length === 0) {
      return data;
    }

    return data.filter(function(item) {
      var reg = new RegExp(keyword, 'ig');
      return item[category].match(reg);
    });
  }

  function removeRendered() {
    var oldPressTableContailerEl = this.container.querySelector('.news__press-container');

    if (oldPressTableContailerEl) {
      oldPressTableContailerEl.remove();
    }
  }

  Object.defineProperties(DataTableClass.prototype, {
    init: { value: init },
    setState: { value: setState },
    bindEvents: { value: bindEvents },
    render: { value: render },
    renderTableHeaders: { value: renderTableHeaders },
    renderTableItems: { value: renderTableItems },
    filterCurrentItems: { value: filterCurrentItems },
    removeRendered: { value: removeRendered },
    renderSearchResult: { value: renderSearchResult },
    searchKeywordItems: { value: searchKeywordItems },
    responsiveEllipsisText: { value: responsiveEllipsisText },
  });

  window.DataTable = DataTableClass;
})();
