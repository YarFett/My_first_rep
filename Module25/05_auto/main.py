import math
import random
import time


class Automobile:
    def __init__(self, x, y, angle):
        self.x = x
        self.y = y
        self.angle = angle
        self.distance = 0

    def meter(self, new_x, new_y):
        AC = abs(abs(self.x)) - abs(new_x)
        BC = abs(abs(self.y)) - abs(new_y)
        AB = round(math.sqrt(AC ** 2 + BC ** 2), 2)
        self.distance += AB
        return AB

    def move(self):
        if 0 < self.angle <= 90:
            new_x = random.randint(self.x, self.x + 2)
            new_y = random.randint(self.y, self.y + 2)
        elif 90 < self.angle <= 180:
            new_x = random.randint(self.x, self.x + 2)
            new_y = random.randint(self.y - 2, self.y)
        elif 180 < self.angle <= 270:
            new_x = random.randint(self.x - 2, self.x)
            new_y = random.randint(self.y - 2, self.y)
        else:
            new_x = random.randint(self.x - 2, self.x)
            new_y = random.randint(self.y, self.y + 2)
        pass_distance = self.meter(new_x, new_y)
        self.x = new_x
        self.y = new_y
        self.angle = random.randint(0, 360)

    def __str__(self):
        return f'\nКоординаты машины: {self.x}, {self.y}\nПройденное расстояние: {self.distance} км'


class Bus(Automobile):
    def __init__(self, x, y, angle):
        super().__init__(x, y, angle)
        self.passengers = 0
        self.cash = 0
        self.distance = 0
        self.pass_distance = 0

    def move(self):
        if 0 < self.angle <= 90:
            new_x = random.randint(self.x, self.x + 2)
            new_y = random.randint(self.y, self.y + 2)
        elif 90 < self.angle <= 180:
            new_x = random.randint(self.x, self.x + 2)
            new_y = random.randint(self.y - 2, self.y)
        elif 180 < self.angle <= 270:
            new_x = random.randint(self.x - 2, self.x)
            new_y = random.randint(self.y - 2, self.y)
        else:
            new_x = random.randint(self.x - 2, self.x)
            new_y = random.randint(self.y, self.y + 2)
        pass_distance = self.meter(new_x, new_y)
        self.x = new_x
        self.y = new_y
        self.angle = random.randint(0, 360)
        self.enter(pass_distance)
        self.exit(pass_distance)

    def exit(self, pass_distance):
        if self.passengers == 0:
            self.enter(pass_distance)
        else:
            self.passengers -= random.randint(0, 4)

    def enter(self, pass_distance):
        if self.passengers > 36:
            while self.passengers > 36:
                self.exit(pass_distance)
        else:
            new_passenger = (random.randint(1, 5))
            self.passengers += new_passenger
            self.cash += new_passenger * 32

    def __str__(self):
        return f'\nКоординаты автобуса: {self.x}, {self.y}\n' \
               f'Пройденное расстояние: {self.distance} км.\n' \
               f'Количество пассажиров: {self.passengers} человек.\n' \
               f'Заработано денег: {self.cash} рублей.'


car = Automobile(0, 0, 120)
bus = Bus(1, 2, 40)


def timing(seconds):
    spent_time = random.randint(300, 900)
    seconds += spent_time
    time_res = time.gmtime(seconds)
    res = time.strftime("%H:%M:%S", time_res)
    print('\nВремя:', format(res))
    return spent_time


seconds = 118800

for pass_time in range(1, 10):
    seconds += timing(seconds)

    car.move()
    print(car)
    bus.move()
    print(bus)
