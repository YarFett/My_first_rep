class Board:
    board = list(range(1, 10))

    def draw_board(self):
        print("-" * 13)
        for i in range(3):
            print("|", self.board[0 + i * 3], "|", self.board[1 + i * 3], "|", self.board[2 + i * 3], "|")
            print("-" * 13)


class PLayer:
    def __init__(self, player_token):
        self.player_token = player_token

    def take_input(self):
        valid = False
        while not valid:
            player_answer = input("Куда поставим " + self.player_token + "? ")
            try:
                player_answer = int(player_answer)
            except:
                print("Некорректный ввод. Вы уверены, что ввели число?")
                continue
            if 1 <= player_answer <= 9:
                if str(Board.board[player_answer - 1]) not in "XO":
                    Board.board[player_answer - 1] = self.player_token
                    valid = True
                else:
                    print("Эта клетка уже занята!")
            else:
                print("Некорректный ввод. Введите число от 1 до 9.")


class Cell:
    def check_win(self):
        win_coord = ((0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6),
                     (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6))
        for each in win_coord:
            if Board.board[each[0]] == Board.board[each[1]] == Board.board[each[2]]:
                return Board.board[each[0]]
        return False


def main():
    board = Board()
    first_token = PLayer('X')
    second_token = PLayer('0')
    check = Cell()
    counter = 0
    win = False
    while not win:
        board.draw_board()
        if counter % 2 == 0:
            first_token.take_input()
        else:
            second_token.take_input()
        counter += 1
        if counter > 4:
            check.check_win()
            if check.check_win():
                print(check.check_win(), "выиграли!")
                break
        if counter == 9:
            print("Ничья!")
            break
    board.draw_board()


main()

input("Нажмите Enter для выхода!")
