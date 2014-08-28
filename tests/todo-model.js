var expect = require('chai').expect;
var Todo = require('../js/todoModel.js');

describe('TODO model', function() {
  it('should create a new todo with name and default value', function() {
    var name = 'a new todo';
    var todo = Todo.create(name);
    expect(todo).to.have.property('name').equal(name);
    expect(todo).to.have.property('done').equal(false);
  });

});
