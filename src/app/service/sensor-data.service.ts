import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private apiInitDistanceMatchUrl = 'http://localhost:3000/init-distance-match';
  private apiInitDodgeTheObstacleUrl = 'http://localhost:3000/init-dodge-the-obstacle';

  private apiGetUrl = 'http://localhost:3000/sensor-data';
  private apiPostUrl = 'http://localhost:3000/start-measurement';
  private apiStopUrl = 'http://localhost:3000/stop-measurement';
  private apiStartAgainUrl = 'http://localhost:3000/start-again';

  constructor(private http: HttpClient) {}

  getSensorData(intervalDuration: number): Observable<any> {
    return timer(0, intervalDuration)
      .pipe(
        switchMap(() => this.http.get<any>(this.apiGetUrl))
      );
  }

  startNewRound(): Observable<any> {
    return this.http.post(this.apiPostUrl,{});
  }
  stopMeasurement(): Observable<any> {
    return this.http.post(this.apiStopUrl,{});
  }

  startAgain(): Observable<any> {
    return this.http.post(this.apiStartAgainUrl,{});
  }

  initDistanceMatch(): Observable<any> {
    return this.http.post(this.apiInitDistanceMatchUrl,{});
  }

  initDodgeTheObstacle(): Observable<any> {
    return this.http.post(this.apiInitDodgeTheObstacleUrl,{});
  }
}
