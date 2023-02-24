def is_prime(number):
    k = 0
    for i in range(2, number // 2 + 1):
        if (number % i == 0):
            k = k + 1
    if (k <= 0):
        return True
    else:
        return False

def crypto(object):
    type = input('Выберете тип итерируемого объекта: кортеж, список, словарь, строка\n')
    new_object = list()
    if type == 'кортеж':
        object = list(tuple(object))
        for key, value in enumerate(object):
            if is_prime(key) == True and key != 0 and key != 1:
                new_object.append(value)
    if type == 'список' or type == 'строка':
        object = list(object)
        for key, value in enumerate(object):
            if is_prime(key) == True and key != 0 and key != 1:
                new_object.append(value)
    if type == 'словарь':
        object = list(object)
        list_keys = list()
        list_values = list()
        for key, value in enumerate(object):
            if is_prime(key) == True and key != 0 and key != 1:
                list_values.append(value)
                list_keys.append(key)
        object_dictionary = dict(zip(list_values, list_keys))
        print(object_dictionary)
        for d_key, d_value in object_dictionary.items():
            new_object.append(d_key)

    return new_object

my_text = input('Введите то, что хотите: ')
print(crypto(my_text))
