countries = {}

for item in range(0, int(input('Количество стран: '))):
    value = input(f'{item + 1}-я страна: ').split()
    for town in value[1:]:
        countries[town] = value[0]

print()

for item in range(1, 4):
    city = input(f'{item}-й город: ')
    country = countries.get(city)
    if country:
        print(f'Город {city} расположен в стране {country}.')
    else:
        print(f'По городу {city} данных нет.')
