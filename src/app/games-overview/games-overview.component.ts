import {Component} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {UrlEnum} from "../enum/url.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-games-overview',
  standalone: true,
  imports: [
    CarouselModule
  ],
  templateUrl: './games-overview.component.html',
  styleUrl: './games-overview.component.css'
})
export class GamesOverviewComponent {

  constructor(private router: Router) {
  }

  games: any[] = [
    {
      name: "Distance Match",
      image: "distance-match.jpg",
      description: "Gioco di stima sulla scelta casuale di una distanza, utilizzando un sensore ad ultrasuoni",
      url: UrlEnum.distanceMatch
    },
    {
      name: "Red Light, Green Light",
      image: "red-light-green-light.jpeg",
      description: "Gioco in cui dovrai fermarti quando la luce diventa rossa e correre quando è verde, utilizzando il sensore ad infrarossi",
      url: UrlEnum.redLightGreenLight
    }
  ]

  loadGame(game: any) {
    this.router.navigateByUrl(game.url);
  }
}
