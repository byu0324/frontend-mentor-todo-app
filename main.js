const bgImg = document.querySelector('.bg-img');
const theme = document.querySelector('.theme');
const themeImg = document.querySelector('.theme img');
const input = document.querySelector('#todo-input');
const lists = document.querySelector('.todo-lists');
const todos = document.querySelectorAll('.todo-list');
let checkboxes = document.querySelectorAll('.todo-list-checkbox');
const closeBtns = document.querySelectorAll('.close');
const left = document.querySelector('.left-num');
const allBtn = document.querySelector('#all');
const activeBtn = document.querySelector('#active');
const completedBtn = document.querySelector('#completed');
const clear = document.querySelector('.clear');

function seeable(list) {
  list.lastElementChild.style.opacity = '1';
}

function seeness(list) {
  list.lastElementChild.style.opacity = '0';
}

function todoRemove(btn) {
  let clickedLi = btn.parentElement;
  let clickedInput = clickedLi.firstElementChild;
  if(clickedInput.checked == true) {
    count--;
  }
  btn.parentElement.remove();

  left.textContent = `${lists.childElementCount - count} items left`;
}

function checkedCount(checkbox) {
  if (checkbox.checked == true) count++;
  if (checkbox.checked == false) count--;
  left.textContent = `${lists.childElementCount - count} items left`;
}

function all(btn) {
  btn.style.display = 'flex';
}

function active(btn) {
  if (btn.checked == true) {
    btn.parentElement.style.display = 'none';
  } else {
    btn.parentElement.style.display = 'flex';
  };
}

function completed(btn) {
  if (btn.checked == true) {
    btn.parentElement.style.display = 'flex';
  } else {
    btn.parentElement.style.display = 'none';
  };
}

let count = 0;
checkboxes.forEach(checkbox => {
  if(checkbox.checked == true) count++;
});

left.textContent = `${lists.childElementCount - count} items left`;

theme.addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    bgImg.src = 'images/bg-desktop-light.jpg';
    document.documentElement.setAttribute('data-theme', 'light');
    themeImg.src = 'images/icon-sun.svg';
  } else {
    bgImg.src = 'images/bg-desktop-dark.jpg';
    document.documentElement.setAttribute('data-theme', 'dark');
    themeImg.src = 'images/icon-moon.svg';
  }
});

input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    if (input.value != '') {
      const newLi = document.createElement('li');
      const newInput = document.createElement('input');
      const newSpan = document.createElement('span');
      const newBtn = document.createElement('button');
      const newImg = document.createElement('img');
      newSpan.textContent = input.value;

      newLi.classList.add('todo-list');
      newInput.classList.add('todo-list-checkbox');
      newSpan.classList.add('todo-list-text');
      newBtn.classList.add('close');
      newImg.src = 'images/icon-cross.svg'
      newInput.type = 'checkbox';
      
      newLi.draggable = true;
      newLi.append(newInput, newSpan, newBtn);
      newBtn.appendChild(newImg);

      newLi.addEventListener('mouseover', () => seeable(newLi));
      newLi.addEventListener('mouseout', () => seeness(newLi));
      newInput.addEventListener('click', () => checkedCount(newInput));
      newBtn.addEventListener('click', function () {
        todoRemove(this);
      });

      lists.appendChild(newLi);
      
      if(completedBtn.checked == true) {
        newLi.style.display = 'none';
      }

      input.value = '';
      left.textContent = `${lists.childElementCount - count} items left`;
    }
  }
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    todoRemove(this);
  });
});

todos.forEach(todo => {
  todo.addEventListener('mouseover', () => seeable(todo));
  todo.addEventListener('mouseout', () => seeness(todo));
});

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', () => checkedCount(checkbox));
});

allBtn.addEventListener('click', () => {
  todos.forEach(todo => all(todo));
});

activeBtn.addEventListener('click', () => {
  checkboxes = document.querySelectorAll('.todo-list-checkbox');
  checkboxes.forEach(checkbox => active(checkbox));
});

completedBtn.addEventListener('click', () =>{
  checkboxes = document.querySelectorAll('.todo-list-checkbox');
  checkboxes.forEach(checkbox => completed(checkbox));
  completedBtn.checked = true;
});

clear.addEventListener('click', () => {
  checkboxes = document.querySelectorAll('.todo-list-checkbox');
  checkboxes.forEach(checkbox => {
    if(checkbox.checked == true) {
      checkbox.parentElement.remove();
      count = 0;
    }
  })
});