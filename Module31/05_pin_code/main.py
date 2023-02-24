import random
from itertools import product


my_pin = [str(random.randint(0, 9)) for number in range(4)]

print('Мой пин-код', my_pin)
print('-' * 40)

res = list(map("".join, product(*[list('0123456789')] * 4)))

for number in res:
    print(number)
    if list(number) == my_pin:
        print('Вот твой код:', number)
        break

