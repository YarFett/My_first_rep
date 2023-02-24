students = {
    1: {
        'name': 'Bob',
        'surname': 'Vazovski',
        'age': 23,
        'interests': ['biology, swimming']
    },
    2: {
        'name': 'Rob',
        'surname': 'Stepanov',
        'age': 24,
        'interests': ['math', 'computer games', 'running']
    },
    3: {
        'name': 'Alexander',
        'surname': 'Krug',
        'age': 22,
        'interests': ['languages', 'health food']
    }
}


def stud_func(stud_dict):
    stud_list = []
    string = ''
    for i in stud_dict:
        stud_list += (stud_dict[i]['interests'])
        string += stud_dict[i]['surname']

    return (f'Полный список интересов всех студентов: {stud_list}'), \
           (f'Общая длина всех фамилий студентов: {len(string)}')

pairs = list()
for id, value in students.items():
    stud_id = id, value['age']
    pairs.append(stud_id)
print('Список пар "ID студента - возраст":', pairs)

main = stud_func(students)
print(main[0])
print(main[1])



