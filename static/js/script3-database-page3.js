function submitAnswers_page3() {
    var line_number = document.getElementById('line_number').value

    // Проверка на заполнение поля формы
    if (line_number === '') {
        alert('Заполните поле формы')
        return
    }

    // Отправить данные на сервер
    fetch('/receiving_data_from_server', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ line_number })
    })
        .then((response) => response.json())
        .then((data) => {
            // Обновить содержимое блока <h3> с данными из сервера
            document.getElementById('csv_data_row').innerText = data.data_csv_row

            // Вывести информацию в блок info-of-block
            document.getElementById('info-of-block').innerHTML = generateBlockInfoHTML(data)

            // Сбросить значения полей формы
            document.getElementById('line_number').value = ''
        })
        .catch((error) => {
            console.error('Ошибка:', error)
            alert('Произошла ошибка при обращении к серверу')
        })
}

// Генерирует HTML-разметку для информации о блоке на основе переданных данных.
function generateBlockInfoHTML(data) {
    var materialInfo = data.material ? data.material :  `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var tipeInfo = data.tipe ? data.tipe :              `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var standardInfo = data.standard ? data.standard :  `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var diameterInfo = data.diameter ? data.diameter :  `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var lengthInfo = data.length ? data.length :        `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var quantityInfo = data.quantity ? data.quantity :  `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    var magazinInfo = data.magazin ? data.magazin :     `<span class="data-about-the-block-opisanie" id="not_found_error">Данных не найдено</span>`;
    
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