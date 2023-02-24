import collections
import zipfile

def zip_file(archive):
    zfile = zipfile.ZipFile(archive, 'r')
    for name in zfile.namelist():
        zfile.extract(name)
    zfile.close()

def function_of_stats(file):
    result = {}
    if file.endswith('.zip'):
        zip_file(file)
        file = ''.join((file[:-3], 'txt'))
    text_file = open(file, 'r', encoding='utf-8')
    for i_line in text_file:
        for item in i_line:
            if item.isalpha():
                if item not in result:
                    result[item] = 0
                result[item] += 1
    text_file.close()

    return result


def print_stats(stats):
    for letter, count in stats.items():
        print(letter, count)

def sorting(stats_dict):
    sorted_values = sorted(stats_dict.values())
    sorted_dict = collections.OrderedDict()
    for value in sorted_values:
        for key in stats_dict.keys():
            if stats_dict[key] == value:
                sorted_dict[key] = stats_dict[key]
    return sorted_dict

file = 'voyna-i-mir.zip'
stats = function_of_stats(file)
stats = sorting(stats)
print_stats(stats)