import {StatusEnum} from "../enum/status.enum";

export interface Data{
  status: StatusEnum;
  score: number;
  round_points:number;
  lives: number;
  distance: number;
  threshold_distance: number;
}
