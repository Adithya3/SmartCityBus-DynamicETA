import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	@ViewChild('map') mapElement: ElementRef;
  	map: any;
	routeId: any;
	data: any;
	stopName: any;
	stopsPassed: any[] = [];
	stopsAhead: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
   
    this.data = this.navParams.get("data");
    this.routeId = this.data.routeId;
    this.stopName = this.data.stopName;

    let latLng = new google.maps.LatLng(52,-112.72);
      
      let mapOptions = {
      	center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      
    var world = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
	var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(world);
    directionsService.route({
          origin: new google.maps.LatLng(this.data.userLoc.lat,this.data.userLoc.lon),
          destination: new google.maps.LatLng(this.data.stop.lat,this.data.stop.lon),
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
    });
    for (var i = this.getIndex(); i < this.data.stop_seq.length; i ++) {
  		this.stopsAhead.push(this.data.stop_seq[i].stopName);
    }

  }

  getIndex() {
  	 for (var i = 0; i < this.data.stop_seq.length; i ++) {
    	if (this.data.stopId == this.data.stop_seq[i].stopId) {
    	  return i;
    	}
    	this.stopsPassed.push(this.data.stop_seq[i].stopName);
    }
    return 0;
  }

}
