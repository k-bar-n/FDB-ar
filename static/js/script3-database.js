// Генерирует HTML-разметку для информации о блоке на основе переданных данных.
function generateBlockInfoHTML(data) {
    return `
        <p class="neizmenyaemi-text-inform"><a style="font-weight: bolder;">Материал:</a> &nbsp; ${data.material}</p>
        <p class="neizmenyaemi-text-inform"><a style="font-weight: bolder;">Тип:</a> &nbsp; ${data.type}</p>
        <p class="neizmenyaemi-text-inform"><a style="font-weight: bolder;">Стандарт:</a> &nbsp; ${data.standard}</p>
        <p class="neizmenyaemi-text-inform"><a style="font-weight: bolder;">Диаметр:</a> &nbsp; ${data.diameter}</p>
        <p class="neizmenyaemi-text-inform"><a style="font-weight: bolder;">Длина:</a> &nbsp; ${data.length}</p>
        <p class="neizmenyaemi-text-inform"><a style="font-weight: bolder;">Количество:</a> &nbsp; ${data.quantity}</p>
    `;
}

// Функция для получения данных из базы данных CSV по блоку
function getDataFromCSV(blockId) {
    // В реальном приложении эта функция должна была бы делать запрос к базе данных
    // и возвращать реальные данные для блока с указанным ID. В данном случае, возвращаются фиктивные данные.
    return {
        // material: "Конкретный материал",
        // type: "Конкретный тип",
        // standard: "Конкретный стандарт",
        // diameter: "Конкретный диаметр",
        // length: "Конкретная длина",
        // quantity: "Конкретное количество",
        material: `Конкретный материал ${blockId}`,
        type: `Конкретный тип ${blockId}`,
        standard: `Конкретный стандарт ${blockId}`,
        diameter: `Конкретный диаметр ${blockId}`,
        length: `Конкретная длина ${blockId}`,
        // quantity: `Конкретное количество ${blockId}`,
        quantity: 52,
    };
}

// Функция для обновления информации при выборе блока
function updateBlockInfo(blockId) {
    // Получаем данные для блока и обновляем информацию в интерфейсе
    const data = getDataFromCSV(blockId);
    displayBlockInfo(blockId);
}



// Временная реализация функции обновления данных в CSV
//              function updateDataInCSV(blockId, newData) {

// Эта функция представляет собой заглушку и выводит в консоль обновленные данные,
// в реальном приложении она должна обновлять данные в базе данных.

//          console.log(`Update data in CSV for block ${blockId}:`, newData);
// Здесь обычно должен быть код для фактического обновления данных в CSV.
//              }



// Функция для создания кнопок динамически
function createButtons() {
    // Создаем и добавляем кнопки "Взять" и "Положить" в контейнер,
    // также удаляем существующие кнопки перед созданием новых.
    const buttonsContainer = document.getElementById('rabota-s-kolichestvom');
    const existingButtons = document.querySelectorAll('.dynamic-button');
    existingButtons.forEach(button => {
        buttonsContainer.removeChild(button);
    });

    // Создаем кнопку "Взять"
    const btnTake = document.createElement('button');
    btnTake.className = 'dynamic-button';
    btnTake.innerText = 'Взять';
    btnTake.onclick = () => showQuantityInput('Взять');
    buttonsContainer.appendChild(btnTake);

    // Создаем кнопку "Положить"
    const btnPut = document.createElement('button');
    btnPut.className = 'dynamic-button';
    btnPut.innerText = 'Положить';
    btnPut.onclick = () => showQuantityInput('Положить');
    buttonsContainer.appendChild(btnPut);
}

// Функция для создания кнопок, полей ввода и других элементов динамически
function createDynamicElements() {
    // Создаем и добавляем кнопки "Взять" и "Положить", поле ввода и кнопку "Готово",
    // удаляем существующие кнопки и элементы перед созданием новых.
    const buttonsContainer = document.getElementById('rabota-s-kolichestvom');
    const quantityInputContainer = document.getElementById('quantity-input-container');

    const existingButtons = document.querySelectorAll('.dynamic-button');
    existingButtons.forEach(button => {
        buttonsContainer.removeChild(button);
    });

    if (quantityInputContainer) {
        quantityInputContainer.parentNode.removeChild(quantityInputContainer);
    }

    // Создаем кнопку "Взять"
    const btnTake = document.createElement('button');
    btnTake.className = 'dynamic-button';
    btnTake.innerText = 'Взять';
    btnTake.onclick = () => showQuantityInput('Взять');
    buttonsContainer.appendChild(btnTake);

    // Создаем кнопку "Положить"
    const btnPut = document.createElement('button');
    btnPut.className = 'dynamic-button';
    btnPut.innerText = 'Положить';
    btnPut.onclick = () => showQuantityInput('Положить');
    buttonsContainer.appendChild(btnPut);

    // Создаем контейнер для поля ввода и кнопки "Готово"
    const newQuantityInputContainer = document.createElement('div');
    newQuantityInputContainer.id = 'quantity-input-container';

    // Создаем поле ввода
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.id = 'quantity-input';

    // Создаем кнопку "Готово"
    const btnConfirm = document.createElement('button');
    btnConfirm.id = 'btn-confirm';
    btnConfirm.innerText = 'Готово';
    btnConfirm.onclick = performAction;

    // Добавляем элементы к контейнеру
    newQuantityInputContainer.appendChild(quantityInput);
    newQuantityInputContainer.appendChild(btnConfirm);

    // Добавляем контейнер к buttonsContainer
    buttonsContainer.appendChild(newQuantityInputContainer);
}

// Функция для отображения поля ввода количества
function showQuantityInput(action) {
    // Устанавливает текст и видимость поля ввода в зависимости от выбранного действия.
    const quantityInputContainer = document.getElementById('quantity-input-container');
    const btnConfirm = document.getElementById('btn-confirm');

    btnConfirm.dataset.action = action;
    btnConfirm.innerText = `Готово (${action})`;

    // Плавно отображаем поле ввода
    fadeIn(quantityInputContainer);
}

// Функция для выполнения действия в зависимости от выбора "Взять" или "Положить"
function performAction() {
    // Выполняет действие (взять/положить) в зависимости от выбора пользователя.
    const btnConfirm = document.getElementById('btn-confirm');
    const quantityInput = document.getElementById('quantity-input');
    const action = btnConfirm.dataset.action || '';
    const blockId = getCurrentBlockId();
    let data = getDataFromCSV(blockId);

    // Проверяем, что введено натуральное число
    const quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
        alert('Пожалуйста, введите натуральное число.');
        return;
    }

    // Выполняем действие в зависимости от выбранного "Взять" или "Положить"
    if (action === 'Взять') {
        if (quantity > data.quantity) {
            alert('Нельзя взять больше, чем есть в наличии.');
            return;
        }
        data.quantity -= quantity;
    } else if (action === 'Положить') {
        data.quantity += quantity;
    }

    // Обновляем информацию в базе данных !!!
    // updateDataInCSV(blockId, data);

    // Обновляем отображение информации
    displayBlockInfo(blockId);

    // Скрываем поле ввода
    const quantityInputContainer = document.getElementById('quantity-input-container');
    fadeOut(quantityInputContainer);

    // Очищаем поле ввода
    quantityInput.value = '';
}

// Обработчик события клика по блоку
document.addEventListener('click', (event) => {
    // Обрабатываем событие клика по блоку (grid-item)
    if (event.target.classList.contains('grid-item')) {
        const blockId = event.target.id.substring(5); // Извлекаем ID блока из ID элемента
        currentBlockId = blockId;
        updateBlockInfo(blockId);

        // Вызываем функции для создания кнопок и полей ввода
        createButtons();
        createDynamicElements();
    }
});

// Функция для плавного появления элемента
function fadeIn(element) {
    // Плавно увеличивает прозрачность элемента для создания эффекта появления
    element.style.opacity = 0;
    (function fade() {
        var val = parseFloat(element.style.opacity);
        if (!((val += 0.1) > 1)) {
            element.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

function fadeOut(element) {
    // Плавно уменьшает прозрачность элемента для создания эффекта исчезновения
    element.style.opacity = 1;
    setTimeout(function () {
        (function fade() {
            if ((element.style.opacity -= 0.1) < 0) {
                element.style.display = 'none';
            } else {
                requestAnimationFrame(fade);
            }
        })();
    }, 300); // Задержка перед началом исчезновения (300 миллисекунд)
}
