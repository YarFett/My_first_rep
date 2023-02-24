def turn_numbers1(N):
    number1 = 0
    main_part = round(N, 1) // 1
    while main_part > 0:
        rest = main_part % 10
        main_part //= 10
        number1 *= 10
        number1 += rest
    return number1

def turn_numbers2(N):
    number2 = 0
    count = 0
    residual_part = round(N - (N // 1), 2) * 100
    while residual_part > 0:
        rest = residual_part % 10
        count += 1
        residual_part //= 10
        number2 *= 10
        number2 += rest
    number2 /= 10 ** count
    return number2

N1 = float(input("Введите первое вещественное число: "))
N2 = float(input("Введите второе вещественное число: "))

reverse_N1_main = turn_numbers1(N1)
reverse_N1_residual = turn_numbers2(N1)
reverse_N1 = reverse_N1_main + reverse_N1_residual
print("Первое число наоборот: ", reverse_N1)

reverse_N2_main = turn_numbers1(N2)
reverse_N2_residual = turn_numbers2(N2)
reverse_N2 = reverse_N2_main + reverse_N2_residual
print("Второе число наоборот: ", reverse_N2)

summ_reversed_num = reverse_N1 + reverse_N2
print("Сумма: ", summ_reversed_num)
