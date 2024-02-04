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


'''
# Функция для чтения CSV файла
def read_csv(file_name):
    # Определение текущей директории скрипта
    script_dir = os.path.dirname(__file__)
    # Формирование пути к файлу CSV в папке static/data
    file_path = os.path.join(script_dir, 'static/data', file_name)
    # Инициализация пустого списка для хранения данных CSV
    csv_data = []

    # Открытие файла CSV и чтение его содержимого
    with open(file_path, 'r', newline='', encoding='utf-8-sig') as file:
        # Использование csv.reader для разделения строк на элементы с разделителем ';'
        csv_reader = csv.reader(file, delimiter=';')
        # Чтение заголовка и добавление его в список csv_data
        header = next(csv_reader)
        csv_data.append(header)

        # Итерация по строкам CSV и добавление их в список csv_data
        for row in csv_reader:
            csv_data.append(row)

    # Возвращение полученных данных из CSV файла
    return csv_data


# Функция для запуска чтения CSV файла
def zapusk_read_csv():
    # Указание имени файла CSV, который будет прочитан
    csv_file_name = 'Krepozh — копия (2).csv'
    # Вызов функции read_csv для чтения файла и сохранения данных в переменной data_csv_base
    data_csv_base = read_csv(csv_file_name)
    # Вывод данных CSV в консоль (может быть изменено или использовано по вашему усмотрению)
    print(data_csv_base)
'''


# Функция для чтения CSV файла
def read_csv(file_name, row_number=None):
    # Определение текущей директории скрипта
    script_dir = os.path.dirname(__file__)
    # Формирование пути к файлу CSV в папке static/data
    file_path = os.path.join(script_dir, 'static/data', file_name)
    # Инициализация пустого списка для хранения данных CSV
    csv_data = []

    # Открытие файла CSV и чтение его содержимого
    with open(file_path, 'r', newline='', encoding='utf-8-sig') as file:
        # Использование csv.reader для разделения строк на элементы с разделителем ';'
        csv_reader = csv.reader(file, delimiter=';')
        # Чтение заголовка и добавление его в список csv_data
        header = next(csv_reader)
        csv_data.append(header)

        # Если задан номер строки (row_number), читаем только эту строку
        if row_number is not None:
            for i, row in enumerate(csv_reader):
                if i == row_number - 1:  # -1, так как индексы начинаются с 0
                    csv_data.append(row)
                    break
        else:
            # Итерация по строкам CSV и добавление их в список csv_data
            for row in csv_reader:
                csv_data.append(row)

    # Возвращение полученных данных из CSV файла
    return csv_data


# Функция для запуска чтения CSV файла
def zapusk_read_csv(row_number_to_extract):
    # Указание имени файла CSV, который будет прочитан
    csv_file_name = 'Krepozh — копия (2).csv'

    # Задание номера строки, которую вы хотите извлечь (замените на нужный номер) = row_number_to_extract

    # Вызов функции read_csv для чтения файла и сохранения данных в переменной data_csv_base
    data_csv_row = read_csv(csv_file_name, row_number=row_number_to_extract)

    # Вывод данных CSV в консоль (может быть изменено или использовано по вашему усмотрению)
    print(data_csv_row)

    # Вызов функции read_csv для чтения файла и возврат данных
    return read_csv(csv_file_name, row_number=row_number_to_extract)


'''
# Функция для периодического вызова zapusk_read_csv
def periodic_check():
    # Вызов функции zapusk_read_csv при периодической проверке
    zapusk_read_csv()


# Функция для вызова при запуске приложения
def on_startup():
    # Вызов функции zapusk_read_csv при старте приложения
    zapusk_read_csv()

    # Использование BackgroundScheduler для периодического вызова periodic_check каждые 5 секунд
    scheduler.add_job(periodic_check, 'interval', seconds=5)
    # Запуск фонового планировщика
    scheduler.start()
'''


@app.route('/check', methods=['POST'])
def check():
    # Получение данных от клиента
    data = request.get_json()
    win_loc_href = data.get('win_loc_href', '')
    quantity_input = data.get('quantity_input', '')

    print(data)
    data_csv_row = zapusk_read_csv(int(quantity_input))  # Преобразование в int и получение данных

    # Проверка на заполнение поля формы
    if quantity_input == '':
        return jsonify({'error': 'Field is empty'})

    # Отправить данные на сервер
    try:
        # ... ваша логика обработки данных ...
        return jsonify({'success': True, 'data_csv_row': data_csv_row})
    except Exception as e:
        return jsonify({'error': str(e)})

    # Проверка ответов (пример)
    # correct = check_logic(win_loc_href, quantity_input)

    # return jsonify({'correct': correct})


'''
def check_logic(answer1, answer2, answer3):
    # Ваша логика проверки ответов здесь
    # Возвращайте True, если все верно, и False в противном случае
    return True if answer1 == '43200' and answer2 == '64' and answer3 == '1080' else False
'''


# Проверка, является ли файл исполняемым
if __name__ == "__main__":
    '''
    # Вызов функции on_startup при запуске приложения
    on_startup()
    '''

    # zapusk_read_csv()

    # Запуск Flask приложения
    app.run(debug=True, host="0.0.0.0", port=8080)
