import math


class Circle:
    def __init__(self, x=0, y=0, r=1):
        self.x = x
        self.y = y
        self.r = r

    def area(self):
        return  math.pi * self.r ** 2

    def perimeter(self):
        return 2 * self.r * math.pi

    def rise(self, k):
        self.r *= k

    def intersect(self, other):
        return (self.x - other.x) ** 2 + (self.y - other.y) ** 2 <= (self.r + other.r) ** 2


circle1 = Circle()
circle2 = Circle()
circle2.rise(4)
circle2.x = 1
circle2.y = 1
print(circle1.area())
print(circle1.perimeter())
circle1.rise(3)
print(circle1.area())
print(circle1.perimeter())
print(circle1.intersect(circle2))
