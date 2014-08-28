var expect = require('chai').expect;
var Todos = require('../js/todoModel.js');

describe('Todos', function() {
  it('Should create a Todo', function() {
    // given
    var name = 'a new todo';

    // when
    var todo = Todos.create(name);

    // then
    expect(todo).to.have.property('name').equal(name);
    expect(todo).to.have.property('done').equal(false);
  });

  it('Should get a list of Todos', function() {
    var todos = Todos.getAll();

    expect(todos).to.have.property('length').equal(1);
    expect(todos[0]).to.have.property('name').equal('a new todo');
  });

  it('Should update a Todo', function() {
    var index = 0;
    var newName = 'old todo';

    var todo = Todos.update(index, {name: newName, done: false});
    
    var todos = Todos.getAll();
    expect(todos).to.have.property('length').equal(1);
    expect(todo).to.have.property('name').equal(newName);
    expect(todos[0]).to.equal(todo);
  });

  it('Should remove a Todo', function() {
    Todos.create('another todo');

    Todos.destroy(0);
    
    var todos = Todos.getAll();
    expect(todos).to.have.property('length').equal(1);
    expect(todos[0]).to.have.property('name').equal('another todo');
  });

  it('Should mark a todo as done', function() {
    Todos.done(0);

    var todos = Todos.getAll();
    expect(todos[0]).to.have.property('done').equal(true);
  });

  it('Should mark a todo as not done', function() {
    Todos.undone(0);

    var todos = Todos.getAll();
    expect(todos[0]).to.have.property('done').equal(false);
  });
});
