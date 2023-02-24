import random


def f(x, y):
    x += random.randint(0, 10)
    y += random.randint(0, 5)
    try:
        return x / y
    except ZeroDivisionError:
        return None


def f2(x, y):
    x -= random.randint(0, 10)
    y -= random.randint(0, 5)
    try:
        return y / x
    except ZeroDivisionError:
        return None


file_2 = open('result.txt', 'w')
with open('coordinates.txt', 'r') as file:
    for line in file:
        try:
            nums_list = line.split()
            res1 = f(int(nums_list[0]), int(nums_list[1]))
            res2 = f2(int(nums_list[0]), int(nums_list[1]))
            number = random.randint(0, 100)
            my_list = sorted([res1, res2, number])
            print(my_list)
            file_2.write(str(my_list))
        except TypeError:
            pass
    file_2.close()


#
#
# file_1 = open('coordinates.txt', 'r')
# file_2 = open('result.txt', 'w')
#
# for line in file_1:
#     nums_list = line.split()
#     res1 = f(int(nums_list[0]), int(nums_list[1]))
#     res2 = f2(int(nums_list[0]), int(nums_list[1]))
#
#
#
# file_1.close()
# file_2.close()
