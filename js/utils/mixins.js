(function mixins() {
  'use strict';

  function mixinsUtil() {
    var _mix = function(o1, o2) {
      for (var key in o2) {
        if (o2.hasOwnProperty(key)) {
          var value = o2[key];
          o1[key] = value;
        }
      }
      return o1;
    };

    return [].slice.call(arguments).reduce(function(acc, current) {
      return _mix(acc, current);
    }, {});
  }

  window.mixins = mixinsUtil;
})();
