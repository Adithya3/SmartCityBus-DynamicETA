import pymongo
from pymongo import MongoClient
import threading
import GoogleApi
import TimeCalculation
import NextBusStop
import UpdateData
import pprint
import  time

def init(trip_data):
    #local=trip_data
    current_loction = trip_data['currentlocation']
    tripID=trip_data['tripid']
    next_stop_location,stop_seq,next_stop_Seta = NextBusStop.next_bus_stop_location_time(tripID)
    time_to_next_stop=GoogleApi.eta_value(current_loction,next_stop_location)
    next_stop_Deta = TimeCalculation.eta_to_nextstop(time_to_next_stop)
    time_difference = TimeCalculation.Deta_minus_Seta(next_stop_Deta, next_stop_Seta)
    client = MongoClient('localhost', 27017)
    db = client.VTADailyTrips
    Collection = db.Trips
    achange_data = Collection.find_one({"tripid": trip_data['tripid']})
    final_data = UpdateData.change_data(achange_data, time_difference, stop_seq)
    Collection.find_one_and_replace({"tripid": trip_data['tripid']},final_data)
    print stop_seq,trip_data['tripid']


def main():
    client = MongoClient('localhost', 27017)
    db = client.VTADailyTrips  # In the place of 'test' put the name of database
    Collection = db.Trips  # In the place of 'test't put the name of collection in which trips are stored
    trip_data = Collection.find({})
    list = []
    while(1):
        for trip in trip_data:
            list.append(trip)
        for i in range(len(list)):
            new_thread = threading.Thread(target=init, args=(list[i],))
            new_thread.start()
        new_thread.join()
        time.sleep(120)






if __name__ == '__main__':
    main()





