def slicer(any_tuple, element):
    if element in any_tuple:
        if any_tuple.count(element) > 1:
            first_index = any_tuple.index(element)
            second_index = any_tuple.index(element, first_index + 1) + 1
            return any_tuple[first_index:second_index]
        else:
            return any_tuple[any_tuple.index(element):]
    else:
        return ()

print(slicer((1, 2, 3, 4, 5, 6, 7, 8, 2, 2, 9, 10), 2))