import pymongo
import pprint
import TimeCalculation

def change_data(trip_data,value,seq_num):
	#value=trip_data['stop_seq']
	#pprint.pprint(value)
	#print seq_num
	i=int(seq_num)
	#print len(trip_data['stop_seq'])
	while i<len(trip_data['stop_seq']):
		sarrival_time=trip_data['stop_seq'][i]['staticArivalTime']
		#print sarrival_time
		#print sarrival_time,value
		try:
			darrival_time=TimeCalculation.time_add(sarrival_time,value)
		except:
			darrival_time=None
		#print darrival_time
		trip_data['stop_seq'][i]['estimatedArivalTime']=darrival_time
		#pprint.pprint(trip_data)
		i=i+1
	return trip_data


if __name__ == '__main__':
	client = pymongo.MongoClient('localhost', 27017)
	database = client.test
	tdata = database.test
	trip_1 = tdata.find_one()
	value =raw_input('enter the  new value')
	new_data=change_data(trip_1, value,3)
	pprint.pprint(new_data)




