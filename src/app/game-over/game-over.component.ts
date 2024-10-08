import {Component, Input} from '@angular/core';
import {DistanceMatchData} from "../model/distance-match-data.model";
import {Button} from "primeng/button";
import {SensorDataService} from "../service/sensor-data.service";
import {AudioService} from "../service/audio.service";
import {RedLightGreenLightDataModel} from "../model/red-light-green-light-data.model";

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css'
})
export class GameOverComponent {
  @Input() sensorData !: DistanceMatchData | RedLightGreenLightDataModel;

  constructor(private sensorDataService: SensorDataService,private audioService: AudioService) {
    this.audioService.playGameOver();
  }

  restartGame() {
    this.sensorDataService.startAgain().subscribe();
  }
}
