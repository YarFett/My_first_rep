site = {
	'html': {
		'head': {
			'title': 'Мой сайт'
		},
		'body': {
			'h2': 'Здесь будет мой заголовок',
			'div': 'Тут, наверное, какой-то блок',
			'p': 'А вот здесь новый абзац'
		}
	}
}


def find_key(struct, key, depth=2):
    if key in struct:
        return struct[key]
    if depth > 1:
        for sub_struct in struct.values():
            if isinstance(sub_struct, dict):
                result = find_key(sub_struct, key, depth - 1)
                if result:
                    break
        else:
            result = None
        return result


user_key = input('Какой ключ ищем? ')
what_do_u_want = input('Хотите ввести максимальную глубину? Y/N: ').lower()
if what_do_u_want == 'n':
    value = find_key(site, user_key)
    print('Значение ключа:', value)
if what_do_u_want == 'y':
    depth_num = int(input('Введите максимальную глубину: '))
    value = find_key(site, user_key, depth=depth_num)
    print('Значение ключа:', value)

