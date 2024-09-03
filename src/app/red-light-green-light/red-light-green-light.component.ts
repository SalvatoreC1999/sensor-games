import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {SensorDataService} from "../service/sensor-data.service";
import {AudioService} from "../service/audio.service";
import {Button} from "primeng/button";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {GameOverComponent} from "../game-over/game-over.component";
import {StatusEnum} from "../enum/status.enum";
import {AnimationOptions, LottieComponent} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import {RedLightGreenLightDataModel} from "../model/red-light-green-light-data.model";
import {RulesRedLightGreenLightComponent} from "../rules-red-light-green-light/rules-red-light-green-light.component";
import {DialogService} from "primeng/dynamicdialog";
import {MessagesModule} from "primeng/messages";

@Component({
  selector: 'app-red-light-green-light',
  standalone: true,
  imports: [
    Button,
    NgForOf,
    NgClass,
    NgIf,
    GameOverComponent,
    LottieComponent,
    MessagesModule
  ],
  templateUrl: './red-light-green-light.component.html',
  styleUrl: './red-light-green-light.component.css'
})
export class RedLightGreenLightComponent implements OnInit,OnDestroy{
  sensorSubscription: any;
  sensorData: RedLightGreenLightDataModel | undefined;
  private animationItem: any;
  messages: any;
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
                  this.shakeAnimation();
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
        },
          () => {
            this.messages = [{ severity: 'error', summary: 'Errore', detail: 'Verifica che il sensore sia collegato'}]
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

  shakeAnimation(): void {
    if (this.animationItem) {
      const originalTransform = this.animationItem.wrapper.style.transform;
      const shakeAmplitude = 15; // Aumentato da 5 a 15
      const shakeDuration = 1000; // Durata totale in millisecondi (aumentata da 500ms a 1000ms)
      const frameRate = 60; // Frame al secondo
      const totalFrames = (shakeDuration / 1000) * frameRate;

      let frame = 0;

      const shake = () => {
        if (frame < totalFrames) {
          const progress = frame / totalFrames;
          const decreaseFactor = 1 - progress; // Fattore di diminuzione dell'ampiezza

          const xPos = (Math.random() * 2 - 1) * shakeAmplitude * decreaseFactor;
          const yPos = (Math.random() * 2 - 1) * shakeAmplitude * decreaseFactor;

          this.animationItem!.wrapper.style.transform = `${originalTransform} translate(${xPos}px, ${yPos}px)`;

          frame++;
          requestAnimationFrame(shake);
        } else {
          this.animationItem!.wrapper.style.transform = originalTransform; // Resetta la posizione
        }
      };

      requestAnimationFrame(shake);
    }
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
