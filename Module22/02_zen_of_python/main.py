text_file = open('zen.txt', 'r')
s = text_file.readlines()
s.reverse()
for key, item in enumerate(s):
    if key == 1:
        print('\n' + item.strip('\n'))
    else:
        print(item, end='')
text_file.close()
