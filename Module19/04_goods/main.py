goods = {
    'Лампа': '12345',
    'Стол': '23456',
    'Диван': '34567',
    'Стул': '45678',
}

store = {
    '12345': [
        {'quantity': 27, 'price': 42},
    ],
    '23456': [
        {'quantity': 22, 'price': 510},
        {'quantity': 32, 'price': 520},
    ],
    '34567': [
        {'quantity': 2, 'price': 1200},
        {'quantity': 1, 'price': 1150},
    ],
    '45678': [
        {'quantity': 50, 'price': 100},
        {'quantity': 12, 'price': 95},
        {'quantity': 43, 'price': 97},
    ],
}

for product_name, product_code in goods.items():
    item_quantity = 0
    item_cost = 0
    item_total_quantity = 0
    item_total_cost = 0
    for product in store[product_code]:
        item_quantity = 0
        item_cost = 0
        item_quantity += product['quantity']
        item_cost += product['price']
        item_total_cost += item_quantity * item_cost
        item_total_quantity += item_quantity
    print('{0} - {1} шт, общая стоимость {2} рублей'.format(product_name, item_total_quantity, item_total_cost))
