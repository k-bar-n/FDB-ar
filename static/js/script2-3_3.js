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

    // Получаем данные из базы данных CSV
    const data = getDataFromCSV(blockId);

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
    // Здесь вам нужно реализовать логику получения текущего ID блока
    // Возможно, вы сохраняете текущий выбранный блок где-то в переменной или в состоянии
    // В данном случае я предполагаю, что у вас есть глобальная переменная currentBlockId
    // Если у вас есть другой способ отслеживания текущего блока, замените этот код соответственно
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
