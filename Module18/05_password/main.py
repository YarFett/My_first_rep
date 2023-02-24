while True:
    password = list(input('Придумайте пароль: '))
    password_length = len(password)
    capital_length = len(list(filter(lambda true_password: true_password.isupper(), password)))
    numbers_count = len(list(filter(lambda true_password: true_password.isdigit(), password)))
    if password_length >= 8 and capital_length >= 1 and numbers_count >= 3:
        print('Это надёжный пароль!')
        break
    else:
        print('Пароль ненадёжный. Попробуйте ещё раз.')