import math

def point_in_circle(x_point, y_point, r):
    hypotenuse = math.sqrt(x_point ** 2 + y_point ** 2)
    if hypotenuse <= r:
        print('Монетка где-то рядом')

    else:
        print('Монетки в области нет')

print('Введите координаты монетки:\n')
x = float(input('X: '))
y = float(input('Y: '))
radius = float(input('Введите радиус: '))

point_in_circle(x, y, radius)