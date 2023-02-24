def score_key(key):
    return key[1][0] * 100000000 - key[1][1]


score_table = {}
number_rows = int(input('Сколько записей вносится в протокол? '))
print('Записи (результат и имя):')
for time in range(number_rows):
    ball, name = input('{0}-я запись: '.format(time + 1)).split()
    ball = int(ball)

    if name in score_table:
        if ball > score_table[name][0]:
            score_table[name][0] = ball
            score_table[name][1] = time
    else:
        score_table[name] = [ball, time]
scores = list(score_table.items())

scores.sort(key=score_key, reverse=True)
print('\nИтоги соревнований: ')
for winner_index in 0, 1, 2:
    print(f'{winner_index + 1}-е место. {scores[winner_index][0]}', end=' ')
    print(f'({scores[winner_index][1][0]})', sep='')
