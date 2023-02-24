class Date:

    '''Класс даты, возвращающий дату.
    метод is_date_valid - проверяет на корректность даты.
    метод from_string - возвращает указанную дату разбивая на день, месяц, год.'''

    def __init__(self, day: int = 0, month: int = 0, year: int = 0) -> None:
        self.day = day
        self.month = month
        self.year = year

    def __str__(self) -> str:
        return f'День: {self.day}\tМесяц: {self.month}\tГод: {self.year}'

    @classmethod
    def is_date_valid(cls, date: str) -> bool:
        my_list = date.split('-')
        day, month, year = int(my_list[0]), int(my_list[1]), int(my_list[2])
        return (0 < day <= 31) and (0 < month <= 12) and (0 < year <= 2080)

    @classmethod
    def from_string(cls, date: str) -> 'Date':
        day, month, year = map(int, date.split('-'))
        date_object = cls(day, month, year)
        return date_object


my_date = Date.from_string('10-12-2077')
print(my_date)
print(Date.is_date_valid('10-12-2077'))
print(Date.is_date_valid('40-12-2077'))


