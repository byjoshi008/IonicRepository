import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';

@Component({
  selector: 'page-my-teams',
  templateUrl: './my-teams.html'
})
export class MyTeamsPage {
  constructor(private nav: NavController) {}

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }
}
