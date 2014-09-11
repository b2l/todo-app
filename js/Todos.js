/**
 * Todos.js
 * contains a collection wrapper for the Todo model
 */

// --- Data store
var _todos = [];

// --- Todo model
function Todo(name, done) {
  this.id = Date.now();
  this.name = name;
  this.done = done || false;
}
Todo.prototype.destroy = function() {
  var index = _todos.indexOf(this);
  _todos.splice(index, 1);
};
Todo.prototype.markAsDone = function() {
  this.done = true;
};
Todo.prototype.markAsNotDone = function() {
  this.done = false;
};

// --- Todos collection
var Todos = {
  getAll: function() {
    return _todos;
  },
  getById: function(id) {
    id = Number(id);
    var i = 0;
    var todo = null;
    while(todo === null && i < _todos.length) {
      if (_todos[i].id === id) {
        todo = _todos[i]
      }

      i++;
    }
    return todo;
  },
  createTodo: function(name) {
    var todo = new Todo(name);
    _todos.push(todo);
    return todo;
  },
  clearDone: function() {
    var dones = [];
    _todos.forEach(function(t, i) {
      if (t.done)
        dones.push(t);
    });
    dones.forEach(function(t) { t.destroy(); });
  }
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Todos;
  }
} else {
  window.Todos = Todos;
}
