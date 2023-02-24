def true_years(first_year, second_year):
    if second_year <= first_year or len(str(first_year)) != 4 or len(str(second_year)) != 4:
        print('Ошибка')
    else:
        print('Года от', first_year, 'до', second_year, 'с тремя одинаковыми цифрами:')
        year_1 = 0
        for year in range(first_year, second_year+1):
            year_1 = year
            first_num = year_1 % 10
            year_1 //= 10
            second_num = year_1 % 10
            year_1 //= 10
            third_num = year_1 % 10
            year_1 //= 10
            fourth_num = year_1 % 10
            year_1 //= 10
            if (first_num == second_num == third_num) or (first_num == second_num == fourth_num) or (second_num == third_num == fourth_num) or (third_num == fourth_num == first_num):
                print(year)

first_year = int(input('Введите первый год: '))
second_year = int(input('Введите второй год: '))
true_years(first_year, second_year)
