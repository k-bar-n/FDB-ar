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

function generateBlockInfoHTML(data) {
    return `
        <p class="data-about-the-block"><a style="font-weight: bolder;">Материал:</a> &nbsp; ${data.material}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;">Тип:</a> &nbsp; ${data.tipe}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;">Стандарт:</a> &nbsp; ${data.standard}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;">Диаметр, мм:</a> &nbsp; ${data.diameter}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;">Длина, мм:</a> &nbsp; ${data.length}</p>
        <p class="data-about-the-block"><a style="font-weight: bolder;">Количество, шт:</a> &nbsp; ${data.quantity}</p>
`
}