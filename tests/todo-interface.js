var seleniumServer = require('./selenium-server');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var By = webdriver.By;

seleniumServer.start();
var driver = new webdriver
  .Builder()
  .usingServer(seleniumServer.address())
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

var expect = require('chai').expect;

test.describe('Todo App', function() {
  test.before(function() {
    driver.get('http://localhost:8000/html/todo.html');
  });

  test.after(function() {
    driver.close();
    driver.quit();
  });

  test.it('Should add a todo on ENTER', function() {
    var input = driver.findElement(By.css('#add-todo-form .input'));
    input.sendKeys('a new todo', webdriver.Key.ENTER);

    getTodos().then(function(todos) {
        expect(todos).to.have.property('length').equal(1);
        assertTodoLabel(todos[0], 'a new todo');
      });
  });

  test.it('Should add a todo on click on the "Add" button', function() {
    var input = driver.findElement(By.css('#add-todo-form .input'));
    input.sendKeys('something else to do');
    driver.findElement(By.css('#add-todo-form input[type="submit"]')).click();

    getTodos().then(function(todos) {
        expect(todos).to.have.property('length').equal(2);
        assertTodoLabel(todos[1], 'something else to do');
      });
  });

  test.it('Should remove a todo on click on the "Remove" button', function() {
    var firstTodo = getFirstTodo();

    firstTodo.findElement(By.css('.btn.remove')).click();

    getTodos().then(function(todos) {
        expect(todos).to.have.property('length').equal(1);
        assertTodoLabel(todos[0], 'something else to do');
      });
  });

  test.it('Should display the update form on click on the "Update" button', function() {
    var firstTodo = getFirstTodo();

    firstTodo.findElement(By.css('.btn.update')).click();

    firstTodo.findElement(By.css('.todo-update')).isDisplayed().then(function(isDisplayed) {
      expect(isDisplayed).to.be.true;
    });
  });

  test.it('Should hide the update form on click on the "cancel" button', function() {
    var firstTodo = getFirstTodo();

    firstTodo.findElement(By.css('.btn.cancel-edit')).click();

    firstTodo.findElement(By.css('.todo-update')).isDisplayed().then(function(isDisplayed) {
      expect(isDisplayed).to.be.false;
    });

  });

  test.it('Should update the todo on enter', function() {
    var firstTodo = getFirstTodo();
    firstTodo.findElement(By.css('.btn.update')).click();

    var updateInput = firstTodo.findElement(By.css('.todo-update input[name="todoName"]'));
    updateInput.clear();
    updateInput.sendKeys('change name', webdriver.Key.ENTER);

    driver.findElement(By.css('.todo-item:first-child')).then(function(todo) {
      assertTodoLabel(todo, 'change name');
    });
  });

  test.it('Should mark a todo as done', function() {
    var firstTodo = getFirstTodo();

    firstTodo.findElement(By.css('input[type="checkbox"]')).click();
    
    getFirstTodo().getAttribute('class').then(function(classNames) {
      expect(classNames.split(' ')).to.include('done');
    });
  });

  test.it('Should mark a todo as not done', function() {
    var firstTodo = getFirstTodo();

    firstTodo.findElement(By.css('input[type="checkbox"]')).click();
    
    getFirstTodo().getAttribute('class').then(function(classNames) {
      expect(classNames.split(' ')).not.to.include('done');
    });
  });

});


function getFirstTodo() {
  return driver.findElement(By.css('.todo-item:first-child'));
}

function getTodos() {
  return driver.findElements(By.css('#todo-list .todo-item'));
}

function assertTodoLabel(todo, expectedLabel) {
  todo.findElement(By.css('.todo-name-label')).getText().then(function(text) { 
    expect(text).to.equal(expectedLabel); 
  });
}
