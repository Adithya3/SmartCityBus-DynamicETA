from  math import pi, sqrt, sin, cos, atan2


def distance_calculation(pos1, pos2):
    #print pos1,pos2
    lat1 = float(pos1['lat'])
    long1 = float(pos1['lon'])
    lat2 = float(pos2['lat'])
    long2 = float(pos2['lon'])

    degree_to_rad = float(pi / 180.0)

    d_lat = (lat2 - lat1) * degree_to_rad
    d_long = (long2 - long1) * degree_to_rad

    a = pow(sin(d_lat / 2), 2) + cos(lat1 * degree_to_rad) * cos(lat2 * degree_to_rad) * pow(sin(d_long / 2), 2)
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    km = 6367 * c
    mi = 3956 * c

    return mi


if __name__ == "__main__":
    start_position = raw_input("enter the starting location  ")
    end_position = raw_input("enter the ending location  ")
    # start_position={'lat':37.44377,'lon':-122.16603}
    # end_position={'lat':37.32773,'lon':-121.82076}
    result = distance_calculation(start_position, end_position)
    print result
