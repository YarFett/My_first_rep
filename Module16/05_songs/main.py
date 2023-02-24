violator_songs = [
    ['World in My Eyes', 4.86],
    ['Sweetest Perfection', 4.43],
    ['Personal Jesus', 4.56],
    ['Halo', 4.9],
    ['Waiting for the Night', 6.07],
    ['Enjoy the Silence', 4.20],
    ['Policy of Truth', 4.76],
    ['Blue Dress', 4.29],
    ['Clean', 5.83]
]

count_of_songs = (int(input("Сколько песен выбрать? ")))
summ_time = 0

for item in range(count_of_songs):
    song = input('Название ' + str(item+1) + '-й песни: ')
    for check in range(len(violator_songs)):
        if song == violator_songs[check][0]:
            summ_time += violator_songs[check][1]

print('Общее время звучания песен:', round(summ_time, 2), 'минуты')

