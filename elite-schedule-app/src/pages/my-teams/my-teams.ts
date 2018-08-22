import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { EliteApi } from '../../providers/elite-api/elite-api';
import { TeamHomePage } from '../team-home/team-home';
import { UserSettings } from '../../providers/user-settings/user-settings';

@Component({
  selector: 'page-my-teams',
  templateUrl: './my-teams.html'
})
export class MyTeamsPage {
  favorites = [];
  constructor(
    private nav: NavController,
    private eliteApi: EliteApi,
    private loadingController: LoadingController,
    private userSettings: UserSettings
  ) {}

  ionViewDidEnter() {
    this.favorites = this.userSettings.getAllFavorites();
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  favoriteTapped($event, favorite) {
    const loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(t => {
      this.nav.push(TeamHomePage, favorite.team);
      loader.dismiss();
    });
  }
}
