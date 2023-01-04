let $todoInput;
let $alertInfo;
let $addBtn;
let $ulList;
let $newTask;
let $toolsPanel;
let $popup;
let $popupInfo;
let $editedTodo;
let $popupInput;
let $addPopupBtn;
let $closeTodoBtn;
let $idNumber = 0;


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', pressEnter);
};

const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);

        $todoInput.value = ''
        $alertInfo.innerText = ''
        createToolsArea();
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania!';
    }
};

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools')
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
};

const checkClick = (e) => {

    if (e.target.closest('button').classList.contains('complete')) {

        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').closest.toggle('completed');

    } else if (e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        e.target.closest('li').remove('li');
    }

};

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;

    $popup.style.display = 'flex';
};

const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'Musisz podać jakąś treść';
    };
};

const closePopup = () => {
    $popup.style.display = 'none';
};

const pressEnter = (e) => {
    if (13 == e.keyCode) {
        addNewTask();
    };
  };

document.addEventListener('DOMContentLoaded', main);