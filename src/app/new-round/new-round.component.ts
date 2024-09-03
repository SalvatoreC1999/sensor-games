import {Component, Input} from '@angular/core';
import {DistanceMatchData} from "../model/distance-match-data.model";
import {Button} from "primeng/button";
import {SensorDataService} from "../service/sensor-data.service";

@Component({
  selector: 'app-new-round',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './new-round.component.html',
  styleUrl: './new-round.component.css'
})
export class NewRoundComponent {
  @Input() sensorData!: DistanceMatchData;

  constructor(private sensorDataService: SensorDataService) {
  }

  startRound() {
      this.sensorDataService.startNewRound().subscribe();
  }
}
