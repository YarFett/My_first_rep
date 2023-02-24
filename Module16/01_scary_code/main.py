main_list = [1, 5, 3]
first_list = [1, 5, 1, 5]
second_list = [1, 3, 1, 5, 3, 3]

main_list.extend(first_list)
print('Кол-во цифр при первом объединении:', main_list.count(5))

for point in main_list:
    if point == 5:
        main_list.remove(point)

main_list.extend(second_list)
print('Кол-во цифр при вотором объединении:', main_list.count(3))

print('Итоговый список:', main_list)

