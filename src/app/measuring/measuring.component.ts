import {Component, Input, signal} from '@angular/core';
import {DistanceMatchData} from "../model/distance-match-data.model";
import {ProgressBarModule} from "primeng/progressbar";
import {NgStyle} from "@angular/common";
import {Button} from "primeng/button";
import {SensorDataService} from "../service/sensor-data.service";

@Component({
  selector: 'app-measuring',
  standalone: true,
    imports: [
        ProgressBarModule,
        NgStyle,
        Button
    ],
  templateUrl: './measuring.component.html',
  styleUrl: './measuring.component.css'
})
export class MeasuringComponent {
  @Input() sensorData!: DistanceMatchData;

  constructor(private sensorDataService: SensorDataService) {
  }

  getIndicatorColor(): string {
    if (this.sensorData && this.sensorData.distance != null) {
      if (this.sensorData.distance <= 50) return '#f1c40f'; // Giallo
      return '#e74c3c'; // Rosso
    }
    return '#bdc3c7'; // Grigio neutro
  }

  stop() {
    this.sensorDataService.stopMeasurement().subscribe();
  }
}
