var Todos = require('../js/Todos');
var expect = require('chai').expect;
 
describe('Todos', function() {
  it('should create a new todo with name and default value', function() {
    var name = 'a new todo';
    var todo = Todos.createTodo(name);
    expect(todo).to.have.property('name').equal(name);
    expect(todo).to.have.property('done').equal(false);
  });

  it('should retrieve all todos', function() {
    var todos = Todos.getAll();
    expect(todos).to.have.property('length').equal(1);
    expect(todos[0]).to.have.property('name').equal('a new todo');
    expect(todos[0]).to.have.property('done').equal(false);
  });

  it ('should update a todo', function() {
    var todos = Todos.getAll();
    var todo = todos[0];
    var newName = 'A new name for our todo';

    todo.name = newName;

    var todos = Todos.getAll();
    expect(todos).to.have.property('length').equal(1);
    expect(todos[0]).to.have.property('name').equal(newName);
    expect(todos[0]).to.have.property('done').equal(false);
  });

  it('should remove a todo', function() {
    var todos = Todos.getAll();
    var todo = todos[0];

    todo.destroy();

    var todos = Todos.getAll();
    expect(todos).to.have.property('length').equal(0);
  });

  it('should mark a todo as done', function() {
    Todos.createTodo('a new todo');
    var todos = Todos.getAll();
    var todo = todos[0];

    todo.markAsDone();

    var todos = Todos.getAll();
    expect(todos).to.have.property('length').equal(1);
    expect(todos[0]).to.have.property('done').equal(true);
  });

  it('should mark a todo as not done', function() {
    var todos = Todos.getAll();
    var todo = todos[0];

    todo.markAsNotDone();

    var todos = Todos.getAll();
    expect(todos).to.have.property('length').equal(1);
    expect(todos[0]).to.have.property('done').equal(false);
  });
});
