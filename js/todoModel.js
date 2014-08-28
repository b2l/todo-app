var _todos = [];

function Todo(name, done) {
  this.name = name;
  this.done = done || false;
}

module.exports = {
  create: function(name) {
    var todo = new Todo(name);
    _todos.push(todo);
    return todo;
  },
  getAll: function() {
    return _todos;
  },
  update: function(index, delta) {
    var todo = _todos[index];
    todo.name = delta.name;
    todo.done = delta.name;
    return todo;
  },
  destroy: function(index) {
    _todos.splice(index, 1);
  },
  done: function(index) {
    _todos[index].done = true;
  },
  undone: function(index) {
    _todos[index].done = false;
  },
  countDone: function() {
    var dones = _todos.filter(function(todo) {
      return todo.done;
    });
    return dones.length
  },
  countNotDone: function() {
    return _todos.length - this.countDone();
  }
};
