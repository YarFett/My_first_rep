from typing import Callable, Dict, Any
import functools

LOGGINS: Dict[str, Callable] = dict()


def logging(func: Callable) -> Callable:

    '''Декоратор логирования функций,
    если ловит ошибку, то записывает в файл "function_errors.log"
    имя фукнции с ошибкой и саму ошибку'''

    @functools.wraps(func)
    def wrap(*args, **kwargs) -> Any:
        with open('function_errors.log', 'a') as f:
            LOGGINS[func.__name__] = func
            try:
                res = func(*args, **kwargs)
                return res
            except ValueError:
                f.write(f'{func.__name__}: {ValueError}\n')
            except NameError:
                f.write(f'{func.__name__}: {NameError}\n')

    return wrap


@logging
def hello(name: str, number: int) -> Any:

    '''Функция говорит привет человеку с номером,
если номер вне допуска, то выдает ошибку ValueError'''

    if 1 < number < 100:
        return f'Hi {name} {number}'
    else:
        raise ValueError


@logging
def bye(name: str, number: int) -> Any:

    '''Функция говорит пока человеку с номером,
если имя 'Bob', то выдает ошибку NameError'''

    if name != 'Bob':
        return f'Bye {name} {number}'
    else:
        raise NameError


hello('Tom', 101)
bye('Bob', 20)


for elem in LOGGINS:
    print(f'\nФункция: {elem}\nДокументация:\n{LOGGINS[elem].__doc__}')
