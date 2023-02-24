import time
from typing import Callable, Any
import functools


def pause(func: Callable) -> Callable:

    '''Декоратор функции,
    откладывающий выполнение функции на несколько секунд '''
    @functools.wraps(func)
    def pause_func(*args, **kwargs: Any) -> Any:

        '''Функция задержки исполнения функции.'''

        time.sleep(5)
        function = func(*args, **kwargs)
        print('Реализация функции была отложена на 5 секунд')
        return function
    return pause_func


@pause
def square_square(a, b: int) -> Any:

    '''Функция расчета площади прямоугольника.'''

    S = a * b
    return f'Площадь квадрата от {a} * {b} = {S}'


print(square_square(10, 10))
