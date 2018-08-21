import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class EliteApi {
  private baseUrl = 'https://elite-schedule-app-bj.firebaseio.com';
  private currentTourney: any = {};

  constructor(public http: HttpClient) {}

  getTournaments() {
    return new Promise(resolve => {
      this.http
        .get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res));
    });
  }

  getTournamentData(tourneyId): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .pipe(
        map(response => {
          this.currentTourney = response;
          return this.currentTourney;
        })
      );
  }

  getCurrentTourney() {
    return this.currentTourney;
  }
}
