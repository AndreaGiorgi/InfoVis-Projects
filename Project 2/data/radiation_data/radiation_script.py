import json

def main():
    
    with open('radnett_data_2930-07-2021.json') as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()
    
    norway = {}
    
    for index in range(33):
        county = jsonObject[index]['county']
        
        total_value = 0
        
        if county not in norway:
            norway[county] = {}
            norway[county]['radiations'] = 0
        
        for value_index in range(24):
            total_value += float(jsonObject[index]['measurements'][value_index]['value'])
        
        average = total_value/24
        average_daily_value = "{:.3f}".format(average)
        norway[county]['radiations'] = "{:.3f}".format(float(norway[county]['radiations']) + float(average_daily_value))
        
    for k, v in norway.items():
        print(k, v)
        
    

if __name__ == '__main__':
    main()