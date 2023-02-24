text = input('Введите строку: ')
new_text = ''
count = 1

for item in range(len(text)-1):
    if text[item] == text[item + 1]:
        count += 1
    if text[item] != text[item + 1] or item == len(text) - 2:
        new_text += text[item] + str(count)
        count = 1
if text[-2] != text[-1]:
    new_text += text[-1] + '1'
print('Закодированная строка:', new_text)
