// Глобальная переменная для отслеживания текущего blockNumber блока
let currentBlockNumber = null;

// Глобальная переменная для отслеживания текущего blockNumber блока
let dataquantity = null;

// Функция для обработки событий клика по блоку
document.addEventListener('click', (event) => {
    // Обрабатываем событие клика по блоку (grid-item)
    if (event.target.classList.contains('grid-item')) {
        // Получаем текущий blockNumber
        currentBlockNumber = event.target.dataset.number;

        console.log(currentBlockNumber);

        // Вызываем функцию для выделения блока
        highlightBlock(currentBlockNumber);

        // Получаем ссылку на текущую страницу
        const currentPageUrl = getСurrentPageUrl();

        // console.log(currentPageUrl)

        // Отправляем данные о блоке и ссылку на текущую страницу на сервер
        submitLineNumber(currentBlockNumber, currentPageUrl);

        blockId = event.target.id.substring(5);
        updateBlockInfo(blockId);
    }
});

// Функция для отправки номера выбранного блока и адреса текущей страницы на сервер и возврата данных на страницу
function submitLineNumber(blockNumber, currentPageUrl) {
    // Отправляем данные на сервер
    fetch('/receiving_data_from_server', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ line_number: blockNumber, page_url: currentPageUrl })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при получении данных с сервера');
            }
            return response.json();
        })
        .then((data) => {
            // Обновляем содержимое страницы с полученными данными
            displayBlockInfo(data);
            return data;
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}


// Функция для обновления информации о блоке на странице с анимацией
function displayBlockInfo(data) {
    dataquantity = data.quantity;
    console.log("data.quantity = " + "!" + dataquantity + "!" + " (Если между восклицательными знаками ничего нет, то значит значение data.quantity)")

    // Проверяем, есть ли данные
    if (!data) {
        console.error('Данные для блока не найдены.');
        return;
    }

    // Обновляем отображение информации о блоке
    const blockInfoHTML = generateBlockInfoHTML(data);
    const infoOfBlock = document.getElementById('info-of-block');
    if (infoOfBlock) {
        // Добавляем класс для плавного появления
        infoOfBlock.classList.add('info-fade-in');
        infoOfBlock.innerHTML = blockInfoHTML;

        // Убираем класс после завершения анимации
        setTimeout(() => {
            infoOfBlock.classList.remove('info-fade-in');
        }, 750); // Время анимации в миллисекундах
    } else {
        console.error('Элемент с id "info-of-block" не найден.');
    }
}

// Генерирует HTML-разметку для информации о блоке на основе переданных данных.
function generateBlockInfoHTML(data) {
    return `
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Материал:</a> &nbsp; ${data.material}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Тип:</a> &nbsp; ${data.tipe}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Стандарт:</a> &nbsp; ${data.standard}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Диаметр, мм:</a> &nbsp; ${data.diameter}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Длина, мм:</a> &nbsp; ${data.length}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Количество, шт:</a> &nbsp; ${data.quantity}</p>
    `;
}

// Функция для обновления информации (что выбрана/выбран за ячейка/контейнер) о блоке на странице
function updateBlockInfo(data) {
    // Проверяем, есть ли данные
    if (!data) {
        console.error('Данные для блока не найдены.');
        return;
    }

    // Устанавливаем заголовок и содержимое блока в зависимости от типа
    const blockId = getCurrentBlockId();
    const blockType1 = window.location.href.includes('stellazh1') ? 'Контейнер' : 'Ячейка';
    const blockType2 = window.location.href.includes('stellazh1') ? 'контейнера' : 'ячейки';

    const blockInfo = {
        title: `${blockType1} ${blockId}`,
        content: `Информация о содержимом ${blockType2} ${blockId}:`,
    };

    // Обновляем отображение информации о блоке
    const blockTitle = document.getElementById('block-title');
    const blockContent = document.getElementById('block-content');
    if (blockTitle && blockContent) {
        blockTitle.innerText = blockInfo.title;
        blockContent.innerText = blockInfo.content;
    } else {
        console.error('Элемент с id "block-title" или "block-content" не найден.');
    }

    const buttonsContainer = document.getElementById('rabota-s-kolichestvom');
    if (!buttonsContainer) {
        console.error('Элемент с id "rabota-s-kolichestvom" не найден.');
        return;
    }

    // Вызываем функции для создания кнопок и полей ввода
    createButtons_Vzyat_Polozhit();
}

// Функция для создания кнопок "Взять" и "Положить" динамически
function createButtons_Vzyat_Polozhit() {
    const buttonsContainer = document.getElementById('rabota-s-kolichestvom');

    // Удаляем все предыдущие кнопки и элементы внутри контейнера
    buttonsContainer.innerHTML = '';

    // Создаем и добавляем кнопки "Взять" и "Положить" в контейнер,
    // также удаляем существующие кнопки и элементы перед созданием новых.
    const existingButtons = document.querySelectorAll('.dynamic-button');
    existingButtons.forEach(button => {
        buttonsContainer.removeChild(button);
    });

    // Создаем кнопку "Взять"
    const btnTake = document.createElement('button');
    btnTake.className = 'dynamic-button';
    btnTake.innerText = 'Взять';
    btnTake.onclick = () => {
        createDynamicElements();
        showQuantityInput('Взять');
    };
    buttonsContainer.appendChild(btnTake);

    // Создаем кнопку "Положить"
    const btnPut = document.createElement('button');
    btnPut.className = 'dynamic-button';
    btnPut.innerText = 'Положить';
    btnPut.onclick = () => {
        createDynamicElements();
        showQuantityInput('Положить');
    };
    buttonsContainer.appendChild(btnPut);
}





// Функция для отображения поля ввода количества
function showQuantityInput(action) {
    // Устанавливает текст и видимость поля ввода в зависимости от выбранного действия.
    const quantityInputContainer = document.getElementById('quantity-input-container');

    if (!quantityInputContainer) {
        console.error('Элемент с id "quantity-input-container" не найден.');
        return;
    }

    const btnConfirm = document.getElementById('btn-confirm');
    if (!btnConfirm) {
        console.error('Элемент с id "btn-confirm" не найден.');
        return;
    }

    btnConfirm.dataset.action = action;
    btnConfirm.innerText = `Готово (${action})`;

    // Плавно отображаем поле ввода
    fadeIn(quantityInputContainer);
}

// Функция для плавного появления поля ввода
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

// Функция для создания кнопок, полей ввода и других элементов динамически
function createDynamicElements() {
    const buttonsContainer = document.getElementById('rabota-s-kolichestvom');

    // Создаем и добавляем поле ввода и кнопку "Готово",

    // также удаляем существующие кнопки и элементы перед созданием новых.
    const quantityInputContainer = document.getElementById('quantity-input-container');
    if (quantityInputContainer) {
        quantityInputContainer.parentNode.removeChild(quantityInputContainer);
    }


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
    btnConfirm.onclick = performAction_Vzyat_Polozhit;

    // Добавляем элементы к контейнеру
    newQuantityInputContainer.appendChild(quantityInput);
    newQuantityInputContainer.appendChild(btnConfirm);

    // Добавляем контейнер к buttonsContainer
    buttonsContainer.appendChild(newQuantityInputContainer);
}





// Функция для выполнения действия в зависимости от выбора "Взять" или "Положить"
function performAction_Vzyat_Polozhit() {
    // Выполняет действие (взять/положить) в зависимости от выбора пользователя.
    // Проверка существования элемента

    // Получаем текущий blockNumber
    const blockNumber = currentBlockNumber;
    console.log(blockNumber)

    // Получаем ссылку на текущую страницу
    const currentPageUrl = getСurrentPageUrl();

    const btnConfirm = document.getElementById('btn-confirm');
    if (!btnConfirm) {
        console.error('Элемент с id "btn-confirm" не найден.');
        return;
    }

    const quantityInput = document.getElementById('quantity-input');
    if (!quantityInput) {
        console.error('Элемент с id "quantity-input" не найден.');
        return;
    }

    const action = btnConfirm.dataset.action || '';
    const blockId = getCurrentBlockId();

    var block = document.getElementById(`block${blockId}`);

    if (!block) {
        console.error('Элемент с id ' + blockId + ' не найден.');
        return;
    }

    var dataNumber = block.getAttribute("data-number");

    if (!dataNumber) {
        console.error('Атрибут data-number не найден на элементе с id ' + blockId);
        return;
    }

    // Проверяем, что введено натуральное число
    let quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
        alert('Пожалуйста, введите натуральное число.');
        return;
    }

    console.log(dataquantity, quantity)

    // Выполняем действие в зависимости от выбранного "Взять" или "Положить"
    if (action === 'Взять') {
        if (quantity > dataquantity) {
            alert('Нельзя взять больше, чем есть в наличии.');
            return; // Убрать эту строку, чтобы код продолжал выполнение
        }
        quantity = (-1) * quantity;
    } else if (action === 'Положить') {
        quantity = quantity;
    }


    // Проверяем корректность значения quantity
    if (quantity === null || isNaN(quantity)) {
        console.error('Некорректное значение quantity:', quantity);
        return;
    }

    // Отправляем данные о блоке и ссылку на текущую страницу на сервер
    submitcheck(blockNumber, currentPageUrl, quantity);

    // Скрываем поле ввода
    const quantityInputContainer = document.getElementById('quantity-input-container');
    if (quantityInputContainer) {
        fadeOut(quantityInputContainer);
    }

    // Очищаем поле ввода
    quantityInput.value = '';
}

// Функция для отправки данных о выбранном блоке и адреса текущей страницы на сервер и возврата данных на страницу
function submitcheck(blockNumber, currentPageUrl, quantity) {
    // Отправляем данные на сервер
    fetch('/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ line_number: blockNumber, currentPageUrl: currentPageUrl, quantity: quantity })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при получении данных с сервера');
            }
            return response.json();
        })
        .then((data) => {
            // Обновляем содержимое страницы с полученными данными
            displayBlockInfo(data);
            return data;
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}

// Функция для плавного исчезновения поля ввода
function fadeOut(element) {
    // Плавно уменьшает прозрачность элемента для создания эффекта исчезновения
    let opacity = 1;
    const interval = setInterval(() => {
        if ((opacity -= 0.1) < 0) {
            clearInterval(interval);
            element.style.display = 'none';
        } else {
            element.style.opacity = opacity;
        }
    }, 250);
}