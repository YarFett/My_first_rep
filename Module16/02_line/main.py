
class_list1 = list(range(160, 178, 2))
class_list2 = list(range(162, 183, 3))

class_list1.extend(class_list2)

class_list1.sort()

print('Отсортированный список учеников:', class_list1)
