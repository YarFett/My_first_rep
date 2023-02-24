import os


def save_files(string):
    way = input('Куда хотите сохранить документ? Введите последовательность папок (через пробел): ')
    filename = input('Введите имя файла: ')
    r_path = way.replace(" ", "/")
    real_path = os.path.join(r_path, filename)
    path = str('D:/' + real_path)
    check_file = os.path.exists(path)
    if check_file:
        print('Файл с таким именем уже существует!')
        ans_q = input('Вы действительно хотите перезаписать файл? ').lower()
        if ans_q == 'да' or ans_q == 'yes':
            f = open(path, 'w')
            f.write(string)
            f.close()
            print('Файл успешно перезаписан!')
        else:
            print('Файл не перезаписан')
    else:
        f = open(path, 'w')
        f.write(string)
        f.close()
        print('Файл успешно сохранён!')


save_files(input('Введите строку: '))
