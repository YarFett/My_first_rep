data = {
    "address": "0x544444444444",
    "ETH": {
        "balance": 444,
        "total_in": 444,
        "total_out": 4
    },
    "count_txs": 2,
    "tokens": [
        {
            "fst_token_info": {
                "address": "0x44444",
                "name": "fdf",
                "decimals": 0,
                "symbol": "dsfdsf",
                "total_supply": "3228562189",
                "owner": "0x44444",
                "last_updated": 1519022607901,
                "issuances_count": 0,
                "holders_count": 137528,
                "price": False
            },
            "balance": 5000,
            "totalIn": 0,
            "total_out": 0
        },
        {
            "sec_token_info": {
                "address": "0x44444",
                "name": "ggg",
                "decimals": "2",
                "symbol": "fff",
                "total_supply": "250000000000",
                "owner": "0x44444",
                "last_updated": 1520452201,
                "issuances_count": 0,
                "holders_count": 20707,
                "price": False
            },
            "balance": 500,
            "totalIn": 0,
            "total_out": 0
        }
    ]
}
print('Пункт первый!')
for key, value in data.items():
    if key == "ETH":
        print('\n' + key + ':')
        for eth_key, eth_value in value.items():
            print(eth_key + ':', eth_value)
    elif key == "tokens":
        print('\n' + key + ':')
        for item in data["tokens"]:
            for i_key, i_value in item.items():
                if i_key == "fst_token_info":
                    print('\n' + i_key + ':')
                    for fst_key, fst_value in i_value.items():
                        print(fst_key + ':', fst_value)
                elif i_key == "sec_token_info":
                    print('\n' + i_key + ':')
                    for sec_key, sec_value in i_value.items():
                        print(sec_key + ':', sec_value)
                else:
                    print(i_key + ':', i_value)
    else:
        print('\n' + key + ':', value)

print('\nПункт второй!')

data["ETH"]["total_diff"] = 100
print(data["ETH"])

print('\nПункт третий!')

data["tokens"][0]["fst_token_info"]['name'] = 'doge'
print(data["tokens"][0]["fst_token_info"])

print('\nПункт четвертый!')

data["ETH"]["total_out"] = 0
print(data["ETH"])

del data["tokens"][0]["total_out"]
del data["tokens"][1]["total_out"]
print(data["tokens"][0])
print(data["tokens"][1])

print('\nПункт пятый!')
data["tokens"][1]["sec_token_info"]['total_price'] = data["tokens"][1]["sec_token_info"].pop('price')
print(data["tokens"][1]["sec_token_info"])