# Импорт необходимых модулей
from flask import Flask, render_template, request, jsonify

import csv
import os

from apscheduler.schedulers.background import BackgroundScheduler


# Инициализация Flask приложения
app = Flask(__name__)


# Инициализация фонового планировщика
scheduler = BackgroundScheduler()


# Обработчик ошибки 404
@app.errorhandler(404)
def index_page_not_found(error):
    return render_template('not_found.html'), 404


# Обработчики маршрутов для различных страниц
@app.route("/")
def index_main_page():
    return render_template("main_page.html")


@app.route("/base")
def index_base():
    return render_template("base.html")


@app.route("/founder")
def index_founder():
    return render_template("Founder/founder.html")


@app.route("/page3")
def index_page3():
    return render_template("Page3/page3.html")


@app.route("/map")
def index_map():
    return render_template("Map/map.html")


# Стеллаж 1
@app.route("/map/stellazh1")
def index_map_stellazh1():
    return render_template("Map/St1/Mp_st1.html")


# Стеллаж 2
@app.route("/map/stellazh2")
def index_map_stellazh2():
    return render_template("Map/St2/Mp_st2.html")


@app.route("/map/stellazh2/shelf1")
def index_map_stellazh2_shelf1():
    return render_template("Map/St2/Mp_st2_1.html")


@app.route("/map/stellazh2/shelf2")
def index_map_stellazh2_shelf2():
    return render_template("Map/St2/Mp_st2_2.html")


@app.route("/map/stellazh2/shelf3")
def index_map_stellazh2_shelf3():
    return render_template("Map/St2/Mp_st2_3.html")


@app.route("/map/stellazh2/shelf4")
def index_map_stellazh2_shelf4():
    return render_template("Map/St2/Mp_st2_4.html")


@app.route("/map/stellazh2/shelf5")
def index_map_stellazh2_shelf5():
    return render_template("Map/St2/Mp_st2_5.html")


@app.route("/map/stellazh2/shelf6")
def index_map_stellazh2_shelf6():
    return render_template("Map/St2/Mp_st2_6.html")


@app.route("/map/stellazh2/shelf7")
def index_map_stellazh2_shelf7():
    return render_template("Map/St2/Mp_st2_7.html")


# Стеллаж 3
@app.route("/map/stellazh3")
def index_map_stellazh3():
    return render_template("Map/St3/Mp_st3.html")


@app.route("/map/stellazh3/shelf1")
def index_map_stellazh3_shelf1():
    return render_template("Map/St3/Mp_st3_1.html")


@app.route("/map/stellazh3/shelf2")
def index_map_stellazh3_shelf2():
    return render_template("Map/St3/Mp_st3_2.html")


@app.route("/map/stellazh3/shelf3")
def index_map_stellazh3_shelf3():
    return render_template("Map/St3/Mp_st3_3.html")


# Функция для чтения CSV файла
def read_csv(file_name, row_number_to_extract):
    # Получаем директорию скрипта
    script_dir = os.path.dirname(__file__)
    # Формируем путь к CSV файлу
    file_path = os.path.join(script_dir, 'static/data', file_name)
    csv_data = None

    try:
        # Открываем файл CSV
        with open(file_path, 'r', newline='', encoding='utf-8-sig') as file:
            # Создаем объект для чтения CSV
            csv_reader = csv.reader(file, delimiter=';')
            # Пропускаем строки до нужной
            for _ in range(row_number_to_extract):
                next(csv_reader)
            # Читаем нужную строку
            csv_data = next(csv_reader)
    except FileNotFoundError:
        # Обрабатываем ошибку, если файл не найден
        print(f"Файл '{file_name}' не найден.")
    except Exception as e:
        # Обрабатываем другие ошибки при чтении файла CSV
        print(f"Произошла ошибка при чтении файла CSV: {str(e)}")

    return csv_data


# Функция для запуска чтения CSV файла
def zapusk_read_csv(row_number_to_extract):
    csv_file_name = 'Крепёж.csv'
    data_csv_base = None

    try:
        # Читаем CSV файл
        data_csv_base = read_csv(csv_file_name, row_number_to_extract)
    except Exception as e:
        # Обрабатываем ошибки чтения CSV файла
        print(f"Произошла ошибка при чтении файла CSV: {str(e)}")

    return data_csv_base


# Функция для обработки ссылки на страницу
def process_page_url(page_url, block_number):
    if page_url == "map/stellazh2/shelf1":
        block_number = (int(block_number) + 90)
    elif page_url == "map/stellazh2/shelf2":
        block_number = (int(block_number) + 100)
    elif page_url == "map/stellazh2/shelf3":
        block_number = (int(block_number) + 110)
    elif page_url == "map/stellazh2/shelf4":
        block_number = (int(block_number) + 120)
    elif page_url == "map/stellazh2/shelf5":
        block_number = (int(block_number) + 130)
    elif page_url == "map/stellazh2/shelf6":
        block_number = (int(block_number) + 140)
    elif page_url == "map/stellazh2/shelf7":
        block_number = (int(block_number) + 150)
    elif page_url == "map/stellazh3/shelf1":
        block_number = (int(block_number) + 160)
    elif page_url == "map/stellazh3/shelf2":
        block_number = (int(block_number) + 180)
    elif page_url == "map/stellazh3/shelf3":
        block_number = (int(block_number) + 200)
    print("Inside condition block_number:", block_number)
    return block_number


@app.route('/check', methods=['POST'])
def check():
    try:
        # Получаем данные из запроса
        data = request.get_json()
        # Получаем номер блока
        # Обновляем ключ с 'dataNumber' на 'line_number'
        block_number = data.get('line_number')
        # Получаем ссылку на текущую страницу
        page_url = data.get('page_url')
        # Получаем номер строки
        line_number = data.get('line_number')

        # Логируем полученные данные для отладки
        # print(f"Received data: {data}")

        if page_url is not None:
            # Удаляем протокол и домен из URL
            def remove_protocol_and_domain(url):
                parts = url.split("//")
                remaining_url = parts[-1]
                path_parts = remaining_url.split('/', 1)
                if len(path_parts) > 1:
                    return path_parts[1]  # Возвращаем только путь после домена
                else:
                    return ''  # Если путь отсутствует, возвращаем пустую строку

            page_url = remove_protocol_and_domain(page_url)
            print(f"Processed (Обрабатываемый) page_url: {page_url}")
            print()

            # Вызываем функцию для обработки ссылки на страницу и обновляем значение block_number
            block_number = process_page_url(page_url, block_number)

            # После обработки URL, устанавливаем значение line_number в None, чтобы избежать его использования
            line_number = None

        # Проверяем, есть ли номер блока или номер строки
        if block_number is None and line_number is None:
            return jsonify({'error': ('Neither the block number nor the line number is specified' + ' — '
                                      'Ни номер блока, ни номер строки не указан')})

        material, tipe, standard, diameter, length, quantity = "", "", "", "", "", ""

        # Выполняем чтение CSV только один раз, вне зависимости от того, есть ли line_number или нет
        data_csv_row = zapusk_read_csv(int(line_number) if line_number is not None else int(block_number))

        # Если данные из CSV получены, извлекаем нужные значения
        if data_csv_row:
            # Логируем полученные данные для отладки
            print(f"Data from (Данные из) zapusk_read_csv: {data_csv_row}")
            print()
            material, tipe, standard, diameter, length, quantity = data_csv_row[5:11]
            print(material, tipe, standard, diameter, length, quantity)

        # Возвращаем JSON с данными
        return jsonify({
            'success': True,
            'data_csv_row': data_csv_row,
            'material': material,
            'tipe': tipe,
            'standard': standard,
            'diameter': diameter,
            'length': length,
            'quantity': quantity,
            'page_url': page_url  # Отправляем обратно ссылку на текущую страницу
        })
    except Exception as e:
        # Обрабатываем любые ошибки
        print(f"Произошла ошибка: {str(e)}")
        return jsonify({'error': str(e)})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
