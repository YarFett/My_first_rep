numbers = int(input('Введите максимальное число: '))
all_nums = set(range(1, numbers + 1))
possible_nums = all_nums

while True:
    guess = input('Нужное число есть среди вот этих чисел: ')
    if guess == 'Помогите!':
        break
    guess = {int(x) for x in guess.split()}
    answer = input('Ответ Артёма: ')
    if answer == 'Да':
        possible_nums &= guess
    else:
        possible_nums &= all_nums - guess

print('Артём мог загадать следующие числа:', ' '.join([str(x) for x in sorted(possible_nums)]))
