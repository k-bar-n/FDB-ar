// Получаем элементы
// const resizer = document.getElementById('resizer');
const leftBlock = document.getElementById('left-block');
const rightBlock = document.getElementById('right-block');

// Функция для генерации сетки с номерами блоков
function generateGrid(columns, rows) {
    const gridContainer = document.getElementById('grid-container');

    // Генерация цифровой метки слева
    const lettersRow = document.createElement('div');
    lettersRow.className = 'grid-row';
    lettersRow.style.width = "20px";
    gridContainer.appendChild(lettersRow);

    for (let i = 0; i <= rows; i++) {
        const letterItem = document.createElement('div');

        if (window.location.href.includes('stellazh1')) {
            letterItem.className = 'grid-item-2-1';
        }
        else {
            letterItem.className = 'grid-item-2-1-60';
        }

        if (i == 0) {
            letterItem.className = 'grid-item-2-0';
        }
        else if (i > 0) {
            letterItem.textContent = i;
        }
        lettersRow.appendChild(letterItem);
    }

    for (let i = 1; i <= columns; i++) {
        const rowContainer = document.createElement('div');
        rowContainer.className = 'grid-row';
        gridContainer.appendChild(rowContainer);

        // Генерация буквенной метки сверху
        const numberItem = document.createElement('div');
        numberItem.className = 'grid-item-2-2';
        // numberItem.textContent = String.fromCharCode(410 + i);
        numberItem.textContent = String.fromCharCode(1039 + i);
        rowContainer.appendChild(numberItem);

        for (let j = 1; j <= rows; j++) {
            const gridItem = document.createElement('button');
            gridItem.className = 'grid-item';

            let blockNumber = 0;

            if (window.location.href.includes('stellazh1') || window.location.href.includes('stellazh3')) {
                blockNumber = (j - 1) * (rows - 1) + i;
            }
            else {
                blockNumber = (j - 1) * (columns) + i;
            }

            // const blockId = String.fromCharCode(410 + i) + j;

            // если вы хотите посмотреть в блоке его blockNumber а не blockId, раскомментируйте вторую из последующих строк
            // если наоброт, то наоборот

            const blockId = String.fromCharCode(1039 + i) + j;
            // const blockId = blockNumber;
            // const blockId = (String.fromCharCode(1039 + i) + j) + " " + blockNumber;


            gridItem.id = `block${blockId}`;

            gridItem.dataset.number = blockNumber;

            if (window.location.href.includes('stellazh1')) {
                gridItem.style.height = "30px";
            }
            else {
                gridItem.style.height = "60px";
            }

            gridItem.textContent = blockId;
            gridItem.onclick = (event) => {
                const blockNumber = event.target.dataset.number;
                displayBlockInfo(blockNumber);
            };
            rowContainer.appendChild(gridItem);
        }
    }
    // Выводим идентификаторы блоков на консоль
    const allBlockIds = document.querySelectorAll('.grid-item');
    console.log('Идентификаторы всех блоков:', allBlockIds);
}

// Функция для обновления информации о блоке на странице
function updateBlockInfo(data) {
    // Проверяем, есть ли данные
    if (!data) {
        console.error('Данные для блока не найдены.');
        return;
    }

    // Устанавливаем заголовок и содержимое блока в зависимости от типа
    const blockId = getCurrentBlockId();
    const blockType = window.location.href.includes('stellazh1') ? 'Контейнер' : 'Ячейка';

    const blockInfo = {
        title: `${blockType} ${blockId}`,
        content: `Информация о содержимом ${blockType.toLowerCase()} ${blockId}:`,
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

// Функция для изменения background-color у выбранного блока
function highlightBlock(blockNumber) {
    console.log('Вызвана функция highlightBlock с blockNumber:', blockNumber);

    // Сначала снимаем выделение со всех блоков
    const allBlocks = document.querySelectorAll('.grid-item');
    allBlocks.forEach(block => {
        block.style.backgroundColor = ''; // Убираем background-color
    });

    // Затем находим выбранный блок по атрибуту data-number
    const selectedBlock = document.querySelector(`.grid-item[data-number="${blockNumber}"]`);
    if (selectedBlock) {
        selectedBlock.style.backgroundColor = 'orange'; // Задаем цвет подсветки
    } else {
        console.error('Выбранный блок не найден.');
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



// Функция для изменения ширины блоков
// function initResizer() {
//     let isResizing = false;

//     resizer.addEventListener('mousedown', (event) => {
//         isResizing = true;
//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', () => {
//             isResizing = false;
//             document.removeEventListener('mousemove', handleMouseMove);
//         });
//     });

//     function handleMouseMove(event) {
//         if (isResizing) {
//             const containerRect = leftBlock.parentElement.getBoundingClientRect();
//             const leftBlockWidth = event.clientX - containerRect.left;
//             const containerWidth = containerRect.width;

//             const leftBlockPercentage = (leftBlockWidth / containerWidth) * 100;
//             leftBlock.style.flex = `0 0 ${leftBlockPercentage}%`;
//         }
//     }
// }


// Функция для изменения ширины блоков
// function initResizer() {
//     let isResizing = false;

//     resizer.addEventListener('mousedown', handleMouseDown);
//     resizer.addEventListener('touchstart', handleTouchStart);

//     function handleMouseDown(event) {
//         isResizing = true;
//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', handleMouseUp);
//     }

//     function handleTouchStart(event) {
//         isResizing = true;
//         document.addEventListener('touchmove', handleTouchMove);
//         document.addEventListener('touchend', handleTouchEnd);
//     }

//     function handleMouseMove(event) {
//         if (isResizing) {
//             updateLeftBlockWidth(event.clientX);
//         }
//     }

//     function handleTouchMove(event) {
//         if (isResizing) {
//             updateLeftBlockWidth(event.touches[0].clientX);
//         }
//     }

//     function handleMouseUp() {
//         isResizing = false;
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//     }

//     function handleTouchEnd() {
//         isResizing = false;
//         document.removeEventListener('touchmove', handleTouchMove);
//         document.removeEventListener('touchend', handleTouchEnd);
//     }

//     function updateLeftBlockWidth(clientX) {
//         const containerRect = leftBlock.parentElement.getBoundingClientRect();
//         const leftBlockWidth = clientX - containerRect.left;
//         const containerWidth = containerRect.width;

//         const leftBlockPercentage = (leftBlockWidth / containerWidth) * 100;
//         leftBlock.style.flex = `0 0 ${leftBlockPercentage}%`;
//     }
// }
