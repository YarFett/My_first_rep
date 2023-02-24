class MyDict(dict):
    def get(self, key, default=0):
        return super().get(key, default)


my_dict = MyDict()
my_dict['X'] = 1
my_dict['Y'] = 2
my_dict['Z'] = 3
print(my_dict)
print(my_dict.get('t'))

