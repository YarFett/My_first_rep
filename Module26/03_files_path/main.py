import os
from _collections_abc import Iterable


def gen_files_path(link: str, search: str) -> Iterable[str]:
    for link, dirs, files in list(os.walk(link)):
        for file in files:
            yield link + '\\' + file
            if link.split('\\')[-1] == search:
                return


f = gen_files_path('D:', 'main.py')
for elem in f:
    print(elem)