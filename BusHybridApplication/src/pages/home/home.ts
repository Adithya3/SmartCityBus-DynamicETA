import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { Geolocation } from 'ionic-native';
import { AboutPage } from '../about/about';
import * as moment from 'moment';

declare var google;
declare var angular: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
 @ViewChild('map') mapElement: ElementRef;
  	map: any;
  	url: string = 'http://34.209.35.216:8207/server';
  	response: any;
    error:any = true;
    eta: any ;
  	routes: any[] = [];
    distinctRoutes: any[] = [];
  
  constructor(public navCtrl: NavController, public http: Http) {
  }

  ionViewDidLoad() {
    this.getCurrentLocation();
    Observable.interval(2000 * 60).subscribe(x => {
      this.updateETA();
    });
	}
  
  refresh() {
    this.navCtrl.setRoot(HomePage);
  }

  getCurrentLocation() {
    var options = {
            enableHighAccuracy: false
    };

    Geolocation.getCurrentPosition(options).then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);  
      
      let marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                draggable:true,
                title: 'Your Location'
      });
      
      let Pcoords = {
                "lat": position.coords.latitude,
                "lon": position.coords.longitude
              };
      this.makeHTTPPostRequest(Pcoords);

      }, (err) => {

      let latLng = new google.maps.LatLng(36.7783,-119.4179);
     
      let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map = new google.maps.Marker({
                position: latLng,
                map: this.map,
                draggable:false
        }); 
      this.error = false;  
      console.log('Error getting current location: ' + err + ';Location initilaized to CA!');
    });
  }

  updateETA() {
    
    for(var i=0; i<this.routes.length;i++) {
      if(typeof (this.routes[i].eta) === 'string') {
        let inf = (this.routes[i].eta).indexOf("h");
        if(parseInt(this.routes[i].eta.substring(0,(inf))) <= 1){
            if(parseInt(this.routes[i].eta.substring((inf+2),this.routes[i].eta.length)) <= 2) {
              this.routes[i].eta = 0;
            }
            else {
              this.routes[i].eta = parseInt(this.routes[i].eta.substring((inf+2),this.routes[i].eta.length)) - 2;
            }
        }
        else {
            if(parseInt(this.routes[i].eta.substring((inf+2),this.routes[i].eta.length)) <= 2) {
              this.routes[i].eta = (parseInt(this.routes[i].eta.substring(0,(inf))) - 1) + "hr " + (parseInt(this.routes[i].eta.substring((inf+2),this.routes[i].eta.length)) + 57);
            }
            else {
              this.routes[i].eta = this.routes[i].eta.substring(0,(inf)) + "hr " + (parseInt(this.routes[i].eta.substring((inf+2),this.routes[i].eta.length)) - 2);
            }
        }
      }
      else if(this.routes[i].eta <= 2){
        this.routes[i].eta  =  0;
      }
      else {
        this.routes[i].eta  -= 2;
      }
    }
  }

  makeHTTPPostRequest(Pcoords){

    var headers = new Headers();
    
    this.http.post(this.url,JSON.stringify(Pcoords),{headers: headers}).subscribe((data) => { 

        this.response = data.json();
        //console.log(this.response);
        
        for(var i = 0; i < this.response.userStops.length; i++) {
        
          let stop = new google.maps.LatLng(this.response.userStops[i].loc.lat,this.response.userStops[i].loc.lon);
          let marker = new google.maps.Marker({
                position: stop,
                map: this.map,
                draggable:false,
                label: {text: (i +1).toString()},
                title: (i +1) + '. ' + this.response.userStops[i].stopName
          });
          
          for(var j = 0; j < this.response.userStops[i].routes.length; j++) {

            let pad = (this.response.userStops[i].routes[j].description).indexOf(" ");
                
            for (var k = 0; k < this.response.userStops[i].routes[j].stop_seq.length; k ++) {
                
                let endTime = moment(this.response.userStops[i].routes[j].stop_seq[k].estimatedArivalTime, "HH:mm:ss");
                let time = new Date();
                let startTime = moment(time, "HH:mm:ss");

              if(this.response.userStops[i].routes[j].stop_seq[k].loc.lat == this.response.userStops[i].loc.lat && this.response.userStops[i].routes[j].stop_seq[k].loc.lon == this.response.userStops[i].loc.lon) {
                if(Math.floor(moment.duration(endTime.diff(startTime)).asMinutes()) <= 0) {
                  //console.log("negative");
                  this.eta = moment.duration(startTime.diff(moment("06:06:00", "HH:mm:ss"))).asMinutes() 
                }
                else {
                  this.eta = Math.floor(moment.duration(endTime.diff(startTime)).asMinutes());
                }
              }
              if(this.eta >= 60) {
                let mins = (this.eta)%60;
                let hours = (this.eta - mins)/60;
                this.eta = hours + "hr " + Math.floor(mins);
              }

              /* else {
                 this.response.userStops[i].routes[j].stop_seq[k].staticArivalTime = Math.floor(moment.duration(endTime.diff(startTime)).asMinutes());
              } */
          
            }
            this.routes.push({  "routeId" : (this.response.userStops[i].routes[j].routeid).toString(),
                      "eta": this.eta,
                      "towards" : (this.response.userStops[i].routes[j].description).slice(pad),
                      "at" : (i + 1),
                      "tripId" : this.response.userStops[i].routes[j].tripid,
                      "userLoc": {
                        "lat": Pcoords.lat,
                        "lon": Pcoords.lon
                      },
                      "stop" : {
                        "lat" : this.response.userStops[i].loc.lat,
                        "lon" : this.response.userStops[i].loc.lon
                      },
                      "stopName": this.response.userStops[i].stopName,
                      "stopId": this.response.userStops[i].stopId,
                      "stop_seq" : this.response.userStops[i].routes[j].stop_seq
                    });
          }
          
        }
        var tmp = {};
        var tmpRoutes = this.routes.filter(function(entry) {
          if (tmp[entry.routeId]) {
            return false;
          }
          tmp[entry.routeId] = true;
          return true;
        });
      this.distinctRoutes = tmpRoutes;
      });
  }
  
  navigate(item) {
    this.navCtrl.push(AboutPage, {"data": item });
  }
}


