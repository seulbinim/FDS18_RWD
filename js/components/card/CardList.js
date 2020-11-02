(function CardList() {
  'use strict';

  /* 생성자 ---------------------------------------------------------------------- */

  function CardListClass(domNode, options) {
    if (!domNode || domNode.nodeType !== 1) {
      throw new Error('생성자에 전달되어야 하는 첫번째 인자는 HTML 요소 객체여야 합니다.');
    }

    this.component = domNode;

    if (options) {
      this.init(options);
    }
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  CardListClass.defaultOptions = {
    list: [],
    templateId: 'template-id',
  };

  CardListClass.mixins = mixins;

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  function init(options) {
    this.options = CardListClass.mixins(CardListClass.defaultOptions, options);
    this.render();
  }

  function render() {
    var list = this.options.list;
    var templateId = this.options.templateId;

    var template = list.reduce(function(acc, item) {
      var item = new CardItem(item, templateId);
      return acc + item.render();
    }, '');

    this.component.innerHTML = template;
  }

  Object.defineProperties(CardListClass.prototype, {
    init: { value: init },
    render: { value: render },
  });

  window.CardList = CardListClass;
})();
