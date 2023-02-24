number_of_people = int(input('Кол-во человек: '))
number = int(input('Какое число в считалке?: '))
print('Значит, выбывает каждый', number, 'человек')

list_peoples = list(range(1, number_of_people + 1))
count = 0

while len(list_peoples) > 1:
    print('\nТекущий круг людей: ', list_peoples)
    print('Начало счёта с номера:', list_peoples[count])
    count = (count + number - 1) % len(list_peoples)

    if list_peoples[count] == list_peoples[-1]:
        print('Выбывает человек под номером:', list_peoples.pop(count))
        count = 0
    else:
        print('Выбывает человек под номером:', list_peoples.pop(count))

print('\nОстался человек под номером:', list_peoples[0])

