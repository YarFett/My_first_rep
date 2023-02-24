import time
from datetime import datetime
from collections.abc import Callable


def timer(cls, func: Callable, date_format: str) -> Callable:
    '''Декоратор timer - принимает аргументы cls - Класс,
    func - вызываемыую функцию,
    date_format - формат даты и время как str'''
    def wrapped(*args, **kwargs):
        '''Основное тело декоратора timer, позвоялет отобразить запуски и завершение функций в классах А и B
        в формате  «Месяц День Год - Часы Минуты Секунды»'''
        format = date_format
        for sym in format:
            if sym.isalpha():
                format = format.replace(sym, '%' + sym)

        print(f"Запускается '{cls.__name__}.{func.__name__}'. Дата и время запуска: {datetime.now().strftime(format)}")
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Завершение '{cls.__name__}.{func.__name__}', время работы = {round(end - start, 3)} сек.")
        return result

    return wrapped


def log_methods(date_format: str) -> Callable:
    '''Декоратор, который логирует все методы декорируемого класса
     принимает аргумет date_format - str'''
    def decorate(cls):
        '''Основное тело декоратора, принимает класс в качестве аргумента
        логирует все метода класса кроме магических (начинаются с "__")'''
        for method in dir(cls):
            if not method.startswith('__'):
                current_method = getattr(cls, method)
                decorated_method = timer(cls, current_method, date_format)
                setattr(cls, method, decorated_method)
        return cls

    return decorate


@log_methods("b d Y - H:M:S")
class A:
    '''Базовый класс А'''
    def test_sum_1(self) -> int:
        '''Тяжелая функция по рассчету суммы всех чисел возведнных в квадрат в определенном промежутке'''
        print('\ntest sum 1')
        number = 100
        result = 0
        for _ in range(number + 1):
            result += sum([i_num ** 2 for i_num in range(10000)])

        return result


@log_methods("b d Y - H:M:S")
class B(A):
    '''Класс наследник В от А'''
    def test_sum_1(self):
        super().test_sum_1()
        print("\nНаследник test sum 1")

    def test_sum_2(self):
        '''Тяжелая функция по рассчету суммы всех чисел возведнных в квадрат в определенном промежутке'''
        print("\ntest sum 2")
        number = 200
        result = 0
        for _ in range(number + 1):
            result += sum([i_num ** 2 for i_num in range(10000)])

        return result


my_obj = B()
my_obj.test_sum_1()
my_obj.test_sum_2()
