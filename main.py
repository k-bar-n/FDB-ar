# Импорт необходимых модулей
from flask import Flask, render_template, request, jsonify  # Модуль Flask для создания веб-приложения

import os  # Модуль для работы с операционной системой
import csv  # Модуль для работы с CSV файлами

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
    script_dir = os.path.dirname(__file__)  # Получаем путь к текущему файлу
    file_path = os.path.join(script_dir, 'static/data', file_name)  # Создаем путь к CSV файлу
    csv_data = None  # Инициализируем переменную для хранения данных из CSV файла

    try:
        with open(file_path, 'r', newline='', encoding='utf-8-sig') as file:
            csv_reader = csv.reader(file, delimiter=';')  # Используем csv.reader для чтения CSV файла
            for _ in range(row_number_to_extract):
                next(csv_reader)  # Пропускаем строки до нужной
            csv_data = next(csv_reader)  # Читаем нужную строку из CSV файла
    except FileNotFoundError:
        print(f"Файл '{file_name}' не найден.")
    except Exception as e:
        print(f"Произошла ошибка при чтении файла CSV: {str(e)}")

    return csv_data  # Возвращаем данные из CSV файла


# Функция для запуска чтения CSV файла
def zapusk_read_csv(row_number_to_extract):
    csv_file_name = 'Крепёж.csv'  # Имя CSV файла
    data_csv_base = None  # Инициализируем переменную для хранения данных из CSV файла

    try:
        data_csv_base = read_csv(csv_file_name, row_number_to_extract)  # Читаем данные из CSV файла
    except Exception as e:
        print(f"Произошла ошибка при чтении файла CSV: {str(e)}")

    return data_csv_base  # Возвращаем данные из CSV файла


# Функция для обработки ссылки на страницу
def process_page_url(page_url, block_number):
    if page_url == "map/stellazh1":
        block_number = (int(block_number) + 0)
    elif page_url == "map/stellazh2/shelf1":
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


# Маршрут для обработки запроса POST
@app.route('/check', methods=['POST'])
def check():
    try:
        data = request.get_json()  # Получаем данные из POST запроса
        block_number = int(data.get('line_number')) if data.get('line_number') is not None else None
        page_url = data.get('page_url')

        if block_number is None:  # Проверяем наличие номера блока
            return jsonify({'error': 'Не указан ни номер блока, ни номер строки'})

        if page_url is not None:  # Проверяем наличие URL страницы
            page_url = page_url.split("//")[-1].split('/', 1)[-1]  # Удаляем протокол и домен из URL
            print(f"Processed page_url: {page_url}")

            original_block_number = block_number  # Сохраняем исходное значение block_number
            block_number = process_page_url(page_url, block_number)  # Обновляем значение block_number

            if block_number == original_block_number:  # Проверяем, изменилось ли значение block_number
                return jsonify({'error': 'Значение block_number не было изменено'})

        data_csv_row = zapusk_read_csv(block_number)  # Читаем строку из CSV файла

        # Инициализация переменных для данных из CSV
        material, tipe, standard, diameter, length, quantity = "", "", "", "", "", ""

        if data_csv_row:  # Проверяем наличие данных из CSV
            print(f"Data from zapusk_read_csv: {data_csv_row}")
            material, tipe, standard, diameter, length, quantity = data_csv_row[5:11]  # Извлекаем данные из строки CSV
            print(material, "-", tipe, "-", standard, "-", diameter, "-", length, "-", quantity)

        return jsonify({
            'success': True,
            'data_csv_row': data_csv_row,
            'material': material,
            'tipe': tipe,
            'standard': standard,
            'diameter': diameter,
            'length': length,
            'quantity': quantity,
            'page_url': page_url
        })

    except Exception as e:  # Обработка исключений
        print(f"Произошла ошибка: {str(e)}")
        return jsonify({'error': str(e)})  # Возвращаем ошибку в формате JSON


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
