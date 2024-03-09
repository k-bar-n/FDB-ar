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
    const materialInfo = data.material ? data.material : `<span style="font-weight: bold; color: red;">Данных о материале не найдено</span>`;
    const tipeInfo = data.tipe ? data.tipe : `<span style="font-weight: bold; color: red;">Данных о типе не найдено</span>`;
    const standardInfo = data.standard ? data.standard : `<span style="font-weight: bold; color: red;">Данных о стандарте не найдено</span>`;
    const diameterInfo = data.diameter ? data.diameter : `<span style="font-weight: bold; color: red;">Данных о диаметре, мм не найдено</span>`;
    const lengthInfo = data.length ? data.length : `<span style="font-weight: bold; color: red;">Данных о длине, мм не найдено</span>`;
    const quantityInfo = data.quantity ? data.quantity : `<span style="font-weight: bold; color: red;">Данных о количестве, шт не найдено</span>`;
    const magazinInfo = data.magazin ? data.magazin : `<span style="font-weight: bold; color: red;">Данных о магазине не найдено</span>`;
    const siteLink = data.site ? `<a href="${data.site}" target="_blank" style="font-weight: bolder; display: flex; justify-content: center;" class="data-about-the-block-op ssylka2">Сайт</a>` : `<span style="font-weight: bold; color: red;">Данных о сайте не найдено</span>`;
    
    return `
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Материал:</a> &nbsp; ${materialInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Тип:</a> &nbsp; ${tipeInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Стандарт:</a> &nbsp; ${standardInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Диаметр, мм:</a> &nbsp; ${diameterInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Длина, мм:</a> &nbsp; ${lengthInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Количество, шт:</a> &nbsp; ${quantityInfo}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;" class="data-about-the-block-op">Магазин:</a> &nbsp; ${magazinInfo}</p>
        <p class="data-about-the-block">${siteLink}</p>
    `;
}