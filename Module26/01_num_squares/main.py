class MyIterator:
    def __init__(self):
        self.count = 0

    def __iter__(self):
        self.n = int(input('Сколько числе в последовательности? '))
        return self

    def __next__(self):
        self.count += 1
        if self.count == self.n + 1:
            raise StopIteration
        return f'{self.count} ** 2 = {self.count ** 2}'


iter = MyIterator()
for elem in iter:
    print(elem)


def generator(num):
    for el in range(1, num + 1):
        yield f'{el} ** 2 = {el ** 2}'


num = int(input('Сколько числе в последовательности? '))
gen = generator(num)
for el in gen:
    print(el)


def gen_exp(item):
    for i, x in enumerate(item):
        print(f'{i+1} ** 2 = {x}')


num = int(input('Сколько числе в последовательности? '))
exp = ((x ** 2) for x in range(1, num + 1))
print(gen_exp(exp))
