import {Component, NgZone, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorDataService} from '../service/sensor-data.service';
import {Data} from "../model/data.model";
import {StatusEnum} from "../enum/status.enum";
import {NewRoundComponent} from "../new-round/new-round.component";
import {MeasuringComponent} from "../measuring/measuring.component";
import {GameOverComponent} from "../game-over/game-over.component";
import {MessagesModule} from "primeng/messages";
import {Button} from "primeng/button";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {RulesComponent} from "../rules/rules.component";
import {AudioService} from "../service/audio.service";

@Component({
  selector: 'app-distance-match',
  standalone: true,
  imports: [CommonModule, NewRoundComponent, MeasuringComponent, GameOverComponent, MessagesModule, Button,DynamicDialogModule],
  templateUrl: './distance-match.component.html',
  styleUrls: ['./distance-match.component.css'],
})
export class DistanceMatchComponent implements OnInit {
  sensorData: Data = {} as Data;
  messages: any;

  constructor(private sensorDataService: SensorDataService,private ngZone: NgZone,private dialogService: DialogService,private audioService: AudioService) {}

  ngOnInit() {
    this.sensorDataService.initDistanceMatch().subscribe({
      next: () => {
        this.sensorDataService.getSensorData().subscribe(data => {
          this.ngZone.run(() => {
            console.log(data)
            const statusChanged = this.sensorData.status != data.status;
            this.sensorData = data;
            if(this.sensorData.status == StatusEnum.SUCCESS && statusChanged && this.sensorData.round_points > 0){
              this.audioService.playSuccess();
              this.messages = [{ severity: 'success', summary: 'Successo', detail: 'Ottimo, hai accumulato : ' + (this.sensorData.round_points ?? 0) + ' punti!' + ' La distanza da te scelta è stata: ' + this.sensorData.distance +  ' cm e quella scelta in maniera casuale è stata: ' + this.sensorData.threshold_distance + ' cm' }];
            }
            if(this.sensorData.status == StatusEnum.ERROR && statusChanged){
              this.audioService.playError();
              this.messages = [{ severity: 'error', summary: 'Errore', detail: 'Peccato! Hai superato la distanza e di conseguenza hai perso una vita.' + 'La distanza da te scelta è stata: ' + this.sensorData.distance +  ' cm e quella scelta in maniera casuale è stata: ' + this.sensorData.threshold_distance + ' cm' }];
            }
            if(this.sensorData.status == StatusEnum.SUCCESS && statusChanged && this.sensorData.round_points == 0){
              this.messages = [{ severity: 'info', summary: 'Info', detail: 'Attenzione, prova ad avvicinarti! Non perdi una vita ma non acquisisci nemmeno punti' }];
            }
          });
        },() => {
          this.messages = [{ severity: 'error', summary: 'Errore', detail: 'Verifica che il sensore sia collegato'}]
        });
      }
    })
  }

  protected readonly StatusEnum = StatusEnum;

  getHeartsFilled(): number[] {
    return Array(this.sensorData?.lives || 0).fill(0);
  }
  getHeartsNotFilled(): number[] {
    return Array(3 - this.sensorData?.lives || 0).fill(0);
  }

  openDialog() {
    this.dialogService.open(RulesComponent,{})
  }
}
