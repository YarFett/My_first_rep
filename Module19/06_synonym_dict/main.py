number = int(input('Введите количество пар слов: '))
text_dict = dict()

for item in range(1, number + 1):
    pair = input(f'{item} пара: ').lower().split(' - ')
    text_dict[pair[0]] = pair[1]
    text_dict[pair[1]] = pair[0]

while True:
    word = input('\nВведите слово: ').lower()
    if word == 'end':
        break
    if word in text_dict:
        print('Синоним:', text_dict[word])
    else:
        print('Такого слова нет в словаре.')