
class Student:

    def __init__(self, name, group_number, estimates):
        self.name = name
        self.group_number = group_number
        self.estimates = estimates
        self.average = sum(estimates) / len(estimates)

    def __str__(self):
        return f'{self.name} | {self.group_number} | {self.estimates} | {self.average}'

    def middle(self):
        return self.average


def data():

    name = input('Введите имя фамилию: ')
    group = input('Введите номер группы: ')
    estimates = list(map(int, input('Введит оценки через пробел: ').split()))
    return name, group, estimates


students_list = [Student(*data()) for _ in range(10)]

print('Список студентов:')
print('ФИ | Группа | Оценки | Средний балл')
for student in students_list:
    print(student)
print()

students_list.sort(key=lambda x: x.middle())
print('Отсортированный Список студентов:')
print('ФИ | Группа | Оценки | Средний балл')
for student in students_list:
    print(student)
