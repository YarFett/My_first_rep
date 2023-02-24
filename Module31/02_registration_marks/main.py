import re

text = 'А578ВЕ777 ОР233787 К901МН666 СТ46599 СНИ2929П777 666АМР666'

res1 = re.findall(r'\b[АВЕКМНОРСТУХ]\d{3}\w{5}', text)
print('Список номеров частных автомобилей:', res1)

res2 = re.findall(r'\b[АВЕКМНОРСТУХ]\w{2}\d{4,5}\b', text)
print('Список номеров такси:', res2)