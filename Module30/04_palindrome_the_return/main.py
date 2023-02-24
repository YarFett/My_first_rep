from collections import Counter


def can_be_poly(name: str) -> bool:
    return len(list(filter(lambda x: x % 2, Counter(name).values()))) <= 2


print(can_be_poly('abcba'))
print(can_be_poly('abbbc'))
