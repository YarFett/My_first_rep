symbols = list(' !@#$%^&*()<>,."?')

def rev(string):
    prog = list(string)
    prog1 = []
    for item in range(len(string)):
        if prog[item] not in symbols:
            prog1.insert(0, prog[item])
        if prog[item] in symbols:
            prog1.append(prog[item])

    return ''.join(prog1)

message = (input('Введите сообщение: ')).split()

for point in message:
    point = list(point)
    new_point = rev(point)
    print(new_point, end=' ')





