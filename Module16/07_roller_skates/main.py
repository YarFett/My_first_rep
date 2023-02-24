rollers = []
feet = []
true_list = []

roll_num = int(input('Кол-во коньков: '))
count = 0

for roll in range(1, roll_num + 1):
    size1 = int(input('Размер ' + str(roll) + '-й пары: '))
    rollers.append(size1)

feet_num = int(input('\nКол-во людей: '))

for foot in range(1, feet_num + 1):
    size2 = int(input('Размер ноги ' + str(foot) + '-го человека: '))
    feet.append(size2)

for roll_index in range(roll_num):
    for foot_index in range(feet_num):
        if rollers[roll_index] == feet[foot_index]:
            true_list.append(feet[foot_index])

unique_list = list(set(true_list))
print('\nНаибольшее кол-во людей, которые могут взять ролики:', len(unique_list))