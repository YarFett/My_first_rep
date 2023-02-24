import random

my_list = list()
new_list = list()

for _ in range(10):
    my_list.append(random.randrange(100))

for key, value in enumerate(my_list):
    if key % 2 != 0:
        value = my_list[key-1], my_list[key]
        new_list.append(value)

print('Оригинальный список:', my_list)
print('Новый список:', new_list)