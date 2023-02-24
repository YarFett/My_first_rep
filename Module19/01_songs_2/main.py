violator_songs = {
    'World in My Eyes': 4.86,
    'Sweetest Perfection': 4.43,
    'Personal Jesus': 4.56,
    'Halo': 4.9,
    'Waiting for the Night': 6.07,
    'Enjoy the Silence': 4.20,
    'Policy of Truth': 4.76,
    'Blue Dress': 4.29,
    'Clean': 5.83
}

summ = 0

count = int(input('Сколько песен выбрать? '))

for _ in range(1, count+1):
    song = input('Название {}-й песни: '.format(_))
    if song in violator_songs:
        summ += violator_songs.get(song)
    else:
        print('Такой песни нет.')
print('Общее время звучания песен:', round(summ, 2), 'минуты')