
def min_div(N):
    item = 1
    while item < N:
        item += 1
        if N % item == 0:
            return item
            break

number = int(input('Введите число: '))

min_div(number)

if min_div(number) == number:
    print('Число', number, 'является простым.')
else:
    print('Нод отличный от единицы:', min_div(number))