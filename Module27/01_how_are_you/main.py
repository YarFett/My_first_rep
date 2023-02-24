from typing import Callable, Any
import functools

def how_are_you(func: Callable, ) -> Callable:

    '''Декоратор спрашивающий "Как дела?"'''
    @functools.wraps(func)
    def wrap(*args, **kwargs) -> Any:
        question = input('Как дела? ')
        if question:
            print('А у меня не очень! Ладно, держи свою функцию')
        res = func(*args, **kwargs)
        return res
    return wrap


@how_are_you
def test():

    ''' Функция в которой что-то происходит...'''

    print('<Тут что-то происходит...>')


test()
