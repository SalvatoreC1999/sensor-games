import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private successAudio: HTMLAudioElement;
  private errorAudio: HTMLAudioElement;
  private gameOverAudio: HTMLAudioElement;

  constructor() {
    this.successAudio = new Audio('assets/success.mp3');
    this.errorAudio = new Audio('assets/error.mp3');
    this.gameOverAudio = new Audio('assets/game-over.wav');
  }

  playSuccess() {
    this.successAudio.play()
      .then(() => {
        console.log('Success sound played');
      })
      .catch(error => {
        console.error('Error playing success sound', error);
      });
  }

  playError() {
    this.errorAudio.play()
      .then(() => {
        console.log('Error sound played');
      })
      .catch(error => {
        console.error('Error playing error sound', error);
      });
  }

  playGameOver() {
    this.gameOverAudio.play()
      .then(() => {
        console.log('Error sound played');
      })
      .catch(error => {
        console.error('Error playing error sound', error);
      });
  }
}
