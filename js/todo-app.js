// --- Collections model
var Todos = window.Todos;

// --- Tools
function htmlEncode(s) {
  return s.replace(/&(?!\w+([;\s]|$))/g, "&amp;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


// --- Event listener
$('#add-todo-form').on('submit', addTodo);
$('#todo-list').on('click', '.update', editTodo);
$('#todo-list').on('click', '.cancel-edit', cancelEditTodo);
$('#todo-list').on('submit', '.todo-update', updateTodo);
$('#todo-list').on('change', '.todo-status', updateTodoStatus);
$('#todo-list').on('click', '.remove', removeTodo);
$('#todos-info').on('click', '.remove-done', removeTodosDone);

// --- DOM Rendering
function render() {
  var todos = Todos.getAll();
  var html = "";
  todos.forEach(function(todo, index) {
    html += todosTemplate(todo);
  });
  $('#todo-list').html(html);
  $('#add-todo-form .input').focus();

  var notDones = todos.filter(function(t) { return !t.done }).length;
  var data = {
    notDone: notDones,
    done: todos.length - notDones
  }
  var infoHtml = todosInfoTemplate(data);
  $('#todos-info').html(infoHtml);
}

// --- Event handler
function addTodo(e) {
  e.preventDefault();
  var input = $(this).find('input[name="name"]');
  var name = htmlEncode(input.val());
  Todos.createTodo(name);
  input.val('');
  render();
}

function editTodo(e) {
  $('.todo-name-edit').addClass('hidden');
  $('.todo-name-show').removeClass('hidden');

  $(this).parents('li')
    .find('.todo-name-show').addClass('hidden')
    .next('.todo-name-edit').removeClass('hidden')
    .end().parents('li').find('input[type="text"]').focus();
}

function cancelEditTodo(e) {
  e.preventDefault();
  $('.todo-name-edit').addClass('hidden');
  $('.todo-name-show').removeClass('hidden');
}

function updateTodo(e) {
  e.preventDefault();
  var id = this.elements.todoId.value;
  var todo = Todos.getById(id);
  todo.name = htmlEncode(this.elements.todoName.value);
  render();
}

function updateTodoStatus(e) {
  var todo = Todos.getById($(this).attr('data-todo-id'));
  $(this).prop('checked') ? todo.markAsDone() : todo.markAsNotDone();
  render();
}

function removeTodo() {
  var todo = Todos.getById($(this).attr('data-todo-id'));
  todo.destroy();
  render();
}

function removeTodosDone() {
  Todos.clearDone();
  render();
}

// --- templating
var todosTemplate = _.template($('[data-template-name="todo-item"]').html());
var todosInfoTemplate = _.template($('[data-template-name="todos-info"]').html());

// --- Start app
Todos.init();
render();
