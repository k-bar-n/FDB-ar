// Обработка нажатия на кнопку "Сбросить параметры"
document.getElementById("reset-filters").addEventListener("click", function () {
    document.getElementById("material").value = "";
    document.getElementById("tipe").value = "";
    document.getElementById("standard").value = "";
    document.getElementById("diameter").value = "";
    document.getElementById("length").value = "";
});

// Обработка нажатия на кнопку "Очистить вывод фильтра"
document.getElementById("clear-output").addEventListener("click", function () {
    var tableBody = document.querySelector('.table-founder tbody');
    tableBody.innerHTML = ""; // Очистка содержимого тела таблицы
});


// Обработка нажатия на кнопку "Найти"
document.getElementById("apply-filter").addEventListener("click", function () {
    // Собираем данные из формы
    var material = document.getElementById("material").value;
    var tipe = document.getElementById("tipe").value;
    var standard = document.getElementById("standard").value;
    var diameter = document.getElementById("diameter").value;
    var length = document.getElementById("length").value;

    // Вызываем функцию displayData
    displayData(material, tipe, standard, diameter, length);
});

// Определяем функцию для вывода данных
async function displayData(material, tipe, standard, diameter, length) {
    // Создаем массив промисов для всех вызовов filter
    const promises = [];
    let foundData = false; // Флаг для отслеживания найденных данных
    for (let i = 1; i < 218; i++) {
        promises.push(filter(i, material, tipe, standard, diameter, length));
    }

    // Ждем завершения всех промисов и сохраняем результаты в массиве
    const results = await Promise.all(promises);

    // Обрабатываем результаты в правильном порядке
    results.forEach((data, i) => {
        if (data.booler !== 0) {
            foundData = true; // Устанавливаем флаг в true, если найдены данные
            upgrade_BlockInfo(data, i + 1);
        }
    });

    // Создаем строку для вывода
    var outputRow = document.createElement('tr');
    var outputText = foundData ? '<td colspan="8" style="color: green; font-weight: bold;">Вывод данных окончен</td>' : '<td colspan="8"><span id="not_found_error">Данных не найдено</span></td>';
    outputRow.innerHTML = `${outputText}`;

    // Получаем ссылку на таблицу
    var tableBody = document.querySelector('.table-founder tbody');

    // Добавляем строку в тело таблицы
    tableBody.appendChild(outputRow);
}

function filter(i_i, material, tipe, standard, diameter, length) {
    // Возвращаем промис, который резолвится после получения и обработки данных
    return new Promise((resolve, reject) => {
        fetch('/founder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ line_number: i_i, material: material, tipe: tipe, standard: standard, diameter: diameter, length: length })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных с сервера');
                }
                return response.json();
            })
            .then((data) => {
                // Всегда резолвим промис
                resolve(data);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                // Реджектим промис с ошибкой
                reject(error);
            });
    });
}

// Функция для обновления информации о блоке
function upgrade_BlockInfo(data, i_i) {
    // Проверяем, равно ли значение data.booler 0
    if (data.booler !== 0) {
        // Получаем ссылку на таблицу
        var tableBody = document.querySelector('.table-founder tbody');

        // Создаем новую строку для вставки данных
        var newRow = document.createElement('tr');

        // Вставляем данные в ячейки строки
        var notFoundError = '<span id="not_found_error">Данных не найдено</span>';
        var notFoundError_polka_nomer = '<span> </span>';

        let i_k;

        if (i_i >= 1 && i_i <= 90) {
            i_k = "Контейнер "
        }
        else {
            i_k = "Ячейка "
        }

        console.log(i_i);

        /* <td>${i_i} ${data.material ? data.material : notFoundError}</td> */

        newRow.innerHTML = `
            <td>${data.material ? data.material : notFoundError}</td>
            <td>${data.tipe ? data.tipe : notFoundError}</td>
            <td>${data.standard ? data.standard : notFoundError}</td>
            <td>${data.diameter ? data.diameter : notFoundError}</td>
            <td>${data.length ? data.length : notFoundError}</td>
            <td>${data.quantity ? data.quantity : notFoundError}</td>
            <td>
            ${data.stelazh_nomer ? 'Стеллаж ' + data.stelazh_nomer : notFoundError}
            ${data.polka_nomer ? '<br>Полка ' + data.polka_nomer : notFoundError_polka_nomer}
            ${data.stroka_nomer ? '<br>' + i_k + data.stroka_nomer : notFoundError}${data.stolbets_nomer ? data.stolbets_nomer : notFoundError}
            </td>
            <td>
                ${data.magazin ? `<a href="${data.site}" target="_blank">${data.magazin}</a>` : notFoundError}
            </td>
        `;

        // Добавляем новую строку в тело таблицы
        tableBody.appendChild(newRow);
    }
}








/*
function displayData(material, tipe, standard, diameter, length) {
    // Выполняем 217 раз (сколько записей в базе)
    for (let i = 1; i < 218; i++) {
        // console.log("Это вывод данных " + i);
        filter(i, material, tipe, standard, diameter, length);
    }
}

function filter(i_i, material, tipe, standard, diameter, length) {
    // console.log("Проверка");

    // Отправляем данные на сервер
    fetch('/founder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ line_number: i_i, material: material, tipe: tipe, standard: standard, diameter: diameter, length: length })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при получении данных с сервера');
            }
            return response.json();
        })
        .then((data) => {
            // Обновляем содержимое страницы с полученными данными
            upgrade_BlockInfo(data, i_i);
            return data;
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}
*/





/*
async function displayData(material, tipe, standard, diameter, length) {
    // Создаем массив промисов для всех вызовов filter
    const promises = [];
    for (let i = 1; i < 218; i++) {
        promises.push(filter(i, material, tipe, standard, diameter, length));
    }
    
    // Ждем завершения всех промисов и сохраняем результаты в массиве
    const results = await Promise.all(promises);

    // Обрабатываем результаты в правильном порядке
    results.forEach((data, i) => {
        upgrade_BlockInfo(data, i + 1);
    });
}

function filter(i_i, material, tipe, standard, diameter, length) {
    // Возвращаем промис, который резолвится после получения и обработки данных
    return new Promise((resolve, reject) => {
        fetch('/founder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ line_number: i_i, material: material, tipe: tipe, standard: standard, diameter: diameter, length: length })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при получении данных с сервера');
            }
            return response.json();
        })
        .then((data) => {
            // Резолвим промис с данными
            resolve(data);
        })
        .catch((error) => {
            console.error('Ошибка:', error);
            // Реджектим промис с ошибкой
            reject(error);
        });
    });
}
*/
