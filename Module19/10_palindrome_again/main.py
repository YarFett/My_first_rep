def sym(string):
    sym_dict = {}
    count = 0

    for i_sym in string:
        sym_dict[i_sym] = sym_dict.get(i_sym, 0) + 1
    for i_value in sym_dict.values():
        if i_value % 2 != 0:
            count += 1
    return count <= 1


my_string = input('Введите строку: ')
if sym(my_string):
    print('Можно сделать палиндромом.')
else:
    print('Нельзя сделать палиндромом.')
