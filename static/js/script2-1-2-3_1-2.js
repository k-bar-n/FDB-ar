// Функция для генерации сетки с номерами блоков
function generateGrid(columns, rows) {
    var gridContainer = document.getElementById('grid-container');

    // Генерация цифровой метки слева
    var lettersRow = document.createElement('div');
    lettersRow.className = 'grid-row';
    lettersRow.style.width = "20px";
    gridContainer.appendChild(lettersRow);

    for (let i = 0; i <= rows; i++) {
        var letterItem = document.createElement('div');

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
        var rowContainer = document.createElement('div');
        rowContainer.className = 'grid-row';
        gridContainer.appendChild(rowContainer);

        // Генерация буквенной метки сверху
        var numberItem = document.createElement('div');
        numberItem.className = 'grid-item-2-2';
        // numberItem.textContent = String.fromCharCode(410 + i);
        numberItem.textContent = String.fromCharCode(1039 + i);
        rowContainer.appendChild(numberItem);

        for (let j = 1; j <= rows; j++) {
            var gridItem = document.createElement('button');
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

            var blockId = String.fromCharCode(1039 + i) + j;
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


            /*
            // Создаем элемент span
            var spanElement = document.createElement('span');
            // Устанавливаем текст внутри span
            spanElement.textContent = blockId;
            // Очищаем содержимое gridItem
            gridItem.innerHTML = '';
            // Добавляем span внутрь gridItem
            gridItem.appendChild(spanElement);
            */


            /*

            // !!! !!! !!!

            gridItem.onclick = (event) => {
                const blockNumber = event.target.dataset.number;
                displayBlockInfo(blockNumber);
            };
            */

            rowContainer.appendChild(gridItem);
        }
    }

    // Выводим идентификаторы блоков на консоль
    // const allBlockIds = document.querySelectorAll('.grid-item');
    // console.log('Идентификаторы всех блоков:', allBlockIds);
}