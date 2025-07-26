let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoInput = document.getElementById('username');
const dateInput = document.getElementById('date');
const addBtn = document.querySelector('.addbutton');
const deleteAllBtn = document.querySelector('.action2');
const todoTableBody = document.getElementById('todoTableBody');
const filterBtn = document.querySelector('.action1');

let currentFilter = 'all';

function renderTodos() {
  todoTableBody.innerHTML = '';

  let filteredTodos = todos.filter(todo => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'done') return todo.status === 'done';
    if (currentFilter === 'pending') return todo.status === 'pending';
  });

  if (filteredTodos.length === 0) {
    todoTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${todo.text}</td>
      <td>${todo.date}</td>
      <td class="${todo.status === 'done' ? 'status-done' : 'status-pending'}">${todo.status}</td>
      <td>
        <button class="action-btn1" onclick="toggleStatus(${index})">Toggle</button>
        <button class="action-btn2" onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;
    todoTableBody.appendChild(row);
  });
}

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  const date = dateInput.value;

  if (text === '' || date === '') {
    alert('Harap isi todo dan tanggal!');
    return;
  }

  todos.push({ text, date, status: 'pending' });
  saveAndRender();
  todoInput.value = '';
  dateInput.value = '';
});

function deleteTodo(index) {
  todos.splice(index, 1);
  saveAndRender();
}

deleteAllBtn.addEventListener('click', () => {
  if (confirm("Yakin hapus semua tugas?")) {
    todos = [];
    saveAndRender();
  }
});

function toggleStatus(index) {
  todos[index].status = todos[index].status === 'pending' ? 'done' : 'pending';
  saveAndRender();
}

filterBtn.addEventListener('click', () => {
  const next = { all: 'pending', pending: 'done', done: 'all' };
  currentFilter = next[currentFilter];
  filterBtn.innerText = `FILTER (${currentFilter.toUpperCase()})`;
  renderTodos();
});

renderTodos();