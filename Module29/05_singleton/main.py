import functools


def singleton(cls):
    '''Декоратор класса(поэтому используем передаваемый аргумент cls).
    Превращает класс в синглтон - паттерн проектирования, который гарантирует,
    что у класса есть только один экземпляр, и предоставляет к нему глобальную точку доступа.

    wrapper.instance - параметр для кэширования

    функция wrapper реализует возврат первого объекта класса при множественном его создании.'''
    @functools.wraps(cls)
    def wrapper(*args, **kwargs):
        if not wrapper.instance:
            wrapper.instance = cls(*args, **kwargs)
        return wrapper.instance

    wrapper.instance = None
    return wrapper


@singleton
class Example:
    pass


my_obj = Example()
my_another_obj = Example()


print(id(my_obj))
print(id(my_another_obj))


print(my_obj is my_another_obj)
