
file = open('text.txt', 'r')
new_file = open('analysis.txt', 'w')
letters_dict = dict()
clear_letters = list()

for item in file:
    item = item.lower()
    for letter in item:
        if letter.isalpha():
            clear_letters.append(letter)
            letters_dict[letter] = item.count(letter)


for key, value in letters_dict.items():
    new_value = round((value / len(clear_letters)), 3)
    letters_dict[key] = new_value

set_of_val = set(letters_dict.values())
list_of_keys = list(sorted(letters_dict.keys()))

sorted_dict = {}
for num in set_of_val:
    for key in list_of_keys:
        if letters_dict[key] == num:
            sorted_dict[key] = num

for key, value in sorted_dict.items():
    new_file.write('{} {}\n'.format(key, value))

file.close()
new_file.close()