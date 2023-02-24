def height(man):
    if man not in tree:
        return 0
    else:
        return 1 + height(tree[man])


tree = {}
n = int(input('Введите количество человек: '))
for i in range(n - 1):
    child, parent = input(f'{i+1}-я пара: ').split()
    tree[child] = parent

heights = {}
for man in set(tree.keys()).union(set(tree.values())):
    heights[man] = height(man)

print('\n"Высота каждого члена семьи:"')
for key, value in sorted(heights.items()):
    print(key, value)