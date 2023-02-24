import re
from collections import Counter

file = '''As genius of enlightenment does prepare any,
So does experience and so genius does,
The One is son of agonizing errors,
The friend of paradoxes's the other one,
And as the God for the contrive is chance,
They all present at once, oh, so many
Miraculous revelations just to us.'''

f = ''
for line in file:
    f = f + line

g = Counter(re.findall('[a-z]', f.lower()))
for b in g:
    print(f'{b} {g[b] / sum(g.values()):.3f}')


def sort_by_values(letters):
    sorted_dict = {}
    sorted_values = reversed(sorted(letters.values()))
    for i in sorted_values:
        for k in letters.keys():
            if letters[k] == i:
                sorted_dict[k] = letters[k]
    return sorted_dict


def sort_by_keys(letters):
    sorted_dict = {}
    sorted_keys = reversed(sorted(letters, key=letters.get))
    for w in sorted_keys:
        sorted_dict[w] = letters[w]
    return sorted_dict
