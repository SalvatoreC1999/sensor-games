import {Component, NgZone, OnInit} from '@angular/core';
import {SensorDataService} from "../service/sensor-data.service";
import {AudioService} from "../service/audio.service";

@Component({
  selector: 'app-dodge-the-obstacle',
  standalone: true,
  imports: [],
  templateUrl: './dodge-the-obstacle.component.html',
  styleUrl: './dodge-the-obstacle.component.css'
})
export class DodgeTheObstacleComponent implements OnInit{

  constructor(private sensorDataService: SensorDataService,private ngZone: NgZone,private audioService: AudioService) {}

  ngOnInit() {
    this.sensorDataService.initDodgeTheObstacle().subscribe({
      next: () => {
        this.sensorDataService.getSensorData().subscribe(data => {
          this.ngZone.run(() => {
            console.log(data)

          })
        });

      }
    })
  }
}
