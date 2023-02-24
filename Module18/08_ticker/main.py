first_string = input('Первая строка: ')
second_string = input('Вторая строка: ')
second_sym_list = list(second_string)
shift_count = 0

for i_try in range(len(first_string)):
    temp_sym = second_sym_list[len(first_string) - 1]
    for j_shift in range(len(first_string) - 2, -1, -1):
        second_sym_list[j_shift + 1] = second_sym_list[j_shift]
    second_sym_list[0] = temp_sym
    new_string = ''.join(second_sym_list)
    shift_count += 1
    if first_string == new_string:
        print('Первая строка получается из второй со сдвигом', shift_count)
        break
else:
    print('Первую строку нельзя получить из второй с помощью циклического сдвига.')