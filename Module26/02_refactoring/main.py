def gen_calc():
    for x in list_1:
        for y in list_2:
            result = x * y
            yield result, x, y


list_1 = [2, 5, 7, 10]
list_2 = [3, 8, 4, 9]
to_find = 56

calc = gen_calc()
for elem in calc:
    if elem[0] == to_find:
        print(f'Если  {elem[1]} умножить на {elem[2]} то найдём {to_find}')
