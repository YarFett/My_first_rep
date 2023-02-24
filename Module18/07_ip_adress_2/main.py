ip = input('Введите IP: ').split('.')

if len(ip) < 4:
    print('Адрес - это четыре числа, разделённые точками')
else:
    numeric = 0
    out_of_range = 0
    for item in ip:
        if item.isdigit():
            numeric += 1
            if int(item) > 255:
                out_of_range += 1
                print(item, 'превышает 255')
        else:
            print(item, '- не целое число')
    if out_of_range == 0 and numeric == 4:
        print('IP-адрес корректен')