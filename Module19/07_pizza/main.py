numbers = int(input('Введите кол-во заказов: '))
numbers_dict = {}
for _ in range(1, numbers + 1):
    order = input(f'{_}-й заказ: ')
    fio, pizza, amount = order.rsplit(maxsplit=3)
    amount = int(amount)
    if fio not in numbers_dict:
        numbers_dict[fio] = {pizza: amount}
    else:
        if pizza not in numbers_dict[fio]:
            numbers_dict[fio] |= {pizza: amount}
        else:
            numbers_dict[fio][pizza] += amount
for fio, order in sorted(numbers_dict.items()):
    print(f'{fio}:')
    for pizza, amount in sorted(order.items()):
        print(' ', pizza + ':', amount)
