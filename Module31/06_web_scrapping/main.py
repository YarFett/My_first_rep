from bs4 import BeautifulSoup
import requests


url = 'http://www.columbia.edu/~fdc/sample.html'

html_text = requests.get(url).text

soup = BeautifulSoup(html_text, 'html.parser')

my_list = [x.text for x in soup.find_all('h3')]
print(my_list)
