def numbers(num):
    if num > 1:
        numbers(num-1)
    print(num)


number = int(input('Введите число: '))
numbers(number)

