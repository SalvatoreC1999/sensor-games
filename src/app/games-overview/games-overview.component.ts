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
      description: "Gioco di stima sulla scelta casuale di una distanza",
      url: UrlEnum.distanceMatch
    },
    {
      name: "Dodge The Obstacle",
      image: "dodge-the-obstacle.jpg",
      description: "Gioco in cui dovrai schivare il meteorite prima dello schianto",
      url: UrlEnum.dodgeTheObstacle
    }
  ]

  loadGame(game: any) {
    this.router.navigateByUrl(game.url);
  }
}
