players = {
    ("Ivan", "Volkin"): (10, 5, 13),
    ("Bob", "Robbin"): (7, 5, 14),
    ("Rob", "Bobbin"): (12, 8, 2)
}

new_type = list()

for keys, values in players.items():
    keys = list(keys)
    for value in values:
        keys.append(value)
    new_type.append(tuple(keys))

print(new_type)



