import googlemaps
from googlemaps import convert

def format_change(time):
	time=str(time)
        minutes=time[:2]
        if minutes[1]==" ":
                minutes=minutes.replace(" ","")
        return minutes


def json_string(position):
        # print position
        var_position = {"lng": position['lon'], "lat": position['lat']}
        # position.update(var_position)
        # replaced_value = position.pop('lon', None)
        api_key = "AIzaSyAJfU73lg9Th2JqeujeT857cpxjXOjYso"
        client = googlemaps.Client(api_key)
        return convert.latlng(var_position)



def eta_value(start_coordinates,end_coordinates):
        api_key="AIzaSyAJfU73lg9Th2JqeujeT857cpxjXOjYso"
        client=googlemaps.Client(api_key)
        start_coordinates=json_string(start_coordinates)
        end_coordinates=json_string(end_coordinates)
        answer=client.distance_matrix(start_coordinates,end_coordinates)
        try:
                return format_change(str(answer["rows"][0]["elements"][0]["duration"]["text"]))
        except:
                return "no route"


if __name__=="__main__":
	print "don't run it as main. Fucking idiot!"
