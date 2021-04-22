let $todoInput; // miejsce, gdzie użytkownik wpisuje treść
let $alertInfo; // info o braku zadań / konieczności dodania tekstu
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; // nowo dodany LI, nowe zadanie
let $allTasks; // lista wszystkich dodanych LI
let $idNumber = 0; // ID dodawane do każdego nowego zadania
let $popup; //pobrany popup
let $popupInfo; // alert w popupie, jak się doda pusty tekst
let $editedTodo; // edytowany Todo
let $popupInput; //tekst wpisywany w inputa w popup'ie
let $addPopupBtn; // przycisk "zatwierdź" w popup'ie
let $closeTodoBtn //przycisk od zamykania popup'a

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todo-input');
    $alertInfo = document.querySelector('.alert-info');
    $addBtn = document.querySelector('.add-btn');
    $ulList = document.querySelector('.todo-list ul');
    $allTasks = document.getElementsByTagName('li');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popup-info');
    $popupInput = document.querySelector('.popup-input');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $todoInput.addEventListener('keyup', enterCheck);
    $ulList.addEventListener('click', checkClick)
    $addPopupBtn.addEventListener('click', changeToDo)
    $closeTodoBtn.addEventListener('click', closePopup)
}

const addNewTask = () => {
    if($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        $alertInfo.innerText = '';
        $todoInput.value = '';
        createToolsArea();
    }else {
        $alertInfo.innerText = 'You need to write the taks 😊'
    }
}

const enterCheck = (event) => {
    if(event.keyCode === 13){
        addNewTask()
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel)

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'
    
    const editBtn = document.createElement('button')
    editBtn.classList.add('edit');
    editBtn.innerHTML = 'Edit'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.appendChild(completeBtn)
    toolsPanel.appendChild(editBtn)
    toolsPanel.appendChild(deleteBtn)
}

const checkClick = (event) => {
    if(event.target.classList.value !== '') {
        if(event.target.closest('button').classList.contains('complete')) {

            event.target.closest('li').classList.toggle('completed')
            event.target.closest('button').classList.toggle('completed')

        } else if(event.target.closest('button').classList.contains('edit')) {
            editTask(event)
        } else if (event.target.closest('button').classList.contains('delete')) {
            deleteTask(event);
        }
    }
}

const deleteTask = (event) => {
    const deleteToDo = event.target.closest('li')
    deleteToDo.remove()

    if($allTasks.length === 0) {
        $alertInfo.innerText = 'No tasks on the list.'
    }

}

const editTask = (event) => {
    const oldToDo = event.target.closest('li').id;
    $editedTodo = document.getElementById(oldToDo);

    
    $popupInput.value = $editedTodo.firstChild.textContent;
    $popup.style.display = 'flex';
}

const changeToDo = () => {
    if($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none'
        $popupInfo.innerText = ''
    }else {
        $popupInfo.innerText = 'You need to write something ✎'
    }
}

const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
}

document.addEventListener('DOMContentLoaded', main);
