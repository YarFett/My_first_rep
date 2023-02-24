def oper(line):
    try:
        line = line.replace('\n', '')
        line_item = line.split()
        if line_item[1] == '+':
            result = float(line_item[0]) + float(line_item[2])
        elif line_item[1] == '-':
            result = float(line_item[0]) - float(line_item[2])
        elif line_item[1] == '*':
            result = float(line_item[0]) * float(line_item[2])
        elif line_item[1] == '/':
            result = float(line_item[0]) / float(line_item[2])
        elif line_item[1] == '//':
            result = float(line_item[0]) // float(line_item[2])
        elif line_item[1] == '%':
            result = float(line_item[0]) % float(line_item[2])
        else:
            raise ValueError
        return result
    except ValueError:
            message = input('Обнаружена ошибка в строке: {0} Хотите её исправить? '.format(line))
            if message == 'Да'.lower():
                new_line = input('Введите исправленную строку: ')
                result = oper(new_line)
                return result
            if message == 'Нет'.lower():
                return 0


def operation(file):
    summ = 0
    for line in file:
        res = oper(line)
        summ += res
    return summ


with open('calc.txt') as file:
    print('Сумма результатов:', operation(file))