import json

def main():
    
    counties = {}
    
    with open('radnett_data_2122-07-2021.json') as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()
    
    for index in range(33):
        station = jsonObject[index]['location']
        county = jsonObject[index]['county']
        
        total_value = 0
        
        for value_index in range(24):
            total_value += float(jsonObject[index]['measurements'][value_index]['value'])
        
        average = total_value/24
        average_daily_value = "{:.3f}".format(average)
        print(station + " " + county + "  value: " + average_daily_value)
        
    

if __name__ == '__main__':
    main()