class Potato:
    states = {0: 'Отсутствует', 1: 'Росток', 2: 'Зеленая', 3: 'Зрелая'}

    def __init__(self, index):
        self.index = index
        self.state = 0

    def grow(self):
        if self.state < 3:
            self.state += 1
        self.print_states()

    def print_states(self):
        print('Картошка {} сейчас {}.'.format(self.index, Potato.states[self.state]))

    def is_ripe(self):
        if self.state == 3:
            return True
        return False


class PotatoGarden:

    def __init__(self, count):
        self.potatoes = [Potato(index) for index in range(1, count + 1)]

    def grow_all(self):
        print('Картошка прорастает!')
        for i_potato in self.potatoes:
            i_potato.grow()

    def are_all_ripe(self):
        if not all([i_potato.is_ripe() for i_potato in self.potatoes]):
            print('Картошка ещё не созрела!\n')
        else:
            print('Вся картошка созрела. Можно собирать!\n')


class Gardener:

    def __init__(self, name, bed):
        self.name = name
        self.bed = bed

    def gardener_info(self):
        print('Имя садовника: {}\nСобрал картошки: {}'.format(self.name, self.bed))

    def tend(self, my_garden):
        if all([i_potato.is_ripe() for i_potato in my_garden.potatoes]):
            question = int(input('Собрать картошку?\n1-да, 2-нет\n'))
            if question == 1:
                potato_count = 0
                for i_potato in my_garden.potatoes:
                    worker.bed += 1
                    potato_count += 1
                    i_potato.state = 0
                print('{} собрал {} картофелин.'.format(worker.name, potato_count))
                worker.gardener_info()
        else:
            question = int(input('Отправить {}а ухаживать за картошкой?\n1-да, 2-нет\n'.format(worker.name)))
            if question == 1:
                my_garden.grow_all()
                my_garden.are_all_ripe()


my_garden = PotatoGarden(5)
worker = Gardener('Ярослав', 0)

while True:
    Gardener.tend(worker, my_garden)
    if worker.bed == len(my_garden.potatoes):
        break


