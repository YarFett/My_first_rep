print(list(filter(lambda x: all(map(lambda i: x % i != 0, range(2, int(x ** 0.5) + 1))), range(2, 1000))))


result = list()
for k in range(2, 1000):
    prime = True
    for i in range(2, k):
        if k % i == 0:
            prime = False
            break
    if prime:
        result.append(k)
print(result)
