import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators/map';

@Injectable()
export class EliteApi {
  private baseUrl = 'https://elite-schedule-app-bj.firebaseio.com';
  private currentTourney: any = {};
  private tourneyData = {};

  constructor(public http: HttpClient) {}

  getTournaments() {
    return new Promise(resolve => {
      this.http
        .get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res));
    });
  }

  getTournamentData(tourneyId, forceRefresh: boolean = false): Observable<any> {
    if (!forceRefresh && this.tourneyData[tourneyId]) {
      this.currentTourney = this.tourneyData[tourneyId];
      return Observable.of(this.currentTourney);
    }

    return this.http
      .get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .pipe(
        map(response => {
          this.tourneyData[tourneyId] = response;
          this.currentTourney = this.tourneyData[tourneyId];
          return this.currentTourney;
        })
      );
  }

  getCurrentTourney() {
    return this.currentTourney;
  }

  refreshCurrentTourney() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }
}
