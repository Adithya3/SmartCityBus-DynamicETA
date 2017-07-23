import googlemaps
from googlemaps import convert


def format_change(time):
	time=str(time)
        minutes=time[:2]
        if minutes[1]==" ":
                minutes=minutes.replace(" ","")
        return minutes


def json_string(position):
    var_position = {"lng": position['lon']}
    position.update(var_position)
    replaced_value = position.pop('lon', None)
    api_key = "AIzaSyAJfU73lg9Th2JqeujeT1857pxjXOjYso"
    client = googlemaps.Client(api_key)
    return convert.latlng(position)

def main():
    global api_key
    api_key= "AIzaSyAJfU73lg9Th2JqeujeT1857pxjXOjYso"


if __name__ == '__main__':
    main()
