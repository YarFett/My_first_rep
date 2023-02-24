def short_len(str, tpl):
    return min(len(str), len(tpl))


text = 'abcd'
num_tpl = (10, 20, 30, 40)

pairs = ((text[item], num_tpl[item])
             for item in range(short_len(text, num_tpl)))


print(pairs)
for point in pairs:
    print(point)