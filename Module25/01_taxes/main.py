class Property:
    def __init__(self, worth):
        self.worth = worth

    def tax(self):
        pass


class Apartment(Property):
    def __init__(self, worth):
        super().__init__(worth)

    def tax(self):
        return self.worth / 1000


class Car(Property):
    def __init__(self, worth):
        super().__init__(worth)

    def tax(self):
        return self.worth / 200


class CountryHouse(Property):
    def __init__(self, worth):
        super().__init__(worth)

    def tax(self):
        return self.worth / 500


money = int(input('Введите количество имеющихся денег: '))
print('Введите стоимость имущества: ')

wroth_1 = float(input('Квартира: '))
nalog_appart = Apartment(wroth_1)
print('Налог на квартиру {}'.format(nalog_appart.tax()))

wroth_2 = float(input('Машина: '))
nalog_car = Car(wroth_2)
print('Налог на машину {}'.format(nalog_car.tax()))

wroth_3 = float(input('Дача: '))
nalog_contryhouse = CountryHouse(wroth_3)
print('Налог на дачу {}'.format(nalog_contryhouse.tax()))

sum_nalog = nalog_appart.tax() + nalog_car.tax() + nalog_contryhouse.tax()

if sum_nalog < money:
    print('Всего налога на сумму {}, а у вас только {}'.format(sum_nalog, money))
    print('Денег не хватает')
else:
    print('Всего налога на сумму {}\nОтлично, денег хватает '.format(sum_nalog))