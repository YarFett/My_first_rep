from random import randint


class House:
    food = 50
    money = 0


class Person:

    def __init__(self, name):
        self.name = name
        self.satiety = 50

    def eat(self):
        self.satiety += 1
        House.food -= 1
        return f'ест, сытость {self.satiety} еда {House.food}'

    def work(self):
        self.satiety -= 1
        House.money += 1
        return f'работает, сытость {self.satiety} деньги {House.money}'

    def play(self):
        self.satiety -= 1
        return f'играет, сытость {self.satiety}'

    def repast(self):
        House.food += 1
        House.money -= 1
        return f'идет в магазин, еда {House.food} деньги {House.money}'


def play(person):
    number_cubes = randint(1, 6)
    if person.satiety < 0:
        print(f'К сожалению, {person.name} помер с голоду ')
        return 1
    if person.satiety < 20 and House.food >= 10:
        text = person.eat()
    elif House.food < 10:
        text = person.repast()
    elif House.money < 50:
        text = person.work()
    elif number_cubes == 1:
        text = person.work()
    elif number_cubes == 2:
        text = person.eat()
    else:
        text = person.play()
    print(person.name, text)
    return 0


person_1 = Person('Ярослав')
person_2 = Person('Марина')

for day in range(365):
    print('День', day + 1)
    if play(person_1) or play(person_2):
        print('все плохо')
    if day == 364:
        print('выжили')