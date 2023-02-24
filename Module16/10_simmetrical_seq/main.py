
list_number = []
reversed_list = []
numbers = int(input('Кол-во чисел: '))

for _ in range(numbers):
    num = int(input('Число: '))
    list_number.append(num)

print('Последовательность:', list_number)

for index in range(len(list_number) - 1, -1, -1):
    reversed_list.append(list_number[index])

while True:
    if list_number[len(list_number) - 1] == reversed_list[0]:
        reversed_list.remove(reversed_list[0])
    else:
        break

print("Нужно приписать чисел: ", len(reversed_list))
print("Сами числа: ", reversed_list)