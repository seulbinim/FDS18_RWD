(function newsControl() {
  'use strict';

  var apiAddress = '/api/press.json';
  var dataTableContainer = null;

  function init() {
    fetchData((isDevelopmentMode() ? '' : '/EDIYA') + apiAddress);
    dataTableContainer = document.querySelector('#newsPanel02');
  }

  function fetchData(api) {
    fetch(api)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        var tableData = json.data;
        // 테이블 렌더링
        renderDataTable(tableData);
      })
      .catch(function(error) {
        console.error(error.message);
      });
  }

  function renderDataTable(tableData) {
    // 데이터 테이블 컴포넌트 생성(렌더링)
    new DataTable(dataTableContainer, {
      data: tableData,
      displayItemCount: 5,
      current: 1,
      caption: '이디야 소식 안내',
      headers: '순서, 내용, 날짜'.split(', '),
      selectOptions: [
        { value: 'title', text: '제목' },
        { value: 'content', text: '내용' },
        // { value: 'test', text: '테스트' },
      ],
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
