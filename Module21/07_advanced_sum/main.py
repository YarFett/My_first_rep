def sum(*args):
    summ = 0
    for arg in args:
        if isinstance(arg, list):
            for sub_arg in arg:
                sub_arg = sum(sub_arg)
                summ += sub_arg
        else:
            summ += arg
    return summ

# print(sum([[1, 2, [3]], [1], 3]))
print(sum(1, 2, 3, 4, 5))
