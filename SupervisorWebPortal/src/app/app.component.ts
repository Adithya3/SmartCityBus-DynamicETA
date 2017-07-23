import { Component, Directive, ElementRef, Renderer, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { busPath } from './services/busPath.services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SessionService } from './services/cache.services';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './html/app.component.html',
  styleUrls: ['./html/app.component.css'],
  providers: [busPath]
})
export class AppComponent {
  title: string = 'VTA- Supervision';
  data: busPaths[] = [];
  lat: number = 37.353178;
  lng: number = -121.917306;
  zoom: number = 12;
  ready: boolean = false;
  dummyChangeData: number = 0;

  allShapes: allShapes[] = [];
  shiftedShapes: allShapes[] = [];
  shiftedShapes1: allShapes[] = [];
  currentRouteSelection: busPaths;
  checkCurrentRouteSelection: boolean = false;
  //current trip 
  showHighlightedTrip: boolean = false;
  showAllTrip: boolean = false;
  currentLocations: Array<any> = [];
  colorArray: String[] = [
    "#1f5363",
    "#085aa0",
    "#306d30",
    "#8328af",
    "#89312e",
    "#297559",
    "#692975",
    "#737315",
    "#a36d20",
    "#472487"];

  _shapeColorMap: shapeColorMap[] = [];

  //maintain the shapes that need to be fetched from database
  shapesToBeFetched: String[];
  constructor(private _friendService: busPath, private _sessionService: SessionService) {
    this.ready = false;
    var model = this;
    _friendService.getBusTrips().subscribe(busPath => {
      // before fetching unique values
      var tempShapesToBeFetched = [];
      var colorIndex = 0
      busPath.map(entry => {

        entry.trips.map(item => {
          tempShapesToBeFetched.push(item.shapeid);
          var _tempshapeColorMap = new shapeColorMap;
          _tempshapeColorMap.color = this.colorArray[colorIndex % 10];
          _tempshapeColorMap.shapeId = item.shapeid;
          var shapeIdExitColor = null;
          this._shapeColorMap.filter(function (word) {
            if (word.shapeId == item.shapeid) {
              shapeIdExitColor = word.color;
            }
          })
          var url = 'assets/icons/bus/bus-';
          //  if (shapeIdExitColor == null) {
          url += _tempshapeColorMap.color.substring(1, _tempshapeColorMap.color.length);
          this._shapeColorMap.push(_tempshapeColorMap);
          //   }
          //  else {
          //   url += shapeIdExitColor.substring(1, shapeIdExitColor.length);
          // }
          var locationsObject = {
            'urlPath': url + '.png',
            'tripid': item.tripid, 'currentlocation': item.currentlocation,
            'displaycontent': "routeid:" + item.routeid + " <br> tripid:" + item.tripid + " <br> description:" + item.description + " <br> vehicletimestamp:" + item.vehicletimestamp + " <br> isvalid:" + item.isvalid
          }
          model.currentLocations.push(locationsObject)

        })
        colorIndex++;
      })
      var s = new Set(tempShapesToBeFetched);
      this.shapesToBeFetched = Array.from(s);
      _friendService.getShiftedShapes(this.shapesToBeFetched).subscribe((res) => {
        var obj = res.json();
        //var colorIndex = 0
        for (let entry of obj) {
          var abc = new allShapes;
          var shapeIdExitColor = null;
          this._shapeColorMap.filter(function (word) {
            if (word.shapeId.substring(0, 2) == entry.shapeid.substring(0, 2)) {
              shapeIdExitColor = word.color;
            }
          })
          abc.color = shapeIdExitColor;
          for (let locEntry of entry.shape) {
            var tempData = [];
            tempData.push(locEntry.loc.lat);
            tempData.push(locEntry.loc.lon);
            abc.shapes.push(tempData);
          }
          this.allShapes.push(abc);
          // colorIndex++;
        }
        console.log(this.allShapes);
        console.log(this.shiftedShapes);
        this.ready = true;
      });
    });
    console.log("fetched");
    setInterval(this.UpdateCurrentLocation.bind(this), 15000);
  };

  private UpdateCurrentLocation() {
    console.log("hitHit");
    this.dummyChangeData++;
    var abc = [];
    var model = this;
    this._friendService.getBusTrips().subscribe(busPath => {
      busPath.map(entry => {
        entry.trips.map(item => {
          var locationsObject = {
            'tripid': item.tripid, 'currentlocation': item.currentlocation
          }
          abc.push(locationsObject)
        })
      })
      model._sessionService.session = abc;
    })

  }
}

class busPaths {
  trips: trip[] = [];
  routeid: string;
  shapesAllocated: String[];
  color: String = "";
}

class trip {
  routeid: string;
  shapeid: string;
  tripid: string;
  description: string;
  vehicletimestamp: string;
  isvalid: string;
  displaycontent: string;
  currentlocation: point[] = [];
}

class point {
  lat: number;
  lon: number;
}

class allShapes {
  shapes: number[][] = [];
  color: String = ""
}

class shapeColorMap {
  shapeId: String = "";
  color: String = "";
}









