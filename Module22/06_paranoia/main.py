import string

alpha = list(string.ascii_letters)

file = open('text.txt', 'r')
new_file = open('cipher.txt', 'w')

for key, item in enumerate(file):
    new_item = ''
    for point in item:
        if point in alpha:
            new_index = alpha.index(point) + key + 1
            new_item += alpha[new_index]
    new_file.write(new_item + '\n')

file.close()
new_file.close()

