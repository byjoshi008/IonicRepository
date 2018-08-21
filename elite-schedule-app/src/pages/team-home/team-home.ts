import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StandingsPage } from '../standings/standings';
import { TeamDetailPage } from '../team-detail/team-detail';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html'
})
export class TeamHomePage {
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  team: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = navParams.data;
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}
