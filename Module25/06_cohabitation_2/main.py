import random


class House:
    money = 100
    food = 50
    cat_food = 30
    dirt = 0
    fur_coat = 0
    earned = 0
    food_eaten = 0
    cat_ate = 0

    def __init__(self, family):
        self.family = family

    def cleaning(self):
        House.dirt += 5

    def life(self):
        for i_member in self.family:
            if House.dirt >= 90 and not isinstance(i_member, Cat):
                i_member.happines -= 10
            if isinstance(i_member, Cat) and House.cat_food >= 20 <= i_member.satiety:
                cat.eat()
                print('Кот поел.')
                House.cat_ate += 10
            elif isinstance(i_member, Cat):
                if random.randint(1, 2) == 1:
                    House.dirt += 5
                    print('Кот подрал обои.')
                else:
                    cat.satiety -= 10
                    print('Кот спит.')
            elif House.food >= 60 and i_member.satiety <= 30:
                i_member.eat()
                print(i_member.name, 'поел')
                House.food_eaten += 30
            elif isinstance(i_member, Husband):
                if House.money <= 150:
                    husband.work_day()
                    print('HELP! ME! HELP! ME!')
                    House.earned += 150
                elif husband.happiness <= 50:
                    husband.game()
                    print('Каеф...')
                elif husband.happiness <= 70:
                    husband.petting_cat()
                    print('Гладит кота.')
                else:
                    husband.work_day()
                    print('Работает.')
                    House.earned += 150
            elif isinstance(i_member, Wife):
                if House.food <= 60 and House.money > 100:
                    wife.buy_food()
                elif House.cat_food <= 20:
                    wife.buy_cat_food()
                elif House.dirt >= 50:
                    wife.clean()
                    print('Уборка.')
                elif wife.happiness <= 70:
                    wife.petting_cat()
                    print('Гладит кота.')
                elif House.money > 450:
                    wife.purchase()
                    print('Покупка шубы.')
                    House.fur_coat += 1
                else:
                    wife.petting_cat()
                    print('Гладит кота.')


class Members:
    def __init__(self, name=None, satiety=None, happiness=None):
        self.name = name
        self.satiety = satiety
        self.happiness = happiness

    def eat(self):
        self.satiety += 30
        House.food -= 30


class Husband(Members):
    def __init__(self, name, satiety=30, happiness=100, work=150):
        super().__init__(name, satiety, happiness)
        self.work = work

    def work_day(self):
        House.money += self.work
        self.satiety -= 10
        print('Работа.')

    def petting_cat(self):
        self.happiness += 5
        self.satiety -= 10

    def game(self):
        self.happiness += 20
        self.satiety -= 10


class Wife(Members):
    def __init__(self, name, satiety=30, happiness=100):
        super().__init__(name, satiety, happiness)

    def buy_food(self):
        House.money -= 100
        House.food += 100

    def buy_cat_food(self):
        House.money -= 50
        House.cat_food += 50

    def petting_cat(self):
        self.happiness += 5
        self.satiety -= 10

    def purchase(self):
        House.money -= 350
        self.happiness += 60
        self.satiety -= 10

    def clean(self):
        House.dirt -= 100
        self.satiety -= 10


class Cat(Members):
    def __init__(self, name, satiety=30):
        super().__init__(name, satiety)

    def eat(self):
        self.satiety += 20
        House.cat_food -= 10

    def shitting(self):
        House.dirt += 5


def end_of_life(family):
    for member in family:
        if member.satiety <= 0:
            print('Один из жильцов умер от голода.')
            return True
        elif member.happiness == 0 and not isinstance(member, Cat):
            print('Один из жилцов умер от депрессии.')
            return True
        else:
            return False


husband = Husband('Ярослав')
wife = Wife('Марина')
cat = Cat('Фиби')
family_list = [husband, wife, cat]
house = House(family_list)

for day in range(1, 366):
    print(f'День {day}')
    house.cleaning()
    if end_of_life(family_list):
        print('Эксперимент не удался.')
        break
    elif day == 365:
        print('\nВсе живы\n')
    else:
        house.life()

print(f'\nЗа год:\n'
      f'Куплено шуб: {House.fur_coat}\n'
      f'Заработано: {House.earned}\n'
      f'Съедено: {House.food_eaten}\n'
      f'Кот съел: {House.cat_ate}'
      )

