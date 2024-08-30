import {StatusEnum} from "../enum/status.enum";
import {GameModeEnum} from "../enum/game-mode.enum";

export interface RedLightGreenLightDataModel {
  status: StatusEnum;
  game_mode: GameModeEnum;
  score: number;
  lives: number;
  sensor_active: boolean;
}
