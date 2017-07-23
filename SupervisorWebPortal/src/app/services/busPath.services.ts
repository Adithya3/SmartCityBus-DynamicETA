import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class busPath {
  data: busPaths[];
  constructor(private http: Http) {
  }

  getBusTrips(): Observable<busPaths[]> {
    //assets/data/busPath.json
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://34.209.35.216:4000/getTripsInfo', options)
      .map((res) => res.json())
  }
  getBusTrip(routeId: String): Observable<trip[]> {
    //assets/data/busPath.json

    let body = JSON.stringify({ "data": routeId });
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://34.209.35.216:4000/getTripInfo', body, options)
      .map((res) => res.json())
  }
  getBusTripbyId(tripid: String): Observable<trip> {
    //assets/data/busPath.json

    let body = JSON.stringify({ "data": tripid });
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://34.209.35.216:4000/getBusTripbyId', body, options)
      .map((res) => res.json())
  }

  getShapes(shapesToBeFetched: Array<String[]>): Observable<Response> {

    let body = JSON.stringify({ "data": shapesToBeFetched });
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://34.209.35.216:4000/getRoutePaths', body, options);
  }
  getShiftedShapes(shapesToBeFetched: String[]): Observable<Response> {

    let body = JSON.stringify({ "data": shapesToBeFetched });
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://34.209.35.216:4000/getShiftedRoutePaths', body, options);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || ' error');
  }
}

// type for the trip
interface busPaths {
  trips: trip[];
  routeid: string;

}

//type for the busPath

class allPaths {
  shapeid: string;
  shapes: shape[] = [];
}
class shape {
  loc: point[] = [];
  seq: string;
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

