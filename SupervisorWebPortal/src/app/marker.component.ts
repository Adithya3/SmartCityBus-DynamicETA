import { Component, Input, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { busPath } from './services/busPath.services';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './services/cache.services';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
    selector: 'markerComponent',
    templateUrl: './html/markerComponent.component.html',
    providers: [busPath]
})
export class markerComponent {
    @Input() tripDetails: trip;
    @Input() index: number;
    latitude: number;
    longitude: number;
    displaycontent: string;
    index1: number = 0;
    url: string = "";
    constructor(private _friendService: busPath, private _sessionService: SessionService) {

    }
    ngOnInit() {
        this.latitude = this.tripDetails.currentlocation.lat;
        this.longitude = this.tripDetails.currentlocation.lon;
        this.displaycontent = this.tripDetails.displaycontent;
        this.url = this.tripDetails.urlPath;
        setInterval(this.UpdateCurrentLocation.bind(this), 20000);
    }
    private UpdateCurrentLocation() {
        var model = this;
        var abc = this._sessionService.session;
        abc.map(element => {

            if (element.tripid == model.tripDetails.tripid) {
                model.latitude = element.currentlocation.lat;
                model.longitude = element.currentlocation.lon;
            }
        })


    }
    onchange(changeRecord) {
        console.log("dancedance");
    }
}

class trip {
    routeid: string;
    shapeid: string;
    tripid: string;
    description: string;
    vehicletimestamp: string;
    isvalid: string;
    displaycontent: string;
    currentlocation: point;
    urlPath: string;
}
class point {
    lat: number;
    lon: number;
    latA: number;
    lonA: number;
}
