persons = {
'Сидоров Никита': 35,
'Сидорова Алина': 34,
'Сидоров Павел': 10,
'Петров Виктор': 15,
'Петрова Дарья': 16
}

search = input('Введите фамилию: ').lower()
result = []

for person in persons:
    if search in person.split()[0].lower():
        result.append(person + ' ' + str(persons[person]))

if not result:
    print('Поиск не дал результатов')
else:
    for _ in result:
        print(_)
