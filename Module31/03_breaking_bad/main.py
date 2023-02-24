import requests
import json

my_req = requests.get('https://breakingbadapi.com/api/deaths')

data = json.loads(my_req.text)


with open('deaths.json', 'w') as file:

    my_list = []
    for info in data:
        my_list.append(info['number_of_deaths'])
    for item in data:
        if item['number_of_deaths'] == max(my_list):
            json.dump(item, file, indent=4)
