import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {SensorDataService} from "../service/sensor-data.service";
import {AudioService} from "../service/audio.service";
import {Button} from "primeng/button";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {GameOverComponent} from "../game-over/game-over.component";
import {StatusEnum} from "../enum/status.enum";

interface GameState {
  status: 'NEW_ROUND' | 'RED_LIGHT' | 'HIT' | 'GAME_OVER';
  score: number;
  lives: number;
  timestamp: Date;
}

@Component({
  selector: 'app-dodge-the-obstacle',
  standalone: true,
  imports: [
    Button,
    NgForOf,
    NgClass,
    NgIf,
    GameOverComponent
  ],
  templateUrl: './dodge-the-obstacle.component.html',
  styleUrl: './dodge-the-obstacle.component.css'
})
export class DodgeTheObstacleComponent implements OnInit,OnDestroy{
  sensorSubscription: any;
  sensorData: any;
  isRunning: boolean = false;
  previousScore: number = 0;

  constructor(private sensorDataService: SensorDataService,private ngZone: NgZone,private audioService: AudioService) {}

  ngOnInit() {
    this.sensorDataService.initDodgeTheObstacle().subscribe({
      next: () => {
        this.sensorSubscription = this.sensorDataService.getSensorData().subscribe(data => {
          this.ngZone.run(() => {
            console.log(data)
            this.sensorData = data;
            switch(this.sensorData.status){
              case StatusEnum.HIT:
                this.audioService.playError();
                break;
              case StatusEnum.GAME_OVER:
                this.audioService.playGameOver();
                break;
              default:
                break;
            }
            this.updateRunningState();
          })
        });

      }
    })
  }
  ngOnDestroy() {
    this.sensorSubscription.unsubscribe();
  }

  updateRunningState() {
    this.isRunning = this.sensorData.status === StatusEnum.NEW_ROUND && this.sensorData.score && this.sensorData.score > this.previousScore;
    this.previousScore = this.sensorData.score ?? 0;
  }

  getHeartsFilled(): number[] {
    return Array(this.sensorData?.lives || 0).fill(0);
  }
  getHeartsNotFilled(): number[] {
    return Array(3 - this.sensorData?.lives || 0).fill(0);
  }

  openDialog() {

  }

  protected readonly StatusEnum = StatusEnum;
}
