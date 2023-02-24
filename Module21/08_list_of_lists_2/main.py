nice_list = [1, 2, [3, 4], [[5, 6, 7], [8, 9, 10]],
             [[11, 12, 13], [14, 15], [16, 17, 18]]]


def my_list(std_list):
    if std_list == []:
        return std_list

    if isinstance(std_list[0], list):
        return (my_list(std_list[0]) + my_list(std_list[1:]))

    return (std_list[:1] + my_list(std_list[1:]))


print(my_list(nice_list))