
def summa_n(N):
    summ = 0
    count = 0
    while N > 0:
        summ += N % 10
        count += 1
        N //= 10
    print('Сумма цифр в числе:', summ)
    return summ

def count_n(N):
    count = 0
    while N > 0:
        N //= 10
        count += 1
    print('Количество цифр в числе:', count)
    return count

N = int(input('Введите число: '))

summN = summa_n(N)
countN = count_n(N)
differ = summN - countN
print('Разность суммы и количества цифр:', differ)