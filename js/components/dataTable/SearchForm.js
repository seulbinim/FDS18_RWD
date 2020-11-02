(function SearchForm() {
  'use strict';

  var templateSearchForm =
    '\
  <form class="news__press-form" action="#" method="GET">\
    <fieldset>\
      <legend>{legend}</legend>\
      <div class="press-search-container">\
        <select name="newSelect" id="newsSelect" aria-label="{selectLabel}">\
          {selectOptions}\
        </select>\
        <div class="keyword-container">\
          <input type="search" name="newsKeyword" id="newsKeyword" class="keyword" placeholder="{placeholder}" aria-required="true" aria-label="{inputLabel}" />\
        </div>\
        <button type="submit" class="button-search" aria-label="{buttonLabel}"><span class="icon-search"></span></button>\
      </div>\
    </fieldset>\
  </form>\
  ';

  var templateOptions = '<option value="{option.value}">{option.text}</option>';

  /* 생성자 ---------------------------------------------------------------------- */

  function SearchFormClass(options) {
    this.init(options);
    this.isRendered = false;
    this.renderCode = '';
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  SearchFormClass.mixins = mixins;
  SearchFormClass.defaultOptions = {
    legned: '언론 속 이디야 검색',
    selectLabel: '검색 범위 선택',
    inputLabel: '검색어',
    buttonLabel: '검색',
    selectOptions: [
      { value: 'title', text: '제목' },
    ],
    placeholder: '검색어 입력(예: 이디야)',
  };

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  function init(options) {
    this.options = SearchFormClass.mixins(
      SearchFormClass.defaultOptions,
      options
    );
  }

  function render() {
    // 캐싱
    if (!this.isRendered) {
      var options = this.options;
      var template = templateSearchForm;

      template = template.replace(/{legend}/g, options.legned);
      template = template.replace(/{selectLabel}/g, options.selectLabel);
      template = template.replace(/{inputLabel}/g, options.inputLabel);
      template = template.replace(/{buttonLabel}/g, options.buttonLabel);
      template = template.replace(/{placeholder}/g, options.placeholder);

      var selectOptionsCode = this.renderSelectOptions();

      template = template.replace(/{selectOptions}/g, selectOptionsCode);

      this.isRendered = true;
      this.renderCode = template.trim();
    }

    return this.renderCode;
  }

  function renderSelectOptions() {
    var template = templateOptions;
    var options = this.options.selectOptions;

    var optionsCode = options.map(function(option) {
      return template
        .replace(/{option.value}/g, option.value)
        .replace(/{option.text}/g, option.text);
    });

    return optionsCode.join('');
  }

  function onSearch(callback) {
    var form = document.querySelector('form.news__press-form');
    var select = form.querySelector('select');
    var input = form.querySelector('input[type="search"]');
    var button = form.querySelector('button[type="submit"]');

    button.addEventListener('click', function(e) {
      e.preventDefault();
      callback(select.value, input.value, e);
    });
  }

  Object.defineProperties(SearchFormClass.prototype, {
    init: { value: init },
    render: { value: render },
    renderSelectOptions: { value: renderSelectOptions },
    onSearch: { value: onSearch },
  });

  window.SearchForm = SearchFormClass;
})();
