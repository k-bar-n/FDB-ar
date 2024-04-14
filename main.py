# Импорт необходимых модулей
# Модуль Flask для создания веб-приложения
from flask import Flask, render_template, request, jsonify

import os  # Модуль для работы с операционной системой
import csv  # Модуль для работы с CSV файлами

from apscheduler.schedulers.background import BackgroundScheduler

# Инициализация Flask приложения
app = Flask(__name__)

# CSRF защита
# app.config['SECRET_KEY'] = 'your_secret_key'

# Инициализация фонового планировщика
scheduler = BackgroundScheduler()


# -----------------------------------------------


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


@app.route("/map")
def index_map():
    return render_template("Map/map.html")


@app.route("/page3")
def index_page3():
    return render_template("list_zakupok/page3.html")


@app.route("/list_zakupok")
def index_list_zakupok():
    return render_template("list_zakupok/list_zakupok.html")


# -----------------------------------------------


# Стеллаж 1
@app.route("/map/stellazh1")
def index_map_stellazh1():
    return render_template("Map/St1/Mp_st1.html")


# -----------------------------------------------


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


# -----------------------------------------------


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


# -----------------------------------------------


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
    # print("Inside condition (Внутреннее состояние) block_number:", block_number)
    return block_number


# -----------------------------------------------


# Имя файла определено как глобальная переменная
CSV_FILE_NAME = 'Krepozh.csv'


# -----------------------------------------------


# Функция для чтения CSV файла
def read_csv(file_name, row_number_to_extract):
    script_dir = os.path.dirname(__file__)  # Получаем путь к текущему файлу
    # Создаем путь к CSV файлу
    file_path = os.path.join(script_dir, 'static/data', file_name)
    csv_data = None  # Инициализируем переменную для хранения данных из CSV файла

    try:
        with open(file_path, 'r', newline='', encoding='utf-8-sig') as file:
            # Используем csv.reader для чтения CSV файла
            csv_reader = csv.reader(file, delimiter=';')
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
    data_csv_base = None  # Инициализируем переменную для хранения данных из CSV файла

    try:
        # Читаем данные из CSV файла
        data_csv_base = read_csv(CSV_FILE_NAME, row_number_to_extract)
    except Exception as e:
        print(f"Произошла ошибка при чтении файла CSV: {str(e)}")

    return data_csv_base  # Возвращаем данные из CSV файла


def over_zapusk_read_csv(block_number):
    data_csv_row = zapusk_read_csv(block_number)  # Читаем строку из CSV файла

    # Инициализация переменных для данных из CSV
    material, tipe, standard, diameter, length, quantity, magazin, site = "", "", "", "", "", "", "", ""

    if data_csv_row:  # Проверяем наличие данных из CSV
        # Извлекаем данные из строки CSV
        # print(f"Data from zapusk_read_csv: {data_csv_row}")
        material, tipe, standard, diameter, length, quantity, magazin, site = data_csv_row[5:13]
        # print(material, "-", tipe, "-", standard, "-", diameter, "-", length, "-", quantity)

    s_over_zapusk_read_csv = {'data_csv_row': data_csv_row,
                              'material': material,
                              'tipe': tipe,
                              'standard': standard,
                              'diameter': diameter,
                              'length': length,
                              'quantity': quantity,
                              'magazin': magazin,
                              'site': site}

    return s_over_zapusk_read_csv


def over_zapusk_read_csv_founder(block_number):
    data_csv_row = zapusk_read_csv(block_number)  # Читаем строку из CSV файла

    # Инициализация переменных для данных из CSV
    (stelazh_nomer, polka_nomer, stroka_nomer, stolbets_nomer, color_konteynera,
     material, tipe, standard, diameter, length, quantity, magazin, site)\
        = "", "", "", "", "", "", "", "", "", "", "", "", ""

    if data_csv_row:  # Проверяем наличие данных из CSV
        # Извлекаем данные из строки CSV
        # print(f"Data from zapusk_read_csv: {data_csv_row}")
        stelazh_nomer, polka_nomer, stroka_nomer, stolbets_nomer, color_konteynera = data_csv_row[0:5]
        material, tipe, standard, diameter, length, quantity, magazin, site = data_csv_row[5:13]
        '''
        print(stelazh_nomer, "-", polka_nomer, "-", stroka_nomer, "-",
              stolbets_nomer, "-", color_konteynera, "-",
              material, "-", tipe, "-", standard, "-",
              diameter, "-", length, "-", quantity)
        '''

    s_over_zapusk_read_csv = {'data_csv_row': data_csv_row,
                              'stelazh_nomer': stelazh_nomer,
                              'polka_nomer': polka_nomer,
                              'stroka_nomer': stroka_nomer,
                              'stolbets_nomer': stolbets_nomer,
                              'color_konteynera': color_konteynera,
                              'material': material,
                              'tipe': tipe,
                              'standard': standard,
                              'diameter': diameter,
                              'length': length,
                              'quantity': quantity,
                              'magazin': magazin,
                              'site': site}

    return s_over_zapusk_read_csv


# -----------------------------------------------


# Функция, которая обновляет значение элемента (а именно количества) в CSV-файле
def update_csv_element(file_path, row_index, element_index, change_value):
    try:
        with open(file_path, 'r', newline='') as file:
            csv_reader = csv.reader(file, delimiter=';')
            lines = list(csv_reader)

        if row_index < len(lines):
            if element_index < len(lines[row_index]):
                current_value = lines[row_index][element_index]
                updated_value = int(current_value) + change_value
                lines[row_index][element_index] = str(updated_value)

                with open(file_path, 'w', newline='') as file:
                    csv_writer = csv.writer(file, delimiter=';')
                    csv_writer.writerows(lines)
                return True
            else:
                print(
                    f"Element index {element_index} is out of range in row {row_index}")
        else:
            print(f"Row index {row_index} is out of range")

    except Exception as e:
        print(f"An error occurred: {e}")

    return False


# Вспомогательная функция, которая предназначена для запуска update_csv_element
def zapusk_update_csv_element(row_index, change_value):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, 'static/data', CSV_FILE_NAME)
    element_index = 10

    result = update_csv_element(
        file_path, row_index, element_index, change_value)
    return result


# -----------------------------------------------


# Маршрут для обработки запроса /receiving_data_from_server POST
@app.route('/receiving_data_from_server', methods=['POST'])
def receiving_data_from_server():
    try:
        data = request.get_json()  # Получаем данные из POST запроса
        block_number = int(data.get('line_number')) if data.get(
            'line_number') is not None else None
        page_url = data.get('page_url')

        # print(data)

        if block_number is None:  # Проверяем наличие номера блока
            return jsonify({'error': 'Не указан ни номер блока, ни номер строки'})

        if page_url is not None:  # Проверяем наличие URL страницы
            # Удаляем протокол и домен из URL
            page_url = page_url.split("//")[-1].split('/', 1)[-1]
            # print(f"Processed page_url: {page_url}")

            # print(f"Первоначальное значение block_number = {block_number}")
            # Обновляем значение block_number
            block_number = process_page_url(page_url, block_number)
            # print(f"Изменённое значение block_number = {block_number}")

        s_over_zapusk_read_csv_s = over_zapusk_read_csv(block_number)

        # print(s_over_zapusk_read_csv_s)

        material = s_over_zapusk_read_csv_s['material']
        data_csv_row = s_over_zapusk_read_csv_s['data_csv_row']
        tipe = s_over_zapusk_read_csv_s['tipe']
        standard = s_over_zapusk_read_csv_s['standard']
        diameter = s_over_zapusk_read_csv_s['diameter']
        length = s_over_zapusk_read_csv_s['length']
        quantity = s_over_zapusk_read_csv_s['quantity']
        magazin = s_over_zapusk_read_csv_s['magazin']
        site = s_over_zapusk_read_csv_s['site']

        return jsonify({
            'success': True,
            'data_csv_row': data_csv_row,
            'material': material,
            'tipe': tipe,
            'standard': standard,
            'diameter': diameter,
            'length': length,
            'quantity': quantity,
            'magazin': magazin,
            'site': site,
            'page_url': page_url
        })

    except Exception as e:  # Обработка исключений
        print(f"Произошла ошибка: {str(e)}")
        return jsonify({'error': str(e)})  # Возвращаем ошибку в формате JSON


# -----------------------------------------------


# Маршрут для обработки запроса /check POST
@app.route('/check', methods=['POST'])
def check():
    try:
        data = request.get_json()  # Получаем данные из POST запроса
        block_number = int(data.get('line_number'))
        page_url = data.get('currentPageUrl')
        quantity0 = data.get('quantity')

        # print(data)

        if block_number is None:  # Проверяем наличие номера блока
            return jsonify({'error': 'Не указан ни номер блока, ни номер строки'})

        # Проверяем наличие URL страницы, сделано исключительно для проверки,
        # так как URL страницы должен поступить на сервер обязательно, иначе это ошибка

        if page_url is not None:
            # Удаляем протокол и домен из URL
            page_url = page_url.split("//")[-1].split('/', 1)[-1]
            # print(f"Processed page_url: {page_url}")

            # print(f"Первоначальное значение block_number = {block_number}")
            # Обновляем значение block_number
            block_number = process_page_url(page_url, block_number)
            # print(f"Изменённое значение block_number = {block_number}")

        zapusk_update_csv_element_p = zapusk_update_csv_element(
            block_number, quantity0)

        if zapusk_update_csv_element_p:
            s_over_zapusk_read_csv_s = over_zapusk_read_csv(block_number)

            # print(s_over_zapusk_read_csv_s)

            material = s_over_zapusk_read_csv_s['material']
            data_csv_row = s_over_zapusk_read_csv_s['data_csv_row']
            tipe = s_over_zapusk_read_csv_s['tipe']
            standard = s_over_zapusk_read_csv_s['standard']
            diameter = s_over_zapusk_read_csv_s['diameter']
            length = s_over_zapusk_read_csv_s['length']
            quantity = s_over_zapusk_read_csv_s['quantity']
            magazin = s_over_zapusk_read_csv_s['magazin']
            site = s_over_zapusk_read_csv_s['site']

            return jsonify({
                'success': True,
                'data_csv_row': data_csv_row,
                'material': material,
                'tipe': tipe,
                'standard': standard,
                'diameter': diameter,
                'length': length,
                'quantity': quantity,
                'magazin': magazin,
                'site': site,
                'page_url': page_url
            })

    except Exception as e:  # Обработка исключений
        return jsonify({'error': str(e)})  # Возвращаем ошибку в формате JSON


# -----------------------------------------------


# Маршрут для обработки запроса /founder POST
@app.route('/founder', methods=['POST'])
def founder():
    try:
        data = request.get_json()  # Получаем данные из POST запроса
        data_block_number = int(data.get('line_number'))

        data_material = data.get('material')
        data_tipe = data.get('tipe')
        data_standard = data.get('standard')
        data_diameter = data.get('diameter').replace('.', ',')
        data_length = data.get('length').replace('.', ',')

        # print(data_material, data_tipe, data_standard, data_diameter, data_length)

        if data_block_number is None:  # Проверяем наличие номера блока
            return jsonify({'error': 'Не указан ни номер блока, ни номер строки'})

        # block_number = process_page_url(page_url, block_number)

        s_over_zapusk_read_csv_s = over_zapusk_read_csv_founder(data_block_number)

        # print(s_over_zapusk_read_csv_s)

        stelazh_nomer = s_over_zapusk_read_csv_s['stelazh_nomer']
        polka_nomer = s_over_zapusk_read_csv_s['polka_nomer']
        stroka_nomer = s_over_zapusk_read_csv_s['stroka_nomer']
        stolbets_nomer = s_over_zapusk_read_csv_s['stolbets_nomer']
        color_konteynera = s_over_zapusk_read_csv_s['color_konteynera']
        material = s_over_zapusk_read_csv_s['material']
        data_csv_row = s_over_zapusk_read_csv_s['data_csv_row']
        tipe = s_over_zapusk_read_csv_s['tipe']
        standard = s_over_zapusk_read_csv_s['standard']
        diameter = s_over_zapusk_read_csv_s['diameter']
        length = s_over_zapusk_read_csv_s['length']
        quantity = s_over_zapusk_read_csv_s['quantity']
        magazin = s_over_zapusk_read_csv_s['magazin']
        site = s_over_zapusk_read_csv_s['site']

        replacements = {
            'A': 'А', 'B': 'Б', 'C': 'В', 'D': 'Г', 'E': 'Д',
            'F': 'Е', 'G': 'Ж', 'H': 'З', 'I': 'И', 'J': 'К',
            'K': 'Л', 'L': 'М', 'M': 'Н', 'N': 'О', 'O': 'П',
            'P': 'Р', 'Q': 'С', 'R': 'Т', 'S': 'У', 'T': 'Ф',
            'U': 'Х', 'V': 'Ц', 'W': 'Ч', 'X': 'Ш', 'Y': 'Щ',
            'Z': 'Э', 'a': 'а', 'b': 'б', 'c': 'в', 'd': 'г',
            'e': 'д', 'f': 'е', 'g': 'ж', 'h': 'з', 'i': 'и',
            'j': 'к', 'k': 'л', 'l': 'м', 'm': 'н', 'n': 'о',
            'o': 'п', 'p': 'р', 'q': 'с', 'r': 'т', 's': 'у',
            't': 'ф', 'u': 'х', 'v': 'ц', 'w': 'ч', 'x': 'ш',
            'y': 'щ', 'z': 'э'
        }
        stolbets_nomer = ''.join(replacements.get(char, char) for char in stolbets_nomer)

        proverka = 1

        if data_material != "" and data_material != "*":
            if data_material != material:
                proverka = 0
        if data_tipe != "" and data_tipe != "*":
            if data_tipe != tipe:
                proverka = 0
        if data_standard != "" and data_standard != "*":
            if data_standard != standard:
                proverka = 0
        if data_diameter != "" and data_diameter != "*":
            if data_diameter != diameter:
                proverka = 0
        if data_length != "" and data_length != "*":
            if data_length != length:
                proverka = 0

        # print(f"proverka proverka proverka proverka proverka {proverka}")

        return jsonify({
            'success': True,
            'stelazh_nomer': stelazh_nomer,
            'polka_nomer': polka_nomer,
            'stroka_nomer': stroka_nomer,
            'stolbets_nomer': stolbets_nomer,
            'color_konteynera': color_konteynera,
            'data_csv_row': data_csv_row,
            'material': material,
            'tipe': tipe,
            'standard': standard,
            'diameter': diameter,
            'length': length,
            'quantity': quantity,
            'magazin': magazin,
            'site': site,
            'booler': proverka
        })

    except Exception as e:  # Обработка исключений
        print(f"Произошла ошибка: {str(e)}")
        return jsonify({'error': str(e)})  # Возвращаем ошибку в формате JSON


# -----------------------------------------------


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
