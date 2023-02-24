def moves(n, x=1, y=3):
    if n == 1:
        print(f'Переложить диск {n} со стержня номер {x} на стержень номер {y}')
    else:
        moves(n - 1, x, 6 - x - y)
        print(f'Переложить диск {n} со стержня номер {x} на стержень номер {y}')
        moves(n - 1, 6 - x - y, y)


disc_number = int(input('Введите количество дисков:'))
moves(disc_number)