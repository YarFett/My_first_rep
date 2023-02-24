class Figure:

    '''Базовый класс для определения названия фигуры и её площади.'''

    figure_name = 'Фигура'

    def __init__(self, figure_name):
        self.figure_name = figure_name

    def repr(self):
        return self.figure_name

    def _square(self):
        ...

    def get_square(self):
        return self._square()


class Figure2D(Figure):

    ''' Наследованный Класс Figure2D от базового Figure
    Определяем периметр фигуры'''

    def _perimeter(self):
        ...

    def get_perimeter(self):
        return self._perimeter()


class Figure3D(Figure):

    '''Наследованный Класс Figure3D от базового Figure
    Определям наполнение 3D фигуры'''

    sides = []

    def _square(self):
        return sum([x.get_square() for x in self.sides])


class Square(Figure2D):

    '''Наследованный Класс Square от базового Figure2D
    Рассчитываем площадь квадрата'''

    def __init__(self, side):
        self.side = side
        super().__init__('Квадрат')

    def _square(self):
        return self.side ** 2

    def _perimeter(self):
        return 4 * self.side


class Triangle(Figure2D):

    '''Наследованный Класс Triangle от базового Figure2D
    Рассчитываем площадь треугольника'''

    def __init__(self, base, height):
        self.height = height
        self.base = base
        super().__init__('Треугольник')

    def _square(self):
        return (self.base * self.height) / 2

    def _perimeter(self):
        return -1


class Cube(Figure3D):

    '''Наследованный Класс Cube от базового Figure3D
    Рассчитываем площадь поверхности куба'''

    def __init__(self, edge):
        self.sides = [Square(edge)] * 6
        super().__init__('Куб')


class Pyramid(Figure3D):

    '''Наследованный Класс Pyramid от базового Figure3D
    Рассчитываем площадь поверхности пирамиды'''

    def __init__(self, base, height):
        self.sides = [Triangle(base, height)] * 4
        self.sides += [Square(base)]
        super().__init__('Пирамида')


my_cube = Cube(2)
print('Площадь поверхности куба:', my_cube.get_square())
my_pyramid = Pyramid(2, 3)
print('Площадь поверхности пирамиды:', my_pyramid.get_square())
