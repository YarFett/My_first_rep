def fib(index):
    number = 1
    num_fib = [0]
    for item in range(1, index+1):
        num_fib.append(number)
        number = num_fib[item-1] + num_fib[item]

    return num_fib[index]


num_pos = int(input('Введите позицию в ряде числа Фибоначче: '))
print('Число:', fib(num_pos))