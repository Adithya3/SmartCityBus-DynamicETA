# SmartCityBus
Project done under Prof. Frank Lin as part of  MS curriculum - SJSU CMPE

Project Specifications

1.	Place an android phone with GPS receiver capability on the bus during its operating hours
2.	The GPS module receives the position as latitude and longitude of the object from space-based satellite navigation system.
3.	The module will send the position information to a central server once in every twenty seconds.
4.	The server-side database is updated with the latest location information
5.	Distance and duration for each stop along the route from current location are computed and stored in the server database.
6.	The client application has an interactive display to request the ETA, delay status etc.
7.	The requested information is retrieved from the central server and displayed on the user application.

Non-functional Requirements

The user must have the application installed in their android phone. The device should be actively connected to the network. 

Hardware Requirements

1.	Android Phone with GPS receiver capability
2.	A computing device with active internet to run the server application.
3.	End user must have an android phone with active internet connection to access the application

Scope of the Project
In Scope:

1.	Developing a server application that stores position details of the bus and calculates the distance, ETA and other parameters
2.	The server application must demonstrate efficiency in speed and latency while handling multiple requests.
3.	Multiple routes with multiple bus stops along the route will be used. 
4.	Native Android application for the end user.
5.	Purpose of project is currently for coursework demonstration only.

Out of Scope:

1.	Offline access to the application
2.	End user application on other wearable devices with internet connection.
3.	Automatic suggestions based on the search history of the user.
4.	Automated notification service.
5.	Different forms of viewing data (either map or line chart) on the user application 
6.	Voice interaction with the application.


The final deliverables are two android applications 
1) Android application for user: This is the application which user will use to see the time of arrival of selected bus to user’s location. It will show the arrival time and the current location of the bus on a map.
2) Android application for bus: This application will be running on the android phone which will be located on the bus. It collects the GPS coordinates of the bus regularly. The collected data is sent to the server which will be hosted on the cloud.
3) Agency web portal: A web portal for transit agencies to update their schedules. It also provides historical data of bus arrival time at each stop along a route. This data helps agencies in monitoring their services.
