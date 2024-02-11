// Добавляем обработчики событий для блоков с классом "grid-item" или "grid-item-1"
// const gridItems = document.querySelectorAll('.grid-item, .grid-item-1');

/*
const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach((gridItem) => {
    gridItem.addEventListener('click', () => {
        const blockNumber = gridItem.innerText; // предполагаем, что текст блока содержит его id
        displayBlockInfo(blockNumber);

        // Вызываем функцию для изменения background-color
        // highlightBlock(blockNumber);
    });
});
*/

/*
// Функция для изменения background-color у выбранного блока
function highlightBlock(blockId) {
    console.log('Вызвана функция highlightBlock с blockNumber:', blockNumber);
    
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
*/

// (код закоментированный второй кусок кода закоментирован в фале script2-1-2-3_1-2.js второй кусок)