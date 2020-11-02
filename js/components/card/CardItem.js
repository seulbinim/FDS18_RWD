(function CardItem() {
  'use strict';

  /* 생성자 ---------------------------------------------------------------------- */

  function CardItemClass(itemData, templateId) {
    this.item = itemData;
    this.templateId = templateId;

    this.init();
  }

  /* 클래스 멤버 ------------------------------------------------------------------- */

  CardItemClass.defaultOptions = {};
  CardItemClass.mixins = mixins;

  /* 인스턴스 멤버 ------------------------------------------------------------------ */

  function init() {
    this.template = document.querySelector(this.templateId).textContent;

    this.state = {
      open: false,
    };

    this.render();
    window.setTimeout(this.bindEvents.bind(this));
  }

  function setState(newState) {
    this.state = CardItemClass.mixins(this.state, newState);
  }

  function render() {
    var item = this.item;
    var id = item.id;
    var figure = item.figure;
    var detail = item.detail;
    var criteria = detail.display_criteria;

    this.id = id;

    this.template = this.template.replace(/{id}/g, id);
    this.template = this.template.replace(/{figure.name}/g, figure.name);
    this.template = this.template.replace(/{figure.src}/g, figure.src);
    this.template = this.template.replace(/{figure.width}/g, figure.width);
    this.template = this.template.replace(/{figure.height}/g, figure.height);
    this.template = this.template.replace(/{detail.ko}/g, detail.ko);
    this.template = this.template.replace(/{detail.en}/g, detail.en);
    this.template = this.template.replace(/{detail.desc}/g, detail.desc);

    var startIndex = this.template.indexOf('{{for}}');
    var endIndex = this.template.indexOf('{{/for}}');

    var criteriaTemplate = this.template.slice(startIndex + 7, endIndex).replace(/\s/g, '');

    var criteriaCode = criteria.reduce(function(acc, item) {
      acc += criteriaTemplate
        .replace(/{criteria.key}/g, item[0])
        .replace(/{criteria.value}/g, item[1]);
      return acc;
    }, '');

    var beforeCriteriaCode = this.template.slice(0, startIndex);
    var afterCriteriaCode = this.template.slice(endIndex + 8);
    var renderCode = beforeCriteriaCode + criteriaCode + afterCriteriaCode;

    return renderCode;
  }

  function bindEvents() {
    this.itemNode = document.querySelector('[data-id="' + this.id + '"]');

    this.button = this.itemNode.querySelector('[role="button"]');
    this.button.addEventListener('click', this.handleOpen.bind(this));

    this.dialog = this.itemNode.querySelector('[role="dialog"]');
    this.closeButton = this.dialog.querySelector('.is-close-panel');
    this.closeButton.addEventListener('click', this.handleClose.bind(this));
  }

  function handleOpen(e) {
    e.preventDefault();

    this.setState({ open: true });
    this.openDialog();
  }

  function handleClose() {
    this.setState({ open: false });
    this.closeDialog();
  }

  function openDialog() {
    var button = this.button;
    var dialog = this.dialog;

    button.setAttribute('aria-pressed', true);

    dialog.hidden = false;
    window.setTimeout(function() {
      dialog.classList.add('is-active');
    }, 100);
  }

  function closeDialog() {
    var button = this.button;
    var dialog = this.dialog;

    button.setAttribute('aria-pressed', false);

    dialog.classList.remove('is-active');

    window.setTimeout(function() {
      dialog.hidden = true;
    }, 400);
  }

  Object.defineProperties(CardItemClass.prototype, {
    init: { value: init },
    setState: { value: setState },
    bindEvents: { value: bindEvents },
    handleOpen: { value: handleOpen },
    handleClose: { value: handleClose },
    render: { value: render },
    openDialog: { value: openDialog },
    closeDialog: { value: closeDialog },
  });

  window.CardItem = CardItemClass;
})();
