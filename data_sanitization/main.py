import  pymongo
from pymongo import MongoClient
import format
import googlemaps
import timeFormatingSucks

def timeBetween(pos1,pos2):
    api_key = "AIzaSyAJfU73lg9Th2JqeujeT1857cpxjXOjYso"
    client = googlemaps.Client(api_key)
    start_coordinates = format.json_string(pos1)
    end_coordinates = format.json_string(pos2)
    answer = client.distance_matrix(start_coordinates, end_coordinates)
    try:
        return format.format_change(answer["rows"][0]["elements"][0]["duration"]["text"])
    except:
        return "no route"


def updateStatic(singleTrip):
    for i in range(len(singleTrip['stop_seq'])):
        if (singleTrip['stop_seq'][i]['staticArivalTime']== None):
            value1=timeBetween(singleTrip['stop_seq'][i-1]['loc'],singleTrip['stop_seq'][i]['loc'])
            value2=timeFormatingSucks.nullChangeTime(singleTrip['stop_seq'][i-1]['loc'],value1)
            singleTrip['stop_seq'][i]['staticArivalTime']=value2
    return singleTrip



def main():
    client = MongoClient('localhost', 27017)
    db = client.test  # In the place of 'test' put the name of database
    Collection = db.TripsCollection  # In the place of 'test't put the name of collection in which trips are stored
    trip_data = Collection.find({})
    for individualTrip in  trip_data:
        karma=updateStatic(individualTrip)
        Collection.find_one_and_replace({"tripid": trip_data['tripid']}, karma)


if __name__ == '__main__':
    main()