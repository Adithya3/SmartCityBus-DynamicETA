import time
from time import strftime


def current_time():
    currenttime = strftime("%H:%M:%S")
    return currenttime


def nullChangeTime(first_value, second_value):
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


if __name__ == '__main__':
    value = current_time()
    print value
