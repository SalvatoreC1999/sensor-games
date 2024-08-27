import {Routes} from '@angular/router';
import {UrlEnum} from "./enum/url.enum";
import {DistanceMatchComponent} from "./distance-match/distance-match.component";
import {GamesOverviewComponent} from "./games-overview/games-overview.component";

export const routes: Routes = [
  {
    path: '',
    component: GamesOverviewComponent
  },
  {
    path: UrlEnum.distanceMatch,
    component: DistanceMatchComponent
  },
];
