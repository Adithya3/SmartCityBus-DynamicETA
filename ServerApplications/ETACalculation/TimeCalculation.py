from time import strftime

def calculate_time(first_value, second_value):
    first_value = str(first_value)
    second_value = str(second_value)
    if (first_value[2] == ":"):
        first_value = first_value[0:5]
    else:
        first_value = first_value[0:4]
    if (first_value[2] == ":"):
        total_minutes_list = calculate_minutes(first_value[3:], second_value)
    else:
        total_minutes_list = calculate_minutes(first_value[2:], second_value)
    if (first_value[2] == ":"):
        total_hours = calculate_hours(first_value[:2], total_minutes_list[1])
    else:
        total_hours = calculate_hours(first_value[0], total_minutes_list[1])
    return str(total_hours) + ":" + str(total_minutes_list[0]) + ":00"


def calculate_hours(value_1, value_2):
    return int(value_1) + int(value_2)


def calculate_minutes(value_1, value_2):
    value_r = int(value_1) + int(value_2)
    if (value_r > 59):
        value_r = value_r - 60
        return [str(value_r).zfill(2), 1]
    else:
        return [str(value_r).zfill(2), 0]

def current_time():
    currenttime=strftime("%H:%M:%S")
    return currenttime

def eta_to_nextstop(value):
    currenttime=current_time()
    try:
        answer=calculate_time(currenttime,value)
    except:
        answer=0
    return answer

def Deta_minus_Seta(value1,value2):
   try:
       if value1[1] == ":":
           value1 = "0" + value1
       else:
           pass
       if value2[1] == ":":
           value2 = "0" + value2
       else:
           pass
           # print value1[:2]
       second = str(int(value1[6:]) - int(value2[6:]))
       if int(second) < 0:
           minute = str(int(value1[3:5]) - int(value2[3:5]) - 1)
           second = str(60 + int(second))
       else:
           minute = str(int(value1[3:5]) - int(value2[3:5]))
       if int(minute) < 0:
           hour = str(int(value1[:2]) - int(value2[:2]) - 1)
           minute = str(60 + int(minute))
       else:
           hour = str(int(value1[:2]) - int(value2[:2]))
       answer = hour + ':' + minute + ':' + second
       return answer
   except:
       return "00:00:00"

def formating(value1):
    if value1[1] == ":":
        value1 = "0" + value1
    else:
        pass
    if value1[4]==":":
        value1= value1[:3]+"0"+value1[3:]
    else:
        pass
    try:
        if value1[7]!=False:
            pass
        else:
            pass
    except:
        value1=value1+"0"

    return value1



def time_add(value1,value2):
    value1=formating(value1)
    value2=formating(value2)
    #print value1,value2
    second = str(int(value1[6:]) + int(value2[6:]))
    if int(second) > 59:
        minute = str(int(value1[3:5]) + int(value2[3:5]) + 1)
        second = str(int(second)-60)
    else:
        minute = str(int(value1[3:5]) + int(value2[3:5]))
    if int(minute) > 59:
        hour = str(int(value1[:2]) + int(value2[:2]) + 1)
        minute = str(int(minute)-60)
    else:
        hour = str(int(value1[:2]) + int(value2[:2]))
    answer = hour + ':' + minute + ':' + second
    answer=formating(answer)
    return answer



if __name__ == "__main__":
    first_value = raw_input("enter the first time")
    second_value = raw_input("enter the second time")
    answer=time_add(first_value,second_value)
    #answer = calculate_time(first_value, second_value)
    print answer
