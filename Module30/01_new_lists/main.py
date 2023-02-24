from typing import List
import math

floats: List[float] = [12.3554, 4.02, 5.777, 2.12, 3.13, 4.44, 11.0001]
names: List[str] = ["Vanes", "Alen", "Jana", "William", "Richards", "Joy"]
numbers: List[int] = [22, 33, 10, 6894, 11, 2, 1]


float_list = list(map(lambda x: round((x ** 3), 3), floats))
print(float_list)

name_list = list(filter(lambda x: len(x) >= 5, names))
print(name_list)

numbers_list = math.prod(numbers)
print(numbers_list)
