import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { mapCSS } from './directives/app.directive';
import { markerComponent } from './marker.component';
import { DirectionsMapDirective } from './directives/direction.directive';
import { CandTLeafletComponent } from 'angular2.leaflet.components';
import { CandTLeafletService } from 'angular2.leaflet.components';
import { SessionService } from './services/cache.services';
@NgModule({
  declarations: [
    AppComponent,
    mapCSS,
    DirectionsMapDirective,
    CandTLeafletComponent,
    markerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA7KQ7lpnkZxVsS9C9Fuf95GFk3spAe8Zw'
    })
  ],
  providers: [CandTLeafletService,SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
