// Глобальная переменная для отслеживания текущего blockNumber блока
let currentBlockNumber = null;

// Глобальная переменная для отслеживания текущего blockNumber блока
let dataquantity = null;

// Функция для обработки событий клика по блоку
document.addEventListener('click', (event) => {
    // document.addEventListener('mouseover', (event) => {
    // Обрабатываем событие клика по блоку (grid-item)
    if (event.target.classList.contains('grid-item')) {
        // Получаем текущий blockNumber
        currentBlockNumber = event.target.dataset.number;

        // console.log(currentBlockNumber);

        // Находим элемент с id "over-over-block-title"
        var block_over_over_block_title = document.getElementById("over-over-block-title");

        // Вызываем функцию для выделения блока
        highlightBlock(currentBlockNumber);

        // Получаем ссылку на текущую страницу
        var currentPageUrl = getСurrentPageUrl();

        // console.log(currentPageUrl)

        // Проверяем, существует ли элемент с таким id
        if (block_over_over_block_title) {
            // Устанавливаем значение свойства justify-content в space-around
            block_over_over_block_title.style.justifyContent = "space-around";

            // Находим элемент с id "synchronization-info-of-block"
            var synchronizationInfoBlock = document.getElementById("synchronization-info-of-block");

            // Если блок уже существует и в нем есть содержимое, удаляем его
            if (synchronizationInfoBlock && synchronizationInfoBlock.childNodes.length > 0) {
                synchronizationInfoBlock.innerHTML = '';
            } else {
                // Если блок еще не существует или пустой, создаем новый элемент div
                synchronizationInfoBlock = document.createElement("div");

                // Задаем id для нового элемента
                synchronizationInfoBlock.id = "synchronization-info-of-block";

                // Добавляем новый элемент внутрь блока с id "over-over-block-title"
                block_over_over_block_title.appendChild(synchronizationInfoBlock);
            }

            // Создаем кнопку синхронизации
            var button_synchronization = document.createElement("button");

            // Устанавливаем id для кнопки
            button_synchronization.id = "button-synchronization-info-of-block";

            // Добавляем атрибуты и стили для кнопки
            button_synchronization.innerHTML = '<img src="/static/images/synchronization.ico" style="height: 50px;" />';
            button_synchronization.setAttribute("title", "Синхронизировать данные");

            // Добавляем атрибут title для отображения текста при наведении
            button_synchronization.setAttribute("title", "Синхронизировать данные");

            // Назначаем функцию submitLineNumber на событие клика на кнопку синхронизации
            button_synchronization.onclick = function () {
                // Отправляем данные о блоке и ссылку на текущую страницу на сервер
                submitLineNumber(currentBlockNumber, currentPageUrl);

                // var blockId = event.target.id.substring(5);
                blockId = event.target.id.substring(5);
                updateBlockInfo(blockId);
            };

            // Добавляем кнопку внутрь блока "synchronization-info-of-block"
            synchronizationInfoBlock.appendChild(button_synchronization);
        }

        // Отправляем данные о блоке и ссылку на текущую страницу на сервер
        submitLineNumber(currentBlockNumber, currentPageUrl);

        // var blockId = event.target.id.substring(5);
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
    // console.log("data.quantity = " + "!" + dataquantity + "!" + " (Если между восклицательными знаками ничего нет, то значит значение data.quantity)")

    // Проверяем, есть ли данные
    if (!data) {
        console.error('Данные для блока не найдены.');
        return;
    }

    // Обновляем отображение информации о блоке
    var blockInfoHTML = generateBlockInfoHTML(data);
    var infoOfBlock = document.getElementById('info-of-block');
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
    var materialInfo = data.material ? data.material : `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var tipeInfo = data.tipe ? data.tipe : `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var standardInfo = data.standard ? data.standard : `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var diameterInfo = data.diameter ? data.diameter : `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var lengthInfo = data.length ? data.length : `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var quantityInfo = data.quantity ? data.quantity : `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var magazinInfo = data.magazin ? data.magazin : `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;

    var siteLink = data.site ? `<a href="${data.site}" target="_blank" style="font-weight: bolder;" class="data-about-the-block-opisanie ssylka2">Сайт</a>` :
        `<span class="data-about-the-block-opisanie" id="not_found_error">Данных о
        <span class="data-about-the-block-opisanie" style="font-style: italic; text-decoration: underline;">сайте</span>
    не найдено</span>`;

    return `
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-opisanie">Материал:</a> &nbsp; ${materialInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-opisanie">Тип:</a> &nbsp; ${tipeInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-opisanie">Стандарт:</a> &nbsp; ${standardInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-opisanie">Диаметр, мм:</a> &nbsp; ${diameterInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-opisanie">Длина, мм:</a> &nbsp; ${lengthInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-opisanie">Количество, шт:</a> &nbsp; ${quantityInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-opisanie">Магазин:</a> &nbsp; ${magazinInfo}</p>
        <p class="data-about-the-block">${siteLink}</p>
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
    var blockId = getCurrentBlockId();
    var blockType1 = window.location.href.includes('stellazh1') ? 'Контейнер' : 'Ячейка';
    var blockType2 = window.location.href.includes('stellazh1') ? 'контейнера' : 'ячейки';

    var blockInfo = {
        title: `${blockType1} ${blockId}`,
        content: `Информация о содержимом ${blockType2} ${blockId}:`,
    };

    // Обновляем отображение информации о блоке
    var blockTitle = document.getElementById('block-title');
    var blockContent = document.getElementById('block-content');
    if (blockTitle && blockContent) {
        blockTitle.innerText = blockInfo.title;
        blockContent.innerText = blockInfo.content;
    } else {
        console.error('Элемент с id "block-title" или "block-content" не найден.');
    }

    var buttonsContainer = document.getElementById('rabota-s-kolichestvom');
    if (!buttonsContainer) {
        console.error('Элемент с id "rabota-s-kolichestvom" не найден.');
        return;
    }

    // Вызываем функции для создания кнопок и полей ввода
    createButtons_Vzyat_Polozhit();
}

// Функция для создания кнопок "Взять" и "Положить" динамически
function createButtons_Vzyat_Polozhit() {
    var buttonsContainer = document.getElementById('rabota-s-kolichestvom');

    // Удаляем все предыдущие кнопки и элементы внутри контейнера
    buttonsContainer.innerHTML = '';

    // Создаем и добавляем кнопки "Взять" и "Положить" в контейнер,
    // также удаляем существующие кнопки и элементы перед созданием новых.
    var existingButtons = document.querySelectorAll('.dynamic-button');
    existingButtons.forEach(button => {
        buttonsContainer.removeChild(button);
    });

    // Создаем кнопку "Взять"
    var btnTake = document.createElement('button');
    btnTake.className = 'dynamic-button';
    btnTake.innerText = 'Взять';
    btnTake.onclick = () => {
        createDynamicElements();
        showQuantityInput('Взять');
    };
    buttonsContainer.appendChild(btnTake);

    // Создаем кнопку "Положить"
    var btnPut = document.createElement('button');
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
    var quantityInputContainer = document.getElementById('quantity-input-container');

    if (!quantityInputContainer) {
        console.error('Элемент с id "quantity-input-container" не найден.');
        return;
    }

    var btnConfirm = document.getElementById('btn-confirm');
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
    var buttonsContainer = document.getElementById('rabota-s-kolichestvom');

    // Создаем и добавляем поле ввода и кнопку "Готово",

    // также удаляем существующие кнопки и элементы перед созданием новых.
    var quantityInputContainer = document.getElementById('quantity-input-container');
    if (quantityInputContainer) {
        quantityInputContainer.parentNode.removeChild(quantityInputContainer);
    }


    // Создаем контейнер для поля ввода и кнопки "Готово"
    var newQuantityInputContainer = document.createElement('div');
    newQuantityInputContainer.id = 'quantity-input-container';

    // Создаем поле ввода
    var quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.id = 'quantity-input';

    // Создаем кнопку "Готово"
    var btnConfirm = document.createElement('button');
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

    // Получаем текущий blockNumber
    var blockNumber = currentBlockNumber;
    // console.log(blockNumber)

    // Получаем ссылку на текущую страницу
    var currentPageUrl = getСurrentPageUrl();

    // Проверка существования элементов
    var btnConfirm = document.getElementById('btn-confirm');
    if (!btnConfirm) {
        console.error('Элемент с id "btn-confirm" не найден.');
        return;
    }
    var quantityInput = document.getElementById('quantity-input');
    if (!quantityInput) {
        console.error('Элемент с id "quantity-input" не найден.');
        return;
    }

    var action = btnConfirm.dataset.action || '';
    var blockId = getCurrentBlockId();

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



    // console.log(`(${dataquantity}) (${quantity})`)



    // Проверяем корректность значения quantity
    let quantity = parseFloat(quantityInput.value);
    // Проверяем, есть ли данные с сервера о количестве
    if (dataquantity === '') {
        alert('Данных о количестве не найдено, следовательно Вы не можете его изменить');
        return;
    }
    // Проверяем корректность значения quantity
    // Проверяем, что введено натуральное число
    else if (isNaN(quantity) || quantity !== Math.floor(quantity) || quantity <= 0) {
        alert('Пожалуйста, введите натуральное число.');
        return;
    }

    // Выполняем действие в зависимости от выбранного "Взять" или "Положить"
    else if (action === 'Взять') {
        // Проверяем, данные с сервера о количестве меньше чем то сколько мы хотим взять
        if (quantity > dataquantity) {
            alert('Нельзя взять больше, чем есть в наличии.');
            return;
        }
        else {
            quantity = (-1) * quantity;
        }
    }
    else if (action === 'Положить') {
        quantity = quantity;
    }



    // Отправляем данные о блоке и ссылку на текущую страницу на сервер
    submitcheck(blockNumber, currentPageUrl, quantity);

    // Скрываем поле ввода
    var quantityInputContainer = document.getElementById('quantity-input-container');
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
    var interval = setInterval(() => {
        if ((opacity -= 0.1) < 0) {
            clearInterval(interval);
            element.style.display = 'none';
        } else {
            element.style.opacity = opacity;
        }
    }, 250);
}