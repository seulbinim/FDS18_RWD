(function navigationControl() {
  'use strict';

  var apiAddress = '/api/navigation.json';

  var appNavigationNode = null;
  var openButtonNode = null;

  function init() {
    fetchData((isDevelopmentMode() ? '' : '/EDIYA') + apiAddress);

    appNavigationNode = document.querySelector('.app-navigation');
    openButtonNode = document.querySelector('.button.is-open-menu');
  }

  function fetchData(api) {
    fetch(api)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var navigationList = json.data;

        new Navigation(appNavigationNode, {
          list: navigationList,
          templateId: '#template-navigation-list',
          openButton: openButtonNode,
        });
      })
      .catch(function(error) {
        console.error(error.message);
      });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
