(function beverageControl() {
  'use strict';

  var apiAddress = '/api/beverages.json';
  var ediyaMenuList = null;

  function init() {
    ediyaMenuList = document.querySelector('.ediya-menu');
    fetchData((isDevelopmentMode() ? '' : '/EDIYA') + apiAddress);
  }

  function fetchData(api) {
    fetch(api)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var beverages = json.data;
        render(beverages);
      })
      .catch(function(error) {
        console.error(error.message);
      });
  }

  function render(beverages) {
    new CardList(ediyaMenuList, {
      list: beverages,
      templateId: '#template-ediya-menu__item',
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
