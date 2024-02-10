// Получаем элементы
// const resizer = document.getElementById('resizer');
const leftBlock = document.getElementById('left-block');
const rightBlock = document.getElementById('right-block');

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