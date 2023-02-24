import random


class Warrior:

    def __init__(self, name, health=100, attack=20):
        self.health = health
        self.attack = attack
        self.name = name

    def hit(self, target):
        if type(self) == type(target):
            target.health -= self.attack
        else:
            raise TypeError


warriors = [Warrior('Аббадон'), Warrior('Молох')]
while True:
    i = random.randint(0, 1)
    warrior, victim = warriors[i], warriors[i - 1]
    warrior.hit(victim)
    print('{} атаковал {}а'.format(warrior.name, victim.name))
    print('У {}а осталось {} здоровья'.format(victim.name, victim.health))
    if victim.health <= 0:
        print('{} победил!'.format(warrior.name))
        break


