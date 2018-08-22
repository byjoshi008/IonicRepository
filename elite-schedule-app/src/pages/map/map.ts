import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api';

declare var window;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: any = {};
  constructor(private eliteApi: EliteApi, public navParams: NavParams) {}

  ionViewDidLoad() {
    const games = this.navParams.data;
    const tourneyData = this.eliteApi.getCurrentTourney();
    const location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    };
  }

  gotoDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }
}
