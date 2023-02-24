def QHof(start):
    if start != [1, 1]:
        return
    seq = start[:]
    while 1:
        q = seq[-seq[-1]] + seq[-seq[-2]]
        seq.append(q)
        yield q


Q = QHof([1, 2])
print([next(Q) for _ in range(10)])

