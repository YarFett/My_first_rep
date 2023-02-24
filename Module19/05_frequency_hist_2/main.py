text = list(input('Введите текст: '))

text_dict = dict()
invers_dict = dict()

for item in text:
    text_dict[item] = text.count(item)

print('Оригинальный словарь частот:')
for key, value in text_dict.items():
    print(key, ':', value)

for number in range(1, max(text_dict.values()) + 1):
    keys_list = list()
    for key, value in text_dict.items():
        if value == number:
            keys_list.append(key)
            invers_dict[str(value)] = keys_list

print('\nИнвертированный словарь частот:')
for i_key, i_value in invers_dict.items():
    print(i_key + ':', i_value)






