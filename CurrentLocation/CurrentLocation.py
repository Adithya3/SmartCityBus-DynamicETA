import pprint
import threading
import time
import pymongo
from pymongo import MongoClient


def current_time_updating(single_trip_data):
    client = MongoClient('localhost', 27017)
    db = client.VTADailyTrips  # In the place of 'test' put the name of database
    ShapeCollection = db.busPaths  # In place of 'test' put the name of the collection which holds shape
    TripCollection = db.Trips  # In place of 'test' put the name of the collecton which holds shape
    shape_data = ShapeCollection.find({"shapeid": single_trip_data['shapeid']})
    length = len(shape_data[0]["shape"])
    #print length
    for i in range(length):
        shape_data_loc = shape_data[0]["shape"][i]['loc']
        # print shape_data_loc
        single_trip_data['currentlocation'] = shape_data_loc
    #if i == length - 1:
    #single_trip_data['isvalid'] = False
        pprint.pprint(single_trip_data['currentlocation'])
        TripCollection.find_one_and_replace({"tripid": single_trip_data['tripid']}, single_trip_data)
    #time.sleep(1)
    return None

def level1(trip_data):
    list = []
    for trip in trip_data:
        list.append(trip)
    for i in range(5):
        new_thread = threading.Thread(target=current_time_updating, args=(list[i],))
        new_thread.start()
        time.sleep(15)
    new_thread.join()


def main():
    # while globvar==True:
    client = MongoClient('localhost', 27017)
    db = client.VTADailyTrips  # In the place of 'test' put the name of database
    TripsCollection = db.Trips  # In the place of 'test't put the name of collection in which trips are stored
    # TripsCollection.delete_one({"isvalid" : None})
    routeids=[22,522,55,57,66,68,181,23,73,72]
    for i in routeids:
        trip_data = TripsCollection.find({"routeid": i})
        some_thread=threading.Thread(target=level1, args=(trip_data,))
        some_thread.start()
    some_thread.join()




if __name__ == '__main__':
    global globvar
    globvar = True
    main()
    globvar = bool(raw_input("enter 'False' to stop"))
