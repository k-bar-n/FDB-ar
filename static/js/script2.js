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
            // const blockId = String.fromCharCode(410 + i) + j;
            const blockId = String.fromCharCode(1039 + i) + j;
            gridItem.id = `block${blockId}`;

            if (window.location.href.includes('stellazh1')) {
                gridItem.style.height = "30px";
            }
            else {
                gridItem.style.height = "60px";
            }

            gridItem.textContent = blockId;
            gridItem.onclick = () => displayBlockInfo(blockId);
            rowContainer.appendChild(gridItem);
        }
    }
}

function displayBlockInfo(blockId) {
    const blockTitle = document.getElementById('block-title');
    const blockContent = document.getElementById('block-content');
    const infoBlock = document.getElementById('info-of-block');

    // Получаем данные из базы данных CSV
    const data = getDataFromCSV(blockId);

    // Выводим информацию в блок info-of-block
    infoBlock.innerHTML = generateBlockInfoHTML(data);
    
    let blockInfo; // объявление переменной до условия if-else

    if (window.location.href.includes('stellazh1')) {
        blockInfo = {
            title: `Контейнер ${blockId}`,
            content: `Информация о содержимом контейнера ${blockId}:`,
        };
    }
    else {
        blockInfo = {
            title: `Ячейка ${blockId}`,
            content: `Информация о содержимом ячейки ${blockId}:`,
        };
    }
    
    // Теперь переменная blockInfo доступна за пределами блока if-else
    // console.log(blockInfo);
    

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
