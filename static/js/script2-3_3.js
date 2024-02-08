// Получаем элементы
// const resizer = document.getElementById('resizer');
const leftBlock = document.getElementById('left-block');
const rightBlock = document.getElementById('right-block');

// Добавляем обработчики событий для блоков с классом "grid-item" или "grid-item-1"
// const gridItems = document.querySelectorAll('.grid-item, .grid-item-1');
const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach((gridItem) => {
    gridItem.addEventListener('click', () => {
        const blockId = gridItem.innerText; // предполагаем, что текст блока содержит его id
        displayBlockInfo(blockId);

        // Вызываем функцию для изменения background-color
        highlightBlock(gridItem);
    });
});

function displayBlockInfo(blockId) {
    const blockTitle = document.getElementById('block-title');
    const blockContent = document.getElementById('block-content');
    const infoBlock = document.getElementById('info-of-block');

    // Выводим информацию в блок info-of-block
    infoBlock.innerHTML = generateBlockInfoHTML(data);

    const blockInfo = {
        title: `Ячейка ${blockId}`,
        content: `Информация о содержимом ячейки ${blockId}:`,
    };

    blockTitle.innerText = blockInfo.title;
    blockContent.innerText = blockInfo.content;

    // Вызываем функцию для выделения блока
    highlightBlock(blockId);
}

// Функция для изменения background-color у выбранного блока
function highlightBlock(blockId) {
    // Сначала снимаем выделение со всех блоков
    const allBlocks = document.querySelectorAll('.grid-item');
    allBlocks.forEach(block => {
        block.style.backgroundColor = ''; // Убираем background-color
    });

    // Затем выделяем выбранный блок
    const selectedBlock = document.getElementById(`block${blockId}`);
    if (selectedBlock) {
        selectedBlock.style.backgroundColor = 'orange'; // Например, задаем цвет подсветки
    }
}


// Глобальная переменная для отслеживания текущего ID блока
let blockId = null;

// Функция для получения текущего ID блока
function getCurrentBlockId() {
    return blockId;
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('grid-item')) {
        blockId = event.target.id.substring(5);
        updateBlockInfo(blockId);
        createButtons();
        createDynamicElements();
    }
});

// Функция для обновления информации о блоке на странице
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

    // Вызываем функции для создания кнопок и полей ввода
    createButtons();
    createDynamicElements();
}

// (код закоментированный второй кусок кода закоментирован в фале script2.js второй кусок)