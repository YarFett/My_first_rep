guests = ['Петя', 'Ваня', 'Саша', 'Лиза', 'Катя']

while True:
    print('Сейчас на вечеринке', len(guests), ':', guests)
    question = input('Гость пришел или ушел? ')
    if question == 'пришёл':
        name = input('Имя гостя: ')
        if len(guests) < 6:
            guests.append(name)
            print('Привет,', name)
        else:
            print('Прости,', name, 'но мест нет.')
    if question == 'ушёл':
        name = input('Имя гостя: ')
        guests.remove(name)
        print('Пока', name, 'хорошо посидели.')
        if len(guests) == 0:
            print('Все гости ушли. Зачем было всех выгонять? Нормально же общались.')
            break
    if question == 'Пора спать':
        print('Вечеринка закончилась, все легли спать.')
        break
