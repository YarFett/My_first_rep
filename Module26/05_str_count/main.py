import os
from collections.abc import Iterable


def gen_files_dir(way: str) -> Iterable[str]:
    if os.path.isdir(way):
        for top, dirs, files in os.walk(way):
            for name in files:
                if name.endswith('.py'):
                    count = 0
                    with open(os.path.join(top, name), 'r', encoding='utf-8') as f:
                        for line in f:
                            if not line.isspace() and not line.startswith('#'):
                                count += 1
                        yield f'Этот файл: {os.path.join(top, name)}\nИмеет полных строк: {count}\n'
    else:
        raise TypeError


direct = gen_files_dir('D:\Studing Python\Python_Basic\module_25')

for i in direct:
    print(i)
