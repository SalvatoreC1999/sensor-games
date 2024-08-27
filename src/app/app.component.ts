import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DistanceMatchComponent} from "./distance-match/distance-match.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {GamesOverviewComponent} from "./games-overview/games-overview.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DistanceMatchComponent, NavbarComponent, FooterComponent, GamesOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-mbed-app';
}
