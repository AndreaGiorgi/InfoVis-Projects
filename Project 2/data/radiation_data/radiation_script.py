import json
import os

def main():
    
    stations = {}
    location = os.getcwd()
    recordIndex = 0
    
    for file in os.listdir(location):
        try:
           
            if file.endswith(".json"):
    
                with open(file) as jsonFile:
                    jsonObject = json.load(jsonFile)
                    jsonFile.close()
                
                
                for index in range(33):
                    station = jsonObject[index]['name']
                    lat = jsonObject[index]['lat']
                    lon = jsonObject[index]['lon']
                    
                    if station not in stations:
                        
                        stations[station] = {}
                        stations[station]["lon"] = lon
                        stations[station]["lat"] = lat
                        
                        
                    total_value = 0
                    
                    for value_index in range(24):
                        total_value += float(jsonObject[index]['measurements'][value_index]['value'])
                        
                    average = total_value/24
                    average_daily_value = "{:.3f}".format(average)
                        
                    value = "value" + str(recordIndex)
                    stations[station][value] = average_daily_value
                recordIndex += 1 
                

        
        except Exception as e:
            print(e)
            raise e
    
    with open('stations_fixed_data.json', 'w+', encoding='utf-8') as f:
        json.dump(stations, f, ensure_ascii=False, indent=4)
        

if __name__ == '__main__':
    main()