
list1 = []
list2 = []

for item1 in range(1, 4):
    num1 = int(input('Введите ' + str(item1) + '-е число первого списка: '))
    list1.append(num1)
for item2 in range(1, 8):
    num2 = int(input('Введите ' + str(item2) + '-е число второго списка: '))
    list2.append(num2)

print('Первый список:', list1)
print('Второй список:', list2)

list1.extend(list2)

def unique_numbers(list1):
    new_list1 = []
    unique_num = set(list1)

    for num in unique_num:
        new_list1.append(num)
    return new_list1

print('Новый первый список с уникальными элементами:', unique_numbers(list1))