from collections.abc import Callable
import functools


app = {}


def callback(route: str) -> Callable:
    '''Функция обратного вызова, завясяшая от опеределенного события route'''
    def wrapper(func: Callable) -> Callable:
        '''Декоратор функции, заполняем словарь app,
        привязываем функцию к аргументу route'''
        app[route] = func

        @functools.wraps(func)
        def wrapped(*args, **kwargs):
            '''Основной код, обратной функции от функции
            Возвращаем функции и декоратор для отработки Функции обратного вызова'''
            ret = func(*args, **kwargs)
            return ret
        return wrapped
    return wrapper


@callback('//')
def example():
    print('Пример функции, которая возвращает ответ сервера.')
    return 'OK'


route = app.get('//')
if route:
    resp = example()
    print('ответ:', resp)
else:
    print('Такого пути нет.')
