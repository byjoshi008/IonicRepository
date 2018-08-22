import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api';
import { TeamHomePage } from '../team-home/team-home';
import { MapPage } from '../map/map';

declare var window;
@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
  game: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi
  ) {}

  ionViewDidLoad() {
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamid) {
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id == teamid);
    this.navCtrl.push(TeamHomePage, team);
  }

  goToDirection() {
    const tourneyData = this.eliteApi.getCurrentTourney();
    const location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35`;
  }

  goToMap() {
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2) ? 'primary' : 'danger';
  }
}
