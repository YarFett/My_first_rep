import random

errors = [ValueError, SyntaxError, TypeError, IndexError, KeyError]
summ = 0

with open('out_file.txt', 'w') as file:
    while True:
        try:
            number = int(input('Введите число: '))
            if 13 == random.randint(1, 13):
                error = random.choice(errors)
                raise error
            summ += number
            print(number, file=file)
            if summ >= 777:
                print('Вы успешно выполнили условие для выхода из порочного цикла!')
                break
        except error:
            print('Вас постигла неудача!')
            break
