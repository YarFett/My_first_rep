alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'


def get_encrypted_word(message, key):
    translated_step_1 = ''
    translated_step_2 = ''
    for symbol in message:
        if symbol in alphabet:
            num = alphabet.find(symbol)
            translated_step_1 += alphabet[num-key]
        else:
            translated_step_1 += symbol
    replace_index = 3
    for word in translated_step_1.split(' '):
        new_word = ''
        for index in range(len(word)):
            new_word += (word[index - replace_index % len(word)])
        if new_word.endswith('/'):
            replace_index += 1
        translated_step_2 += new_word + ' '
    translated_step_2 = translated_step_2.replace('/', '\n')
    return translated_step_2


crypted_string = 'vujgvmCfb tj ufscfu ouib z/vhm jdjuFyqm jt fscfuu uibo jdju/jnqm fTjnqm tj scfuuf ibou fy/dpnqm ' \
                 'yDpnqmf jt cfuufs boui dbufe/dpnqmj uGmb tj fuufsc ouib oftufe/ bstfTq jt uufscf uibo otf/ef uzSfbebcjmj ' \
                 'vout/dp djbmTqf dbtft (ubsfo djbmtqf hifopv up csfbl ifu t/svmf ipvhiBmu zqsbdujdbmju fbutc uz/qvsj Fsspst ' \
                 'tipvme wfsof qbtt foumz/tjm omfttV mjdjumzfyq odfe/tjmf Jo fui dfgb pg hvjuz-bncj gvtfsf fui ubujpoufnq up ' \
                 'ftt/hv Uifsf vmetip fc pof.. boe sbcmzqsfgf zpom pof pvt..pcwj xbz pu pe ju/ Bmuipvhi uibu bzx bzn puo cf wjpvtpc ' \
                 'bu jstug ttvomf sfzpv( i/Evud xOp tj scfuuf ibou /ofwfs uipvhiBm fsofw jt fopgu cfuufs boui iu++sjh x/op gJ ifu nfoubujpojnqmf ' \
                 'tj eibs pu mbjo-fyq tju( b bec /jefb Jg fui foubujpojnqmfn jt fbtz up bjo-fyqm ju znb cf b hppe jefb/ bnftqbdftO bsf pof ' \
                 'ipoljoh sfbuh efbj .. fu(tm pe psfn gp tf"uip'

print(get_encrypted_word(crypted_string, 1))