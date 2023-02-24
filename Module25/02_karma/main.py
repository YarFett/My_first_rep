import random


class Buddist:
    def __init__(self, karma=0):
        self.__karma = karma

    def get_karma(self):
        return self.__karma

    def set_karma(self, light):
        self.__karma += light


def one_day(count):
    if random.randint(1, 10) == 1:
        with open('karma.log', 'a', encoding='utf-8') as karma_log:
            miscount = random.choice(['KillError', 'DrunkError', 'CarCrashError', 'GluttonyError', 'DepressError'])
            karma_log.write(f'день {count}: косяк - {miscount}\n')
            return False
    return random.randint(1, 7)


buddist = Buddist()
day = 0
while buddist.get_karma() < 500:
    day += 1
    if one_day(day):
        pass
    else:
        buddist.set_karma(one_day(day))

print('Добро пожаловать.')
