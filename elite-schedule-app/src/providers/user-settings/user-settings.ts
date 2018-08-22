import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class UserSettings {
  constructor(public storage: Storage, private events: Events) {}

  favoriteTeam(team, tournamentId, tournamentName) {
    const item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    };
    this.storage.set(team.id.toString(), JSON.stringify(item));
    this.events.publish('favorites:changed');
  }

  unfavoriteTeam(team) {
    this.storage.remove(team.id.toString());
    this.events.publish('favorites:changed');
  }

  isFavoriteTeam(teamId: string): Promise<boolean> {
    return this.storage.get(teamId).then(value => (value ? true : false));
  }

  getAllFavorites() {
    const results = [];
    this.storage.forEach(data => {
      results.push(JSON.parse(data));
    });
    return results;
  }
}
