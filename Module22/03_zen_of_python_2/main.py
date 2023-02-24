import os

file_path = os.path.abspath(os.path.join('..', '02_zen_of_python', 'zen.txt'))

text_file = open(file_path, 'r')
text = text_file.readlines()
list_of_symbols = [' ', ',', '.', '-', "'", '!', '?', '\n', '--']

count_of_words = 0
for sentence in text:
    new_sentence = sentence.split()
    for word in new_sentence:
        if word not in list_of_symbols:
            count_of_words += 1

count_of_strings = 0
count_of_letters = 0
for item in text:
    count_of_strings += 1
    for letter in item:
        if letter not in list_of_symbols:
            count_of_letters += 1

print('Количество букв в файле:', count_of_letters)
print('Количество слов в файле:', count_of_words)
print('Количетсво строк в файле:', count_of_strings)

text_file.close()