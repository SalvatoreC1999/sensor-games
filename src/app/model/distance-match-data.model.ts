import {StatusEnum} from "../enum/status.enum";
import {GameModeEnum} from "../enum/game-mode.enum";

export interface DistanceMatchData {
  status: StatusEnum;
  game_mode: GameModeEnum;
  score: number;
  round_points:number;
  lives: number;
  distance: number;
  threshold_distance: number;
}
