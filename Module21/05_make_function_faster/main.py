def calculating_math_func(data, cache={}):
    cache = cache if isinstance(cache, dict) else dict()
    if data in cache:
        return cache[data]
    result = 1
    for index in range(1, data + 1):
        result *= index
    result /= data ** 3
    result = result ** 10
    cache[data] = result
    return cache[data]

