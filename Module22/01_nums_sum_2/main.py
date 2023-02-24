numbers = open('numbers.txt', 'r')
list_items = []
for i_line in numbers:
    for item in i_line:
        if item != ' ' and item != '\n':
            list_items.append(int(item))
numbers.close()

answers_file = open('answer.txt', 'w')
answers_file.write(str(sum(list_items)))
answers_file.close()