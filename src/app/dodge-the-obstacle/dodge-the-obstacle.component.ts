import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {SensorDataService} from "../service/sensor-data.service";
import {AudioService} from "../service/audio.service";
import {Button} from "primeng/button";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {GameOverComponent} from "../game-over/game-over.component";
import {StatusEnum} from "../enum/status.enum";
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import {DodgeTheObstacleDataModel} from "../model/dodge-the-obstacle-data.model";

@Component({
  selector: 'app-dodge-the-obstacle',
  standalone: true,
  imports: [
    Button,
    NgForOf,
    NgClass,
    NgIf,
    GameOverComponent,
    LottieComponent
  ],
  templateUrl: './dodge-the-obstacle.component.html',
  styleUrl: './dodge-the-obstacle.component.css'
})
export class DodgeTheObstacleComponent implements OnInit,OnDestroy{
  sensorSubscription: any;
  sensorData: DodgeTheObstacleDataModel | undefined;
  private animationItem: any;
  options: AnimationOptions = {
    path: 'assets/doraemon-running.json'
  }

  constructor(
    private sensorDataService: SensorDataService,
    private ngZone: NgZone,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.sensorDataService.initDodgeTheObstacle().subscribe({
      next: () => {
        this.sensorSubscription = this.sensorDataService.getSensorData().subscribe(data => {
          this.ngZone.run(() => {
            console.log(data);
            const statusChanged = this.sensorData && this.sensorData.status != data.status;
            this.sensorData = data;
            if (statusChanged && this.sensorData) {
              switch(this.sensorData.status) {
                case StatusEnum.HIT:
                  this.audioService.playError();
                  break;
                case StatusEnum.GAME_OVER:
                  this.audioService.playGameOver();
                  break;
              }
            }
            if (this.animationItem) {
              if(this.sensorData && !this.sensorData.sensor_active){
                this.animationItem.pause();
              } else if (this.sensorData && this.sensorData.sensor_active) {
                this.animationItem.play();
              }
            }
          });
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.sensorSubscription) {
      this.sensorSubscription.unsubscribe();
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  getHeartsFilled(): number[] {
    return Array(this.sensorData?.lives || 0).fill(0);
  }

  getHeartsNotFilled(): number[] {
    return Array(3 - (this.sensorData?.lives || 0)).fill(0);
  }

  openDialog() {
    // Implementa la logica per aprire il dialogo delle regole
  }

  protected readonly StatusEnum = StatusEnum;
}
