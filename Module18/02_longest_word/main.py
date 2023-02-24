text = input('Введите строку: ').split()

max_length = max([len(item) for item in text])

word = ([item for item in text if len(item) == max_length])

print('Самое длинное слово:', word[0])
print('Длина этого слова:', max_length)