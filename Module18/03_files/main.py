text = input('Название файла: ')

if text.startswith('@№$%^&*().'):
   print("название начинается на один из специальных символов")

elif not text.endswith('.txt') and not text.endswith('.docx'):
   print('неверное расширение файла. Ожидалось .txt или .docx')

else:
   print('Файл назван верно.')
