import pymongo
from pymongo import MongoClient
import TimeCalculation
import NextBusStop
import UpdateData


def print_data(trip_data,seq_num):
    i = int(seq_num)
    while i < len(trip_data['stop_seq']):
        print trip_data['stop_seq'][i]
        i=i+1

def main():
    client = pymongo.MongoClient('localhost', 27017)
    database = client.test
    trip_1 = database.test
    trip_data= trip_1.find_one()
    number=raw_input('enter a number')
    print_data(trip_data,number)


if __name__ == '__main__':
    main()