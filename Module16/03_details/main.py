shop = [['каретка', 1200], ['шатун', 1000], ['седло', 300],
        ['педаль', 100], ['седло', 1500], ['рама', 12000],
        ['обод', 2000], ['шатун', 200], ['седло', 2700]]

name = input('Название детали: ')

prices = [product[1] for product in shop if product[0] == name]
print(f'Кол-во деталей - { len(prices) } \nОбщая стоимость - { sum(prices) } ')


