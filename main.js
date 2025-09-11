// Вибір елементів DOM та присвоєння їх змінним
let calendarScreen = document.querySelector('.calendar-screen') // Екран календаря
let taskScreen = document.querySelector('.task-screen') // Екран завдань
let addTaskScreen = document.querySelector('.add-task-screen') // Екран додавання завдань
let datePicker = document.querySelector('.date-picker') // Поле вибору дати
let selectDateButton = document.querySelector('.select-date') // Кнопка вибору дати
let selectedDateSpan = document.querySelector('.selected-date') // Елемент для відображення вибраної дати
let taskDateSpan = document.querySelector('.task-date') // Елемент для відображення дати завдання
let taskList = document.querySelector('.task-list') // Список завдань
let addTaskButton = document.querySelector('.add-task') // Кнопка додавання завдання
let backToCalendarButton = document.querySelector('.back-to-calendar') // Кнопка повернення до календаря
let cancelAddTaskButton = document.querySelector('.cancel-add-task') // Кнопка скасування додавання завдання
let taskForm = document.querySelector('.task-form') // Форма додавання завдання
let taskInput = document.querySelector('.task-input') // Поле введення тексту завдання

// Ініціалізація порожнього об'єкта для зберігання завдань
let tasks = {}

function showScreen(screen) {
    // Функція для відображення певного екрану та приховування інших
    calendarScreen.style.display = 'none'
    taskScreen.style.display = 'none'
    addTaskScreen.style.display = 'none'
    screen.style.display = 'block'
}

addTaskButton.addEventListener('click', () => {
    // Показати екран додавання завдання при натисканні кнопки "Додати завдання"
    showScreen(addTaskScreen)
})

backToCalendarButton.addEventListener('click', () => {
    // Повернутися до екрану календаря при натисканні кнопки "Повернутися до календаря"
    showScreen(calendarScreen)
})

cancelAddTaskButton.addEventListener('click', () => {
    // Повернутися до екрану завдань при натисканні кнопки "Скасувати"
    showScreen(taskScreen)
})

function renderTasks(date) {
    taskList.innerHTML = '' // Очистити список завдань
    if (tasks[date]) {
        // Якщо є завдання для вибраної дати, відобразити їх
        tasks[date].forEach((task,) => {
            let li = document.createElement('li')
            li.textContent = task
            let deleteButton = document.createElement('button')
            deleteButton.textContent = 'Видалити'
            deleteButton.classList.add('delete')
            li.appendChild(deleteButton)
            taskList.appendChild(li)
        })
    }
}


selectDateButton.addEventListener('click', () => { 
    let selectedDate = datePicker.value // Отримати вибрану дату з поля вибору дати
    if (!selectedDate) {
        alert('Будь ласка, виберіть дату.') // Якщо дата не вибрана, показати повідомлення
        return
    }
    selectedDateSpan.innerHTML = selectedDate
    taskDateSpan.innerHTML = selectedDate
    showScreen(taskScreen) // Показати екран завдань
    renderTasks(selectedDate) // Відобразити завдання для вибраної дати
})


// Додавання обробника події на форму додавання завдання
taskForm.addEventListener('submit', function (e) {
    //За замовчуванням, коли форму відправляють, браузер перезавантажує сторінку, що призводить до втрати всіх даних, які не зберігаються.
    e.preventDefault() // Запобігти стандартній поведінці форми
    let taskText = taskInput.value // Отримання тексту завдання
    let selectedDate = taskDateSpan.innerHTML // Отримання вибраної дати


    if (!tasks[selectedDate]) { // Якщо для вибраної дати немає завдань, створити новий масив
        tasks[selectedDate] = []
    }

    tasks[selectedDate].push(taskText) // Додати нове завдання до масиву завдань для вибраної дати
    taskInput.value = '' // Очистити поле введення
    showScreen(taskScreen) // Показати екран завдань
    renderTasks(selectedDate) // Відобразити завдання для вибраної дати
})


// Додавання обробника події на список завдань для видалення завдань
taskList.addEventListener('click', function (event) {
    if (event.target.className == 'delete') { // Якщо клік був на кнопку видалення
        let taskItem = event.target.parentElement // Отримуємо батьківський елемент кнопки "delete".
        let selectedDate = taskDateSpan.innerHTML // Отримати вибрану дату
        let taskText = taskItem.firstChild.nodeValue // Отримати текст завдання
        // taskItem.firstChild  перший вузол всередині елемента (це текст до кнопки).
        //.nodeValue  сам текст.
        //.trim() прибирає зайві пробіли на початку та в кінці.
        //Таким чином отримуємо рядок типу "Купити молоко".

        // Видалити завдання з масиву завдань для вибраної дати
        for (let i = 0; i < tasks[selectedDate].length; i += 1) {
            if (tasks[selectedDate][i] == taskText) {
                tasks[selectedDate].splice(i, 1) // Видалити завдання з масиву
                break
            }
        }
        renderTasks(selectedDate) // Відобразити оновлений список завдань
    }
})
