import DistanceCalculation
import pymongo


def next_bus_stop(stop_data):
    back_up = stop_data
    minimum_distance_1 = 9999999999999999
    minimum_distance_2 = 9999999999999999
    nearest_stop_data_1 = stop_data['stop_seq'][0]
    nearest_stop_data_2 = stop_data['stop_seq'][0]
    current_location = stop_data['currentlocation']
    # current_location=stop_data['stop_seq'][0]['loc']
    for i in range(len(stop_data['stop_seq'])):
        bus_stop = stop_data['stop_seq'][i]['loc']
        #print i
        stop_distance = DistanceCalculation.distance_calculation(bus_stop, current_location)
        if (stop_distance < minimum_distance_1):
            minimum_distance_1 = stop_distance
            nearest_stop_data_1 = stop_data['stop_seq'][i]
            nearest_stop_number_1 = i
    stop_data['stop_seq'].remove(stop_data['stop_seq'][nearest_stop_number_1])

    for j in range(len(stop_data['stop_seq'])):
        bus_stop = stop_data['stop_seq'][j]['loc']
        stop_distance = DistanceCalculation.distance_calculation(bus_stop, current_location)
        if (stop_distance < minimum_distance_2):
            minimum_distance_2 = stop_distance
            nearest_stop_data_2 = stop_data['stop_seq'][j]
            nearest_stop_number_2 = j
    if (nearest_stop_number_1 > nearest_stop_number_2):
        return nearest_stop_data_1, nearest_stop_number_1
    else:
        return nearest_stop_data_2, nearest_stop_number_2


def next_bus_stop_location_time(tripid):
    client = pymongo.MongoClient('localhost', 27017)
    database = client.VTADailyTrips
    trip_1 = database.Trips
    stop_data = trip_1.find_one({'tripid':tripid})
    #print stop_data
    next_busstop_data, seq_num = next_bus_stop(stop_data)
    return next_busstop_data['loc'], seq_num, next_busstop_data['staticArivalTime']


if __name__ == '__main__':
    client = pymongo.MongoClient('localhost', 27017)
    database = client.VTADailyTrips
    trip_1 = database.Trips
    some_variable = trip_1.find()
    count=0
    for i in some_variable:
        id0= i['tripid']
        print id0
        answer = next_bus_stop_location_time(id0)
        count=count+1
    print count