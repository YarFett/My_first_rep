import re

list_numbers = ['9999999999', '999999-999', '99999x9999']

for number in list_numbers:
    match = re.match(r'9', number).group(0)
    check = re.findall(r'\d+', number)
    if len(number) == 10 and match and len(check) == 1:
        print(list_numbers.index(number) + 1, 'номер: всё в порядке')
    else:
        print(list_numbers.index(number) + 1, 'не подходит')


