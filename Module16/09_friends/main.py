friends_number = int(input("Кол-во друзей: "))
count_of = int(input("Кол-во долговых расписок: "))
friends_list = []

for _ in range(friends_number):
    friends_list.append(0)

for number in range(count_of):
    print('\n' + str(number + 1) + "-я расписка: ")
    for_who = int(input("Кому: "))
    from_who = int(input("От кого: "))
    how_much = int(input("Сколько: "))
    friends_list[from_who - 1] += how_much
    friends_list[for_who - 1] -= how_much

print("\nБаланс друзей: ")
for index in range(len(friends_list)):
    print(str(index + 1) + ":", friends_list[index])