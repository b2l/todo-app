/**
 * Todos.js
 * contains a collection wrapper for the Todo model
 */

// --- Data store
var _todos = [];

function load() {
  var todos = JSON.parse(localStorage.getItem('todos'));
  todos.forEach(function(t) {
    todo = new Todo(t.name, t.done);
    todo.id = t.id;
    _todos.push(todo);
  });
}
function save() {
  localStorage.setItem('todos', JSON.stringify(_todos));
}

// --- Todo model
function Todo(name, done) {
  this.id = Date.now();
  this.name = name;
  this.done = done || false;
}
Todo.prototype.destroy = function() {
  var index = _todos.indexOf(this);
  _todos.splice(index, 1);
  save();
};
Todo.prototype.markAsDone = function() {
  this.done = true;
  save();
};
Todo.prototype.markAsNotDone = function() {
  this.done = false;
  save();
};

// --- Todos collection
var Todos = {
  init: function() {
    load();
  },
  getAll: function() {
    return _todos;
  },
  getById: function(id) {
    id = Number(id);
    var i = 0;
    var todo = null;
    while(todo === null && i < _todos.length) {
      if (_todos[i].id === id) {
        todo = _todos[i];
      }

      i++;
    }
    return todo;
  },
  createTodo: function(name) {
    var todo = new Todo(name);
    _todos.push(todo);
    save();
    return todo;
  },
  clearDone: function() {
    var dones = [];
    _todos.forEach(function(t, i) {
      if (t.done)
        dones.push(t);
    });
    dones.forEach(function(t) { t.destroy(); });
    save();
  }
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Todos;
  }
} else {
  window.Todos = Todos;
}
