
summ = 0
with open('people.txt', 'r', encoding='utf-8') as file:
    for key, line in enumerate(file):
        free_line = line.strip('\n')
        count = 0
        try:
            for sym in free_line:
                summ += 1
                count += 1
            if count < 3:
                raise ValueError
        except ValueError:
            print('Ошибка: менее трёх символов в строке', key)
    print('Общее количество символов:', summ)



