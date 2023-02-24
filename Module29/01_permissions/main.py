from collections.abc import Callable
import functools


user_permissions = ['admin']


def check_permission(name: str) -> Callable:
    ''' Основной декоратор,
    зависящий от передаваемого аргумента name'''
    def check_decor(func: Callable) -> Callable:
        ''' Декоратор функции func'''
        @functools.wraps(func)
        def checker(*args, **kwargs):
            '''Тело декоратора с основным кодом проверки возможностей фунции от передаваемого аргумента name
            Если name отсутствует в списке user_permission, то выдаёт ошибку права доступа.'''
            try:
                if name in user_permissions:
                    return func(*args, **kwargs)
                else:
                    raise PermissionError
            except PermissionError:
                print('PermissionError: У пользователя недостаточно прав чтобы выполнить функцию', func.__name__)
        return checker
    return check_decor


@check_permission('admin')
def delete_site():
    print('Удаляем сайт')


@check_permission('user_1')
def add_comment():
    print('Добавляем комментарий')


delete_site()
add_comment()
