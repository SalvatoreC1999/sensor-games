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
import {RulesRedLightGreenLightComponent} from "../rules-red-light-green-light/rules-red-light-green-light.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-red-light-green-light',
  standalone: true,
  imports: [
    Button,
    NgForOf,
    NgClass,
    NgIf,
    GameOverComponent,
    LottieComponent
  ],
  templateUrl: './red-light-green-light.component.html',
  styleUrl: './red-light-green-light.component.css'
})
export class RedLightGreenLightComponent implements OnInit,OnDestroy{
  sensorSubscription: any;
  sensorData: DodgeTheObstacleDataModel | undefined;
  private animationItem: any;
  options: AnimationOptions = {
    path: 'assets/doraemon-running.json'
  }
  optionsSquid: AnimationOptions = {
    path: 'assets/squid-game.json'
  }

  constructor(
    private sensorDataService: SensorDataService,
    private ngZone: NgZone,
    private audioService: AudioService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.sensorDataService.initDodgeTheObstacle().subscribe({
      next: () => {
        this.sensorSubscription = this.sensorDataService.getSensorData(200).subscribe(data => {
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
    this.dialogService.open(RulesRedLightGreenLightComponent,{})
  }

  protected readonly StatusEnum = StatusEnum;
}
