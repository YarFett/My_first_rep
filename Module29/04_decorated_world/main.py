from typing import Callable
import functools


def decorator_with_args_for_any_decorator(decor_for_decor: Callable) -> Callable:
    '''Декоратор даёт возможность другому декоратору принимать любые аргументы

    Необходимо учесть, что функция обязательно должна иметь аргументы,
    иначе декоратор не отработает.'''
    def decor_maker(*args, **kwargs) -> Callable:
        def decor_wrapper(func: Callable) -> Callable:
            return decor_for_decor(func, *args, **kwargs)
        return decor_wrapper
    return decor_maker


@decorator_with_args_for_any_decorator
def decorated_decorator(func: Callable, *decor_args, **decor_kwargs) -> Callable:
    '''Шаблон декоратора'''
    @functools.wraps(func)
    def wrapper(*args, **kwargs) -> Callable:
        print('Переданные арги и кварги в декоратор:', decor_args, decor_kwargs)
        return func(*args, **kwargs)
    return wrapper


@decorated_decorator(100, 'рублей', 200, 'друзей')
def decorated_function(text: str, num: int) -> None:
    print("Привет", text, num)


decorated_function("Юзер", 101)
