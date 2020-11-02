(function beverageStaticControl() {
  'use strict';

  var ediya_menu = null;
  var menu_items = null;

  function init() {
    ediya_menu = el('.ediya-menu');
    menu_items = els('.ediya-menu__item', ediya_menu);

    bindEvents();
  }

  function bindEvents() {
    for (var i = 0, l = menu_items.length; i < l; ++i) {
      var menu_item = menu_items[i];
      var link = el('a', menu_item);
      var close_panel_btn = el('.button.is-close-panel', menu_item);

      link.addEventListener('click', openDetailPanel.bind(link, i));
      close_panel_btn.addEventListener('click', closeDetailPanel);
    }
  }

  function openDetailPanel(index, e) {
    e.preventDefault();

    var detail = el('.ediya-menu__item--detail', menu_items[index]);
    detail.hidden = false;

    window.setTimeout(function() {
      detail.classList.add('is-active');
    }, 10);
  }

  function closeDetailPanel() {
    var parent = this.parentNode;

    parent.classList.remove('is-active');

    window.setTimeout(function() {
      parent.hidden = true;
    }, 400);
  }

  window.addEventListener('DOMContentLoaded', init);
})();
