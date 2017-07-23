import { Directive, ViewChild, ElementRef } from "@angular/core"
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
declare var google: any;
import { MapService } from 'angular2.leaflet.components/services/map.service'
import * as L from 'leaflet';

@Directive({
    selector: '[DirectionsMapDirective]',
    inputs: ['drawComponent'],
    providers: [MapService]
})
export class DirectionsMapDirective {
    public drawComponent: busPaths[];
    @ViewChild('map1') mapElement: ElementRef;
    constructor(private gmapsApi: GoogleMapsAPIWrapper, private test: MapService) { }
    ngOnInit() {

        /* for (var i = 0; i < this.allShapes.length; i++) {
             var curObj = this.allShapes[i];
 
             for (var index = 1; index < curObj.shapes.length; index++) {
                 var latLan = curObj.shapes[index]
                 //var currPoint = map.latLngToLayerPoint(latLan[index].lat,);
             }
 
         }*/
    }
    ngAfterViewInit() {
        let map = L.map(this.mapElement.nativeElement)

        var shiftedShapes = [];

    }


}


interface busPaths {
    json_build_object: {
        location: string[],
        routeId: string
    }
}