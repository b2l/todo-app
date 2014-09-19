var storage = null;

var Store = function(storage) {
  return {
    load: function(key) {
      return JSON.parse(storage.getItem(key)) || [];
    },
    save: function(key, obj) {
      storage.setItem(key, JSON.stringify(obj));
    }
  };
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    storage = {
      setItem: function() {},
      getItem: function() {}
    };
    exports = module.exports = Store(storage);
  }
} else {
  window.Store = Store(localStorage);
}
