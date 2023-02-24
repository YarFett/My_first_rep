class Parent:
    def __init__(self, name, age, children):
        self.name = name
        self.age = age
        self.children = children

    def __str__(self):
        return self.name + ' ' + str(self.age) + ' лет' + '\n' + \
               '\n'.join([str(child) for child in self.children])

    def calm(self, child):
        for x in self.children:
            if x is child:
                x.is_calm = True

    def feed(self, child):
        for x in self.children:
            if x is child:
                x.is_feed = True


class Child:
    def __init__(self, name, age, is_calm, is_feed):
        self.name = name
        self.age = age
        self.is_calm = is_calm
        self.is_feed = is_feed

    def __str__(self):
        return self.name + ' ' + str(self.age) + ' лет' + \
               (' Спокоен' if self.is_calm else ' Раздражен') + \
               (' Сыт' if self.is_feed else ' Голоден')


Petya = Child('Петя', 6, True, False)
Tanya = Child('Таня', 5, False, False)
Yaroslav = Parent('Ярослав', 29, [Petya, Tanya])

print(Yaroslav)

Yaroslav.calm(Tanya)
print(Yaroslav)

Yaroslav.feed(Tanya)
print(Yaroslav)

Yaroslav.feed(Petya)
print(Yaroslav)