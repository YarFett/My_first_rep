phonebook = dict()

while True:
    print('\nТекущий словарь контактов:\n')
    for key, value in phonebook.items():
        print(f'{key}: {value}')

    def check(spisok, person):
        new_list = list()
        for keys, values in spisok.items():
            if person in keys:
                new_list.append(keys)
                new_list.append(values)
        return new_list

    move = input('\nДобавить контакт\Поиск человека по фамилии: ').capitalize()

    if move == 'Добавить контакт':
        name = input('Имя Фамилия контакта(через пробел): ').lower()
        if not name in phonebook:
            phonebook[name] = int(input('Номер контакта: '))
        else:
            print('Такой человек уже существует.')
    elif move == 'Поиск человека по фамилии':
        found = input('Кого ищем? ').lower()
        result = check(phonebook, found)
        print(f'\nИнформация по контактам с фамилией {found}:')
        if len(result) == 0:
            print('Список пуст.')
        else:
            print(result)
